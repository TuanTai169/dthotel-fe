import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import logo from './../../../../assets/images/LogoSwiss.png';
import instagram from './../../../../assets/images/social_media_icons/Instagram.png';
import youtube from './../../../../assets/images/social_media_icons/YouTube.png';
import facebook from './../../../../assets/images/social_media_icons/Facebook.png';

const index = () => {
	return (
		<div>
			<section className='footer'>
				<div className='footer__container'>
					<div className='footer__container__img'>
						<img src={logo} alt='DT Logo' className='header__nav__content__items__logo' />
					</div>
					<div className='footer__container__infoterm'>
						<div className='footer__container__infoterm__title'>Hotel Information</div>
						<div className='footer__container__infoterm__items'>
							<Link className='footer__container__infoterm__item' to='/about-us'>
								About Us
							</Link>
							<Link className='footer__container__infoterm__item' to='/transfer'>
								Transfers
							</Link>
							<Link className='footer__container__infoterm__item' to='/contact'>
								Contact Us
							</Link>
							<Link className='footer__container__infoterm__item' to='/map'>
								Map
							</Link>
						</div>
					</div>
					<div className='footer__container__infoterm2'>
						<div className='footer__container__infoterm2__title'>Terms & Conditions</div>
						<div className='footer__container__infoterm2__items'>
							<Link className='footer__container__infoterm2__item' to='/privacy'>
								Privacy Policy
							</Link>
							<Link className='footer__container__infoterm2__item' to='/book-cancel'>
								Booking & Cancelations
							</Link>
							<Link className='footer__container__infoterm2__item' to='/web-term'>
								Website Terms
							</Link>
						</div>
					</div>
				</div>
				<div className='footer__line'></div>
				<div className='footer__otherinfor'>
					<div className='footer__otherinfor__social'>
						<a href='https://instagram.com' className='footer__otherinfor__social-item'>
							<img src={instagram} alt='Instagram logo' />
						</a>
						<a href='https://youtube.com' className='footer__otherinfor__social-item'>
							<img src={youtube} alt='YouTube logo' />
						</a>
						<a href='https://facebook.com' className='footer__otherinfor__social-item'>
							<img src={facebook} alt='Facebook logo' />
						</a>
					</div>
					<div className='footer__otherinfor__copyright'>COPYRIGHT © 2022 DTHOTEL</div>
				</div>
			</section>
		</div>
	);
};

export default index;
