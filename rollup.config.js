/*jslint beta, node*/
/*global*/

import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const config = {
    input: "src/index.ts",
    output: [
        {
            file: "dist/mdbm.debug.js",
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
            file: "dist/mdbm.min.js",
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
            extensions: [".ts", ".js"]
        }),
        typescript({
            tsconfig: "./tsconfig.json"
        })
    ]
};

export default config; //jslint-ignore-line
