import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './index.scss';

const index = () => {
	var settings = {
		className: 'center',
		centerMode: true,
		infinite: true,
		autoplay: true,
		centerPadding: '8%',
		slidesToShow: 1,
		speed: 500,
		nextArrow: false,
		prevArrow: false,
	};
	return (
		<div>
			<section className='header'>
				<div className='header__title'>Service</div>
			</section>
			<section className='body'>
				<div className='body__slider'>
					<div className='container'>
						<Slider {...settings}>
							<div>
								<img
									className='container__item'
									src='https://samtuyenlamhotel.com.vn/wp-content/uploads/2017/11/SBI-spa3.jpg'
								/>
							</div>
							<div>
								<img
									className='container__item'
									src='https://samtuyenlamhotel.com.vn/wp-content/uploads/2017/07/slider_page_spa.jpg'
								/>
							</div>
							<div>
								<img
									className='container__item'
									src='https://samtuyenlamhotel.com.vn/wp-content/uploads/2017/07/slider_page_spa2.jpg'
								/>
							</div>
							<div>
								<img
									className='container__item'
									src='https://samtuyenlamhotel.com.vn/wp-content/uploads/2017/10/SBI-spa-1-1.jpg'
								/>
							</div>
							<div>
								<img
									className='container__item'
									src='https://samtuyenlamhotel.com.vn/wp-content/uploads/2017/11/SBI-spa6-1.jpg'
								/>
							</div>
						</Slider>
					</div>
				</div>
				<div className='body__title'>
					<p className='body__title__0'>Recover yourself at Zen Spa</p>
					<h2 className='body__title__1'>
						Swiss-Belresort Zen Spa will take care and regenerate energy for your body.
					</h2>
					<h1 className='body__title__2'>
						Spa of <span style={{ color: '#ffce6a' }}>Swiss-Belresort Tuyen Lam</span>
					</h1>
				</div>
				<div className='body__container'>
					<div className='body__container__card'>
						<div className='body__container__card__1'>
							<div className='body__container__card__info'>
								<h3 className='title'>Body Treatment</h3>
								<p className='description'>We have therapies to regenerate and restore your body</p>
							</div>
						</div>
					</div>
					<div className='body__container__card'>
						<div className='body__container__card__2'>
							<div className='body__container__card__info'>
								<h3 className='title'>Facial Treatment</h3>
								<p className='description'>
									Take care of your beauty with its natural materials, technical and modern
									facilities
								</p>
							</div>
						</div>
					</div>
					<div className='body__container__card'>
						<div className='body__container__card__3'>
							<div className='body__container__card__info'>
								<h3 className='title'>Sauna & Steam bath</h3>
								<p className='description'>
									Saunas are considered a great help in health care and protection. We have a dry
									and wet bathroom in two separate areas for men and women.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='body__service'>
					<div className='body__service__content'>
						<img
							className='body__service__content__image'
							src='https://samtuyenlamhotel.com.vn/wp-content/uploads/2017/10/SBI-spa-1-1.jpg'
							alt='DT Hotel Spa Service'
						/>

						<div className='body__service__content__description'>
							<h2 className='first'>Comfort Anbience</h2>
							<p>
								The first step into the Zen Spa, customer will feel like step into another world
								with yellow light, relaxing herbal aroma and splendid space as Europe Catsle's
								smell.
							</p>
							<h2 className='second'>Sauna Steam Bath</h2>
							<p>
								Zen Spa has private space to pamper your body with massage roo, sauna, jacuzzi, bath
								room, gym, swimming pool ...
							</p>
						</div>
					</div>
				</div>
				<div className='body__button'>
					<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/bg_care_spa.jpg' />
					<h2 className='body__button__title'>Treat your a Spa-cation</h2>
					<div>
						<Link className='body__button__link' to='/rooms'>
							Book now
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default index;
