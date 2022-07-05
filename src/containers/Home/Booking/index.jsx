import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { BiInfoCircle } from 'react-icons/bi';
import { imagePayPal, imageVNPay } from '../../../assets/app/constants';
import { getDateRange } from '../../../utils/convertDateTime';
import { convertCurrency } from '../../../utils/calculateRoomPrice';
import './style.scss';
import PayPalModal from './PayPal/PayPalModal';
import { addBookingInWeb } from '../../../redux/actions/booking';
import * as Validation from '../../../utils/validation';
import { getVnPayUrl } from '../../../redux/actions/receipt';
import PolicyModal from './PolicyModal';

const BookingPage = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	// const { register, watch } = new useForm();
	// let FirstNameValidation,
	// 	LastNameValidation,
	// 	EmailValidation,
	// 	IdValidation,
	// 	PhoneValidation = true;
	// FirstNameValidation =
	// 	Validation.PatternName1.test(watch('firstName')) ||
	// 	Validation.PatternName2.test(watch('firstName'));
	// LastNameValidation =
	// 	Validation.PatternName1.test(watch('lastName')) ||
	// 	Validation.PatternName2.test(watch('lastName'));
	// EmailValidation = Validation.PatternEmail.test(watch('email'));
	// IdValidation = Validation.PatternId.test(watch('idNumber'));
	// PhoneValidation = Validation.PatternPhone.test(watch('phone'));

	const roomsBooking = JSON.parse(localStorage.getItem('roomsBooking'));

	if (!roomsBooking) {
		return (
			<div className='p-20'>
				<h3>{t('booking.notFound.content')}</h3>
				<Link to='/rooms'>{t('booking.notFound.link')}</Link>
			</div>
		);
	}
	const { rooms, capacity, checkInDate, checkOutDate, totalPrice } = roomsBooking;
	const { fname, lname, email, phone, idNumber, address } = customer;

	const onBooking = async (e) => {
		e.preventDefault();
		try {
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
				checkInDate: moment(new Date(checkInDate).setHours(12, 0)).format('YYYY-MM-DD HH:ss'),
				checkOutDate: moment(new Date(checkOutDate).setHours(12, 0)).format('YYYY-MM-DD HH:ss'),
				customer,
				services: [],
				products: [],
				deposit: parseFloat((totalPrice * 1.1 * 0.5).toFixed(2)),
				discount: null,
			};

			localStorage.setItem(
				'currentBooking',
				JSON.stringify({
					rooms: rooms.map((x) => {
						return {
							_id: x._id,
							name: x.name,
						};
					}),
					checkInDate: moment(new Date(checkInDate).setHours(12, 0)).format('YYYY-MM-DD HH:ss'),
					checkOutDate: moment(new Date(checkOutDate).setHours(12, 0)).format('YYYY-MM-DD HH:ss'),
					customer,
					deposit: parseFloat((totalPrice * 1.1 * 0.5).toFixed(2)),
					total: totalPrice,
				})
			);
			setData(data);
			if (isPayPal) {
				setIsShowModal(true);
			} else {
				let vnPayData = {
					orderType: 'billpayment',
					amount: parseFloat((totalPrice * 1.1 * 0.5 * 23500).toFixed(2)),
					orderDescription: 'Booking in DTHOTEL',
					bankCode: '',
					language: 'vn',
				};
				const url = await dispatch(getVnPayUrl(vnPayData));
				dispatch(addBookingInWeb(data));
				localStorage.removeItem('roomsBooking');
				window.location.href = url;
			}
		} catch (error) {}
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
		localStorage.removeItem('roomsBooking');
		navigate('/booking-success');
	};

	const onClosePolicy = () => setShowPolicy(false);

	const expiredDate = moment(
		new Date(new Date(checkInDate).getTime() - 12 * 60 * 60 * 1000 * 3)
	).format('YYYY-MM-DD');

	return (
		<div className='format-default booking-page'>
			<form className='booking-page-form'>
				<div className='title flex-center'>
					<span className='web-name'>{t('booking.title')}</span>
				</div>
				<div className='time-check'>
					<p>{t('booking.detail.checkInDate', { checkInDate: checkInDate })} </p>
					<p>{t('booking.detail.checkOutDate', { checkOutDate: checkOutDate })}</p>
					<span className='show-policy' onClick={() => navigate('/rooms')}>
						{t('booking.detail.diffDate')}
					</span>
				</div>
				<div className='mx-0'>
					{Array.isArray(rooms) &&
						rooms.map((room) => (
							<div className='room-info row' key={room._id}>
								<div className='col-8 px-0'>
									<h4>{room.name}</h4>
									<span>
										{t('booking.detail.freeCancelled')} {expiredDate}
									</span>
									<p>{t('booking.detail.breakfastIncluded')} </p>
									<p>
										{t('booking.detail.detail1Room', {
											rangeDate: getDateRange(checkInDate, checkOutDate),
										})}
									</p>
									<div className='row'>
										<div className='col-3'>
											<label htmlFor='adults'>{t('booking.detail.numberOfAdults')}</label>
											<input
												type='text'
												className='form-control input-text-home'
												id='adults'
												defaultValue={`${room?.capacity.adult} adults`}
											/>
										</div>
										<div className='col-3'>
											<div className='form-group mb-3'>
												<label htmlFor='child'>{t('booking.detail.numberOfChild')}</label>
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
										<strong>{convertCurrency(room.price, 'USD')}</strong>
									</h4>
									<h5>{convertCurrency(room.price * 23500, 'VND')}</h5>
									<span className='show-policy' onClick={() => setShowPolicy(true)}>
										{t('booking.detail.polices')}
										<BiInfoCircle />
									</span>
								</div>
							</div>
						))}
				</div>

				<div className='row'>
					<div className='col-6'>
						<div className='summary-price'>
							<h4>{t('booking.detail.sumPrice')}</h4>
							<div className='d-flex justify-content-between'>
								<p>{t('booking.detail.accommodation')}</p>
								<div className='price'>
									<span>
										<strong>{convertCurrency(totalPrice, 'USD')}</strong>
									</span>
									<p>{convertCurrency(totalPrice * 23500, 'VND')}</p>
								</div>
							</div>
							<div className='d-flex justify-content-between'>
								<p>{t('booking.detail.taxes')}</p>
								<div className='price'>
									<span>
										<strong>{convertCurrency(totalPrice * 0.1, 'USD')}</strong>
									</span>
									<p>{convertCurrency(totalPrice * 0.1 * 23500, 'VND')}</p>
								</div>
							</div>
							<div className='d-flex justify-content-between border-top-main-color'>
								<p>{t('booking.detail.total')}</p>
								<div className='price'>
									<span>
										<strong>{convertCurrency(totalPrice * 1.1, 'USD')}</strong>
									</span>
									<p>{convertCurrency(totalPrice * 1.1 * 23500, 'VND')}</p>
								</div>
							</div>
							<div className='d-flex justify-content-between border-top-main-color'>
								<p>{t('booking.detail.deposit')}</p>
								<div className='price'>
									<span>
										<strong>{convertCurrency(totalPrice * 1.1 * 0.5, 'USD')}</strong>
									</span>
									<p>{convertCurrency(totalPrice * 1.1 * 0.5 * 23500, 'VND')}</p>
								</div>
							</div>
						</div>
						<div className='payment'>
							<h4> {t('booking.detail.payment')}</h4>
							<div className='row'>
								<div className='mb-3 col-sm-4'>
									<label htmlFor='payment' className='form-label'>
										{t('booking.detail.payWith')}
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
									{t('booking.detail.haveRead')}
									<span className='show-policy' onClick={() => setShowPolicy(true)}>
										{t('booking.detail.polices')}
									</span>
									.
								</label>
							</div>
							<div className='flex-center'>
								<button
									className='btn-home'
									onClick={onBooking}
									disabled={
										!(
											isAgree
											// &&
											// FirstNameValidation &&
											// LastNameValidation &&
											// EmailValidation &&
											// IdValidation &&
											// PhoneValidation
										)
									}
								>
									{t('booking.detail.confirm&Book')}
								</button>
							</div>
						</div>
					</div>
					<div className='col-6'>
						<div className='customer-info'>
							<h4>{t('booking.detail.customer.title')}</h4>
							<div className='row'>
								<div className='form-group mb-32 col-3'>
									<label htmlFor='gender'>{t('booking.detail.customer.gender.title')}</label>
									<select className='form-select select-home' id='gender'>
										<option>{t('booking.detail.customer.gender.mr')}</option>
										<option>{t('booking.detail.customer.gender.mrs')}</option>
									</select>
								</div>
								<div className='form-group mb-32 col-9'>
									<label htmlFor='fname'>{t('booking.detail.customer.fname')}</label>
									<input
										type='text'
										className='form-control input-text-home'
										id='fname'
										name='fname'
										value={fname}
										onChange={onChangeInputCustomer}
										required
										// {...register('firstName')}
									/>
									{/* <p className='alertValidation'>
										{FirstNameValidation != true ? 'Please input a valid name!' : ''}
									</p> */}
								</div>
							</div>

							<div className='form-group mb-32'>
								<label htmlFor='lname'>{t('booking.detail.customer.lname')}</label>
								<input
									type='text'
									className='form-control input-text-home'
									id='lname'
									name='lname'
									value={lname}
									onChange={onChangeInputCustomer}
									required
									// {...register('lastName')}
								/>
								{/* <p className='alertValidation'>
									{LastNameValidation != true ? 'Please input a valid name!' : ''}
								</p> */}
							</div>
							<div className='form-group mb-32'>
								<label htmlFor='email'>{t('booking.detail.customer.email')}</label>
								<input
									type='email'
									className='form-control input-text-home'
									id='email'
									name='email'
									value={email}
									onChange={onChangeInputCustomer}
									required
									// {...register('email')}
								/>
								{/* <p className='alertValidation'>
									{EmailValidation != true ? 'Please input a valid email!' : ''}
								</p> */}
							</div>
							<div className='row'>
								<div className='form-group mb-32 col-sm-6'>
									<label htmlFor='phone'>{t('booking.detail.customer.phone')}</label>
									<input
										type='text'
										className='form-control input-text-home'
										id='phone'
										name='phone'
										value={phone}
										onChange={onChangeInputCustomer}
										required
										// {...register('phone')}
									/>
									{/* <p className='alertValidation'>
										{PhoneValidation != true ? 'Please input a valid phone number!' : ''}
									</p> */}
								</div>
								<div className='form-group mb-32 col-sm-6'>
									<label htmlFor='idNumber'>{t('booking.detail.customer.idNumber')}</label>
									<input
										type='text'
										className='form-control input-text-home'
										id='idNumber'
										name='idNumber'
										value={idNumber}
										onChange={onChangeInputCustomer}
										required
										// {...register('idNumber')}
									/>
									{/* <p className='alertValidation'>
										{IdValidation != true ? 'Please input a valid ID number!' : ''}
									</p> */}
								</div>
							</div>

							<div className='form-group mb-32'>
								<label htmlFor='address' className='form-label'>
									{t('booking.detail.customer.address')}
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
			{showPolicy && <PolicyModal show={showPolicy} onClose={onClosePolicy} />}
		</div>
	);
};

export default BookingPage;
