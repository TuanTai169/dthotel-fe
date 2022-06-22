import React from 'react';
import { Table } from 'react-bootstrap';
import Pdf from 'react-to-pdf';
import './index.scss';

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
	return (
		<div style={{ background: 'white' }}>
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
						Dear Mr/Mrs. {props.customer.name.split(' ')[0]}, <br />
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
							<td className='receipt__table__row__value'>{props.customer.name}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Citizen identity card number:</td>
							<td className='receipt__table__row__value'>{props.customer.idNumber}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Phone number:</td>
							<td className='receipt__table__row__value'>{props.customer.phone}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Email:</td>
							<td className='receipt__table__row__value'>{props.customer.email}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Address:</td>
							<td className='receipt__table__row__value'>{props.customer.address}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Room's name:</td>
							<td className='receipt__table__row__value'>{props.data.rooms}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Check-in date:</td>
							<td className='receipt__table__row__value'>{props.data.checkInDate}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Check-out date:</td>
							<td className='receipt__table__row__value'>{props.data.checkOutDate}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Number of people:</td>
							<td className='receipt__table__row__value'>
								Adult: {props.customer.numberOfPeople.adult}
								<br />
								Children: {props.customer.numberOfPeople.adult}
							</td>
						</tr>
					</tbody>
				</Table>
				<div className='receipt__line'></div>
				<Table responsive className='receipt__table'>
					<tbody>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>Deposit:</td>
							<td className='receipt__table__row__value'>{props.data.deposit}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__titlecost'>Total:</td>
							<td className='receipt__table__row__valuecost'>{props.data.total}</td>
						</tr>
					</tbody>
				</Table>
				<div className='receipt__footerpolicies'>
					<div className='receipt__footerpolicies__title'>CANCELLATION AND NO SHOW POLICY</div>
					<div className='receipt__footerpolicies__content'>
						- Up to 21 days before arrival: no charge
						<br />- Up to 14 days before arrival: 30% of the total reservation
						<br />- Up to 7 days before arrival: 50% of the total reservation
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
