Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

docker compose up -d --build
docker compose ps
$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting ClearSpace Docker stack in background..." -ForegroundColor Cyan
Push-Location $projectRoot
docker compose up -d --build
docker compose ps
Pop-Location

Write-Host "Done. Open http://localhost" -ForegroundColor Green
