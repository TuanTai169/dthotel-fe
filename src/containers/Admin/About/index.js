import React from 'react';

const About = () => {
	return (
		<div className='about d-flex flex-column '>
			<div className='title text-center text-uppercase mb-3'>
				<h4>Graduation thesis</h4>
			</div>
			<div className='row justify-content-center'>
				<div className='col-md-3 col-sm-6'>
					<div className='our-team'>
						{/* <div className='pic'>
							<img src={huy} alt='person1' />
						</div> */}
						<h3 className='title'>Tran Vo Buu Dien</h3>
						<span className='post'>Front-end Developer</span>
						<ul className='social'>
							<li>
								<i className='bx bxl-facebook'></i>
							</li>
							<li>
								<i className='bx bxl-google-plus'></i>
							</li>
							<li>
								<i className='bx bxl-linkedin'></i>
							</li>
							<li>
								<i className='bx bxl-github'></i>
							</li>
						</ul>
					</div>
				</div>
				<div className='col-md-3 col-sm-6'>
					<div className='our-team'>
						{/* <div className='pic'>
							<img src={tai} alt='person1' />
						</div> */}
						<h3 className='title'>Nguyen Tuan Tai</h3>
						<span className='post'>Fullstack Developer</span>
						<ul className='social'>
							<li>
								<i className='bx bxl-facebook'></i>
							</li>
							<li>
								<i className='bx bxl-google-plus'></i>
							</li>
							<li>
								<i className='bx bxl-linkedin'></i>
							</li>
							<li>
								<i className='bx bxl-github'></i>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
