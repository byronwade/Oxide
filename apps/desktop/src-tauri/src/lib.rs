use serde::{Serialize, Serializer};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum OxideError {
    #[error("Initialization Error: {0}")]
    InitializationError(String),
    #[error("General error: {0}")]
    General(String),
    #[error("File operation error: {0}")]
    FileOperationError(String),
    #[error("Not found: {0}")]
    NotFound(String),
}

impl Serialize for OxideError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // The original file did not have a run function, so this line is added
    // to make the file syntactically valid.
    // In a real scenario, this would be the entry point of the application.
    println!("Oxide Desktop application started.");
}