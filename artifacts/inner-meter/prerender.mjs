/**
 * prerender.mjs
 * 빌드 후 실행 — 각 블로그 포스트 / 주요 페이지의 정적 HTML을 생성합니다.
 * GitHub Pages가 /blog/1 요청 시 404.html 대신 실제 콘텐츠를 서빙할 수 있게 합니다.
 * AdSense / 검색봇은 <body>에서 실제 텍스트를 인식합니다.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "dist/public");
const publicDir = join(__dirname, "public");

const posts = JSON.parse(readFileSync(join(publicDir, "posts.json"), "utf-8"));
const baseTemplate = readFileSync(join(distDir, "index.html"), "utf-8");

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderContent(content) {
  const lines = content.split("\n");
  const parts = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      parts.push(
        `<h2 style="font-size:1.15em;font-weight:900;margin:2em 0 0.5em 0;color:#111">${esc(line.slice(3))}</h2>`
      );
    } else if (line.startsWith("[POSTER:")) {
      // POSTER 라인 다음에 오는 텍스트 줄도 단락으로 처리
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === "") j++;
      if (j < lines.length && lines[j].trim() !== "") {
        parts.push(
          `<p style="line-height:1.8;margin-bottom:0.9em;color:#333">${esc(lines[j])}</p>`
        );
        i = j + 1;
        continue;
      }
    } else if (line.trim() !== "") {
      parts.push(
        `<p style="line-height:1.8;margin-bottom:0.9em;color:#333">${esc(line)}</p>`
      );
    }
    i++;
  }
  return parts.join("\n");
}

/**
 * baseTemplate에서 <head> 메타를 교체하고,
 * #root 앞에 pre-rendered 콘텐츠를 삽입합니다.
 * React 앱이 마운트된 후 prerender 영역을 숨깁니다.
 */
function buildPage({ title, description, canonical, bodyHtml }) {
  let html = baseTemplate;

  // <title> 교체
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);

  // description
  html = html.replace(
    /<meta name="description"[^>]*>/,
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
  html = html.replace(/<meta property="og:[^"]*"[^>]*>\n?/g, "");
  html = html.replace(
    "</head>",
    `<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
</head>`
  );

  // pre-rendered 콘텐츠 + 숨김 스크립트
  const prerender = `
<div id="prerender-seo" style="max-width:768px;margin:0 auto;padding:24px 16px;font-family:sans-serif">
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

/* ── 블로그 포스트 1~15 ───────────────────────── */
for (const post of posts) {
  const dir = join(distDir, "blog", post.id);
  mkdirSync(dir, { recursive: true });

  const bodyHtml = `
<p style="font-size:0.78em;color:#888;margin-bottom:0.4em">${esc(post.category)} · ${esc(post.date)}</p>
<h1 style="font-size:1.7em;font-weight:900;margin:0 0 0.5em;color:#111;line-height:1.3">${esc(post.title)}</h1>
<p style="font-size:1em;color:#555;margin-bottom:1.5em;line-height:1.7">${esc(post.description)}</p>
<hr style="border:none;border-top:1px solid #e5e5e5;margin-bottom:1.5em"/>
${renderContent(post.content)}`;

  const html = buildPage({
    title: `${post.title} | 심리 칼럼 · MyTestType`,
    description: post.description,
    canonical: `https://mytesttype.com/blog/${post.id}`,
    bodyHtml,
  });

  writeFileSync(join(dir, "index.html"), html, "utf-8");
  console.log(`✓  blog/${post.id}/index.html`);
}

/* ── /blog 목록 페이지 ───────────────────────── */
{
  const dir = join(distDir, "blog");
  const listItems = posts
    .map(
      (p) =>
        `<li style="padding:14px 0;border-bottom:1px solid #eee">
  <a href="/blog/${p.id}" style="font-weight:700;color:#6c3fc8;text-decoration:none;font-size:1em">${esc(p.title)}</a>
  <p style="margin:4px 0 0;font-size:0.88em;color:#555;line-height:1.6">${esc(p.description)}</p>
</li>`
    )
    .join("\n");

  const bodyHtml = `
<h1 style="font-size:1.7em;font-weight:900;margin:0 0 0.3em;color:#111">심리 칼럼</h1>
<p style="color:#555;margin-bottom:1.5em">심리학·자기계발·인간관계에 관한 깊이 있는 칼럼을 만나보세요.</p>
<ul style="list-style:none;padding:0;margin:0">
${listItems}
</ul>`;

  const html = buildPage({
    title: "심리 칼럼 | MyTestType",
    description:
      "MBTI, 심리학, 자기계발에 관한 전문 심리 칼럼. 과학적 근거를 바탕으로 자신을 더 깊이 이해하세요.",
    canonical: "https://mytesttype.com/blog",
    bodyHtml,
  });

  writeFileSync(join(dir, "index.html"), html, "utf-8");
  console.log("✓  blog/index.html");
}

/* ── /pet-test ───────────────────────────────── */
{
  const dir = join(distDir, "pet-test");
  mkdirSync(dir, { recursive: true });

  const bodyHtml = `
<h1 style="font-size:1.7em;font-weight:900;margin:0 0 0.5em;color:#111">반려동물 성격 유형 테스트 (Pet MBTI)</h1>
<p style="color:#555;margin-bottom:1.2em;line-height:1.7">
  우리 강아지·고양이의 성격은 어떤 유형일까요? 반려동물의 행동 패턴을 분석하여 MBTI 유형으로 알려드립니다.
  강아지와 고양이의 사회성, 호기심, 에너지 수준, 루틴 선호도를 바탕으로 16가지 성격 유형 중 하나를 찾아보세요.
</p>
<ul style="color:#333;line-height:2;padding-left:1.2em">
  <li>강아지·고양이 모두 지원</li>
  <li>행동 패턴 기반 15문항 테스트</li>
  <li>16가지 펫 성격 유형 분석</li>
  <li>반려동물과의 케어 팁 제공</li>
</ul>`;

  const html = buildPage({
    title: "반려동물 성격 유형 테스트 (Pet MBTI) | MyTestType",
    description:
      "우리 강아지·고양이의 성격은 어떤 유형일까요? 반려동물의 행동 패턴을 분석하여 16가지 MBTI 유형으로 알려드립니다.",
    canonical: "https://mytesttype.com/pet-test",
    bodyHtml,
  });

  writeFileSync(join(dir, "index.html"), html, "utf-8");
  console.log("✓  pet-test/index.html");
}

console.log("\n✅ Pre-render 완료! 총", posts.length + 2, "페이지 생성");
