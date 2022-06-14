import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Modal, Button, Form, Row, Col, Table } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import CustomerForm from '../FormBooking/CustomerForm';
import { updateBooking, getAllBooking } from '../../../redux/actions/booking';
import { checkStatusRoom, numberValidation } from '../../../utils/validation';
import { totalRoomCharge, totalServiceCharge } from '../../../utils/calculateRoomPrice';
import DialogChange from '../../../components/Dialog/DialogChange';
import ViewAllServiceModal from '../Service/ViewAllServiceModal';
import { BookingStatus, RoomStatus } from '../../../assets/app/constants';

const EditBookingModal = (props) => {
	const { show, handlerModalClose, booking } = props;

	const {
		_id,
		code,
		customer,
		rooms,
		detail,
		services,
		products,
		deposit,
		discount,
		totalPrice,
		status,
	} = booking;

	const dispatch = useDispatch();

	//Get info by redux
	const listCustomer = useSelector((state) => state.customerReducer.customers);
	const listRoom = useSelector((state) => state.roomReducer.rooms);
	const listService = useSelector((state) => state.serviceReducer.services);
	const listBooking = useSelector((state) => state.bookingReducer.bookings);
	const listCoupon = useSelector((state) => state.couponReducer.coupons);

	// USE STATE
	const [startDate, setStartDate] = useState(new Date(rooms[0].checkInDate));
	const [endDate, setEndDate] = useState(new Date(rooms[0].checkOutDate));
	const [excludeDates, setExcludeDates] = useState([]);

	const [newCustomer, setCustomer] = useState(customer);
	const [arrayRoom, setArrayRoom] = useState(
		listRoom
			.filter((room) => room.status === RoomStatus.Ready.name)
			.sort((a, b) => (a.roomNumber < b.roomNumber ? -1 : 1))
	);
	const [newRooms, setRooms] = useState(detail.rooms);
	const [newServices, setNewServices] = useState(detail.services);
	const [newProducts, setNewProducts] = useState(detail.products);
	const [arrayService, setArrayService] = useState(
		listService.map((service) => {
			return {
				...service,
				amount: 1,
			};
		})
	);

	const [sumPrice, setSumPrice] = useState(totalPrice);
	const [roomPrice, setRoomPrice] = useState(0);
	const [servicePrice, setServicePrice] = useState(0);

	const [editBooking, setEditBooking] = useState({
		_id: _id,
		code: code,
		rooms: rooms.map((room) => room.room),
		customer: customer._id,
		checkInDate: moment(startDate).format('YYYY-MM-DD HH:mm'),
		checkOutDate: moment(endDate).format('YYYY-MM-DD HH:mm'),
		services: services,
		products: products,
		deposit: deposit,
		discount: discount ? discount : null,
		status: status,
	});
	const [conformDialog, setConformDialog] = useState({
		isOpenDialog: false,
		title: '',
		message: '',
	});
	const [openViewService, setOpenViewService] = useState(false);

	// useEffect
	useEffect(() => {
		const { checkInDate, checkOutDate, services, products, deposit, discount } = editBooking;

		const checkExcludeDate = checkStatusRoom(newRooms, listBooking);
		const exclude = checkExcludeDate.map((item) => new Date(item));
		setExcludeDates(exclude);

		const calculatorPrice = () => {
			const roomCharge = totalRoomCharge(newRooms, checkInDate, checkOutDate);
			setRoomPrice(roomCharge);

			const sumServicesPrice = totalServiceCharge(services, products, listService);
			setServicePrice(sumServicesPrice);

			let priceDiscount = 0;
			const coupon = listCoupon.find((x) => x._id === discount);
			if (coupon) {
				priceDiscount = coupon.discount;
			}

			const VAT = 10;
			return Number(
				parseFloat(
					(roomCharge + sumServicesPrice) * (1 + VAT / 100 - priceDiscount / 100) - deposit
				).toFixed(2)
			);
		};

		setSumPrice(calculatorPrice);
	}, [editBooking, newRooms, newServices, newProducts, listBooking]);

	// Handler

	const handlerSubmit = (e) => {
		e.preventDefault();
		const data = {
			...editBooking,
			discount: discount && editBooking.discount ? editBooking.discount._id : null,
			products: editBooking.products.map((x) => {
				return {
					product: x.product,
					amount: x.amount,
				};
			}),
			services: editBooking.services.map((x) => {
				return {
					service: x.service,
					amount: x.amount,
				};
			}),
		};

		dispatch(updateBooking(data));
		setTimeout(() => dispatch(getAllBooking()), 3000);
		resetDataBooking();
	};

	const resetDataBooking = () => {
		handlerModalClose();
		setEditBooking(booking);
	};

	const handlerCheckIn = () => {
		const data = {
			...editBooking,
			discount: discount && editBooking.discount ? editBooking.discount._id : null,
			products: editBooking.products.map((x) => {
				return {
					product: x.product,
					amount: x.amount,
				};
			}),
			services: editBooking.services.map((x) => {
				return {
					service: x.service,
					amount: x.amount,
				};
			}),
			status: BookingStatus.checkIn.name,
		};

		dispatch(updateBooking(data));
		setTimeout(() => dispatch(getAllBooking()), 3000);
		handlerModalClose();
	};
	const closeViewServiceModal = () => setOpenViewService(false);

	//onChange
	const onChangeCustomer = (selectCustomer) => {
		setCustomer(selectCustomer);
		setEditBooking({
			...editBooking,
			customer: selectCustomer._id,
		});
	};

	const onChangeRoom = (listRoom) => {
		setRooms(listRoom);
		// setArrayRoom(arrayRoom.filter((room) => room._id !== selectRoom._id));
		setEditBooking({
			...editBooking,
			rooms: listRoom.map((room) => room._id),
		});
	};

	// const onRemoveRoom = (e, selectRoom) => {
	// 	e.preventDefault();

	// 	let newArrayRoom = newRooms.filter((room) => room._id !== selectRoom._id);

	// 	setRooms(newArrayRoom);
	// 	setArrayRoom([...arrayRoom, selectRoom].sort((a, b) => (a.roomNumber < b.roomNumber ? -1 : 1)));
	// 	setEditBooking({
	// 		...editBooking,
	// 		rooms: newArrayRoom.map((room) => room._id),
	// 	});
	// };
	const onChangeService = (listSelected) => {
		const newService = listSelected.filter((s) => s.isProduct === false);
		const newProduct = listSelected.filter((s) => s.isProduct === true);

		setNewServices([...newService]);
		setNewProducts([...newProduct]);
		setEditBooking({
			...editBooking,
			services: newService.map((s) => {
				return {
					service: s._id,
					amount: s.amount,
					price: s.price * s.amount,
				};
			}),
			products: newProduct.map((s) => {
				return {
					product: s._id,
					amount: s.amount,
					price: s.price * s.amount,
				};
			}),
		});
	};

	const onChangeCoupon = (selectItem) => {
		setEditBooking({
			...editBooking,
			discount: selectItem,
		});
	};

	//Render room Table
	const tableRoomHead = ['No#', 'Number', 'Floor', 'Price (USD)', ''];
	const renderRoomHead = tableRoomHead.map((item, index) => {
		return (
			<th key={index} style={{ fontWeight: 500 }}>
				{item}
			</th>
		);
	});

	//Render Service Table
	const tableServiceHead = ['No#', 'Name', 'Price (USD)'];
	const renderServiceHead = tableServiceHead.map((item, index) => {
		return (
			<th key={index} style={{ fontWeight: 500 }}>
				{item}
			</th>
		);
	});

	return (
		<>
			<Modal
				show={show}
				onHide={resetDataBooking}
				animation={false}
				size='lg'
				dialogClassName='admin-modal'
			>
				<Modal.Header closeButton>
					<Modal.Title>Edit {code}</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handlerSubmit}>
					<Modal.Body>
						<Row className='mb-3'>
							<Form.Group as={Col} controlId='formGridCheckIn'>
								<Form.Label>Check in</Form.Label>
								<DatePicker
									selected={startDate}
									onChange={(date) => {
										setStartDate(date);
										setEditBooking({
											...editBooking,
											checkInDate: moment(date).format('YYYY-MM-DD HH:mm'),
										});
									}}
									selectsStart
									startDate={startDate}
									endDate={endDate}
									minDate={new Date()}
									excludeDates={excludeDates}
									showTimeSelect
									timeFormat='HH:mm'
									dateFormat='dd/MM/yyyy HH:mm'
								/>
							</Form.Group>
							<Form.Group as={Col} controlId='formGridCheckOut'>
								<Form.Label>Check out</Form.Label>
								<DatePicker
									selected={endDate}
									onChange={(date) => {
										setEndDate(date);
										setEditBooking({
											...editBooking,
											checkOutDate: moment(date).format('YYYY-MM-DD HH:mm'),
										});
									}}
									selectsEnd
									startDate={startDate}
									endDate={endDate}
									minDate={startDate}
									excludeDates={excludeDates}
									showTimeSelect
									timeFormat='HH:mm'
									dateFormat='dd/MM/yyyy HH:mm'
								/>
							</Form.Group>

							<Form.Group as={Col} controlId='formGridDeposit'>
								<Form.Label>Deposit</Form.Label>
								<Form.Control
									type='number'
									value={editBooking.deposit}
									onChange={(e) => {
										setEditBooking({ ...editBooking, deposit: e.target.value });
									}}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId='formGridDiscount'>
								<Form.Label>Discount </Form.Label>
								<Select
									name='discount'
									options={listCoupon}
									getOptionLabel={(option) => option.code + '-' + option.discount + '%'}
									getOptionValue={(option) => option._id}
									defaultValue={discount ? listCoupon.filter((x) => x._id === discount._id) : null}
									onChange={onChangeCoupon}
									className='basic-select'
									classNamePrefix='select coupon'
								/>
							</Form.Group>
						</Row>
						<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
							<Col sm={3}>
								<h5>Customer</h5>
							</Col>
							<Col sm={6}>
								<Select
									options={listCustomer}
									onChange={onChangeCustomer}
									getOptionLabel={(option) => option.name}
									getOptionValue={(option) => option.name}
									isDisabled
								/>
							</Col>
							<CustomerForm customer={newCustomer} />
						</Row>
						<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
							<Col sm={3}>
								<h5>Room</h5>
							</Col>
							<Col sm={6}>
								<Select
									isMulti
									name='rooms'
									options={arrayRoom}
									onChange={onChangeRoom}
									defaultValue={detail.rooms}
									getOptionLabel={(option) => option.roomNumber}
									getOptionValue={(option) => option._id}
								/>
							</Col>
							<Table striped>
								<thead>
									<tr>{renderRoomHead}</tr>
								</thead>
								<tbody>
									{newRooms.map((room, index) => (
										<tr key={room._id}>
											<td>{index + 1}</td>
											<td>{room.roomNumber}</td>
											<td>{room.floor}</td>
											<td>{room.price}</td>
										</tr>
									))}
								</tbody>
							</Table>
							<p>
								Room Price (USD): <strong style={{ color: 'red' }}>{roomPrice}</strong>
							</p>
						</Row>
						<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
							<Col sm={3}>
								<h5>Service</h5>
							</Col>
							<Col sm={6}>
								<Select
									isMulti
									name='services'
									options={arrayService}
									defaultValue={[...newServices, ...newProducts]}
									getOptionLabel={(option) => option.name}
									getOptionValue={(option) => option._id}
									onChange={onChangeService}
									className='basic-multi-select'
									classNamePrefix='select service or product'
								/>
							</Col>
							<Table striped>
								<thead>
									<tr>{renderServiceHead}</tr>
								</thead>
								<tbody>
									{(newServices.length > 0 || newProducts.length > 0) &&
										[...newServices, ...newProducts].map((service, index) => (
											<tr key={service._id}>
												<td>{index + 1}</td>
												<td>{service.name}</td>
												<td>{service.price}</td>
											</tr>
										))}
								</tbody>
							</Table>
							{/* <ViewAllServiceModal
								show={openViewService}
								handlerModalClose={closeViewServiceModal}
								getService={onChangeService}
							/> */}
							<p>
								Service Price (USD): <strong style={{ color: 'red' }}>{servicePrice}</strong>
							</p>
						</Row>
						<div>
							Total Price (USD):{' '}
							<strong style={{ color: 'red', fontSize: '20px' }}>{sumPrice}</strong>{' '}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='primary'
							style={{ marginLeft: '4px' }}
							onClick={() => {
								setConformDialog({
									isOpenDialog: true,
									title: 'CheckIn',
									message: 'Are you sure check in this booking?',
									onConform: () => handlerCheckIn(),
								});
							}}
						>
							<i className='bx bxs-user-check'></i>
							<span>&ensp;Check in</span>
						</Button>
						<DialogChange conformDialog={conformDialog} setConformDialog={setConformDialog} />
						<Button variant='danger' type='submit'>
							Save
						</Button>
						<Button variant='secondary' onClick={resetDataBooking}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default EditBookingModal;
