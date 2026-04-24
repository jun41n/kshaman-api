#!/usr/bin/env bash
# deploy.sh — inner-meter 빌드 후 GitHub Pages에 배포
set -e

DEPLOY_DIR="/tmp/mytesttype-deploy"
INNER_METER="artifacts/inner-meter"

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

echo "── 2. 빌드 (Vite + prerender) ──"
cd "$INNER_METER"
PORT=3000 BASE_PATH=/ pnpm run build
cd -

DIST="$INNER_METER/dist/public"

echo "── 3. assets 교체 ──"
rm -rf "$DEPLOY_DIR/assets"
cp -r "$DIST/assets" "$DEPLOY_DIR/assets"

echo "── 4. index.html 교체 ──"
cp "$DIST/index.html" "$DEPLOY_DIR/index.html"

echo "── 5. prerender 페이지 복사 (blog/, pet-test/) ──"
# blog 서브디렉토리 통째로 복사
rm -rf "$DEPLOY_DIR/blog"
cp -r "$DIST/blog" "$DEPLOY_DIR/blog"

# pet-test 서브디렉토리 복사
rm -rf "$DEPLOY_DIR/pet-test"
cp -r "$DIST/pet-test" "$DEPLOY_DIR/pet-test"

echo "── 6. public 파일 동기화 (이미지·sitemap·robots 등) ──"
# public/ 안의 파일들을 루트에 복사 (assets/ 제외)
for f in "$INNER_METER/public"/*; do
  name=$(basename "$f")
  [ "$name" = "assets" ] && continue
  cp -r "$f" "$DEPLOY_DIR/$name"
done

echo "── 7. 커밋 & 푸시 ──"
cd "$DEPLOY_DIR"
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M') — prerender blog + pet-test" || echo "(변경사항 없음)"
git push origin main
cd -

echo "✅ 배포 완료!"
