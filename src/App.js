import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Admin from './containers/Admin';
import Home from './containers/Home';
import NotFound from './components/Common/NotFound';

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
					<Route path='/*' element={<Home />} />
					<Route path='/admin/*' element={<Admin />} exact></Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
			<ToastContainer autoClose={3000} theme='colored' />
		</>
	);
}

export default App;
