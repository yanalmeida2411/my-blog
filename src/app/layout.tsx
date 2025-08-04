import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlogShop",
  description: "Plataforma que permite que criadores de conteúdo compartilhem suas ideias e transformem seguidores em clientes.",
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