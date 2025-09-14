/*jslint beta, node*/
/*global*/

import alias from "@rollup/plugin-alias";
import {fileURLToPath} from "url";
import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

const __dirname = path.dirname( //jslint-ignore-line
    fileURLToPath(import.meta.url)
);

const config = {
    input: "src/complex/index.js",
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
        alias({
            entries: [{
                find: "@app",
                replacement: path.resolve(__dirname, "src/app")
            }, {
                find: "@common",
                replacement: path.resolve(__dirname, "src/common")
            }]
        }),
        resolve({
            extensions: [".js"]
        })
    ]
};

export default config; //jslint-ignore-line
