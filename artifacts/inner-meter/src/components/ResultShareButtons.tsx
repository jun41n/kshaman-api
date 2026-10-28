import { useState } from "react";
import { Check, Link2, Share2, X } from "lucide-react";

type Props = { lang: string; title: string; url: string };

const COPY: Record<string, { heading: string; copy: string; copied: string; prompt: string }> = {
  ko: { heading: "SNS로 결과 공유", copy: "링크 복사", copied: "복사됨!", prompt: "내 결과도 나왔어 👀 너도 해보고 비교해봐" },
  en: { heading: "Share your result", copy: "Copy link", copied: "Copied!", prompt: "I got this result 👀 Try it and compare with me" },
  ja: { heading: "結果をSNSで共有", copy: "リンクコピー", copied: "コピー済み", prompt: "私の結果はこれだった 👀 あなたも試して比べてみて" },
  es: { heading: "Comparte tu resultado", copy: "Copiar enlace", copied: "Copiado", prompt: "Mira mi resultado 👀 Hazlo tú también" },
  fr: { heading: "Partager le résultat", copy: "Copier le lien", copied: "Copié", prompt: "Voici mon résultat 👀 Essaie aussi" },
};

export function ResultShareButtons({ lang, title, url }: Props) {
  const [copied, setCopied] = useState(false);
  const [guide, setGuide] = useState<"instagram" | "tiktok" | null>(null);
  const copy = COPY[lang.split("-")[0]] ?? COPY.en;
  const text = `${copy.prompt}\n${title}\n${url}`;
  const open = (shareUrl: string) => window.open(shareUrl, "_blank", "width=640,height=520");
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { /* clipboard may be unavailable */ }
  };
  const buttons = [
    { label: copied ? copy.copied : copy.copy, className: copied ? "bg-emerald-500" : "bg-[#33251f]", icon: copied ? <Check size={17} /> : <Link2 size={17} />, onClick: copyLink },
    { label: "X", className: "bg-black", icon: <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>, onClick: () => open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(copy.prompt)}&url=${encodeURIComponent(url)}`) },
    { label: lang.startsWith("ko") ? "페북" : "Facebook", className: "bg-[#1877F2]", icon: <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>, onClick: () => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`) },
    { label: lang.startsWith("ko") ? "인스타" : "Instagram", className: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]", icon: <svg className="h-5 w-5 fill-none stroke-white" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" /></svg>, onClick: async () => { try { await navigator.clipboard.writeText(text); } catch { /* ignore */ } setGuide(guide === "instagram" ? null : "instagram"); } },
    { label: lang.startsWith("ko") ? "카카오" : "KakaoTalk", className: "bg-[#FEE500] text-[#3C1E1E]", icon: <svg className="h-5 w-5 fill-[#3C1E1E]" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.728 1.614 5.13 4.073 6.605-.18.664-.65 2.415-.744 2.786-.116.46.169.454.356.33.146-.097 2.325-1.577 3.264-2.214.32.047.648.073.982.073C15.523 18.38 22 14.832 22 10.8 22 6.477 17.523 3 12 3z" /></svg>, onClick: () => open(`https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`) },
    { label: lang.startsWith("ko") ? "틱톡" : "TikTok", className: "bg-black", icon: <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 1 0 6.34 6.34V8.83a8.18 8.18 0 0 0 4.78 1.52V6.9a4.85 4.85 0 0 1-1.01-.21z" /></svg>, onClick: async () => { try { await navigator.clipboard.writeText(text); } catch { /* ignore */ } setGuide(guide === "tiktok" ? null : "tiktok"); } },
    { label: lang.startsWith("ko") ? "라인" : "Line", className: "bg-[#00B900]", icon: <span className="text-[10px] font-bold tracking-tight">LINE</span>, onClick: () => open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`) },
    { label: lang.startsWith("ko") ? "왓츠앱" : "WhatsApp", className: "bg-[#25D366]", icon: <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>, onClick: () => open(`https://wa.me/?text=${encodeURIComponent(text)}`) },
  ];

  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-center gap-2 text-sm font-bold"><Share2 className="h-4 w-4 text-primary" />{copy.heading}</div>
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((button) => <button key={button.label} type="button" onClick={button.onClick} className="group flex min-w-0 flex-col items-center gap-1.5 text-[10px] font-medium text-muted-foreground"><span className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm transition-transform group-active:scale-95 ${button.className}`}>{button.icon}</span><span className="max-w-full truncate">{button.label}</span></button>)}
      </div>
      {guide && <div className="mt-4 flex items-start justify-between gap-3 rounded-2xl border border-border bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground"><span>{guide === "instagram" ? "링크가 복사됐습니다. 인스타그램 앱에서 붙여넣어 공유하세요." : "링크가 복사됐습니다. TikTok 앱에서 붙여넣어 공유하세요."}</span><button type="button" onClick={() => setGuide(null)} aria-label="닫기"><X className="h-4 w-4" /></button></div>}
    </section>
  );
}
