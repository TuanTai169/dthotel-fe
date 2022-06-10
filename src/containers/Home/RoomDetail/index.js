import React from 'react';
import Slider from 'react-slick';
import ScrollToTop from 'react-scroll-to-top';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';
import DGV from './../../../assets/images/rooms_images/DGV.png';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from './../Footer/Footer';
import './index.scss';

const index = () => {
	var settings = {
		autoplay: true,
	};
	return (
		<div>
			<ScrollToTop
				smooth
				color='$dark-blue'
				style={{ backgroundColor: '#ffce6a' }}
			/>
			<Navbar />
			<section className='header'>
				<div className='header__title'>Rooms Details</div>
			</section>
			<section className='body'>
				<div className='body__roominfo'>
					<div className='body__roominfo__title'>
						<p className='body__roominfo__title__fill'>
							DELUXE MOUNTAIN VIEW
						</p>
					</div>
					<div className='body__roominfo__description'>
						Swiss-Belresort Tuyền Lâm bố trí 45 phòng Deluxe
						Mountain View hướng ra đồi thông hùng vỹ. Là
						loại phòng có đầy đủ tiện nghi thiết yếu phục vụ
						quý khách hàng, cùng với lựa chọn loại 01 giường
						King size, Holywood size hoặc 02 giường đơn...
					</div>
					<div className='body__roominfo__detail'>
						<div className='body__roominfo__detail__item'>
							<p>
								Area: 32m<sup>2</sup>
							</p>
							<p>Bed: King – Twin</p>
							<p>People: 02</p>
							<p>View: Mountain, Golf Course</p>
							<p>Minibar/Fridge: Yes</p>
							<p>Bathtub/shower: Yes</p>
							<p>Hot and cold water system: Yes</p>
							<p>Tea - Coffee - Kettle: Yes</p>
							<p>Tivi: Yes</p>
							<h1 className='body__roominfo__price'></h1>
						</div>
						<div className='body__roominfo__detail__slider'>
							<div className='container'>
								<Slider {...settings}>
									<div>
										<img
											className='container__item'
											src={DGV}
										/>
									</div>
									<div>
										<img
											className='container__item'
											src={DGV}
										/>
									</div>
									<div>
										<img
											className='container__item'
											src={DGV}
										/>
									</div>
									<div>
										<img
											className='container__item'
											src={DGV}
										/>
									</div>
									<div>
										<img
											className='container__item'
											src={DGV}
										/>
									</div>
								</Slider>
							</div>
							<div className='body__button'>
								<Link
									className='body__button__link'
									to='/services'
								>
									<h2>$120/night</h2>
									<p>Book now</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className='body__navigation'>
					<h1 className='body__navigation__title'>
						MORE ROOMS
					</h1>
					<div className='body__navigation__container part1'>
						<Link
							className='body__navigation__item'
							to='/rooms-detail'
						>
							<h1 className='order'>01</h1>
							<h3 className='name'>
								KING SUITE MOUNTAIN VIEW
							</h3>
						</Link>
						<Link
							className='body__navigation__item'
							to='/rooms-detail'
						>
							<h1 className='order'>02</h1>
							<h3 className='name'>STUDIO MOUNTAIN VIEW</h3>
						</Link>
						<Link
							className='body__navigation__item'
							to='/rooms-detail'
						>
							<h1 className='order'>03</h1>
							<h3 className='name'>
								PENTHOUSE TERRACE GOLF VIEW
							</h3>
						</Link>
					</div>
					<div className='body__navigation__container part2'>
						<Link
							className='body__navigation__item'
							to='/rooms-detail'
						>
							<h1 className='order'>04</h1>
							<h3 className='name'>DELUXE GOLF VIEW</h3>
						</Link>
						<Link
							className='body__navigation__item'
							to='/rooms-detail'
						>
							<h1 className='order'>05</h1>
							<h3 className='name'>
								FAMILY DELUXE GOLF VIEW
							</h3>
						</Link>
						<Link
							className='body__navigation__item'
							to='/rooms-detail'
						>
							<h1 className='order'>06</h1>
							<h3 className='name'>
								ROYAL SUITE MOUNTAIN VIEW
							</h3>
						</Link>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default index;
