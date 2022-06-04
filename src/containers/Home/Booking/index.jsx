import React from 'react';
import './style.scss';

const BookingPage = () => {
	return (
		<div className='booking-page'>
			<div className='title'>
				<span className='web-name'>TItle</span>
			</div>
			<div className='time-check'>
				<p>Check-in: Monday, July 11, 2022 from 14:00 </p>
				<p>Check-out: Thursday, July 14, 2022 until 12:00 </p>
				<span>(Travelling on different dates?)</span>
			</div>
			<div className='room-info row'>
				<div className='col-8'>
					<h4>Deluxe Twin Mountain View</h4>
					<span>Free cancellation before Jul 08, 2022</span>
					<p>Breakfast included</p>
					<p>Details: 1 room, 3 nights, 2 adults included in price</p>
					<div className='row'>
						<div className='col-3'>
							<label>Number of units</label>
							<select className='select-number' name='numberOfRoom'>
								<option value='1'>1 rooms</option>
								<option value='2'>2 rooms</option>
								<option value='3'>3 rooms</option>
								<option value='4'>4 rooms</option>
							</select>
						</div>
						<div className='col-3'>
							<label>Number of adults</label>
							<select className='select-number' name='numberOfRoom'>
								<option value='1'>1 adults</option>
								<option value='2'>2 adults</option>
								<option value='3'>3 adults</option>
								<option value='4'>4 adults</option>
							</select>
						</div>
						<div className='col-3'>
							<label>Number of child</label>
							<select className='select-number' name='numberOfRoom'>
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
					<span>Booking Policies</span>
				</div>
			</div>
			<div className='summary-price'>
				<h4>Deluxe Twin Mountain View</h4>
			</div>
			<div className='customer-info'>customer info</div>
			<div className='policy'>policies</div>
			<div className='payment'>payment</div>
		</div>
	);
};

export default BookingPage;
