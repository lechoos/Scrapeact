import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import styles from './profile.module.scss';
import { Contact } from '../../types/Contact';
import { Company } from '../../components/Company/Company';
import { Loader } from '../../components/Loader/Loader';
import { Error } from '../../components/Error/Error';

export const Profile = () => {
	const [data, setData] = useState<Contact[]>([{ name: '', link: '', phone: '', ownerId: '' }]);
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const user = useSelector((state: RootState) => state.user);

	const showError = () => {
		if (errorMsg.length !== 0) {
			return <Error message={errorMsg} />;
		} else {
			return null;
		}
	};

	useEffect(() => {
		const fetchContacts = async () => {
			setLoading(true);

			await fetch(`${import.meta.env.VITE_SERVER}/contacts/${user._id}`)
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
	}, [user._id]);

	return (
		<div className='wrapper'>
			{loading ? (
				<Loader loading={loading} />
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
