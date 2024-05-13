import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import styles from './main.module.scss';
import { Contact } from '../../types/Contact';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { ContactsTable } from '../../components/ContactsTable/ContactsTable';
import { MapsForm } from '../../components/MapsForm/Form';
import { Footer } from '../../components/Footer/Footer';

export const Main = () => {
	const [data, setData] = useState<Contact[]>([]);
	const [active, setActive] = useState(false);
	const user = useSelector((state: RootState) => state.user)

	const isActive = active && 'is-active';

	const onClickHandler = () => {
		setActive(prev => !prev);
	};

	return (
		<>
			<Sidebar user={user} isOpen={active} />
			<div className='wrapper'>
				<button onClick={onClickHandler} className={`${styles.button} hamburger hamburger--arrow ${isActive}`}>
					<span className='hamburger-box'>
						<span className='hamburger-inner' />
					</span>
				</button>
				<header className={`${styles.header} p-1`}>
					<h1 className={styles['header__title']}>Cześć {user.nickname}</h1>
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
