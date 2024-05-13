import Lottie from 'lottie-react';
import styles from './lottieAnimation.module.scss';

interface LottieType {
	animationData: object;
	classes?: string;
	testID?: string;
}

export const LottieAnimation = ({ animationData, classes, testID }: LottieType) => {
	return <Lottie data-testid={testID} animationData={animationData} className={`${styles.lottie} ${classes}`} />;
};
