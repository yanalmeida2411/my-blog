import { useResponsiveStore } from "@/store/responsiveStore";
import { useEffect } from "react";

export const useResponsive = () => {
  const { isDesktop, isExpanded, setIsExpanded, setIsDesktop } =
    useResponsiveStore();

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) setIsExpanded(true);
      else setIsExpanded(false);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isDesktop, isExpanded, setIsExpanded, setIsDesktop };
};
