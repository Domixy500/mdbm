/*jslint beta, node*/
/*global*/

import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

const config = {
    input: "src/mdbm/index.js",
    onwarn(warning, warn) {
        if (warning.code === "THIS_IS_UNDEFINED") {
            return;
        }
        warn(warning);
    },
    output: [
        {
            file: "dist/mdbm-debug.js",
            format: "iife",
            name: "mdbm",
            plugins: [
                terser({
                    compress: false,
                    format: {
                        beautify: true,
                        comments: false
                    },
                    mangle: false
                })
            ],
            sourcemap: true
        },
        {
            file: "dist/mdbm.js",
            format: "iife",
            name: "mdbm",
            plugins: [
                terser({
                    format: {
                        comments: false
                    },
                    mangle: {
                        properties: false
                    }
                })
            ]
        }
    ],
    plugins: [
        resolve({
            extensions: [".js"]
        })
    ]
};

export default config; //jslint-ignore-line
