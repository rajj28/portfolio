import type { Metadata } from "next";
import "./globals.css";
import GlobalLoadingProvider from "@/components/GlobalLoadingProvider";

export const metadata: Metadata = {
  title: "Ruturaj Sonkamble | AI & Backend Developer",
  description: "AI enthusiast passionate about backend development with Go and Node.js. Building innovative solutions and scalable systems.",
  keywords: ["AI", "backend", "Go", "Node.js", "developer", "innovation", "Ruturaj Sonkamble"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GlobalLoadingProvider>
          {children}
        </GlobalLoadingProvider>
      </body>
    </html>
  );
}

