import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonToolbar, Tooltip, OverlayTrigger } from 'react-bootstrap';
import lodash from 'lodash';

import { RoomStatus } from '../../../assets/app/constants';
import RoomItem from './RoomItem';
import AddRoomModal from './AddRoomModal';
import ViewAllBookingModal from '../Booking/ViewAllBookingModal';
import ReservationCalendar from './ReservationCalendar';

import FullLoading from '../../../components/Common/FullLoading';
import ScrollToTop from '../../../components/Common/ScrollToTop';
import { getAllBooking } from '../../../redux/actions/booking';
import { getAllReceipt } from '../../../redux/actions/receipt';

const Rooms = () => {
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [isOpenBookingModal, seIsOpenBookingModal] = useState(false);
	const [isOpenStatusRoomModal, seIsOpenStatusRoomModal] = useState(false);
	const dispatch = useDispatch();

	const rooms = useSelector((state) => state.roomReducer.rooms);
	const isLoading = useSelector((state) => state.roomReducer.isRoomLoading);
	const role = useSelector((state) => state.auth.user.roles);

	//Group BY FLOOR
	const roomGroupedByFloor = lodash.groupBy(rooms, 'floor');
	const roomGroupedByStatus = lodash.groupBy(rooms, 'status');

	// CONVERT OBJECT TO ARRAY
	const arrayRoom = Object.values(roomGroupedByFloor);
	const arrayStatusRoom = Object.entries(roomGroupedByStatus);

	const statusArray = arrayStatusRoom.filter((item) => item[0] !== RoomStatus.Booking.name);

	//Close Add Modal
	const handlerCloseAddModal = () => setIsOpenAddModal(false);
	const handlerCloseBookingModal = () => seIsOpenBookingModal(false);
	const handlerCloseStatusRoomModal = () => seIsOpenStatusRoomModal(false);

	return (
		<>
			{isLoading ? (
				<FullLoading />
			) : (
				<>
					<div className='page__header' style={{ marginBottom: '10px' }}>
						<div className='page__title'>
							<h3>Room Diagram</h3>
						</div>
						<div className='page__status'>
							<OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>NUMBER OF ROOMS</Tooltip>}>
								<Button
									variant='outline-warning'
									style={{
										marginLeft: '16px',
										fontWeight: 'bold',
										fontSize: '18px',
									}}
								>
									<i className='bx bxs-home'></i>
									{rooms.length}
								</Button>
							</OverlayTrigger>
							{statusArray.map((item, index) => (
								<OverlayTrigger
									key={index}
									overlay={<Tooltip id='tooltip-disabled'>{item[0]}</Tooltip>}
								>
									<Button
										variant={RoomStatus[item[0]].variant}
										key={index}
										style={{
											marginLeft: '16px',
											fontWeight: 'bold',
											fontSize: '18px',
										}}
									>
										<i className={RoomStatus[item[0]].className}></i>
										{item[1].length}
									</Button>
								</OverlayTrigger>
							))}
						</div>
						<div className='page__action'>
							<ButtonToolbar>
								<OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Refresh !</Tooltip>}>
									<span className='d-inline-block'>
										<Button
											variant='info'
											onClick={() => {
												dispatch(getAllBooking());
												dispatch(getAllReceipt());
											}}
											style={{ marginRight: '10px', color: '#fff' }}
										>
											<i className='bx bx-refresh' style={{ fontSize: '22px' }}></i>
										</Button>
									</span>
								</OverlayTrigger>

								<OverlayTrigger
									overlay={<Tooltip id='tooltip-disabled'>List Booking/Check In</Tooltip>}
								>
									<span className='d-inline-block'>
										<Button
											onClick={() => {
												seIsOpenBookingModal(true);
												dispatch(getAllBooking());
											}}
											style={{ marginRight: '10px' }}
										>
											<i className='bx bx-list-ul' style={{ fontSize: '22px' }}></i>
										</Button>
									</span>
								</OverlayTrigger>

								<OverlayTrigger
									overlay={<Tooltip id='tooltip-disabled'>Reservation Calendar</Tooltip>}
								>
									<span className='d-inline-block'>
										<Button
											variant='danger'
											onClick={() => seIsOpenStatusRoomModal(true)}
											style={{ marginRight: '10px', color: '#fff' }}
										>
											<i className='bx bx-calendar' style={{ fontSize: '22px' }}></i>
										</Button>
									</span>
								</OverlayTrigger>

								{role !== 'EMPLOYEE' && (
									<Button variant='success' onClick={() => setIsOpenAddModal(true)}>
										Add Room
									</Button>
								)}
								{isOpenBookingModal && (
									<ViewAllBookingModal
										show={isOpenBookingModal}
										handlerModalClose={handlerCloseBookingModal}
									/>
								)}

								{isOpenAddModal && (
									<AddRoomModal show={isOpenAddModal} handlerModalClose={handlerCloseAddModal} />
								)}

								{isOpenStatusRoomModal && (
									<ReservationCalendar
										show={isOpenStatusRoomModal}
										handlerModalClose={handlerCloseStatusRoomModal}
									/>
								)}
							</ButtonToolbar>
						</div>
					</div>
					<div className='page__body'>
						<div className='row'>
							<div className='col'>
								{arrayRoom.map((floor, index) => (
									<div className='row' key={index}>
										{floor.map((room) => (
											<div className='col-2' key={room._id}>
												<RoomItem room={room} />
											</div>
										))}
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			)}
			<ScrollToTop />
		</>
	);
};

export default Rooms;
