import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./side-bar";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="p-6">
				{/* <SidebarTrigger /> */}
				<Outlet /> {/* renders child route */}
			</main>
		</SidebarProvider>
	);
}
