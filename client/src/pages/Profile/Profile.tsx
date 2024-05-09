import { ChangeEvent, Dispatch, SetStateAction, useState, useEffect } from 'react';
import styles from './profile.module.scss';
import { User } from '../../types/User';
import Cookies from 'js-cookie';
import { Contact } from '../../types/Contact';
import { LottieAnimation } from '../../components/LottieAnimation/LottieAnimation';
import animationData from '../../lotties/loading.json';
import { Error } from '../../components/Error/Error';

type Company = {
	company: Contact;
	setGlobalData: Dispatch<SetStateAction<Contact[]>>;
};

const id = Cookies.get('user')?.split('"')[1];

const Company = ({ company, setGlobalData }: Company) => {
	const [data, setData] = useState(company);
	const [originalData, setOriginalData] = useState(company);
	const [errorMsg, setErrorMsg] = useState('');
	const [wasEdited, setWasEdited] = useState(false);

	const isDataChanged = (data1: Contact, data2: Contact) => {
		return JSON.stringify(data1) !== JSON.stringify(data2);
	};

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleClick = async (contact: Contact) => {
		await fetch(`http://localhost:3000/${contact.uuid}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => {
				if (res.status === 202) {
					setGlobalData(prev => prev.filter(comp => comp.link !== contact.link));
					return res.json();
				} else if (res.status === 400 && typeof res.json() === 'object') {
					console.log(res);

					setErrorMsg('Nie udało się zapisać kontaktu');
				}
			})
			.catch(ex => console.log(ex));
	};

	const handleSave = async () => {
		if (data.name === '' || data.phone.replace(/\s/g, '').length < 9) {
			return setErrorMsg(
				'Zapisywane dane są nieprawidłowe (nazwa firmy nie może być pusta, a numer telefonu mieć mniej niż 9 znaków)'
			);
		} else {
			setErrorMsg('');
		}

		const response = await fetch(`http://localhost:3000/update-contacts/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			return setErrorMsg('Nie udało się zaktualizować danych');
		}

		setWasEdited(false);
		setOriginalData(data);
	};

	useEffect(() => {
		if (isDataChanged(data, originalData)) {
			setWasEdited(true);
		} else {
			setWasEdited(false);
		}
	}, [data, originalData]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setErrorMsg('');
		}, 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [errorMsg]);

	return (
		<div className={styles.company}>
			{!errorMsg ? (
				<>
					<input onChange={e => handleChange(e)} className={styles.input} type='text' value={data.name} name='name' />
					<input onChange={e => handleChange(e)} className={styles.input} type='text' value={data.phone} name='phone' />
					<span>
						<a target='_blank' rel='noopener noreferrer' className={styles.link} href={data.link}>
							Link
						</a>
					</span>
					<button onClick={() => handleClick(company)} className={styles.button} />
					{wasEdited && <button onClick={handleSave}>Zapisz</button>}
				</>
			) : (
				<Error message={errorMsg} />
			)}
		</div>
	);
};

export const Profile = () => {
	const [data, setData] = useState<Contact[]>([{ name: '', link: '', phone: '', ownerId: '' }]);
	const [user, setUser] = useState<User>();
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const showError = () => {
		if (errorMsg.length !== 0) {
			return <Error message={errorMsg} />;
		} else {
			return null;
		}
	};

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);

			await fetch('http://localhost:3000/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: id }),
			})
				.then(res => res.json())
				.then(response => setUser(response))
				.catch(ex => setErrorMsg(ex.message));

			setTimeout(() => {
				setLoading(false);
			}, 3000);
		};

		fetchUser();
	}, []);

	useEffect(() => {
		const fetchContacts = async () => {
			setLoading(true);

			await fetch(`http://localhost:3000/contacts/${id}`)
				.then(res => res.json())
				.then(resJson => setData(resJson))
				.catch(ex => {
					console.log(ex);
					setErrorMsg('Nie udało się pobrać kontaktów');
				});

			setTimeout(() => {
				setLoading(false);
			}, 3000);
		};

		fetchContacts();
	}, []);

	return (
		<div className='wrapper'>
			{loading ? (
				<LottieAnimation classes={styles.lottie} animationData={animationData} />
			) : (
				<>
					{showError()}
					<header className={styles.header}>
						<div className={styles.info}>
							<h2 className={styles.title}>{user?.nickname}</h2>
							<div className={styles.divider} />
							<p className={styles.email}>{user?.email}</p>
						</div>
						<p className={styles.saved}>Zapisanych kontaktów: {data?.length}</p>
					</header>
					<main className={styles.companies}>
						{data &&
							(data as Contact[]).map(company => (
								<Company setGlobalData={setData} key={company.name + company.phone + company.link} company={company} />
							))}
					</main>
					<p className={styles.alert}>Wyświetl aplikację na komputerze, by zobaczyć tabelę z zapisanymi kontaktami</p>
				</>
			)}
		</div>
	);
};
