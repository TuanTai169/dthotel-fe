import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';

import SelectNumberPeople from './components/selectNumberPeople';
import AvailableRoom from './components/availableRoom';
import { BiChevronDown } from 'react-icons/bi';
import './style.scss';

const listRoom = [
	{
		capacity: {
			adult: 2,
			child: 2,
		},
		_id: '6273fc21f862387b043a3ac0',
		roomNumber: '301',
		floor: 3,
		price: 350,
		desc: 'Room 301',
		roomType: [
			{
				nameTag: 'Standard',
				type: 'STD',
			},
			{
				nameTag: 'Single ',
				type: 'SGL',
			},
		],
		convenience: [
			{
				name: 'air conditioning',
				desc: 'air conditioning',
			},
			{
				name: 'en-suite bathroom',
				desc: 'en-suite bathroom',
			},
			{
				name: 'internet access',
				desc: 'internet access',
			},
		],
		status: 'Ready',
		images: [
			{
				src: 'https://drive.google.com/thumbnail?id=1wssym_RCzfAETooYk690s0mlcAv_CVhw',
				alt: 'default-img',
			},
		],
	},
	{
		capacity: {
			adult: 2,
			child: 2,
		},
		_id: '625eed00ff5def9afc488963',
		roomNumber: '201',
		floor: 2,
		price: 550,
		desc: 'Room 201',
		roomType: [
			{
				nameTag: 'Standard',
				type: 'STD',
			},
			{
				nameTag: 'Single ',
				type: 'SGL',
			},
		],
		convenience: [
			{
				name: 'air conditioning',
				desc: 'air conditioning',
			},
			{
				name: 'en-suite bathroom',
				desc: 'en-suite bathroom',
			},
			{
				name: 'internet access',
				desc: 'internet access',
			},
		],
		status: 'Ready',
		images: [
			{
				src: 'https://drive.google.com/thumbnail?id=1wssym_RCzfAETooYk690s0mlcAv_CVhw',
				alt: 'default-img',
			},
		],
	},
	{
		capacity: {
			adult: 2,
			child: 2,
		},
		_id: '625eed00ff5def9afc488963',
		roomNumber: '201',
		floor: 2,
		price: 550,
		desc: 'Room 201',
		roomType: [
			{
				nameTag: 'Standard',
				type: 'STD',
			},
			{
				nameTag: 'Single ',
				type: 'SGL',
			},
		],
		convenience: [
			{
				name: 'air conditioning',
				desc: 'air conditioning',
			},
			{
				name: 'en-suite bathroom',
				desc: 'en-suite bathroom',
			},
			{
				name: 'internet access',
				desc: 'internet access',
			},
		],
		status: 'Ready',
		images: [
			{
				src: 'https://drive.google.com/thumbnail?id=1wssym_RCzfAETooYk690s0mlcAv_CVhw',
				alt: 'default-img',
			},
		],
	},
	{
		capacity: {
			adult: 2,
			child: 2,
		},
		_id: '625eed00ff5def9afc48896378',
		roomNumber: '201',
		floor: 2,
		price: 550,
		desc: 'Room 201',
		roomType: [
			{
				nameTag: 'Standard',
				type: 'STD',
			},
			{
				nameTag: 'Single ',
				type: 'SGL',
			},
		],
		convenience: [
			{
				name: 'air conditioning',
				desc: 'air conditioning',
			},
			{
				name: 'en-suite bathroom',
				desc: 'en-suite bathroom',
			},
			{
				name: 'internet access',
				desc: 'internet access',
			},
		],
		status: 'Ready',
		images: [
			{
				src: 'https://drive.google.com/thumbnail?id=1wssym_RCzfAETooYk690s0mlcAv_CVhw',
				alt: 'default-img',
			},
		],
	},
	{
		capacity: {
			adult: 2,
			child: 2,
		},
		_id: '625eed00ff5def9afc48896356',
		roomNumber: '201',
		floor: 2,
		price: 550,
		desc: 'Room 201',
		roomType: [
			{
				nameTag: 'Standard',
				type: 'STD',
			},
			{
				nameTag: 'Single ',
				type: 'SGL',
			},
		],
		convenience: [
			{
				name: 'air conditioning',
				desc: 'air conditioning',
			},
			{
				name: 'en-suite bathroom',
				desc: 'en-suite bathroom',
			},
			{
				name: 'internet access',
				desc: 'internet access',
			},
		],
		status: 'Ready',
		images: [
			{
				src: 'https://drive.google.com/thumbnail?id=1wssym_RCzfAETooYk690s0mlcAv_CVhw',
				alt: 'default-img',
			},
		],
	},
	{
		capacity: {
			adult: 2,
			child: 2,
		},
		_id: '625eed00ff5def9afc48896345',
		roomNumber: '201',
		floor: 2,
		price: 550,
		desc: 'Room 201',
		roomType: [
			{
				nameTag: 'Standard',
				type: 'STD',
			},
			{
				nameTag: 'Single ',
				type: 'SGL',
			},
		],
		convenience: [
			{
				name: 'air conditioning',
				desc: 'air conditioning',
			},
			{
				name: 'en-suite bathroom',
				desc: 'en-suite bathroom',
			},
			{
				name: 'internet access',
				desc: 'internet access',
			},
		],
		status: 'Ready',
		images: [
			{
				src: 'https://drive.google.com/thumbnail?id=1wssym_RCzfAETooYk690s0mlcAv_CVhw',
				alt: 'default-img',
			},
		],
	},
];

const BookingPage = () => {
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

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
		<div className='booking-page'>
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
						<span className='btn-check-available'>Check availability</span>
					</div>
				</div>
			</section>
			<section className='available-room'>
				<div className='list-available flex-center flex-column'>
					{listRoom.map((room) => (
						<AvailableRoom room={room} key={room._id} />
					))}
				</div>
				<div className='pagination'></div>
			</section>
		</div>
	);
};

export default BookingPage;
