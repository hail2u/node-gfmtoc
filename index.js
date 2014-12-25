var marked = require('marked');

var word = require('./lib/regexp-word');

exports.getEol = function (s) {
  var cr = '\r';
  var lf = '\n';
  var crlf = '\r\n';

  if (!s) {
    return os.EOL;
  }

  var r = s.split(cr).length;
  var n = s.split(lf).length;
  var rn = s.split(crlf).length;

  if (r === rn && n === rn) {
    return crlf;
  }

  if (r > n) {
    return cr;
  }

  return lf;
};

exports.buildToc = function (markdown, eol) {
  if (!eol) {
    eol = this.getEol(markdown);
  }

  var indent = '  ';
  var h = [];
  var renderer = new marked.Renderer();
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
    var sp = new Array(Math.max(0, v.l - a[0].l + 1)).join(indent);
    var id = v.r.toLowerCase();
    var uniq = '';
    id = id.replace(word, '');
    id = id.replace(/ /g, '-');

    if (!this.headers[id]) {
      this.headers[id] = 1;
    } else {
      uniq = '-' + this.headers[id];
      this.headers[id] += 1;
    }

    return sp + '* [' + v.r + '](#' + encodeURIComponent(id + uniq) + ')';
  }, {
    headers: {}
  }).join(eol).trim();
};
