import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BookingPage from './Booking';

const Home = () => {
	return (
		<div className='home'>
			<Routes>
				<Route path='/rooms' element={<BookingPage />} exact />
			</Routes>

			<ToastContainer autoClose={3000} theme='colored' />
		</div>
	);
};

export default Home;
