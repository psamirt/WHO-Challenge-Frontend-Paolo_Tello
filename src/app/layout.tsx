import Navbar from "@/components/Navbar";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" data-theme="dark">
      <body>
        <Navbar />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
