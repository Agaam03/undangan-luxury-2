import type { Metadata } from "next";
// Import font langsung dari Google via Next.js optimization
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

// Konfigurasi Font Serif (Playfair Display)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair", // Variable CSS untuk Tailwind
  display: "swap",
});

// Konfigurasi Font Sans (Lato)
const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato", // Variable CSS untuk Tailwind
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leo & Kaia | The Wedding",
  description: "Undangan Pernikahan Leo Alexander & Kaia Amara",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Masukkan variable font ke tag html agar bisa diakses global
    <html
      lang="en"
      className={`scroll-smooth ${playfair.variable} ${lato.variable}`}
    >
      <body className="bg-romantic-50 text-stone-800 font-sans selection:bg-romantic-200 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
