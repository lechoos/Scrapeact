import styles from './loader.module.scss';
import { LottieAnimation } from '../../components/LottieAnimation/LottieAnimation';
import animationData from '../../lotties/loading.json';

interface LoaderType {
	loading: boolean;
}

export const Loader = ({ loading }: LoaderType) => {
	if (loading) {
		return (
			<div data-testid='test-loader' className={styles.container}>
				<LottieAnimation classes={styles.lottie} animationData={animationData} />
			</div>
		);
	}
};
