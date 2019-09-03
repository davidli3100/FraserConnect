#!/usr/bin/env node

const fs = require("fs-extra");
fs.copy("node_modules_overrides", "node_modules")
  .then(() => console.log("node_modules overridden successfully."))
  .catch(err => console.error(err));
