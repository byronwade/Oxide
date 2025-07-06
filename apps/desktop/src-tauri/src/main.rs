// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
use commands::games::*;

use std::fs;
use std::path::Path;
use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// File upload command for development
#[tauri::command]
async fn upload_file(file_path: String, destination: String) -> Result<String, String> {
    let upload_dir = "uploads";
    
    // Create uploads directory if it doesn't exist
    if !Path::new(upload_dir).exists() {
        fs::create_dir_all(upload_dir)
            .map_err(|e| format!("Failed to create upload directory: {}", e))?;
    }
    
    // Copy file to uploads directory
    let filename = Path::new(&file_path)
        .file_name()
        .and_then(|name| name.to_str())
        .ok_or("Invalid file path")?;
    
    let dest_path = format!("{}/{}", upload_dir, filename);
    
    fs::copy(&file_path, &dest_path)
        .map_err(|e| format!("Failed to copy file: {}", e))?;
    
    Ok(dest_path)
}

// Get upload directory path
#[tauri::command]
fn get_upload_path() -> String {
    let current_dir = std::env::current_dir().unwrap_or_default();
    current_dir.join("uploads").to_string_lossy().to_string()
}

// List uploaded files
#[tauri::command]
fn list_uploaded_files() -> Result<Vec<String>, String> {
    let upload_dir = "uploads";
    
    if !Path::new(upload_dir).exists() {
        return Ok(vec![]);
    }
    
    let entries = fs::read_dir(upload_dir)
        .map_err(|e| format!("Failed to read upload directory: {}", e))?;
    
    let mut files = Vec::new();
    for entry in entries {
        let entry = entry.map_err(|e| format!("Failed to read directory entry: {}", e))?;
        let path = entry.path();
        if path.is_file() {
            if let Some(file_name) = path.file_name().and_then(|name| name.to_str()) {
                files.push(file_name.to_string());
            }
        }
    }
    
    Ok(files)
}

// Delete uploaded file
#[tauri::command]
fn delete_uploaded_file(filename: String) -> Result<(), String> {
    let file_path = format!("uploads/{}", filename);
    
    if Path::new(&file_path).exists() {
        fs::remove_file(&file_path)
            .map_err(|e| format!("Failed to delete file: {}", e))?;
    }
    
    Ok(())
}

// Application data directory management
#[tauri::command]
fn get_app_data_dir(app_handle: tauri::AppHandle) -> Result<String, String> {
    let app_data_dir = app_handle.path_resolver()
        .app_data_dir()
        .ok_or("Failed to get app data directory")?;
    
    // Create the directory if it doesn't exist
    if !app_data_dir.exists() {
        fs::create_dir_all(&app_data_dir)
            .map_err(|e| format!("Failed to create app data directory: {}", e))?;
    }
    
    Ok(app_data_dir.to_string_lossy().to_string())
}

// Set rounded corners on macOS
#[cfg(target_os = "macos")]
fn set_rounded_corners(window: &tauri::Window) {
    use cocoa::appkit::{NSWindow, NSWindowStyleMask};
    use cocoa::base::id;
    
    unsafe {
        let ns_window = window.ns_window().unwrap() as id;
        let current_style = ns_window.styleMask();
        let new_style = current_style | NSWindowStyleMask::NSFullSizeContentViewWindowMask;
        ns_window.setStyleMask_(new_style);
        ns_window.setTitlebarAppearsTransparent_(cocoa::base::YES);
        ns_window.setTitleVisibility_(1); // NSWindowTitleHidden
    }
}

#[cfg(not(target_os = "macos"))]
fn set_rounded_corners(_window: &tauri::Window) {
    // No-op for non-macOS platforms
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            // Game commands
            get_games,
            get_game_by_id,
            get_game_by_slug,
            get_featured_games,
            get_trending_games,
            get_new_games,
            get_games_by_category,
            search_games,
            // File upload commands
            upload_file,
            get_upload_path,
            list_uploaded_files,
            delete_uploaded_file,
            get_app_data_dir
        ])
        .setup(|app| {
            println!("Starting Oxide Desktop App...");
            
            let window = app.get_window("main").unwrap();
            
            println!("Setting up Tauri app...");
            
            // Show and focus window
            window.show().unwrap();
            window.set_focus().unwrap();
            println!("Got main window");
            
            // Set window properties
            let _ = window.set_always_on_top(false);
            window.set_position(tauri::Position::Physical(tauri::PhysicalPosition { x: 100, y: 100 })).unwrap();
            
            println!("Window shown, focused, and positioned");
            println!("Tauri app setup complete");
            
            // Apply rounded corners for macOS
            #[cfg(target_os = "macos")]
            {
                println!("Applying rounded corners...");
                println!("Setting window rounded corners...");
                set_rounded_corners(&window);
                println!("Applied rounded corners to macOS window");
            }
            
            let _ = window.set_always_on_top(false);
            println!("Removed always on top");
            
            // Create uploads directory
            let upload_dir = "uploads";
            if !Path::new(upload_dir).exists() {
                if let Err(e) = fs::create_dir_all(upload_dir) {
                    eprintln!("Failed to create uploads directory: {}", e);
                } else {
                    println!("Created uploads directory");
                }
            }
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
} 