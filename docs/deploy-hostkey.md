# Deploy на HOSTKEY (Ubuntu 24.04)

## 1) Что купить в HOSTKEY

- VPS с Ubuntu 24.04 LTS
- Минимум: 2 vCPU, 2 GB RAM, 30+ GB SSD
- Белый IPv4
- Домен (например, `example.com`)

## 2) Подготовка DNS

У регистратора домена добавьте записи:

- `A` -> `your-domain.com` -> `IP_СЕРВЕРА`
- `A` -> `www.your-domain.com` -> `IP_СЕРВЕРА`

Проверка (локально):

```bash
nslookup your-domain.com
nslookup www.your-domain.com
```

## 3) Первичная настройка сервера

Подключение:

```bash
ssh root@IP_СЕРВЕРА
```

Быстрый вариант (скриптом из проекта):

```bash
cd /opt
git clone <URL_ВАШЕГО_РЕПО> cleanspace
cd /opt/cleanspace
bash deploy/systemd/bootstrap-server.sh
```

Ручной вариант (если нужно):

```bash
apt update && apt upgrade -y
apt install -y ca-certificates curl gnupg git nginx certbot python3-certbot-nginx python3-venv python3-pip
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" > /etc/apt/sources.list.d/nodesource.list
apt update && apt install -y nodejs
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
cp .env.production.example .env
nano .env
```

Значения для production:

```env
BOT_TOKEN=...
OWNER_CHAT_ID=...
FASTAPI_HOST=127.0.0.1
FASTAPI_PORT=8000
NEXT_PUBLIC_API_URL=
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 5) Установить зависимости и собрать frontend

Быстрый вариант:

```bash
cd /opt/cleanspace
bash deploy/systemd/install-and-build.sh
```

## 6) Настроить systemd сервисы

```bash
cd /opt/cleanspace
sudo bash deploy/systemd/enable-services.sh
```

## 7) Настроить Nginx

Активировать сайт:

```bash
cd /opt/cleanspace
DOMAIN=your-domain.com WWW_DOMAIN=www.your-domain.com sudo bash deploy/nginx/setup-site.sh
```

## 8) Выпустить SSL

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Проверка автообновления сертификата:

```bash
systemctl status certbot.timer --no-pager
```

## 9) Проверки после деплоя

```bash
cd /opt/cleanspace
bash deploy/systemd/health-check.sh https://your-domain.com
```

Ожидается для `/api/health`:

```json
{"status":"ok"}
```

## 10) Как обновлять проект

```bash
cd /opt/cleanspace
bash deploy/systemd/update-app.sh
```
