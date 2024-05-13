export interface User {
	_id?: string;
	nickname?: string;
	email?: string;
	password?: string;
}

export interface LoggedUser extends User {
	accessToken: string;
	isLoggedIn: boolean;
	isInitialized?: boolean;
}