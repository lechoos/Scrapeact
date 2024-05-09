import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { Register } from './pages/Register/Register';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { Home } from './pages/Home/Home';
import { Settings } from './pages/Settings/Settings';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

const App = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<PublicRoute>
						<Home />
					</PublicRoute>
				}
			/>
			<Route
				path='/zaloguj'
				element={
					<PublicRoute>
						<Login />
					</PublicRoute>
				}
			/>
			<Route
				path='/zarejestruj'
				element={
					<PublicRoute>
						<Register />
					</PublicRoute>
				}
			/>
			<Route
				path='/app'
				element={
					<PrivateRoute>
						<Main />
					</PrivateRoute>
				}
			/>
			<Route
				path='/profil'
				element={
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				}
			/>
			<Route
				path='/ustawienia'
				element={
					<PrivateRoute>
						<Settings />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};

export default App;
