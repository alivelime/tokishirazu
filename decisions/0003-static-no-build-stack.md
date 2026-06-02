# ADR 0003 — static-no-build-stack

- **状態**: Proposed
- **日付**: 2026-06-02
- **対象**: リニューアル後のフロント技術スタック

## 文脈

旧サイトは Start Bootstrap Agency v4.1.1（SCSS + gulp + Bootstrap4 + jQuery）の単一ページ。gulp タスク記法が gulp4 非互換の疑いがあり、ビルド再現性が不安定。ホスティングはビルドなし配信（[[0002-hosting-cloudflare-pages]]）。ページ・記事・LP を増やしやすい構成が必要。

## 決定

1. **素の静的 HTML/CSS** に作り直す。共有デザインシステムを `assets/css/site.css` 一枚に集約。
2. JS は依存なしの最小限（`assets/js/site.js` ＝ナビ開閉・年表示、`assets/js/analytics.js` ＝GA4）。
3. **gulp / SCSS / Bootstrap / jQuery には新規依存しない**。旧 `scss/`・`gulpfile.js`・`vendor/`・旧 `js/` は参照されないデッドコードとなる（物理削除は別途、本ADRでは残置可）。
4. ページ間の header/footer は複製で維持（includes なし）。ページ数が大幅に増えたら Vite 等のビルド導入を別ADRで検討。

## 可逆性

後から Vite 等のビルドを導入しても、生成物を同じ静的ファイルとして出力すれば配信方法（0002）は変えずに済む。

---
> Proposed。promote は人間が行う。
