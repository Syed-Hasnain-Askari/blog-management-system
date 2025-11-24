import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, FileText, Clock } from "lucide-react";

export default function StatsCards({
	title01,
	description01,
	value01,
	title02,
	description02,
	value02,
	title03,
	description03,
	value03
}) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{/* Total Users */}
			<Card className="hover:shadow-lg transition-shadow border border-gray-200">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">{title01}</CardTitle>
					<Users className="h-5 w-5 text-primary" />
				</CardHeader>
				<CardContent>
					<p className="text-3xl font-bold">{value01}</p>
					<p className="text-sm text-muted-foreground mt-1">{description01}</p>
				</CardContent>
			</Card>

			{/* Total Posts */}
			<Card className="hover:shadow-lg transition-shadow border border-gray-200">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">{title02}</CardTitle>
					<FileText className="h-5 w-5 text-primary" />
				</CardHeader>
				<CardContent>
					<p className="text-3xl font-bold">{value02}</p>
					<p className="text-sm text-muted-foreground mt-1">{description02}</p>
				</CardContent>
			</Card>

			{/* Pending Reviews */}
			<Card className="hover:shadow-lg transition-shadow border border-gray-200">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">{title03}</CardTitle>
					<Clock className="h-5 w-5 text-primary" />
				</CardHeader>
				<CardContent>
					<p className="text-3xl font-bold">{value03}</p>
					<p className="text-sm text-muted-foreground mt-1">{description03}</p>
				</CardContent>
			</Card>
		</div>
	);
}
