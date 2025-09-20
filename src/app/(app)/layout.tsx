import AppContent from "@/components/AppContent";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppContent>{children}</AppContent>;
}
