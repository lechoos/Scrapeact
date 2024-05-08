import { ReactNode } from 'react';
import styles from './linkButton.module.scss';

interface LinkProps {
	href: string;
	variant: 'primary' | 'secondary';
	children: ReactNode;
}

interface ButtonProps {
	variant: 'primary' | 'secondary';
	children: ReactNode;
}

interface NormalButton {
	onClick?: () => void;
	children: ReactNode;
}

export const LinkButton = ({ href, variant, children }: LinkProps) => {
	const selectedVariant = variant === 'primary' ? styles.primary : styles.secondary;

	return (
		<a className={selectedVariant} href={href}>
			{children}
		</a>
	);
};

export const SubmitButton = ({ variant, children }: ButtonProps) => {
	const selectedVariant = variant === 'primary' ? styles.primary : styles.secondary;

	return (
		<button className={`${selectedVariant} ${styles.button}`} type='submit'>
			{children}
		</button>
	);
};

export const Button = ({ children, onClick }: NormalButton) => {
	return (
		<button onClick={onClick} className={`${styles.tertiary} ${styles.button}`}>
			{children}
		</button>
	);
};
