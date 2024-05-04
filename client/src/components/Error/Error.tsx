import styles from './error.module.scss';

interface ErrorTypes {
  message: string
}

export const Error = ({ message }: ErrorTypes) => {
  return (
    <p className={styles.error}>{message}</p>
  )
};