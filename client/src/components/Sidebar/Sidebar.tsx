import { useEffect } from 'react';
import styles from './sidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '../LinkButton/LinkButton';
import { User } from '../../types/User';

interface SidebarTypes {
	isOpen: boolean;
	user: User;
}

export const Sidebar = ({ isOpen, user }: SidebarTypes) => {
	const navigate = useNavigate();
	const isSidebarOpen = isOpen && styles.active;

	const onClickHandler = async () => {
		await fetch('https://scrapeact-api.vercel.app/logout', {
			method: 'GET',
			credentials: 'include',
		})
			.then(() => {
				console.log('Wylogowano');
				navigate('/');
			})
			.catch(ex => console.log(ex));
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
				<p className={styles.nick}>{user?.nickname}</p>
				<p className={styles.email}>{user?.email}</p>
				<Button onClick={onClickHandler}>Wyloguj</Button>
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
