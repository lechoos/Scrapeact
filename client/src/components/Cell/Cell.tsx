import styles from './cell.module.scss';

interface CellProps {
	size: number;
	children: string;
}

export const Cell = ({ size, children }: CellProps) => {
	return (
		<td data-testid='company-cell' width={size} className={styles.cell}>
			{children}
		</td>
	);
};
