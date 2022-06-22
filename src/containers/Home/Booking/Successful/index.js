import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pdf from 'react-to-pdf';
import './index.scss';
import { convertCurrency } from '../../../../utils/calculateRoomPrice';

const index = (props) => {
	const ref = React.createRef();
	const hotel = {
		name: 'DT Hotel',
		street: '1 Vo Van Ngan',
		district: 'Thu Duc City',
		city: 'Ho Chi Minh City',
		contact: '028 3722 1223',
		email: 'ptchc@hcmute.edu.vn',
	};
	const data = JSON.parse(localStorage.getItem('currentBooking'));

	if (!data) {
		return (
			<div className='p-20'>
				<h3>Couldn't find booking</h3>
				<Link to='/rooms'>Go to book</Link>
			</div>
		);
	}

	return (
		<div className='booking-success'>
			<div className='receipt' ref={ref}>
				<div className='receipt__head'>
					<div className='receipt__hotelinfo'>
						<div className='receipt__hotelinfo__name'>{hotel.name}</div>
						<div className='receipt__hotelinfo__road'>{hotel.street}</div>
						<div className='receipt__hotelinfo__district'>{hotel.district}</div>
						<div className='receipt__hotelinfo__city'>{hotel.city}</div>
						<div className='receipt__hotelinfo__contact'>{hotel.contact}</div>
						<div className='receipt__hotelinfo__email'>{hotel.email}</div>
					</div>
					<div className='receipt__title'>
						<h1>Booking Receipt</h1>
					</div>
				</div>
				<div className='receipt__line'></div>
				<div className='receipt__content'>
					<p>
						Dear Mr/Mrs. {data.customer.name.split(' ')[0]}, <br />
						<br />
						Please find below a information-breakdown for the recent booking. Please make a copy for
						any convenience in the future, and do not hesitate to contact us with any questions.
						<br />
						<br />
						Many thanks,
						<br />
						{hotel.name}
					</p>
				</div>
				<Table responsive className='receipt__table'>
					<tbody>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Fullname:</td>
							<td className='receipt__table__row__value'>{data.customer.name}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Citizen identity card number:</td>
							<td className='receipt__table__row__value'>{data.customer.idNumber}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Phone number:</td>
							<td className='receipt__table__row__value'>{data.customer.phone}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Email:</td>
							<td className='receipt__table__row__value'>{data.customer.email}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Address:</td>
							<td className='receipt__table__row__value'>{data.customer.address}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Rooms:</td>
							<td className='receipt__table__row__value'>
								{data.rooms.map((x) => {
									return (
										<span className='room' key={x._id}>
											{x.name}
										</span>
									);
								})}
							</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Check-in date:</td>
							<td className='receipt__table__row__value'>{data.checkInDate}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Check-out date:</td>
							<td className='receipt__table__row__value'>{data.checkOutDate}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Number of people:</td>
							<td className='receipt__table__row__value'>
								Adult: {data.customer.numberOfPeople.adult}
								<br />
								Children: {data.customer.numberOfPeople.adult}
							</td>
						</tr>
					</tbody>
				</Table>
				<div className='receipt__line'></div>
				<Table responsive className='receipt__table'>
					<tbody>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Deposit:</td>
							<td className='receipt__table__row__value'>{convertCurrency(data.deposit, 'USD')}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__titlecost'>Total:</td>
							<td className='receipt__table__row__valuecost'>
								{convertCurrency(data.total, 'USD')}
							</td>
						</tr>
					</tbody>
				</Table>
				<div className='receipt__footerpolicies'>
					<div className='receipt__footerpolicies__title'>CANCELLATION AND NO SHOW POLICY</div>
					<div className='receipt__footerpolicies__content'>
						- Up to 21 days before arrival: no charge
						<br />- Up to 3 days before arrival: 50% of the total reservation
						<br />- Less than 7 days before arrival, noshow or stays that are cut short: 100% of the
						total reservation
					</div>
				</div>
			</div>
			<Pdf targetRef={ref} filename='Receipt.pdf'>
				{({ toPdf }) => (
					<button className='receipt__button' onClick={toPdf}>
						Download receipt
					</button>
				)}
			</Pdf>
		</div>
	);
};

export default index;
