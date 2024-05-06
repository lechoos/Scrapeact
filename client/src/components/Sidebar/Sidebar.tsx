import { useEffect } from 'react';
import styles from './sidebar.module.scss';
import { useNavigate } from 'react-router-dom';

interface SidebarTypes {
	isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarTypes) => {
	const navigate = useNavigate();
	const isSidebarOpen = isOpen && styles.active;

	const onClickHandler = async () => {
		await fetch('http://localhost:3000/logout', {
			method: "GET",
			credentials: 'include',
		}).then(() => {
			console.log('Wylogowano');
			navigate('/');
		}).catch(ex => console.log(ex));
	};

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('sticky-body');
		} else {
			document.body.classList.remove('sticky-body');
		}

		return () => {
			document.body.classList.remove('sticky-body');
		};
	}, [isOpen]);

	return (
		<div className={`${styles.sidebar} ${isSidebarOpen}`}>
			<div className={styles['sidebar__top']}>
				<p className={styles.nick}>Lechoś0810</p>
				<p className={styles.email}>ptrlechowicz@gmail.com</p>
				<button onClick={onClickHandler}>Wyloguj</button>
			</div>
			<div className={styles['sidebar__bottom']}>
				<a className={styles.link} href='/profil'>
					Profil
				</a>
				<a className={styles.link} href='/ustawienia'>
					Ustawienia
				</a>
			</div>
		</div>
	);
};
