import styles from './phoneCell.module.scss';

interface PhoneProps {
	size: number;
	children: string;
}

export const PhoneCell = ({ size, children }: PhoneProps) => {
	return (
		<td data-testid='phone-cell' width={size} className={`${styles.cell} ${styles['cell--phone']}`}>
			{children}
		</td>
	);
};
