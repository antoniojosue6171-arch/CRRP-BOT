import * as esbuild from "esbuild";
import { cpSync, mkdirSync } from "fs";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node22",
  format: "esm",
  outfile: "dist/index.mjs",
  sourcemap: true,
  external: [
    "@discordjs/opus",
    "bufferutil",
    "utf-8-validate",
    "zlib-sync",
    "erlpack",
  ],
  banner: {
    js: `import{createRequire}from"module";const require=createRequire(import.meta.url);`,
  },
});

mkdirSync("dist/assets", { recursive: true });
cpSync("src/assets", "dist/assets", { recursive: true });
console.log("Assets copiados a dist/assets");
