# learnings — 既知の落とし穴ノート

> **このハーネスの中核。** 「同じ失敗を繰り返さない」を制度化する。
> SessionStart hook がこのファイルを**全文** context 注入する（だから嵩張らせない＝1件数行）。
>
> 書式（`L-NNN` 連番、追記のみ）:
> ```
> ## L-NNN — <一行タイトル>
> - 出会った日: YYYY-MM-DD
> - 状況: <何をしようとしていたか>
> - 失敗: <何が起きたか / なぜダメだったか>
> - ルール: <次回回避するために守ること、命令形で>
> ```

## L-001 — 自己ロックのdenyは最後に立てる

- 出会った日: 2026-05-31
- 状況: ハーネス設置時に `.claude/**` を deny に入れた
- 失敗: hook を書き込む Write 自身が deny されて setup が詰む
- ルール: `.claude/` 配下を deny に入れない。ハーネス自己改変は **CLAUDE.md のソフトルール**で縛る。破壊的コマンドのdenyだけ settings に置く。

## L-002 — リニューアル時は旧資産を同じ変更で退避し、未使用の依存マニフェストを残さない

- 出会った日: 2026-06-02
- 状況: 全面リニューアル後、旧テーマ(css/js/scss/vendor/gulpfile/package*.json)をルートに残置したまま `public/` を追加した
- 失敗: ルートが散らかり、未使用の `package-lock.json` が GitHub Dependabot アラートを大量発生させ続けた（axios/lodash/minimatch 等の旧 transitive 脆弱性）
- ルール: 構成を刷新したら**同じ変更の中で**旧資産を `old/` へ退避する（削除せず版管理下に残す）。使わない `package.json`/`package-lock.json` は追跡から外す（必要ならディスクに残し `.gitignore`）。アラートは default ブランチに反映されて初めて消えると覚えておく。
