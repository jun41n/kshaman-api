import { useEffect, useRef } from "react";

const AD_SRC =
  "https://pl29040556.profitablecpmratenetwork.com/12cdf4ce15fbd319a5a65c7f165496a7/invoke.js";

let globalScriptInjected = false;

export function AdsterraBanner({ slot = "a" }: { slot?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerId = `container-12cdf4ce15fbd319a5a65c7f165496a7${slot === "a" ? "" : "-" + slot}`;

  useEffect(() => {
    if (!containerRef.current) return;

    if (!globalScriptInjected) {
      globalScriptInjected = true;
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = AD_SRC;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="flex justify-center w-full my-2 overflow-hidden">
      <div ref={containerRef} id={containerId} />
    </div>
  );
}
