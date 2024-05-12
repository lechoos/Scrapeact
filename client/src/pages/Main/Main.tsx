import { useState, useEffect } from 'react';
import styles from './main.module.scss';
import { Contact } from '../../types/Contact';
import { User } from '../../types/User';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { ContactsTable } from '../../components/ContactsTable/ContactsTable';
import { MapsForm } from '../../components/MapsForm/Form';
import { Footer } from '../../components/Footer/Footer';

import Cookies from 'js-cookie';

export const Main = () => {
	const [data, setData] = useState<Contact[]>([]);
	const [user, setUser] = useState<User>();
	const [active, setActive] = useState(false);

	const isActive = active && 'is-active';

	const onClickHandler = () => {
		setActive(prev => !prev);
	};

	const id = Cookies.get('user');

	useEffect(() => {
		const fetchUser = async () => {
			await fetch(`${import.meta.env.VITE_SERVER}/user`, {
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
		<>
			<Sidebar user={user as User} isOpen={active} />
			<div className='wrapper'>
				<button onClick={onClickHandler} className={`${styles.button} hamburger hamburger--arrow ${isActive}`}>
					<span className='hamburger-box'>
						<span className='hamburger-inner' />
					</span>
				</button>
				<header className={`${styles.header} p-1`}>
					<h1 className={styles['header__title']}>Cześć {user?.nickname}</h1>
					<p className={styles['header__text']}>
						Wklej link do Google Maps, który chcesz zeskanować. My zajmiemy się resztą :)
					</p>
				</header>
				<main>
					<MapsForm setData={setData} />
					{Array.isArray(data) && data.length > 0 ? (
						<div className='p-1'>
							<ContactsTable
								data={data?.map(contact => ({
									...contact,
									uuid: Math.random().toString(36).substring(2, 15),
								}))}
							/>
						</div>
					) : null}
				</main>
				<Footer />
			</div>
		</>
	);
};
