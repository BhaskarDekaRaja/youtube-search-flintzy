import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, history, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				return sessionStorage.getItem('loggedIn') === 'true' ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				);
			}}
		/>
	);
};

export default PrivateRoute;