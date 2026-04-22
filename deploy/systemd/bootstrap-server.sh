#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/systemd/bootstrap-server.sh"
  exit 1
fi

APP_DIR="/opt/cleanspace"

export DEBIAN_FRONTEND=noninteractive
apt update
apt install -y git curl nginx certbot python3-certbot-nginx python3-venv python3-pip nodejs npm

mkdir -p /opt
if [[ ! -d "${APP_DIR}" ]]; then
  echo "Creating ${APP_DIR}. Clone your repository into it before continuing."
  mkdir -p "${APP_DIR}"
fi

echo "Bootstrap complete."
echo "Next steps:"
echo "1) Put project files into ${APP_DIR}"
echo "2) Create ${APP_DIR}/.env from .env.production.example"
echo "3) Run deploy/systemd/install-and-build.sh"
