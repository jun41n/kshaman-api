#!/usr/bin/env bash
# deploy.sh — 관상 + K-Shaman만 빌드 후 GitHub Pages에 배포
set -e

DEPLOY_DIR="/tmp/mytesttype-deploy"
INNER_METER="artifacts/inner-meter"
K_SHAMAN="artifacts/k-shaman"
DEPLOY_STATIC="deploy-static"

echo "── 1. GitHub Pages 레포 클론/갱신 ──"
if [ -d "$DEPLOY_DIR/.git" ]; then
  cd "$DEPLOY_DIR" && git pull origin main && cd -
else
  rm -rf "$DEPLOY_DIR"
  git clone "https://oauth2:${GITHUB_TOKEN}@github.com/jun41n/mytesttype.git" "$DEPLOY_DIR"
  cd "$DEPLOY_DIR"
  git config user.email "deploy@mytesttype.com"
  git config user.name "MyTestType Deploy"
  cd -
fi

echo "── 2a. inner-meter 빌드 (Vite + prerender) ──"
cd "$INNER_METER"
PORT=3000 BASE_PATH=/ pnpm run build
cd -

DIST="$INNER_METER/dist/public"

echo "── 2b. k-shaman 빌드 ──"
cd "$K_SHAMAN"
PORT=3000 BASE_PATH=/k-shaman/ pnpm run build
cd -

K_DIST="$K_SHAMAN/dist/public"

echo "── 3. 관상 assets 교체 ──"
rm -rf "$DEPLOY_DIR/assets"
cp -r "$DIST/assets" "$DEPLOY_DIR/assets"

echo "── 4. 관상 페이지 교체 ──"
rm -rf "$DEPLOY_DIR/gwansang"
mkdir -p "$DEPLOY_DIR/gwansang"
cp "$DIST/index.html" "$DEPLOY_DIR/gwansang/index.html"
cp "$INNER_METER/public/favicon.svg" "$DEPLOY_DIR/favicon.svg"
cp "$INNER_METER/public/gwansang.png" "$DEPLOY_DIR/gwansang.png"
cp "$INNER_METER/public/gwansang-thumb.png" "$DEPLOY_DIR/gwansang-thumb.png"
cp "$INNER_METER/public/past-life.png" "$DEPLOY_DIR/past-life.png"
cp "$INNER_METER/public/palm-calligraphy.png" "$DEPLOY_DIR/palm-calligraphy.png"
cp "$INNER_METER/public/palm-lines.png" "$DEPLOY_DIR/palm-lines.png"

echo "── 4b. 손금 페이지 교체 ──"
rm -rf "$DEPLOY_DIR/palm-reading"
mkdir -p "$DEPLOY_DIR/palm-reading"
cp "$DIST/palm-reading/index.html" "$DEPLOY_DIR/palm-reading/index.html"

echo "── 5. k-shaman 폴더 교체 ──"
rm -rf "$DEPLOY_DIR/k-shaman"
mkdir -p "$DEPLOY_DIR/k-shaman"
cp -r "$K_DIST/"* "$DEPLOY_DIR/k-shaman/"

echo "── 6. 공통 SEO·안내 파일 교체 ──"
# The root URL is the primary AI face-reading experience. Keep the built app
# entrypoint at / so the browser mounts the real React page instead of only
# receiving the SEO fallback document.
cp "$DIST/index.html" "$DEPLOY_DIR/index.html"
cp "$DEPLOY_STATIC/404.html" "$DEPLOY_DIR/404.html"
cp "$DEPLOY_STATIC/robots.txt" "$DEPLOY_DIR/robots.txt"
cp "$DEPLOY_STATIC/sitemap.xml" "$DEPLOY_DIR/sitemap.xml"
cp "$DEPLOY_STATIC/llms.txt" "$DEPLOY_DIR/llms.txt"
rm -rf "$DEPLOY_DIR/privacy"
cp -r "$DEPLOY_STATIC/privacy" "$DEPLOY_DIR/privacy"

echo "── 7. 구형 공개 경로 제거 및 안전 검사 ──"
rm -rf "$DEPLOY_DIR/blog" "$DEPLOY_DIR/pet-test" "$DEPLOY_DIR/tests" "$DEPLOY_DIR/results"
rm -f "$DEPLOY_DIR/posts.json"

for forbidden in blog pet-test tests results; do
  if [ -e "$DEPLOY_DIR/$forbidden" ]; then
    echo "금지 경로가 남아 있습니다: $forbidden" >&2
    exit 1
  fi
done

test -f "$DEPLOY_DIR/index.html"
test -f "$DEPLOY_DIR/robots.txt"
test -f "$DEPLOY_DIR/sitemap.xml"
test -f "$DEPLOY_DIR/gwansang/index.html"
test -f "$DEPLOY_DIR/k-shaman/index.html"
test -f "$DEPLOY_DIR/privacy/index.html"
test -f "$DEPLOY_DIR/assets/gwansang-loading-widget.js"

echo "── 8. 커밋 & 푸시 ──"
cd "$DEPLOY_DIR"
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M') — K-Shaman 및 관상 갱신" || echo "(변경사항 없음)"
git push origin main
cd -

echo "✅ 배포 완료!"
