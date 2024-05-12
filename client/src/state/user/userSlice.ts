import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

interface LoggedUser extends User {
	accessToken?: string;
}

const initialState: LoggedUser = {
	nickname: '',
	email: '',
	_id: '',
	accessToken: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (_state, action: PayloadAction<{ user: LoggedUser }>) => {
			return { ...action.payload.user };
		},
		logout: () => {
			return { ...initialState };
		},
    updateUser: (state, action: PayloadAction<{ user: Partial<LoggedUser> }>) => {
      return { ...state, ...action.payload.user }
    }
	},
});

export default userSlice.reducer;
