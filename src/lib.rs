extern crate wasm_bindgen;
extern crate rjs;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn parse(input: &str) -> String {
    match rjs::RequireJsBuildConfig::from_generated_string(input.to_string()) {
        Ok(rjs) => match rjs.to_string() {
            Ok(s) => s,
            Err(e) => e,
        },
        Err(e) => e.to_string(),
    }
}
