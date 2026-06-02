# log — 作業・判断の生ログ

> **追記のみ・時系列**（最新を下に積む）。「いつ・何を・なぜ」を残す。
> 結果（いま何が真か）は STATUS.md / 各正本へ。ここは経緯。
>
> 書式: `## YYYY-MM-DD` 見出しの下に `- <何をしたか / なぜ>`。

## 2026-06-02

- ハーネス初期化（型: code / self-mod: strict）。`harness/scripts/init-harness.sh` で展開、`validate-harness.sh` PASS。
- 既存テーマ README（Start Bootstrap Agency 定型文）を `README.theme.md` に退避してから展開（README.md 衝突回避）。
- CLAUDE.md / STATUS.md / README.md / MISSIONS.md のプレースホルダを `media_site_plan.md` に基づき記入。最初のミッション `2026-0602-survey-existing-site` を起票。
- Playwright MCP を `.mcp.json` に設定。インストール済み Chromium（ms-playwright `chromium-1223`, v148）を `--executable-path` で指定。
- このリポジトリ自体での計画立案・LP改修は次セッション以降。
- 既存サイト棚卸し（mission `2026-0602-survey-existing-site`）実施。結果を `docs/survey-existing-site.md` に記録。現行は Agency theme v4.1.1 の静的単一ページ（index.html 1枚 / SCSS+gulp / BS4 / nginx配信推定 / remote=github.com/alivelime/tokishirazu）。§5 必須ページのうち privacy・disclosure・案件別LP が完全欠落、会社概要/問い合わせ/トップは部分的。テーマ負債（id重複・アンカー切れ・footer年2022・gulp4非互換疑い）も記録。
- ユーザー確認で前提確定: ホスティング=**Cloudflare Pages**（push自動デプロイ・ビルドなし）、計測タグは旧UA(UA-122399129-3, 計測停止)→**GA4 `G-6KC04Q4EE3`** を提供、メディア/LPは**パス配下**、現行サイトは**全面リニューアル可**、画像は**Codex で別途生成**。
- 計画承認のうえ全面リニューアル実施（mission `2026-0602-renewal`、ブランチ `renewal-2026-06`）。素の静的HTML/CSSへ刷新。新規: `index.html` 置換、`company/ contact/ privacy/ disclosure/ media/ media/articles/video-ad-inhouse-guide/ lp/sample-ai-video/`、`assets/css/site.css`・`assets/js/{site,analytics}.js`、`robots.txt`・`sitemap.xml`・`404.html`、`docs/image-tasks.md`。GA4 単一ソース化＋旧UA除去。サンプルLPは noindex・非掲載・外部リンクなし。
- 確定方針を ADR 0002–0005（Proposed）に起票（hosting/static-no-build/path-placement/ga4）。promote は人間。
- 検証: `python3 -m http.server` ＋ Playwright で主要7ページを表示確認、GA4 の `gtag/js?id=G-6KC04Q4EE3` 読み込みと `page_view` 送信(tid一致)を確認。モバイル(390px)のナビ/レイアウトも確認。
- 公開サイトファイルのみ master へ commit/push（`193e348`）→ Cloudflare Pages 自動デプロイ、本番 `https://www.tokishirazu.llc/` の新ビルド反映と GA4 発火（本番URLで page_view）を確認。内部ドキュメントは公開配信を避けるため未コミット（untracked）にしていた。
- 内部ドキュメントの扱いをユーザーに確認 → 「公開をサブディレクトリに限定」を選択。公開ファイルを `public/` に集約（`git mv` 33件、コミット `df9f773`、**未push**）。ローカルで public/ をルート配信して全ページ200を確認。**有効化には Cloudflare の Build output directory=`public` 設定が必要**（人手）。設定→push の順で実施予定。設定後はルートの内部ドキュメントを git 管理下に置いても非公開。
- ユーザーが Cloudflare の出力ディレクトリを `public` に設定し push 完了（origin/master=`d7af0b3`）。本番検証: トップ200・新ビルド、内部資料（media_site_plan/STATUS/CLAUDE/log/decisions/.claude）すべて404＝非公開、アセット200。公開構成 確定。
- 次セッションの方針: 内容ブラッシュアップ（コピー/具体性/画像が一般論寄り）。手直しリストを `docs/content-brushup-todo.md` に作成、ミッション `2026-0602-content-brushup` を起票。
