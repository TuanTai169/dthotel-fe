import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from './../Footer/Footer';
import './index.scss';
import DGV from './../../../assets/images/rooms_images/DGV.png';

const index = () => {
	return (
		<div>
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
							Area: 32m<sup>2</sup>
						</div>
						<div className='body__roominfo__detail__item'>
							Bed: King – Twin
						</div>
						<div className='body__roominfo__detail__item'>
							People: 02
						</div>
						<div className='body__roominfo__detail__item'>
							View: Mountain, Golf Course
						</div>
					</div>
					<div className='body__roominfo__container'>
						<img
							src={DGV}
							className='body__roominfo_container__image'
						/>
                        <img
							src={DGV}
							className='body__roominfo_container__image'
						/>
                        <img
							src={DGV}
							className='body__roominfo_container__image'
						/>
                        <img
							src={DGV}
							className='body__roominfo_container__image'
						/>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default index;
