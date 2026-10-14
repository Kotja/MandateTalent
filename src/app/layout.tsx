import type { Metadata } from "next";
import { TactileGrain } from "@/components/tactile-grain";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var MAX=16,reduce=false,tick=false;function update(){if(reduce){document.querySelectorAll(".glass-cta").forEach(function(el){el.style.setProperty("--glass-rx","0deg");el.style.setProperty("--glass-edge","0")});return}var mid=window.innerHeight*0.5;document.querySelectorAll(".glass-cta").forEach(function(el){var r=el.getBoundingClientRect();if(r.bottom<-40||r.top>window.innerHeight+40)return;var y=r.top+r.height*0.5;var t=(y-mid)/mid;if(t<-1)t=-1;if(t>1)t=1;var deg=-t*MAX;el.style.setProperty("--glass-rx",deg.toFixed(2)+"deg");el.style.setProperty("--glass-edge",Math.abs(t).toFixed(3))})}function onScroll(){if(tick)return;tick=true;requestAnimationFrame(function(){tick=false;update()})}function init(){reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;update();window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll)}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init()})();`,
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
        <TactileGrain />
        <div className="page-shell relative z-[1] flex min-h-full flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
