import { X } from "lucide-react";
import { useEffect, useState } from "react";

const CONTAINER_ID = "container-12cdf4ce15fbd319a5a65c7f165496a7-shaman-bottom";
const SCRIPT_SRC =
  "https://pl29040556.profitablecpmratenetwork.com/12cdf4ce15fbd319a5a65c7f165496a7/invoke.js";

export function BottomBannerAd() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    const container = document.getElementById(CONTAINER_ID);
    if (container) container.innerHTML = "";

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.dataset.kShamanBottomAd = "true";
    document.head.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll('script[data-k-shaman-bottom-ad="true"]');
      scripts.forEach((item) => item.remove());
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-2 pointer-events-none">
      <div className="relative w-full max-w-[728px] min-h-[90px] overflow-hidden rounded-t-xl border border-white/10 bg-gray-950/95 shadow-2xl shadow-black/60 pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Close ad"
          className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-sm bg-black/70 text-white/80 transition hover:bg-black hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <div id={CONTAINER_ID} className="flex min-h-[90px] w-full items-center justify-center" />
      </div>
    </div>
  );
}
