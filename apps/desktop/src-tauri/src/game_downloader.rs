use crate::LaunchBeaconError;
use reqwest::Client;
use std::path::PathBuf;
use tokio::fs::{self, File};
use tokio::io::AsyncWriteExt;
use futures_util::StreamExt;

/// Download a game from a URL to a local directory
pub async fn download_game(
    game_id: String,
    url: String,
    progress_handler: impl Fn(u64, u64),
) -> Result<String, LaunchBeaconError> {
    let client = Client::new();
    let response = client.get(&url).send().await?;
    let total_size = response.content_length().unwrap_or(0);

    // Create games directory
    let home_dir = dirs::home_dir().unwrap_or_else(|| PathBuf::from("."));
    let game_dir = home_dir.join("LaunchBeacon").join("Games").join(&game_id);
    fs::create_dir_all(&game_dir).await?;

    // Get file name from URL
    let file_name = url.split("/").last().unwrap_or("game.zip");
    let dest_path = game_dir.join(file_name);

    let mut out = File::create(&dest_path).await?;
    let mut stream = response.bytes_stream();
    let mut downloaded: u64 = 0;

    while let Some(item) = stream.next().await {
        let chunk = item?;
        out.write_all(&chunk).await?;
        downloaded += chunk.len() as u64;
        progress_handler(downloaded, total_size);
    }

    Ok(format!("Game downloaded to: {}", dest_path.display()))
}

/// Get the executable path for a given game ID
pub async fn get_game_executable(game_id: &str) -> Result<PathBuf, LaunchBeaconError> {
    let home_dir = dirs::home_dir().unwrap_or_else(|| PathBuf::from("."));
    let game_dir = home_dir.join("LaunchBeacon").join("Games").join(game_id);

    // This is a placeholder - in a real app, you would have a manifest file
    // that specifies the executable name.
    let exe_name = "game.exe"; // Or appropriate name for other platforms
    let exe_path = game_dir.join(exe_name);

    if exe_path.exists() {
        Ok(exe_path)
    } else {
        Err(LaunchBeaconError::GameNotFound(format!(
            "Executable not found for game: {}",
            game_id
        )))
    }
}

/// Get download progress for a game (placeholder implementation)
pub async fn get_download_progress(_game_id: String) -> Result<f64, LaunchBeaconError> {
    // This is a placeholder - in a real implementation, you would track progress
    // in a shared state or database
    Ok(0.0) // Return 0% progress for now
}

