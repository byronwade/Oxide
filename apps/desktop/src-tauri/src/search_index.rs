use crate::OxideError;
use crate::{
    models::{Game, GameIndex},
    API_BASE_URL,
};
use serde_json;
use std::path::PathBuf;
use std::sync::OnceLock;
use tantivy::collector::TopDocs;
use tantivy::query::QueryParser;
use tantivy::{
    schema::*, Index, IndexReader, IndexWriter, ReloadPolicy, TantivyDocument,
};

/// Initialize and manage the search index for games
pub struct GameSearchIndex {
    index: Index,
    reader: IndexReader,
    schema: Schema,
    title_field: Field,
    description_field: Field,
    tags_field: Field,
}

impl GameSearchIndex {
    pub fn new() -> Result<Self, OxideError> {
        let mut schema_builder = Schema::builder();

        let title_field = schema_builder.add_text_field("title", TEXT | STORED);
        let description_field = schema_builder.add_text_field("description", TEXT | STORED);
        let tags_field = schema_builder.add_text_field("tags", TEXT | STORED);

        let schema = schema_builder.build();

        // Create index directory
        let home_dir = tauri::api::path::home_dir().ok_or_else(|| {
            OxideError::InitializationError("Could not determine home directory".to_string())
        })?;
        let index_dir = home_dir.join(".Oxide").join("index");

        if !index_dir.exists() {
            std::fs::create_dir_all(&index_dir).map_err(|e| {
                OxideError::InitializationError(format!("Failed to create index directory: {}", e))
            })?;
        }

        let index = Index::open_or_create(
            tantivy::directory::MmapDirectory::open(&index_dir).map_err(|e| {
                OxideError::InitializationError(format!("Failed to open index directory: {}", e))
            })?,
            schema.clone(),
        )
        .map_err(|e| OxideError::InitializationError(format!("Failed to create index: {}", e)))?;

        let reader = index
            .reader_builder()
            .reload_policy(ReloadPolicy::OnCommitWithDelay)
            .try_into()?;

        Ok(GameSearchIndex {
            index,
            reader,
            schema,
            title_field,
            description_field,
            tags_field,
        })
    }

    pub fn add_game(
        &self,
        _game_id: &str,
        title: &str,
        description: &str,
        tags: &[String],
    ) -> Result<(), OxideError> {
        let mut index_writer: IndexWriter = self.index.writer(50_000_000)?;

        let mut doc = TantivyDocument::new();
        doc.add_text(self.title_field, title);
        doc.add_text(self.description_field, description);
        doc.add_text(self.tags_field, &tags.join(" "));

        index_writer.add_document(doc)?;
        index_writer.commit()?;

        Ok(())
    }

    pub fn search(
        &self,
        query_str: &str,
        limit: usize,
    ) -> Result<Vec<serde_json::Value>, OxideError> {
        let searcher = self.reader.searcher();

        let query_parser = QueryParser::for_index(
            &self.index,
            vec![self.title_field, self.description_field, self.tags_field],
        );

        let query = query_parser.parse_query(query_str)?;

        let top_docs = searcher.search(&query, &TopDocs::with_limit(limit))?;

        let mut results = Vec::new();

        for (_score, doc_address) in top_docs {
            let retrieved_doc: TantivyDocument = searcher.doc(doc_address)?;
            
            // Convert document to JSON and parse it
            let doc_json = retrieved_doc.to_json(&self.schema);
            let doc_value: serde_json::Value = serde_json::from_str(&doc_json)?;
            
            let title = doc_value["title"]
                .as_array()
                .and_then(|arr| arr.first())
                .and_then(|v| v.as_str())
                .unwrap_or("Unknown");
                
            let description = doc_value["description"]
                .as_array()
                .and_then(|arr| arr.first())
                .and_then(|v| v.as_str())
                .unwrap_or("");
                
            let tags = doc_value["tags"]
                .as_array()
                .and_then(|arr| arr.first())
                .and_then(|v| v.as_str())
                .unwrap_or("");

            let result = serde_json::json!({
                "title": title,
                "description": description,
                "tags": tags.split_whitespace().collect::<Vec<_>>()
            });

            results.push(result);
        }

        Ok(results)
    }
}

// Global search index instance
static SEARCH_INDEX: OnceLock<GameSearchIndex> = OnceLock::new();

/// Initialize the search index
pub async fn index_games() -> Result<String, OxideError> {
    let search_index = GameSearchIndex::new()?;

    // Add some sample games for demonstration
    search_index.add_game(
        "indie_platformer_1",
        "Super Jump Adventure",
        "A thrilling platformer with amazing graphics and smooth gameplay",
        &["platformer", "indie", "adventure", "2d"].iter().map(|s| s.to_string()).collect::<Vec<String>>(),
    )?;

    search_index.add_game(
        "strategy_game_1",
        "Empire Builder",
        "Build your empire and conquer the world in this strategy masterpiece",
        &["strategy", "rts", "empire", "war"].iter().map(|s| s.to_string()).collect::<Vec<String>>(),
    )?;

    SEARCH_INDEX
        .set(search_index)
        .map_err(|_| OxideError::InitializationError("Failed to initialize search index".to_string()))?;

    Ok("Search index initialized successfully".to_string())
}

/// Search for games using the index
pub async fn search_games(query: String) -> Result<Vec<serde_json::Value>, OxideError> {
    let search_index = SEARCH_INDEX
        .get()
        .ok_or_else(|| OxideError::SearchIndex("Search index not initialized".to_string()))?;

    search_index.search(&query, 10)
}

