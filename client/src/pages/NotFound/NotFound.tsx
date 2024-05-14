import styles from './notFound.module.scss';
import { LottieAnimation } from "../../components/LottieAnimation/LottieAnimation";
import animationData from '../../lotties/not-found.json';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <LottieAnimation classes={styles.lottie} animationData={animationData} />
    </div>
  )
};