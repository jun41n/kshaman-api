import { useEffect, useState } from "react";

const CONTAINER_ID = "container-12cdf4ce15fbd319a5a65c7f165496a7";
const SCRIPT_SRC =
  "https://pl29040556.profitablecpmratenetwork.com/12cdf4ce15fbd319a5a65c7f165496a7/invoke.js";

export function BottomBannerAd() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) existing.remove();

    const container = document.getElementById(CONTAINER_ID);
    if (container) container.innerHTML = "";

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.head.appendChild(script);

    const observer = new MutationObserver(() => {
      const closeButton = document.querySelector<HTMLElement>(
        `#${CONTAINER_ID} [class*="close"], #${CONTAINER_ID} [id*="close"]`,
      );
      if (!closeButton) return;

      closeButton.addEventListener("click", () => setIsVisible(false), {
        once: true,
      });
    });

    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      const s = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
      if (s) s.remove();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return <div id={CONTAINER_ID} />;
}
