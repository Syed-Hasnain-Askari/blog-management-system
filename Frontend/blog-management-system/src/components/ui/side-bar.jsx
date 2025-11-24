import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
	{
		title: "Home",
		url: "/",
		icon: Home
	},
	{
		title: "All Post",
		url: "/all-posts",
		icon: Home
	},
	{
		title: "Create Post",
		url: "/post-editor",
		icon: Inbox
	},
	{
		title: "My Posts",
		url: "/my-posts",
		icon: Inbox
	}

	// {
	// 	title: "Search",
	// 	url: "#",
	// 	icon: Search
	// },
	// {
	// 	title: "Settings",
	// 	url: "#",
	// 	icon: Settings
	// }
];

export default function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Blog Management System</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu orientation="vertical">
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
