import type { Metadata } from "next";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardFooter } from "@/components/layout/DashboardFooter";

export const metadata: Metadata = {
	title: {
		default: "Dashboard | LaunchBeacon",
		template: "%s - Dashboard | LaunchBeacon",
	},
	description: "Manage your games, analytics, and developer tools on LaunchBeacon - the ultimate gaming platform.",
	robots: {
		index: false, // Don't index dashboard pages
		follow: false,
	},
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col bg-black">
			<DashboardHeader />
			<main className="flex-1">{children}</main>
			<DashboardFooter />
		</div>
	);
}
