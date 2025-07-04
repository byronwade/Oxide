use crate::OxideError;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs as std_fs;
use std::io::Read;
use std::path::PathBuf;
use tokio::fs;

#[derive(Debug, Serialize, Deserialize)]
pub struct ModDescriptor {
    pub mod_id: String,
    pub game_id: String,
    pub dependencies: Vec<String>,
    pub description: String,
    pub version: String,
    pub author: String,
}

/// Install a mod for a specific game
pub async fn install_mod(game_id: String, mod_path: String) -> Result<String, OxideError> {
    let home_dir =
        home_dir().ok_or_else(|| OxideError::General("Could not find home directory".into()))?;
    let mods_dir = home_dir.join(".Oxide").join("Mods").join(&game_id);

    // Create mods directory if it does not exist
    fs::create_dir_all(&mods_dir).await?;

    // Extract mod (assuming it is a zip file)
    let mod_file = PathBuf::from(&mod_path);
    if !mod_file.exists() {
        return Err(OxideError::ModInstallationFailed(format!(
            "Mod file not found: {}",
            mod_path
        )));
    }

    // Read and extract the zip file
    let file = std_fs::File::open(&mod_file)?;
    let mut archive = zip::ZipArchive::new(file)?;

    let mut mod_descriptor: Option<ModDescriptor> = None;

    for i in 0..archive.len() {
        let mut file = archive.by_index(i)?;

        let outpath = match file.enclosed_name() {
            Some(path) => mods_dir.join(path),
            None => continue,
        };

        // Check if this is the mod descriptor
        if file.name() == "mod.json" {
            let mut contents = String::new();
            file.read_to_string(&mut contents)?;
            mod_descriptor = Some(serde_json::from_str(&contents)?);
        }

        if file.is_dir() {
            std_fs::create_dir_all(&outpath)?;
        } else {
            if let Some(p) = outpath.parent() {
                if !p.exists() {
                    std_fs::create_dir_all(p)?;
                }
            }
            let mut outfile = std_fs::File::create(&outpath)?;
            std::io::copy(&mut file, &mut outfile)?;
        }
    }

    // Validate mod descriptor
    let descriptor = mod_descriptor.ok_or_else(|| {
        OxideError::ModInstallationFailed("Mod descriptor (mod.json) not found".to_string())
    })?;

    // Check dependencies
    for dep in &descriptor.dependencies {
        if !is_mod_installed(&game_id, dep).await? {
            return Err(OxideError::ModInstallationFailed(format!(
                "Missing dependency: {}",
                dep
            )));
        }
    }

    // Save mod metadata
    let metadata_path = mods_dir.join(format!("{}_metadata.json", descriptor.mod_id));
    let metadata_content = serde_json::to_string_pretty(&descriptor)?;
    fs::write(metadata_path, metadata_content).await?;

    Ok(format!(
        "Mod {} installed successfully for game {}",
        descriptor.mod_id, game_id
    ))
}

/// Uninstall a mod
pub async fn uninstall_mod(game_id: String, mod_id: String) -> Result<String, OxideError> {
    let home_dir =
        home_dir().ok_or_else(|| OxideError::General("Could not find home directory".into()))?;
    let mod_dir = home_dir
        .join(".Oxide")
        .join("Mods")
        .join(&game_id)
        .join(&mod_id);
    let metadata_path = home_dir
        .join(".Oxide")
        .join("Mods")
        .join(&game_id)
        .join(format!("{}_metadata.json", mod_id));

    if mod_dir.exists() {
        fs::remove_dir_all(&mod_dir).await?;
    }

    if metadata_path.exists() {
        fs::remove_file(&metadata_path).await?;
    }

    Ok(format!("Mod {} uninstalled successfully", mod_id))
}

/// List all installed mods for a game
pub async fn list_mods(game_id: String) -> Result<Vec<ModDescriptor>, OxideError> {
    let home_dir =
        home_dir().ok_or_else(|| OxideError::General("Could not find home directory".into()))?;
    let mods_dir = home_dir.join(".Oxide").join("Mods").join(&game_id);

    if !mods_dir.exists() {
        return Ok(Vec::new());
    }

    let mut mods = Vec::new();
    let mut entries = fs::read_dir(&mods_dir).await?;

    while let Some(entry) = entries.next_entry().await? {
        let path = entry.path();
        if path.is_file() && path.extension().and_then(|s| s.to_str()) == Some("json") {
            if let Some(file_name) = path.file_name().and_then(|s| s.to_str()) {
                if file_name.ends_with("_metadata.json") {
                    let contents = fs::read_to_string(&path).await?;
                    let descriptor: ModDescriptor = serde_json::from_str(&contents)?;
                    mods.push(descriptor);
                }
            }
        }
    }

    Ok(mods)
}

/// Check if a mod is installed
async fn is_mod_installed(game_id: &str, mod_id: &str) -> Result<bool, OxideError> {
    let home_dir =
        home_dir().ok_or_else(|| OxideError::General("Could not find home directory".into()))?;
    let metadata_path = home_dir
        .join(".Oxide")
        .join("Mods")
        .join(game_id)
        .join(format!("{}_metadata.json", mod_id));

    Ok(metadata_path.exists())
}

/// Load mod configuration for a game
pub async fn load_mod_config(
    game_id: String,
) -> Result<HashMap<String, ModDescriptor>, OxideError> {
    let mods = list_mods(game_id).await?;
    let mut config = HashMap::new();

    for mod_descriptor in mods {
        config.insert(mod_descriptor.mod_id.clone(), mod_descriptor);
    }

    Ok(config)
}

