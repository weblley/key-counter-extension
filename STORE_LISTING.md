# Chrome Web Store Listing — Copy/Paste Reference

> このファイルは Web Store Developer Dashboard に貼り付けるためのテキスト集です。
> 公開リポジトリに含めて問題ありませんが、ZIP パッケージには含めません。

---

## Item title

```
Key Frequency Counter
```

## Category

```
Productivity
```

## Language

Primary: **English**
Also list: **Japanese (ja)**

---

## Short description (English) — max 132 chars

```
Counts how often each physical key is pressed while you type, to help design custom keyboard layouts. 100% local, no tracking.
```

## Short description (日本語) — 132文字以内

```
タイピング時に各物理キーが押された回数を集計し、自作キーボードのキー配列設計を助けるツール。すべてローカル保存・外部送信なし。
```

---

## Detailed description (English)

```
Key Frequency Counter is a privacy-respecting Chrome extension for people designing custom keyboard layouts (split keyboards, ergonomic boards, hand-wired builds, ortholinear, etc.).

It counts how often each physical key on your keyboard is pressed while you type in web pages, so you can identify:
- Your most-used keys (candidates for the home row)
- Keys you frequently follow with Backspace (candidates to move closer to a stronger finger)
- The balance of left vs. right modifier usage

WHAT IT TRACKS
- Per-key press counts, identified by KeyboardEvent.code (the physical key, not the character produced)
- Daily, 7-day, 30-day, and all-time aggregates
- Backspace-attributed deletion counts ("which key was most often the one you erased")

WHAT IT DOES NOT TRACK
- The actual characters or text you type
- The contents of any input, form, document, or page
- URLs, page titles, or browsing history
- Personal information of any kind
- Keystrokes inside <input type="password"> fields are explicitly skipped

PRIVACY
All data is stored locally using chrome.storage.local. No data ever leaves your device — the extension contains no networking code. You can clear all data at any time with the Reset button. Full privacy policy: (link will be added upon publication).

FEATURES
- One-click view switching: today / 7 days / 30 days / all time
- Sort by count, mistake rate, or deletion count
- CSV export (UTF-8 with BOM, opens cleanly in Excel)
- Modifier keys tracked individually (ShiftLeft vs ShiftRight, etc.)
- Auto-repeat is ignored — holding a key down does not inflate counts
- Opt out specific elements with [data-no-key-counter]

LIMITATIONS
- Only measures typing inside web pages. Native apps (VS Code desktop, Slack desktop, Terminal) are not measured.
- chrome:// URLs and the Chrome Web Store cannot be instrumented (Chrome restriction).

OPEN SOURCE
Source code: https://github.com/weblley/key-counter-extension
License: MIT
```

## 詳細な説明（日本語）

```
Key Frequency Counter は、自作キーボード（分割キーボード、エルゴノミクス、ハンドワイヤード、Ortholinear など）の配列設計を支援する、プライバシー重視の Chrome 拡張機能です。

ウェブページでのタイピング時に各物理キーが押された回数を集計するので、以下のような分析ができます：
- よく使うキー（ホームポジションに置くべきキーの候補）
- 直後に Backspace を押すことが多いキー（押し間違えやすい＝強い指へ移すべきキーの候補）
- 左右の修飾キーの使用バランス

集計する内容
- 各キーの押下回数（KeyboardEvent.code を使用 — 入力文字ではなく物理キー）
- 今日・7日・30日・全期間の集計
- Backspace 直前のキーに紐付けた「削除されたキー」のカウント

集計しない内容
- 実際に入力された文字やテキスト
- 入力欄・フォーム・文書・ページの内容
- URL・ページタイトル・閲覧履歴
- あらゆる個人情報
- <input type="password"> 内のキー入力は明示的に除外

プライバシー
すべてのデータは chrome.storage.local によりローカルに保存され、端末外に送信されることは一切ありません（外部通信コード自体が存在しません）。リセットボタンでいつでも全データを削除できます。プライバシーポリシー全文：（公開後にリンク追記）。

機能
- 今日 / 7日 / 30日 / 全期間 をワンクリックで切り替え
- 回数順 / ミス率順 / 削除数順 でソート
- CSVエクスポート（UTF-8 BOM 付き、Excel で文字化けしません）
- 修飾キーを個別カウント（ShiftLeft と ShiftRight を区別）
- オートリピート（長押し）は除外
- [data-no-key-counter] 属性でカウント対象外にできます

制限
- ウェブページ内のタイピングのみ計測対象。VS Code デスクトップ・Slack デスクトップ・ターミナル等のネイティブアプリは対象外。
- chrome:// や Chrome ウェブストアでは Chrome の仕様上計測できません。

オープンソース
ソースコード：https://github.com/weblley/key-counter-extension
ライセンス：MIT
```

---

## Single purpose declaration

```
Counts physical key press frequencies (KeyboardEvent.code) locally and shows the user a per-key tally and percentage to help them design a custom keyboard layout. The extension never reads, stores, or transmits the actual characters typed.
```

## Permission justifications

### `storage`

```
Used to persist the daily per-key press counts on the user's local device via chrome.storage.local, so that aggregates over today / 7 days / 30 days / all time can be displayed in the popup. No data is ever transmitted off the device.
```

### Host permission via content script `matches: ["<all_urls>"]`

```
The extension's purpose is to measure the user's overall typing frequency, which inherently requires observing keydown events on every site where the user types. Only the physical key code (KeyboardEvent.code) is read — never the character produced, the input element's value, the page DOM, the URL, or any context. Keystrokes inside <input type="password"> fields and elements with [data-no-key-counter] are explicitly skipped.
```

---

## Privacy practices disclosure

| Category | Collect? | Notes |
|---|---|---|
| Personally identifiable information | No | |
| Health information | No | |
| Financial and payment information | No | |
| Authentication information | No | Password fields explicitly skipped |
| Personal communications | No | Text content is never read |
| Location | No | |
| Web history | No | URLs not recorded |
| User activity | **Yes** | Keyboard event codes (physical key only) and counts. No characters, no timing, no sequences. |
| Website content | No | Only `KeyboardEvent.code` and the target's tag/type for password skipping |

### Compliance certifications (check all three)

- [x] I do not sell or transfer user data to third parties, outside of the approved use cases.
- [x] I do not use or transfer user data for purposes that are unrelated to my item's single purpose.
- [x] I do not use or transfer user data to determine creditworthiness or for lending purposes.

---

## Privacy policy URL

```
https://weblley.github.io/key-counter-extension/privacy/
```

GitHub Pages is enabled on `main` branch root. The policy is rendered from `PRIVACY_POLICY.md` via Jekyll (Cayman theme) with `permalink: /privacy/`.

---

## Promotional images checklist

- [ ] **Small promo tile**: 440 × 280 PNG/JPG (recommended)
- [ ] **Marquee promo tile**: 1400 × 560 PNG/JPG (optional, helps visibility)
- [ ] **Screenshots**: at least 1, max 5, **1280 × 800** or 640 × 400 PNG/JPG
  - Suggested shots:
    1. Popup showing **Today** view with sorted top keys
    2. Popup showing **Mistake rate sort** with a few keys highlighted
    3. **CSV export** in action / opened in a spreadsheet
    4. (Optional) Mock keyboard layout decision overlay using exported CSV

---

## Submission checklist

1. [ ] Build ZIP: `cd ~/key-counter-extension && zip -r key-counter-v1.0.0.zip manifest.json content.js background.js popup.html popup.css popup.js icons LICENSE README.md`
2. [ ] Verify ZIP contents (no `.git/`, no `.DS_Store`, no `STORE_LISTING.md`, no `*.zip`)
3. [ ] Privacy policy URL is live on HTTPS
4. [ ] Screenshots prepared (≥1 at 1280×800)
5. [ ] Promotional small tile prepared (440×280)
6. [ ] Upload ZIP at https://chrome.google.com/webstore/devconsole
7. [ ] Paste short description, detailed description (per language)
8. [ ] Set category: Productivity
9. [ ] Paste single purpose declaration
10. [ ] Paste permission justifications
11. [ ] Fill privacy practices disclosure (User activity = Yes; everything else = No)
12. [ ] Check the three compliance certifications
13. [ ] Add privacy policy URL
14. [ ] Submit for review

Expected review time: 1–7 days. Input-monitoring extensions often get extra scrutiny — be patient. If rejected, the most likely reason is the privacy policy not being specific enough about what's stored vs. not stored. The provided PRIVACY_POLICY.md is written to address this directly.
