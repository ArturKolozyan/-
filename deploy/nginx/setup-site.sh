#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/nginx/setup-site.sh"
  exit 1
fi

APP_DIR="/opt/cleanspace"
DOMAIN="${DOMAIN:-clearspacenvrsk.ru}"
WWW_DOMAIN="${WWW_DOMAIN:-www.clearspacenvrsk.ru}"

cp "${APP_DIR}/deploy/nginx/cleanspace.conf" /etc/nginx/sites-available/cleanspace
ln -sf /etc/nginx/sites-available/cleanspace /etc/nginx/sites-enabled/cleanspace
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl reload nginx

echo "Nginx site enabled."
echo "Issue certificate with:"
echo "certbot --nginx -d ${DOMAIN} -d ${WWW_DOMAIN}"
