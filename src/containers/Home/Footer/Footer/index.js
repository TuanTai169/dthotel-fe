import React from 'react';
import './index.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from './../../../../assets/images/LogoSwiss.png';
import instagram from './../../../../assets/images/social_media_icons/Instagram.png';
import youtube from './../../../../assets/images/social_media_icons/YouTube.png';
import facebook from './../../../../assets/images/social_media_icons/Facebook.png';

const index = () => {
	const { t } = useTranslation();
	return (
		<div>
			<section className='footer'>
				<div className='footer__container'>
					<div className='footer__container__img'>
						<img src={logo} alt='DT Logo' className='header__nav__content__items__logo' />
					</div>
					<div className='footer__container__infoterm'>
						<div className='footer__container__infoterm__title'>{t('footer.hotelInformation')}</div>
						<div className='footer__container__infoterm__items'>
							<Link className='footer__container__infoterm__item' to='/about-us'>
								{t('footer.aboutUs')}
							</Link>
							<Link className='footer__container__infoterm__item' to='/transfer'>
								{t('footer.transfers')}
							</Link>
							<Link className='footer__container__infoterm__item' to='/contact'>
								{t('footer.contactUs')}
							</Link>
							<Link className='footer__container__infoterm__item' to='/map'>
								{t('footer.map')}
							</Link>
						</div>
					</div>
					<div className='footer__container__infoterm2'>
						<div className='footer__container__infoterm2__title'>
							{t('footer.terms&Conditions')}
						</div>
						<div className='footer__container__infoterm2__items'>
							<Link className='footer__container__infoterm2__item' to='/privacy'>
								{t('footer.privacyPolicy')}
							</Link>
							<Link className='footer__container__infoterm2__item' to='/book-cancel'>
								{t('footer.booking&Cancellations')}
							</Link>
							<Link className='footer__container__infoterm2__item' to='/web-term'>
								{t('footer.websiteTerms')}
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
