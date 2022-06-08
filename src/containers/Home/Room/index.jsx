import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';

import SelectNumberPeople from './components/selectNumberPeople';
import AvailableRoom from './components/availableRoom';
import { BiChevronDown } from 'react-icons/bi';

import './style.scss';
import { getAllRoom } from './../../../redux/actions/room';

const RoomPage = () => {
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

	const dispatch = useDispatch();
	const listRoom = useSelector((state) => state.roomReducer.rooms);

	useEffect(() => {
		dispatch(getAllRoom());
	}, [dispatch]);

	const capacityDefault = {
		adult: { name: 'Adults', number: 2 },
		child: { name: 'Children', number: 2 },
	};

	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
		<button className='input-date-picker' onClick={onClick} ref={ref}>
			{value}
			<BiChevronDown />
		</button>
	));
	return (
		<div className='room-page'>
			<section className='row select-booking'>
				<div className='col-6 flex-center'>
					<span className='web-name'>Rooms</span>
				</div>
				<div className='col-6'>
					<div className='row'>
						<div className='col-6 select-date'>
							<label className='text-title'>Check-in/Check-out</label>
							<DatePicker
								selectsRange={true}
								startDate={startDate}
								endDate={endDate}
								onChange={(update) => {
									setDateRange(update);
								}}
								customInput={<ExampleCustomInput />}
							/>
						</div>
						<div className='col-6 select-people'>
							<SelectNumberPeople type={capacityDefault.adult} />
							<SelectNumberPeople type={capacityDefault.child} />
						</div>
					</div>
					<div className='flex-center'>
						<span className='btn-home'>Check availability</span>
					</div>
				</div>
			</section>
			<section className='available-room'>
				{listRoom.map((room) => (
					<AvailableRoom room={room} key={room._id} />
				))}
			</section>
		</div>
	);
};

export default RoomPage;
