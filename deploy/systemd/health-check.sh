#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-https://example.com}"

echo "=== systemd status ==="
systemctl status cleanspace-backend --no-pager | grep -E "Active|Loaded|Main PID" || true
systemctl status cleanspace-frontend --no-pager | grep -E "Active|Loaded|Main PID" || true

echo
echo "=== http checks ==="
curl -fsSI "${DOMAIN}" | grep -Ei "HTTP/|server:|content-type:" || true
curl -fsS "${DOMAIN}/api/health"
echo

echo "=== recent backend logs ==="
journalctl -u cleanspace-backend -n 50 --no-pager

echo
echo "=== recent frontend logs ==="
journalctl -u cleanspace-frontend -n 50 --no-pager
