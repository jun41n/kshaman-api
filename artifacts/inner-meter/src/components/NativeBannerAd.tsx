import { useEffect } from "react";

const CONTAINER_ID = "container-12cdf4ce15fbd319a5a65c7f165496a7";
const SCRIPT_SRC =
  "https://pl29040556.profitablecpmratenetwork.com/12cdf4ce15fbd319a5a65c7f165496a7/invoke.js";

export function NativeBannerAd() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.head.appendChild(script);
  }, []);

  return <div id={CONTAINER_ID} style={{ width: "1px", height: "1px" }} />;
}
