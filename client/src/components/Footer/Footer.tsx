import styles from './footer.module.scss';

export const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<p className={styles['footer__text']}>&copy; {year} Wszelkie prawa zastrzeżone</p>
			<p className={styles.trademark}>
				Created by{' '}
				<a className={styles['trademark__link']} href='https://lotusite.pl' target='_blank' rel='noopener norefferer'>
					Piotr Lechowicz
				</a>
			</p>
		</footer>
	);
};
