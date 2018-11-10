import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

import "./css/index.css";

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

    var models = [];
    var requirejs_model = monaco.editor.createModel(``,
        'javascript'
    );
    models.push(requirejs_model);

    var build_model = monaco.editor.createModel("", 'json');

    var req_log_model = monaco.editor.createModel(`[
    {
       "id": "jquery",
       "referrer": "/",
       "url": "http://example.com/js/jquery.js" 
    },
    {
       "id": "knockout",
       "referrer": "/juno-jacket.html",
       "url": "http://example.com/js/knockout.js" 
    },
    {
       "id": "knockout",
       "referrer": "/",
       "url": "http://example.com/js/knockout.js" 
    }
]`, 'json');
    models.push(req_log_model);
    var bundle_config_model = monaco.editor.createModel(`{
  "bundles": [
    {
      "name": "bundles/main",
      "urls": [
        "/",
        "/women/tops-women/jackets-women.html"
      ],
      "children": [
        {
          "name": "bundles/product",
          "urls": [
            "/juno-jacket.html"
          ],
          "children": []
        }
      ]
    }
  ]
}
`, 'json');
    models.push(bundle_config_model);

    /**
     * IModelContentChangedEvent
     */
    models.forEach(m => {
        m.onDidChangeContent(e => {
            send();
        });
    });

    monaco.editor.create(document.getElementById('container'), {
        model: requirejs_model
    });

    monaco.editor.create(document.getElementById('container4'), {
        model: build_model
    });

    monaco.editor.create(document.getElementById('container2'), {model: req_log_model});
    monaco.editor.create(document.getElementById('container3'), {model: bundle_config_model});

    send();

    function gather() {
        return models.map(x => {
            return x.getLinesContent().join("\n");
        });
    }

    function send() {
        const gathered = gather();
        let parsed = m.parse(...gathered);
        build_model.setValue(parsed);
    }
});
