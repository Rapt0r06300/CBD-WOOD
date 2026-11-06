# Official Cloudflare agent setup, adapted for Codex on Windows/PowerShell.
# Source: https://developers.cloudflare.com/agent-setup/prompt.md
# Run from a trusted shell on your own machine; authentication requires you.
# It installs Cloudflare skills globally and registers MCP servers in Codex's user config.
$ErrorActionPreference = 'Stop'

function Assert-Command([string]$Name) {
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Commande introuvable : $Name. Installe Node.js et le CLI Codex avant de lancer ce script."
    }
}

Assert-Command 'codex'
Assert-Command 'npx'

Write-Host '[1/4] Installation des Skills Cloudflare pour Codex...'
& npx -y skills add cloudflare/skills --skill '*' --yes --global
if ($LASTEXITCODE -ne 0) { throw 'Installation Cloudflare Skills echouee.' }

$servers = [ordered]@{
    'cloudflare' = 'https://mcp.cloudflare.com/mcp'
    'cloudflare-docs' = 'https://docs.mcp.cloudflare.com/mcp'
    'cloudflare-bindings' = 'https://bindings.mcp.cloudflare.com/mcp'
    'cloudflare-builds' = 'https://builds.mcp.cloudflare.com/mcp'
    'cloudflare-observability' = 'https://observability.mcp.cloudflare.com/mcp'
}

Write-Host '[2/4] Enregistrement des MCP officiels dans Codex...'
foreach ($name in $servers.Keys) {
    $alreadyThere = $false
    try {
        & codex mcp get $name 2>$null | Out-Null
        $alreadyThere = ($LASTEXITCODE -eq 0)
    }
    catch { $alreadyThere = $false }

    if ($alreadyThere) {
        Write-Host "Deja configure : $name"
        continue
    }

    & codex mcp add $name --url $servers[$name]
    if ($LASTEXITCODE -ne 0) { throw "Erreur ajout du MCP $name." }
}

Write-Host '[3/4] Verification des serveurs Cloudflare...'
& codex mcp list
if ($LASTEXITCODE -ne 0) { throw 'Impossible de lister les MCP Codex.' }

Write-Host '[4/4] Connexion OAuth Cloudflare (autorisation dans le navigateur)...'
& codex mcp login cloudflare
if ($LASTEXITCODE -ne 0) {
    Write-Warning 'Connexion non finalisee : ouvrir Codex et reessayer codex mcp login cloudflare.'
    exit 2
}

Write-Host 'Configuration Cloudflare pour Codex terminee. Redemarre Codex puis controle /mcp.'
Write-Host 'Reste sur Workers Free/D1 Free ; aucune base payante ni commande reelle.'
