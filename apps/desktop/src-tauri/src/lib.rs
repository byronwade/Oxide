use serde::Serialize;
use thiserror::Error;

// Shared error type for all modules
#[derive(Debug, Error)]
pub enum LaunchBeaconError {
    #[error("General error: {0}")]
    General(String),
    #[error("File operation error: {0}")]
    FileOperationError(String),
}

impl Serialize for LaunchBeaconError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}