# ADR 0004 — media-lp-under-path

- **状態**: Proposed
- **日付**: 2026-06-02
- **対象**: メディアと案件別LPの配置（パス配下 vs サブドメイン分離）

## 文脈

`media_site_plan.md` §4/§10 で、`/media/`・`/lp/` を既存サイト配下のパスで始めるか、`lab.tokishirazu.llc` サブドメインへ分離するかが未決だった。法人運営の信頼を初期から活かしたい段階。

## 決定

1. メディア・案件別LPは **既存サイトのパス配下**に置く。
   - メディア: `/media/`、記事: `/media/articles/<slug>/`
   - 案件別LP: `/lp/<campaign-id>/`
2. サブドメイン分離（`lab.`）は、案件数・トラフィックが増えてSEOや運用を分けたくなった時点で別ADRで再検討する。

## 可逆性

将来サブドメインへ移す場合は、Cloudflare 側でリダイレクト（301）を設定してパスURLを温存できる。

---
> Proposed。promote は人間が行う。
