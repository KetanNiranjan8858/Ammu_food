import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AMMU Admin Control Panel | Store Management",
  description: "AMMU Foods Admin Control Panel - Edit store content, products, pricing, and view customer inquiries in real time.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

