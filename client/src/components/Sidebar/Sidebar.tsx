import styles from './sidebar.module.scss';

interface SidebarTypes {
	isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarTypes) => {
	const isSidebarOpen = isOpen && styles.active;

	return (
		<div className={`${styles.sidebar} ${isSidebarOpen}`}>
			<div className={styles['sidebar__top']}>
        <p className={styles.nick}>Lechoś0810</p>
        <p className={styles.email}>ptrlechowicz@gmail.com</p>
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
