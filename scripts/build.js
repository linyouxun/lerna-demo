const fsPromise = require("fs/promises");
const fs = require("fs");
const path = require("path");

const pkg = require("../package.json");
const globby = require("globby");

async function getPaths() {
  
  
  const dirs = await globby(pkg.packages, {
    onlyFiles: false,
    gitignore: true,
  });
  console.log( dirs)
}
getPaths()