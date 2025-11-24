import React from "react";
import SearchBox from "./SearchBox";
import { Button } from "./ui/button";

export default function Header({ handleSearchChange }) {
	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("user");

		window.location.href = "/login";
	};
	return (
		<div className="w-full flex justify-between py-6">
			<SearchBox handleSearchChange={handleSearchChange} />
			<Button variant={"outline"} onClick={handleLogout}>
				Logout
			</Button>
		</div>
	);
}
