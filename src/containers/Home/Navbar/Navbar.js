import React from 'react';
import { Link } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi';
import logo from './../../../assets/images/LogoSwiss.png';
import BookingPage from './../index';
import './Navbar.scss';

const Navbar = () => {
	return (
		<div>
			<header className='header'>
				<div className='header__nav'>
					<nav className='header__nav__content'>
						<ul className='header__nav__content__items'>
							<li>
								<Link className='header__nav__content__items-link' to='/'>
									HOME
								</Link>
							</li>
							<li>
								<Link className='header__nav__content__items-link' to='/rooms'>
									ROOMS
								</Link>
							</li>
							<li>
								<Link className='header__nav__content__items-link' to='/services'>
									SERVICES
								</Link>
							</li>
							<li>
								<img src={logo} alt='Swiss Logo' className='header__nav__content__items__logo' />
							</li>
							<li>
								<Link className='header__nav__content__items-link' to='/about-us'>
									ABOUT US
								</Link>
							</li>
							<li>
								<Link className='header__nav__content__items-link' to='/gallery'>
									GALLERY
								</Link>
							</li>
							<li>
								<Link className='header__nav__content__items-link' to='/blogs'>
									BLOGS
								</Link>
							</li>
						</ul>
					</nav>
					<div className='header__nav__toggle'>
						<BiMenuAltRight />
					</div>
				</div>
				<div className='header__menu'></div>
			</header>
		</div>
	);
};

export default Navbar;
