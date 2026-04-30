# Key Frequency Counter

A privacy-respecting Chrome extension that counts how often each physical key is pressed while you type — designed to help you analyze your typing patterns when designing custom keyboard layouts.

> 自作キーボードのキー配列を設計するためのタイピング頻度分析ツール。すべてローカル保存、外部送信なし。

## Features

- **Per-key press counts** — recorded by `KeyboardEvent.code` (physical key, not character).
- **Daily / 7-day / 30-day / all-time views** — toggle with one click.
- **Modifier keys counted individually** — `ShiftLeft` and `ShiftRight` are tracked separately.
- **Mistake estimation** — counts how often each key was deleted by `Backspace` immediately after being pressed; shows a per-key "mistake rate" (削除数 / 押下数).
- **Sort options** — by count, by mistake rate (with a 5-press minimum to avoid noise), or by deletion count.
- **CSV export** — one click, BOM-prefixed UTF-8 (Excel-friendly).
- **Password fields are skipped** — `<input type="password">` and elements under `[data-no-key-counter]` are explicitly excluded.
- **Auto-repeat is ignored** — holding a key down does not inflate the count.
- **No network code** — data lives only in `chrome.storage.local`. See [PRIVACY_POLICY.md](./PRIVACY_POLICY.md).

## Install

### From Chrome Web Store

_Coming soon. Link will be added once the extension is published._

### From source (developer mode)

1. Clone or download this repository.
2. Open `chrome://extensions` in Chrome.
3. Toggle **Developer mode** on (top right).
4. Click **Load unpacked** and select the repository folder.
5. Pin the extension to the toolbar for quick access to the popup.

## Usage

1. Type normally on any web page.
2. Click the extension icon to open the popup.
3. Switch between **今日 / 7日 / 30日 / 全期間** to see counts over different time ranges.
4. Use the **並び替え** dropdown to sort by count, mistake rate, or deletion count.
5. Click **CSV** to download a daily breakdown for further analysis.
6. Click **リセット** to wipe all stored data.

### Tips for keyboard layout analysis

- Sort by **mistake rate** to find keys you tend to fat-finger — candidates for moving closer to the home row or assigning to a stronger finger.
- Sort by **count** to find your most-used keys — these belong on the home row.
- Export weekly snapshots and diff them in a spreadsheet to see how your typing patterns shift as you adjust your layout.

## File structure

```
key-counter-extension/
├── manifest.json        # Manifest V3 config
├── content.js           # keydown listener + buffer (per-tab)
├── background.js        # service worker; persists to chrome.storage.local
├── popup.html           # popup UI
├── popup.css
├── popup.js             # aggregation, sorting, CSV export
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── PRIVACY_POLICY.md    # also published as the official privacy URL
├── LICENSE              # MIT
└── README.md            # this file
```

## Storage schema

Each calendar day (local time, `YYYY-MM-DD`) is one entry in `chrome.storage.local`:

```jsonc
{
  "2026-04-30": {
    "counts":  { "KeyA": 412, "ShiftLeft": 88, "Backspace": 64, ... },
    "deleted": { "KeyA": 12, "Semicolon": 5, ... }   // attributed to Backspace
  }
}
```

A backwards-compatible loader (`normalizeRecord` in both `background.js` and `popup.js`) handles records written by earlier versions where the date entry was just the counts map.

## Privacy

- Only `event.code` (physical key) and a count are recorded. The character produced is never read.
- Password fields (`<input type="password">`) are skipped at the source.
- All data stays in `chrome.storage.local`. There is no network code.
- See [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) for the full policy (English / 日本語).

To opt-out a specific element on your own pages, add `data-no-key-counter` to it (or to any ancestor):

```html
<div data-no-key-counter>
  <input type="text" />
</div>
```

## Development

No build step. Edit files in place and click the reload button on `chrome://extensions`.

To regenerate icons:

```bash
python3 -c "
from PIL import Image, ImageDraw
def make(s, p):
    img = Image.new('RGBA', (s, s), (0,0,0,0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((0,0,s-1,s-1), radius=max(2,int(s*22/128)), fill=(37,99,235,255))
    bw = max(1, round(s*20/128))
    for xf, yf, hf in [(24/128,64/128,40/128),(54/128,40/128,64/128),(84/128,56/128,48/128)]:
        x, y = round(s*xf), round(s*yf); h = max(1, round(s*hf))
        d.rounded_rectangle((x,y,x+bw-1,y+h-1), radius=max(1,int(s*3/128)), fill=(255,255,255,255))
    img.save(p, 'PNG')
for s in [16,32,48,128]: make(s, f'icons/icon{s}.png')
"
```

## Limitations

- Only counts keystrokes inside web pages. Native apps (VS Code desktop, Slack desktop, Terminal, etc.) are not measured.
- `chrome://` URLs, the Chrome Web Store, and `view-source:` pages cannot be instrumented (Chrome restriction).
- Forward-delete (`Delete` key) is counted as a correction in the global rate but is not attributed to any specific key.
- Selection-then-delete is approximated as a single deletion (one stack pop per `Backspace`).

## License

MIT — see [LICENSE](./LICENSE).

## Contact

Masayoshi Yukitani — `masayoshi.yukitani@weblley.com`
