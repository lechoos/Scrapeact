import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './register.module.scss';
import { ServerResponse } from '../../types/Server';
import { FormInput } from '../../components/FormInput/FormInput';
import { SubmitButton } from '../../components/LinkButton/LinkButton';
import { Error } from '../../components/Error/Error';
import { EMAIL_REGEX } from '../../../utils/regex';
import { useState } from 'react';

import Cookies from 'js-cookie';

interface RegisterFormTypes {
	nickname: string;
	email: string;
	password: string;
}

export const Register = () => {
	const [, setLoading] = useState(false);
	const [response, setResponse] = useState<ServerResponse>('');

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			nickname: '',
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<RegisterFormTypes> = async data => {
		setLoading(true);

		await fetch('http://localhost:3000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ nickname: data.nickname, email: data.email, password: data.password }),
			credentials: 'include',
		})
			.then(res => res.json())
			.then(response => {
				console.log(response);
				console.log(Cookies.get('user'))
				setResponse(response);
			})
			.catch(ex => console.log(ex));
	};

	return (
		<>
			<div className={styles.background} />
			<header className={styles.header}>
				<h1 className={styles['header__title']}>Zarejestruj się</h1>
			</header>
			<main className={styles.register}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div>
						<Controller
							name='nickname'
							control={control}
							rules={{ required: true, minLength: 3 }}
							render={({ field }) => <FormInput label='Nazwa użytkownika' {...field} />}
						/>
						{errors.nickname?.type === 'minLength' && <Error message='Nazwa użytkownika jest zbyt krótka' />}
						{errors.nickname?.type === 'required' && <Error message='Nazwa użytkownika jest wymagana' />}
					</div>
					<div>
						<Controller
							name='email'
							control={control}
							rules={{ pattern: EMAIL_REGEX, required: true }}
							render={({ field }) => <FormInput label='E-mail' {...field} />}
						/>
						{errors.email?.type === 'pattern' && <Error message='E-mail jest nieprawidłowy' />}
						{errors.email?.type === 'required' && <Error message='E-mail jest wymagany' />}
					</div>
					<div>
						<Controller
							name='password'
							control={control}
							rules={{ minLength: 6, required: true }}
							render={({ field }) => <FormInput label='Hasło' {...field} />}
						/>
						{errors.password?.type === 'minLength' && <Error message='Hasło jest zbyt krótkie' />}
						{errors.password?.type === 'required' && <Error message='Hasło jest wymagane' />}
						{typeof response === 'object' && <Error message={response.message} />}
					</div>
					<SubmitButton variant='primary'>Zarejestruj</SubmitButton>
				</form>
			</main>
		</>
	);
};
