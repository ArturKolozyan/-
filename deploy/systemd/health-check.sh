#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-https://clearspacenvrsk.ru}"

echo "=== systemd status ==="
systemctl status cleanspace-backend --no-pager | rg "Active|Loaded|Main PID" -N
systemctl status cleanspace-frontend --no-pager | rg "Active|Loaded|Main PID" -N

echo
echo "=== http checks ==="
curl -fsSI "${DOMAIN}" | rg "HTTP/|server:|content-type:" -i -N
curl -fsS "${DOMAIN}/api/health"
echo

echo "=== recent backend logs ==="
journalctl -u cleanspace-backend -n 50 --no-pager

echo
echo "=== recent frontend logs ==="
journalctl -u cleanspace-frontend -n 50 --no-pager
