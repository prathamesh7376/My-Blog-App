import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Blog App",
  description: "A blog platform for users to explore and share articles",
  author: "Your Name or Company", // Add author for SEO
  keywords: "blog, articles, Next.js", // Add keywords for SEO
  viewport: "width=device-width, initial-scale=1", // Improve mobile responsiveness
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content={metadata.viewport} />
        {/* Other SEO optimizations can go here */}
      </head>
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
