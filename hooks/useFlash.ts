"use client";

import { useState, useCallback } from "react";

export function useFlash(duration = 400) {
  const [isFlashing, setIsFlashing] = useState(false);

  const triggerFlash = useCallback(() => {
    setIsFlashing(false);
    requestAnimationFrame(() => {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), duration);
    });
  }, [duration]);

  return { isFlashing, triggerFlash };
}
