import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './index.scss';
import * as Images from './../Images/images';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation();
	return (
		<div>
			<section className='header'>
				<div className='header__title'>{t('services.title')}</div>
			</section>
			<section className='body'>
				<div className='body__slider'>
					<div className='container'>
						<Slider {...settings}>
							<div>
								<img className='container__item' src={Images.Services.url[0]} />
							</div>
							<div>
								<img className='container__item' src={Images.Services.url[1]} />
							</div>
							<div>
								<img className='container__item' src={Images.Services.url[2]} />
							</div>
							<div>
								<img className='container__item' src={Images.Services.url[3]} />
							</div>
							<div>
								<img className='container__item' src={Images.Services.url[4]} />
							</div>
							<div>
								<img className='container__item' src={Images.Services.url[5]} />
							</div>
						</Slider>
					</div>
				</div>
				<div className='body__title'>
					<p className='body__title__0'>{t('services.content.first.title')}</p>
					<h2 className='body__title__1'>{t('services.content.first.desc')}</h2>
					<h1 className='body__title__2'>
						Spa of <span style={{ color: '#ffce6a' }}>DT Hotel</span>
					</h1>
				</div>
				<div className='body__container'>
					<div className='body__container__card'>
						<div className='body__container__card__1'>
							<div className='body__container__card__info'>
								<h3 className='title'>{t('services.content.second.title')}</h3>
								<p className='description'>{t('services.content.second.desc')}</p>
							</div>
						</div>
					</div>
					<div className='body__container__card'>
						<div className='body__container__card__2'>
							<div className='body__container__card__info'>
								<h3 className='title'>{t('services.content.third.title')}</h3>
								<p className='description'>{t('services.content.third.desc')}</p>
							</div>
						</div>
					</div>
					<div className='body__container__card'>
						<div className='body__container__card__3'>
							<div className='body__container__card__info'>
								<h3 className='title'>{t('services.content.four.title')}</h3>
								<p className='description'>{t('services.content.four.desc')}</p>
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
							<h2 className='first'>{t('services.content.five.title')}</h2>
							<p>{t('services.content.five.desc')}</p>
							<h2 className='second'>{t('services.content.six.title')}</h2>
							<p>{t('services.content.six.desc')}</p>
						</div>
					</div>
				</div>
				<div className='body__button'>
					<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/bg_care_spa.jpg' />
					<h2 className='body__button__title'>{t('services.treatASpa.title')}</h2>
					<div>
						<Link className='body__button__link' to='/rooms'>
							{t('services.treatASpa.link')}
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default index;
