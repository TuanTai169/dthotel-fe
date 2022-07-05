import React from 'react';
import { Link } from 'react-router-dom';
import Spa from './../../../assets/images/spa.png';
import pinebranch1 from './../../../assets/images/pinebranch1.png';
import pinebranch2 from './../../../assets/images/pinebranch2.png';
import * as Room from './../Images/images';
import { useTranslation } from 'react-i18next';

const LandingPage = () => {
	const { t } = useTranslation();
	return (
		<>
			<section className='home__header'>
				<div className='home__header__slogan'>
					<div className='home__header__slogan__title'>{t('home.slogan1.title')}</div>
					<div className='home__header__slogan__description'>{t('home.slogan1.desc')}</div>
				</div>
			</section>
			<section className='home__cards'>
				<div className='home__cards__title'>
					<div className='home__cards__title__background'>DT</div>
					<div className='home__cards__title__text'>{t('home.slogan2.title')}</div>
				</div>
				<div className='home__cards__container'>
					<div className='home__cards__container__description'>{t('home.slogan2.desc')}</div>
					<div className='home__cards__container__items'>
						<div className='card-item'>
							<img
								src={Room.DeluxeGolfView.url[0]}
								alt='Deluxe Goft View'
								className='card-item__image'
							/>
							<div className='card-item__information'>
								<h2 className='card-item__information__title'>{t('home.rooms.goft.title')}</h2>
								<p className='card-item__information__description'>
									{t('home.rooms.goft.shortDesc')}
								</p>
							</div>
						</div>
						<div className='card-item'>
							<img
								src={Room.DeluxeMountainView.url[0]}
								alt='Deluxe Mountain View'
								className='card-item__image'
							/>
							<div className='card-item__information'>
								<h2 className='card-item__information__title'>{t('home.rooms.mountain.title')}</h2>
								<p className='card-item__information__description'>
									{t('home.rooms.mountain.shortDesc')}
								</p>
							</div>
						</div>
						<div className='card-item'>
							<img
								src={Room.StudioMountainView.url[0]}
								alt='Studio Mountain View'
								className='card-item__image'
							/>
							<div className='card-item__information'>
								<h2 className='card-item__information__title'>{t('home.rooms.studio.title')}</h2>
								<p className='card-item__information__description'>
									{t('home.rooms.studio.shortDesc')}
								</p>
							</div>
						</div>
					</div>
					<div className='home__cards__container__button'>
						<Link className='home__cards__container__button__link' to='/rooms'>
							{t('home.rooms.findOutMore')}
						</Link>
					</div>
				</div>
			</section>
			<section className='home__service'>
				<h1 className='home__service__title'>DT Hotel Spa</h1>
				<img
					className='home__service__bgimage filter'
					src={pinebranch2}
					alt='Service background image'
				/>
				<div className='home__service__content'>
					<img className='home__service__content__image' src={Spa} alt='DT Hotel Spa Service' />

					<div className='home__service__content__description'>
						<h2 className='first'>{t('home.spa.first.title')}</h2>
						<p>{t('home.spa.first.shortDesc')}</p>
						<h2 className='second'>{t('home.spa.second.title')}</h2>
						<p>{t('home.spa.second.shortDesc')}</p>
						<h1>{t('home.spa.third')}</h1>
					</div>
				</div>
				<div className='home__service__button'>
					<Link className='home__service__button__link' to='/services'>
						{t('home.spa.explore')}
					</Link>
				</div>
			</section>
			<section className='home__adventure'>
				<div className='home__adventure__title'>{t('home.adventure.title')}</div>
				<div className='home__adventure__content'>
					<div className='home__adventure__content__description'>{t('home.adventure.desc')}</div>
					<div className='home__adventure__content__cards'>
						<div className='home__adventure__content__cards__item'>
							<div className='home__adventure__content__cards__item-content'>
								<img
									className='adventure_img'
									src='https://cdn.thecrazytourist.com/wp-content/uploads/2018/08/ccimage-shutterstock_369366323.jpg'
									alt='Adventure image'
								/>
								<p className='adventure_description'>
									<strong>{t('home.adventure.first.title')}</strong>
									<br />
									{t('home.adventure.first.shortDesc')}
								</p>
							</div>
						</div>
						<div className='home__adventure__content__cards__item'>
							<div className='home__adventure__content__cards__item-content'>
								<img
									className='adventure_img'
									src='https://cdn.thecrazytourist.com/wp-content/uploads/2018/08/ccimage-shutterstock_693067378.jpg'
									alt='Adventure image'
								/>
								<p className='adventure_description'>
									<strong>{t('home.adventure.second.title')}</strong>
									<br />
									{t('home.adventure.second.shortDesc')}
								</p>
							</div>
						</div>
						<div className='home__adventure__content__cards__item'>
							<div className='home__adventure__content__cards__item-content'>
								<img
									className='adventure_img'
									src='https://cdn.thecrazytourist.com/wp-content/uploads/2018/08/ccimage-shutterstock_308632343.jpg'
									alt='Adventure image'
								/>
								<p className='adventure_description'>
									<strong>{t('home.adventure.third.title')}</strong>
									<br />
									{t('home.adventure.third.shortDesc')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default LandingPage;
