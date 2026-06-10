import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cavite West Point College — Shaping Future Leaders",
  description:
    "Cavite West Point College (CWPC) in Ternate, Cavite — Your gateway to quality education. Offering BSED, BEED, BSHM, BSTM, BSBA, BSPA, BSOA, and BSCRIM programs.",
  keywords: [
    "CWPC",
    "Cavite West Point College",
    "College in Cavite",
    "College in Ternate",
    "Education Philippines",
    "BSED",
    "BEED",
    "BSHM",
    "BSCRIM",
  ],
  authors: [{ name: "Cavite West Point College" }],
  openGraph: {
    title: "Cavite West Point College — Shaping Future Leaders",
    description:
      "Your gateway to quality education in Ternate, Cavite. 8+ programs, 1000+ students, 25+ years of excellence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
