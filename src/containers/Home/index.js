import React from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar/Navbar';
import header_img from './../../assets/images/Home__backgroungimg.png';
import DGV from './../../assets/images/rooms_images/DGV.png';
import './index.scss';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className='home'>
			<Navbar />
			<section className='home__header'>
				<div className='home__header__slogan'>
					<div className='home__header__slogan__title'>RECONNECT WITH NATURE</div>
					<div className='home__header__slogan__description'>
						Fifteen minutes drive from the center of
						<br />
						Dalat City is all it takes to get to this holiday haven.
						<br />
						Dalat de Charm Village is all about luxury aesthetics
						<br />
						and is the perfect sanctuary with a soul.
					</div>
				</div>
			</section>
			<section className='home__cards'>
				<div className='home__cards__title'>
					<div className='home__cards__title__background'>DT</div>
					<div className='home__cards__title__text'>THE PERFECTION FOR YOUR VACATION</div>
				</div>
				<div className='home__cards__container'>
					<div className='home__cards__container__description'>
						Boutique standard, 3 stars +
						<br />
						Romantic Europe architecture
						<br />
						Different room - Unique design
						<br />
						Scenic and panoramic view
						<br />
						Surrounded with Dalat cool atmosphere
						<br />
						Quintessential local cuisine
					</div>
					<div className='home__cards__container__items'>
						<div className='card-item'>
							<img src={DGV} alt='Deluxe Goft View' className='card-item__image' />
							<div className='card-item__information'>
								<h2 className='card-item__information__title'>DELUXE GOFT VIEW</h2>
								<p className='card-item__information__description'>
									Swiss-Belresort Tuyền Lâm, Đà Lạt bố trí 72 phòng Deluxe Golf View hướng ra bể bơi
									và có thể thấy được sân golf 18 lỗ tiêu chuẩn quốc tế đầy hiện đại.
								</p>
							</div>
						</div>
						<div className='card-item'>
							<img src={DGV} alt='Deluxe Goft View' className='card-item__image' />
							<div className='card-item__information'>
								<h2 className='card-item__information__title'>DELUXE GOFT VIEW</h2>
								<p className='card-item__information__description'>
									Swiss-Belresort Tuyền Lâm, Đà Lạt bố trí 72 phòng Deluxe Golf View hướng ra bể bơi
									và có thể thấy được sân golf 18 lỗ tiêu chuẩn quốc tế đầy hiện đại.
								</p>
							</div>
						</div>
						<div className='card-item'>
							<img src={DGV} alt='Deluxe Goft View' className='card-item__image' />
							<div className='card-item__information'>
								<h2 className='card-item__information__title'>DELUXE GOFT VIEW</h2>
								<p className='card-item__information__description'>
									Swiss-Belresort Tuyền Lâm, Đà Lạt bố trí 72 phòng Deluxe Golf View hướng ra bể bơi
									và có thể thấy được sân golf 18 lỗ tiêu chuẩn quốc tế đầy hiện đại.
								</p>
							</div>
						</div>
					</div>
					<Link className='home__cards__container__button' to='/rooms'>
						Find out more
					</Link>
				</div>
			</section>
			<ToastContainer autoClose={3000} theme='colored' />
		</div>
	);
};

export default Home;
