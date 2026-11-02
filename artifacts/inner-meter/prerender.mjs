/**
 * prerender.mjs
 * Builds static SEO entry pages for the three active web services.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "dist/public");
const baseTemplate = readFileSync(join(distDir, "index.html"), "utf-8");

// These files belong to retired MBTI, tarot, pet, and blog products. Keep
// source history locally if needed, but do not publish them with the live site.
for (const legacyPath of ["blog", "pet-test", "images/tarot", "images/tarot-back.png", "tarot-blog.png", "posts.json"]) {
  rmSync(join(distDir, legacyPath), { recursive: true, force: true });
}

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * baseTemplate에서 <head> 메타를 교체하고,
 * #root 앞에 pre-rendered 콘텐츠를 삽입합니다.
 * React 앱이 마운트된 후 prerender 영역을 숨깁니다.
 */
function buildPage({ title, description, canonical, bodyHtml, ogImage }) {
  let html = baseTemplate;

  // <title> 교체
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);

  // description (Vite may format this meta tag across multiple lines)
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/?>/,
    `<meta name="description" content="${esc(description)}">`
  );
  if (!html.includes('<meta name="description"')) {
    html = html.replace("</head>", `<meta name="description" content="${esc(description)}">\n</head>`);
  }

  // canonical
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${canonical}">`
  );
  if (!html.includes('rel="canonical"')) {
    html = html.replace("</head>", `<link rel="canonical" href="${canonical}">\n</head>`);
  }

  // OG tags — 기존 OG 태그 제거 후 재삽입
  html = html.replace(/<meta\s+property="og:[^"]*"[\s\S]*?\/?>\s*/g, "");
  html = html.replace(
    "</head>",
    `<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
</head>`
  );

  html = html.replace(
    /<meta\s+name="twitter:title"[\s\S]*?\/?>/,
    `<meta name="twitter:title" content="${esc(title)}">`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"[\s\S]*?\/?>/,
    `<meta name="twitter:image" content="${ogImage}">`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/?>/,
    `<meta name="twitter:description" content="${esc(description)}">`
  );

  // pre-rendered 콘텐츠 + 숨김 스크립트
  const prerender = `
<div id="prerender-seo" style="display:none;max-width:768px;margin:0 auto;padding:24px 16px;font-family:sans-serif">
${bodyHtml}
</div>
<script>
(function(){
  var pre=document.getElementById('prerender-seo');
  if(!pre)return;
  var root=document.getElementById('root');
  if(!root)return;
  var ob=new MutationObserver(function(){
    if(root.children.length>0){pre.style.display='none';ob.disconnect();}
  });
  ob.observe(root,{childList:true});
  setTimeout(function(){if(root.children.length>0)pre.style.display='none';},3000);
})();
</script>`;

  html = html.replace('<div id="root">', `${prerender}\n<div id="root">`);
  return html;
}

/* ── /palm-reading ──────────────────────────── */
{
  const dir = join(distDir, "palm-reading");
  mkdirSync(dir, { recursive: true });
  const html = buildPage({
    title: "AI 손금 분석 | MyTestType",
    description:
      "손바닥 사진에서 보이는 선과 형태를 바탕으로 손금 전통을 문화·오락 관점에서 살펴보는 AI 손금 서비스입니다.",
    canonical: "https://mytesttype.com/palm-reading/",
    ogImage: "https://mytesttype.com/palm-calligraphy.png",
    bodyHtml: `
<h1 style="font-size:1.7em;font-weight:900;margin:0 0 0.5em;color:#111">AI 손금 분석</h1>
<p style="color:#555;margin-bottom:1.2em;line-height:1.7">손을 펼친 정면 사진을 바탕으로 생명선·두뇌선·감정선과 손바닥 형태를 전통 수상학의 상징으로 살펴보는 문화·오락 목적의 서비스입니다.</p>
<p style="color:#555;line-height:1.7">결과는 건강·수명·재산·미래를 확정하는 판단이 아니며, 자기성찰을 위한 참고 안내로만 제공됩니다.</p>`,
  });
  writeFileSync(join(dir, "index.html"), html, "utf-8");
  console.log("✓  palm-reading/index.html");
}

/* ── /gwansang ─────────────────────────────── */
{
  const dir = join(distDir, "gwansang");
  mkdirSync(dir, { recursive: true });
  const html = buildPage({
    title: "AI 관상 분석 | MyTestType",
    description:
      "사진 한 장을 바탕으로 얼굴 특징과 인상에서 보이는 성향을 전통 관상 문화의 언어로 살펴보는 AI 관상 서비스입니다.",
    canonical: "https://mytesttype.com/gwansang/",
    ogImage: "https://mytesttype.com/gwansang.png",
    bodyHtml: `
<h1 style="font-size:1.7em;font-weight:900;margin:0 0 0.5em;color:#111">AI 관상 분석</h1>
<p style="color:#555;margin-bottom:1.2em;line-height:1.7">사진 속 표정과 인상을 전통 관상 문화의 언어로 살펴보고, 나를 바라보는 새로운 단서를 건네는 문화·오락 목적의 서비스입니다.</p>`,
  });
  writeFileSync(join(dir, "index.html"), html, "utf-8");
  console.log("✓  gwansang/index.html");
}

console.log("\n✅ Pre-render 완료! 운영 서비스 2페이지 생성");

// GitHub Pages has no server-side redirect layer. Its 404 document handles
// old, indexed MBTI/tarot/pet/blog URLs before the SPA has a chance to load.
writeFileSync(
  join(distDir, "404.html"),
  `<!doctype html><meta charset="utf-8"><script>(function(){var legacy=/^\\/(tests|results|tarot|pet-test|blog)(?:\\/|$)/;location.replace(legacy.test(location.pathname)?"/":"/");}())</script>`,
  "utf8",
);
console.log("✓  legacy URL fallback redirect");

for (const legacyPath of ["tests", "tarot", "pet-test", "blog"]) {
  const directory = join(distDir, legacyPath);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "index.html"), `<!doctype html><meta http-equiv="refresh" content="0; url=/"><script>location.replace("/")</script>`, "utf8");
}
console.log("✓  legacy root redirect pages");
