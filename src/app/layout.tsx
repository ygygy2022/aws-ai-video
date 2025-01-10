import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Opal',
	description: 'Share AI powered videos with your friends.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
