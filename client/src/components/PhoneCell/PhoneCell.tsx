import styles from './phoneCell.module.scss';

interface PhoneProps {
  size: number;
  children: string;
}

export const PhoneCell: React.FC<PhoneProps> = ({ size, children }) => {
	return (
		<td width={size} className={`${styles.cell} ${styles['cell--phone']}`}>
			{children}
		</td>
	);
};
