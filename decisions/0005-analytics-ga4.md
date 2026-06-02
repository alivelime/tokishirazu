# ADR 0005 — analytics-ga4

- **状態**: Proposed
- **日付**: 2026-06-02
- **対象**: アクセス解析の計測基盤

## 文脈

旧サイトには Universal Analytics（`UA-122399129-3`）が埋め込まれていたが、UA は 2023年7月にデータ計測を停止済みで実質無効。リニューアルで有効な計測が必要。ユーザーから GA4 測定ID `G-6KC04Q4EE3` の提供を受けた。

## 決定

1. 計測は **GA4（測定ID `G-6KC04Q4EE3`）** を全ページに導入する。
2. 測定IDの単一ソース化のため `assets/js/analytics.js` に gtag ブートストラップを置き、各ページ `<head>` で読み込む。
3. 旧 UA スニペット（`UA-122399129-3`）はリニューアル対象ページから除去する（`navball/` 等の対象外ページは別途）。
4. UTM＋案件別LP URL での計測を基本とし、媒体・ASP API 連携は計測が安定してから検討（`media_site_plan.md` §6）。

## 可逆性

GTM への移行や測定ID変更は `assets/js/analytics.js` 一箇所の差し替えで可能。

---
> Proposed。promote は人間が行う。
