#!/usr/bin/env bash
# SessionStart hook — 現況を context 注入する（block しない / 常に exit 0）。
# 注入: STATUS.md（現在状態）/ MISSIONS.md の active 行 / learnings.md 全文 / 未コミット差分件数。
set -u
cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0

echo "================ HARNESS CONTEXT ================"

if [ -f STATUS.md ]; then
  echo "---- STATUS (現在状態 / 再開地点) ----"
  cat STATUS.md
  echo
fi

if [ -f MISSIONS.md ]; then
  echo "---- 進行中ミッション (MISSIONS.md ## active) ----"
  # '## active' 以降で、次の '##' が来るまでの '- ' 行だけ拾う
  awk '/^## active/{f=1;next} /^## /{f=0} f && /^- /{print}' MISSIONS.md
  echo
fi

if [ -f learnings.md ]; then
  echo "---- learnings (既知の落とし穴 / 全文) ----"
  cat learnings.md
  echo
fi

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  n=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
  echo "---- git: 未コミット変更 ${n} 件 ----"
fi

echo "================================================="
exit 0
