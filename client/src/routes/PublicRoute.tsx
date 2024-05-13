import { ReactNode, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { Loader } from '../components/Loader/Loader';

interface RouteTypes {
	redirectTo?: string;
	children: ReactNode;
}

export default function PublicRoute({ redirectTo = '/app', children }: RouteTypes) {
	const { isLoggedIn, isInitialized } = useSelector((state: RootState) => state.user);
	const [isReady, setIsReady] = useState(isInitialized);

	useEffect(() => {
		setIsReady(isInitialized);
	}, [isInitialized]);

	if (!isReady) {
		return <Loader loading={!isReady} />
	}

	if (isLoggedIn) {
		return <Navigate to={redirectTo} />;
	}
	return children ? children : <Outlet />;
}
