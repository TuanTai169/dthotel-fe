import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './containers/Admin';
import Home from './containers/Home';
import BookingPage from './containers/Home/Room';
import ServicesPage from './containers/Home/Services';
import GalleryPage from './containers/Home/Gallery';
import AboutPage from './containers/Home/AboutUs';
import BlogsPage from './containers/Home/Blogs';

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
					<Route path='/rooms' element={<BookingPage />} />
					<Route path='/services' element={<ServicesPage />} />
					<Route path='/gallery' element={<GalleryPage />} />
					<Route path='/about-us' element={<AboutPage />} />
					<Route path='/blogs' element={<BlogsPage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
