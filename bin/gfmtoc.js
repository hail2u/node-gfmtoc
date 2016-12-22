#!/usr/bin/env node

"use strict";

const fs = require("fs");
const gfmtoc = require("../index");

let input = "README.md";
let output;

if (process.argv.length > 2) {
  input = process.argv[2];
}

output = input;

if (input === "-") {
  input = process.stdin.fd;
  output = process.stdout.fd;
}

const md = fs.readFileSync(input, "utf8");
const eol = gfmtoc.getEOL(md);
const toc = gfmtoc.buildTOC(md);

fs.writeFileSync(output, md.split(eol).map(function (l) {
  if (l === "<!-- #toc -->") {
    this.skip = true;

    return `${l}${eol}${eol}${toc}`;
  }

  if (l === "<!-- /toc -->") {
    l = `${eol}${l}`;
    this.skip = false;
  }

  if (this.skip) {
    return undefined;
  }

  return l;
}, {
  skip: false
}).filter(function (l) {
  return l !== undefined;
}).join(eol));
