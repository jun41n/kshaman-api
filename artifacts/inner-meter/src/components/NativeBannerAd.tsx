import { useEffect } from "react";

const CONTAINER_ID = "container-12cdf4ce15fbd319a5a65c7f165496a7";
const SCRIPT_SRC =
  "https://pl29040556.profitablecpmratenetwork.com/12cdf4ce15fbd319a5a65c7f165496a7/invoke.js";

export function NativeBannerAd() {
  useEffect(() => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) existing.remove();

    const container = document.getElementById(CONTAINER_ID);
    if (container) container.innerHTML = "";

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.head.appendChild(script);

    return () => {
      const s = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
      if (s) s.remove();
    };
  }, []);

  return (
    <div
      id={CONTAINER_ID}
      style={{ width: "100%", minHeight: "100px" }}
    />
  );
}
