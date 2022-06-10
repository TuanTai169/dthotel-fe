import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import { checkOut } from '../../../redux/actions/receipt';
import { updateBooking } from '../../../redux/actions/booking';

import CustomerForm from '../FormBooking/CustomerForm';
import RoomForm from '../FormBooking/RoomForm';
import ServiceForm from './../FormBooking/ServiceForm';

import { convertStringToDate } from '../../../utils/convertDateTime';
import { numberValidation } from '../../../utils/validation';
import { totalRoomCharge, totalServiceCharge } from '../../../utils/calculateRoomPrice';

import PayPalModal from './PayPalModal';
import FullLoading from './../../../components/Common/FullLoading';

const CheckOutModal = (props) => {
	const { show, handlerModalClose, handlerParentModalClose, booking } = props;

	const isLoading = useSelector((state) => state.receiptReducer.isReceiptLoading);
	const listCoupon = useSelector((state) => state.couponReducer.coupons);
	const listService = useSelector((state) => state.serviceReducer.services);
	const listRoom = useSelector((state) => state.roomReducer.rooms);

	const { _id, code, customer, rooms, deposit, discount, services, products, totalPrice, status } =
		booking[0];

	const [newDateCheckOut, setNewDateCheckOut] = useState(new Date().setHours(12, 0));

	const [editBooking, setEditBooking] = useState({
		_id: _id,
		rooms: rooms.map((room) => room.room),
		customer: customer._id,
		checkInDate: moment(rooms[0].checkInDate).format('YYYY-MM-DD HH:mm'),
		checkOutDate: moment(newDateCheckOut).format('YYYY-MM-DD HH:mm'),
		services: services.map((x) => {
			return {
				service: x.service,
				amount: x.amount,
			};
		}),
		products: products.map((x) => {
			return {
				product: x.product,
				amount: x.amount,
			};
		}),
		deposit: deposit,
		discount: discount._id,
		status: status,
	});

	const [sumPrice, setSumPrice] = useState(totalPrice);
	const [roomPrice, setRoomPrice] = useState(0);
	const [servicePrice, setServicePrice] = useState(0);

	const dispatch = useDispatch();
	const [receipt, setReceipt] = useState({
		booking: _id,
		paidOut: 0,
		refund: 0,
		modeOfPayment: 'CASH',
	});
	const [isPaypal, setIsPaypal] = useState(false);

	useEffect(() => {
		const { checkInDate, checkOutDate, deposit, discount, services, products } = editBooking;

		const calculatorPrice = () => {
			const roomCharge = totalRoomCharge(rooms, checkInDate, checkOutDate, listRoom);
			setRoomPrice(Math.round(roomCharge));

			let priceDiscount = 0;
			const coupon = listCoupon.find((x) => x._id === discount);
			if (coupon) {
				priceDiscount = coupon.discount;
			}

			const sumServicesPrice = totalServiceCharge(services, products, listService);
			setServicePrice(sumServicesPrice);

			const VAT = 10;
			return Number(
				parseFloat(
					(roomCharge + sumServicesPrice) * (1 + VAT / 100 - priceDiscount / 100) - deposit
				).toFixed(2)
			);
		};

		setSumPrice(calculatorPrice);
	}, [editBooking, rooms, services, products]);

	const checkInDateConvert = convertStringToDate(rooms[0].checkInDate);

	const onChangePaidOut = (e) => {
		setReceipt({
			...receipt,
			paidOut: Number(parseFloat(e.target.value).toFixed(2)),
			refund: e.target.value > sumPrice ? e.target.value - sumPrice : 0,
		});
	};

	const onSubmitCheckOut = () => {
		// dispatch(updateBooking(editBooking));
		const newReceipt = {
			...receipt,
			paidOut: parseInt(receipt.paidOut),
		};
		console.log(newReceipt);
		console.log(editBooking);
		// setTimeout(() => dispatch(checkOut(newReceipt)), 3000);
		// resetData();
	};
	const resetData = () => {
		setReceipt({
			booking: _id,
			paidOut: '0',
			refund: 0,
			modeOfPayment: 'CASH',
		});
		handlerModalClose();
		handlerParentModalClose();
	};

	const { paidOut, refund, modeOfPayment } = receipt;

	// .filter((s) => {
	// 	if(services.map((x) => x.service).includes(s._id)){

	// 	};
	// })

	return (
		<>
			{isLoading ? (
				<FullLoading />
			) : (
				<Modal
					show={show}
					onHide={handlerModalClose}
					animation={false}
					size='lg'
					dialogClassName='admin-modal'
				>
					<Modal.Header closeButton>
						<Modal.Title>{code}</Modal.Title>
						<div style={{ marginLeft: '30%', fontSize: '20px' }}>
							Total Price (USD):{' '}
							<strong style={{ color: 'red', fontSize: '20px' }}>
								{sumPrice > 0 ? sumPrice : 0}
							</strong>
						</div>
					</Modal.Header>
					<Form>
						<Modal.Body>
							<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
								<Col>
									<FloatingLabel controlId='floatingCheckIn' label='Check in ' className='mb-3'>
										<Form.Control type='text' value={checkInDateConvert} disabled />
									</FloatingLabel>
								</Col>
								<Form.Group as={Col} controlId='formGridCheckOut'>
									<Form.Label>Check out</Form.Label>
									<DatePicker
										selected={newDateCheckOut}
										onChange={(date) => {
											setNewDateCheckOut(date);
											setEditBooking({
												...editBooking,
												checkOutDate: moment(date).format('YYYY-MM-DD HH:mm'),
											});
										}}
										selectsEnd
										startDate={new Date(rooms[0].checkInDate)}
										endDate={newDateCheckOut}
										minDate={new Date(rooms[0].checkInDate)}
										showTimeSelect
										timeFormat='HH:mm'
										dateFormat='dd/MM/yyyy HH:mm'
									/>
								</Form.Group>

								<Col>
									<FloatingLabel controlId='formGridDiscount' label='Discount (%)' className='mb-3'>
										<Form.Control
											type='text'
											value={listCoupon.find((x) => discount._id === x._id).discount}
											disabled
										/>
									</FloatingLabel>
								</Col>
								<Col>
									<FloatingLabel controlId='floatingDeposit' label='Deposit (USD)' className='mb-3'>
										<Form.Control type='text' value={deposit} disabled />
									</FloatingLabel>
								</Col>
							</Row>
							<Row style={{ borderBottom: '1px solid #bbb' }}>
								<Col>
									<FloatingLabel controlId='floatingPaidOut' label='Paid (USD) ' className='mb-3'>
										<Form.Control type='number' value={paidOut} onChange={onChangePaidOut} />
									</FloatingLabel>
								</Col>
								<Col>
									<FloatingLabel controlId='floatingRefund' label='Refund (USD) ' className='mb-3'>
										<Form.Control type='text' value={refund} readOnly />
									</FloatingLabel>
								</Col>
								<Col>
									<FloatingLabel controlId='floatingVAT' label='VAT(%) ' className='mb-3'>
										<Form.Control type='text' value={10} readOnly />
									</FloatingLabel>
								</Col>
								<Col>
									<FloatingLabel
										controlId='floatingModeOfPayment'
										label='Mode Of Payment'
										className='mb-3'
									>
										<Form.Select
											name='modeOfPayment'
											value={modeOfPayment}
											onChange={(e) =>
												setReceipt({
													...receipt,
													modeOfPayment: e.target.value,
												})
											}
											required
										>
											<option>--</option>
											<option value='CASH'>CASH</option>
											<option value='PAYPAL'>PAYPAL</option>
										</Form.Select>
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
								<Form.Group controlId='formGridRoom'>
									<div className='form-label'>
										<h5>Room</h5>
										<p>
											Price (USD): <strong style={{ color: 'red' }}>{roomPrice}</strong>
										</p>
									</div>
									<RoomForm
										rooms={listRoom.filter((s) => rooms.map((x) => x.room).includes(s._id))}
									/>
								</Form.Group>
							</Row>
							<Row className='mb-3'>
								<Form.Group as={Col} controlId='formGridService'>
									<div className='form-label'>
										<h5>Services</h5>
										<p>
											Price (USD): <strong style={{ color: 'red' }}>{servicePrice}</strong>
										</p>
									</div>
									<ServiceForm services={listService} />
								</Form.Group>
							</Row>
						</Modal.Body>
						<Modal.Footer>
							{modeOfPayment === 'PAYPAL' && (
								<Button onClick={() => setIsPaypal(true)}>PayPal</Button>
							)}
							<PayPalModal
								open={isPaypal}
								closeModal={() => setIsPaypal(false)}
								receipt={receipt}
								closeAllModal={resetData}
							/>
							<Button variant='danger' onClick={onSubmitCheckOut}>
								Save
							</Button>
							<Button variant='secondary' onClick={handlerModalClose}>
								Close
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			)}
		</>
	);
};

export default CheckOutModal;
