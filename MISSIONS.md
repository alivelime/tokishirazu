# MISSIONS — 進行中ミッション台帳

> **1 ミッション = 着手してからコミットして完了とするまでの一連の作業。**
> SessionStart hook が `## active` の行を読み上げる。途中放置された作業を忘れない仕組み。
>
> 運用ルール:
> - まとまった作業に**着手したら** `## active` に1行足す。
> - 進捗で**書き換える**。
> - **完了（コミット）したら** active から消し、`journal/missions_archive.md` の最上部に移す。
> - `<id>` は `YYYY-MMDD-slug` 形式。

## active

- **2026-0602-content-brushup** 内容のブラッシュアップ — リニューアルで立てた枠組みのコピー・具体性・画像を質的に改善。手直しリスト `docs/content-brushup-todo.md`。**進行中**: デザインシステム刷新＋トップ（第4稿: 道具づくり/内製化支援/note実記事3本）＋会社概要を `docs/company-identity.md` のブランドで再構成。残: サンプルLPの解決策コピー、法務、画像。〔司令塔: harness ROUTING **R-001**〕

- **2026-0603-own-media-pillar 〔制作を content へ移管〕** 自社メディア柱記事「2023→いま、生成AIにどう取り組んできたか」年表 — **制作の正本は content repo へ移管**（ADR 0003: 記事制作は content / 配信のみ tokishirazu）。制作先: `~/Documents/test/content/owned-media/260604_genai-journey-timeline/`。司令塔: harness ROUTING **R-002**。tokishirazu 側の役割は**完成原稿を受け取り `/media/` に柱記事として配信**するだけ。**着手可: content 原稿 review 済**（`~/Documents/test/content/owned-media/260604_genai-journey-timeline/article.md` = `status: review`、`fig01-03.png`＋`figures-handoff.md` あり）。手順は `docs/owned-media-ingest.md`（下書き・初回に確定）。`/media/` は非掲載なので掲載導線も通す。完了でループを閉じる（公開URL→harness ROUTING R-002 feedback と Obsidian campaign、content を `status: published`、R-002 を done）。

<!-- 例:
- **2026-0531-setup-harness** ハーネス初期化 — settings/hooks 設置済み、検証待ち
-->
