"use strict";

const marked = require("marked");
const os = require("os");
const word = require("./lib/regexp-word");

const gfmtoc = exports;

gfmtoc.getEOL = function (s) {
  const cr = "\r";
  const crlf = "\r\n";
  const lf = "\n";

  if (!s) {
    return os.EOL;
  }

  const r = s.split(cr).length;
  const n = s.split(lf).length;
  const rn = s.split(crlf).length;

  if (r === rn && n === rn) {
    return crlf;
  }

  if (r > n) {
    return cr;
  }

  return lf;
};

gfmtoc.buildTOC = function (markdown, eol) {
  const h = [];
  const indent = "    ";
  const renderer = new marked.Renderer();

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
    const sp = new Array(Math.max(0, v.l - a[0].l + 1)).join(indent);
    const id = v.r.toLowerCase().replace(word, "").replace(/ /g, "-");

    let uniq = "";

    if (!this.headers[id]) {
      this.headers[id] = 1;
    } else {
      uniq = `-${this.headers[id]}`;
      this.headers[id] += 1;
    }

    return `${sp}* [${v.r}](#${encodeURIComponent(`${id}${uniq}`)})`;
  }, {
    headers: {}
  }).join(eol).trim();
};
