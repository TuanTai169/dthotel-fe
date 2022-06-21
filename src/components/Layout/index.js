import React, { useEffect } from 'react';
import './layout.scss';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import themeAction from '../../redux/actions/theme';
import Sidebar from '../Sidebar';
import TopNav from '../Topnav';
import NotFound from '../Common/NotFound';

import Dashboard from '../../containers/Admin/Dashboard';
import Customers from '../../containers/Admin/Customer';
import Services from '../../containers/Admin/Service';
import Rooms from '../../containers/Admin/Room';
import Users from '../../containers/Admin/User';
import Profile from '../../containers/Admin/Profile';
import Receipt from '../../containers/Admin/Receipt';
import Statistics from '../../containers/Admin/Statistic';
import About from '../../containers/Admin/About';

import { getAllBooking } from '../../redux/actions/booking';
import { getAllCustomer } from '../../redux/actions/customer';
import { getAllRoom } from '../../redux/actions/room';
import { getAllService } from '../../redux/actions/service';
import { getAllUser } from '../../redux/actions/user';
import { getAllReceipt } from '../../redux/actions/receipt';
import { getAllTypes } from '../../redux/actions/typeOfRoom';
import { getAllConveniences } from '../../redux/actions/convenience';
import { getAllCoupon } from './../../redux/actions/coupon';
import { getStatistic } from './../../redux/actions/receipt';

const Layout = () => {
	const themeReducer = useSelector((state) => state.themeReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		const themeClass = localStorage.getItem('themeMode', 'theme-mode-light');
		const colorClass = localStorage.getItem('colorMode', 'theme-mode-light');
		dispatch(themeAction.setMode(themeClass));
		dispatch(themeAction.setColor(colorClass));
		dispatch(getAllRoom());
		dispatch(getAllCustomer());
		dispatch(getAllBooking());
		dispatch(getAllService());
		dispatch(getAllUser());
		dispatch(getAllReceipt());
		dispatch(getAllTypes());
		dispatch(getAllConveniences());
		dispatch(getAllCoupon());
		dispatch(getStatistic());

		return () => {};
	}, [dispatch]);

	return (
		<>
			<div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
				<Sidebar />
				<div className='layout__content'>
					<TopNav />
					<div className='layout__content-main'>
						<Routes>
							<Route path='/' element={<Dashboard />} />
							<Route path='/customers' element={<Customers />} />
							<Route path='/services' element={<Services />} />
							<Route path='/room-diagram' element={<Rooms />} />
							<Route path='/users' element={<Users />} />
							<Route path='/profile' element={<Profile />} />
							<Route path='/receipts' element={<Receipt />} />
							<Route path='/statistic' element={<Statistics />} />
							<Route path='/about' element={<About />} />
						</Routes>
					</div>
				</div>
			</div>
		</>
	);
};

export default Layout;
