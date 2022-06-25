import React, { useState } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { changeStatusRoom, getAllRoom } from '../../../redux/actions/room';
import { useDispatch } from 'react-redux';
import BookingModal from '../Booking/BookingModal';

import DialogChange from '../../../components/Dialog/DialogChange';
import CheckOutModal from '../Receipt/CheckOutModal';
import { RoomStatus } from '../../../assets/app/constants';
import ViewAllRoomModal from './ViewAllRoomModal';

const RoomActionButton = (props) => {
	const dispatch = useDispatch();

	const { room, handlerModalClose, booking } = props;

	const [isOpenBooking, setIsOpenBooking] = useState(false);
	const [isOpenCheckOut, setIsOpenCheckOut] = useState(false);
	const [isOpenViewRoom, setIsOpenViewRoom] = useState(false);

	const [conformDialog, setConformDialog] = useState({
		isOpenDialog: false,
		title: '',
		message: '',
	});

	const [statusBooking, setStatusBooking] = useState('book');

	const checkOutSuccess = () => {
		setTimeout(() => dispatch(getAllRoom()), 5000);
		setIsOpenCheckOut(false);
		handlerModalClose();
	};

	const bookingSuccess = () => {
		setTimeout(() => dispatch(getAllRoom()), 5000);
		setIsOpenBooking(false);
		handlerModalClose();
	};

	const handlerCloseViewRoomModal = () => setIsOpenViewRoom(false);

	const { status, _id } = room;
	const bookingId = booking.map((item) => item._id);

	const changeStatus = (id, status) => {
		dispatch(changeStatusRoom(id, status));
		handlerModalClose();
	};

	return (
		<>
			<ButtonToolbar>
				{/* CHECK OUT */}
				{status === RoomStatus.Ready.name && (
					<Button
						variant='secondary'
						style={{ marginLeft: '4px' }}
						onClick={() => changeStatus(_id, 'fix')}
					>
						<i className='bx bxs-edit'></i>
						<span>&ensp;Fixing</span>
					</Button>
				)}
				{/* READY */}
				{status === RoomStatus.Fixing.name && (
					<Button
						variant='success'
						style={{ marginLeft: '4px' }}
						onClick={() => changeStatus(_id, 'ready')}
					>
						<i className='bx bxs-check-circle'></i>
						<span>&ensp;Ready</span>
					</Button>
				)}
				{/* CHANGE ROOM */}
				{/* {status === "OCCUPIED" && (
          <Button
            variant="warning"
            style={{ marginLeft: "4px", color: "#fff" }}
            onClick={() => setIsOpenViewRoom(true)}
          >
            <i className="bx bx-transfer-alt"></i>
            <span>&ensp; Change Room</span>
          </Button>
        )} */}
				{/* BOOKING */}
				{status !== RoomStatus.Cleaning.name && status !== RoomStatus.Fixing.name && (
					<>
						<Button
							variant='info'
							style={{ marginLeft: '4px', color: '#fff' }}
							onClick={() => {
								setStatusBooking('book');
								setIsOpenBooking(true);
							}}
						>
							<i className='bx bxs-user-x'></i>
							<span>&ensp;Booking</span>
						</Button>
						{isOpenBooking && (
							<BookingModal
								show={isOpenBooking}
								currentRoom={room}
								bookingSuccess={bookingSuccess}
								status={statusBooking}
							/>
						)}
					</>
				)}

				{/* CHECK IN */}
				{status !== RoomStatus.Occupied.name &&
					status !== RoomStatus.Cleaning.name &&
					status !== RoomStatus.Fixing.name && (
						<>
							<Button
								variant='primary'
								style={{ marginLeft: '4px' }}
								onClick={() => {
									setStatusBooking('check-in');
									setIsOpenBooking(true);
								}}
							>
								<i className='bx bxs-user-check'></i>
								<span>&ensp;Check in</span>
							</Button>
							{isOpenBooking && (
								<BookingModal
									show={isOpenBooking}
									bookingSuccess={bookingSuccess}
									currentRoom={room}
									status={statusBooking}
								/>
							)}

							{/* <CheckInModal
								show={isOpenCheckIn}
								handlerModalClose={handlerCloseCheckInModal}
								currentRoom={room}
								handlerParentModalClose={handlerModalClose}
							/> */}
						</>
					)}

				{/* CHECK OUT */}
				{/* {status === "OCCUPIED" && (
          <>
            <Button
              variant="success"
              style={{ marginLeft: "4px" }}
              onClick={() => setIsOpenEditBooking(true)}
            >
              <i className="bx bx-plus-medical"></i>
              <span>&ensp;Add Service</span>
            </Button>
            <EditBookingModal
              show={isOpenEditBooking}
              handlerModalClose={handlerCloseEditBookingModal}
              handlerParentModalClose={handlerModalClose}
              booking={booking}
            />
          </>
        )} */}
				{status === RoomStatus.Occupied.name && (
					<>
						<Button
							variant='danger'
							style={{ marginLeft: '4px' }}
							onClick={() => setIsOpenCheckOut(true)}
						>
							<i className='bx bxs-magic-wand'></i>
							<span>&ensp;Check out</span>
						</Button>
						{isOpenCheckOut && (
							<CheckOutModal
								show={isOpenCheckOut}
								checkOutSuccess={checkOutSuccess}
								booking={booking}
							/>
						)}
					</>
				)}

				{isOpenViewRoom && (
					<ViewAllRoomModal
						show={isOpenViewRoom}
						handlerModalClose={handlerCloseViewRoomModal}
						roomChoose={room}
						bookingId={bookingId.toString()}
						handlerParentModalClose={handlerModalClose}
					/>
				)}

				<DialogChange conformDialog={conformDialog} setConformDialog={setConformDialog} />
			</ButtonToolbar>
		</>
	);
};

export default RoomActionButton;
