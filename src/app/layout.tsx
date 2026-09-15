import type { Metadata } from "next";
import "./globals.css";

const title = "Construction Noise Regulation: Singapore in International Context";
const description =
  "How ten jurisdictions define, measure, and enforce acceptable construction noise — and what the differences reveal about legal tradition, governance structure, and urban density.";

export const metadata: Metadata = {
  metadataBase: new URL("https://noise-level-singapore-brief.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    siteName: "Comparative Regulatory Dossier",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resolve the theme before first paint so there is no flash, and so
            data-theme is always explicit (never "system") for the toggle. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("noise-theme");var t=(s==="light"||s==="dark")?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t;}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
