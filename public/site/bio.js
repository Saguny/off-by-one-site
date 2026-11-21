(function () {
  var INK = '#121212', DIM = '#6a6a66';
  var GLYPHS = 'ABCDEFGHJKLNOPRSVXYZ0123456789';
  function hash(a, b) {
    var h = Math.imul((a | 0) ^ 0x9e3779b9, 374761393) ^ Math.imul(((b | 0) + 0x632be5ab) | 0, 668265263);
    h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }
  function code(seed, len) {
    var s = '';
    for (var i = 0; i < len; i++) s += GLYPHS[Math.floor(hash(seed, i) * GLYPHS.length)];
    return s;
  }

  document.querySelectorAll('.frame').forEach(function (f) {
    ['tl', 'tr', 'bl', 'br'].forEach(function (k) {
      var x = document.createElement('i');
      x.className = 'x ' + k;
      f.appendChild(x);
    });
  });

  document.querySelectorAll('[data-copy]').forEach(function (b) {
    var label = b.querySelector('span');
    var old = label.textContent;
    function flash(t) { label.textContent = t; setTimeout(function () { label.textContent = old; }, 1400); }
    function legacy() {
      var t = document.createElement('textarea');
      t.value = b.dataset.copy; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      var ok = document.execCommand('copy');
      t.remove();
      flash(ok ? 'COPIED' : b.dataset.copy.toUpperCase());
    }
    b.addEventListener('click', function () {
      if (!navigator.clipboard) return legacy();
      navigator.clipboard.writeText(b.dataset.copy).then(function () { flash('COPIED'); }, legacy);
    });
  });

  document.querySelectorAll('.bio-barcode').forEach(function (cv) {
    var r = cv.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
    var x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    x.fillStyle = INK;
    var seed = parseInt(cv.dataset.seed, 10), px = 0, i = 0;
    while (px < r.width - 120) {
      var bw = 1 + Math.floor(hash(seed, i) * 4);
      x.fillRect(px, 0, bw, r.height - 12);
      px += bw + 1 + Math.floor(hash(seed, i + 500) * 4); i++;
    }
    x.font = '10px "Space Mono", monospace';
    x.fillStyle = DIM; x.textAlign = 'right';
    x.fillText('ID ' + code(seed, 8), r.width, r.height - 14);
  });
})();
