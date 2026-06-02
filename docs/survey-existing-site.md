# 既存サイト棚卸し（survey-existing-site）

調査日: 2026-06-02
対象: このリポジトリ（`~/Documents/tokishirazu`） = `www.tokishirazu.llc` の現行サイト
目的: `media_site_plan.md` §11-1/2 — 現ページ構成・技術構成を記録し、§5 必須ページとの差分を洗い出す。

## 1. 技術構成

- **静的単一ページサイト**。実体は `index.html` 1枚のみ（Start Bootstrap Agency theme v4.1.1 ベース）。
- **CSS**: SCSS（`scss/*.scss`）→ gulp で `css/agency.css` / `css/agency.min.css` にコンパイル。さらに `index.html` 内 `<style>` にモダン化のインライン上書きCSS（CSS変数・グラデーション等）。
- **JS**: `js/agency.js`（テーマ）、`js/contact_me.js` + `jqBootstrapValidation.js`（テーマ同梱のフォームバリデーション。現状フォーム未使用）。
- **依存**: Bootstrap 4.1.1 / jQuery 3.5.0 / jquery.easing。`vendor/` にコミット済み（CDNでなくローカル配信）。FontAwesome 5.2 と Google Fonts は外部CDN参照。
- **ビルド**: gulp 4 系（`gulpfile.js`）。ただしタスク定義が旧式の配列依存記法（`gulp.task('css', ['css:compile', ...])`）で、gulp4 とは非互換の書き方が残る → 実際に `gulp` が通るかは未検証（`node_modules` は gitignore、未インストール）。
- **メール**: `mail/contact_me.php`（テーマ由来のPHP送信スクリプト）。HTMLから未配線。

## 2. 現ページ構成（すべて単一ページ内アンカー）

| アンカー/セクション | 内容 | 備考 |
|---|---|---|
| header (masthead) | "セカンドペンギン戦略" キャッチ | |
| `#services`(1) | **開発実績**（2024 NHK様WebTransport等 / 2025 動画生成AIエージェント等） | h2は「開発実績」なのに id は `services`（**id重複**） |
| `#services`(2) | Services（PoCラボ, コンサル, インフルず 等）+ Twitter埋め込み3件 | id重複 |
| `#team` | 役員 | |
| `#profile`(1) | お問い合わせ（**メール案内のみ**: Qiitaプロフィールのアドレスへ） | フォーム無し |
| `#profile`(2) | 会社情報（会社名/所在地/設立2018-06-26/代表 江藤慎吾/事業内容） | id `profile` 重複 |
| footer | Copyright 2022（**陳腐化**）, Twitter/Facebookアイコン（**リンク無し**） | |

ナビ: `Concept / Services / About / Team / Pfofile`。
- `#concepts` と `#about` は**実体セクションが存在しない**（リンク切れアンカー）。
- "Pfofile" は **typo**（Profile）。

## 3. デプロイ（要確認）

- git remote: `github.com/alivelime/tokishirazu`（個人GitHub, `master`）。
- `index.nginx-debian.html` が残存 → **nginx (Debian) で配信**の可能性。
- CI/CD 設定なし（`.github/` 無し）、`CNAME`/Netlify/Vercel 設定も無し。
- → **手動デプロイ（サーバ側で git pull 等）と推定。実際の方法は本人確認が必要**（`media_site_plan.md` §10 先頭の未決事項）。

## 4. §5 必須ページとの差分（gap）

| §5 必須ページ | 現状 | 判定 |
|---|---|---|
| 企業トップ / メディア概要 | トップあり（受託開発寄り）。メディア概要は無し | △ |
| 会社概要 | `#profile` に簡易な会社情報セクションあり（単一ページ内） | △ 独立ページ化が望ましい |
| 問い合わせ | メール案内のみ・フォーム無し | △ |
| プライバシーポリシー | **無し** | ❌ |
| 広告掲載・PR表記方針（disclosure） | **無し** | ❌ |
| 最初の案件別DRMプレセルLP | **無し** | ❌ |

**完全に欠落: プライバシーポリシー / 広告掲載・PR表記方針 / 案件別LP の3点。**
**部分的: トップ（メディア性質なし）/ 会社概要（独立ページ化）/ 問い合わせ（フォーム無し）。**

## 5. 既存テーマの技術的負債（LP/ページ追加前に効いてくる箇所）

- セクション id 重複（`services`×2, `profile`×2）
- ナビのアンカー切れ（`#concepts`, `#about`）と typo（`Pfofile`）
- footer copyright が 2022 のまま
- ソーシャルアイコンがリンク非設定（`<i>` のみ）
- gulp タスク記法が gulp4 非互換の疑い（ビルド再現性が未検証）

## 6. 次に人間判断が要る未決事項（§10 抜粋）

1. **デプロイ方法の確定**（どこに・どうやって公開しているか）。これが定まらないと追加ページ/LPの配置と公開手順を設計できない。
2. **`/media/`・`/lp/` をこのリポジトリ配下のパスで始めるか、`lab.tokishirazu.llc` サブドメインに分離するか**。
3. アクセス解析・タグ管理基盤（GA4 / GTM 等）の有無と方針。
</content>
</invoke>
