"use client";

import { useEffect, useState } from "react";

export default function PreviewPage() {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("grapesjs-site");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setHtml(saved);
  }, []);

  if (!html) return <p>No website found</p>;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
