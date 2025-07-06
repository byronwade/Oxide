use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::Path;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Game {
    pub id: String,
    pub title: String,
    pub slug: String,
    pub description: Option<String>,
    pub developer: Option<String>,
    pub publisher: Option<String>,
    pub media: GameMedia,
    pub pricing: GamePricing,
    pub details: GameDetails,
    pub stats: GameStats,
    pub features: GameFeatures,
    #[serde(rename = "discountPercent")]
    pub discount_percent: Option<f64>,
    #[serde(rename = "isHot")]
    pub is_hot: Option<bool>,
    #[serde(rename = "isNew")]
    pub is_new: Option<bool>,
    #[serde(rename = "isOnSale")]
    pub is_on_sale: Option<bool>,
    #[serde(rename = "isAiRecommended")]
    pub is_ai_recommended: Option<bool>,
    #[serde(rename = "aiScore")]
    pub ai_score: Option<f64>,
    #[serde(rename = "matchReason")]
    pub match_reason: Option<String>,
    #[serde(rename = "isInstalled")]
    pub is_installed: Option<bool>,
    #[serde(rename = "isInLibrary")]
    pub is_in_library: Option<bool>,
    #[serde(rename = "isWishlisted")]
    pub is_wishlisted: Option<bool>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GameMedia {
    #[serde(rename = "coverImage")]
    pub cover_image: String,
    pub screenshots: Vec<String>,
    #[serde(rename = "iconUrl")]
    pub icon_url: String,
    pub title: String,
    #[serde(rename = "trailerUrl")]
    pub trailer_url: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GamePricing {
    #[serde(rename = "basePrice")]
    pub base_price: f64,
    #[serde(rename = "currentPrice")]
    pub current_price: f64,
    pub currency: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GameDetails {
    pub platforms: Vec<String>,
    pub genres: Vec<String>,
    pub tags: Vec<String>,
    #[serde(rename = "releaseDate")]
    pub release_date: Option<String>,
    #[serde(rename = "lastUpdated")]
    pub last_updated: Option<String>,
    pub version: Option<String>,
    #[serde(rename = "downloadSize")]
    pub download_size: Option<String>,
    #[serde(rename = "systemRequirements")]
    pub system_requirements: Option<SystemRequirements>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SystemRequirements {
    pub minimum: HashMap<String, String>,
    pub recommended: HashMap<String, String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GameStats {
    pub rating: f64,
    #[serde(rename = "reviewCount")]
    pub review_count: u32,
    #[serde(rename = "downloadCount")]
    pub download_count: u32,
    #[serde(rename = "wishlistCount")]
    pub wishlist_count: u32,
    #[serde(rename = "playTime")]
    pub play_time: Option<PlayTime>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PlayTime {
    pub average: f64,
    pub median: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GameFeatures {
    pub controller: bool,
    #[serde(rename = "cloudPlay")]
    pub cloud_play: bool,
    pub offline: bool,
    #[serde(rename = "multiPlayer")]
    pub multi_player: bool,
    #[serde(rename = "singlePlayer")]
    pub single_player: bool,
    pub achievements: bool,
    pub workshop: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GameFilters {
    pub query: Option<String>,
    pub genres: Option<Vec<String>>,
    pub platforms: Option<Vec<String>>,
    pub sort_by: Option<String>,
    pub page: Option<u32>,
    pub limit: Option<u32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GameResponse {
    pub data: Vec<Game>,
    pub total: u32,
    pub page: u32,
    pub has_next: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GamesData {
    pub data: Vec<Game>,
}

// Mock data loader
fn load_mock_games() -> Result<Vec<Game>, String> {
    let data_path = "data/complete-games.json";
    
    if !Path::new(data_path).exists() {
        return Err("Mock data file not found".to_string());
    }

    let contents = fs::read_to_string(data_path)
        .map_err(|e| format!("Failed to read mock data: {}", e))?;

    let games_data: GamesData = serde_json::from_str(&contents)
        .map_err(|e| format!("Failed to parse mock data: {}", e))?;

    Ok(games_data.data)
}

// Get all games with filtering
#[tauri::command]
pub async fn get_games(filters: Option<GameFilters>) -> Result<GameResponse, String> {
    let mut games = load_mock_games()?;
    
    // Apply filters
    if let Some(f) = filters {
        // Search filter
        if let Some(query) = f.query {
            let query_lower = query.to_lowercase();
            games.retain(|game| {
                game.title.to_lowercase().contains(&query_lower) ||
                game.details.tags.iter().any(|tag| tag.to_lowercase().contains(&query_lower)) ||
                game.details.genres.iter().any(|genre| genre.to_lowercase().contains(&query_lower))
            });
        }
        
        // Genre filter
        if let Some(genres) = f.genres {
            games.retain(|game| {
                genres.iter().any(|genre| game.details.genres.contains(genre))
            });
        }
        
        // Platform filter
        if let Some(platforms) = f.platforms {
            games.retain(|game| {
                platforms.iter().any(|platform| game.details.platforms.contains(platform))
            });
        }
        
        // Sort games
        if let Some(sort_by) = f.sort_by {
            match sort_by.as_str() {
                "newest" => games.sort_by(|a, b| {
                    let a_date = a.details.release_date.as_deref().unwrap_or("1970-01-01");
                    let b_date = b.details.release_date.as_deref().unwrap_or("1970-01-01");
                    b_date.cmp(a_date)
                }),
                "rating" => games.sort_by(|a, b| b.stats.rating.partial_cmp(&a.stats.rating).unwrap_or(std::cmp::Ordering::Equal)),
                "price-low" => games.sort_by(|a, b| a.pricing.current_price.partial_cmp(&b.pricing.current_price).unwrap_or(std::cmp::Ordering::Equal)),
                "price-high" => games.sort_by(|a, b| b.pricing.current_price.partial_cmp(&a.pricing.current_price).unwrap_or(std::cmp::Ordering::Equal)),
                "ai-score" => games.sort_by(|a, b| {
                    let a_score = a.ai_score.unwrap_or(0.0);
                    let b_score = b.ai_score.unwrap_or(0.0);
                    b_score.partial_cmp(&a_score).unwrap_or(std::cmp::Ordering::Equal)
                }),
                _ => games.sort_by(|a, b| b.stats.download_count.cmp(&a.stats.download_count)),
            }
        } else {
            games.sort_by(|a, b| b.stats.download_count.cmp(&a.stats.download_count));
        }
        
        // Apply pagination
        let page = f.page.unwrap_or(1);
        let limit = f.limit.unwrap_or(20);
        let start = ((page - 1) * limit) as usize;
        let end = (start + limit as usize).min(games.len());
        
        let total = games.len() as u32;
        let paginated_games = games[start..end].to_vec();
        let has_next = end < games.len();
        
        return Ok(GameResponse {
            data: paginated_games,
            total,
            page,
            has_next,
        });
    }
    
    // Return all games if no filters
    Ok(GameResponse {
        data: games.clone(),
        total: games.len() as u32,
        page: 1,
        has_next: false,
    })
}

// Get game by ID
#[tauri::command]
pub async fn get_game_by_id(id: String) -> Result<Option<Game>, String> {
    let games = load_mock_games()?;
    Ok(games.into_iter().find(|game| game.id == id))
}

// Get game by slug
#[tauri::command]
pub async fn get_game_by_slug(slug: String) -> Result<Option<Game>, String> {
    let games = load_mock_games()?;
    Ok(games.into_iter().find(|game| game.slug == slug))
}

// Get featured games
#[tauri::command]
pub async fn get_featured_games() -> Result<Vec<Game>, String> {
    let games = load_mock_games()?;
    let featured: Vec<Game> = games
        .into_iter()
        .filter(|game| game.is_hot.unwrap_or(false) || game.stats.rating >= 4.5)
        .take(6)
        .collect();
    
    Ok(featured)
}

// Get trending games
#[tauri::command]
pub async fn get_trending_games() -> Result<Vec<Game>, String> {
    let games = load_mock_games()?;
    let mut trending: Vec<Game> = games
        .into_iter()
        .filter(|game| game.is_hot.unwrap_or(false))
        .collect();
    
    trending.sort_by(|a, b| b.stats.download_count.cmp(&a.stats.download_count));
    trending.truncate(12);
    
    Ok(trending)
}

// Get new games
#[tauri::command]
pub async fn get_new_games() -> Result<Vec<Game>, String> {
    let games = load_mock_games()?;
    let mut new_games: Vec<Game> = games
        .into_iter()
        .filter(|game| game.is_new.unwrap_or(false))
        .collect();
    
    new_games.sort_by(|a, b| {
        let a_date = a.details.release_date.as_deref().unwrap_or("1970-01-01");
        let b_date = b.details.release_date.as_deref().unwrap_or("1970-01-01");
        b_date.cmp(a_date)
    });
    new_games.truncate(12);
    
    Ok(new_games)
}

// Get games by category
#[tauri::command]
pub async fn get_games_by_category(category_slug: String, page: Option<u32>, limit: Option<u32>) -> Result<GameResponse, String> {
    let genre_map: HashMap<String, String> = [
        ("action".to_string(), "Action".to_string()),
        ("adventure".to_string(), "Adventure".to_string()),
        ("rpg".to_string(), "RPG".to_string()),
        ("strategy".to_string(), "Strategy".to_string()),
        ("simulation".to_string(), "Simulation".to_string()),
        ("sports".to_string(), "Sports".to_string()),
        ("racing".to_string(), "Racing".to_string()),
        ("puzzle".to_string(), "Puzzle".to_string()),
        ("platformer".to_string(), "Platformer".to_string()),
        ("horror".to_string(), "Horror".to_string()),
        ("indie".to_string(), "Indie".to_string()),
        ("multiplayer".to_string(), "Multiplayer".to_string()),
    ].iter().cloned().collect();
    
    let genre = genre_map.get(&category_slug).cloned();
    if genre.is_none() {
        return Ok(GameResponse {
            data: vec![],
            total: 0,
            page: page.unwrap_or(1),
            has_next: false,
        });
    }
    
    let filters = GameFilters {
        query: None,
        genres: Some(vec![genre.unwrap()]),
        platforms: None,
        sort_by: None,
        page,
        limit,
    };
    
    get_games(Some(filters)).await
}

// Search games
#[tauri::command]
pub async fn search_games(query: String, page: Option<u32>, limit: Option<u32>) -> Result<GameResponse, String> {
    let filters = GameFilters {
        query: Some(query),
        genres: None,
        platforms: None,
        sort_by: None,
        page,
        limit,
    };
    
    get_games(Some(filters)).await
}

// For production, replace these functions with API calls:
/*
#[tauri::command]
pub async fn get_games(filters: Option<GameFilters>) -> Result<GameResponse, String> {
    let client = reqwest::Client::new();
    let mut url = format!("{}/games", env::var("API_URL").unwrap_or_else(|_| "https://api.oxide.games".to_string()));
    
    if let Some(f) = filters {
        let mut params = Vec::new();
        
        if let Some(query) = f.query {
            params.push(format!("q={}", query));
        }
        if let Some(genres) = f.genres {
            params.push(format!("genres={}", genres.join(",")));
        }
        if let Some(page) = f.page {
            params.push(format!("page={}", page));
        }
        if let Some(limit) = f.limit {
            params.push(format!("limit={}", limit));
        }
        
        if !params.is_empty() {
            url.push_str("?");
            url.push_str(&params.join("&"));
        }
    }
    
    let response = client.get(&url).send().await
        .map_err(|e| format!("API request failed: {}", e))?;
    
    let game_response: GameResponse = response.json().await
        .map_err(|e| format!("Failed to parse API response: {}", e))?;
    
    Ok(game_response)
}
*/ 