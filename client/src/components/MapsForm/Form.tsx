import { useState, MouseEvent, Dispatch, SetStateAction } from 'react';
import { Contact } from '../../types/Contact';
import { ThreeDots } from 'react-loader-spinner';
import styles from './form.module.scss';
import { FormCorners } from '../FormCorners/FormCorners';
import { Error as ErrorComponent } from '../Error/Error';

interface FormProps {
	setData: Dispatch<SetStateAction<Contact[]>>;
}

export const MapsForm = ({ setData }: FormProps) => {
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

		setError('');
		setLoading(true);

		try {
			const response = await fetch(`${import.meta.env.VITE_SERVER}/scrape`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ link: link }),
			});

			if (!response.ok) {
				throw new Error('Link jest nieprawidłowy');
			}

			const resData: Contact[] = await response.json();

			setData(resData);
			setError('');
		} catch (ex) {
			setError('Link jest nieprawidłowy!');
		}

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
				{error && <ErrorComponent message={error} />}
			</form>
		</div>
	);
};
