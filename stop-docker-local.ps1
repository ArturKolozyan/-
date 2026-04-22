Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

docker compose down
$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Stopping ClearSpace Docker stack..." -ForegroundColor Yellow
Push-Location $projectRoot
docker compose down
Pop-Location

Write-Host "Stopped." -ForegroundColor Green
