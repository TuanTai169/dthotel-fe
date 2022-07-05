import React from 'react';
import './index.scss';
import * as Images from './../Images/images';
import { useTranslation } from 'react-i18next';

const index = () => {
	const { t } = useTranslation();
	return (
		<div>
			<section className='header'>
				<div className='header__title'>{t('aboutUs.title')}</div>
			</section>
			<section className='abbody'>
				<div className='abbody__special'>
					<div className='abbody__special__item'>
						<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/shap_about.png' />
						<h3>{t('aboutUs.content.first.smTitle')}</h3>
						<h1>{t('aboutUs.content.first.title')}</h1>
						<p>{t('aboutUs.content.first.desc')}</p>
					</div>
					<div className='abbody__special__item'>
						<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/shap_about2.png' />
						<h3>{t('aboutUs.content.second.smTitle')}</h3>
						<h1>{t('aboutUs.content.second.title')}</h1>
						<p>{t('aboutUs.content.second.desc')}</p>
					</div>
					<div className='abbody__special__item'>
						<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/shap_about3.png' />
						<h3>{t('aboutUs.content.third.smTitle')}</h3>
						<h1>{t('aboutUs.content.third.title')}</h1>
						<p>{t('aboutUs.content.third.desc')}</p>
					</div>
				</div>
				<div className='abbody__history'>
					<div className='abbody__history__description'>
						<h3>{t('aboutUs.content.four.title')}</h3>
						<p>
							{t('aboutUs.content.four.desc1')}
							<br />
							<br />
							{t('aboutUs.content.four.desc2')}
						</p>
					</div>
					<div className='abbody__history__container'>
						<img src={Images.AboutUs.url[0]} className='abbody__overall__container__item' />
						<img src={Images.AboutUs.url[1]} className='abbody__overall__container__item' />
						<img src={Images.AboutUs.url[2]} className='abbody__overall__container__item' />
						<img src={Images.AboutUs.url[3]} className='abbody__overall__container__item' />
						<img src={Images.AboutUs.url[4]} className='abbody__overall__container__item' />
						<img src={Images.AboutUs.url[5]} className='abbody__overall__container__item' />
					</div>
				</div>
				<div className='abbody__room'>
					<div className='abbody__room__title'>
						<div className='abbody__room__title__back'>{t('aboutUs.content.five.title1')}</div>
						<div className='abbody__room__title__front'>{t('aboutUs.content.five.title2')}</div>
					</div>
					<div className='abbody__room__container'>
						<div className='abbody__room__container__item'>
							<p>{t('aboutUs.content.five.desc1')}</p>
							<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/about_rooms.jpg' />
						</div>
						<div className='abbody__room__container__item'>
							<p>{t('aboutUs.content.five.desc2')}</p>
							<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/about_rooms2.jpg' />
						</div>
					</div>
				</div>
				<div className='abbody__images__title'>{t('aboutUs.content.five.title1')}</div>
				<div className='abbody__images'>
					<div className='abbody__images__container'>
						<img className='flex2' src={Images.AboutUsEnd.url[0]} />
						<img src={Images.AboutUsEnd.url[2]} />
						<img src={Images.AboutUsEnd.url[3]} />
					</div>
					<div className='abbody__images__container'>
						<img src={Images.AboutUsEnd.url[4]} />
						<img src={Images.AboutUsEnd.url[5]} />
						<img className='flex2' src={Images.AboutUsEnd.url[1]} />
					</div>
				</div>
			</section>
		</div>
	);
};

export default index;
