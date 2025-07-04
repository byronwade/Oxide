import type { Metadata } from "next";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardFooter } from "@/components/layout/DashboardFooter";

export const metadata: Metadata = {
	title: {
		default: "Admin Dashboard | LaunchBeacon",
		template: "%s - Admin | LaunchBeacon",
	},
	description: "LaunchBeacon platform administration dashboard for managing users, content, and system operations.",
	robots: {
		index: false, // Don't index admin pages
		follow: false,
	},
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	// Mock admin user data - in real app this would come from auth context
	const adminUser = {
		id: "admin_001",
		username: "admin",
		displayName: "Platform Admin",
		avatar: "/avatars/admin.jpg",
		isDeveloper: true,
		isAdmin: true,
	};

	return (
		<div className="min-h-screen flex flex-col bg-black">
			<DashboardHeader user={adminUser} />
			<main className="flex-1">{children}</main>
			<DashboardFooter />
		</div>
	);
}
