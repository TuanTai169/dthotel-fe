import React from 'react';
import { Link } from 'react-router-dom';
import Spa from './../../../assets/images/spa.png';
import pinebranch1 from './../../../assets/images/pinebranch1.png';
import pinebranch2 from './../../../assets/images/pinebranch2.png';
import * as Room from './../Images/images';

const LandingPage = () => {
	return (
		<>
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
							<img
								src={Room.DeluxeGolfView.url[0]}
								alt='Deluxe Goft View'
								className='card-item__image'
							/>
							<div className='card-item__information'>
								<h2 className='card-item__information__title'>DELUXE GOFT VIEW</h2>
								<p className='card-item__information__description'>
									{Room.DeluxeGolfView.shortDesc}
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
								<h2 className='card-item__information__title'>DELUXE MOUNTAIN VIEW</h2>
								<p className='card-item__information__description'>
									{Room.DeluxeMountainView.shortDesc}
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
								<h2 className='card-item__information__title'>STUDIO MOUNTAIN VIEW</h2>
								<p className='card-item__information__description'>
									{Room.StudioMountainView.shortDesc}
								</p>
							</div>
						</div>
					</div>
					<div className='home__cards__container__button'>
						<Link className='home__cards__container__button__link' to='/rooms'>
							Find out more
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
						<h2 className='first'>Comfort Anbience</h2>
						<p>
							The first step into the Zen Spa, customer will feel like step into another world with
							yellow light, relaxing herbal aroma and splendid space as Europe Catsle's smell.
						</p>
						<h2 className='second'>Sauna Steam Bath</h2>
						<p>
							Zen Spa has private space to pamper your body with massage roo, sauna, jacuzzi, bath
							room, gym, swimming pool ...
						</p>
						<h1>Treat you a spa-cation at the DT</h1>
					</div>
				</div>
				<div className='home__service__button'>
					<Link className='home__service__button__link' to='/services'>
						EXPLORE
					</Link>
				</div>
			</section>
			<section className='home__adventure'>
				<div className='home__adventure__title'>Your Highland Adventure</div>
				<div className='home__adventure__content'>
					<div className='home__adventure__content__description'>
						Discover the best of Dalat City with our recommended destination including mountain, sky
						and water experiences.
					</div>
					<div className='home__adventure__content__cards'>
						<div className='home__adventure__content__cards__item'>
							<div className='home__adventure__content__cards__item-content'>
								<img
									className='adventure_img'
									src='https://cdn.thecrazytourist.com/wp-content/uploads/2018/08/ccimage-shutterstock_369366323.jpg'
									alt='Adventure image'
								/>
								<p className='adventure_description'>
									<strong>Bao Dai’s Summer Palace</strong>
									<br />
									Bao Dai was famous for being the last emperor of Vietnam and ascended to the
									throne was he was just 12 years old.
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
									<strong>Datanla Waterfalls</strong>
									<br />
									Datanla Waterfalls is one of the most famous set of falls in Da Lat and you can
									easily reach this gushing cataract from the center of town.
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
									<strong>Truc Lam Pagoda</strong>
									<br />
									Truc Lam Pagoda is one of the newest temples in Da Lat but this also means that it
									is one of the prettiest.
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
