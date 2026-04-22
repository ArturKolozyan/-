#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/cleanspace"

cd "${APP_DIR}"
git pull

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Run deploy/systemd/bootstrap-server.sh first."
  exit 1
fi

NODE_MAJOR="$(node -v | sed 's/^v//; s/\..*//')"
if [[ "${NODE_MAJOR}" -lt 20 ]]; then
  echo "Node.js 20+ is required. Current: $(node -v)"
  exit 1
fi

source .venv/bin/activate
pip install -r backend/requirements.txt
deactivate

cd "${APP_DIR}/frontend"
npm ci --no-audit --no-fund
npm run build

systemctl restart cleanspace-backend
systemctl restart cleanspace-frontend

systemctl status cleanspace-backend --no-pager
systemctl status cleanspace-frontend --no-pager
