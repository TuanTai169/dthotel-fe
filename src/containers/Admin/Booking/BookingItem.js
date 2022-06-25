import React, { useState } from 'react';
import { convertStringToDate } from '../../../utils/convertDateTime';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import DialogDelete from '../../../components/Dialog/DialogDelete';
import { cancelledBooking } from '../../../redux/actions/booking';
import { useDispatch } from 'react-redux';
import ViewDetailBookingModal from './ViewDetailBookingModal';
import EditBookingModal from './EditBookingModal';
import { BookingStatus } from '../../../assets/app/constants';

const BookingItem = (props) => {
	const { booking } = props;
	const dispatch = useDispatch();

	const [isOpenViewModal, setIsOpenViewModal] = useState(false);
	const [isOpenEditBooking, setIsOpenEditBooking] = useState(false);

	const [conformDialog, setConformDialog] = useState({
		isOpenDialog: false,
		title: '',
		message: '',
	});

	const { code, rooms, status, detail } = booking;

	const checkInDateConvert = convertStringToDate(rooms[0].checkInDate);
	const checkOutDateConvert = convertStringToDate(rooms[0].checkOutDate);

	const handlerViewModalClose = () => setIsOpenViewModal(false);
	const handlerCloseEditBookingModal = () => setIsOpenEditBooking(false);

	const handlerCancel = (id) => {
		dispatch(cancelledBooking(id));
	};

	const renderRoom = detail.rooms.map((room) => {
		return <p key={room._id}>{room.roomNumber}</p>;
	});
	return (
		<>
			<td>{code}</td>
			<td>{detail.customer.name}</td>
			<td>{renderRoom}</td>
			<td>{checkInDateConvert}</td>
			<td>{checkOutDateConvert}</td>
			<td className={status === BookingStatus.Booking.name ? 'status-book' : 'status-check-in'}>
				{status}
			</td>
			<td>
				{/* <Button variant='info' onClick={() => setIsOpenViewModal(true)}>
					<i className='bx bx-detail icon-bg' style={{ color: '#fff' }}></i>
				</Button>{' '} */}
				{status === BookingStatus.Booking.name && (
					<>
						<Button variant='primary' onClick={() => setIsOpenEditBooking(true)}>
							<i className='bx  bxs-edit-alt' style={{ color: '#fff' }}></i>
						</Button>{' '}
						<OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Cancelled Booking!</Tooltip>}>
							<span className='d-inline-block'>
								<Button
									variant='danger'
									onClick={() => {
										setConformDialog({
											isOpenDialog: true,
											title: 'Cancelled Booking',
											message: 'Are you sure cancel this booking?',
											onConform: () => handlerCancel(booking._id),
										});
									}}
								>
									<i className='bx bx-trash-alt icon-bg' style={{ color: '#fff' }}></i>
								</Button>
							</span>
						</OverlayTrigger>
					</>
				)}
				{isOpenViewModal && (
					<ViewDetailBookingModal
						show={isOpenViewModal}
						handlerModalClose={handlerViewModalClose}
						booking={booking}
					/>
				)}
				{isOpenEditBooking && (
					<EditBookingModal
						show={isOpenEditBooking}
						handlerModalClose={handlerCloseEditBookingModal}
						booking={booking}
					/>
				)}
				<DialogDelete conformDialog={conformDialog} setConformDialog={setConformDialog} />
			</td>
		</>
	);
};

export default BookingItem;
