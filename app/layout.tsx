import "./globals.css";
import { Providers } from "@/components/Providers";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh">
			<body className="antialiased" suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
