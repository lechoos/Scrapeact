import { useState, MouseEvent } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styles from './form.module.scss';
import { FormCorners } from '../FormCorners/FormCorners';
import { URL_REGEX } from '../../../utils/regex';

type Data = { message: string };

interface FormProps {
	setData: (data: Data) => void;
}

export const Form = ({ setData }: FormProps) => {
	const [link, setLink] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>('');

	const onClickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const index = Math.ceil(Math.random() * 10);

		if (!link) {
			const message =
				index === 5 ? 'Sprawdzasz ile razy możesz kliknąć przycisk? ;)' : 'Musisz wprowadzić adres URL :)';
			setError(message);
			return null;
		}

		const isValid = URL_REGEX.test(link);

		if (!isValid) {
			const message = index === 5 ? 'Sprawdzasz ile razy możesz kliknąć przycisk? ;)' : 'Adres jest nieprawidłowy :(';
			setError(message);
			return null;
		}

		setError('');
		setLoading(true);

		const response = await fetch('/data', {
			method: 'POST',
			body: JSON.stringify({
				message: link,
			}),
		});

		const resData: Data = await response.json();
		setData(resData);
		setLoading(false);
	};

	return (
		<div className={styles['form__container']}>
			<form className={styles.form} action='http://localhost:3000/data' method='POST'>
				<div className={styles['form__frame']}>
					<input className={styles['form__input']} type='text' value={link} onChange={e => setLink(e.target.value)} />
					<FormCorners />
				</div>
				{!loading ? (
					<button className={styles['form__button']} onClick={onClickHandler} type='submit'>
						Wyślij
					</button>
				) : (
					<ThreeDots visible={true} height={80} width={80} color='#ee5622' radius={9} ariaLabel='three-dots-loading' />
				)}
				{error && <p className={styles['form__error']}>{error}</p>}
			</form>
		</div>
	);
};
