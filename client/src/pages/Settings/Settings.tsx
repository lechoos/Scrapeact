import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './settings.module.scss';
import { ServerResponse } from '../../types/Server';
import { User } from '../../types/User';
import Cookies from 'js-cookie';
import { FormInput } from '../../components/FormInput/FormInput';
import { SubmitButton, Button } from '../../components/LinkButton/LinkButton';
import { Error, Success } from '../../components/Error/Error';
import { EMAIL_REGEX, USERNAME_REGEX } from '../../../utils/regex';

interface EditFormTypes {
	nickname?: string;
	email?: string;
	password?: string;
}

export const Settings = () => {
	const [user, setUser] = useState<User>();
	const [response, setResponse] = useState<ServerResponse>();

	const id = Cookies.get('user')?.split('"')[1] as string;

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<EditFormTypes>();

	const onSubmit: SubmitHandler<EditFormTypes> = async data => {
		const userToUpdate: User = {
			_id: id,
			nickname: data.nickname,
			email: data.email,
			password: data.password,
		};

		await fetch('http://localhost:3000/edit-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userToUpdate),
		})
			.then(res => res.json())
			.then(response => {
				setResponse(response);
			});
	};

	useEffect(() => {
		const fetchUser = async () => {
			await fetch('http://localhost:3000/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: id }),
			})
				.then(res => res.json())
				.then(response => {
					setUser(response);

					setValue('nickname', user?.nickname);
					setValue('email', user?.email);
					setValue('password', user?.password);
				})
				.catch(ex => console.log(ex));
		};

		fetchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, setValue]);

	useEffect(() => {
		if (user) {
			reset({
				nickname: user.nickname,
				email: user.email,
				password: user.password,
			});
		}
	}, [user, reset]);

	return (
		<>
			<div className={styles.background} />
			<div className='wrapper'>
				<div className={styles.settings}>
					<div className={styles.edit}>
						<h2 className={styles.subtitle}>Edytuj</h2>
						<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
							<div>
								<Controller
									name='nickname'
									control={control}
									rules={{ required: true, minLength: 3, pattern: USERNAME_REGEX }}
									render={({ field }) => <FormInput label='Nazwa użytkownika' {...field} />}
								/>
								{errors.nickname?.type === 'pattern' && (
									<Error message='Nazwa użytkownika może składać się tylko z liter i cyfr' />
								)}
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
									render={({ field }) => <FormInput label='Hasło' {...field} value='' />}
								/>
								{errors.password?.type === 'minLength' && <Error message='Hasło jest zbyt krótkie' />}
								{errors.password?.type === 'required' && <Error message='Hasło jest wymagane' />}
								{typeof response === 'object' && <Error message={response.message} />}
								{typeof response === 'string' && <Success message={response} />}
							</div>
							<SubmitButton variant='secondary'>Zapisz</SubmitButton>
						</form>
					</div>
					<div className={styles.delete}>
						<h2 className={styles.subtitle}>Usuń konto</h2>
						<Button>Usuń konto</Button>
					</div>
				</div>
			</div>
		</>
	);
};
