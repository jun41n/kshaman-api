import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { trackResultShareClick } from "@/lib/analytics";

interface ShareButtonsProps {
  title: string;
  text: string;
  url?: string;
  testSlug?: string;
  resultKey?: string;
}

function splitAtEmoji(text: string): [string, string] | [string] {
  const match = text.match(/^(.*\p{Emoji_Presentation})\s+(.+)$/u);
  if (match) return [match[1], match[2]];
  return [text];
}

interface SnsButton {
  label: string;
  shareType: string;
  bg: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function ShareButtons({ title, text, url, testSlug, resultKey }: ShareButtonsProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;

  const track = (shareType: string) => {
    if (testSlug && resultKey) {
      trackResultShareClick({ test_slug: testSlug, result_key: resultKey, share_type: shareType });
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({ title: t('share.copySuccess'), description: t('share.copySuccessDesc') });
      setTimeout(() => setCopied(false), 2500);
      track('copy_link');
    } catch {
      toast({ variant: "destructive", title: t('share.copyError'), description: t('share.copyErrorDesc') });
    }
  };

  const copyAndToast = (appName: string, shareType: string) => {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    toast({ title: t('share.shareOnApp', { app: appName }), description: t('share.shareOnAppDesc') });
    track(shareType);
  };

  const open = (u: string, shareType: string) => {
    track(shareType);
    window.open(u, "_blank", "width=640,height=480");
  };

  const buttons: SnsButton[] = [
    {
      label: copied ? t('common.copied') : t('common.copyLink'),
      shareType: 'copy_link',
      bg: copied ? "bg-emerald-500" : "bg-white/15 border border-white/20 hover:bg-white/25",
      icon: copied
        ? <Check className="w-5 h-5 text-white" />
        : <LinkIcon className="w-5 h-5 text-white" />,
      onClick: copyLink,
    },
    {
      label: "X",
      shareType: 'x',
      bg: "bg-black/90 hover:opacity-80",
      icon: (
        <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      onClick: () => open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, 'x'),
    },
    {
      label: t('share.facebook'),
      shareType: 'facebook',
      bg: "bg-[#1877F2] hover:opacity-80",
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      onClick: () => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, 'facebook'),
    },
    {
      label: t('share.instagram'),
      shareType: 'instagram',
      bg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-80",
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
      onClick: () => copyAndToast(t('share.instagramFull'), 'instagram'),
    },
    {
      label: t('share.kakao'),
      shareType: 'kakaotalk',
      bg: "bg-[#FEE500] hover:opacity-80",
      icon: (
        <svg className="w-5 h-5 fill-[#3C1E1E]" viewBox="0 0 24 24">
          <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.728 1.614 5.13 4.073 6.605-.18.664-.65 2.415-.744 2.786-.116.46.169.454.356.33.146-.097 2.325-1.577 3.264-2.214.32.047.648.073.982.073.015 0 .03 0 .046-.001C15.523 18.38 22 14.832 22 10.8 22 6.477 17.523 3 12 3z" />
        </svg>
      ),
      onClick: () => copyAndToast(t('share.kakaoFull'), 'kakaotalk'),
    },
    {
      label: t('share.tiktok'),
      shareType: 'tiktok',
      bg: "bg-black/90 hover:opacity-80",
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.83a8.18 8.18 0 0 0 4.78 1.52V6.9a4.85 4.85 0 0 1-1.01-.21z" />
        </svg>
      ),
      onClick: () => copyAndToast(t('share.tiktok'), 'tiktok'),
    },
    {
      label: t('share.line'),
      shareType: 'line',
      bg: "bg-[#00B900] hover:opacity-80",
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.066-.022.135-.033.2-.033.211 0 .391.09.51.25l2.444 3.317V8.108c0-.345.282-.63.63-.63.345 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      ),
      onClick: () => open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`, 'line'),
    },
    {
      label: t('share.threads'),
      shareType: 'threads',
      bg: "bg-[#101010] hover:opacity-80",
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 192 192">
          <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.195 47.292 9.643 32.788 28.08 19.882 44.485 13.224 67.315 13.001 96.03l-.001.883.001.883c.223 28.715 6.881 51.545 19.787 67.95 14.504 18.437 36.094 27.885 64.199 28.08h.113c24.811-.17 42.352-6.676 57.005-21.319 19.13-19.119 18.524-42.763 12.014-57.336-4.657-10.862-13.51-19.784-24.582-25.183z" />
        </svg>
      ),
      onClick: () => open(`https://www.threads.net/intent/post?text=${encodeURIComponent(text + " " + shareUrl)}`, 'threads'),
    },
    {
      label: t('share.whatsapp'),
      shareType: 'whatsapp',
      bg: "bg-[#25D366] hover:opacity-80",
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      ),
      onClick: () => open(`https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`, 'whatsapp'),
    },
  ];

  const textParts = splitAtEmoji(text);

  const renderBtn = (btn: SnsButton) => (
    <button
      key={btn.shareType}
      onClick={btn.onClick}
      className="flex flex-col items-center gap-1.5 group"
      title={btn.label}
    >
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 ${btn.bg}`}
        style={{ width: '3.25rem', height: '3.25rem' }}
      >
        {btn.icon}
      </div>
      <span className="text-[10px] text-white/60 group-hover:text-white/90 transition-colors whitespace-nowrap font-medium">
        {btn.label}
      </span>
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-3.5 justify-center">
        {buttons.slice(0, 4).map(renderBtn)}
      </div>
      <div className="flex gap-3.5 justify-center">
        {buttons.slice(4).map(renderBtn)}
      </div>

      <div className="bg-white/10 border border-white/15 rounded-2xl px-5 py-3 text-sm text-white/75 max-w-[17rem] text-center leading-relaxed backdrop-blur-sm">
        <span>{textParts[0]}</span>
        {textParts[1] && <><br /><span>{textParts[1]}</span></>}
      </div>

      {typeof navigator.share !== 'function' && (
        <p className="text-[10px] text-white/40 leading-relaxed text-center max-w-[18rem]">
          {t('share.pasteHint')}
        </p>
      )}
    </div>
  );
}
