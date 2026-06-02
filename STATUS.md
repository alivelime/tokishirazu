# STATUS — tokishirazu-media

> 現在状態の正本。**上書き更新**。新しいセッションはここから再開する。
> SessionStart hook がこのファイルを context 注入する。短く保つ。

最終更新: 2026-06-02

## 現フェーズ

**サイト全面リニューアル完了**。Start Bootstrap Agency の単一ページから、**素の静的HTML/CSS**（ビルドなし、Cloudflare Pages 配信）へ刷新。実装ページ: トップ `/`・会社概要 `/company/`・問い合わせ `/contact/`・プライバシー `/privacy/`・PR表記方針 `/disclosure/`・メディア `/media/`・記事 `/media/articles/video-ad-inhouse-guide/`・サンプルLP `/lp/sample-ai-video/`（noindex・非掲載・外部リンクなし）。共有: `assets/css/site.css`, `assets/js/{site,analytics}.js`。**GA4 `G-6KC04Q4EE3` 全ページ導入・旧UA除去**。robots/sitemap/404 追加。ローカル検証で GA4 発火確認済み。方針は ADR 0002–0005（Proposed）。ブランチ `renewal-2026-06` → master push で Cloudflare Pages 自動デプロイ。

## 進行中

- **構成変更の有効化待ち（要・人手）**: 公開ファイルを `public/` に集約済み（コミット `df9f773`、未push）。**Cloudflare Pages の Build output directory を `public` に設定**してから master を push する。これにより内部ドキュメント（`media_site_plan.md`・`STATUS`・`decisions/`・`.claude/` 等＝ルートに残置）が公開されなくなる。設定変更だけでは現行デプロイは落ちない（次回ビルドから有効）。順序: ①Cloudflare設定→②push。
- 内部ドキュメントを git 管理下に追加（ルートに集約、`public/` 配信外なので非公開）。

## ブロッカー / 保留

- **画像**: 新規画像は未作成（プレースホルダ＋既存流用）。Codex で生成 → `docs/image-tasks.md` のタスク参照。
- **実案件LP・アフィリンク**: A8.net 案件調査の確定待ち（現状はサンプルLPのみ、外部リンクなし）。
- **問い合わせフォーム**: 当面メール案内。将来 Cloudflare Pages Functions でフォーム化を検討。

## 次アクション

0. **（最優先・人手）Cloudflare Pages → Settings → Builds & deployments → Build command 空 / Build output directory = `public` に設定。** その後 master を push（→公開は `public/` 配下のみ、内部ドキュメントは非公開に）。push 後に本番URLとGA4を確認。
1. master へ push し Cloudflare Pages の本番反映と GA4 をブラウザで確認。
2. `docs/image-tasks.md` に沿って Codex で画像生成 → 差し替え。
3. A8.net 案件調査の結果を受けて最初の実案件LP要件を作成（`media_site_plan.md` §11）。
4. 公開前チェックリストの整備（§11）。
5. （任意）旧テーマ資産 `scss/`・`gulpfile.js`・`vendor/`・旧 `js/` の物理削除と `navball/` の旧UA対応。
