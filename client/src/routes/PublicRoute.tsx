import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

interface RouteTypes {
	redirectTo?: string;
	children: ReactNode;
}

export default function PublicRoute({ redirectTo = '/app', children }: RouteTypes) {
	if (Cookies.get('user')) {
		return <Navigate to={redirectTo} />;
	}
	return children ? children : <Outlet />;
}
