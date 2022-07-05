import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import i18next from 'i18next';

import Admin from './containers/Admin';
import Home from './containers/Home';
import NotFound from './components/Common/NotFound';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

const language = localStorage.getItem('language') || 'en';
i18next.changeLanguage(language);
// axios.defaults.headers.common['Accept-Language'] = localStorage.getItem('language') || 'en';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/*' element={<Home />} />
					<Route path='/admin/*' element={<Admin />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
			<ToastContainer autoClose={3000} theme='colored' />
		</>
	);
}

export default App;
