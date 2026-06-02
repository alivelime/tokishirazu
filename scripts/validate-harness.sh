#!/usr/bin/env bash
# ハーネスの構造が揃っているか点検する。構造変更後に走らせる。
set -u
cd "$(dirname "$0")/.." || exit 1

fail=0
ok()   { printf "  ok   %s\n" "$1"; }
miss() { printf "  MISS %s\n" "$1"; fail=1; }

echo "== harness validation =="

for f in CLAUDE.md README.md STATUS.md MISSIONS.md learnings.md log.md \
         decisions/README.md \
         .claude/settings.json \
         .claude/hooks/session-start.sh \
         .claude/hooks/guard-large-change.sh; do
  [ -f "$f" ] && ok "$f" || miss "$f"
done

# settings.json の JSON 構文
if command -v python3 >/dev/null 2>&1; then
  if python3 -c "import json,sys; json.load(open('.claude/settings.json'))" 2>/dev/null; then
    ok ".claude/settings.json is valid JSON"
  else
    miss ".claude/settings.json is INVALID JSON"
  fi
fi

# hooks が実行可能か
for h in .claude/hooks/session-start.sh .claude/hooks/guard-large-change.sh; do
  [ -x "$h" ] && ok "$h executable" || miss "$h not executable (chmod +x)"
done

# STATUS.md の鮮度（log.md の最新日付より古ければ警告）
if [ -f STATUS.md ] && [ -f log.md ]; then
  s_date=$(grep -m1 -Eo '[0-9]{4}-[0-9]{2}-[0-9]{2}' STATUS.md || true)
  l_date=$(grep -Eo '^## [0-9]{4}-[0-9]{2}-[0-9]{2}' log.md | tail -1 | grep -Eo '[0-9]{4}-[0-9]{2}-[0-9]{2}' || true)
  if [ -n "$s_date" ] && [ -n "$l_date" ] && [ "$s_date" \< "$l_date" ]; then
    printf "  WARN STATUS.md (%s) が log.md の最新 (%s) より古い — 更新漏れの可能性\n" "$s_date" "$l_date"
  fi
fi

echo "========================"
[ "$fail" -eq 0 ] && echo "PASS" || { echo "FAIL"; exit 1; }
