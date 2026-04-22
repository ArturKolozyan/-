Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

docker compose up -d --build
docker compose ps
