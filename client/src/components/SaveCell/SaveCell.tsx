import { MouseEvent } from 'react';
import styles from './saveCell.module.scss';

interface SaveProps {
	checked: boolean;
	size: number;
	click: (e: EventTarget) => void;
}

export const SaveCell = ({ checked, size, click }: SaveProps) => {
	const text = checked ? 'Tak' : 'Nie';

	const clickHandler = (e: MouseEvent<HTMLTableCellElement>) => {
		click(e.target);
	};

	return (
		<td onClick={clickHandler} width={size} className={styles['save-cell__container']}>
			<span className={`${styles['save-cell']} ${checked ? styles['save-cell--true'] : styles['save-cell--false']}`}>
				{text}
			</span>
		</td>
	);
};
