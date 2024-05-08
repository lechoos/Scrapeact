import { ChangeEvent, Dispatch, SetStateAction, useState, useEffect } from 'react';
import styles from './profile.module.scss';
import { User } from '../../types/User';
import Cookies from 'js-cookie';

type Data = {
	name: string;
	phone: string;
	link: string;
};

type Company = {
	company: Data;
	setGlobalData: Dispatch<SetStateAction<{ name: string; phone: string; link: string }[]>>;
};

const DATA = [
	{
		name: 'Salon ABC',
		phone: '723 741 772',
		link: 'https://google.com',
	},
	{
		name: 'Mix Garage',
		phone: '605029321',
		link: 'https://google.com',
	},
	{
		name: 'Sklep z kurwami',
		phone: '723 740 700',
		link: 'https://google.com',
	},
	{
		name: 'SysCompany',
		phone: '989896123',
		link: 'https://google.com',
	},
];

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
	const [data, setData] = useState(DATA);
  const [user, setUser] = useState<User>();

  const id = Cookies.get('user')?.split('"')[1];

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
				.then(response => setUser(response));
		};

		fetchUser();
	}, [id]);

	return (
		<div className='wrapper'>
			<header className={styles.header}>
				<div className={styles.info}>
					<h2 className={styles.title}>{user?.nickname}</h2>
          <div className={styles.divider} />
					<p className={styles.email}>{user?.email}</p>
				</div>
				<p className={styles.saved}>Zapisanych kontaktów: {data.length}</p>
			</header>
			<main className={styles.companies}>
				{data.map(company => (
					<Company setGlobalData={setData} key={company.name + company.phone} company={company} />
				))}
			</main>
      <p className={styles.alert}>Wyświetl aplikację na komputerze, by zobaczyć tabelę z zapisanymi kontaktami</p>
		</div>
	);
};
