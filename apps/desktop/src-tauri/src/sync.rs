use crate::{
    models::{Game, GameLibrary},
    OxideError, API_BASE_URL,
};
use reqwest;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::path::PathBuf;
use tokio::fs;

#[derive(Serialize, Deserialize, Debug)]
pub struct SyncStatus {
    last_sync: String,
    status: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GameLibrary {
    pub games: Vec<Game>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GameMetadata {
    pub id: String,
    pub title: String,
    pub version: String,
    pub installed: bool,
    pub last_played: Option<String>,
    pub play_time: u64, // in seconds
    pub save_files: Vec<String>,
}

/// Synchronize game library with cloud
pub async fn sync_library() -> Result<String, OxideError> {
    let home_dir = tauri::api::path::home_dir().ok_or_else(|| {
        OxideError::FileOperationError("Could not determine home directory".to_string())
    })?;
    let sync_dir = home_dir.join(".Oxide").join("Sync");
    if !sync_dir.exists() {
        fs::create_dir_all(&sync_dir)
            .await
            .map_err(|e| OxideError::FileOperationError(format!("Failed to create sync dir: {}", e)))?;
    }

    let local_library = load_local_library().await?;
    let remote_library = download_remote_library().await?;
    let merged_library = merge_libraries(local_library, remote_library).await?;

    save_local_library(&merged_library).await?;
    upload_library_changes(&merged_library).await?;
    update_sync_status().await?;

    Ok("Library synced successfully".to_string())
}

/// Get current sync status
pub async fn get_sync_status() -> Result<SyncStatus, OxideError> {
    let home_dir = tauri::api::path::home_dir().ok_or_else(|| {
        OxideError::FileOperationError("Could not determine home directory".to_string())
    })?;
    let status_file = home_dir.join(".Oxide").join("Sync").join("status.json");
    if status_file.exists() {
        let content = fs::read_to_string(status_file).await.map_err(|e| {
            OxideError::FileOperationError(format!("Failed to read sync status: {}", e))
        })?;
        serde_json::from_str(&content).map_err(|e| {
            OxideError::FileOperationError(format!("Failed to parse sync status: {}", e))
        })
    } else {
        Ok(SyncStatus {
            last_sync: "Never".to_string(),
            status: "Not synced".to_string(),
        })
    }
}

/// Load local game library
async fn load_local_library() -> Result<GameLibrary, OxideError> {
    let home_dir = tauri::api::path::home_dir().ok_or_else(|| {
        OxideError::FileOperationError("Could not determine home directory".to_string())
    })?;
    let library_file = home_dir.join(".Oxide").join("library.json");
    if library_file.exists() {
        let content = fs::read_to_string(library_file).await.map_err(|e| {
            OxideError::FileOperationError(format!("Failed to read local library: {}", e))
        })?;
        serde_json::from_str(&content).map_err(|e| {
            OxideError::FileOperationError(format!("Failed to parse local library: {}", e))
        })
    } else {
        Ok(GameLibrary { games: vec![] })
    }
}

/// Save local game library
async fn save_local_library(library: &GameLibrary) -> Result<(), OxideError> {
    let home_dir = tauri::api::path::home_dir().ok_or_else(|| {
        OxideError::FileOperationError("Could not determine home directory".to_string())
    })?;
    let library_file = home_dir.join(".Oxide").join("library.json");
    let content = serde_json::to_string_pretty(library).map_err(|e| {
        OxideError::FileOperationError(format!("Failed to serialize library: {}", e))
    })?;
    fs::write(library_file, content)
        .await
        .map_err(|e| OxideError::FileOperationError(format!("Failed to write local library: {}", e)))
}

/// Upload library changes to cloud (placeholder implementation)
async fn upload_library_changes(_library: &GameLibrary) -> Result<(), OxideError> {
    // In a real app, you would post the changes to your backend
    let _sync_url = format!("{}/sync/upload", API_BASE_URL); // Replace with actual URL
                                                            // let client = reqwest::Client::new();
                                                            // client.post(sync_url).json(library).send().await?;
    Ok(())
}

/// Download remote library changes (placeholder implementation)
async fn download_remote_library() -> Result<GameLibrary, OxideError> {
    let sync_url = format!("{}/sync/download", API_BASE_URL); // Replace with actual URL
    let client = reqwest::Client::new();
    let response = client
        .get(&sync_url)
        .send()
        .await
        .map_err(|e| OxideError::General(format!("Failed to download remote library: {}", e)))?;

    if response.status().is_success() {
        response
            .json::<GameLibrary>()
            .await
            .map_err(|e| OxideError::General(format!("Failed to parse remote library: {}", e)))
    } else {
        // Return an empty library if the server returns an error (e.g., 404 Not Found)
        Ok(GameLibrary { games: vec![] })
    }
}

/// Merge local and remote libraries
async fn merge_libraries(local: GameLibrary, remote: GameLibrary) -> Result<GameLibrary, OxideError> {
    // This is a simplistic merge strategy: remote takes precedence.
    // A real implementation would be more sophisticated.
    let mut merged_games = remote.games.clone();
    for local_game in local.games {
        if !merged_games.iter().any(|g| g.id == local_game.id) {
            merged_games.push(local_game);
        }
    }
    Ok(GameLibrary {
        games: merged_games,
    })
}

/// Update sync status
async fn update_sync_status() -> Result<(), OxideError> {
    let home_dir = tauri::api::path::home_dir().ok_or_else(|| {
        OxideError::FileOperationError("Could not determine home directory".to_string())
    })?;
    let status_file = home_dir.join(".Oxide").join("Sync").join("status.json");
    let status = SyncStatus {
        last_sync: chrono::Utc::now().to_rfc3339(),
        status: "Synced".to_string(),
    };
    let content = serde_json::to_string_pretty(&status).map_err(|e| {
        OxideError::FileOperationError(format!("Failed to serialize sync status: {}", e))
    })?;
    fs::write(status_file, content)
        .await
        .map_err(|e| OxideError::FileOperationError(format!("Failed to write sync status: {}", e)))
}

