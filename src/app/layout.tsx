import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mandate Talent - Cover contracts in Melbourne",
  description:
    "Mandate Talent matches people who can do the work from day one to short, defined cover contracts. Register your interest as talent or as someone hiring. Opening in Melbourne.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var k="mandate-theme";function apply(d){document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";try{localStorage.setItem(k,d?"dark":"light")}catch(e){}var b=document.querySelector("[data-theme-toggle]");if(b)b.setAttribute("aria-pressed",d?"true":"false")}function preferred(){try{var s=localStorage.getItem(k);if(s==="dark")return true;if(s==="light")return false}catch(e){}return false}apply(preferred());document.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest("[data-theme-toggle]");if(!t)return;e.preventDefault();apply(!document.documentElement.classList.contains("dark"))},true);})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda+SC:wght@400;500;600&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <div className="page-shell relative z-[1] flex min-h-full flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
