import React from 'react';
import { BiSend } from 'react-icons/bi';

const AvailableRoom = (props) => {
	const { room } = props;
	return (
		<div className='row room d-flex '>
			<div className='col-6 room-left'>
				<div className='room__image'>
					<img src={room.images[0].src} alt={room.images[0].alt} />
				</div>
			</div>
			<div className='col-6 room-right'>
				<div className='room__title'>Nguyen</div>
				<div className='room__desc'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolores recusandae,
					perferendis aperiam laboriosam voluptates aliquam porro excepturi vel temporibus ex ullam
					harum quis neque molestias similique iusto quos amet. Lorem ipsum dolor sit amet
					consectetur adipisicing elit.
				</div>
				<div className='room__more d-flex justify-content-end align-items-center'>
					<div className='btn-more'>
						<span>More</span> <BiSend />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AvailableRoom;
