import React from 'react';
import './styles.scss';
import { convertCurrency } from '../../../utils/calculateRoomPrice';

export const RoomPrice = (props) => {
	const { price, message, className } = props;
	return (
		<div className={`room-price ${className}`}>
			<h2>{convertCurrency(price, 'USD')}</h2>
			<p>{message}</p>
		</div>
	);
};
