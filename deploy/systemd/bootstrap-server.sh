#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/systemd/bootstrap-server.sh"
  exit 1
fi

APP_DIR="/opt/cleanspace"

export DEBIAN_FRONTEND=noninteractive
apt update
apt install -y ca-certificates curl gnupg git nginx certbot python3-certbot-nginx python3-venv python3-pip

# Install Node.js 20 LTS for Next.js production build/runtime.
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | sed 's/^v//; s/\..*//')" -lt 20 ]]; then
  install -d -m 0755 /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  chmod a+r /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" > /etc/apt/sources.list.d/nodesource.list
  apt update
  apt install -y nodejs
fi

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
