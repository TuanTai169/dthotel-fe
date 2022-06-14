import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Modal, Button, Form, Row, Col, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { RoomStatus } from '../../../assets/app/constants';
import CustomerForm from '../FormBooking/CustomerForm';
import { totalRoomCharge, totalServiceCharge } from '../../../utils/calculateRoomPrice';
import { getAllBooking, addBooking } from '../../../redux/actions/booking';
import { getAllRoom } from './../../../redux/actions/room';

import { checkStatusRoom, numberValidation } from '../../../utils/validation';
import ViewAllRoomModal from '../Room/ViewAllRoomModal';
import ViewAllServiceModal from '../Service/ViewAllServiceModal';
import { BsDash, BsPlus } from 'react-icons/bs';

const BookingModal = (props) => {
	const { show, bookingSuccess, currentRoom, status } = props;
	const dispatch = useDispatch();
	let navigate = useNavigate();

	//Get info by redux
	const listCustomer = useSelector((state) => state.customerReducer.customers);
	const listRoom = useSelector((state) => state.roomReducer.rooms);
	const listService = useSelector((state) => state.serviceReducer.services);
	const listBooking = useSelector((state) => state.bookingReducer.bookings);
	const listCoupon = useSelector((state) => state.couponReducer.coupons);

	// useState
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(
		new Date(startDate.getTime() + 12 * 60 * 60 * 1000).setHours(12, 0)
	);
	const [excludeDates, setExcludeDates] = useState([]);
	const [customer, setCustomer] = useState({});
	const [arrayRoom, setArrayRoom] = useState(
		listRoom
			.filter((room) => room.status === RoomStatus.Ready.name)
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
		discount: null,
		rooms: [currentRoom._id],
		customer: '',
		services: [],
		products: [],
	});

	const [openViewRoom, setOpenViewRoom] = useState(false);
	const [openViewService, setOpenViewService] = useState(false);

	useEffect(() => {
		const { checkInDate, checkOutDate, deposit, discount, services, products } = newBooking;

		const checkExcludeDate = checkStatusRoom(rooms, listBooking);
		const exclude = checkExcludeDate.map((item) => new Date(item));
		setExcludeDates(exclude);

		const calculatorPrice = () => {
			const roomCharge = totalRoomCharge(rooms, checkInDate, checkOutDate);

			let priceDiscount = 0;
			const coupon = discount && listCoupon.find((x) => x._id === discount._id);
			if (coupon) {
				priceDiscount = coupon.discount;
			}

			const sumServicesPrice = totalServiceCharge(services, products, listService);

			const VAT = 10;
			return Number(
				parseFloat(
					(roomCharge + sumServicesPrice) * (1 + VAT / 100 - priceDiscount / 100) - deposit
				).toFixed(2)
			);
		};
		setTotalPrice(calculatorPrice);
	}, [newBooking, rooms, services, products, listBooking]);

	// Handler
	const handlerCustomer = () => {
		navigate('/admin/customers');
	};

	const handlerSubmit = (e) => {
		e.preventDefault();

		const data = {
			...newBooking,
			discount: newBooking.discount ? newBooking.discount._id : null,
			products: newBooking.products.map((x) => {
				return {
					product: x.product,
					amount: x.amount,
				};
			}),
			services: newBooking.services.map((x) => {
				return {
					service: x.service,
					amount: x.amount,
				};
			}),
		};

		dispatch(addBooking(data, status));
		setTimeout(() => {
			dispatch(getAllBooking());
		}, 3000);
		resetDataBooking();
	};

	const closeViewRoomModal = () => setOpenViewRoom(false);
	const closeViewServiceModal = () => setOpenViewService(false);

	const resetDataBooking = () => {
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
		bookingSuccess();
	};

	//onChange
	const onChangeCustomer = (selectCustomer) => {
		setCustomer(selectCustomer);
		setNewBooking({
			...newBooking,
			customer: selectCustomer._id,
		});
	};

	const onChangeCoupon = (selectItem) => {
		setNewBooking({
			...newBooking,
			discount: selectItem,
		});
	};

	const onChangeRoom = (listRoom) => {
		setRooms(listRoom);
		// setArrayRoom(arrayRoom.filter((room) => room._id !== selectRoom._id));
		setNewBooking({
			...newBooking,
			rooms: listRoom.map((room) => room._id),
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

	const onAddService = (e, service) => {
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
					price: s.price * s.amount,
				};
			}),
			products: products.map((s) => {
				return {
					product: s._id,
					amount: s.amount,
					price: s.price * s.amount,
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
					price: s.price * s.amount,
				};
			}),
			products: products.map((s) => {
				return {
					product: s._id,
					amount: s.amount,
					price: s.price * s.amount,
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

	const { deposit } = newBooking;

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
									name='deposit'
									value={deposit}
									onChange={(e) => {
										setNewBooking({ ...newBooking, deposit: e.target.value });
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
									onChange={onChangeCoupon}
									className='basic-select'
									classNamePrefix='select coupon'
								/>
							</Form.Group>
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
									isMulti
									name='rooms'
									options={arrayRoom}
									onChange={onChangeRoom}
									defaultValue={arrayRoom.filter((x) => currentRoom._id === x._id)}
									getOptionLabel={(option) => option.roomNumber}
									getOptionValue={(option) => option._id}
								/>
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
										</tr>
									))}
								</tbody>
							</Table>
							{/* <ViewAllRoomModal
								show={openViewRoom}
								handlerModalClose={closeViewRoomModal}
								roomChoose={currentRoom}
								getRoom={onChangeRoom}
							/> */}
						</Row>
						<Row>
							<Col sm={9}>
								<h5>Service and Product</h5>
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
							<Table striped>
								<thead>
									<tr>{renderServiceHead}</tr>
								</thead>
								<tbody>
									{(services.length > 0 || products.length > 0) &&
										[...services, ...products].map((service, index) => (
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
