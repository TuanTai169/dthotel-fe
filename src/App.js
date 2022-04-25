import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Admin from './containers/Admin';
import Home from './containers/Home';
import Login from './containers/Admin/Login';
import ForgotPassword from './containers/Admin/Login/ForgotPassword';
import ResetPassword from './containers/Admin/Login/ResetPassword';
import ProtectedRoute from './routing/ProtectedRoute';

import { loadUser } from './redux/actions/auth';
import { useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
	const dispatch = useDispatch();
	useEffect(() => dispatch(loadUser()), [dispatch]);

	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} exact />
					<Route path='/admin/*' element={<Admin />} exact></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
