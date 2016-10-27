"use strict";

var marked = require("marked");
var os = require("os");
var word = require("./lib/regexp-word");

var gfmtoc = exports;

gfmtoc.getEOL = function (s) {
  var cr = "\r";
  var crlf = "\r\n";
  var lf = "\n";
  var n;
  var r;
  var rn;

  if (!s) {
    return os.EOL;
  }

  r = s.split(cr).length;
  n = s.split(lf).length;
  rn = s.split(crlf).length;

  if (r === rn && n === rn) {
    return crlf;
  }

  if (r > n) {
    return cr;
  }

  return lf;
};

gfmtoc.buildTOC = function (markdown, eol) {
  var h = [];
  var indent = "    ";
  var renderer = new marked.Renderer();

  if (!eol) {
    eol = this.getEOL(markdown);
  }

  renderer.heading = function (text, level, raw) {
    h.push({
      l: level,
      r: raw,
      t: text
    });

    return;
  };
  marked(markdown, {
    renderer: renderer
  });
  h.shift();

  return h.map(function (v, i, a) {
    var id = v.r.toLowerCase();
    var sp = new Array(Math.max(0, v.l - a[0].l + 1)).join(indent);
    var uniq = "";
    id = id.replace(word, "");
    id = id.replace(/ /g, "-");

    if (!this.headers[id]) {
      this.headers[id] = 1;
    } else {
      uniq = "-" + this.headers[id];
      this.headers[id] += 1;
    }

    return sp + "* [" + v.r + "](#" + encodeURIComponent(id + uniq) + ")";
  }, {
    headers: {}
  }).join(eol).trim();
};
