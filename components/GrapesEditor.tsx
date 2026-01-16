/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

import presetWebpage from "grapesjs-preset-webpage";
import forms from "grapesjs-plugin-forms";

import { Button } from "@/components/ui/button";
import { PreviewDialog } from "@/components/PreviewDialog";
import { useState } from "react";


export default function GrapesEditor() {
  const editorRef = useRef<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);


  useEffect(() => {
    if (editorRef.current) return;

    const editor = grapesjs.init({
      container: "#gjs",
      height: "auto",
      width: "auto",
      fromElement: false,
      storageManager: false,

      // ✅ REQUIRED FOR RESPONSIVENESS
      // cssComposer: {
      //   avoidInlineStyle: true,
      // },

      canvas: {
        styles: [
          "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css",
        ],
      },

      // 🔌 Plugins
      plugins: [presetWebpage, forms],
      pluginsOpts: {
        "gjs-preset-webpage": {
          blocksBasicOpts: {
            flexGrid: true,
          },
        },
      },

      // 🧱 Block Manager
      blockManager: {
        appendTo: "#blocks",
      },

      // 🎨 Style Manager
      styleManager: {
        appendTo: "#styles",
        sectors: [
          {
            name: "General",
            open: true,
            buildProps: ["display", "position", "top", "right", "left", "bottom"],
          },
          {
            name: "Flex",
            open: false,
            buildProps: [
              "flex-direction",
              "justify-content",
              "align-items",
              "flex-wrap",
            ],
          },
          {
            name: "Dimension",
            open: false,
            buildProps: ["width", "max-width", "height", "padding", "margin"],
          },
          {
            name: "Typography",
            open: false,
            buildProps: [
              "font-family",
              "font-size",
              "font-weight",
              "color",
              "line-height",
              "text-align",
            ],
          },
          {
            name: "Decorations",
            open: false,
            buildProps: [
              "background-color",
              "border-radius",
              "border",
              "box-shadow",
              "background",
              "color",
            ],
          },
        ],
      },

      traitManager: { appendTo: "#traits" },
      layerManager: { appendTo: "#layers" },

      // 🧭 Panels
      panels: {
        defaults: [
          {
            id: "devices",
            buttons: [
              {
                id: "desktop",
                label: "🖥",
                command: "set-device-desktop",
                active: true,
              },
              {
                id: "tablet",
                label: "📱",
                command: "set-device-tablet",
              },
              {
                id: "mobile",
                label: "📲",
                command: "set-device-mobile",
              },
            ],
          },
        ],
      },

      deviceManager: {
        devices: [
          { name: "Desktop", width: "" },
          { name: "Tablet", width: "555px" },
          { name: "Mobile", width: "375px" },
        ],
      },
    });

    editor.on("load", () => {
      const saved = localStorage.getItem("grapesjs-site");
      if (saved) { editor.setComponents(saved); }
      else {
        editor.setComponents(`
    <div>
      <!-- NAVBAR -->
      <nav style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:20px;
        background:#111;
        color:#fff">
        <strong>
          <a href="#home" style="color:#fff;text-decoration:none">MySite</a>
        </strong>
        <div style="display:flex;gap:16px">
         <a href="#home" style="color:#fff">Home</a>
         <a href="#services" style="color:#fff">Services</a>
         <a href="#about" style="color:#fff">About</a>
         <a href="#contact" style="color:#fff">Contact</a>
        </div>
      </nav>

      <!-- HERO -->
      <section style="
        padding:100px 20px;
        text-align:center;
        background:linear-gradient(135deg,#667eea,#764ba2);
        color:white" id="home">
        <h1 style="font-size:clamp(36px,5vw,60px);font-weight:700">
          Build Your Website Faster
        </h1>
        <p style="
          max-width:650px;
          margin:24px auto;
          font-size:18px;
          opacity:.9">
          Design stunning, responsive websites visually with GrapesJS.
        </p>
        <button style="
          margin-top:24px;
          padding:14px 32px;
          background:#f472b6;
          border:none;
          border-radius:999px;
          color:white;
          font-size:16px">
          Get Started
        </button>
      </section>

      <!-- FOOTER -->
      <footer style="
        padding:40px;
        text-align:center;
        background:#111;
        color:white">
        © 2026 MySite. All rights reserved.
      </footer>
    </div>
        `);
      }

    });

    // ✅ DEVICE COMMANDS (CRITICAL)
    editor.Commands.add("set-device-desktop", {
      run: (ed) => ed.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-tablet", {
      run: (ed) => ed.setDevice("Tablet"),
    });
    editor.Commands.add("set-device-mobile", {
      run: (ed) => ed.setDevice("Mobile"),
    });

    // ✅ EXPORT WEBSITE
    editor.Commands.add("export-website", {
      run(ed) {

        const isConfirmed = confirm(
          "Export website and save to localStorage?"
        );

        if (isConfirmed) {
          const html = ed.getHtml();
          const css = ed.getCss();

          const fullHtml = `
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="utf-8" />
          <style>${css}</style>
          </head>
          <body>${html}</body>
          </html>`;

          localStorage.setItem("grapesjs-site", fullHtml);
          alert("Website exported!");
        } else {
          return;
        };

      },
    });

    editor.Panels.addButton("options", {
      id: "export",
      label: "⬇ Export",
      command: "export-website",
    });

    // =========================
    // 📦 RESPONSIVE BLOCKS
    // =========================
    const bm = editor.BlockManager;

    bm.add("navbar", {
      label: "Navbar",
      category: "Sections",
      content: `
<nav style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;padding:20px;background:#111;color:#fff">
  <strong>MySite</strong>
  <div style="display:flex;flex-wrap:wrap;gap:12px">
    <a style="color:#fff">Home</a>
    <a style="color:#fff">Services</a>
    <a style="color:#fff">About</a>
    <a style="color:#fff">Contact</a>
  </div>
</nav>
`,
    });

    bm.add("hero", {
      label: "Hero Section",
      category: "Sections",
      content: `
<section style="padding:90px 20px;text-align:center;
background:linear-gradient(135deg,#667eea,#764ba2);color:white"  id="home">
  <h1 style="font-size:clamp(32px,5vw,56px);font-weight:700">
    Build Your Website Faster
  </h1>
  <p style="max-width:640px;margin:20px auto;font-size:18px;opacity:.9">
    Design stunning, responsive websites visually with GrapesJS.
  </p>
  <button style="
    margin-top:20px;
    padding:14px 30px;
    background:#f472b6;
    color:white;
    border:none;
    border-radius:999px;
    font-size:16px;
    cursor:pointer">
    Get Started
  </button>
</section>
`,
    });

    bm.add("features", {
      label: "Features",
      category: "Sections",
      content: `
<section style="padding:70px 20px;background:#f8f9ff">
  <h2 style="text-align:center;color:#333">Why Choose Us</h2>
  <div style="
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
    gap:24px;
    max-width:1100px;
    margin:50px auto">
    
    <div style="padding:28px;border-radius:16px;
      background:linear-gradient(135deg,#667eea,#764ba2);
      color:white;box-shadow:0 10px 30px rgba(0,0,0,.15)">
      <h3>⚡ Fast</h3>
      <p>Optimized performance</p>
    </div>

    <div style="padding:28px;border-radius:16px;
      background:linear-gradient(135deg,#f472b6,#ec4899);
      color:white;box-shadow:0 10px 30px rgba(0,0,0,.15)">
      <h3>📱 Responsive</h3>
      <p>Mobile-first design</p>
    </div>

    <div style="padding:28px;border-radius:16px;
      background:linear-gradient(135deg,#34d399,#059669);
      color:white;box-shadow:0 10px 30px rgba(0,0,0,.15)">
      <h3>🎨 Customizable</h3>
      <p>Style everything visually</p>
    </div>
  </div>
</section>
`,
    });

    bm.add("about", {
      label: "About Section",
      category: "Sections",
      content: `
<section style="
  padding:80px 20px;
  background:linear-gradient(135deg,#eef2ff,#fdf2f8)" id="about">
  <div style="
    max-width:1200px;
    margin:auto;
    display:flex;
    flex-wrap:wrap;
    gap:50px;
    align-items:center">

    <div style="flex:1 1 300px">
      <h2 style="color:#4338ca">About Us</h2>
      <p style="font-size:17px;color:#333">
        We empower creators to build modern websites without coding,
        using powerful visual tools.
      </p>
    </div>

    <div style="flex:1 1 300px">
      <img src="https://via.placeholder.com/500x350"
        style="width:100%;border-radius:20px;box-shadow:0 20px 40px rgba(0,0,0,.2)"/>
    </div>
  </div>
</section>
`,
    });

    bm.add("services", {
      label: "Services",
      category: "Sections",
      content: `
<section style="padding:80px 20px;background:#fff" id="services">
  <h2 style="text-align:center">Our Services</h2>
  <div style="
    max-width:1200px;
    margin:50px auto;
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    gap:30px">

    <div style="padding:30px;border-radius:20px;
      background:rgba(102,126,234,.1);
      backdrop-filter:blur(10px)">
      <h3>🎨 Design</h3>
      <p>Modern UI/UX systems</p>
    </div>

    <div style="padding:30px;border-radius:20px;
      background:rgba(244,114,182,.12);
      backdrop-filter:blur(10px)">
      <h3>💻 Development</h3>
      <p>Clean scalable code</p>
    </div>

    <div style="padding:30px;border-radius:20px;
      background:rgba(52,211,153,.12);
      backdrop-filter:blur(10px)">
      <h3>🚀 SEO</h3>
      <p>Rank higher on Google</p>
    </div>
  </div>
</section>
`,
    });

    bm.add("pricing", {
      label: "Pricing",
      category: "Sections",
      content: `
<section style="padding:80px 20px;background:#f8f9ff">
  <h2 style="text-align:center">Pricing</h2>
  <div style="
    max-width:1100px;
    margin:50px auto;
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    gap:30px">

    <div style="padding:40px;border-radius:20px;background:white;text-align:center">
      <h3>Basic</h3>
      <p>$19 / mo</p>
    </div>

    <div style="
      padding:50px;
      border-radius:24px;
      background:linear-gradient(135deg,#667eea,#764ba2);
      color:white;
      transform:scale(1.05)">
      <h3>🔥 Pro</h3>
      <p>$49 / mo</p>
    </div>

    <div style="padding:40px;border-radius:20px;background:white;text-align:center">
      <h3>Enterprise</h3>
      <p>Custom</p>
    </div>
  </div>
</section>
`,
    });

    bm.add("pricing", {
      label: "Pricing",
      category: "Sections",
      content: `
<section style="padding:60px 20px;background:#f4f4f4">
  <h2 style="text-align:center">Pricing Plans</h2>
  <div style="max-width:1100px;margin:40px auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px">
    <div style="padding:30px;background:white;border-radius:8px;text-align:center">
      <h3>Basic</h3>
      <p>$19 / month</p>
    </div>
    <div style="padding:30px;background:#111;color:white;border-radius:8px;text-align:center">
      <h3>Pro</h3>
      <p>$49 / month</p>
    </div>
    <div style="padding:30px;background:white;border-radius:8px;text-align:center">
      <h3>Enterprise</h3>
      <p>Custom</p>
    </div>
  </div>
</section>
`,
    });

    bm.add("cta", {
      label: "Call To Action",
      category: "Sections",
      content: `
<section style="
  padding:90px 20px;
  text-align:center;
  background:linear-gradient(135deg,#667eea,#764ba2);
  color:white">
  <h2>Ready to build?</h2>
  <p>Start creating your website today.</p>
  <button style="
    margin-top:20px;
    padding:14px 32px;
    background:#f472b6;
    border:none;
    border-radius:999px;
    color:white;
    font-size:16px">
    Get Started
  </button>
</section>
`,
    });

    bm.add("contact-section", {
      label: "Contact Section",
      category: "Sections",
      content: `
<section style="padding:60px 20px" id="contact">
  <h2 style="text-align:center">Contact Us</h2>
  <form style="max-width:600px;margin:40px auto;display:flex;flex-direction:column;gap:12px">
    <input placeholder="Name" style="padding:12px"/>
    <input placeholder="Email" style="padding:12px"/>
    <textarea placeholder="Message" style="padding:12px"></textarea>
    <button style="padding:14px;background:#111;color:white;border:none">
      Send Message
    </button>
  </form>
</section>
`,
    });

    bm.add("faq", {
      label: "FAQ",
      category: "Sections",
      content: `
<section style="padding:60px 20px">
  <h2 style="text-align:center">FAQs</h2>
  <div style="max-width:800px;margin:40px auto">
    <p><strong>❓ Is this responsive?</strong><br/>Yes, fully mobile-friendly.</p>
    <p><strong>❓ Can I export HTML?</strong><br/>Yes, clean static HTML.</p>
    <p><strong>❓ No coding required?</strong><br/>Absolutely.</p>
  </div>
</section>
`,
    });

    bm.add("footer", {
      label: "Footer",
      category: "Sections",
      content: `
<footer style="padding:40px;text-align:center;background:#111;color:white">
  © 2026 MySite. All rights reserved.
</footer>
`,
    });

    editorRef.current = editor;
  }, []);

  return (
    <div className="relative min-h-screen">
      <Button
        onClick={() => setPreviewOpen(true)}
        className="absolute top-4 right-4 z-50"
      >
        👁 Preview
      </Button>

      <PreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />

      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div id="blocks" style={{ width: 180 }} />
        <div id="gjs" style={{ flex: 1, minHeight: "100vh" }} />
        <div style={{ width: 200 }}>
          <div id="styles" />
          <div id="traits" />
          <div id="layers" />
        </div>
      </div>
    </div>
  );

}
