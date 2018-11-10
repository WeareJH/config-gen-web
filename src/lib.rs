extern crate wasm_bindgen;
extern crate rjs;

use wasm_bindgen::prelude::*;

use rjs::{RequireJsBuildConfig, ModuleData, BundleConfig};

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn parse(rjs_config: &str, req_log: &str, bundle_config: &str) -> String {
    match RequireJsBuildConfig::from_generated_string(rjs_config) {
        Ok(rjs_conf) => {
            match BundleConfig::from_json_string(bundle_config) {
                Ok(bc) => {
                    match ModuleData::from_json_string(req_log) {
                        Ok(md) => {
                            let next_build = rjs_conf.create_modules(&bc, &md);
                            match next_build.to_string() {
                                Ok(s) => s,
                                Err(e) => e.to_string()
                            }
                        }
                        Err(e) => format!("Request Log parse error:\n\n {}", e.to_string())
                    }
                },
                Err(e) => format!("Bundle Config parse error:\n\n {}", e.to_string())
            }
        }
        Err(e) => format!("requirejs-config.js parse error:\n\n {}", e.to_string())
    }
}
