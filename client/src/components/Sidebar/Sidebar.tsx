import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { logout } from '../../state/user/userSlice';
import styles from './sidebar.module.scss';
import { Button } from '../LinkButton/LinkButton';
import { User } from '../../types/User';
import { useNavigate } from 'react-router-dom';

interface SidebarTypes {
	isOpen: boolean;
	user: User;
}

export const Sidebar = ({ isOpen, user }: SidebarTypes) => {
	const dispatch = useDispatch<AppDispatch>();
	const isSidebarOpen = isOpen && styles.active;

	const navigate = useNavigate();

	const onClickHandler = async () => {
		dispatch(logout());
		navigate('/');
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
