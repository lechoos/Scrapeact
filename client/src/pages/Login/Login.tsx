import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { AppDispatch, RootState } from '../../state/store';
import { login } from '../../state/user/userSlice';
import styles from './login.module.scss';
import { LoggedUser } from '../../types/User';
import { ServerResponse } from '../../types/Server';
import { FormInput } from '../../components/FormInput/FormInput';
import { Error } from '../../components/Error/Error';
import { SubmitButton } from '../../components/LinkButton/LinkButton';
import { EMAIL_REGEX } from '../../../utils/regex';


interface LoginTypes {
	email: string;
	password: string;
}

export const Login = () => {
	const [response, setResponse] = useState<ServerResponse | LoggedUser>('');
	const dispatch = useDispatch<AppDispatch>();

	const user = useSelector((state: RootState) => state.user);

	console.log(user);

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
		await fetch(`${import.meta.env.VITE_SERVER}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: data.email, password: data.password }),
			credentials: 'include',
		})
			.then(res => res.json())
			.then(async response => {
				setResponse(response);

				console.log(response);

				const loggedUser: LoggedUser = {
					nickname: response._doc.nickname,
					email: response._doc.email,
					_id: response.id,
					accessToken: response.accessToken,
					isLoggedIn: true,
				}

				await dispatch(login({ user: loggedUser }));

				if (user._id) {
					navigate('/app');
				}







				// Cookies.set('access-token', response.accessToken, { expires: 30 });
				// Cookies.set('user', response.id, { expires: 30 });
				// console.log(Cookies.get('access-token'));
				// console.log(Cookies.get('user'));
				// setResponse(response);
				// navigate('/app');
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
					{typeof response === 'object' && 'message' in response && <Error message={response.message} />}
					<SubmitButton variant='primary'>Zaloguj</SubmitButton>
				</form>
			</main>
		</>
	);
};
