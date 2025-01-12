import * as React from 'react';
import Image from 'next/image';
import { NavItemProps } from './types';

export const NavItem: React.FC<NavItemProps> = ({
	label,
	hasIcon,
	iconSrc,
}) => {
	return (
		<div className='flex gap-1 justify-center items-center self-stretch my-auto whitespace-nowrap'>
			<div className='self-stretch my-auto'>{label}</div>
			{hasIcon && iconSrc && (
				<Image
					src={iconSrc}
					alt=''
					width={24}
					height={24}
					className='object-contain shrink-0 self-stretch my-auto'
				/>
			)}
		</div>
	);
};
