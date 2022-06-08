import React, { useState } from 'react';
import InfoRoomModal from './InfoRoomModal';
import { RoomStatus } from '../../../assets/app/constants';

const RoomItem = (props) => {
	const [isInfoOpen, setIsInfoOpen] = useState(false);
	const { room } = props;
	const { roomNumber, price, status } = room;

	const handlerCloseInfoModal = () => setIsInfoOpen(false);

	return (
		<>
			<div
				className='status-card'
				style={{
					cursor: 'pointer',
					backgroundColor: RoomStatus[status].backgroundColor,
				}}
				onClick={() => {
					setIsInfoOpen(true);
				}}
			>
				<div className='status-card__info'>
					<h4>{roomNumber}</h4>
					<span>${price}</span>
				</div>
			</div>
			<InfoRoomModal room={room} show={isInfoOpen} handlerModalClose={handlerCloseInfoModal} />
		</>
	);
};

export default RoomItem;
