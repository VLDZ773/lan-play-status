#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs");
const servers = require("./public/data/servers.json");
const communities = require("./src/data/communities.json");

const sourcePath = "./node_modules/flagpack-core/svg/l/";
const distPath = "./src/assets/flags/";

let flags = [];

servers.forEach(s => {
  let f = s.flag.toLowerCase();
  if (!flags.includes(f)) {
    flags.push(f);
  }
});

communities.forEach(c => {
  c.flags?.forEach(flag => {
    let f = flag.toLowerCase();
    if (!flags.includes(f)) {
      flags.push(f);
    }
  });
});

fs.rmdirSync(distPath, { recursive: true });
fs.mkdirSync(distPath, { recursive: true });
flags.forEach(f => {
  fs.copyFileSync(
    `${sourcePath}${f.toUpperCase()}.svg`,
    `${distPath}${f.toLowerCase()}.svg`
  );
});
