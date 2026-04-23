import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RestWise — The sleep coach your watch forgot.",
  description:
    "Plug in your Oura, Whoop, or Apple Watch. Get an AI coach that tells you what to actually do differently tonight.",
  openGraph: {
    title: "RestWise — The sleep coach your watch forgot.",
    description:
      "Plug in your Oura, Whoop, or Apple Watch. Get an AI coach that tells you what to actually do differently tonight.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=RestWise&accent=fuchsia&category=Health",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=RestWise&accent=fuchsia&category=Health",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
