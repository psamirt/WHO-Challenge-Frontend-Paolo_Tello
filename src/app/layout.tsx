import Navbar from "@/components/Navbar";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
