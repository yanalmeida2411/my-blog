import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyBlog",
  description: "Plataforma que permite que criadores de conteúdo compartilhem suas ideias.",
  icons: {
    icon: "/world.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}