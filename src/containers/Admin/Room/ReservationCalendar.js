import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';

import { RoomStatus } from '../../../assets/app/constants';

const ReservationCalendar = (props) => {
	const { show, handlerModalClose } = props;

	const listRoom = useSelector((state) => state.roomReducer.rooms);
	const listBooking = useSelector((state) => state.bookingReducer.bookings);
	const listType = useSelector((state) => state.types.types);

	const [month, setMonth] = useState(new Date());
	const [roomType, setRoomType] = useState('All');

	let bookings = [];
	listBooking.forEach((item) => {
		item.detail.rooms.forEach((room) => {
			const type = listType.find((x) => x._id === room.roomType);
			bookings.push({
				number: room.roomNumber,
				type: type.nameTag,
				status: item.status,
				checkInDate: [item.rooms[0].checkInDate],
				checkOutDate: [item.rooms[0].checkOutDate],
			});
		});
	});

	bookings.forEach((item) => {
		let listDate = [];
		let minCheckIn = 0;
		let maxCheckOut = 0;

		let checkIn = item.checkInDate.map((item) => new Date(item));
		let checkOut = item.checkOutDate.map((item) => new Date(item));
		if (checkIn.length > 0 && checkOut.length > 0) {
			minCheckIn = Math.min(...checkIn);
			maxCheckOut = Math.max(...checkOut);

			let startDate = new Date(minCheckIn);
			let endDate = new Date(maxCheckOut);
			let dateMove = startDate;
			let strDate = startDate;

			while (strDate <= endDate) {
				let strDate = dateMove.toISOString().slice(0, 10);
				listDate.push(strDate);
				dateMove.setDate(dateMove.getDate() + 1);
			}
		}
		item.range = listDate;
	});

	const data = Object.values(
		bookings.reduce((acc, { number, type, status, checkInDate, checkOutDate, range }) => {
			if (acc[number] !== undefined) {
				if (Array.isArray(checkInDate) && Array.isArray(checkOutDate)) {
					// if it's array type then concat
					acc[number].checkInDate = acc[number].checkInDate.concat(checkInDate);
					acc[number].checkOutDate = acc[number].checkOutDate.concat(checkOutDate);
					acc[number].range = acc[number].range.concat(range);
				} else {
					acc[number].checkInDate.push(checkInDate);
					acc[number].checkOutDate.push(checkOutDate);
					acc[number].range.push(range);
				}
			} else {
				acc[number] = {
					number,
					type,
					status,
					checkInDate,
					checkOutDate,
					range,
				};
			}
			return acc;
		}, {})
	);

	listRoom.forEach((room) => {
		const found = data.some((el) => el.number === room.roomNumber);
		if (!found) {
			data.push({
				number: room.roomNumber,
				type: room.roomType.nameTag,
				status: room.status,
				checkInDate: [],
				checkOutDate: [],
				range: [],
			});
		}
	});

	const arrayDay = useMemo(() => {
		let arrayDay = [];
		const daysInMonth = moment(month, 'YYYY-MM').daysInMonth();
		for (let i = 1; i <= daysInMonth; i++) {
			arrayDay.push(i);
		}
		return arrayDay;
	}, [month]);

	const renderBody = (room) => {
		const rangeNumber = room.range.map((item) => {
			const day = new Date(item);
			if (day.getMonth() === month.getMonth()) {
				return day.getDate();
			} else {
				return '';
			}
		});
		const render = arrayDay.map((item) => {
			const found = rangeNumber.some((el) => el === item);
			if (found) {
				return <td key={item} style={{ backgroundColor: 'rgb(230, 46, 46)' }}></td>;
			} else {
				return <td key={item}></td>;
			}
		});
		return <>{render}</>;
	};

	console.log(data);
	return (
		<>
			<Modal
				show={show}
				onHide={handlerModalClose}
				animation={false}
				dialogClassName='modal-95w admin-modal'
			>
				<Modal.Header closeButton>
					<Modal.Title>Reservation Calendar</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='page'>
						<div className='page__header d-flex justify-content-around'>
							<div className='page__selectDate '>
								<p className='mb-0'>Select Month:</p>
								<DatePicker
									selected={month}
									onChange={(update) => {
										setMonth(update);
									}}
									dateFormat='MM/yyyy'
									showMonthYearPicker
								/>
							</div>
							<div className='page_selectRoomType' style={{ width: '150px' }}>
								<FloatingLabel controlId='floatingSelectType' label='Select Type' className='mb-3'>
									<Form.Control
										as='select'
										name='roomType'
										value={roomType.nameTag}
										onChange={(e) => setRoomType(e.target.value)}
									>
										<option value='All'>All</option>
										{Array.isArray(listType) &&
											listType.map((t) => (
												<option key={t._id} value={t.nameTag}>
													{t.nameTag}
												</option>
											))}
									</Form.Control>
								</FloatingLabel>
							</div>
						</div>
						<div className='page__cal__body'>
							<table>
								<thead>
									<tr>
										<th rowSpan={2} className='p-4'>
											Number
										</th>
										<th rowSpan={2} className='p-3'>
											Type
										</th>
										<th rowSpan={2} className='p-10'>
											Status
										</th>
										<th colSpan={arrayDay.length} className='text-center'>
											{moment(month).format('MMMM YYYY')}
										</th>
									</tr>
									<tr>
										{arrayDay.map((item, index) => {
											return (
												<th key={index} className='day-index'>
													{item}
												</th>
											);
										})}
									</tr>
								</thead>

								{data
									.sort((a, b) => (a.number > b.number ? 1 : -1))
									.filter((item) => (roomType === 'All' ? true : item.type === roomType))
									.map((room, index) => {
										return (
											<tbody key={index}>
												<tr>
													<td rowSpan={2} className='p-2 text-center'>
														{room.number}
													</td>
													<td rowSpan={2} className='p-2 text-center'>
														{room.type}
													</td>
													<td
														rowSpan={2}
														className='text-center'
														style={{
															color:
																room.status === RoomStatus.Ready.name
																	? '#157347'
																	: room.status === 'Check In'
																	? 'red'
																	: room.status === RoomStatus.Booking.name
																	? 'blue'
																	: '#ccc',
														}}
													>
														{room.status}
													</td>
												</tr>
												<tr>{renderBody(room)}</tr>
											</tbody>
										);
									})}
							</table>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handlerModalClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ReservationCalendar;
