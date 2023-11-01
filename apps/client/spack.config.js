const { config } = require("@swc/core/spack");

module.exports = config({
  entry: "src/index.ts",
  output: {
    name: "index.js",
    path: "dist",
  },
  module: {},
  workingDir: "src",
});
