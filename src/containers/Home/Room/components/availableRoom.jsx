import React from 'react';
import { RoomPrice } from '../../../../components/Common/Utils';
import { BiGroup } from 'react-icons/bi';

const AvailableRoom = (props) => {
	const { room } = props;
	const { images, price, roomNumber, desc, roomType, convenience, capacity } = room;
	return (
		<div className='list-room row'>
			<div className='room col-9'>
				<div className='row'>
					<div className='col-5 room-left'>
						<div className='room__image'>
							<img src={images[0].src} alt={images[0].alt} />
						</div>
						<div className='room__price'>
							<RoomPrice price={price} message='per night' />
						</div>
					</div>
					<div className=' col-7 room-right'>
						<div className='room__title'>{roomNumber}</div>
						<div className='room__desc'>{desc}</div>
						<div className='room__special'>
							<div className='room__types'>
								<p>
									<strong>Types: </strong>
									{Array.isArray(roomType) &&
										roomType.map((type) => <span key={type._id}>{type.nameTag} </span>)}
								</p>
							</div>
							<div className='room__convenience'>
								<p>
									<strong>Convenience: </strong>
									{Array.isArray(convenience) &&
										convenience.map((item) => <span key={item._id}>{item.name} </span>)}
								</p>
							</div>
						</div>
						<div className='room__capacity'>
							<div className='adult'>
								<BiGroup className='icon' />
								<span>{capacity?.adult} adults</span>
							</div>
							<div className='child'>
								<BiGroup className='icon' />
								<span>{capacity?.child} childs</span>
							</div>

							<select className='select-number' name='numberOfRoom'>
								<option value='1'>1 rooms</option>
								<option value='2'>2 rooms</option>
								<option value='3'>3 rooms</option>
								<option value='4'>4 rooms</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div className='booking col-3'>
				<button>Book Now</button>
				<p>1 room</p>
				<RoomPrice price={1000} message='for 3 night' />
			</div>
		</div>
	);
};

export default AvailableRoom;
