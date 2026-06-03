# STATUS — tokishirazu-media

> 現在状態の正本。**上書き更新**。新しいセッションはここから再開する。
> SessionStart hook がこのファイルを context 注入する。短く保つ。

最終更新: 2026-06-03

## 現フェーズ

**サイト全面リニューアル完了**。Start Bootstrap Agency の単一ページから、**素の静的HTML/CSS**（ビルドなし、Cloudflare Pages 配信）へ刷新。実装ページ: トップ `/`・会社概要 `/company/`・問い合わせ `/contact/`・プライバシー `/privacy/`・PR表記方針 `/disclosure/`・メディア `/media/`・記事 `/media/articles/video-ad-inhouse-guide/`・サンプルLP `/lp/sample-ai-video/`（noindex・非掲載・外部リンクなし）。共有: `assets/css/site.css`, `assets/js/{site,analytics}.js`。**GA4 `G-6KC04Q4EE3` 全ページ導入・旧UA除去**。robots/sitemap/404 追加。ローカル検証で GA4 発火確認済み。方針は ADR 0002–0005（Proposed）。master へ push 済み・**本番公開中**。公開ファイルは `public/` に集約し、Cloudflare Pages の Build output directory = `public` を設定済み（内部ドキュメントはルートに残置＝版管理しつつ非公開、本番で 404 を確認）。

## 進行中

- **ルート整理＋Dependabot対処**: master へ merge 済（`6e00eda`、**未push**）。push で Dependabot アラート解消見込み。旧資産は `old/`。
- **HPブランドブラッシュアップ（未merge）**: `docs/company-identity.md`（公開層の単一正本）に沿って実装。立場の芯=「足跡を干す後発開拓者」。**第4稿で"いま"が深化**——いま歩くフロンティアは「生成AI映像制作」ではなく「映像をつくるための道具（学習し続けるAIハーネス）づくり」／派手なGUI(Higgsfield/Figma Weave)がない地味さを正直に書く／やらないことの締めは「『作って』と仕様を渡す仕事は請けない、『作れるか一緒に確かめよう』から歩く」／note分業（溜まる足跡=自社サイト/流れる足跡=note）。デザインシステム(site.css)は和紙白・墨紺・熾火アンバー＋明朝見出し＋mono。トップは「いま歩いているフロンティア(道具づくり)→これまでの足跡→ここで一緒にできること/やらないこと→会社」。frontend-design でディテール磨き（ヒーロー微細グレイン／`.note-honest` 自白ブロック／カード mono連番＋リポジトリ脚注を下端揃え）。全フッターに note 導線。ブランチ `feature/hp-brand-brushup`（最新 `fbe626f`）。Playwright 検証済(PC/モバイル・エラー0)。
- **第4稿の取りこぼし修正＋note実装（`feature/hp-brand-brushup` 最新 `cf6a37f`）**: 当初 古い版の identity で実装していたため第4稿の要点を反映漏れ→修正済。(1) CTA文言を全面「相談したい」へ統一（「声をかける」除去）。(2) #together を事業の芯「**内製化支援**＝作る力を相手の中に残す」へ刷新（やらないこと＝制作代行/丸投げ導入代行/受託）。(3) **トップに note 実記事カード3本**（生成AI映像系: Kling3カメラワーク/Kling3演技/動画生成基本）を公開RSSの確定データで実装、アイキャッチは `public/img/note/` にローカル保存。(4) 「足跡」多用を削減（タグライン定番1回とsection見出しは存置）。
- **保留（ユーザー判断）**: 自社メディア＝柱記事「2023→いま、生成AIにどう取り組んできたか」の年表は**いまは作らない**。既存 `/media/` は非掲載のまま。
- **次**: `movie_digest`・`gen_earth` の公開URL（リンク化したいが未取得）。サンプルLP・法務見直し、画像生成（`docs/image-tasks.md`）。手直しリスト `docs/content-brushup-todo.md`。

## ブロッカー / 保留

- **画像**: 新規画像は未作成（プレースホルダ＋既存流用）。Codex で生成 → `docs/image-tasks.md` のタスク参照。
- **実案件LP・アフィリンク**: A8.net 案件調査の確定待ち（現状はサンプルLPのみ、外部リンクなし）。
- **問い合わせフォーム**: 当面メール案内。将来 Cloudflare Pages Functions でフォーム化を検討。

## 次アクション

1. **内容ブラッシュアップ**: `docs/content-brushup-todo.md` の項目（トップ／会社概要／記事／サンプルLP／法務／画像／後片付け）を順に手直し。
2. `docs/image-tasks.md` に沿って Codex で画像生成 → 差し替え（OGP・記事アイキャッチ・Heroビジュアル）。
3. A8.net 案件調査の結果を受けて最初の実案件LP要件を作成（`media_site_plan.md` §11）。

> 公開構成は確定（`public/` 配下のみ公開、内部資料は非公開で版管理）。本番で内部資料404・サイト200・GA4発火を確認済み。
