import styles from './error.module.scss';

interface ErrorTypes {
	message: string;
}

export const Error = ({ message }: ErrorTypes) => {
	return <p data-testid='error-message' className={styles.error}>{message}</p>;
};

export const Success = ({ message }: ErrorTypes) => {
	return <p data-testid='success-message' className={styles.success}>{message}</p>;
};
