module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    // "extends": "eslint:recommended",
    // "extends": "plugin:@typescript-eslint/recommended",
    "extends": [
        "airbnb-typescript/base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    // "parserOptions": {
    //     "ecmaVersion": 2018,
    //     "sourceType": "module"
    // },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        // See: https://github.com/iamturns/eslint-config-airbnb-typescript/issues/9
        "no-extra-semi": "off",
        "semi": "off",

        /*
            I disabled the 80-character line length limitation, because I *mostly* disagree
            with it. I can see why it may be recommended to keep line lengths
            somewhat short: so they can fit entirely on screen, but the line
            lengths of 80 characters were implemented at a time when computer
            terminals often did not support more than 80 characters.

            Screens are much larger these days, and can fit more characters.
            My laptop that I am working on right now comfortably fits 120
            characters in width, despite having a file explorer open on the
            left side. So, right off the bat, a limitation of only 100
            characters seems a bit too conservative.

            Excessively stringent line length limitations can be remediated in
            these ways, all of which are usually undesirable:

            1. Shortening of variable names, which tends to make code less
               readable / obvious.
            2. Truncation of lines at the "dot," leading to visually
               misleading code.
            3. Conversion of daisy chains into a more cumbersome sequence
               of declarations and assignment.
        */
        "max-len": [ "error", 120 ],

        // This just does not work for some reason.
        "import/no-unresolved": "off",
    }
};