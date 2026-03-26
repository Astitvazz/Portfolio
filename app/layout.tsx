import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Sora } from "next/font/google";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Astitva Sharma | Portfolio",
  description: "Full-stack developer building polished products, thoughtful interfaces, and scalable systems.",
};

const themeScript = `
  (() => {
    const storageKey = "portfolio-theme";
    const storedTheme = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : (prefersDark ? "dark" : "light");

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="antialiased transition-colors duration-300">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Navbar />
        {children}
        <Footer
          name="Astitva"
          email="hello@astitva.dev"
          socialLinks={[
            { name: "GitHub", url: "https://github.com/yourusername", icon: <Github size={18} /> },
            { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: <Linkedin size={18} /> },
            { name: "Instagram", url: "https://instagram.com/yourusername", icon: <Instagram size={18} /> },
            { name: "Twitter", url: "https://twitter.com/yourusername", icon: <Twitter size={18} /> },
          ]}
        />
      </body>
    </html>
  );
}
