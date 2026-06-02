#!/usr/bin/env bash
# PreToolUse(Edit|Write) hook — 1回の編集が大きすぎる時に警告 / 極端なら block。
# 規約: exit 2 + stderr = block。それ以外 exit 0 = 許可（stderr は警告として表示）。
# jq が無ければ何もしない（壊さない）。
set -u

input="$(cat)"

command -v jq >/dev/null 2>&1 || exit 0

content="$(printf '%s' "$input" | jq -r '.tool_input.content // .tool_input.new_string // ""')"
[ -z "$content" ] && exit 0

lines="$(printf '%s\n' "$content" | wc -l | tr -d ' ')"
bytes="$(printf '%s' "$content" | wc -c | tr -d ' ')"

HARD_LINES=800
HARD_BYTES=300000
SOFT_LINES=250
SOFT_BYTES=60000

if [ "$lines" -gt "$HARD_LINES" ] || [ "$bytes" -gt "$HARD_BYTES" ]; then
  echo "BLOCKED: 1回の編集が大きすぎます (${lines} 行 / ${bytes} bytes)。小さな変更に分割してください。" >&2
  exit 2
fi

if [ "$lines" -gt "$SOFT_LINES" ] || [ "$bytes" -gt "$SOFT_BYTES" ]; then
  echo "⚠️ 大きめの編集です (${lines} 行 / ${bytes} bytes)。分割を検討してください。" >&2
fi

exit 0
