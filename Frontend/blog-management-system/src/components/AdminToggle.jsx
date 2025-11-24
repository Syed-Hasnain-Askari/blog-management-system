"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function AdminToggle({ handleToggle }) {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox
				id="terms"
				onCheckedChange={(e) => {
					handleToggle(e);
				}}
			/>
			<label
				htmlFor="terms"
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Register as Admin
			</label>
		</div>
	);
}
