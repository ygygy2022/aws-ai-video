import type { Metadata } from 'next';
import './globals.css';
import { Manrope } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme/theme-provider';

export const metadata: Metadata = {
	title: 'Opal',
	description: 'Share AI powered videos with your friends.',
};
const manrope = Manrope({
	subsets: ['latin'],
	variable: '--font-manrope',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`${manrope.variable} bg-[#171717]`}>
					{' '}
					<ThemeProvider
						attribute='class'
						defaultTheme='dark'
						disableTransitionOnChange>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
