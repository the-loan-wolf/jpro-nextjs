import "../globals.css";
import NavBar from "../ui/nav-bar";
import type { Metadata } from "next";

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
    <html lang="en">
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
        <NavBar />
        {children}
      </body>
    </html>
  );
}
