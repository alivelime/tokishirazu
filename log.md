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
