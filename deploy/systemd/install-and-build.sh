#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/cleanspace"
APP_USER="${APP_USER:-www-data}"
APP_GROUP="${APP_GROUP:-www-data}"

if [[ ! -d "${APP_DIR}" ]]; then
  echo "Missing ${APP_DIR}. Clone project first."
  exit 1
fi

if [[ ! -f "${APP_DIR}/.env" ]]; then
  echo "Missing ${APP_DIR}/.env. Create it from .env.production.example"
  exit 1
fi

cd "${APP_DIR}"

python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r backend/requirements.txt
deactivate

cd "${APP_DIR}/frontend"
npm ci --no-audit --no-fund
npm run build

chown -R "${APP_USER}:${APP_GROUP}" "${APP_DIR}"

echo "Dependencies installed and frontend built successfully."
