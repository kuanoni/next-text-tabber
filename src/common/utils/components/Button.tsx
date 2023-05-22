import { MouseEventHandler, ReactNode } from 'react';

import styles from './Button.module.scss';

interface Props {
	variant: 'contained' | 'outline' | 'text' | 'link';
	size: 'extra-small' | 'small' | 'medium' | 'large';
	color: 'primary' | 'secondary' | 'neutral';

	testId?: string;
	disabled?: boolean;
	onClick?: MouseEventHandler;
	children: ReactNode;
}

const Button = ({ variant, size, color, testId, disabled = false, onClick, children }: Props) => {
	console.log(styles[color]);

	return (
		<button
			className={`${styles.btn} ${styles[variant]} ${styles[size]} ${styles[color]}`}
			data-testid={testId || null}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
