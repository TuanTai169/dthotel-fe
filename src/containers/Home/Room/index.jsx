import React, { useState, useEffect, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { BiChevronDown } from 'react-icons/bi';

import SelectNumberPeople from './components/selectNumberPeople';
import AvailableRoom from './components/availableRoom';
import { RoomPrice } from '../../../components/Common/Utils';
import { getDateRange } from '../../../utils/convertDateTime';

import './style.scss';
import { getAllRoom, checkAvailable } from './../../../redux/actions/room';
import { setBooking } from '../../../redux/actions/booking';

const capacityDefault = {
	adult: 1,
	child: 0,
	childOver12: 0,
	childUnder12: 0,
};

const RoomPage = () => {
	const [dateRange, setDateRange] = useState([
		new Date(),
		new Date(new Date().getTime() + 12 * 60 * 60 * 1000 * 2),
	]);
	const [startDate, endDate] = dateRange;
	const [dayDiff, setDayDiff] = useState(getDateRange(startDate, endDate));
	const [capacity, setCapacity] = useState({ ...capacityDefault });
	const [selectRoom, setSelectRoom] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const listRoom = useSelector((state) => state.roomReducer.rooms);

	useEffect(() => {
		dispatch(getAllRoom());
	}, [dispatch]);

	const onChangeCapacity = (name, value) => {
		setCapacity({ ...capacity, [name]: value });
	};
	const onChangeOldChild = (e) => {
		setCapacity({ ...capacity, [e.target.name]: parseInt(e.target.value) });
	};

	const onChangeDateRange = (update) => {
		const dayDiff = getDateRange(...update);
		const price = selectRoom.reduce((sum, { price }) => sum + price, 0);
		setDateRange(update);
		setDayDiff(dayDiff);
		setTotalPrice(price * dayDiff);
	};
	const onCheckAvailability = () => {
		const checkInDate = moment(startDate).format('YYYY-MM-DD');
		const checkOutDate = moment(endDate).format('YYYY-MM-DD');

		let adult = capacity.adult;
		let child = 0;
		if (capacity.childOver12 > 0) {
			adult += capacity.childOver12;
		}
		if (capacity.childUnder12 > 1) {
			const addAdult = parseInt(capacity.childUnder12 / 2);
			adult += addAdult;
		}
		const data = {
			checkInDate,
			checkOutDate,
			capacity: {
				adult,
				child,
			},
		};
		dispatch(checkAvailable(data));
		resetPage();
	};

	const resetPage = () => {
		setSelectRoom([]);
		setCapacity({ ...capacityDefault });
		setTotalPrice(0);
	};

	const onSelectedRoom = (value) => {
		const { room, isChecked } = value;
		if (isChecked) {
			const newArray = [...selectRoom, room];
			const price = newArray.reduce((sum, { price }) => sum + price, 0);
			setTotalPrice(price * dayDiff);
			setSelectRoom(newArray);
		} else {
			const newArray = selectRoom.filter((x) => x._id !== room._id);
			const price = newArray.reduce((sum, { price }) => sum + price, 0);
			setTotalPrice(price * dayDiff);
			setSelectRoom(newArray);
		}
	};

	const onBooking = (e) => {
		e.preventDefault();
		const checkInDate = moment(startDate).format('YYYY-MM-DD');
		const checkOutDate = moment(endDate).format('YYYY-MM-DD');
		const data = {
			checkInDate,
			checkOutDate,
			capacity,
			rooms: [...selectRoom],
			totalPrice,
		};
		dispatch(setBooking(data));
		navigate(`/booking`);
	};

	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
		<button className='input-date-picker' onClick={onClick} ref={ref}>
			{value}
			<BiChevronDown />
		</button>
	));
	const totalChild = capacity.childOver12 + capacity.childUnder12;
	return (
		<div className='room-page'>
			<section className='row select-booking'>
				<div className='col-5 flex-center'>
					<span className='web-name'>Rooms</span>
				</div>
				<div className='col-7'>
					<div className='row'>
						<div className='col-6 select-date'>
							<label className='text-title'>Check-in/Check-out</label>
							<DatePicker
								selectsRange={true}
								startDate={startDate}
								endDate={endDate}
								onChange={onChangeDateRange}
								customInput={<ExampleCustomInput />}
							/>
						</div>
						<div className='col-6 select-people'>
							<SelectNumberPeople
								value={capacity.adult}
								name='adult'
								onChangeSelect={onChangeCapacity}
							/>
							<SelectNumberPeople
								value={capacity.child}
								name='child'
								adult={capacity.adult}
								onChangeSelect={onChangeCapacity}
							/>
							{capacity && capacity.child > 0 && (
								<div className='old-of-child format-default row'>
									<div className='mb-3 col-6'>
										<label htmlFor='under12'>Child under 12</label>
										<input
											type='number'
											className='form-control input-text-home'
											min={0}
											id='under12'
											value={capacity.childUnder12}
											name='childUnder12'
											onChange={onChangeOldChild}
											disabled={totalChild === capacity.child}
										/>
									</div>
									<div className='mb-3 col-6'>
										<label htmlFor='over12'>Child over 12</label>
										<input
											type='number'
											className='form-control input-text-home'
											min={0}
											id='over12'
											name='childOver12'
											value={capacity.childOver12}
											onChange={onChangeOldChild}
											disabled={totalChild === capacity.child}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className='flex-center'>
						<span className='btn-home' onClick={onCheckAvailability}>
							Check availability
						</span>
					</div>
				</div>
			</section>
			{Array.isArray(listRoom) && listRoom.length > 0 && (
				<section className='available-room'>
					<div className='list-room row'>
						<div className='col-9'>
							{listRoom.map((room) => (
								<AvailableRoom room={room} key={room._id} onSelect={onSelectedRoom} />
							))}
						</div>

						<div className='btn-booking col-3 pos-fixed end-0'>
							<button onClick={onBooking} disabled={!(selectRoom.length > 0)}>
								Book Now
							</button>
							<p>{selectRoom && selectRoom.length} room</p>
							<RoomPrice
								price={totalPrice ? totalPrice : 0}
								message={`for ${dayDiff ? dayDiff : 0} night`}
							/>
						</div>
					</div>
				</section>
			)}
		</div>
	);
};

export default RoomPage;
