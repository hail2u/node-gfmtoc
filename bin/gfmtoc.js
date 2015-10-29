#!/usr/bin/env node

"use strict";

var fs = require("fs");
var gfmtoc = require("../index");

var eol;
var file = "README.md";
var md;
var toc;

if (process.argv.length > 2) {
  file = process.argv[2];
}

md = fs.readFileSync(file, "utf8");
eol = gfmtoc.getEOL(md);
toc = gfmtoc.buildTOC(md);
fs.writeFileSync(file, md.split(eol).map(function (l) {
  if (l === "<!-- #toc -->") {
    this.skip = true;

    return l + eol + eol + toc;
  }

  if (l === "<!-- /toc -->") {
    l = eol + l;
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