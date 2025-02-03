import { Sidebar } from "@/components/dashboard/sidebar";
import { ShiftProvider } from "@/app/context/ShiftContext";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShiftProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background pt-16">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </ShiftProvider>
  );
}
