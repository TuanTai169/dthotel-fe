import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

import LandingPage from './LandingPage';
import BookingPage from './Room';
import RoomDetail from './RoomDetail';
import ServicesPage from './Services';
import GalleryPage from './Gallery';
import AboutPage from './AboutUs';
import BlogsPage from './Blogs';
import TransferPage from './Footer/Information/Transfers';
import MapPage from './Footer/Information/Map';
import ContactPage from './Footer/Information/Contact';
import BookandCancelPolicyPage from './Footer/Terms/Booking_Cancelation';
import PrivacyPage from './Footer/Terms/Privacy';
import WebsiteTermPage from './Footer/Terms/Website';

import './index.scss';
import { Link, Route, Routes } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';

const Home = () => {
	return (
		<div className='home'>
			<Navbar />
			<ScrollToTop smooth color='$dark-blue' style={{ backgroundColor: '#ffce6a' }} />
			<div className='container'>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='rooms' element={<BookingPage />} />
					<Route path='rooms-detail' element={<RoomDetail />} />
					<Route path='services' element={<ServicesPage />} />
					<Route path='gallery' element={<GalleryPage />} />
					<Route path='about-us' element={<AboutPage />} />
					<Route path='blogs' element={<BlogsPage />} />
					<Route path='transfer' element={<TransferPage />} />
					<Route path='map' element={<MapPage />} />
					<Route path='privacy' element={<PrivacyPage />} />
					<Route path='book-cancel' element={<BookandCancelPolicyPage />} />
					<Route path='web-term' element={<WebsiteTermPage />} />
					<Route path='contact' element={<ContactPage />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
