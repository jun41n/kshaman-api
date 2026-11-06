import { useState } from "react";
import { Check, Link2, Share2, X } from "lucide-react";
import { trackResultShareClick } from "@/lib/analytics";
import { FaComment, FaFacebookF, FaInstagram, FaLine, FaTiktok, FaThreads, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

type Service = "past-life" | "face" | "palm";
type Props = { lang: string; title: string; url: string; summary?: string; service?: Service; variant?: "default" | "paper" };
const API_BASE = "https://api.mytesttype.com/api";

const COPY: Record<string, { heading: string; copy: string; copied: string; prompt: string; image: string; kakao: string; instagramGuide: string; kakaoGuide: string; tiktokGuide: string }> = {
  ko: { heading: "SNS로 결과 공유", copy: "링크 복사", copied: "복사됨!", prompt: "내 결과도 나왔어. 너도 해보고 비교해봐", image: "결과 카드 저장", kakao: "카카오", instagramGuide: "공유 링크가 복사됐습니다. 인스타그램 앱에서 붙여넣어 공유하세요.", kakaoGuide: "공유 링크가 복사됐습니다. 카카오톡 대화방에서 붙여넣어 공유하세요.", tiktokGuide: "공유 링크가 복사됐습니다. TikTok 앱에서 붙여넣어 공유하세요." },
  en: { heading: "Share your result", copy: "Copy link", copied: "Copied!", prompt: "I got this result. Try it and compare with me", image: "Save result card", kakao: "Kakao", instagramGuide: "The share link is copied. Paste it in Instagram.", kakaoGuide: "The share link is copied. Paste it in a KakaoTalk chat.", tiktokGuide: "The share link is copied. Paste it in TikTok." },
  ja: { heading: "結果をSNSで共有", copy: "リンクコピー", copied: "コピー済み", prompt: "私の結果はこれだった。あなたも試して比べてみて", image: "結果カードを保存", kakao: "カカオ", instagramGuide: "共有リンクをコピーしました。Instagramで貼り付けて共有してください。", kakaoGuide: "共有リンクをコピーしました。KakaoTalkのチャットで貼り付けて共有してください。", tiktokGuide: "共有リンクをコピーしました。TikTokで貼り付けて共有してください。" },
  es: { heading: "Comparte tu resultado", copy: "Copiar enlace", copied: "Copiado", prompt: "Mira mi resultado. Hazlo tú también", image: "Guardar tarjeta", kakao: "Kakao", instagramGuide: "Se copió el enlace. Pégalo en Instagram.", kakaoGuide: "Se copió el enlace. Pégalo en un chat de KakaoTalk.", tiktokGuide: "Se copió el enlace. Pégalo en TikTok." },
  "pt-BR": { heading: "Compartilhe seu resultado", copy: "Copiar link", copied: "Copiado", prompt: "Este foi meu resultado. Faça também", image: "Salvar cartão", kakao: "Kakao", instagramGuide: "O link foi copiado. Cole no Instagram.", kakaoGuide: "O link foi copiado. Cole em uma conversa no KakaoTalk.", tiktokGuide: "O link foi copiado. Cole no TikTok." },
  fr: { heading: "Partager le résultat", copy: "Copier le lien", copied: "Copié", prompt: "Voici mon résultat. Essaie aussi", image: "Enregistrer la carte", kakao: "Kakao", instagramGuide: "Le lien est copié. Collez-le dans Instagram.", kakaoGuide: "Le lien est copié. Collez-le dans une discussion KakaoTalk.", tiktokGuide: "Le lien est copié. Collez-le dans TikTok." },
};

function wrap(context: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number) {
  const words = text.split(/\s+/); const lines: string[] = []; let line = "";
  for (const word of words) { const candidate = line ? `${line} ${word}` : word; if (context.measureText(candidate).width > maxWidth && line) { lines.push(line); line = word; if (lines.length === maxLines) break; } else line = candidate; }
  if (line && lines.length < maxLines) lines.push(line); return lines;
}

function createCard(title: string, summary: string, service: Service) {
  const canvas = document.createElement("canvas"); canvas.width = 1200; canvas.height = 630;
  const context = canvas.getContext("2d"); if (!context) throw new Error("card canvas unavailable");
  const palette = service === "past-life" ? ["#2f1914", "#8d412d"] : service === "palm" ? ["#6a381f", "#c98c42"] : ["#4b291f", "#c57438"];
  const gradient = context.createLinearGradient(0, 0, 1200, 630); gradient.addColorStop(0, palette[0]); gradient.addColorStop(1, palette[1]); context.fillStyle = gradient; context.fillRect(0, 0, 1200, 630);
  context.strokeStyle = "rgba(255,235,187,.6)"; context.lineWidth = 3; context.strokeRect(36, 36, 1128, 558);
  context.fillStyle = "#f8e8c1"; context.font = "700 28px serif"; context.fillText("MYTESTTYPE · AI CULTURAL ENTERTAINMENT", 78, 105);
  context.font = "700 62px serif"; wrap(context, title, 980, 2).forEach((line, index) => context.fillText(line, 78, 230 + index * 76));
  context.fillStyle = "rgba(255,239,205,.88)"; context.font = "400 31px sans-serif"; wrap(context, summary, 980, 3).forEach((line, index) => context.fillText(line, 78, 445 + index * 42));
  context.fillStyle = "rgba(255,239,205,.65)"; context.font = "400 24px sans-serif"; context.fillText("mytesttype.com", 78, 560);
  return canvas.toDataURL("image/png");
}

export function ResultShareButtons({ lang, title, url, summary = "", service = "face", variant = "default" }: Props) {
  const [copied, setCopied] = useState(false); const [guide, setGuide] = useState<"instagram" | "kakao" | "tiktok" | null>(null); const [sharing, setSharing] = useState(false);
  const copy = COPY[lang.split("-")[0]] ?? COPY.en;
  const saveShare = async () => { setSharing(true); try { const cardImageDataUrl = createCard(title, summary || title, service); const response = await fetch(`${API_BASE}/share-results`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ service, language: lang, title, summary: summary || title, cardImageDataUrl }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); return { cardImageDataUrl, shareUrl: `${API_BASE}/share/${data.id}` }; } finally { setSharing(false); } };
  const share = async (target: "copy" | "x" | "facebook" | "instagram" | "kakao" | "tiktok" | "line" | "threads" | "whatsapp") => {
    // Social networks block popups opened after an asynchronous network request.
    const popup = target === "x" || target === "facebook" ? window.open("about:blank", "_blank", "width=640,height=520") : null;
    try { const { shareUrl } = await saveShare(); const text = `${copy.prompt}\n${title}\n${shareUrl}`; const shareType = target === "copy" ? "copy_link" : target; trackResultShareClick({ test_slug: service, result_key: title, share_type: shareType }); if (target === "copy") { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2200); return; } if (target === "x") popup?.location.assign(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${copy.prompt}\n${title}`)}&url=${encodeURIComponent(shareUrl)}`); if (target === "facebook") popup?.location.assign(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`); if (target === "line") window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`, "_blank", "width=640,height=520"); if (target === "threads") window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(`${copy.prompt} ${title} ${shareUrl}`)}`, "_blank", "width=640,height=520"); if (target === "whatsapp") window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "width=640,height=520"); if (target === "instagram" || target === "kakao" || target === "tiktok") { await navigator.clipboard.writeText(text); setGuide(target); } } catch { popup?.close(); }
  };
  const buttons = [
    { label: copied ? copy.copied : copy.copy, theme: copied ? "bg-emerald-500" : "bg-[#33251f]", icon: copied ? <Check size={17} /> : <Link2 size={17} />, click: () => share("copy") },
    { label: "X", theme: "bg-black", icon: <FaXTwitter size={17} />, click: () => share("x") },
    { label: "Facebook", theme: "bg-[#1877F2]", icon: <FaFacebookF size={17} />, click: () => share("facebook") },
    { label: "Instagram", theme: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]", icon: <FaInstagram size={18} />, click: () => share("instagram") },
    { label: copy.kakao, theme: "bg-[#FEE500] text-[#3C1E1E]", icon: <FaComment size={19} />, click: () => share("kakao") },
    { label: "TikTok", theme: "bg-black", icon: <FaTiktok size={17} />, click: () => share("tiktok") },
    { label: "LINE", theme: "bg-[#00B900]", icon: <FaLine size={18} />, click: () => share("line") },
    { label: "Threads", theme: "bg-[#101010]", icon: <FaThreads size={18} />, click: () => share("threads") },
    { label: "WhatsApp", theme: "bg-[#25D366]", icon: <FaWhatsapp size={19} />, click: () => share("whatsapp") },
  ];
  return <section className={variant === "paper" ? "border border-[#8e5a38]/35 bg-[#f6dda2]/85 p-5 shadow-[4px_4px_0_rgba(104,59,32,.14)]" : "border border-border bg-card p-5 shadow-sm"}>
    <div className={`mb-4 flex items-center justify-center gap-2 text-sm font-bold ${variant === "paper" ? "text-[#4a2517]" : ""}`}><Share2 className="h-4 w-4" />{sharing ? "..." : copy.heading}</div>
    <div className="grid grid-cols-3 gap-3">{buttons.map((button) => <button key={button.label} disabled={sharing} type="button" onClick={button.click} className="group flex min-w-0 flex-col items-center gap-1.5 text-[10px] font-medium text-muted-foreground disabled:opacity-50"><span className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm ${button.theme}`}>{button.icon}</span><span className="max-w-full truncate">{button.label}</span></button>)}</div>
    {guide && <div className="mt-4 flex items-start justify-between gap-3 border border-[#8e5a38]/30 bg-[#f9e5b5] p-3 text-xs leading-relaxed text-[#604133]"><span>{guide === "instagram" ? copy.instagramGuide : guide === "kakao" ? copy.kakaoGuide : copy.tiktokGuide}</span><button type="button" onClick={() => setGuide(null)} aria-label="close"><X className="h-4 w-4" /></button></div>}
  </section>;
}
