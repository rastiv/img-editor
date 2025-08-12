import { useEffect, useState } from "react";

const breakpoints: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

type Breakpoint = "sm" | "md" | "lg" | "xl";

export function useBellow(breakpoint: Breakpoint): boolean {
  const [isBellow, setIsBellow] = useState(
    () => window.innerWidth < breakpoints[breakpoint]
  );

  useEffect(() => {
    function handleResize() {
      setIsBellow(window.innerWidth < breakpoints[breakpoint]);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isBellow;
}

export function useAbove(breakpoint: Breakpoint): boolean {
  const [isAbove, setIsAbove] = useState(
    () => window.innerWidth >= breakpoints[breakpoint]
  );

  useEffect(() => {
    function handleResize() {
      setIsAbove(window.innerWidth >= breakpoints[breakpoint]);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isAbove;
}

export const useTouchScreenDevice = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobileKeywords = [
      "Android",
      "webOS",
      "iPhone",
      "iPad",
      "iPod",
      "BlackBerry",
      "Windows Phone",
    ];

    const isTouchScreenDevice = mobileKeywords.some((keyword) =>
      userAgent.includes(keyword)
    );
    setIsMobile(isTouchScreenDevice);
  }, []);

  return isMobile;
};
