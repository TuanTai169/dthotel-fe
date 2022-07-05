import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';
import { Link } from 'react-router-dom';
import './index.scss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RoomPrice } from '../../../components/Common/Utils';

const index = () => {
	const room = useSelector((state) => state.roomReducer.room);
	const settings = {
		autoplay: true,
	};
	const { t } = useTranslation();
	return (
		<div>
			{room && (
				<>
					<section className='header'>
						<div className='header__title'>{t('rooms.details.title')}</div>
					</section>
					<section className='body'>
						<div className='body__roominfo'>
							<div className='body__roominfo__title'>
								<p className='body__roominfo__title__fill text-uppercase'>{room?.name}</p>
							</div>
							<div className='body__roominfo__description'>{room.detail.desc}</div>
							<div className='body__roominfo__detail'>
								<div className='body__roominfo__detail__item'>
									<p>
										{t('rooms.details.area')} {room.roomType?.size}
										<sup>2</sup>
									</p>
									<p>
										{t('rooms.details.bed')}{' '}
										{room.bed?.single > 0 && room.bed?.single + ` single room,`}
										{room.bed?.double > 0 && room.bed?.double + ` double room`}
									</p>
									<p>
										{t('rooms.details.people')} {room.capacity?.adult}
									</p>
									<p>{t('rooms.details.view')}</p>
									<p>{t('rooms.details.minibar')}</p>
									<p>{t('rooms.details.bathtub')}</p>
									<p>{t('rooms.details.hotAndCold')}</p>
									<p>{t('rooms.details.teaAndCoffee')}</p>
									<p>{t('rooms.details.tv')}</p>
									<h1 className='body__roominfo__price'></h1>
								</div>
								<div className='body__roominfo__detail__slider'>
									<div className='container'>
										<Slider {...settings}>
											{Array.isArray(room.images) &&
												room.images.length > 0 &&
												room.images.map((i) => (
													<img key={i.alt} className='container__item' src={i.src} alt={i.alt} />
												))}
										</Slider>
									</div>
									<div className='body__button '>
										<RoomPrice
											price={room.price ? room.price : 0}
											message={`for 1 night`}
											className='text-home-color'
										/>
										<Link className='body__button__link top-100' to='/rooms'>
											<p>{t('rooms.bookNow')}</p>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className='body__navigation'>
							<h1 className='body__navigation__title'>MORE ROOMS</h1>
							<div className='body__navigation__container part1'>
								<Link className='body__navigation__item' to='/rooms'>
									<h1 className='order'>01</h1>
									<h3 className='name'>KING SUITE MOUNTAIN VIEW</h3>
								</Link>
								<Link className='body__navigation__item' to='/rooms'>
									<h1 className='order'>02</h1>
									<h3 className='name'>STUDIO MOUNTAIN VIEW</h3>
								</Link>
								<Link className='body__navigation__item' to='/rooms'>
									<h1 className='order'>03</h1>
									<h3 className='name'>PENTHOUSE TERRACE GOLF VIEW</h3>
								</Link>
							</div>
							<div className='body__navigation__container part2'>
								<Link className='body__navigation__item' to='/rooms'>
									<h1 className='order'>04</h1>
									<h3 className='name'>DELUXE GOLF VIEW</h3>
								</Link>
								<Link className='body__navigation__item' to='/rooms'>
									<h1 className='order'>05</h1>
									<h3 className='name'>FAMILY DELUXE GOLF VIEW</h3>
								</Link>
								<Link className='body__navigation__item' to='/rooms'>
									<h1 className='order'>06</h1>
									<h3 className='name'>ROYAL SUITE MOUNTAIN VIEW</h3>
								</Link>
							</div>
						</div>
					</section>
				</>
			)}
		</div>
	);
};

export default index;
