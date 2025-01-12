'use client';

import * as React from 'react';
import Image from 'next/image';
import { NavItem } from './NavItem';
import { NavButton } from './NavButton';

const navItems = [
	{ label: 'Home Page' },
	{ label: 'Features' },
	{ label: 'Pricing' },
	{
		label: 'Resources',
		hasIcon: true,
		iconSrc:
			'https://cdn.builder.io/api/v1/image/assets/c50f48d43fe3485ea3a3e3aecae2bcdb/015d228c91f4596e166daf8d0c33f375542d916d9e18928c70df498a111e7f73?apiKey=c50f48d43fe3485ea3a3e3aecae2bcdb&',
	},
];

const buttons = [
	{ label: 'Sign Up', variant: 'outline' as const },
	{ label: 'Login', variant: 'solid' as const },
];

export const Navigation: React.FC = () => {
	return (
		<nav className='flex flex-col justify-center px-16 w-full bg-white border-b border-black min-h-[72px] max-md:px-5 max-md:max-w-full'>
			<div className='flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full'>
				<div className='flex justify-center items-center self-stretch my-auto w-20 min-h-[40px]'>
					<Image
						src='https://cdn.builder.io/api/v1/image/assets/c50f48d43fe3485ea3a3e3aecae2bcdb/42b2dca7aaec09509c52673c0b88e2590f687659ed936481a6fc519e5602f828?apiKey=c50f48d43fe3485ea3a3e3aecae2bcdb&'
						alt=''
						width={84}
						height={36}
						className='object-contain self-stretch my-auto'
					/>
				</div>
				<div className='flex flex-wrap gap-8 justify-center items-center self-stretch my-auto text-base min-w-[240px] max-md:max-w-full'>
					<div className='flex gap-8 items-center self-stretch my-auto text-black min-w-[240px]'>
						{navItems.map((item, index) => (
							<NavItem key={index} {...item} />
						))}
					</div>
					<div className='flex gap-4 justify-center items-center self-stretch my-auto'>
						{buttons.map((button, index) => (
							<NavButton key={index} {...button} />
						))}
					</div>
				</div>
			</div>
		</nav>
	);
};
