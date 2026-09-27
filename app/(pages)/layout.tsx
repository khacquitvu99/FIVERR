import React from "react";
import Footer from "@/component/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}