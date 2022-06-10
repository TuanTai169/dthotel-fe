import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import moment from 'moment';

import { BiInfoCircle } from 'react-icons/bi';
import { imagePayPal, imageVNPay } from '../../../assets/app/constants';
import { getDateRange } from '../../../utils/convertDateTime';
import { convertCurrency } from '../../../utils/calculateRoomPrice';
import './style.scss';
import PayPalModal from './PayPal/PayPalModal';
import { addBookingInWeb } from '../../../redux/actions/booking';

const BookingPage = () => {
	const [showPolicy, setShowPolicy] = useState(false);
	const [isAgree, setIsAgree] = useState(false);
	const [isPayPal, setIsPayPal] = useState(true);
	const [isShowModal, setIsShowModal] = useState(false);
	const [data, setData] = useState({});
	const [customer, setCustomer] = useState({
		fname: '',
		lname: '',
		email: '',
		phone: '',
		idNumber: '',
		address: '',
		numberOfPeople: {
			adult: 0,
			child: 0,
		},
	});
	const currentBooking = useSelector((state) => state.bookingReducer.currentBooking);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { rooms, capacity, checkInDate, checkOutDate, totalPrice } = currentBooking;
	const { fname, lname, email, phone, idNumber, address } = customer;

	const onBooking = (e) => {
		e.preventDefault();
		const customer = {
			name: lname + ' ' + fname,
			email,
			phone,
			idNumber,
			address,
			numberOfPeople: {
				adult: capacity.adult,
				child: capacity.child,
			},
		};
		const data = {
			rooms: rooms.map((x) => x._id),
			checkInDate: moment(new Date(checkInDate).setHours(14, 0)).format('YYYY-MM-DD HH:ss'),
			checkOutDate: moment(new Date(checkOutDate).setHours(12, 0)).format('YYYY-MM-DD HH:ss'),
			customer,
			services: [],
			products: [],
			deposit: parseFloat((totalPrice * 1.1 * 0.5).toFixed(2)),
			discount: null,
		};
		setData(data);
		setIsShowModal(true);
	};
	const onChangeInputCustomer = (e) => {
		const dataChange = { [e.target.name]: e.target.value };
		setCustomer({ ...customer, ...dataChange });
	};
	const onChangeChecked = (e) => {
		setIsAgree(e.target.checked);
	};

	const onBookingSuccess = () => {
		dispatch(addBookingInWeb(data));
		navigate('/rooms');
	};

	const expiredDate = moment(
		new Date(new Date(checkInDate).getTime() - 12 * 60 * 60 * 1000 * 3)
	).format('YYYY-MM-DD');

	return (
		<div className='format-default booking-page'>
			<form className='booking-page-form'>
				<div className='title flex-center'>
					<span className='web-name'>Booking Detail</span>
				</div>
				<div className='time-check'>
					<p>Check-in: {checkInDate} from 14:00 </p>
					<p>Check-out: {checkOutDate} until 12:00 </p>
					<span className='show-policy' onClick={() => navigate('/rooms')}>
						(Traveling on different dates?)
					</span>
				</div>
				<div className='mx-0'>
					{Array.isArray(rooms) &&
						rooms.map((room) => (
							<div className='room-info row' key={room._id}>
								<div className='col-8 px-0'>
									<h4>{room.name}</h4>
									<span>Free cancellation before {expiredDate}</span>
									<p>Breakfast included</p>
									<p>{`Details: 1 room, ${getDateRange(
										checkInDate,
										checkOutDate
									)} nights  included in price`}</p>
									<div className='row'>
										<div className='col-3'>
											<label htmlFor='adults'>Number of adults</label>
											<input
												type='text'
												className='form-control input-text-home'
												id='adults'
												defaultValue={`${room?.capacity.adult} adults`}
											/>
										</div>
										<div className='col-3'>
											<div className='form-group mb-3'>
												<label htmlFor='child'>Number of child</label>
												<input
													type='text'
													className='form-control input-text-home'
													id='child'
													defaultValue={`${room?.capacity.child} child`}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className='col-4 total-price'>
									<h4>
										<strong>{convertCurrency(room.price * 23500, 'VND')}</strong>
									</h4>
									<h5>{convertCurrency(room.price, 'USD')}</h5>
									<span className='show-policy' onClick={() => setShowPolicy(true)}>
										Booking Policies <BiInfoCircle />
									</span>
								</div>
							</div>
						))}
				</div>

				<div className='row'>
					<div className='col-6'>
						<div className='summary-price'>
							<h4>Summary price</h4>
							<div className='d-flex justify-content-between'>
								<p>Accommodation charges</p>
								<div className='price'>
									<span>
										<strong>{convertCurrency(totalPrice * 23500, 'VND')}</strong>
									</span>
									<p>{convertCurrency(totalPrice, 'USD')}</p>
								</div>
							</div>
							<div className='d-flex justify-content-between'>
								<p>Taxes 10%</p>
								<div className='price'>
									<span>
										<strong>{convertCurrency(totalPrice * 0.1 * 23500, 'VND')}</strong>
									</span>
									<p>{convertCurrency(totalPrice * 0.1, 'USD')}</p>
								</div>
							</div>
							<div className='d-flex justify-content-between border-top-main-color'>
								<p>Total price</p>
								<div className='price'>
									<span>
										<strong>{convertCurrency(totalPrice * 1.1 * 23500, 'VND')}</strong>
									</span>
									<p>{convertCurrency(totalPrice * 1.1, 'USD')}</p>
								</div>
							</div>
							<div className='d-flex justify-content-between border-top-main-color'>
								<p>Deposit</p>
								<div className='price'>
									<span>
										<strong>{convertCurrency(totalPrice * 1.1 * 0.5 * 23500, 'VND')}</strong>
									</span>
									<p>{convertCurrency(totalPrice * 1.1 * 0.5, 'USD')}</p>
								</div>
							</div>
						</div>
						<div className='payment'>
							<h4>Payment</h4>
							<div className='row'>
								<div className='mb-3 col-sm-4'>
									<label htmlFor='payment' className='form-label'>
										Pay with
									</label>
									<select
										className='form-select select-home'
										id='payment'
										onChange={(e) => setIsPayPal(parseInt(e.target.value) === 1)}
									>
										<option value='1'>PayPal</option>
										<option value='0'>VNPay</option>
									</select>
								</div>
								<div className='mb-3 flex-center info-payment col-sm-8'>
									{isPayPal ? (
										<img src={imagePayPal.src} className='img-payment' alt={imagePayPal.alt} />
									) : (
										<img src={imageVNPay.src} className='img-payment' alt={imageVNPay.alt} />
									)}
									{isPayPal && (
										<PayPalModal
											data={data}
											show={isShowModal}
											closeModal={() => setIsShowModal(false)}
											onSuccess={onBookingSuccess}
										/>
									)}
								</div>
							</div>

							<div className='mb-3 form-check flex-center'>
								<input
									className='form-check-input'
									type='checkbox'
									value='isAgree'
									checked={isAgree}
									onChange={onChangeChecked}
								/>
								<label className='form-check-label '>
									I have read and agree to the{' '}
									<span className='show-policy' onClick={() => setShowPolicy(true)}>
										Booking Policies
									</span>
									.
								</label>
							</div>
							<div className='flex-center'>
								<button className='btn-home' onClick={onBooking} disabled={!isAgree}>
									Confirm and Book
								</button>
							</div>
						</div>
					</div>
					<div className='col-6'>
						<div className='customer-info'>
							<h4>Customer detail</h4>
							<div className='row'>
								<div className='form-group mb-32 col-3'>
									<label htmlFor='gender'>Gender</label>
									<select className='form-select select-home' id='gender'>
										<option>Mr</option>
										<option>Mrs</option>
									</select>
								</div>
								<div className='form-group mb-32 col-9'>
									<label htmlFor='fname'>First name*</label>
									<input
										type='text'
										className='form-control input-text-home'
										id='fname'
										name='fname'
										value={fname}
										onChange={onChangeInputCustomer}
										required
									/>
								</div>
							</div>

							<div className='form-group mb-32'>
								<label htmlFor='lname'>Last name*</label>
								<input
									type='text'
									className='form-control input-text-home'
									id='lname'
									name='lname'
									value={lname}
									onChange={onChangeInputCustomer}
									required
								/>
							</div>
							<div className='form-group mb-32'>
								<label htmlFor='email'>Email*</label>
								<input
									type='email'
									className='form-control input-text-home'
									id='email'
									name='email'
									value={email}
									onChange={onChangeInputCustomer}
									required
								/>
							</div>
							<div className='row'>
								<div className='form-group mb-32 col-sm-6'>
									<label htmlFor='phone'>Phone*</label>
									<input
										type='text'
										className='form-control input-text-home'
										id='phone'
										name='phone'
										value={phone}
										onChange={onChangeInputCustomer}
										required
									/>
								</div>
								<div className='form-group mb-32 col-sm-6'>
									<label htmlFor='idNumber'>ID Number*</label>
									<input
										type='text'
										className='form-control input-text-home'
										id='idNumber'
										name='idNumber'
										value={idNumber}
										onChange={onChangeInputCustomer}
										required
									/>
								</div>
							</div>

							<div className='form-group mb-32'>
								<label htmlFor='address' className='form-label'>
									Address
								</label>
								<textarea
									className='form-control input-text-home mb-85'
									id='address'
									rows='3'
									name='address'
									value={address}
									onChange={onChangeInputCustomer}
								></textarea>
							</div>
						</div>
					</div>
				</div>
			</form>
			<Modal show={showPolicy} onHide={() => setShowPolicy(false)} size='lg'>
				<Modal.Header>
					<Modal.Title>Booking policies</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='policy'>
						<div className='title'>Deluxe Twin Mountain View</div>
						<div className='detail'>
							<p className='item'>
								<strong>Cancellation:</strong> If cancelled or modified more than 3 days before the
								date of arrival, no penalty will be charged. If cancelled or modified less than 3
								days before the date of arrival, the first night will be charged. In case of
								no-show, the full booking item amount will be charged.
							</p>
							<p>
								<strong>Payment:</strong>No deposit will be charged. Balance due on arrival.
							</p>
							<p>
								<strong>The exchange rates:</strong> 1 USD = 23.500 VND.
							</p>
							<p>
								<strong>Meal included:</strong>Breakfast included.
							</p>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default BookingPage;
