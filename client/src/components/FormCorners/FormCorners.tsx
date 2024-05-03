import styles from './formCorners.module.scss';
import formStyles from '../Form/form.module.scss';
import { Corner } from '../Corner/Corner';

export const FormCorners = () => {
	return (
		<div className={`${styles.corners} ${formStyles.corners}`}>
			<div className={`${styles.bar} ${styles['bar--top']}`}></div>
			<Corner index='first' rotate={0} />
			<Corner index='second' rotate={90} />
			<Corner index='third' rotate={270} />
			<Corner index='fourth' rotate={180} />
			<div className={`${styles.bar} ${styles['bar--bottom']}`}></div>
		</div>
	);
};
