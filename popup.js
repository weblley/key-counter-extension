const tbody = document.getElementById('tbody');
const totalEl = document.getElementById('total');
const uniqueEl = document.getElementById('unique');
const correctionEl = document.getElementById('correction');
const emptyEl = document.getElementById('empty');
const sortEl = document.getElementById('sort');

let currentRange = 'day';
let currentSort = 'count';

function localDateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function datesForRange(range) {
  if (range === 'all') return null;
  const n = range === 'day' ? 1 : range === 'week' ? 7 : 30;
  const today = new Date();
  const set = new Set();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    set.add(localDateKey(d));
  }
  return set;
}

function prettyCode(code) {
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Digit')) return code.slice(5);
  if (code.startsWith('Numpad')) return 'Num ' + code.slice(6);
  const map = {
    ShiftLeft: 'Shift (L)',
    ShiftRight: 'Shift (R)',
    ControlLeft: 'Ctrl (L)',
    ControlRight: 'Ctrl (R)',
    AltLeft: 'Alt (L)',
    AltRight: 'Alt (R)',
    MetaLeft: 'Cmd (L)',
    MetaRight: 'Cmd (R)',
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
    Space: 'Space',
    Enter: 'Enter',
    Backspace: 'Backspace',
    Delete: 'Delete',
    Tab: 'Tab',
    Escape: 'Esc',
    CapsLock: 'CapsLock',
    Minus: '-',
    Equal: '=',
    BracketLeft: '[',
    BracketRight: ']',
    Backslash: '\\',
    Semicolon: ';',
    Quote: "'",
    Comma: ',',
    Period: '.',
    Slash: '/',
    Backquote: '`',
    IntlRo: 'ろ',
    IntlYen: '¥',
    Convert: '変換',
    NonConvert: '無変換',
    Lang1: 'かな',
    Lang2: '英数',
  };
  return map[code] || code;
}

function isDateKey(k) {
  return /^\d{4}-\d{2}-\d{2}$/.test(k);
}

function normalizeRecord(raw) {
  if (!raw || typeof raw !== 'object') return { counts: {}, deleted: {} };
  if (raw.counts || raw.deleted) {
    return { counts: raw.counts || {}, deleted: raw.deleted || {} };
  }
  return { counts: { ...raw }, deleted: {} };
}

async function render() {
  const all = await chrome.storage.local.get(null);
  const dates = datesForRange(currentRange);

  const counts = {};
  const deleted = {};

  for (const [key, value] of Object.entries(all)) {
    if (!isDateKey(key)) continue;
    if (dates && !dates.has(key)) continue;
    const rec = normalizeRecord(value);
    for (const [code, n] of Object.entries(rec.counts)) {
      counts[code] = (counts[code] || 0) + n;
    }
    for (const [code, n] of Object.entries(rec.deleted)) {
      deleted[code] = (deleted[code] || 0) + n;
    }
  }

  const total = Object.values(counts).reduce((s, n) => s + n, 0);
  const correctionTotal =
    (counts.Backspace || 0) + (counts.Delete || 0);

  totalEl.textContent = total.toLocaleString();
  uniqueEl.textContent = Object.keys(counts).length.toLocaleString();
  correctionEl.textContent =
    total > 0
      ? ((correctionTotal / total) * 100).toFixed(2) + '%'
      : '0.00%';

  const rows = Object.entries(counts).map(([code, n]) => {
    const del = deleted[code] || 0;
    const mistakeRate = n > 0 ? (del / n) * 100 : 0;
    return { code, count: n, deleted: del, mistakeRate };
  });

  rows.sort((a, b) => {
    if (currentSort === 'mistakeRate') {
      // require some presses to avoid noise (1-off keys showing 100%)
      const minPress = 5;
      const aKey = a.count >= minPress ? a.mistakeRate : -1;
      const bKey = b.count >= minPress ? b.mistakeRate : -1;
      if (bKey !== aKey) return bKey - aKey;
      return b.count - a.count;
    }
    if (currentSort === 'deleted') {
      if (b.deleted !== a.deleted) return b.deleted - a.deleted;
      return b.count - a.count;
    }
    return b.count - a.count;
  });

  tbody.innerHTML = '';
  if (rows.length === 0) {
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  const frag = document.createDocumentFragment();
  rows.forEach((row, i) => {
    const pct = total > 0 ? ((row.count / total) * 100).toFixed(2) : '0.00';
    const mistakePct =
      row.count > 0 ? row.mistakeRate.toFixed(1) : '—';

    const tr = document.createElement('tr');

    const tdIdx = cell(i + 1, 'num');
    const tdKey = cell(prettyCode(row.code), 'key');
    tdKey.title = row.code;
    const tdNum = cell(row.count.toLocaleString(), 'num');
    const tdPct = cell(pct + '%', 'num pct');
    const tdDel = cell(row.deleted ? row.deleted.toLocaleString() : '—', 'num');
    const tdMistake = cell(
      row.count > 0 && row.deleted > 0 ? mistakePct + '%' : '—',
      'num mistake'
    );

    tr.append(tdIdx, tdKey, tdNum, tdPct, tdDel, tdMistake);
    frag.appendChild(tr);
  });
  tbody.appendChild(frag);
}

function cell(text, cls) {
  const td = document.createElement('td');
  if (cls) td.className = cls;
  td.textContent = text;
  return td;
}

document.querySelectorAll('.tabs button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentRange = btn.dataset.range;
    render();
  });
});

sortEl.addEventListener('change', () => {
  currentSort = sortEl.value;
  render();
});

document.getElementById('reset').addEventListener('click', async () => {
  if (!confirm('全データをリセットしますか？（元に戻せません）')) return;
  await chrome.storage.local.clear();
  render();
});

document.getElementById('export').addEventListener('click', async () => {
  const all = await chrome.storage.local.get(null);
  const rows = [['date', 'code', 'key', 'count', 'deleted']];
  for (const [date, value] of Object.entries(all)) {
    if (!isDateKey(date)) continue;
    const rec = normalizeRecord(value);
    const codes = new Set([
      ...Object.keys(rec.counts),
      ...Object.keys(rec.deleted),
    ]);
    for (const code of codes) {
      rows.push([
        date,
        code,
        prettyCode(code),
        rec.counts[code] || 0,
        rec.deleted[code] || 0,
      ]);
    }
  }
  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `key-counts-${localDateKey(new Date())}.csv`;
  a.click();
  URL.revokeObjectURL(url);
});

render();
