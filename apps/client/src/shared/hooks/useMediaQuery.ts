"use client";

import { useEffect, useState } from "react";

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => setMatches(media.matches);

    listener();
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export function useBreakpoint() {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile}px)`);
  const isTablet = useMediaQuery(`(max-width: ${BREAKPOINTS.tablet}px)`);
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.desktop}px)`);

  return { isMobile, isTablet, isDesktop };
}
