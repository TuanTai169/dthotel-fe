import React from 'react';
import './styles.scss';

export const RoomPrice = (props) => {
	const { price, message } = props;
	return (
		<div className='room-price'>
			<h2>US${price}</h2>
			<p>{message}</p>
		</div>
	);
};
