"use client";

import { useState, useEffect } from "react";

export function useStickyBarVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      const pastHero = window.scrollY > window.innerHeight;
      const contactEl = document.getElementById("contact");
      const contactVisible = contactEl && contactEl.getBoundingClientRect().top < window.innerHeight;
      setVisible(pastHero && !contactVisible);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return visible;
}
