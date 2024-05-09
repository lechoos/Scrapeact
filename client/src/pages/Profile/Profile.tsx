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
	const [originalData] = useState(company);
	const [errorMsg, setErrorMsg] = useState('');
	const [wasEdited, setWasEdited] = useState(false);

	const isDataChanged = (data1: Contact, data2: Contact) => {
		return JSON.stringify(data1) !== JSON.stringify(data2);
	};

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		// setData(prevData => ({
		// 	...prevData,
		// 	[name]: value,
		// }));

		setData(prevData => ({
			...prevData,
			[name]: value,
		}));

		// console.group('Contact data');
		// console.log(data.name);
		// console.log(data.phone);
		// console.log(originalData.name);
		// console.log(originalData.phone);
		// console.groupEnd();
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
				} else {
					setErrorMsg('Nie udało się usunąć kontaktu');
				}
			})
			.catch(ex => console.log(ex));
	};

	const handleSave = async () => {
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

		return console.log('Zapisano');
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
				.then(response => setUser(response));

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
				.catch(ex => console.log(ex));

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
