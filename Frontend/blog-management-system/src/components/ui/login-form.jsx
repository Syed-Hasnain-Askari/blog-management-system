import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { toast } from "sonner";
import api from "@/utils/api";

export function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await api.post("/api/auth/login/", {
				email,
				password
			});

			// success message
			toast.success("Login Successful");

			// Extract backend response
			const { token, refreshToken, user, name } = res.data;

			// Save token (BEST PRACTICE → localStorage)
			localStorage.setItem("accessToken", token);
			localStorage.setItem("refreshToken", refreshToken);
			localStorage.setItem("user", JSON.stringify(user));

			// OPTIONAL: save token in cookie (if you want)
			// document.cookie = `accessToken=${token}; path=/;`;

			console.log("User Logged In:", user);
			console.log("Name:", name);

			// Redirect if needed
			window.location.href = "/";
		} catch (error) {
			console.log(error);
			toast.error(error.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={"flex flex-col gap-6"}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									value={email}
									placeholder="m@example.com"
									required
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<a
										href="#"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</a>
								</div>
								<Input
									id="password"
									type="password"
									value={password}
									required
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</Field>
							<Field>
								<Button
									variant="outline"
									type="button"
									disable={loading}
									onClick={handleLogin}
								>
									{loading ? "Logging in..." : "Login"}
								</Button>

								<FieldDescription className="text-center">
									Don&apos;t have an account?{" "}
									<Link to={"/signup"}>Sign up</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
