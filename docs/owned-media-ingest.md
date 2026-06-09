# owned-media 記事の取り込み・配信手順（step4）

> **状態: 下書き。初回 R-002 で実走しながら確定する。** ビルド/デプロイ/アセットパスの確定値は末尾「要確認」節を初回に埋めること。
> 横断フローの正本は harness `~/Documents/harness/docs/content-pipeline.md`（step4）。本書は tokishirazu 側の実装手順（F2: 1度作って再現可能に）。

## 役割境界（先に固定）

- content = 記事制作の正本（`article.md`＋図）。tokishirazu は**完成原稿を片方向で受け取り配信するだけ**（ADR 0003）。**原稿本文を書き換えない。**
- tokishirazu だけの責務（content が意図的に外したもの）: 製品名のアフィリエイト/製品リンク化・相談CTA・媒体トップ掲載導線・note群との双方向リンク・ページHTML/メタ/構造化データ。

## 入力（PULL・読むだけ）

- ROUTING R-002 `status-src` が指すファイル: `~/Documents/test/content/owned-media/260604_genai-journey-timeline/article.md`
- 同フォルダ: `fig01.png` `fig02.png` `fig03.png`（各 1600x900）、`figures-handoff.md`（図の最終仕様）、`brief.md`（立て付け）
- **着手時に frontmatter が `status: review` であることを確認**（`drafting` なら未完。`published` なら配信済）。

## 手順

1. **slug 決定**: 英小文字・ハイフン・日付なし（既存 `video-ad-inhouse-guide` に倣う）。例: `genai-journey-timeline`。
2. **ページ作成**: `public/media/articles/<slug>/index.html` を `public/media/articles/video-ad-inhouse-guide/index.html` から複製して作る。
3. **メタを frontmatter から移植**（雛形の `<head>` 構造に合わせる）:
   - `<title>` / `<meta name="description">` ← article.md frontmatter `title` / `description`
   - `<link rel="canonical">` / `og:url` = `https://www.tokishirazu.llc/media/articles/<slug>/`
   - `og:title` / `og:description` / `og:image`（1600x900。**OGP・アイキャッチは和トーンのブランド契約 `docs/image-tasks.md §1` に従う**＝本文図のカラフル路線を持ち込まない）
   - `article:published_time` / ld+json `datePublished` = 公開日
   - keywords は article.md frontmatter `keywords` を反映
4. **本文 Markdown→HTML**: article.md 本文を雛形の本文構造（class）に流し込む。図は `<slug>/fig0N.png` をコピーして参照、alt は article.md の alt を使用。**本文の文言は改変しない**（建前化・推敲は content の責務）。
5. **製品名リンク化**: Kling / Seedance / Higgsfield / Freepik 等のプレーンテキスト製品名にアフィリエイト/製品リンクを付与（content は差し込み前提でプレーンに温存している）。
6. **CTA / 導線**: 記事末に相談CTA（**本文には営業を入れない方針**＝CTAはHP側の責務）。`public/media/index.html`（媒体トップ）へ本記事の掲載導線を追加（現在 /media は非掲載なので掲載状態にする）。note群との双方向リンク。
7. **ビルド & 検証**: 「要確認」のビルド手順でビルド → Playwright MCP で表示・メタ・OGP・リンク切れを確認。
8. **公開**: 「要確認」のデプロイ手順で公開 → 公開URL確定。

## ループを閉じる（done 条件）

- 公開URL を harness `~/Documents/harness/ROUTING.md` の R-002 `feedback` に記入し、Obsidian campaign `08_campaigns/2026-06_tokishirazu_face/plan.md` へ戻す。
- content `article.md` の `status` を `published`、`updated` を公開日に更新（content 側で。harness hook がこの値を live 読取する）。
- harness `ROUTING.md` の R-002 を active→done（done は `status: published` ＋ feedback 非空が `validate-harness.sh` 条件）。

## 要確認（初回 R-002 で埋めて確定する）

- [ ] **ビルド方法**: SCSS→CSS / gulp タスク名 / `public/` は生成物か手書きか（`package.json`・`gulpfile` が repo 直下に無い。`old/` か別所か要確認。CLAUDE.md 次アクション「技術構成・デプロイ方法を記録」が未了）
- [ ] **デプロイ方法**: 本番 `www.tokishirazu.llc` への反映手順
- [ ] **画像の置き場規約**: 記事フォルダ直下 `<slug>/fig0N.png` か `/img/` 配下か
- [ ] **本文HTMLの class 体系**: 雛形 `video-ad-inhouse-guide/index.html` の本文セクションを確認して合わせる
- [ ] **アフィリエイトリンクの管理場所**: 直書きか定数か
- [ ] 確定したら本「要確認」節を消し、本書を正式手順に昇格（2本目から決定的）
