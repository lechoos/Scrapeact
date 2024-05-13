import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoggedUser } from '../../types/User';

const initialState: LoggedUser = {
	nickname: '',
	email: '',
	_id: '',
	accessToken: '',
	isLoggedIn: false,
	isInitialized: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (_state, action: PayloadAction<{ user: LoggedUser }>) => {
			const { user } = action.payload;
			localStorage.setItem('user', JSON.stringify(user));

			return { ...user, isInitialized: true };
		},
		logout: () => {
			localStorage.removeItem('user');

			return { ...initialState, isInitialized: true };
		},
		updateUser: (state, action: PayloadAction<{ user: Partial<LoggedUser> }>) => {
			const { user } = action.payload;
			localStorage.setItem('user', JSON.stringify({ ...state, ...user }));

			return { ...state, ...user };
		},
		initUser: state => {
			const userFromLocalStorage = localStorage.getItem('user');
			if (userFromLocalStorage) {
				const parsedUser = JSON.parse(userFromLocalStorage);
				return { ...parsedUser, isInitialized: true };
			} else {
				return { ...state, isInitialized: true };
			}
		},
	},
});

export const { login, logout, updateUser, initUser } = userSlice.actions;

export default userSlice.reducer;
