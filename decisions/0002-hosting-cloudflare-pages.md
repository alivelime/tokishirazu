# ADR 0002 — hosting-cloudflare-pages

- **状態**: Proposed
- **日付**: 2026-06-02
- **対象**: 本サイトのホスティングとデプロイ方法

## 文脈

リニューアルにあたり配置・公開手順を設計する必要があった（`media_site_plan.md` §10 先頭の未決事項）。ユーザー確認により、現行サイトは Cloudflare Pages で配信、`git push`（GitHub `alivelime/tokishirazu` master）で自動デプロイ、ビルドステップなし（`index.html` 等をそのまま配信）であることが判明。

## 決定

1. ホスティングは **Cloudflare Pages** を継続利用する。
2. **production ブランチ = `master`**。master への push で本番自動デプロイ。
3. **ビルドステップを置かない**（Cloudflare 側のビルド設定なし）。リポジトリ内の静的ファイルがそのまま公開URLになる。
4. 成果物は最終形の静的ファイルとして書く（プリプロセス前提の中間ファイルに依存しない）。

## 可逆性

ビルド導入や別ホスティングへの移行はいつでも可能。Cloudflare Pages のプロジェクト設定変更で production ブランチやビルドコマンドを足せる。

---
> Proposed。promote（Adopted 化）は人間が行う。
