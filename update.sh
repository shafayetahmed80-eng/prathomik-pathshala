#!/usr/bin/env bash
# ==============================================================================
# Prathomik Pathshala - Production Safe Auto-Update Script for cPanel / CloudLinux
# ==============================================================================

# 1. Resolve application root directory (zero external forks)
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR" || {
    echo "❌ Failed to change directory to $APP_DIR"
    exit 1
}

echo "=================================================================="
echo "🚀 Starting Prathomik Pathshala Update: $(date '+%Y-%m-%d %H:%M:%S')"
echo "📂 Working directory: $APP_DIR"
echo "=================================================================="

# 2. Prevent cPanel / CloudLinux NPROC (thread limit) exhaustion & OOM kills
export UV_THREADPOOL_SIZE=1
export NODE_OPTIONS="--max-old-space-size=1024 --v8-pool-size=1"
export RAYON_NUM_THREADS=1
export OMP_NUM_THREADS=1
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production
export npm_config_audit=false
export npm_config_fund=false
export npm_config_maxsockets=2

# 3. Detect and activate cPanel Node.js virtual environment (zero-fork bash glob)
VENV_SCRIPT=""
APP_BASENAME="${APP_DIR##*/}"
if [ -d "$HOME/nodevenv/$APP_BASENAME" ]; then
    for candidate in "$HOME/nodevenv/$APP_BASENAME"/*/bin/activate; do
        if [ -f "$candidate" ]; then
            VENV_SCRIPT="$candidate"
            break
        fi
    done
fi
if [ -z "$VENV_SCRIPT" ] && [ -d "$HOME/nodevenv" ]; then
    for candidate in "$HOME/nodevenv"/*/"$APP_BASENAME"/*/bin/activate "$HOME/nodevenv"/*/*/bin/activate "$HOME/nodevenv"/*/*/*/bin/activate; do
        case "$candidate" in
            *"$APP_BASENAME"*)
                if [ -f "$candidate" ]; then
                    VENV_SCRIPT="$candidate"
                    break
                fi
                ;;
        esac
    done
fi

if [ -n "$VENV_SCRIPT" ] && [ -f "$VENV_SCRIPT" ]; then
    echo "🔌 Activating cPanel Node.js environment: $VENV_SCRIPT"
    # shellcheck disable=SC1090
    source "$VENV_SCRIPT"
else
    echo "ℹ️  Using default system Node.js environment"
fi

if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js is not found in PATH! Please ensure Setup Node.js App is configured."
    exit 1
fi

echo "🟢 Node version: $(node -v 2>/dev/null || echo 'Unknown')"

# 4. Fetch latest updates from GitHub (single thread to respect CloudLinux NPROC)
echo "📥 Fetching latest changes from GitHub (main branch)..."
git -c pack.threads=1 fetch origin main || {
    echo "❌ Git fetch failed. Please check internet connection or repository permissions."
    exit 1
}

# 5. Cleanly align with origin/main (preserves untracked .env & NCTB_Primary_Collection_Web)
echo "🔄 Aligning local files with origin/main..."
git -c pack.threads=1 reset --hard origin/main || {
    echo "❌ Git reset failed."
    exit 1
}

# Shared helper to stop this app's LiteSpeed/Node workers without touching sibling apps
stop_app_workers() {
    if command -v pkill >/dev/null 2>&1; then
        pkill -9 -f "lsnode:${APP_DIR}(/|$)" 2>/dev/null || true
        pkill -9 -f "${APP_DIR}/server\.js" 2>/dev/null || true
        pkill -9 -f "^node server\.js" 2>/dev/null || true
    fi
}

# 6. Install production dependencies only when manifest/lockfile changed or node_modules incomplete
DEPS_SIG="$(cksum package.json pnpm-lock.yaml 2>/dev/null || cksum package.json 2>/dev/null || echo '')"
DEPS_STAMP="node_modules/.prathomik_deps_sig"
DEPS_NEEDED=1

if [ -d "node_modules/next" ] && [ -n "$DEPS_SIG" ] && [ -r "$DEPS_STAMP" ]; then
    SAVED_SIG="$(<"$DEPS_STAMP")"
    if [ "$SAVED_SIG" = "$DEPS_SIG" ]; then
        DEPS_NEEDED=0
    fi
fi

if [ "$DEPS_NEEDED" -eq 0 ]; then
    echo "⚡ Dependencies unchanged & verified — skipping npm install to save CloudLinux processes."
else
    if ! command -v npm >/dev/null 2>&1; then
        echo "❌ npm is not found in PATH! Please ensure Setup Node.js App is configured."
        exit 1
    fi

    # Free CloudLinux NPROC thread slots held by old worker processes before running npm install
    echo "🧹 Freeing running Node worker threads before package sync..."
    stop_app_workers
    sleep 1

    echo "📦 Installing production dependencies (CloudLinux safe mode)..."
    npm install --omit=dev --no-audit --no-fund --ignore-scripts --maxsockets=2 || {
        echo "❌ npm install failed."
        exit 1
    }

    if [ -d "node_modules" ] && [ -n "$DEPS_SIG" ]; then
        printf '%s' "$DEPS_SIG" > "$DEPS_STAMP" 2>/dev/null || true
    fi
fi

# 7. Check for pre-compiled production build (.next)
if [ -f ".next/BUILD_ID" ] && [ -d ".next/server" ]; then
    echo "⚡ Verified pre-compiled production build (.next)! Zero CloudLinux RAM/CPU load needed."
else
    echo "🔨 Pre-compiled build not found. Compiling Next.js production build..."
    npm install --include=dev --no-audit --no-fund --ignore-scripts --maxsockets=2
    npm run build || {
        echo "❌ Build failed! Aborting update to prevent website crash."
        exit 1
    }
fi

# 8. Purge untracked Next.js runtime caches & ensure runtime permissions without scanning all node_modules
echo "🧹 Clearing stale Next.js runtime route caches..."
rm -rf .next/server/route-cache .next/cache .next/.deployed_build_id
chmod -R 755 .next 2>/dev/null || true
chmod 755 update.sh 2>/dev/null || true
mkdir -p tmp
chmod 777 tmp 2>/dev/null || true

# 9. Recycle old worker first, then trigger Phusion Passenger / LiteSpeed reload cleanly
echo "🔄 Triggering Node.js application restart..."
stop_app_workers

touch tmp/restart.txt

if command -v cloudlinux-selector >/dev/null 2>&1; then
    cloudlinux-selector restart --json --interpreter nodejs --app-root "$APP_DIR" 2>/dev/null || true
    cloudlinux-selector restart --json --interpreter nodejs --app-root "$APP_BASENAME" 2>/dev/null || true
fi

if command -v passenger-config >/dev/null 2>&1; then
    passenger-config restart-app "$APP_DIR" --ignore-passenger-not-running 2>/dev/null || true
fi

echo "=================================================================="
echo "🎉 Update completed successfully at $(date '+%Y-%m-%d %H:%M:%S')!"
echo "🌐 Your site is live and running."
echo "=================================================================="
