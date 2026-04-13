type LangKey = 'ko' | 'en' | 'ja' | 'es' | 'pt' | 'id';

const TEMPLATES: Record<LangKey, (title: string, url: string) => string> = {
  ko: (t, u) => `나 결과 이거 나왔어 👀\n"${t}"\n너도 해보고 나랑 비교해봐\n${u}`,
  en: (t, u) => `I got this result 👀\n"${t}"\nTry it and compare with me\n${u}`,
  ja: (t, u) => `私の結果はこれだった 👀\n「${t}」\nあなたもやって比べてみて\n${u}`,
  es: (t, u) => `Mira mi resultado 👀\n"${t}"\nHazlo tú también y compáralo conmigo\n${u}`,
  pt: (t, u) => `Olha meu resultado 👀\n"${t}"\nFaz o teste também e compara comigo\n${u}`,
  id: (t, u) => `Ini hasilku 👀\n"${t}"\nCoba juga dan bandingkan denganku\n${u}`,
};

export function buildShareMessage(lang: string, resultTitle: string, url: string): string {
  const normalized = lang.startsWith('pt') ? 'pt' : lang.split('-')[0];
  const key = normalized as LangKey;
  const tpl = TEMPLATES[key] ?? TEMPLATES.en;
  return tpl(resultTitle, url);
}

export async function generateResultCardImage(el: HTMLDivElement): Promise<Blob | null> {
  const { toBlob } = await import('html-to-image');
  const opts = {
    pixelRatio: 2,
    cacheBust: true,
    skipFonts: true,
    style: { borderRadius: '28px' },
  };
  await toBlob(el, opts).catch(() => null);
  const blobPromise = toBlob(el, opts);
  const timeout = new Promise<null>((_, reject) =>
    setTimeout(() => reject(new Error('capture-timeout')), 12_000),
  );
  return Promise.race([blobPromise, timeout]);
}

function isIos(): boolean {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export async function saveResultCardImage(
  el: HTMLDivElement,
  filename: string,
  onIosFallback?: () => void,
): Promise<void> {
  const blob = await generateResultCardImage(el);
  if (!blob) throw new Error('Image capture failed');

  const file = new File([blob], `${filename}.png`, { type: 'image/png' });

  if (isIos()) {
    const canShareFile =
      typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });

    if (canShareFile) {
      await navigator.share({ files: [file] });
      return;
    }

    onIosFallback?.();

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const overlay = document.createElement('div');
    overlay.style.cssText =
      'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.85);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;';

    const hint = document.createElement('p');
    hint.textContent = '이미지를 길게 눌러 저장하세요';
    hint.style.cssText = 'color:#fff;font-size:15px;font-weight:600;text-align:center;margin:0;';

    const img = document.createElement('img');
    img.src = dataUrl;
    img.style.cssText =
      'max-width:100%;max-height:65vh;border-radius:16px;object-fit:contain;';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '닫기';
    closeBtn.style.cssText =
      'background:rgba(255,255,255,0.15);color:#fff;border:none;border-radius:12px;padding:10px 32px;font-size:15px;font-weight:600;margin-top:4px;cursor:pointer;';
    closeBtn.onclick = () => document.body.removeChild(overlay);
    overlay.onclick = (e) => { if (e.target === overlay) document.body.removeChild(overlay); };

    overlay.appendChild(hint);
    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    return;
  }

  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objectUrl;
  a.download = `${filename}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

export async function shareResultComparison(
  el: HTMLDivElement,
  resultTitle: string,
  testEntryUrl: string,
  lang: string,
  filename: string,
): Promise<void> {
  const shareText = buildShareMessage(lang, resultTitle, testEntryUrl);

  try {
    const blob = await generateResultCardImage(el);
    if (blob) {
      const file = new File([blob], `${filename}.png`, { type: 'image/png' });
      const canShareFile =
        typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });

      if (canShareFile) {
        await navigator.share({ files: [file], text: shareText });
        return;
      }
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw err;
  }

  if (typeof navigator.share === 'function') {
    await navigator.share({ title: resultTitle, text: shareText, url: testEntryUrl });
    return;
  }

  await navigator.clipboard.writeText(`${shareText}`);
}
