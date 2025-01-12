import { Menu } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
type Props = {};

const LandingPageNavBar = (props: Props) => {
	return (
		<div className='flex w-full justify-between items-center'>
			<div className='text-3xl font-semibold flex items-center gap-x-3'>
				<Menu className='w-6 h-6' />
				<Image src='/next.svg' alt='logo' width={40} height={40} />
				Opal
			</div>
			<div className='hidden gap-x-10 items-center lg:flex'>
				<Link href='/'>Home</Link>
				<Link href='/'>Features</Link>
				<Link href='/'>Pricing</Link>
				<Link href='/'>Contact</Link>
			</div>
			LandingPage
		</div>
	);
};

export default LandingPageNavBar;
