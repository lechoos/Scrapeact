import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './login.module.scss';
import { ServerResponse } from '../../types/Server';
import { FormInput } from '../../components/FormInput/FormInput';
import { Error } from '../../components/Error/Error';
import { SubmitButton } from '../../components/LinkButton/LinkButton';
import { EMAIL_REGEX } from '../../../utils/regex';

import Cookies from 'js-cookie';

interface LoginTypes {
	email: string;
	password: string;
}

export const Login = () => {
	const [response, setResponse] = useState<ServerResponse>('');

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<LoginTypes> = async data => {
		await fetch('http://localhost:3000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: data.email, password: data.password }),
			credentials: 'include',
		})
			.then(res => res.json())
			.then(response => {
				console.log(response);
				console.log(Cookies.get('user'));
				setResponse(response);
				navigate('/app');
			})
			.catch(ex => console.log(ex));
	};

	return (
		<>
			<header>
				<h1 className={styles['header__title']}>Zaloguj się</h1>
			</header>
			<main>
				<div className={styles['login__background']} />
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
					</div>
					{typeof response === 'object' && <Error message={response.message} />}
					<SubmitButton variant='primary'>Zaloguj</SubmitButton>
				</form>
			</main>
		</>
	);
};
