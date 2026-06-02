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

- **2026-0602-content-brushup** 内容のブラッシュアップ — リニューアルで立てた枠組みのコピー・具体性・画像を質的に改善。手直しリスト `docs/content-brushup-todo.md`。未着手。

<!-- 例:
- **2026-0531-setup-harness** ハーネス初期化 — settings/hooks 設置済み、検証待ち
-->
