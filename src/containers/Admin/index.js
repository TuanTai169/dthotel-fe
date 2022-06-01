import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../../routing/ProtectedRoute';
import Layout from '../../components/Layout';
import Login from './Login';
import ForgotPassword from './Login/ForgotPassword';
import ResetPassword from './Login/ResetPassword';
import './styles.scss';

const Admin = () => {
	return (
		<div className='admin'>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route
					path='/*'
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				></Route>

				<Route path='forgot-password' element={<ForgotPassword />} />
				<Route path='reset-password/:token' element={<ResetPassword />} />
			</Routes>
		</div>
	);
};

export default Admin;
