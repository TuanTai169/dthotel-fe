import React from 'react';
import { convertStringToDate } from '../../../utils/convertDateTime';

const ServiceRevenueItem = (props) => {
	const { service } = props;
	const checkOutDate = convertStringToDate(service.checkOutDate);
	return (
		<>
			<td>{service.service}</td>
			<td>{service.bookingId}</td>
			<td>{checkOutDate}</td>
			<td>{service.amount}</td>
			<td>{service.price}</td>
			<td>{service.price * service.amount}</td>
		</>
	);
};

export default ServiceRevenueItem;
