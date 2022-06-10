import React from 'react';

import './index.scss';

const index = () => {
	return (
		<div>
			<section className='header'>
				<div className='header__title'>About us</div>
			</section>
			<section className='abbody'>
				<div className='abbody__special'>
					<div className='abbody__special__item'>
						<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/shap_about.png' />
						<h3>Perfect place</h3>
						<h1>SPECIAL SPACE</h1>
						<p>
							Swiss-Belresort Tuyen Lam is the famous resort in Tuyen Lam Lake National Tourist
							Area, surrounded by pipe tree hills, green grass and rolling curves of the golf
							course.
						</p>
					</div>
					<div className='abbody__special__item'>
						<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/shap_about2.png' />
						<h3>Great options</h3>
						<h1>LUXURY ACOMMODATION</h1>
						<p>
							We are available total 151 equipped rooms with full facilities and luxury design
							according to Europe Style. There are Deluxe, Grand Deluxe, Executive, Junior Suite,
							Executive Suite, Presidential Suite, Rooftop Garden Suite and Penthouse 02 Bedroom.
						</p>
					</div>
					<div className='abbody__special__item'>
						<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/shap_about3.png' />
						<h3>Friendly reception</h3>
						<h1>LUXURY SERVICES</h1>
						<p>
							We offers many modern facilities including restaurant, meeting room, outdoor swimming
							pool, indoor heated swimming pool, spa, sauna, fitness center, karaoke room, tennis
							court and 18 holes green golf course.
						</p>
					</div>
				</div>
				<div className='abbody__history'>
					<div className='abbody__history__description'>
						<h3>SWISS-BELRESOT TUYEN LAM - DA LAT</h3>
						<p>
							Swiss-Belresort Tuyen Lam - Dalat (Managed by SAM Tuyen Lam) is designed in
							Anglo-Normand style architecture (architecture of the English-French countryside), a
							total of 151 rooms are decorated by Bright, sophisticated color, fully equipped to
							make you feel comfortable and pleasant to relax with friends and family or long
							business trip.
							<br />
							<br />
							We located at the Tuyen Lam Lake National Tourist Area, in the middle of the Da Lat
							valley, surrounded by pine forest and green golf course. This is one of the resorts
							with open nature space in Da Lat. From a distance, the Swiss-Belresort is a fairytale
							castle by white paint and European architectural style. At Swiss-belresort Tuyen Lam,
							Dalat we are care about every single moment of customer, your saftifie is our
							happiness. Therefore, we will try our best to bring the best services with morden
							equipments to our valued guests.
						</p>
					</div>
					<div className='abbody__history__container'>
						<img
							src='https://samtuyenlamhotel.com.vn/wp-content/uploads/2017/10/SBI-about-us.jpg'
							className='abbody__overall__container__item'
						/>
						<img
							src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/about_history2.jpg'
							className='abbody__overall__container__item'
						/>
						<img
							src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/about_history3.jpg'
							className='abbody__overall__container__item'
						/>
						<img
							src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/about_history5.jpg'
							className='abbody__overall__container__item'
						/>
						<img
							src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/about_history6.jpg'
							className='abbody__overall__container__item'
						/>
						<img
							src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/about_history7.jpg'
							className='abbody__overall__container__item'
						/>
					</div>
				</div>
				<div className='abbody__room'>
					<div className='abbody__room__title'>
						<div className='abbody__room__title__back'>Discover our Resort’s</div>
						<div className='abbody__room__title__front'>LUXURY AND EQUIPMENT ROOM</div>
					</div>
					<div className='abbody__room__container'>
						<div className='abbody__room__container__item'>
							<p>
								We offer many types room: Deluxe (King, Twin, Holywood), Deluxe Pool View, Grand
								Deluxe (King, Twin), Executive Room, Junior Suite, Executive Suite, Presidential
								Suite, Rooftop Garden Suite and Penthouse. In particular, Rooftop Garden Suite and
								Penthouse are separated on the fifth floor with the most beautiful view of the
								resort. All rooms have balconies, except the Grand Deluxe rooms because of children
								safety.
							</p>
							<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/about_rooms.jpg' />
						</div>
						<div className='abbody__room__container__item'>
							<p>
								We cherish every relaxing moment of customer.The rooms are spacious and cared for
								with exquisite style, elegant and warm, fully equipped with LED screen TV,
								refrigerator, air-conditioner, mini bar, telephone, standing shower , bathtub, hot
								water, safety box, hairdryer, tea, coffee and free Wifi
							</p>
							<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/about_rooms2.jpg' />
						</div>
					</div>
				</div>
				<div className='abbody__images__title'>Discover our Resort’s</div>
				<div className='abbody__images'>
					<div className='abbody__images__container'>
						<img
							className='flex2'
							src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/at_the_resort.png'
						/>
						<img src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/at_the_resort2.jpg' />
						<img src='https://samtuyenlamhotel.com.vn/wp-content/uploads/2017/11/SBI-about-us-2.jpg' />
					</div>
					<div className='abbody__images__container'>
						<img src='https://samtuyenlamhotel.com.vn/wp-content/uploads/2017/11/SBI-about-us-1.jpg' />
						<img src='https://samtuyenlamhotel.com.vn/wp-content/uploads/2017/10/SBI-about-us-2.jpg' />
						<img
							className='flex2'
							src='https://samtuyenlamhotel.com.vn/wp-content/themes/taka/images/at_the_resort6.jpg'
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

export default index;
