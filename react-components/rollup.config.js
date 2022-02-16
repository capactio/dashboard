import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonJS from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require("./package.json");

const isDevMode = process.env.NODE_ENV !== "production";
const plugins = [
  peerDepsExternal({ includeDependencies: false }),
  resolve({
    browser: true,
    moduleDirectories: ["node_modules", "../node_modules"],
  }),
  replace({
    preventAssignment: true,
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
  }),
  commonJS(),
  typescript({
    tsconfig: "./tsconfig.json",
    exclude: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.stories.mdx",
      "**/*.stories.ts",
    ],
    sourceMap: isDevMode,
  }),
  postcss(),
  json(),
];

if (!isDevMode) {
  plugins.push(...[terser()]);
}

const config = [
  defineConfig({
    input: "src/index.ts",
    treeshake: {
      moduleSideEffects: true,
    },
    output: [
      {
        file: packageJSON.main,
        format: "cjs",
        sourcemap: isDevMode,
      },
      {
        file: packageJSON.module,
        format: "esm",
        sourcemap: isDevMode,
      },
    ],
    plugins,
  }),
  defineConfig({
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  }),
];

export default config;
