# STATUS — tokishirazu-media

> 現在状態の正本。**上書き更新**。新しいセッションはここから再開する。
> SessionStart hook がこのファイルを context 注入する。短く保つ。

最終更新: 2026-06-02

## 現フェーズ

**サイト全面リニューアル完了**。Start Bootstrap Agency の単一ページから、**素の静的HTML/CSS**（ビルドなし、Cloudflare Pages 配信）へ刷新。実装ページ: トップ `/`・会社概要 `/company/`・問い合わせ `/contact/`・プライバシー `/privacy/`・PR表記方針 `/disclosure/`・メディア `/media/`・記事 `/media/articles/video-ad-inhouse-guide/`・サンプルLP `/lp/sample-ai-video/`（noindex・非掲載・外部リンクなし）。共有: `assets/css/site.css`, `assets/js/{site,analytics}.js`。**GA4 `G-6KC04Q4EE3` 全ページ導入・旧UA除去**。robots/sitemap/404 追加。ローカル検証で GA4 発火確認済み。方針は ADR 0002–0005（Proposed）。master へ push 済み・**本番公開中**。公開ファイルは `public/` に集約し、Cloudflare Pages の Build output directory = `public` を設定済み（内部ドキュメントはルートに残置＝版管理しつつ非公開、本番で 404 を確認）。

## 進行中

- **ルート整理＋Dependabot対処済（未merge）**: 旧テーマ資産を `old/` へ退避、未使用の `package.json`/`package-lock.json` を非追跡化。ブランチ `chore/cleanup-root-and-deps`・コミット `ea06d9b`。**master へ merge/push すると Dependabot アラートが解消**（push は人間承認待ち）。
- **次セッション: 内容のブラッシュアップ**（コピー・具体性・画像がプレースホルダ／一般論寄り）。手直しリスト → `docs/content-brushup-todo.md`。**ブランド/デザイン方針はユーザーが別途まとめる**。

## ブロッカー / 保留

- **画像**: 新規画像は未作成（プレースホルダ＋既存流用）。Codex で生成 → `docs/image-tasks.md` のタスク参照。
- **実案件LP・アフィリンク**: A8.net 案件調査の確定待ち（現状はサンプルLPのみ、外部リンクなし）。
- **問い合わせフォーム**: 当面メール案内。将来 Cloudflare Pages Functions でフォーム化を検討。

## 次アクション

1. **内容ブラッシュアップ**: `docs/content-brushup-todo.md` の項目（トップ／会社概要／記事／サンプルLP／法務／画像／後片付け）を順に手直し。
2. `docs/image-tasks.md` に沿って Codex で画像生成 → 差し替え（OGP・記事アイキャッチ・Heroビジュアル）。
3. A8.net 案件調査の結果を受けて最初の実案件LP要件を作成（`media_site_plan.md` §11）。

> 公開構成は確定（`public/` 配下のみ公開、内部資料は非公開で版管理）。本番で内部資料404・サイト200・GA4発火を確認済み。
