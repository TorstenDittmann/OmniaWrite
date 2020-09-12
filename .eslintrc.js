module.exports = {
    "env": {
        "browser": true,
        "amd": true,
        "node": true,
        "es6": true
    },
    "plugins": [
        "svelte3"
    ],
    "overrides": [
        {
            "files": [
                "**/*.svelte"
            ],
            "processor": "svelte3/svelte3"
        }
    ],
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "settings": {
        "svelte3/ignore-styles": () => true
    }
}