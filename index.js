import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        // if (label === 'json') {
        //     return './json.worker.bundle.js';
        // }
        // if (label === 'css') {
        //     return './css.worker.bundle.js';
        // }
        // if (label === 'html') {
        //     return './html.worker.bundle.js';
        // }
        if (label === 'typescript' || label === 'javascript') {
            return './ts.worker.bundle.js';
        }
        return './editor.worker.bundle.js';
    }
}

import("./pkg/browser_esm_webpack").then(m => {

    var model = monaco.editor.createModel(`// paste your requirejs-config.js file here`,
        'javascript'
    );

    var json_model = monaco.editor.createModel(m.parse(`//`), 'json');

    /**
     * IModelContentChangedEvent
     */
    model.onDidChangeContent(e => {
        let parsed = m.parse(model.getLinesContent().join("\n"));
        json_model.setValue(parsed);
    });

    monaco.editor.create(document.getElementById('container'), {
        model
    });
    monaco.editor.create(document.getElementById('container2'), {
        model: json_model
    });
});
