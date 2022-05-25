import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import Select from 'react-select';
import EditRoomModal from './EditRoomModal';
import RoomActionButton from './RoomActionButton';
import DialogDelete from '../../../components/Dialog/DialogDelete';
import { deleteRoom } from '../../../redux/actions/room';
import { useDispatch, useSelector } from 'react-redux';
import { convertStringToDate } from '../../../utils/convertDateTime';
import CustomerForm from '../FormBooking/CustomerForm';
import ServiceForm from '../FormBooking/ServiceForm';
import { RoomStatus, BookingStatus, userRoles } from '../../../assets/app/constanst';

const InfoRoomModal = (props) => {
	const dispatch = useDispatch();
	const { show, handlerModalClose, room } = props;
	const { roomNumber, price, roomType, convenience, _id, capacity, status } = room;
	const [isOpenEditModal, setIsOpenEditModal] = useState(false);
	const [conformDialog, setConformDialog] = useState({
		isOpenDialog: false,
		title: '',
		message: '',
	});

	const role = useSelector((state) => state.auth.user.roles);
	const bookings = useSelector((state) => state.bookingReducer.bookings);
	const convenienceList = useSelector((state) => state.convenience.conveniences);
	const typesList = useSelector((state) => state.types.types);

	const booking = bookings.filter((item) =>
		item.rooms.find((room) => room.room === _id && status === RoomStatus.Occupied.name)
	);

	const getBooking = booking.filter((item) => item.status === BookingStatus.checkIn.name);

	const renderTable = getBooking.map((item) => {
		const { code, customer, services, rooms, deposit, serviceCharge, totalPrice } = item;

		const roomSelected = rooms.find((r) => r.room === _id);
		const checkInDateConvert = convertStringToDate(roomSelected.checkInDate);
		const checkOutDateConvert = convertStringToDate(roomSelected.checkOutDate);

		return (
			<Form key={item._id}>
				<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
					<Col>
						<FloatingLabel controlId='floatingCode' label='BookingID ' className='mb-3'>
							<Form.Control type='text' value={code} disabled />
						</FloatingLabel>
					</Col>
					<Col>
						<FloatingLabel controlId='floatingCheckIn' label='Check in ' className='mb-3'>
							<Form.Control type='text' value={checkInDateConvert} disabled />
						</FloatingLabel>
					</Col>
					<Col>
						<FloatingLabel controlId='floatingCheckOut' label='Check out' className='mb-3'>
							<Form.Control type='text' value={checkOutDateConvert} disabled />
						</FloatingLabel>
					</Col>
					<Col>
						<FloatingLabel controlId='floatingDeposit' label='Deposit (USD)' className='mb-3'>
							<Form.Control type='text' value={deposit} disabled />
						</FloatingLabel>
					</Col>
				</Row>

				<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
					<Form.Group controlId='formGridCustomer'>
						<h5>Customer</h5>
						<CustomerForm customer={customer} />
					</Form.Group>
				</Row>
				<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
					<Form.Group as={Col} controlId='formGridService'>
						<div className='form-label'>
							<h5>Service</h5>
							<p>
								Price (USD): <strong style={{ color: 'red' }}>{serviceCharge}</strong>
							</p>
						</div>
						<ServiceForm services={services} />
					</Form.Group>
				</Row>
				<p>
					Total Price (USD):{' '}
					<strong style={{ color: 'red', fontSize: '20px' }}>{totalPrice}</strong>{' '}
				</p>
			</Form>
		);
	});

	const handlerEditModalClose = () => setIsOpenEditModal(false);
	const handlerDelete = (id) => {
		dispatch(deleteRoom(id));
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handlerModalClose}
				size={booking.length > 0 && 'lg'}
				dialogClassName='modal-60w'
				animation={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>ROOM {roomNumber}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Form.Group className='col-6 mb-3' controlId='formBasicPrice'>
							<Form.Label>Price(USD)</Form.Label>
							<Form.Control
								type='number'
								placeholder='0'
								name='price'
								value={price || ''}
								required
								disabled
							/>
						</Form.Group>
						<Form.Group className='col-3 mb-3' controlId='formBasicAdult'>
							<Form.Label>Adult</Form.Label>
							<Form.Control
								type='number'
								placeholder='0'
								name='adult'
								value={capacity.adult > 0 ? capacity.adult : 1 || 1}
								required
								disabled
							/>
						</Form.Group>
						<Form.Group className='col-3 mb-3' controlId='formBasicChildren'>
							<Form.Label>Children</Form.Label>
							<Form.Control
								type='number'
								placeholder='0'
								name='child'
								value={capacity.child > -1 ? capacity.child : 0 || 0}
								required
								disabled
							/>
						</Form.Group>
					</Row>
					<Form.Group className='mb-3' controlId='formBasicType'>
						<Form.Label>Types</Form.Label>
						<Select
							isMulti
							name='types'
							options={typesList}
							defaultValue={typesList.filter((x) => {
								if (roomType.findIndex((item) => item._id === x._id) > -1) return x;
							})}
							getOptionLabel={(option) => option.nameTag}
							getOptionValue={(option) => option._id}
							className='basic-multi-select'
							classNamePrefix='select type'
							isDisabled
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicConvenience'>
						<Form.Label>Convenience</Form.Label>
						<Select
							isMulti
							name='convenience'
							options={convenienceList}
							defaultValue={convenienceList.filter((x) => {
								if (convenience.findIndex((item) => item._id === x._id) > -1) return x;
							})}
							getOptionLabel={(option) => option.name}
							getOptionValue={(option) => option._id}
							className='basic-multi-select'
							classNamePrefix='select convenience'
							isDisabled
						/>
					</Form.Group>
					{booking.length > 0 && renderTable}
				</Modal.Body>
				<Modal.Footer>
					{role !== userRoles.Employee.name && (
						<>
							<Button variant='outline-warning' onClick={() => setIsOpenEditModal(true)}>
								Edit
							</Button>{' '}
							<Button
								variant='outline-danger'
								onClick={() =>
									setConformDialog({
										isOpenDialog: true,
										title: 'Delete room',
										message: 'Are you sure delete this room?',
										onConform: () => handlerDelete(_id),
									})
								}
							>
								Delete
							</Button>
						</>
					)}
					<RoomActionButton
						room={room}
						booking={getBooking}
						handlerModalClose={handlerModalClose}
					/>
					<EditRoomModal
						show={isOpenEditModal}
						handlerEditModalClose={handlerEditModalClose}
						handlerModalParentClose={handlerModalClose}
						room={room}
					/>
					<DialogDelete conformDialog={conformDialog} setConformDialog={setConformDialog} />
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default InfoRoomModal;
