import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../state/store';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { logout, updateUser } from '../../state/user/userSlice';
import styles from './settings.module.scss';
import { ServerResponse } from '../../types/Server';
import { User } from '../../types/User';
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
	const [response, setResponse] = useState<ServerResponse>();
	const user = useSelector((state: RootState) => state.user);

	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<EditFormTypes>({
		defaultValues: {
			nickname: user.nickname,
			email: user.email,
			password: '',
		},
	});

	const onSubmit: SubmitHandler<EditFormTypes> = async data => {
		const userToUpdate: User = {
			_id: user._id,
			nickname: data.nickname,
			email: data.email,
			password: data?.password,
		};

		await fetch(`${import.meta.env.VITE_SERVER}/edit-user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userToUpdate),
		})
			.then(res => res.json())
			.then(response => {
				setResponse(response);
				dispatch(updateUser({ user: userToUpdate }))
			});
	};

	const onDelete = async () => {
		await fetch(`${import.meta.env.VITE_SERVER}/delete-user`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ _id: user._id }),
		})
			.then(res => res.json())
			.then(response => {
				if (typeof response === 'string') {
					dispatch(logout());
					navigate('/');
				} else {
					console.log('Wystąpił błąd');
				}
			});
	};

	useEffect(() => {
		if (user) {
			reset({
				nickname: user.nickname,
				email: user.email,
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
									rules={{ minLength: 6 }}
									render={({ field }) => <FormInput label='Hasło' {...field} />}
								/>
								{errors.password?.type === 'minLength' && <Error message='Hasło jest zbyt krótkie' />}
								{typeof response === 'object' && <Error message={response.message} />}
								{typeof response === 'string' && <Success message={response} />}
							</div>
							<SubmitButton testID='settings-submit' variant='secondary'>Zapisz</SubmitButton>
						</form>
					</div>
					<div className={styles.delete}>
						<h2 className={styles.subtitle}>Usuń konto</h2>
						<Button testID='settings-delete' onClick={onDelete}>Usuń konto</Button>
					</div>
				</div>
			</div>
		</>
	);
};
