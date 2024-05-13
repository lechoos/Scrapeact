import styles from './home.module.scss';
import { LottieAnimation } from '../../components/LottieAnimation/LottieAnimation';
import animationData from '../../lotties/map-animation.json';
import { LinkButton } from '../../components/LinkButton/LinkButton';

export const Home = () => {
	return (
		<div className='wrapper'>
			<header className={styles.header}>
				<h1 data-testid='home-title' className={styles['header__title']}>Scrapeact</h1>
				<p data-testid='home-subtitle' className={styles['header__text']}>Zdobądź cenne dane z Google Maps w kilka chwil!</p>
				<LottieAnimation testID='home-lottie' classes={styles.lottie} animationData={animationData} />
			</header>
			<main className={styles.home}>
				<div className={styles['home__background']} />
				<div className={styles['home__links']}>
					<LinkButton testID='home-login' variant='primary' href='/zaloguj'>
						Zaloguj
					</LinkButton>
					<LinkButton testID='home-register' variant='secondary' href='/zarejestruj'>
						Zarejestruj
					</LinkButton>
				</div>
			</main>
		</div>
	);
};
