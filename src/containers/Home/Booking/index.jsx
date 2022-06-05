import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BiInfoCircle } from 'react-icons/bi';
import { imageDefault, imagePayPal, imageVNPay } from '../../../assets/app/constants';
import './style.scss';

const BookingPage = () => {
	const [showPolicy, setShowPolicy] = useState(false);
	return (
		<div className='format-default booking-page'>
			<form className='booking-page-form'>
				<div className='title flex-center'>
					<span className='web-name'>Booking Detail</span>
				</div>
				<div className='time-check'>
					<p>Check-in: Monday, July 11, 2022 from 14:00 </p>
					<p>Check-out: Thursday, July 14, 2022 until 12:00 </p>
					<span>(Travelling on different dates?)</span>
				</div>
				<div className='room-info row'>
					<div className='col-8 px-0'>
						<h4>Deluxe Twin Mountain View</h4>
						<span>Free cancellation before Jul 08, 2022</span>
						<p>Breakfast included</p>
						<p>Details: 1 room, 3 nights, 2 adults included in price</p>
						<div className='row'>
							<div className='col-3'>
								<label>Number of units</label>
								<select className='select-number select-home' name='numberOfRoom'>
									<option value='1'>1 rooms</option>
									<option value='2'>2 rooms</option>
									<option value='3'>3 rooms</option>
									<option value='4'>4 rooms</option>
								</select>
							</div>
							<div className='col-3'>
								<label>Number of adults</label>
								<select className='select-number select-home' name='numberOfRoom'>
									<option value='1'>1 adults</option>
									<option value='2'>2 adults</option>
									<option value='3'>3 adults</option>
									<option value='4'>4 adults</option>
								</select>
							</div>
							<div className='col-3'>
								<label>Number of child</label>
								<select className='select-number select-home' name='numberOfRoom'>
									<option value='1'>1 child</option>
									<option value='2'>2 child</option>
									<option value='3'>3 child</option>
									<option value='4'>4 child</option>
								</select>
							</div>
						</div>
					</div>
					<div className='col-4 total-price'>
						<h3>₫ 9.962.547</h3>
						<h4>US$ 427.94</h4>
						<span className='show-policy' onClick={() => setShowPolicy(true)}>
							Booking Policies <BiInfoCircle />
						</span>
					</div>
				</div>
				<div className='row'>
					<div className='col-6'>
						<div className='summary-price'>
							<h4>Summary price</h4>
							<div className='d-flex justify-content-between'>
								<p>Accommodation charges</p>
								<div className='price'>
									<span>₫ 9.962.547,00</span>
									<p>US$ 427.94</p>
								</div>
							</div>
							<div className='d-flex justify-content-between'>
								<p>Taxes 10%</p>
								<div className='price'>
									<span>₫ 996.254,7</span>
									<p>US$ 42.8</p>
								</div>
							</div>
							<div className='d-flex justify-content-between border-top-main-color'>
								<p>Total price</p>
								<div className='price'>
									<span>₫ 10.958.801,7</span>
									<p>US$ 470.74</p>
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
									<select className='form-select select-home' id='payment'>
										<option>PayPal</option>
										<option>VNPay</option>
									</select>
								</div>
								<div className='mb-3 flex-center info-payment col-sm-8'>
									<img src={imagePayPal.src} className='img-payment' alt={imagePayPal.alt} />
									<img src={imageVNPay.src} className='img-payment' alt={imageVNPay.alt} />
								</div>
							</div>

							<div className='mb-3 form-check flex-center'>
								<input className='form-check-input' type='checkbox' value='' />
								<label className='form-check-label '>
									I have read and agree to the{' '}
									<span className='show-policy' onClick={() => setShowPolicy(true)}>
										Booking Policies
									</span>
									.
								</label>
							</div>
							<div className='flex-center'>
								<span className='btn-home'>Confirm and Book</span>
							</div>
						</div>
					</div>
					<div className='col-6'>
						<div className='customer-info'>
							<h4>Customer detail</h4>
							<div className='row'>
								<div className='form-group mb-3 col-3'>
									<label htmlFor='gender'>Gender</label>
									<select className='form-select select-home' id='gender'>
										<option>Mr</option>
										<option>Mis</option>
									</select>
								</div>
								<div className='form-group mb-3 col-9'>
									<label htmlFor='fname'>First name*</label>
									<input type='text' className='form-control input-text-home' id='fname' required />
								</div>
							</div>

							<div className='form-group mb-3'>
								<label htmlFor='lname'>Last name*</label>
								<input type='text' className='form-control input-text-home' id='lname' required />
							</div>
							<div className='form-group mb-3'>
								<label htmlFor='email'>Email*</label>
								<input type='email' className='form-control input-text-home' id='email' required />
							</div>
							<div className='row'>
								<div className='form-group mb-3 col-sm-6'>
									<label htmlFor='phone'>Phone*</label>
									<input type='text' className='form-control input-text-home' id='phone' required />
								</div>
								<div className='form-group mb-3 col-sm-6'>
									<label htmlFor='idNumber'>ID Number*</label>
									<input
										type='text'
										className='form-control input-text-home'
										id='idNumber'
										required
									/>
								</div>
							</div>

							<div className='form-group mb-3'>
								<label htmlFor='address' className='form-label'>
									Address
								</label>
								<textarea
									className='form-control input-text-home mb-58'
									id='address'
									rows='3'
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
