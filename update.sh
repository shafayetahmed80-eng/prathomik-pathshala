#!/usr/bin/env bash
# ==============================================================================
# Prathomik Pathshala - Production Safe Auto-Update Script for cPanel / CloudLinux
# ==============================================================================

set -o pipefail

# 1. Resolve application root directory
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR" || {
    echo "❌ Failed to change directory to $APP_DIR"
    exit 1
}

echo "=================================================================="
echo "🚀 Starting Prathomik Pathshala Update: $(date '+%Y-%m-%d %H:%M:%S')"
echo "📂 Working directory: $APP_DIR"
echo "=================================================================="

# 2. Prevent cPanel / CloudLinux Out-Of-Memory (OOM) kills
export NODE_OPTIONS="--max-old-space-size=1536"
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production

# 3. Detect and activate cPanel Node.js virtual environment (nodevenv)
VENV_SCRIPT=""
if [ -d "$HOME/nodevenv" ]; then
    APP_BASENAME="$(basename "$APP_DIR")"
    VENV_SCRIPT=$(find "$HOME/nodevenv" -maxdepth 4 -name "activate" 2>/dev/null | grep -E "$APP_BASENAME" | head -n 1)
fi

if [ -n "$VENV_SCRIPT" ] && [ -f "$VENV_SCRIPT" ]; then
    echo "🔌 Activating cPanel Node.js environment: $VENV_SCRIPT"
    # shellcheck disable=SC1090
    source "$VENV_SCRIPT"
else
    echo "ℹ️  Using default system Node.js environment"
fi

echo "🟢 Node version: $(node -v 2>/dev/null || echo 'Not found')"
echo "🟢 NPM version:  $(npm -v 2>/dev/null || echo 'Not found')"

# Check node availability
if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js is not found in PATH! Please ensure Setup Node.js App is configured."
    exit 1
fi

# 4. Fetch latest updates from GitHub
echo "📥 Fetching latest changes from GitHub (main branch)..."
git fetch origin main || {
    echo "❌ Git fetch failed. Please check internet connection or repository permissions."
    exit 1
}

# 5. Cleanly align with origin/main (preserves untracked .env & NCTB_Primary_Collection_Web)
echo "🔄 Aligning local files with origin/main..."
git reset --hard origin/main || {
    echo "❌ Git reset failed."
    exit 1
}

# 6. Install / update dependencies cleanly (skips pnpm check scripts)
echo "📦 Installing npm dependencies..."
npm install --no-audit --no-fund --ignore-scripts || {
    echo "❌ npm install failed."
    exit 1
}

# 7. Safe Production Build (Crash-proof: aborts before restart if build fails)
echo "🔨 Compiling Next.js production build..."
if npm run build; then
    echo "✅ Build completed successfully!"
else
    echo "❌ Build failed! Aborting update to prevent website crash."
    echo "ℹ️  The existing running build has NOT been touched."
    exit 1
fi

# 8. Ensure correct permissions
chmod -R 755 .
mkdir -p tmp
chmod 777 tmp 2>/dev/null || true

# 9. Graceful zero-downtime Phusion Passenger restart
echo "🔄 Triggering Phusion Passenger restart (zero-downtime)..."
touch tmp/restart.txt

echo "=================================================================="
echo "🎉 Update completed successfully at $(date '+%Y-%m-%d %H:%M:%S')!"
echo "🌐 Your site is live and running."
echo "=================================================================="
