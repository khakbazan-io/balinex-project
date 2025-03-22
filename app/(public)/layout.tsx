import { Header } from "@/components/main-layout";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-screen-xl mx-auto min-h-screen">
      <Header />

      <main>{children}</main>
    </div>
  );
}
