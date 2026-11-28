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
function buildPage({ title, description, canonical, bodyHtml, ogImage, jsonLd }) {
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

  // The source template contains the root service schema. Replace it for every
  // generated route so crawlers do not see the past-life application on face
  // and palm URLs.
  html = html.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
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

/* ── / (AI past-life character test) ───────── */
{
  const html = buildPage({
    title: "AI 전생 테스트 | 조선시대 전생 직업 캐릭터 | MyTestType",
    description:
      "얼굴 사진 한 장으로 조선시대에 어떤 사람이었을지 재미있게 살펴보는 AI 전생 테스트입니다. 전생 직업 캐릭터와 얼굴 기반 전생 이미지를 문화·오락 목적으로 제공합니다.",
    canonical: "https://mytesttype.com/",
    ogImage: "https://mytesttype.com/past-life.png",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "MyTestType AI 전생 테스트",
      url: "https://mytesttype.com/",
      applicationCategory: "EntertainmentApplication",
      operatingSystem: "Any",
      description: "얼굴 사진을 바탕으로 조선시대 전생 직업 캐릭터와 창작 이미지를 살펴보는 문화·오락 목적의 AI 전생 테스트",
      inLanguage: ["ko", "en", "ja", "es", "pt", "fr"],
    },
    bodyHtml: `
<h1 style="font-size:1.7em;font-weight:900;margin:0 0 0.5em;color:#111">AI 전생 테스트</h1>
<p style="color:#555;margin-bottom:1.2em;line-height:1.7">얼굴 사진 한 장으로 조선시대에 나는 어떤 사람이었을지 재미있게 살펴보세요. 왕, 무사, 농사꾼, 대장장이 등 다양한 전생 직업 캐릭터와 얼굴 기반 창작 이미지를 확인할 수 있습니다.</p>
<p style="color:#555;line-height:1.7">결과는 역사적 사실이나 성격·운명을 판정하는 내용이 아니라 전통 문화를 바탕으로 한 오락용 참고 콘텐츠입니다.</p>`,
  });
  writeFileSync(join(distDir, "index.html"), html, "utf-8");
  console.log("✓  root/index.html");
}

/* ── /guide/* (search intent hubs) ─────────── */
const guidePages = [
  {
    slug: "past-life",
    title: "AI 전생 테스트와 조선시대 전생 직업 | MyTestType",
    description: "얼굴 사진으로 조선시대에 어떤 사람이었을지 살펴보는 AI 전생 테스트의 방식과 결과를 설명합니다.",
    answer: "AI 전생 테스트는 얼굴 사진에서 받은 인상과 전통 문화의 상징을 바탕으로 조선시대 전생 직업 캐릭터를 만들어 보는 오락용 콘텐츠입니다.",
    sections: ["전생 테스트는 정면 얼굴 사진을 바탕으로 여러 조선시대 직업 캐릭터 중 하나를 선택하고 짧은 이야기와 창작 이미지를 구성합니다.", "임금, 무사, 선비, 대장장이, 목수, 농사꾼 등 다양한 역할이 결과로 나올 수 있으며 보상 비교는 역사적 급여가 아닌 재미를 위한 비유입니다.", "결과는 실제 신분이나 성격을 판정하지 않으며 친구와 비교하고 현재의 나를 돌아보는 오락용 이야기로 이용합니다."],
    faqs: [["얼굴만으로 진짜 전생을 알 수 있나요?", "아니요. 사진과 전통 문화 상징을 바탕으로 만든 오락용 캐릭터 결과이며 실제 전생을 증명하거나 판정하지 않습니다."], ["전생 캐릭터 이미지는 무엇을 바탕으로 만드나요?", "사용자가 올린 얼굴 사진을 시각적 참고로 사용해 선택된 직업과 시대 분위기를 표현하는 창작 이미지로 만듭니다."]],
    cta: "AI 전생 테스트 시작",
    path: "/",
  },
  {
    slug: "face",
    title: "AI 관상 테스트와 얼굴 인상 읽기 | MyTestType",
    description: "사진 속 표정과 얼굴 특징을 전통 관상 문화의 언어로 살펴보는 AI 관상 테스트 안내입니다.",
    answer: "AI 관상 테스트는 사진에서 보이는 표정과 얼굴 특징을 관찰하고 전통 관상에서 사용하던 상징을 문화·오락용으로 풀어보는 서비스입니다.",
    sections: ["이마, 눈, 코, 입, 얼굴의 균형처럼 사진에서 관찰 가능한 요소를 나누어 살펴봅니다.", "관찰한 모습과 전통적 상징은 구분해서 설명하며 과학적 성격 진단이나 건강·재산 판단으로 사용하지 않습니다.", "정면 얼굴이 보이고 밝은 곳에서 찍은 사진이 적합하며 선글라스나 마스크는 피하는 것이 좋습니다."],
    faqs: [["사진으로 관상을 볼 수 있나요?", "사진에서 보이는 표정과 얼굴 특징을 관찰하는 것은 가능하지만, 그것으로 실제 성격이나 운명을 확정할 수는 없습니다."], ["관상 결과는 어떻게 활용하면 좋나요?", "첫인상과 자기표현을 돌아보는 참고 자료로 보고, 중요한 의사결정의 근거로 사용하지 않는 것이 좋습니다."]],
    cta: "AI 관상 테스트 시작",
    path: "/gwansang/",
  },
  {
    slug: "palm",
    title: "AI 손금 테스트와 생명선·두뇌선·감정선 안내 | MyTestType",
    description: "손바닥 사진으로 주요 손금과 전통 수상학 상징을 살펴보는 AI 손금 테스트 안내입니다.",
    answer: "AI 손금 테스트는 손바닥 사진에서 보이는 선과 형태를 관찰하고 생명선·두뇌선·감정선 등을 전통 수상학의 상징으로 설명하는 오락용 서비스입니다.",
    sections: ["생명선, 두뇌선, 감정선, 운명선, 재물선 등이 자주 언급되며 사진에 보이는 선의 형태를 조건부로 설명합니다.", "밝은 조명 아래 손바닥 전체를 정면으로 찍고 손가락과 손목이 잘리지 않게 촬영하면 좋습니다.", "손금 결과는 건강·수명·재산·미래를 예측하는 진단이 아니라 문화·오락용 해설입니다."],
    faqs: [["손바닥 사진만으로 손금을 볼 수 있나요?", "사진에서 선과 형태를 관찰할 수는 있지만, 결과는 전통 수상학을 바탕으로 한 오락용 참고이며 미래를 확정하지 않습니다."], ["손금 사진은 어떻게 찍어야 하나요?", "밝은 조명 아래 손바닥 전체를 정면으로 찍고, 손가락과 손목이 잘리지 않게 촬영하세요."]],
    cta: "AI 손금 테스트 시작",
    path: "/palm-reading/",
  },
  {
    slug: "saju",
    title: "AI 사주팔자와 생년월일 사주풀이 안내 | MyTestType",
    description: "생년월일과 출생 정보를 바탕으로 전통 사주팔자를 대화형으로 살펴보는 AI 점사 안내입니다.",
    answer: "AI 사주팔자는 입력한 출생 정보를 바탕으로 전통 명리학의 달력 요소와 상징을 대화형으로 설명하는 문화·오락용 서비스입니다.",
    sections: ["사주팔자는 출생 연·월·일·시를 네 기둥으로 보고 천간과 지지 같은 전통 달력 요소를 해석하는 방식입니다.", "입력한 출생 정보를 바탕으로 전통 상징, 관계·재물·일에 대한 참고 주제와 일상 질문을 제공합니다.", "사주 결과는 문화·오락용 참고이며 건강, 법률, 투자, 의료, 중요한 인생 결정을 대신하지 않습니다."],
    faqs: [["생년월일만으로 사주를 볼 수 있나요?", "서비스가 요구하는 출생 정보를 입력하면 전통 달력 요소를 계산해 오락용 해설을 제공합니다. 출생 시각을 모르면 일부 요소가 제한될 수 있습니다."], ["AI 사주와 전통 명리학은 같은가요?", "같지 않습니다. AI 사주는 전통 명리학의 용어와 상징을 참고해 대화형으로 설명하는 디지털 콘텐츠입니다."]],
    cta: "AI 사주팔자 시작",
    path: "/k-shaman/",
  },
];

for (const guide of guidePages) {
  const dir = join(distDir, "guide", guide.slug);
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
      mainEntity: guide.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  };
  const html = buildPage({
    title: guide.title,
    description: guide.description,
    canonical: `https://mytesttype.com/guide/${guide.slug}/`,
    ogImage: "https://mytesttype.com/opengraph.jpg",
    jsonLd: [
      { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, url: `https://mytesttype.com/guide/${guide.slug}/`, author: { "@type": "Organization", name: "MyTestType" } },
      faq,
    ],
    bodyHtml: `<h1 style="font-size:1.7em;font-weight:900;margin:0 0 .5em;color:#111">${guide.title.replace(" | MyTestType", "")}</h1><p style="color:#555;line-height:1.7">${guide.answer}</p><h2 style="font-size:1.25em;margin:1.3em 0 .4em;color:#111">이용 전 알아둘 점</h2>${guide.sections.map((section) => `<p style="color:#555;line-height:1.7">${section}</p>`).join("")}<h2 style="font-size:1.25em;margin:1.3em 0 .4em;color:#111">자주 묻는 질문</h2>${guide.faqs.map(([question, answer]) => `<h3 style="font-size:1em;margin:1em 0 .3em;color:#111">${question}</h3><p style="color:#555;line-height:1.7">${answer}</p>`).join("")}<p style="margin-top:1.4em"><a href="${guide.path}">${guide.cta}</a></p>`,
  });
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf-8");
  console.log(`✓  guide/${guide.slug}/index.html`);
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
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "MyTestType AI 손금 분석",
      url: "https://mytesttype.com/palm-reading/",
      applicationCategory: "EntertainmentApplication",
      operatingSystem: "Any",
      description: "손바닥 사진의 선과 형태를 전통 수상학 상징으로 살펴보는 문화·오락 목적의 AI 손금 서비스",
      inLanguage: ["ko", "en", "ja", "es", "pt", "fr"],
    },
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
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "MyTestType AI 관상 분석",
      url: "https://mytesttype.com/gwansang/",
      applicationCategory: "EntertainmentApplication",
      operatingSystem: "Any",
      description: "사진 속 표정과 인상을 전통 관상 문화의 언어로 살펴보는 문화·오락 목적의 AI 관상 서비스",
      inLanguage: ["ko", "en", "ja", "es", "pt", "fr"],
    },
    bodyHtml: `
<h1 style="font-size:1.7em;font-weight:900;margin:0 0 0.5em;color:#111">AI 관상 분석</h1>
<p style="color:#555;margin-bottom:1.2em;line-height:1.7">사진 속 표정과 인상을 전통 관상 문화의 언어로 살펴보고, 나를 바라보는 새로운 단서를 건네는 문화·오락 목적의 서비스입니다.</p>`,
  });
  writeFileSync(join(dir, "index.html"), html, "utf-8");
  console.log("✓  gwansang/index.html");
}

/* ── /contact ───────────────────────────────── */
{
  const dir = join(distDir, "contact");
  mkdirSync(dir, { recursive: true });
  const html = buildPage({
    title: "문의하기 | MyTestType",
    description: "MyTestType 서비스 이용에 관한 문의와 제안을 이메일로 보내주세요.",
    canonical: "https://mytesttype.com/contact/",
    ogImage: "https://mytesttype.com/opengraph.jpg",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "MyTestType 문의하기",
      url: "https://mytesttype.com/contact/",
      description: "MyTestType 서비스 이용에 관한 문의와 제안을 이메일로 보내는 페이지",
      inLanguage: ["ko", "en", "ja", "es", "pt", "fr"],
    },
    bodyHtml: `
<h1 style="font-size:1.7em;font-weight:900;margin:0 0 0.5em;color:#111">문의하기</h1>
<p style="color:#555;margin-bottom:1.2em;line-height:1.7">MyTestType 서비스 이용에 관한 문의와 제안을 이메일로 보내주세요.</p>
<p style="color:#555;line-height:1.7"><a href="mailto:proofcom26@gmail.com">proofcom26@gmail.com</a></p>`,
  });
  writeFileSync(join(dir, "index.html"), html, "utf-8");
  console.log("✓  contact/index.html");
}

console.log("\n✅ Pre-render 완료! 운영 서비스 및 공통 페이지 생성");

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
