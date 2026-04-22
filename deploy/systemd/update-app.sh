#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/cleanspace"

cd "${APP_DIR}"
git pull

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
