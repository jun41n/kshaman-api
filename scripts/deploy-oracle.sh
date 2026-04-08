#!/usr/bin/env bash
# Oracle Cloud API Server Deploy Script
# Usage: ./scripts/deploy-oracle.sh
# Requires: ORACLE_SSH_KEY env var + ~/.ssh/replit_deploy key file

set -e

ORACLE_HOST="129.154.51.196"
ORACLE_USER="ubuntu"
ORACLE_KEY="$HOME/.ssh/replit_deploy"
REMOTE_DIR="/home/ubuntu/kshaman-api"
PM2_APP="kshaman-api"

echo "🔨 Building API server..."
cd "$(dirname "$0")/.."
(cd artifacts/api-server && pnpm run build)

echo "📦 Uploading dist/index.cjs to Oracle Cloud..."
scp -i "$ORACLE_KEY" \
    -o StrictHostKeyChecking=no \
    artifacts/api-server/dist/index.cjs \
    "$ORACLE_USER@$ORACLE_HOST:$REMOTE_DIR/dist/index.cjs"

echo "🔄 Restarting PM2 process..."
ssh -i "$ORACLE_KEY" \
    -o StrictHostKeyChecking=no \
    "$ORACLE_USER@$ORACLE_HOST" \
    "cd $REMOTE_DIR && pm2 restart $PM2_APP --update-env && pm2 save"

echo "✅ Deploy complete! Testing health..."
sleep 2
curl -sf "https://api.mytesttype.com/health" && echo " API is UP" || echo " Health check failed (server may still be starting)"
