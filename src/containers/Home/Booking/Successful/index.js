import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pdf from 'react-to-pdf';
import { useTranslation } from 'react-i18next';
import './index.scss';
import { convertCurrency } from '../../../../utils/calculateRoomPrice';

const index = (props) => {
	const { t } = useTranslation();
	const ref = React.createRef();
	const hotel = {
		name: t('bookingSuccess.hotel.name'),
		street: t('bookingSuccess.hotel.street'),
		district: t('bookingSuccess.hotel.district'),
		city: t('bookingSuccess.hotel.city'),
		contact: t('bookingSuccess.hotel.contact'),
		email: t('bookingSuccess.hotel.email'),
	};
	const data = JSON.parse(localStorage.getItem('currentBooking'));

	if (!data) {
		return (
			<div className='p-20'>
				<h3>{t('bookingSuccess.notFound.title')}</h3>
				<Link to='/rooms'>{t('bookingSuccess.notFound.link')}</Link>
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
						<h1>{t('bookingSuccess.title')}</h1>
					</div>
				</div>
				<div className='receipt__line'></div>
				<div className='receipt__content'>
					<p>
						{t('bookingSuccess.content.dear', { name: data.customer.name.split(' ')[0] })} , <br />
						<br />
						{t('bookingSuccess.content.confirm')}
						<br />
						<br />
						{t('bookingSuccess.content.thanks')}
						<br />
						{hotel.name}
					</p>
				</div>
				<Table responsive className='receipt__table'>
					<tbody>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>
								{t('bookingSuccess.content.customer.fname')}
							</td>
							<td className='receipt__table__row__value'>{data.customer.name}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>
								{t('bookingSuccess.content.customer.idNumber')}
							</td>
							<td className='receipt__table__row__value'>{data.customer.idNumber}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>
								{t('bookingSuccess.content.customer.phone')}
							</td>
							<td className='receipt__table__row__value'>{data.customer.phone}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>
								{t('bookingSuccess.content.customer.email')}
							</td>
							<td className='receipt__table__row__value'>{data.customer.email}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>
								{t('bookingSuccess.content.customer.address')}
							</td>
							<td className='receipt__table__row__value'>{data.customer.address}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>
								{t('bookingSuccess.content.customer.rooms')}
							</td>
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
							<td className='receipt__table__row__title'>
								{t('bookingSuccess.content.customer.checkInDate')}
							</td>
							<td className='receipt__table__row__value'>{data.checkInDate}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>
								{t('bookingSuccess.content.customer.checkOutDate')}
							</td>
							<td className='receipt__table__row__value'>{data.checkOutDate}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>
								{t('bookingSuccess.content.customer.numberOfPeople')}
							</td>
							<td className='receipt__table__row__value'>
								{t('bookingSuccess.content.customer.adult', {
									adult: data.customer.numberOfPeople.adult,
								})}
								<br />
								{t('bookingSuccess.content.customer.child', {
									child: data.customer.numberOfPeople.child,
								})}
							</td>
						</tr>
					</tbody>
				</Table>
				<div className='receipt__line'></div>
				<Table responsive className='receipt__table'>
					<tbody>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__title'>
								{t('bookingSuccess.content.customer.deposit')}
							</td>
							<td className='receipt__table__row__value'>{convertCurrency(data.deposit, 'USD')}</td>
						</tr>
						<tr className='receipt__table__row'>
							<td className='receipt__table__row__titlecost'>
								{t('bookingSuccess.content.customer.total')}
							</td>
							<td className='receipt__table__row__valuecost'>
								{convertCurrency(data.total, 'USD')}
							</td>
						</tr>
					</tbody>
				</Table>
				<div className='receipt__footerpolicies'>
					<div className='receipt__footerpolicies__title'>
						{t('bookingSuccess.content.cancel.title')}
					</div>
					<div className='receipt__footerpolicies__content'>
						{t('bookingSuccess.content.cancel.desc1')}
						<br />
						{t('bookingSuccess.content.cancel.desc2')}
						<br />
						{t('bookingSuccess.content.cancel.desc3')}
					</div>
				</div>
			</div>
			<Pdf targetRef={ref} filename='Receipt.pdf'>
				{({ toPdf }) => (
					<button className='receipt__button' onClick={toPdf}>
						{t('bookingSuccess.content.download')}
					</button>
				)}
			</Pdf>
		</div>
	);
};

export default index;
