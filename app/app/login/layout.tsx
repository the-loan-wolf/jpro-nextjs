import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | FreeJobSearcher",
  description: "Find Job while sitting at your home",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
