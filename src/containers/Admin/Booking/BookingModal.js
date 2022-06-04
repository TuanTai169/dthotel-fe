import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Modal, Button, Form, Row, Col, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { RoomStatus } from '../../../assets/app/constants';
import CustomerForm from '../FormBooking/CustomerForm';
import { totalRoomCharge } from '../../../utils/calculateRoomPrice';
import { getAllBooking, addBooking } from '../../../redux/actions/booking';
import { checkStatusRoom, numberValidation } from '../../../utils/validation';
import ViewAllRoomModal from '../Room/ViewAllRoomModal';
import ViewAllServiceModal from '../Service/ViewAllServiceModal';
import { BsDash, BsPlus } from 'react-icons/bs';

const BookingModal = (props) => {
	const { show, handlerModalClose, handlerParentModalClose, currentRoom, status } = props;
	const dispatch = useDispatch();
	let navigate = useNavigate();

	//Get info by redux
	const listCustomer = useSelector((state) => state.customerReducer.customers);
	const listRoom = useSelector((state) => state.roomReducer.rooms);
	const listService = useSelector((state) => state.serviceReducer.services);
	const listBooking = useSelector((state) => state.bookingReducer.bookings);
	// const listCoupon = useSelector((state) => state.couponReducer.bookings);

	// useState
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(
		new Date(startDate.getTime() + 12 * 60 * 60 * 1000).setHours(12, 0)
	);
	const [excludeDates, setExcludeDates] = useState([]);
	const [customer, setCustomer] = useState({});
	const [arrayRoom, setArrayRoom] = useState(
		listRoom
			.filter((room) => room.status === RoomStatus.Ready.name && room._id !== currentRoom._id)
			.sort((a, b) => (a.roomNumber < b.roomNumber ? -1 : 1))
	);
	const [rooms, setRooms] = useState([currentRoom]);
	const [arrayService, setArrayService] = useState(
		listService.map((service) => {
			return {
				...service,
				amount: 1,
			};
		})
	);
	const [services, setServices] = useState([]);
	const [products, setProducts] = useState([]);
	const [totalPrice, setTotalPrice] = useState(currentRoom.price);

	const [newBooking, setNewBooking] = useState({
		checkInDate: moment(startDate).format('YYYY-MM-DD HH:mm'),
		checkOutDate: moment(endDate).format('YYYY-MM-DD HH:mm'),
		deposit: 0,
		discount: '626159f984a2249a562eaa95',
		rooms: [currentRoom._id],
		customer: '',
		services: [],
		products: [],
	});

	const [openViewRoom, setOpenViewRoom] = useState(false);
	const [openViewService, setOpenViewService] = useState(false);

	useEffect(() => {
		const { checkInDate, checkOutDate, deposit, discount } = newBooking;

		const checkExcludeDate = checkStatusRoom(rooms, listBooking);
		const exclude = checkExcludeDate.map((item) => new Date(item));
		setExcludeDates(exclude);

		const calculatorPrice = () => {
			const RoomCharge = totalRoomCharge(rooms, checkInDate, checkOutDate);

			const sumServicesPrice = services
				.map((item) => item.price)
				.reduce((prev, curr) => prev + curr, 0);

			const VAT = 10;
			return (
				(RoomCharge + sumServicesPrice) * (1 + VAT / 100 - discount / 100) -
				deposit
			).toFixed();
		};
		setTotalPrice(calculatorPrice);
	}, [newBooking, rooms, services, listBooking]);

	// Handler
	const handlerCustomer = () => {
		navigate('/customers');
	};

	const handlerSubmit = (e) => {
		e.preventDefault();
		if (numberValidation(newBooking.deposit)) {
			dispatch(addBooking(newBooking, status));
			setTimeout(() => dispatch(getAllBooking()), 3000);
			resetDataBooking();
		}
	};

	const closeViewRoomModal = () => setOpenViewRoom(false);
	const closeViewServiceModal = () => setOpenViewService(false);

	const resetDataBooking = () => {
		handlerParentModalClose();
		handlerModalClose();
		setArrayRoom({
			checkInDate: moment(startDate).format('YYYY-MM-DD HH:mm'),
			checkOutDate: moment(endDate).format('YYYY-MM-DD HH:mm'),
			deposit: 0,
			discount: 0,
			rooms: [currentRoom._id],
			customer: '',
			services: [],
			products: [],
		});
	};

	//onChange
	const onChangeCustomer = (selectCustomer) => {
		setCustomer(selectCustomer);
		setNewBooking({
			...newBooking,
			customer: selectCustomer._id,
		});
	};

	const onChangeRoom = (selectRoom) => {
		let newArrayRoom = [...rooms, selectRoom];
		setRooms(newArrayRoom);
		setArrayRoom(arrayRoom.filter((room) => room._id !== selectRoom._id));
		setNewBooking({
			...newBooking,
			rooms: newArrayRoom.map((room) => room._id),
		});
	};

	const onRemoveRoom = (e, selectRoom) => {
		e.preventDefault();

		let newArrayRoom = rooms.filter((room) => room._id !== selectRoom._id);

		setRooms(newArrayRoom);
		setArrayRoom([...arrayRoom, selectRoom].sort((a, b) => (a.roomNumber < b.roomNumber ? -1 : 1)));
		setNewBooking({
			...newBooking,
			rooms: newArrayRoom.map((room) => room._id),
		});
	};

	const onChangeService = (listSelected) => {
		const newService = listSelected.filter((s) => s.isProduct === false);
		const newProduct = listSelected.filter((s) => s.isProduct === true);

		setServices([...newService]);
		setProducts([...newProduct]);
		setNewBooking({
			...newBooking,
			services: newService.map((s) => {
				return {
					service: s._id,
					amount: s.amount,
				};
			}),
			products: newProduct.map((s) => {
				return {
					product: s._id,
					amount: s.amount,
				};
			}),
		});
	};

	const onAddService = (e, service) => {
		console.log(service.amount);
		e.preventDefault();
		const findIndex = arrayService.findIndex((x) => x._id === service._id);
		if (findIndex > -1) {
			arrayService[findIndex].amount = service.amount + 1;
		}
		setArrayService(arrayService);
		setNewBooking({
			...newBooking,
			services: services.map((s) => {
				return {
					service: s._id,
					amount: s.amount,
				};
			}),
			products: products.map((s) => {
				return {
					product: s._id,
					amount: s.amount,
				};
			}),
		});
	};

	const onSubtractService = (e, service) => {
		e.preventDefault();

		const findIndex = arrayService.findIndex((x) => x._id === service._id);
		if (findIndex > -1) {
			arrayService[findIndex].amount = service.amount - 1;
		}
		setArrayService(arrayService);
		setNewBooking({
			...newBooking,
			services: services.map((s) => {
				return {
					service: s._id,
					amount: s.amount,
				};
			}),
			products: products.map((s) => {
				return {
					product: s._id,
					amount: s.amount,
				};
			}),
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
	const tableServiceHead = ['No#', 'Name', 'Price (USD)', 'Amount'];
	const renderServiceHead = tableServiceHead.map((item, index) => {
		return (
			<th key={index} style={{ fontWeight: 500 }}>
				{item}
			</th>
		);
	});

	const { deposit, discount } = newBooking;

	return (
		<>
			<Modal show={show} onHide={resetDataBooking} animation={false} size='lg'>
				<Modal.Header closeButton>
					<Modal.Title>{status === 'book' ? 'New Booking' : 'New Check-in'}</Modal.Title>
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
										setNewBooking({
											...newBooking,
											checkInDate: moment(date).format('YYYY-MM-DD HH:mm'),
										});
									}}
									selectsStart
									startDate={startDate}
									endDate={endDate}
									minDate={new Date()}
									showTimeSelect
									excludeDates={excludeDates}
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
										setNewBooking({
											...newBooking,
											checkOutDate: moment(date).format('YYYY-MM-DD HH:mm'),
										});
									}}
									selectsEnd
									startDate={startDate}
									endDate={endDate}
									minDate={startDate}
									showTimeSelect
									excludeDates={excludeDates}
									timeFormat='HH:mm'
									dateFormat='dd/MM/yyyy HH:mm'
								/>
							</Form.Group>
							<Form.Group as={Col} controlId='formGridDeposit'>
								<Form.Label>Deposit</Form.Label>
								<Form.Control
									type='number'
									value={deposit}
									onChange={(e) => {
										setNewBooking({ ...newBooking, deposit: e.target.value });
									}}
								/>
							</Form.Group>
							{/* <Form.Group as={Col} controlId='formGridDiscount'>
								<Form.Label>Discount (%)</Form.Label>
								<Form.Control
									type='number'
									value={discount}
									onChange={(e) => {
										setNewBooking({ ...newBooking, discount: e.target.value });
									}}
								/>
							</Form.Group> */}
						</Row>
						<Row>
							<Col sm={3}>
								<h5>Customer</h5>
							</Col>
							<Col sm={6}>
								<Select
									options={listCustomer}
									onChange={onChangeCustomer}
									getOptionLabel={(option) => option.name}
									getOptionValue={(option) => option.name}
								/>
							</Col>
							<Col sm={3}>
								<Button variant='success' onClick={handlerCustomer}>
									Add Customer
								</Button>
							</Col>
							<CustomerForm customer={customer} />
						</Row>
						<Row>
							<Col sm={3}>
								<h5>Room</h5>
							</Col>
							<Col sm={6}>
								<Select
									options={arrayRoom}
									onChange={onChangeRoom}
									getOptionLabel={(option) => option.roomNumber}
									getOptionValue={(option) => option.roomNumber}
								/>
							</Col>
							<Col sm={3}>
								<Button onClick={() => setOpenViewRoom(true)}>Add New Room</Button>
							</Col>
							<Table striped>
								<thead>
									<tr>{renderRoomHead}</tr>
								</thead>
								<tbody>
									{rooms.map((room, index) => (
										<tr key={room._id}>
											<td>{index + 1}</td>
											<td>{room.roomNumber}</td>
											<td>{room.floor}</td>
											<td>{room.price}</td>
											<td>
												<button onClick={(e) => onRemoveRoom(e, room)} className='btn-remove'>
													x
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
							<ViewAllRoomModal
								show={openViewRoom}
								handlerModalClose={closeViewRoomModal}
								roomChoose={currentRoom}
								getRoom={onChangeRoom}
							/>
						</Row>
						<Row>
							<Col sm={9}>
								<h5>Service and Product</h5>
							</Col>
							<Col sm={3}>
								<Button
									variant='warning'
									style={{ color: '#fff' }}
									onClick={() => setOpenViewService(true)}
								>
									Add New Service
								</Button>
							</Col>

							<Form.Group className='mb-3' controlId='formBasicService'>
								<Select
									isMulti
									name='services'
									options={arrayService}
									getOptionLabel={(option) => option.name}
									getOptionValue={(option) => option._id}
									onChange={onChangeService}
									className='basic-multi-select'
									classNamePrefix='select service or product'
								/>
							</Form.Group>
							{/* <Select
									options={arrayService}
									onChange={onChangeService}
									getOptionLabel={(option) => option.name}
									getOptionValue={(option) => option.name}
								/> */}

							<Table striped>
								<thead>
									<tr>{renderServiceHead}</tr>
								</thead>
								<tbody>
									{[...services, ...products].map((service, index) => (
										<tr key={service._id}>
											<td>{index + 1}</td>
											<td>{service.name}</td>
											<td>{service.price}</td>
											<td>{service.amount}</td>
											<td className='d-flex align-items-center justify-content-around'>
												<Button onClick={(e) => onAddService(e, service)}>
													<BsPlus />
												</Button>
												<Button
													variant='danger'
													onClick={(e) => onSubtractService(e, service)}
													disabled={!!(service.amount < 2)}
												>
													<BsDash />
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
							<ViewAllServiceModal
								show={openViewService}
								handlerModalClose={closeViewServiceModal}
								getService={onChangeService}
							/>
						</Row>
						<p>
							Total Price (USD):{' '}
							<strong style={{ color: 'red', fontSize: '20px' }}>
								{totalPrice > 0 ? totalPrice : 0}
							</strong>{' '}
						</p>
					</Modal.Body>
					<Modal.Footer>
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

export default BookingModal;
