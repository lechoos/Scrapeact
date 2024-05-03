import Lottie from 'lottie-react';
import styles from './lottieAnimation.module.scss';

interface LottieType {
  animationData: object
}

export const LottieAnimation = ({ animationData }: LottieType) => {
  return (
    <Lottie animationData={animationData} className={styles.lottie} />
  )
};