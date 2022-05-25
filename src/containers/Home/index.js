import React from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import header_img from './../../assets/images/Home__backgroungimg.png';
import DGV from './../../assets/images/rooms_images/DGV.png';
import Spa from './../../assets/images/spa.png';
import pinebranch1 from './../../assets/images/pinebranch1.png';
import pinebranch2 from './../../assets/images/pinebranch2.png';
import adventure from './../../assets/images/adventure.png';
import './index.scss';
import { Link } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';

const Home = () => {
	return (
		<div className='home'>
			<Navbar />
			<ScrollToTop
				smooth
				color='$dark-blue'
				style={{ backgroundColor: '#ffce6a' }}
			/>
			<section className='home__header'>
				<div className='home__header__slogan'>
					<div className='home__header__slogan__title'>
						RECONNECT WITH NATURE
					</div>
					<div className='home__header__slogan__description'>
						Fifteen minutes drive from the center of
						<br />
						Dalat City is all it takes to get to this
						holiday haven.
						<br />
						Dalat de Charm Village is all about luxury
						aesthetics
						<br />
						and is the perfect sanctuary with a soul.
					</div>
				</div>
			</section>
			<section className='home__cards'>
				<div className='home__cards__title'>
					<div className='home__cards__title__background'>
						DT
					</div>
					<div className='home__cards__title__text'>
						THE PERFECTION FOR YOUR VACATION
					</div>
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
								src={DGV}
								alt='Deluxe Goft View'
								className='card-item__image'
							/>
							<div className='card-item__information'>
								<h2 className='card-item__information__title'>
									DELUXE GOFT VIEW
								</h2>
								<p className='card-item__information__description'>
									Swiss-Belresort Tuyền Lâm, Đà Lạt bố trí
									72 phòng Deluxe Golf View hướng ra bể bơi
									và có thể thấy được sân golf 18 lỗ tiêu
									chuẩn quốc tế đầy hiện đại.
								</p>
							</div>
						</div>
						<div className='card-item'>
							<img
								src={DGV}
								alt='Deluxe Goft View'
								className='card-item__image'
							/>
							<div className='card-item__information'>
								<h2 className='card-item__information__title'>
									DELUXE GOFT VIEW
								</h2>
								<p className='card-item__information__description'>
									Swiss-Belresort Tuyền Lâm, Đà Lạt bố trí
									72 phòng Deluxe Golf View hướng ra bể bơi
									và có thể thấy được sân golf 18 lỗ tiêu
									chuẩn quốc tế đầy hiện đại.
								</p>
							</div>
						</div>
						<div className='card-item'>
							<img
								src={DGV}
								alt='Deluxe Goft View'
								className='card-item__image'
							/>
							<div className='card-item__information'>
								<h2 className='card-item__information__title'>
									DELUXE GOFT VIEW
								</h2>
								<p className='card-item__information__description'>
									Swiss-Belresort Tuyền Lâm, Đà Lạt bố trí
									72 phòng Deluxe Golf View hướng ra bể bơi
									và có thể thấy được sân golf 18 lỗ tiêu
									chuẩn quốc tế đầy hiện đại.
								</p>
							</div>
						</div>
					</div>
					<div className='home__cards__container__button'>
						<Link
							className='home__cards__container__button__link'
							to='/rooms'
						>
							Find out more
						</Link>
					</div>
				</div>
			</section>
			<section className='home__service'>
				<h1 className='home__service__title'>
					DT Hotel Spa
				</h1>
				<img
					className='home__service__bgimage filter'
					src={pinebranch2}
					alt='Service background image'
				/>
				<div className='home__service__content'>
					<img
						className='home__service__content__image'
						src={Spa}
						alt='DT Hotel Spa Service'
					/>

					<div className='home__service__content__description'>
						<h2 className='first'>Comfort Anbience</h2>
						<p>
							The first step into the Zen Spa, customer will
							feel like step into another world with yellow
							light, relaxing herbal aroma and splendid
							space as Europe Catsle's smell.
						</p>
						<h2 className='second'>Sauna Steam Bath</h2>
						<p>
							Zen Spa has private space to pamper your body
							with massage roo, sauna, jacuzzi, bath room,
							gym, swimming pool ...
						</p>
						<h1>Treat you a spa-cation at the DT</h1>
					</div>
				</div>
				<div className='home__service__button'>
					<Link
						className='home__service__button__link'
						to='/services'
					>
						EXPLORE
					</Link>
				</div>
			</section>
			<section className='home__adventure'>
				<div className='home__adventure__title'>
					Your Highland Adventure
				</div>
				<div className='home__adventure__content'>
					<div className='home__adventure__content__description'>
						Discover the best of Dalat City with our
						recommended destination including mountain, sky
						and water experiences.
					</div>
					<div className='home__adventure__content__cards'>
						<div className='home__adventure__content__cards__item'>
							<div className='home__adventure__content__cards__item-content'>
								<img
									className='adventure_img'
									src={adventure}
									alt='Adventure image'
								/>
								<p className='adventure_description'>
									A small village from a fairy tale located
									in the middle of a primeval forest.
								</p>
								<div className='adventure_button'>
									<Link
										className='adventure_button_link'
										to='/blogs'
									>
										EXPLORE
									</Link>
								</div>
							</div>
						</div>
						<div className='home__adventure__content__cards__item'>
							<div className='home__adventure__content__cards__item-content'>
								<img
									className='adventure_img'
									src={adventure}
									alt='Adventure image'
								/>
								<p className='adventure_description'>
									A small village from a fairy tale located
									in the middle of a primeval forest.
								</p>
								<div className='adventure_button'>
									<Link
										className='adventure_button_link'
										to='/blogs'
									>
										EXPLORE
									</Link>
								</div>
							</div>
						</div>
						<div className='home__adventure__content__cards__item'>
							<div className='home__adventure__content__cards__item-content'>
								<img
									className='adventure_img'
									src={adventure}
									alt='Adventure image'
								/>
								<p className='adventure_description'>
									A small village from a fairy tale located
									in the middle of a primeval forest.
								</p>
								<div className='adventure_button'>
									<Link
										className='adventure_button_link'
										to='/blogs'
									>
										EXPLORE
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<ToastContainer autoClose={3000} theme='colored' />
			<Footer />
		</div>
	);
};

export default Home;
