import type { Metadata } from "next";
import { TactileGrain } from "@/components/tactile-grain";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Mandate Talent - Cover contracts in Melbourne",
  description:
    "Mandate Talent matches people who can do the work from day one to short, defined cover contracts. Register your interest as talent or as someone hiring. Opening in Melbourne.",
  icons: {
    icon: [
      {
        url: `${basePath}/brand/favicon/light-32.png`,
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: `${basePath}/brand/favicon/dark-32.png`,
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: `${basePath}/brand/favicon/light-192.png`,
        type: "image/png",
        sizes: "192x192",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: `${basePath}/brand/favicon/dark-192.png`,
        type: "image/png",
        sizes: "192x192",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: `${basePath}/brand/favicon/light-180.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

const themeBoot = `(function(){var k="mandate-theme";var bp=${JSON.stringify(basePath)};function icons(d){var href=bp+"/brand/favicon/"+(d?"dark":"light")+"-32.png";var apple=bp+"/brand/favicon/"+(d?"dark":"light")+"-180.png";var el=document.getElementById("mandate-favicon");if(!el){el=document.createElement("link");el.id="mandate-favicon";el.rel="icon";el.type="image/png";el.sizes="32x32";document.head.appendChild(el)}el.href=href;var a=document.getElementById("mandate-apple-icon");if(!a){a=document.createElement("link");a.id="mandate-apple-icon";a.rel="apple-touch-icon";a.sizes="180x180";document.head.appendChild(a)}a.href=apple;document.querySelectorAll('link[rel="icon"][media]').forEach(function(n){n.disabled=true})}function apply(d){document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";try{localStorage.setItem(k,d?"dark":"light")}catch(e){}var b=document.querySelector("[data-theme-toggle]");if(b)b.setAttribute("aria-pressed",d?"true":"false");icons(d)}function preferred(){try{var s=localStorage.getItem(k);if(s==="dark")return true;if(s==="light")return false}catch(e){}return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches}apply(preferred());document.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest("[data-theme-toggle]");if(!t)return;e.preventDefault();apply(!document.documentElement.classList.contains("dark"))},true);})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@700;800&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <TactileGrain />
        <div className="page-shell relative z-[1] flex min-h-full flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
