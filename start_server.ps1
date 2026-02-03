# Script para iniciar o servidor Next.js de forma robusta
# Baseado na logica do start.ps1 original

# Configurar encoding UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  INICIANDO SERVIDOR - ENERGON SITE" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Cores
$ErrorColor = "Red"
$SuccessColor = "Green"
$InfoColor = "Cyan"
$WarningColor = "Yellow"

# Funcoes auxiliares
function Test-Port {
    param([int]$Port)
    try {
        $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
        return $null -ne $connection
    }
    catch {
        return $false
    }
}

function Stop-PortProcess {
    param([int]$Port)
    try {
        $processes = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | 
        Select-Object -ExpandProperty OwningProcess -Unique
        if ($processes) {
            foreach ($processId in $processes) {
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
            }
            Start-Sleep -Seconds 2
            Write-Host "[OK] Processos na porta $Port finalizados" -ForegroundColor $SuccessColor
            return $true
        }
        return $false
    }
    catch {
        return $false
    }
}

# 1. Limpar processo anterior na porta 3000
Write-Host "[1/4] Verificando portas..." -ForegroundColor $InfoColor
$cleaned = Stop-PortProcess -Port 3000
if (-not $cleaned) {
    Write-Host "    Porta 3000 livre" -ForegroundColor Gray
}
Write-Host ""

# 2. Verificar dependencias
Write-Host "[2/4] Verificando dependencias..." -ForegroundColor $InfoColor
if (-not (Test-Path "$PSScriptRoot\node_modules")) {
    Write-Host "    [AVISO] node_modules nao encontrado!" -ForegroundColor $WarningColor
    Write-Host "            Instalando dependencias..." -ForegroundColor $WarningColor
    try {
        npm install 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "    [OK] Dependencias instaladas" -ForegroundColor $SuccessColor
        }
        else {
            Write-Host "    [ERRO] Falha ao instalar dependencias" -ForegroundColor $ErrorColor
            exit 1
        }
    }
    catch {
        Write-Host "    [ERRO] Erro ao executar npm install: $_" -ForegroundColor $ErrorColor
        exit 1
    }
}
else {
    Write-Host "    [OK] node_modules encontrado" -ForegroundColor $SuccessColor
}
Write-Host ""

# 3. Iniciar Servidor
Write-Host "[3/4] Iniciando Next.js..." -ForegroundColor $InfoColor
Write-Host "    Abrindo nova janela para o servidor..." -ForegroundColor Gray

$serverCommand = @"
cd '$PSScriptRoot'
Write-Host ''
Write-Host '========================================' -ForegroundColor Cyan
Write-Host '  ENERGON SYSTEM - DEV SERVER' -ForegroundColor Cyan
Write-Host '========================================' -ForegroundColor Cyan
Write-Host ''
Write-Host 'URL: http://localhost:3000' -ForegroundColor Green
Write-Host ''
Write-Host '[INFO] MODO DE DESENVOLVIMENTO ATIVO' -ForegroundColor Magenta
Write-Host '       Qualquer alteracao nos arquivos sera aplicada automaticamente.' -ForegroundColor Magenta
Write-Host '       NAO FECHE ESTA JANELA enquanro estiver trabalhando.' -ForegroundColor Magenta
Write-Host ''
Write-Host 'Gerando Prisma Client...' -ForegroundColor DarkGray
npx prisma generate
Write-Host 'Iniciando...' -ForegroundColor Yellow
npm run dev
"@

try {
    $process = Start-Process powershell -ArgumentList "-NoExit", "-Command", $serverCommand -PassThru -WindowStyle Normal
    Write-Host "    Servidor iniciado (PID: $($process.Id))" -ForegroundColor $SuccessColor
}
catch {
    Write-Host "[ERRO] Falha ao iniciar processo: $_" -ForegroundColor $ErrorColor
    exit 1
}

# 4. Aguardar inicializacao
Write-Host "[4/4] Aguardando servidor estar pronto..." -ForegroundColor $InfoColor
$ready = $false
for ($i = 1; $i -le 30; $i++) {
    Start-Sleep -Seconds 2
    if (Test-Port -Port 3000) {
        Write-Host "    [OK] Servidor respondendo na porta 3000!" -ForegroundColor $SuccessColor
        $ready = $true
        break
    }
    if ($i -lt 30) {
        Write-Host "    Aguardando... ($i/30)" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
if ($ready) {
    Write-Host "  SISTEMA ONLINE: http://localhost:3000" -ForegroundColor $SuccessColor
}
else {
    Write-Host "  O servidor ainda esta carregando ou houve erro." -ForegroundColor $WarningColor
    Write-Host "  Verifique a outra janela." -ForegroundColor $WarningColor
}
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor DarkGray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
