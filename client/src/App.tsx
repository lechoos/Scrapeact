import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { Register } from './pages/Register/Register';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { Home } from './pages/Home/Home';
import { Settings } from './pages/Settings/Settings';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/app' element={<Main />} />
			<Route path='/zarejestruj' element={<Register />} />
			<Route path='/zaloguj' element={<Login />} />
			<Route path='/profil' element={<Profile />} />
			<Route path='/ustawienia' element={<Settings />} />
		</Routes>
	);
};

export default App;
