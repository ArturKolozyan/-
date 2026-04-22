# Deploy через Docker (Ubuntu 24.04)

## 1) DNS

У регистратора домена добавьте:

- `A` -> `clearspacenvrsk.ru` -> `IP_СЕРВЕРА`
- `A` -> `www.clearspacenvrsk.ru` -> `IP_СЕРВЕРА`

Проверка:

```bash
nslookup clearspacenvrsk.ru
nslookup www.clearspacenvrsk.ru
```

## 2) Установка Docker

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo $VERSION_CODENAME) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
```

## 3) Клон проекта

```bash
sudo mkdir -p /opt
cd /opt
sudo git clone <URL_ВАШЕГО_РЕПО> cleanspace
cd /opt/cleanspace
```

## 4) Подготовить `.env`

```bash
cp .env.production.example .env
nano .env
```

Пример значений:

```env
BOT_TOKEN=YOUR_NEW_TELEGRAM_BOT_TOKEN
OWNER_CHAT_ID=YOUR_OWNER_CHAT_ID
FASTAPI_HOST=127.0.0.1
FASTAPI_PORT=8000
NEXT_PUBLIC_API_URL=
CORS_ORIGINS=https://clearspacenvrsk.ru,https://www.clearspacenvrsk.ru
NEXT_PUBLIC_SITE_URL=https://clearspacenvrsk.ru
```

## 5) Если ранее запускали через systemd/nginx

Освободить порты 80/3000/8000:

```bash
sudo systemctl disable --now cleanspace-backend cleanspace-frontend nginx || true
```

## 6) Запуск

```bash
sudo docker compose up -d --build
sudo docker compose ps
```

Проверка:

```bash
curl -fsS http://127.0.0.1/api/health
curl -fsS http://127.0.0.1
```

## 7) SSL (Let's Encrypt)

Самый простой вариант для контейнерного nginx: поставить Cloudflare proxy и использовать SSL в Cloudflare.

Если нужен именно Let's Encrypt на сервере с контейнерным nginx, удобнее перейти на reverse proxy с автосертификатами (например Caddy/Traefik).

## 8) Обновление проекта

```bash
cd /opt/cleanspace
sudo git pull
sudo docker compose up -d --build
sudo docker compose logs -f --tail=200
```
