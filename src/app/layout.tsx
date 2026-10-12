import type { Metadata } from "next";
import { OrganicLines } from "@/components/organic-lines";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mandate Talent — Cover contracts in Melbourne",
  description:
    "Mandate Talent matches people who can do the work from day one to short, defined cover contracts. Register your interest as talent or as someone hiring. Opening in Melbourne.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("mandate-theme");var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`,
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
        <OrganicLines />
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
