module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    // "plugins": [
    //     "html",
    //     "vue"
    // ],
    "globals": {
        "Vue": true,
    },
    "rules": {
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "vue/html-indent": [
            "error",
            4
        ],
        "vue/html-closing-bracket-spacing": [
            "error",
            {
                "selfClosingTag": "never"
            }
        ]
    }
};