"use client";

// packages
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
// types
import { LoginForm } from "@/lib/types";

export default function SignIn() {
	const loginForm = useForm<LoginForm>();
	const { register, handleSubmit, reset, formState } = loginForm;
	const { errors } = formState;
	const [loginError, setLoginError] = useState("");

	const login = async (data: LoginForm) => {
		try {
			const res = await signIn("credentials", {
				email: data.email.toLowerCase(),
				password: data.password,
				redirect: false,
			});
			if (res?.ok) {
				window.location.href = "/dashboard";
			} else {
				setLoginError(res?.error ?? "Unknown error.");
				reset();
			}
		} catch (error) {
			console.log("Unexpected error:", error);
		}
	};
	return (
		<main className="flex flex-col grow">
			<div className="m-auto">
				<div className="bg-neutral-100 p-4 rounded-lg shadow">
					<div className="font-bold text-4xl">Login</div>
					{loginError !== "" && (
						<p className="text-red-400">{loginError}</p>
					)}
					<form onSubmit={handleSubmit(login)}>
						<input
							type="text"
							{...register("email", {
								required: {
									value: true,
									message: "Email is required.",
								},
							})}
							placeholder={
								errors.email ? errors.email.message : "Email"
							}
							className={
								errors.email ? "placeholder:text-red-400" : ""
							}
						/>
						<input
							type="password"
							{...register("password", {
								required: {
									value: true,
									message: "Password is required.",
								},
							})}
							placeholder={
								errors.password
									? errors.password.message
									: "Password"
							}
							className={
								errors.password
									? "placeholder:text-red-400"
									: ""
							}
						/>
						<div className="flex justify-between">
							<Button
								type="button"
								onPress={() => reset()}
								color="danger"
								variant="light"
							>
								Reset
							</Button>
							<Button type="submit" className="bg-green-500">
								Login
							</Button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}
