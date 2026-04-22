#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/systemd/enable-services.sh"
  exit 1
fi

APP_DIR="/opt/cleanspace"
SYSTEMD_DIR="/etc/systemd/system"

cp "${APP_DIR}/deploy/systemd/cleanspace-backend.service" "${SYSTEMD_DIR}/"
cp "${APP_DIR}/deploy/systemd/cleanspace-frontend.service" "${SYSTEMD_DIR}/"

systemctl daemon-reload
systemctl enable --now cleanspace-backend
systemctl enable --now cleanspace-frontend

systemctl status cleanspace-backend --no-pager
systemctl status cleanspace-frontend --no-pager
