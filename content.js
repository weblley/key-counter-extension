(() => {
  const MODIFIER = new Set([
    'ShiftLeft',
    'ShiftRight',
    'ControlLeft',
    'ControlRight',
    'AltLeft',
    'AltRight',
    'MetaLeft',
    'MetaRight',
  ]);

  const buffer = {};
  const deletedBuffer = {};
  const typedStack = [];
  const STACK_MAX = 200;
  let flushTimer = null;

  function isSensitiveTarget(target) {
    if (!target || !(target instanceof Element)) return false;
    // Skip password fields and inputs explicitly opted out (autocomplete=off w/ password-like names)
    const tag = target.tagName;
    if (tag === 'INPUT') {
      const type = (target.getAttribute('type') || 'text').toLowerCase();
      if (type === 'password') return true;
    }
    // Respect explicit opt-out: data-no-key-counter or contenteditable parents marked sensitive
    if (target.closest && target.closest('[data-no-key-counter]')) return true;
    return false;
  }

  document.addEventListener(
    'keydown',
    (e) => {
      if (e.repeat) return;
      if (!e.code) return;
      if (isSensitiveTarget(e.target)) return;

      buffer[e.code] = (buffer[e.code] || 0) + 1;

      if (e.code === 'Backspace') {
        const last = typedStack.pop();
        if (last) {
          deletedBuffer[last] = (deletedBuffer[last] || 0) + 1;
        }
      } else if (e.code === 'Delete') {
        // no attribution (forward delete)
      } else if (!MODIFIER.has(e.code)) {
        typedStack.push(e.code);
        if (typedStack.length > STACK_MAX) typedStack.shift();
      }

      if (!flushTimer) flushTimer = setTimeout(flush, 1000);
    },
    true
  );

  function flush() {
    flushTimer = null;
    const hasCounts = Object.keys(buffer).length > 0;
    const hasDeleted = Object.keys(deletedBuffer).length > 0;
    if (!hasCounts && !hasDeleted) return;
    const payload = {
      type: 'keys',
      counts: { ...buffer },
      deleted: { ...deletedBuffer },
    };
    for (const k of Object.keys(buffer)) delete buffer[k];
    for (const k of Object.keys(deletedBuffer)) delete deletedBuffer[k];
    try {
      chrome.runtime.sendMessage(payload).catch(() => {});
    } catch (_) {}
  }

  window.addEventListener('pagehide', flush);
})();
