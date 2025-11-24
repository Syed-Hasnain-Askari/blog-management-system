import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBox({ handleSearchChange }) {
	return (
		<div className="relative w-full max-w-sm">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
			<Input
				type="text"
				placeholder="Search posts..."
				className="pl-10"
				onChange={handleSearchChange}
			/>
		</div>
	);
}
