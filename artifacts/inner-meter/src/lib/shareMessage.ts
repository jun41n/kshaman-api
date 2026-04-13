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

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function downloadViaAnchor(href: string, filename: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function saveResultCardImage(
  el: HTMLDivElement,
  filename: string,
): Promise<void> {
  const blob = await generateResultCardImage(el);
  if (!blob) throw new Error('Image capture failed');

  const file = new File([blob], `${filename}.png`, { type: 'image/png' });

  if (isIos()) {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ files: [file] });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
      }
    }
    const dataUrl = await blobToDataUrl(blob);
    downloadViaAnchor(dataUrl, `${filename}.png`);
    return;
  }

  const objectUrl = URL.createObjectURL(blob);
  downloadViaAnchor(objectUrl, `${filename}.png`);
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
