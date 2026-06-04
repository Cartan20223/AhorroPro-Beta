import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AhorroPro",
  description: "Presupuesto inteligente con el método de sobres",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
      </head>
      <body className="bg-white text-[#0a0a0f] min-h-screen">
        {children}
      </body>
    </html>
  );
}
  