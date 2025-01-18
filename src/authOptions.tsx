import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Email",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "Email",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password",
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});
				if (!user) {
					throw new Error("No account found for that email.");
				}
				const isPasswordValid = await compare(
					credentials.password,
					user.password
				);
				if (!isPasswordValid) {
					throw new Error("Incorrect password.");
				}

				return {
					id: user.id + "",
					email: user.email,
					firstName: user.firstName,
					name: user.firstName + " " + user.lastName,
					role: user.role,
				};
			},
		}),
	],
	pages: {
		signIn: "/signin",
	},
	callbacks: {
		session: ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					name: token.name,
					email: token.email,
					role: token.role,
					activated: token.activated,
				},
			};
		},
		jwt: ({ token, user }) => {
			if (user) {
				const u = user as unknown as any;
				return {
					...token,
					id: u.id,
					email: u.email,
					name: u.name,
					role: u.role,
					activated: u.activated,
				};
			}
			return token;
		},
	},
};
