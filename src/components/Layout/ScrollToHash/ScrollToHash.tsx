import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHash } from "../../../utils/scrollToSection";

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash || pathname === "/career") return;

    const timer = window.setTimeout(() => {
      scrollToHash(hash, "smooth");
    }, 480);

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

export default ScrollToHash;
