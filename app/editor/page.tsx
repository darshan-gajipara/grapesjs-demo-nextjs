"use client";

import dynamic from "next/dynamic";

const GrapesEditor = dynamic(
  () => import("@/components/GrapesEditor"),
  { ssr: false }
);

export default function EditorPage() {
  return <GrapesEditor />;
}
