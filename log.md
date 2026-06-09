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
- ルート整理（ブランチ `chore/cleanup-root-and-deps`、コミット `ea06d9b`）。旧 Start Bootstrap 資産（css/ js/ scss/ vendor/ mail/ gulpfile.js index.nginx-debian.html trim.py LICENSE）を `old/` へ git mv（新サイト未参照を grep で確認）。Dependabot アラート（全件 `package-lock.json` 由来＝axios/lodash/minimatch 等の旧 transitive 脆弱性）対処として、package.json/package-lock.json は `old/` にディスク保存しつつ git 追跡から外し `.gitignore` 追加。**master 反映後にアラート解消見込み**。未merge/未push（push は人間承認待ち）。
- デザイン/コンセプトはユーザー側でまとめる方針（ブランド戦略の AI 提案は保留）。Vault 調査メモは本セッションのログのみ。
- ルート整理ブランチを master へ ff merge（`6e00eda`、未push）。ユーザー指示: push は保留、`old/` は HP 完成後に削除予定。
- ユーザーが `docs/company-identity.md`（公開層の単一正本: 芯=「深い水を自分の時間で光のさすほうへ昇る」、和紙白/墨/墨紺/淵ティール/熾火アンバーのパレット、配分規律、明朝見出し+mono、トーン&NG=決別宣言/内輪語/力み禁止、実績・連絡先）を作成。これを基準に AI がブランドデザイナー兼FEとしてHPをブラッシュアップ。
- 実装（ブランチ `feature/hp-brand-brushup`）: site.css を全面刷新（新パレット・Shippori Mincho 見出し・IBM Plex Mono ラベル・写真ヒーロー hero--photo・section--dark・offering/record・絵文字アイコンと旧青#2b59ff/テックグラデ廃止）。index.html を identity のコピーで再構成、company の事業内容・代表プロフィール整合、全9ページのフォントリンク更新。コミット `7bcd553`(identity+gitignore)・`d53ed7b`(HP実装)。Playwright で /・/company/・記事・LP を表示確認、コンソールエラー0、配色/字組み確認。検証用スクショは gitignore 化して削除。未merge/未push。
- ユーザーが `company-identity.md` を第3稿へ更新（立場の芯＝「足跡を干す後発開拓者」確定。詩で語らない／メディア・受託は前面に出さない／やらないことは決別でなく線引き）。それに合わせ HP を再ポジショニング（同ブランチ、`c6f4d0a` identity更新・`ba57908` 実装）。トップを「いま歩いているフロンティア(生成AI映像: movie_digest/gen_earth/Kling・Seedance・Nano Banana)→これまでの足跡(WebRTC/WebTransport/メタバース)→ここで一緒にできること/やらないこと→会社」へ。旧ヒーロー詩(禁止語化した「光のさす上へ」)を「いま、生成AI映像のフロンティアを歩いています」へ差し替え。CTAは「声をかける」。メディアをナビ・フッター・トップ節から撤去（ページは非掲載で残置）。問い合わせ・404・会社概要事業内容も整合。CSS: section--dark の実績リストが暗面で読めない不具合を修正、`.aside` 追加。Playwright 再検証(エラー0)。メモリ `brand-source-of-truth` を第3稿に更新。

## 2026-06-03

- ユーザーが `company-identity.md` を第4稿へ更新（芯は第3稿のまま「足跡を干す後発開拓者」。"いま歩くフロンティア"を「生成AI映像制作」→「映像をつくるための道具＝学習し続けるAIハーネスづくり」へ深化／派手なGUI(Higgsfield Cinema Studio・Figma Weave)がない地味さを正直に書く方針／やらないことの締めを「『作って』と仕様を渡す仕事は請けない、『作れるか一緒に確かめよう』から歩く」＋具体例(期間を区切って見極める)／note分業=溜まる足跡(自社サイト)・流れる足跡(note)、トップにnote導線）。コミット `9a55a90`。
- frontend-design スキルで HP をブラッシュアップ＋第4稿反映（同ブランチ `feature/hp-brand-brushup`、`fbe626f`）。トップ#nowを道具/ハーネスへ再構成し**禁止語「机上の評論」を除去**。「正直に書くと」の自白ブロック(`.note-honest` 左罫editorial)を追加して3カラムの単調を破る。カードを機能名見出し＋mono連番(01-03)＋公開リポジトリ脚注(`.card__repo` mono code)へ、素のリポジトリ名は脚注へ格下げ(identity注記準拠)。#togetherを第4稿の言い回しへ。会社概要の事業内容・代表bioを道具づくりへ整合。全公開ページのフッターにnote(流れる足跡)導線をPython一括追加。ディテール: ヒーローにモノクロ微細グレイン(SVG fractalNoise saturate0, opacity .14)を薄く重ねアナログの温度を足す、カードをflex縦化し脚注を下端揃え、site.cssヘッダーの芯コメントを更新。Playwrightで PC(1280)/モバイル(390)・主要ページ・コンソールエラー0を確認。
- 残課題: トップのnote最新記事サムネ「手で数本並べる」は記事メタ(サムネ/タイトル/公開日/URL)の本人提供待ち。`movie_digest`/`gen_earth` の公開URLも未取得でリンク化保留（現状はmono脚注表示）。未merge/未push。
- **第4稿の反映漏れが発覚→修正**（同ブランチ `1b17e3b`）。原因: セッション冒頭で読んだ identity が古い版で、`git add` 時に本人が更に更新した第4稿(richな版)をコミットしたのに、実装は古い版基準だった（→ L-003 として learnings 化）。修正内容: (1) CTA文言を identity line89 確定の「相談したい」へ全面統一し「声をかける」を除去。(2) #together を事業の芯「内製化支援＝作る力を相手の"中"に残す」へ全面刷新（やらないこと＝成果物丸ごとの制作代行/丸投げの導入代行/仕様渡しの受託）。(3) トップに note(流れる足跡)節を新設。(4) 「足跡」の多用を削減（hero/働き口/#works導入文。タグライン定番1回とsection見出しは存置）。(5) 自白ブロック末尾を identity line57「値打ちはそこにある」へ。(6) 会社概要の事業内容に内製化支援、contactリードを内製化＋相談＋足跡削減、indexのmeta/OGPを道具づくり+内製化へ。
- note トップ掲載をユーザー確認（記事データは `~/Documents/test/note` の執筆プロジェクトに、ただし公開URL/専用サムネは無し＝本文と本文中画像のみ）。**公開RSS `https://note.com/eto_shingo/rss` から確定データ取得**し、identity line108 の優先指定(生成AI映像系)どおり3本を実記事カード化（`cf6a37f`）: [Kling3.0]カメラワーク検証(2026.05.03, n/nc76f663754fd)/Kling3.0演技力(2026.04.29, n/n9d41a600b064)/動画生成AIの基本=Nano Banana Pro(2026.03.19, n/n0fa00ad7d6a9)。アイキャッチ3枚を `public/img/note/` にローカル保存（st-note CDN ホットリンク回避）。`.card--note`(アイキャッチ＋公開日＋タイトル＋note導線)・`.card__thumb`・`.card__date` を追加。
- 自社メディア(柱記事＝「2023→いま」の年表)は**ユーザー判断でいまは保留**。既存 `/media/` は非掲載のまま据え置き。後日作成として MISSIONS `2026-0603-own-media-pillar` 起票。
- ブランチ整理: `feature/hp-brand-brushup` を master へ ff マージ→**origin へ push 済**（`bc6417b`、以前の未push分＝ルート整理も同時に到達）。追跡中の依存マニフェスト0件を確認、Dependabot は default ブランチ再スキャン後に解消見込み。CTA「相談したい」→「相談する」に微修正し push（`fe1cb4e`）。マージ済みローカルブランチ `feature/hp-brand-brushup` を削除（`renewal-2026-06` は残置・要確認）。
- `docs/image-tasks.md` を**ゼロベースで全面改訂**。旧版（青系#2b59ff・メディア前面・Hero装飾グラフィック）は構成刷新で全部陳腐化していたため破棄。現状（実在画像は流用・破損/プレースホルダ無し）を前提に、ブランド視覚契約（パレットHEX・明朝/墨・禁止リスト・Heroに飾りを足さない）を埋め込み、少数精鋭の生成タスクへ: P1 ブランドOGP(社名入り共有カード1200×630)、P2(任意) #now 3カードの手描き墨スポット(内容固有・揃いの汎用アイコン禁止)、P3 自社メディアアイキャッチは柱記事作成時まで保留。

### 画像投入（P1/P2）— Codex 生成・配線

- **P1 ブランドOGP 完了**: ユーザーが Codex で `public/img/og/ogp-default.png`（和紙白＋明朝社名＋等幅サブ＋熾火の細罫＋薄い墨刷毛、1200×630）を生成・投入。配線（Codex）: トップの `og:image` を水中写真→新OGPへ差し替え＋`twitter:image` 追加、全サブページ(company/contact/privacy/disclosure/media/記事)に `og:image` を同パスで追加。
- **P2 #now 墨スポット 完了**: Codex で手描き墨スポット3点を生成・投入——`mark-video.png`(映像フレーミング枠＋熾火の中心点)/`mark-digest.png`(フィルムのショット分解帯)/`mark-genearth.png`(等高線の世界＋小径)。3点とも筆致・構図がバラバラで内容固有＝「揃いの汎用アイコン」回避。各カード先頭に `<img class="card__mark">` 挿入、CSS `.card__mark` 追加（Codex）。Playwright 確認・コンソールエラー0。

### 墨スポットの実寸調整

- 64px だと P2 の `mark-genearth`(等高線)が潰れて"もやっとした丸"に見えたため、`.card__mark` を **64px→76px** に調整（CSS 1行）。03 の小径・等高線、01 の中心の熾火点が読めるようになったのを Playwright で確認。
- `docs/image-tasks.md` の P1/P2 を**完了反映**（実ファイルパス・調整理由を追記、§0 在庫表にも追加）。P3（自社メディア柱記事のアイキャッチ）は柱記事作成時まで保留で据え置き。

## 2026-06-09

- **owned-media 柱記事を取り込み・配信実装（R-002, ミッション 2026-0603-own-media-pillar）**。content `260604_genai-journey-timeline/article.md`（status: review）を `docs/owned-media-ingest.md` の手順で取り込み。slug=`genai-journey-timeline`。
- `public/media/articles/genai-journey-timeline/index.html` を雛形 `video-ad-inhouse-guide` から作成。frontmatter→メタ/canonical/og/ld+json 移植、本文 Markdown→HTML（**本文改変なし**）、3軸年表テーブル＋fig01–03、目次・関連note 3本・相談CTAを配置。
- 本文図は content の `fig0N.png`（各~2MB）を **cwebp q85 で webp 化**（各~220–330KB）して記事フォルダに同梱、`<img>` は lazy + width/height 指定。Playwright で表示・メタ・図デコード(1600×900)・リンク・console エラー0 を確認。
- `public/media/index.html` に記事カード追加（badge=視点、新着を先頭）。`public/sitemap.xml` に URL 追加（lastmod 2026-06-09）。
- **保留（要判断）**: (1) OGP/アイキャッチは P3 未生成のため暫定 `ogp-default.png`。(2) 製品名（Kling/Seedance 等）は A8 案件未確定のためプレーンテキスト維持（notice の「成果報酬リンクなし」も維持）。(3) `/media/` 自体の導線（全体ナビ/トップ）は STATUS 既定方針で据え置き＝ユーザー判断待ち。
- **未了**: commit / push / 公開URL確定 → R-002 feedback・content status:published・ミッション done のループ閉じはデプロイ後。

- **柱記事アイキャッチを Codex 生成・配線（image-tasks P3）**。`codex exec`（imagegen / gpt-image-2）で §1 ブランド契約のキービジュアルを生成 → `eyecatch.png`(1600×900・249KB)＋派生 `eyecatch.webp`(46KB)。和紙白の地／低く長い熾火アンバーの一線（"閾値"の比喩）／墨の刷毛／明朝「動画生成AIが、閾値を超えた」+ mono「2026.02」。本文図のカラフル路線は不採用（register 別）。
- 配線3役: 記事 `og:image`/`twitter:image`(png)、記事冒頭ヒーロー `.article__hero`(webp)、トップ新設「メディア」節カードサムネ(webp)。
- **トップに「メディア」節を新設**（note 節の直後＝流れる足跡→溜まる足跡の対比）。`#media` grid-3 に柱記事カード1枚（最新順、サムネ＝eyecatch.webp）＋「メディアの記事一覧へ」。CSS `.card--media`・`.article__hero` を追加。背景は now(無地)→note(surface)→media(無地)→works(dark) で交互維持。Playwright で表示・サムネ・console エラー0 確認。

- **柱記事の手直し（ユーザーレビュー反映, 2026-06-09）**:
  - アイキャッチ第2版を Codex 再生成。初版が「渋すぎ＋正方形寄り」だったため **横長シネマ 1600×640（2.5:1）** に変更、墨の刷毛を豊かにし暖色のにじみを足して空きを解消。文字は中央 safe zone。`.article__hero` を aspect 5/2 に、各 width/height を 640 に更新。
  - 見出し「まず最初に外しておく ── 量産の話ではない」→「**動画量産の話じゃありません**」（独白調をやめる）。HTML(h2+TOC)＋content `article.md`（正本）の両方を同期。
  - fig01–03 の `loading="lazy"` を除去（下端の図が初期表示で空に見える＝「画像2,3が表示されない」の原因だった。実体は健全）。
  - CTA を「技術者の視点でご相談に乗ります」→ **謙虚に知見を共有する言い回し**へ（「私がつまずきながら見つけてきた知見で、よければお役に立てるかもしれません」／ボタン「お気軽にどうぞ」）。ブランド声のフィードバックを memory `cta-voice-humble-not-engineer` に記録。
  - Playwright 再検証: 新ヒーロー/サムネ表示・見出し・CTA・図 eager・console エラー0 を確認。

- **柱記事 手直し 第2ラウンド（2026-06-09）**:
  - 見出し「動画量産の話じゃありません」→「**バズ動画量産が話題ですが、、**」（いきなり否定を避ける）。HTML(h2+TOC)＋content `article.md` 同期。
  - **アイキャッチ方針転換**: 記事サムネは装飾の水墨でなく「記事概要が一目で分かるカバー要約」に。**本文図 fig01-03 と同じカラフル解説イラスト調**で Codex 再生成（見出し主役＋2025量産→2026表現の対比＋「プロが使い始めた、表現の道具に。」）。1600×900。ヒーローは 16:9 に戻す。トップのカードサムネで内容が読めるようになった。
  - 第2版の**水墨バナー（1600×640）は `public/img/banners/sumi-threshold-1600x640.{png,webp}` へ退避**（別ページ用に温存）。image-tasks P3 を第3版＝確定方針に更新。
  - **CTA を1行化**（コピーライター指示）: genai記事=「作れるか、一緒に確かめませんか。」／ video-ad-inhouse-guide記事=「『作れる体制』づくり、よければ一緒に。」。両方ボタン「お気軽にどうぞ」。説明p撤去。`video-ad-inhouse-guide` の旧「技術者の視点で〜」も解消（リンク非掲載だが修正依頼により対応）。memory `cta-voice-humble-not-engineer` に1行・確定文言を追記。
  - Playwright 再検証: トップのサムネ可読・記事ヒーロー(16:9)・見出し・両記事CTA・console エラー0。
