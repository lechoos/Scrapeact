import Lottie from 'lottie-react';
import styles from './lottieAnimation.module.scss';

interface LottieType {
	animationData: object;
	classes?: string;
}

export const LottieAnimation = ({ animationData, classes }: LottieType) => {
	return <Lottie animationData={animationData} className={`${styles.lottie} ${classes}`} />;
};
