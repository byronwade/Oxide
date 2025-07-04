#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, WebviewWindow};

// Simple greet command that returns Result for async commands
#[tauri::command]
async fn greet(name: &str) -> Result<String, String> {
    Ok(format!("Hello, {}! You've been greeted from Rust!", name))
}

// Window management commands
#[tauri::command]
async fn set_window_rounded(window: WebviewWindow) -> Result<(), String> {
    #[cfg(target_os = "macos")]
    {
        use cocoa::appkit::{NSWindow, NSWindowStyleMask, NSView};
        use cocoa::base::id;
        use objc::{msg_send, sel, sel_impl};
        
        let ns_window = window.ns_window().map_err(|e| e.to_string())? as id;
        unsafe {
            let current_style = ns_window.styleMask();
            ns_window.setStyleMask_(current_style | NSWindowStyleMask::NSFullSizeContentViewWindowMask);
            
            // Set corner radius
            let layer = ns_window.contentView().layer();
            if !layer.is_null() {
                let _: () = msg_send![layer, setCornerRadius: 12.0f64];
                let _: () = msg_send![layer, setMasksToBounds: true];
            }
        }
    }
    
    #[cfg(target_os = "windows")]
    {
        use windows::Win32::Foundation::HWND;
        use windows::Win32::Graphics::Dwm::{DwmSetWindowAttribute, DWMWA_WINDOW_CORNER_PREFERENCE, DWM_WINDOW_CORNER_PREFERENCE};
        
        let hwnd = window.hwnd().map_err(|e| e.to_string())?;
        let hwnd = HWND(hwnd.0);
        
        unsafe {
            let corner_preference = DWM_WINDOW_CORNER_PREFERENCE::DWMWCP_ROUND;
            let _ = DwmSetWindowAttribute(
                hwnd,
                DWMWA_WINDOW_CORNER_PREFERENCE,
                &corner_preference as *const _ as *const _,
                std::mem::size_of::<DWM_WINDOW_CORNER_PREFERENCE>() as u32,
            );
        }
    }
    
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            
            // Apply rounded corners on setup
            tauri::async_runtime::spawn(async move {
                let _ = set_window_rounded(window).await;
            });
            
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, set_window_rounded])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
} 