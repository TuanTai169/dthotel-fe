import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';
import DGV from './../../../assets/images/rooms_images/DGV.png';

const index = () => {
	var settings = {
		autoplay: true,
	};
	return (
		<div className='container'>
			<Slider {...settings}>
				<div>
					<img className='container__item' src={DGV} />
				</div>
				<div>
					<img className='container__item' src={DGV} />
				</div>
				<div>
					<img className='container__item' src={DGV} />
				</div>
				<div>
					<img className='container__item' src={DGV} />
				</div>
				<div>
					<img className='container__item' src={DGV} />
				</div>
			</Slider>
		</div>
	);
};

export default index;
