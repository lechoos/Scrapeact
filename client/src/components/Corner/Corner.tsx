import styles from '../MapsForm/form.module.scss';

interface CornerProps {
  index: string;
  rotate: number;
}

export const Corner: React.FC<CornerProps> = ({ index, rotate }) => {
	return (
		<div className={`${styles.corner} ${styles[`corner--${index}`]} ${styles[`rotate--${rotate}`]}`}>
			<div className={`${styles.border} ${styles['border--top']}`}></div>
			<div className={`${styles.border} ${styles['border--left']}`}></div>
			<div className={styles.square}></div>
		</div>
	);
};