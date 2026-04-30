---
title: Privacy Policy
permalink: /privacy/
---

# Privacy Policy — Key Frequency Counter

_Last updated: 2026-04-30_

## English

### What this extension does

Key Frequency Counter is a Chrome extension that counts how often each physical key on your keyboard is pressed while you type in web pages. The aggregated data is intended to help you analyze your typing patterns for the purpose of designing custom keyboard layouts (e.g., for split / ergonomic / hand-wired keyboards).

### What data is collected

The extension records **only the following**, and **only on your local device**:

- The physical key code of each key press (e.g., `KeyA`, `ShiftLeft`, `Space`) — this is the value of `KeyboardEvent.code`, which represents the physical key, not the character produced.
- The number of times each key code has been pressed, grouped by calendar date (local time).
- For `Backspace`, the most recent non-modifier key code that was pressed before it (used to estimate "which keys you most often correct"). This is also stored as a count, not a sequence.

### What data is NOT collected

The extension does **not** collect, log, transmit, or store any of the following:

- The actual text or characters that you type.
- The contents of any text input, form, document, or web page.
- URLs, page titles, or browsing history.
- Personally identifiable information (name, email, address, phone, etc.).
- Authentication credentials. **Keystrokes inside `<input type="password">` fields are explicitly excluded** from counting. Elements (or their ancestors) carrying the attribute `data-no-key-counter` are also excluded.
- IP addresses, device identifiers, or analytics data.
- Health, financial, location, or biometric data.
- The order or timing of keystrokes (only aggregate counts per calendar day are stored).

### How data is stored

All collected counts are stored locally on your device using the browser's `chrome.storage.local` API. **No data is ever transmitted off your device.** The extension does not contain any network code that sends data to any server.

### Sharing

We do **not** sell, share, transfer, or otherwise disclose any data to third parties — because no data ever leaves your device in the first place.

### Use beyond the stated purpose

We do not use the data for any purpose other than presenting per-key counts and percentages to you in the extension popup, and exporting them as a CSV file when you click "CSV". The data is not used to determine creditworthiness or for lending purposes.

### Your control over the data

You can delete all stored data at any time by clicking the **Reset** button in the extension popup, or by removing the extension from Chrome. Uninstalling the extension permanently deletes all data from `chrome.storage.local`.

### Permissions and why they are needed

- `storage` — Required to persist daily key counts on your local device.
- Content script on `<all_urls>` — Required to listen for keyboard events on any web page where you type. Only the physical key code is read, never the character or any context. Pages on `chrome://`, the Chrome Web Store, and other browser-internal pages are excluded by Chrome itself and cannot be observed by this extension.

### Children's privacy

This extension is not directed to children under 13. It collects no personal information from anyone, including children.

### Changes to this policy

If the data handling practices ever change, this document will be updated and the version date above will be incremented. Material changes will also be reflected in the extension's release notes.

### Contact

For any questions regarding this privacy policy, contact:

**Masayoshi Yukitani** — `masayoshi.yukitani@weblley.com`

---

## 日本語

### この拡張機能について

Key Frequency Counter は、ウェブページでのタイピング時に各物理キーが何回押されたかをカウントする Chrome 拡張機能です。集計データは、自作キーボード（分割・エルゴ・ハンドワイヤード等）のキー配列設計を分析する目的で使用することを想定しています。

### 収集するデータ

本拡張は、**お使いのデバイス内のみ** で、以下の情報のみを記録します：

- 各キー押下時の物理キーコード（例：`KeyA`、`ShiftLeft`、`Space`）— `KeyboardEvent.code` の値であり、入力された文字ではなく **物理的なキー** を表します。
- 各キーコードが押下された回数（カレンダー日付・ローカルタイム単位で集計）。
- `Backspace` の直前に押された非修飾キーのキーコード（「よく押し直すキー」の推定に使用）。これも回数のみで、シーケンスは保存しません。

### 収集しないデータ

本拡張は、以下のいずれも **収集・記録・送信・保存しません**：

- 実際に入力された文字・テキスト内容。
- 入力欄、フォーム、文書、ページの内容。
- URL、ページタイトル、閲覧履歴。
- 氏名・メール・住所・電話番号などの個人情報。
- 認証情報。**`<input type="password">` 内でのキー入力は明示的にカウント対象から除外**しています。`data-no-key-counter` 属性を持つ要素（およびその子孫）も除外されます。
- IPアドレス、デバイス識別子、分析データ。
- 健康・財務・位置・生体情報。
- キーストロークの順序やタイミング（カレンダー日付ごとの集計回数のみ保存）。

### データの保存場所

収集された回数情報はすべて、ブラウザの `chrome.storage.local` API を用いて **お使いのデバイスにローカル保存** されます。**データが端末外へ送信されることは一切ありません。** 本拡張には外部サーバーへの通信コードが一切含まれていません。

### 第三者への共有

本拡張がデータを第三者に売却・共有・譲渡・開示することは **ありません** — そもそも、データが端末外へ出ることがないためです。

### 目的外利用

収集データは、拡張機能のポップアップでキー別の回数と割合を表示すること、および「CSV」ボタンによる CSV エクスポート以外の目的では使用しません。与信判定や融資目的での使用は行いません。

### データのコントロール

拡張機能のポップアップ内の **リセット** ボタンを押すか、Chrome から本拡張を削除することで、保存されている全データをいつでも削除できます。アンインストール時には `chrome.storage.local` のデータも完全に削除されます。

### 権限とその必要性

- `storage` — 日次のキー押下回数をお使いのデバイスにローカル保存するために必要です。
- `<all_urls>` のコンテンツスクリプト — タイピングが発生し得る任意のウェブページでキーイベントを購読するために必要です。読み取るのは物理キーコードのみで、文字や周辺コンテキストは一切取得しません。`chrome://` や Chrome ウェブストアなどのブラウザ内部ページは Chrome 側の仕様により除外され、本拡張からは観測できません。

### 子どものプライバシー

本拡張は 13 歳未満を対象としたものではありません。誰からも個人情報を収集しません（子どもを含む）。

### ポリシーの変更

データの取り扱いに変更があった場合、本ドキュメントを更新し、上部の更新日を改訂します。重要な変更はリリースノートにも記載します。

### 連絡先

本プライバシーポリシーに関するお問い合わせ：

**雪谷 雅良（Masayoshi Yukitani）** — `masayoshi.yukitani@weblley.com`
