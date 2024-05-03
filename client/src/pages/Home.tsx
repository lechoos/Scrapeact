import { useState } from 'react';
import styles from './home.module.scss'
import { Contact } from '../types/Contact';
import { ContactsTable } from '../components/ContactsTable/ContactsTable'; 
import { Form } from '../components/Form/Form';
import { Footer } from '../components/Footer/Footer';

export const Home = () => {
	const [data, setData] = useState<Contact[]>([]);

	return (
		<>
			<div className='wrapper'>
				<header className={`${styles.header} p-1`}>
					<h1 className={styles['header__title']}>Scrapeact</h1>
					<p className={styles['header__text']}>Wklej link do Google Maps, który chcesz zeskanować. My zajmiemy się resztą :)</p>
				</header>
				<main>
					<Form setData={setData} />
					{data.length > 0 ? (
						<>
							<div className='p-1'>
								<ContactsTable data={data.map(contact =>({
                  ...contact, 
                  uuid: Math.random().toString(36).substring(2, 15),
                }))} />
							</div>
							<p className={styles.warning}>Otwórz aplikację na komputerze, by uzyskać dostęp do tabeli.</p>
						</>
					) : (
						''
					)}
				</main>
				<Footer />
			</div>
		</>
	);
};
