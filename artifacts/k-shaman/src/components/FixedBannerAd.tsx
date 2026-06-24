import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const AD_KEY = "d770734433856aff51bac90cb08327c6";
const SCRIPT_SRC = `https://www.highperformanceformat.com/${AD_KEY}/invoke.js`;

export function FixedBannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed || !containerRef.current) return;

    const adWindow = window as typeof window & {
      atOptions?: {
        key: string;
        format: string;
        height: number;
        width: number;
        params: Record<string, never>;
      };
    };

    adWindow.atOptions = {
      key: AD_KEY,
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };

    document.querySelector(`script[src="${SCRIPT_SRC}"]`)?.remove();

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      document.querySelector(`script[src="${SCRIPT_SRC}"]`)?.remove();
      if (containerRef.current) containerRef.current.innerHTML = "";
      delete adWindow.atOptions;
    };
  }, [closed]);

  if (closed) return null;

  return (
    <div
      className="fixed bottom-0 left-1/2 z-[9999] -translate-x-1/2"
      aria-label="Advertisement"
    >
      <div className="relative h-[50px] w-[320px]">
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="광고 닫기"
          title="광고 닫기"
          className="absolute -top-[18px] right-0 flex h-[18px] w-[18px] items-center justify-center rounded-t bg-black/60 text-white hover:bg-black/80"
        >
          <X size={12} />
        </button>
        <div
          ref={containerRef}
          className="h-[50px] w-[320px] overflow-hidden"
        />
      </div>
    </div>
  );
}
