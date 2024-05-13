import { ReactNode } from 'react';
import styles from './linkButton.module.scss';

interface LinkProps {
	href: string;
	variant: 'primary' | 'secondary';
	children: ReactNode;
	testID?: string;
}

interface ButtonProps {
	variant: 'primary' | 'secondary';
	children: ReactNode;
	testID?: string;
}

interface NormalButton {
	onClick?: () => void;
	children: ReactNode;
	testID?: string;
}

export const LinkButton = ({ href, variant, children, testID }: LinkProps) => {
	const selectedVariant = variant === 'primary' ? styles.primary : styles.secondary;

	return (
		<a data-testid={testID} className={selectedVariant} href={href}>
			{children}
		</a>
	);
};

export const SubmitButton = ({ variant, children, testID }: ButtonProps) => {
	const selectedVariant = variant === 'primary' ? styles.primary : styles.secondary;

	return (
		<button data-testid={testID} className={`${selectedVariant} ${styles.button}`} type='submit'>
			{children}
		</button>
	);
};

export const Button = ({ children, onClick, testID }: NormalButton) => {
	return (
		<button data-testid={testID} onClick={onClick} className={`${styles.tertiary} ${styles.button}`}>
			{children}
		</button>
	);
};
