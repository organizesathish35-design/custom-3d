import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mossbyte — Walk Into the Signal",
  description: "An interactive WebGL field study shaped by attention, movement and time.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
