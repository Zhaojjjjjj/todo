import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "My Todo App",
	description: "A simple, persistent todo application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
