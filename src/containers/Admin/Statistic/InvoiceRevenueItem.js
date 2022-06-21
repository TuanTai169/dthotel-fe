import React from 'react';
import { convertStringToDate } from '../../../utils/convertDateTime';

const InvoiceRevenueItem = (props) => {
	const { receipt } = props;
	console.log(receipt);

	const checkInDate = convertStringToDate(receipt.checkInDate);
	const checkOutDate = convertStringToDate(receipt.checkOutDate);

	return (
		<>
			<td>{receipt.bookingId}</td>
			<td>{receipt.customer}</td>
			<td>{checkInDate}</td>
			<td>{checkOutDate}</td>
			<td>{receipt.deposit}</td>
			<td>{receipt.discount ? receipt.discount?.discount : 0}</td>
			<td>{receipt.VAT}</td>
			<td>{receipt.totalPrice}</td>
			<td>{receipt.paidOut}</td>
			<td>{receipt.refund}</td>
		</>
	);
};

export default InvoiceRevenueItem;
