#!/usr/bin/env bash
# Oracle Cloud API Server Deploy Script
# Usage: ./scripts/deploy-oracle.sh

set -e

ORACLE_HOST="158.180.67.117"
ORACLE_USER="ubuntu"
ORACLE_KEY="$HOME/.ssh/replit_deploy"
REMOTE_APP_DIR="/home/ubuntu/app"
REMOTE_DIST="$REMOTE_APP_DIR/artifacts/api-server/dist/index.cjs"
PM2_APP="kshaman-api"

echo "Building API server..."
cd "$(dirname "$0")/.."
(cd artifacts/api-server && pnpm run build)

echo "Uploading dist/index.cjs to Oracle Cloud..."
scp -i "$ORACLE_KEY" \
    -o StrictHostKeyChecking=no \
    artifacts/api-server/dist/index.cjs \
    "$ORACLE_USER@$ORACLE_HOST:$REMOTE_DIST"

echo "Restarting PM2 process..."
ssh -i "$ORACLE_KEY" \
    -o StrictHostKeyChecking=no \
    "$ORACLE_USER@$ORACLE_HOST" \
    "cd $REMOTE_APP_DIR && pm2 restart $PM2_APP --update-env && pm2 save && echo 'PM2 OK'"

echo "Deploy complete!"
sleep 2
ssh -i "$ORACLE_KEY" -o StrictHostKeyChecking=no "$ORACLE_USER@$ORACLE_HOST" \
    "curl -s http://localhost:3001/api/healthz && echo"
