use crate::OxideError;
use reqwest::Client;
use std::path::PathBuf;
use tokio::fs::{self, File};
use tokio::io::AsyncWriteExt;
use futures_util::StreamExt;

/// Download a game from a URL to a local directory
pub async fn download_game(
    _window: tauri::Window,
    game_id: String,
    _url: String,
) -> Result<String, OxideError> {
    let client = Client::new();
    let response = client.get(&_url).send().await?;
    let total_size = response.content_length().unwrap_or(0);

    // Create games directory
    let home_dir = tauri::api::path::home_dir().ok_or_else(|| {
        OxideError::FileOperationError("Failed to get home directory".to_string())
    })?;
    let game_dir = home_dir.join("Oxide").join("Games").join(&game_id);

    if !game_dir.exists() {
        fs::create_dir_all(&game_dir).map_err(|e| {
            OxideError::FileOperationError(format!("Failed to create game directory: {}", e))
        })?;
    }

    // Get file name from URL
    let file_name = _url.split("/").last().unwrap_or("game.zip");
    let dest_path = game_dir.join(file_name);

    let mut out = File::create(&dest_path).await?;
    let mut stream = response.bytes_stream();
    let mut downloaded: u64 = 0;

    while let Some(item) = stream.next().await {
        let chunk = item?;
        out.write_all(&chunk).await?;
        downloaded += chunk.len() as u64;
        // progress_handler(downloaded, total_size); // This line was removed as per the edit hint
    }

    Ok(format!("Game downloaded to: {}", dest_path.display()))
}

/// Get the executable path for a given game ID
pub async fn get_game_executable(game_id: &str) -> Result<PathBuf, OxideError> {
    let home_dir = tauri::api::path::home_dir().ok_or_else(|| {
        OxideError::FileOperationError("Failed to get home directory".to_string())
    })?;
    let game_dir = home_dir.join("Oxide").join("Games").join(game_id);

    // This is a placeholder. In a real scenario, you'd have a manifest
    // file for each game indicating the main executable.
    // For now, we'll just check for a common executable name.
    let executable_path = game_dir.join(format!("{}.exe", game_id)); // Assuming Windows for now
    if executable_path.exists() {
        Ok(executable_path)
    } else {
        Err(OxideError::NotFound(format!(
            "Game executable not found for {}",
            game_id
        )))
    }
}

/// Get download progress for a game (placeholder implementation)
pub async fn get_download_progress(_game_id: String) -> Result<f64, OxideError> {
    // Placeholder for progress tracking
    Ok(100.0)
}

