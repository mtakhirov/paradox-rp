const path = require("node:path");
const { config } = require("@swc/core/spack");

module.exports = config({
  entry: path.resolve("src/index.ts"),
  output: {
    name: "index.js",
    path: path.resolve("dist"),
  },
  module: {},
  options: {
    sourceMaps: false,
    minify: true,
  },
  target: "browser",
  workingDir: "src",
});
