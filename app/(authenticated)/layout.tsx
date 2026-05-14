import Sidebar from "@/shared/components/sidebar/Index";
import AuthenticatedProvider from "../providers";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthenticatedProvider>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 transition-all duration-300">{children}</main>
      </div>
    </AuthenticatedProvider>
  );
}
