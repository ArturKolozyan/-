#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/nginx/setup-site.sh"
  exit 1
fi

APP_DIR="/opt/cleanspace"
DOMAIN="${DOMAIN:-example.com}"
WWW_DOMAIN="${WWW_DOMAIN:-www.example.com}"
TEMPLATE_PATH="${APP_DIR}/deploy/nginx/cleanspace.conf"
TARGET_PATH="/etc/nginx/sites-available/cleanspace"

if [[ "${DOMAIN}" == "example.com" || "${WWW_DOMAIN}" == "www.example.com" ]]; then
  echo "Set DOMAIN and WWW_DOMAIN before running."
  echo "Example: DOMAIN=your-domain.com WWW_DOMAIN=www.your-domain.com sudo bash deploy/nginx/setup-site.sh"
  exit 1
fi

if [[ ! -f "${TEMPLATE_PATH}" ]]; then
  echo "Missing template: ${TEMPLATE_PATH}"
  exit 1
fi

sed \
  -e "s|__DOMAIN__|${DOMAIN}|g" \
  -e "s|__WWW_DOMAIN__|${WWW_DOMAIN}|g" \
  "${TEMPLATE_PATH}" > "${TARGET_PATH}"

ln -sf "${TARGET_PATH}" /etc/nginx/sites-enabled/cleanspace
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl reload nginx

echo "Nginx site enabled."
echo "Issue certificate with:"
echo "sudo certbot --nginx -d ${DOMAIN} -d ${WWW_DOMAIN}"
