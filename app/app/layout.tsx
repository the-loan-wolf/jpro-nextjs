import "../globals.css";
import NavBar from "@/app/ui/navbar/nav-bar";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "FreeJobSearch",
  description: "Find Job while sitting at your home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`antialiased text-slate-400 bg-slate-900`}>
        {/* background gradient image overlay on whole site */}
        <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
          <div className="w-[108rem] flex-none flex justify-end">
            <Image
              src="/second.png"
              width={800}
              height={600}
              alt=""
              className="w-[90rem] flex-none max-w-none"
            />
          </div>
        </div>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
