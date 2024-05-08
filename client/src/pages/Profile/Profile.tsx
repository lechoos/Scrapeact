import { ChangeEvent, Dispatch, SetStateAction, useState, useEffect } from 'react';
import styles from './profile.module.scss';
import { User } from '../../types/User';
import Cookies from 'js-cookie';
import { Contact } from '../../types/Contact';
import { LottieAnimation } from '../../components/LottieAnimation/LottieAnimation';
import animationData from '../../lotties/loading.json';

type Company = {
	company: Contact;
	setGlobalData: Dispatch<SetStateAction<Contact[]>>;
};

const Company = ({ company, setGlobalData }: Company) => {
	const [data, setData] = useState(company);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleClick = (name: string) => {
		setGlobalData(prev => prev.filter(comp => comp.name !== name));
	};

	return (
		<div className={styles.company}>
			<input onChange={e => handleChange(e)} className={styles.input} type='text' value={data.name} name='name' />
			<input onChange={e => handleChange(e)} className={styles.input} type='text' value={data.phone} name='phone' />
			<input onChange={e => handleChange(e)} className={styles.input} type='text' value={data.link} name='link' />
			<button onClick={() => handleClick(company.name)} className={styles.button} />
		</div>
	);
};

export const Profile = () => {
	const [data, setData] = useState<Contact[]>([{ name: '', link: '', phone: '', ownerId: '' }]);
	const [user, setUser] = useState<User>();
	const [loading, setLoading] = useState(false);

	const id = Cookies.get('user')?.split('"')[1];

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
	}, [id]);

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
	}, [id]);

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
								<Company setGlobalData={setData} key={company.name + company.phone} company={company} />
							))}
					</main>
					<p className={styles.alert}>Wyświetl aplikację na komputerze, by zobaczyć tabelę z zapisanymi kontaktami</p>
				</>
			)}
		</div>
	);
};
