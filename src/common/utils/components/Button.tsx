import { MouseEventHandler, PropsWithChildren, ReactNode } from 'react';

import styles from './Button.module.scss';

interface Props {
	variant?: 'contained' | 'outline' | 'text';
	size?: 'extra-small' | 'small' | 'medium' | 'large';
	color?: 'primary' | 'secondary' | 'neutral';
	disabled?: boolean;
	iconStart?: ReactNode;
	iconEnd?: ReactNode;
	testId?: string;
	onClick?: MouseEventHandler;
}

const Button = ({
	variant = 'contained',
	size = 'small',
	color = 'neutral',
	disabled = false,
	iconStart,
	iconEnd,
	onClick,
	testId,
	children,
}: PropsWithChildren<Props>) => {
	console.log(styles[color]);

	return (
		<button
			className={`${styles.btn} ${styles[variant]} ${styles[size]} ${styles[color]}`}
			data-testid={testId || null}
			disabled={disabled}
			onClick={onClick}
		>
			{iconStart}
			<div>{children}</div>
			{iconEnd}
		</button>
	);
};

export default Button;
