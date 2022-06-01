import React from 'react';
import { BiSend } from 'react-icons/bi';

const AvailableRoom = (props) => {
	const { room } = props;
	return (
		<div className='room col-4'>
			<div className='row'>
				<div className='col-6 room-left'>
					<div className='room__image'>
						<img src={room.images[0].src} alt={room.images[0].alt} />
					</div>
				</div>
				<div className=' col-6 room-right'>
					<div className='room__title'>{room.roomNumber}</div>
					<div className='room__desc'>{room.desc}</div>
					<div className='room__more d-flex justify-content-end align-items-center'>
						<div className='btn-more'>
							<span>More</span> <BiSend />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AvailableRoom;
