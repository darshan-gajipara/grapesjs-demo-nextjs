"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GrapesEditor from "@/components/GrapesEditor";
import PreviewPage from "./preview/page";

type ViewType = "welcome" | "editor" | "preview";

export default function Home() {
  const [view, setView] = useState<ViewType>("welcome");

  return (
    <main className="flex min-h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-44 bg-background border-r p-6 flex flex-col gap-6">
        <h2 className="text-xl font-semibold">Page Builder</h2>

        <Separator />

        <nav className="flex flex-col gap-3">
          <Button
            variant={view === "editor" ? "default" : "outline"}
            className="justify-start"
            onClick={() => setView("editor")}
          >
            🛠 Editor
          </Button>

          <Button
            variant={view === "preview" ? "default" : "outline"}
            className="justify-start"
            onClick={() => setView("preview")}
          >
            👁 Preview
          </Button>
        </nav>

        <div className="mt-auto text-xs text-muted-foreground">
          Powered by GrapesJS
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8 overflow-auto">
        {view === "welcome" && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Page Builder</h1>
            <p className="text-muted-foreground">
              Build and preview your website visually.
            </p>

            <div className="flex gap-4">
              <Button onClick={() => setView("editor")}>
                Start Editing
              </Button>
              <Button variant="outline" onClick={() => setView("preview")}>
                View Preview
              </Button>
            </div>
          </div>
        )}

        {view === "editor" && <GrapesEditor />}
        {view === "preview" && <PreviewPage />}
      </section>
    </main>
  );
}
