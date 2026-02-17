"use client";

import { useEffect, useState } from "react";

/**
 * A hook that returns true once the component has mounted on the client
 * Useful for avoiding hydration mismatches
 */
export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
