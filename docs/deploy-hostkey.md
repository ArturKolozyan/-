# Deploy на HOSTKEY (Ubuntu 24.04)

## 1) Что купить в HOSTKEY

- VPS с Ubuntu 24.04 LTS
- Минимум: 2 vCPU, 2 GB RAM, 30+ GB SSD
- Белый IPv4
- Домен (например, `example.com`)

## 2) Подготовка DNS

У регистратора домена добавьте записи:

- `A` -> `clearspacenvrsk.ru` -> `IP_СЕРВЕРА`
- `A` -> `www.clearspacenvrsk.ru` -> `IP_СЕРВЕРА`

Проверка (локально):

```bash
nslookup clearspacenvrsk.ru
nslookup www.clearspacenvrsk.ru
```

## 3) Первичная настройка сервера

Подключение:

```bash
ssh root@IP_СЕРВЕРА
```

Обновление и базовые пакеты:

```bash
apt update && apt upgrade -y
apt install -y git curl nginx certbot python3-certbot-nginx python3-venv python3-pip
```

## 4) Развернуть проект в `/opt/cleanspace`

```bash
mkdir -p /opt
cd /opt
git clone <URL_ВАШЕГО_РЕПО> cleanspace
cd /opt/cleanspace
```

Создать `.env`:

```bash
cp .env.example .env
nano .env
```

Значения для production:

```env
BOT_TOKEN=...
OWNER_CHAT_ID=...
FASTAPI_HOST=127.0.0.1
FASTAPI_PORT=8000
NEXT_PUBLIC_API_URL=https://clearspacenvrsk.ru
CORS_ORIGINS=https://clearspacenvrsk.ru,https://www.clearspacenvrsk.ru
```

## 5) Установить зависимости и собрать frontend

```bash
cd /opt/cleanspace
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r backend/requirements.txt
```

```bash
cd /opt/cleanspace/frontend
npm ci
npm run build
```

## 6) Настроить systemd сервисы

```bash
cp /opt/cleanspace/deploy/systemd/cleanspace-backend.service /etc/systemd/system/
cp /opt/cleanspace/deploy/systemd/cleanspace-frontend.service /etc/systemd/system/
chown -R www-data:www-data /opt/cleanspace
```

```bash
systemctl daemon-reload
systemctl enable --now cleanspace-backend
systemctl enable --now cleanspace-frontend
systemctl status cleanspace-backend --no-pager
systemctl status cleanspace-frontend --no-pager
```

## 7) Настроить Nginx

Открыть конфиг и заменить домен:

```bash
cp /opt/cleanspace/deploy/nginx/cleanspace.conf /etc/nginx/sites-available/cleanspace
nano /etc/nginx/sites-available/cleanspace
```

В файле замените:

- домен уже прописан (`clearspacenvrsk.ru`, `www.clearspacenvrsk.ru`), при необходимости отредактируйте

Активировать сайт:

```bash
ln -sf /etc/nginx/sites-available/cleanspace /etc/nginx/sites-enabled/cleanspace
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

## 8) Выпустить SSL

```bash
certbot --nginx -d clearspacenvrsk.ru -d www.clearspacenvrsk.ru
```

Проверка автообновления сертификата:

```bash
systemctl status certbot.timer --no-pager
```

## 9) Проверки после деплоя

```bash
curl -I https://clearspacenvrsk.ru
curl https://clearspacenvrsk.ru/api/health
journalctl -u cleanspace-backend -n 100 --no-pager
journalctl -u cleanspace-frontend -n 100 --no-pager
```

Ожидается для `/api/health`:

```json
{"status":"ok"}
```

## 10) Как обновлять проект

```bash
cd /opt/cleanspace
git pull
source .venv/bin/activate
pip install -r backend/requirements.txt
cd /opt/cleanspace/frontend
npm ci
npm run build
systemctl restart cleanspace-backend
systemctl restart cleanspace-frontend
systemctl status cleanspace-backend --no-pager
systemctl status cleanspace-frontend --no-pager
```
