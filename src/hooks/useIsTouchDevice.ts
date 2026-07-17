"use client";

import { useEffect, useState } from "react";
import { POINTER_QUERY } from "@/lib/animations/motion-config";

export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(POINTER_QUERY);

    const update = () => {
      setIsTouchDevice(!query.matches);
    };

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return isTouchDevice;
}
