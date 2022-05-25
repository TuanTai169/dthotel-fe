import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';
import Layout from './components/Layout';
import Admin from './containers/Admin';
import Home from './containers/Home';
import Login from './containers/Admin/Login';
import ForgotPassword from './containers/Admin/Login/ForgotPassword';
import ResetPassword from './containers/Admin/Login/ResetPassword';
import ProtectedRoute from './routing/ProtectedRoute';
import BookingPage from './containers/Home/Booking';
import RoomDetail from './containers/Home/RoomDetail';
import ServicesPage from './containers/Home/Services';
import GalleryPage from './containers/Home/Gallery';
import AboutPage from './containers/Home/AboutUs';
import BlogsPage from './containers/Home/Blogs';
import TransferPage from './containers/Home/Footer/Information/Transfers';
import MapPage from './containers/Home/Footer/Information/Map';
import ContactPage from './containers/Home/Footer/Information/Contact';
import BookandCancelPolicyPage from './containers/Home/Footer/Terms/Booking_Cancelation';
import PrivacyPage from './containers/Home/Footer/Terms/Privacy';
import WebsiteTermPage from './containers/Home/Footer/Terms/Website';

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
					<Route
						path='/admin/*'
						element={<Admin />}
						exact
					></Route>
					<Route path='/rooms' element={<BookingPage />} />
					<Route
						path='/rooms-detail'
						element={<RoomDetail />}
					/>
					<Route
						path='/services'
						element={<ServicesPage />}
					/>
					<Route
						path='/gallery'
						element={<GalleryPage />}
					/>
					<Route path='/about-us' element={<AboutPage />} />
					<Route path='/blogs' element={<BlogsPage />} />
					<Route
						path='/transfer'
						element={<TransferPage />}
					/>
					<Route path='/map' element={<MapPage />} />
					<Route
						path='/privacy'
						element={<PrivacyPage />}
					/>
					<Route
						path='/book-cancel'
						element={<BookandCancelPolicyPage />}
					/>
					<Route
						path='/web-term'
						element={<WebsiteTermPage />}
					/>
					<Route
						path='/contact'
						element={<ContactPage />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
