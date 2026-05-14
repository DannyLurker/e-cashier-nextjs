import Sidebar from "@/shared/components/sidebar/Index";
// import AuthenticatedProvider from "../providers";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen min-w-0">
      <Sidebar />
      <main className="min-w-0 flex-1 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
