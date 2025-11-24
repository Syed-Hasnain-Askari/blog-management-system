import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import AdminToggle from "../AdminToggle";
import api from "@/utils/api";

export function SignupForm() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [role, setRole] = useState("author");
	const [errors, setErrors] = useState({});
	const handleToggle = (e) => {
		const isChecked = e;
		console.log("isChecked", isChecked);
		setRole(isChecked ? "admin" : "author");
	};

	const validate = () => {
		const newErrors = {};

		if (!username.trim()) newErrors.username = "Username is required";
		if (!email.trim()) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

		if (!password) newErrors.password = "Password is required";
		else if (password.length < 8 && password.length > 12)
			newErrors.password =
				"Password must be at least 8 characters and no more than 12 characters long";

		if (!confirmPassword) newErrors.confirmPassword = "Confirm your password";
		else if (password !== confirmPassword)
			newErrors.confirmPassword = "Passwords do not match";

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleSignUp = async (e) => {
		e.preventDefault();

		if (!validate()) return;

		try {
			const response = await api.post("/api/auth/signup", {
				username,
				email,
				password,
				role
			});
			if (response) {
				toast.success("User registered successfully!");
			}
			// Reset form
			setUsername("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
		} catch (error) {
			toast.error(error.response?.data?.error || "Something went wrong");
			console.error(error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your information below to create your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="name">Full Name</FieldLabel>
							<Input
								id="name"
								type="text"
								placeholder="John Doe"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
							{errors.username && (
								<FieldDescription className={cn("text-red-500")}>
									{errors.username}
								</FieldDescription>
							)}
						</Field>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							{errors.email && (
								<FieldDescription className="text-red-500">
									{errors.email}
								</FieldDescription>
							)}
						</Field>
						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							{errors.password && (
								<FieldDescription className="text-red-500">
									{errors.password}
								</FieldDescription>
							)}
						</Field>
						<Field>
							<FieldLabel htmlFor="confirm-password">
								Confirm Password
							</FieldLabel>
							<Input
								id="confirm-password"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
							{errors.confirmPassword && (
								<FieldDescription className="text-red-500">
									{errors.confirmPassword}
								</FieldDescription>
							)}
						</Field>
						<Field>
							<AdminToggle handleToggle={handleToggle} />
						</Field>
						<FieldGroup>
							<Field>
								<Button variant="outline" type="button" onClick={handleSignUp}>
									Create Account
								</Button>
								<Link to="/">
									<FieldDescription className="px-6 text-center">
										Already have an account? <a href="#">Sign in</a>
									</FieldDescription>
								</Link>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
