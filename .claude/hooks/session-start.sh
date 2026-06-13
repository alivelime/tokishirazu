#!/usr/bin/env bash
# SessionStart hook — 現況を「薄い索引」として context 注入する（block しない / 常に exit 0）。
# 原則: 追記系ログ（learnings/log）は全文展開しない＝注入は時間で膨らまない。本文は当該タスクに関係するものだけ各自 Read する。
# 注入: 索引宣言 / STATUS / MISSIONS active 索引 / (ROUTING があれば司令塔の配送案件) / learnings 見出しのみ / 鮮度WARN / 未コミット件数。
# 単一正本: このスクリプトは template が正本。各repoへは init-harness / cp で複製し手編集しない（ドリフト防止）。
set -u
cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0

# STATUS/MISSIONS がこの日数 mtime 更新されていなければ stale を警告。
# 注: mtime ベースなので git checkout 直後は鮮度判定が甘くなる（誤って黙る）ことがある。
STALE_DAYS=14

echo "================ HARNESS CONTEXT ================"
echo "↓は索引。今回のタスクに関係する項目だけ本文(該当ファイル)を Read する。無関係なトラックは無視してよい。"
if [ ! -f STATUS.md ] && [ ! -f MISSIONS.md ] && [ ! -f learnings.md ]; then
  echo "⚠ 現況ファイル(STATUS/MISSIONS/learnings)が無い。ハーネス未設置の可能性。"
fi
echo

if [ -f STATUS.md ]; then
  echo "---- STATUS (現在状態 / 再開地点) ----"
  cat STATUS.md
  [ -n "$(find STATUS.md -maxdepth 0 -mtime +${STALE_DAYS} 2>/dev/null)" ] && \
    echo "⚠ STATUS.md が ${STALE_DAYS}日以上未更新。現況が古い可能性。鵜呑みにせず確認。"
  echo
fi

if [ -f MISSIONS.md ]; then
  echo "---- 進行中ミッション (MISSIONS.md ## active / 索引) ----"
  awk '/^## active/{f=1;next} /^## /{f=0} f && /^- /{print}' MISSIONS.md
  [ -n "$(find MISSIONS.md -maxdepth 0 -mtime +${STALE_DAYS} 2>/dev/null)" ] && \
    echo "⚠ MISSIONS.md が ${STALE_DAYS}日以上未更新。完了済みが active に残っている可能性。"
  echo
fi

if [ -f ROUTING.md ]; then
  echo "---- 配送中の案件 (ROUTING.md ## active) ----"
  # '## active' 以降、次の '## ' までの非空行を読み上げ（repo境界をまたぐ in-flight 案件）
  awk '/^## active/{f=1;next} /^## /{f=0} f && NF{print}' ROUTING.md
  # status-src（案件の現行正本ファイル）の frontmatter status を live 読取（保存コピー無し / 不在でも exit 0）
  awk '/^## active/{f=1;next} /^## /{f=0} f && /status-src:/{print}' ROUTING.md | \
  while IFS= read -r line; do
    p=$(printf '%s' "$line" | sed -E 's/.*status-src:[[:space:]]*//; s/[[:space:]]*$//')
    [ -n "$p" ] || continue
    ep=${p/#\~/$HOME}
    if [ -f "$ep" ]; then
      st=$(grep -m1 -E '^status:' "$ep" | sed -E 's/^status:[[:space:]]*//; s/[[:space:]]*#.*//; s/[[:space:]]*$//')
      [ -n "$st" ] && echo "   ↳ live status ($p): ${st}" || echo "   ↳ live status ($p): (status 行なし)"
    else
      echo "   ↳ live status ($p): (ファイル不在)"
    fi
  done
  echo
fi

if [ -f learnings.md ]; then
  echo "---- learnings (既知の落とし穴 / 見出しのみ・本文は learnings.md を Read) ----"
  grep -E '^## L-[0-9]' learnings.md | sed -E 's/^## //'
  echo
fi

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  n=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
  echo "---- git: 未コミット変更 ${n} 件 ----"
fi

echo "================================================="
exit 0
