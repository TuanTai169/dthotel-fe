import React, { useState } from 'react';
import { RoomPrice } from '../../../../components/Common/Utils';
import { BiGroup, BiChevronsRight, BiChevronsLeft } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { findRoom } from '../../../../redux/actions/room';
import { imageDefault } from '../../../../assets/app/constants';

const AvailableRoom = (props) => {
	const { room, onSelect } = props;
	const { images, name, price, detail, bed, roomType, convenience, capacity } = room;
	const [more, showMore] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onChangeChecked = (e) => {
		onSelect({ room, [e.target.name]: e.target.checked });
	};
	const onDetail = (e) => {
		e.preventDefault();
		dispatch(findRoom(room._id));
		navigate('/rooms-detail');
	};
	return (
		<div className='room row mb-20'>
			<div className='col-5 room-left'>
				<div className='room__image'>
					<img
						src={images.length > 0 ? images[0].src : imageDefault.src}
						alt={images.length > 0 ? images[0].alt : imageDefault.alt}
					/>
				</div>
				<div className='room__price'>
					<RoomPrice price={price} message='per night' />
				</div>
			</div>
			<div className=' col-7 room-right'>
				<div className='room__title' onClick={onDetail}>
					{name}
				</div>
				<div className='room__desc'>
					<p>{detail.desc}</p>
				</div>
				<div className='room__special'>
					<div className='room__special-item'>
						<span>
							{roomType.size} m<sup>2</sup>
						</span>
					</div>
					{bed.single > 0 && (
						<div className='room__special-item'>
							<span>{bed.single} single bed</span>
						</div>
					)}
					{bed.double > 0 && (
						<div className='room__special-item'>
							<span> {bed.double} double bed</span>
						</div>
					)}
					{detail.bedRoom > 0 && (
						<div className='room__special-item'>
							<span>{detail.bedRoom} bed room</span>
						</div>
					)}
					{more && (
						<>
							{detail.bathRoom > 0 && (
								<div className='room__special-item'>
									<span>{detail.bathRoom} bath room</span>
								</div>
							)}
							{detail.livingRoom > 0 && (
								<div className='room__special-item'>
									<span>{detail.livingRoom} living Room</span>
								</div>
							)}
							{detail.kitchen > 0 && (
								<div className='room__special-item'>
									<span>{detail.kitchen} kitchen</span>
								</div>
							)}

							{Array.isArray(convenience) &&
								convenience.length > 0 &&
								convenience.map((item) => (
									<div className='room__special-item'>
										<span key={item._id}>{item.name} </span>
									</div>
								))}
						</>
					)}
					<div
						className='room__special-more'
						style={{ fontSize: 20 }}
						onClick={() => showMore(!more)}
					>
						{more ? <BiChevronsLeft /> : <BiChevronsRight />}
					</div>
				</div>

				<div className='room__capacity'>
					<div className='adult'>
						<BiGroup className='icon' />
						<span>{capacity?.adult} adults</span>
					</div>

					<div className='room__choose d-flex'>
						<span className='text-uppercase'>Choose: </span>
						<input
							type='checkbox'
							id={room._id}
							className='switch-input'
							name='isChecked'
							onChange={onChangeChecked}
						/>
						<label htmlFor={room._id} className='switch'></label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AvailableRoom;
