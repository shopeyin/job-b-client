import SideNav from "@/components/ui/SideNav";

export const metadata = {
  title: "Employer Dashboard",
  description: "Generated by create next app",
};

export default function EmployerLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <main className="mt-4">{children}</main>
      </div>
    </div>
  );
}
