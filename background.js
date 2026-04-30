function localDateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function normalizeRecord(existing) {
  if (!existing || typeof existing !== 'object') {
    return { counts: {}, deleted: {} };
  }
  if (existing.counts || existing.deleted) {
    return {
      counts: existing.counts || {},
      deleted: existing.deleted || {},
    };
  }
  // legacy format: whole object was a counts map
  return { counts: { ...existing }, deleted: {} };
}

let writeQueue = Promise.resolve();

function enqueueUpdate(counts, deleted) {
  writeQueue = writeQueue
    .then(async () => {
      const today = localDateKey();
      const data = await chrome.storage.local.get([today]);
      const record = normalizeRecord(data[today]);

      for (const [code, n] of Object.entries(counts || {})) {
        record.counts[code] = (record.counts[code] || 0) + n;
      }
      for (const [code, n] of Object.entries(deleted || {})) {
        record.deleted[code] = (record.deleted[code] || 0) + n;
      }

      await chrome.storage.local.set({ [today]: record });
    })
    .catch((err) => console.error('[KeyCounter] write failed:', err));
  return writeQueue;
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.type === 'keys') {
    enqueueUpdate(msg.counts, msg.deleted);
  }
});
