import React from 'react';
import { Link } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi';
import logo from './../../../assets/images/LogoSwiss.png';
import './Navbar.scss';

const Navbar = () => {
	return (
		<div>
			<header className='header'>
				<div className='header__nav'>
					<nav className='header__nav__content'>
						<ul className='header__nav__content__items'>
							<li>
								<Link className='header__nav__content__items__link' to='/'>
									HOME
								</Link>
							</li>
							<li>
								<Link className='header__nav__content__items__link' to='/rooms'>
									ROOMS
								</Link>
							</li>
							<li>
								<img src={logo} alt='DT Logo' className='header__nav__content__items__logo' />
							</li>
							<li>
								<Link className='header__nav__content__items__link' to='/services'>
									SERVICES
								</Link>
							</li>
							<li>
								<Link className='header__nav__content__items__link' to='/about-us'>
									ABOUT US
								</Link>
							</li>
							{/* <li>
								<Link
									className='header__nav__content__items__link'
									to='/gallery'
								>
									GALLERY
								</Link>
							</li>
							<li>
								<Link
									className='header__nav__content__items__link'
									to='/blogs'
								>
									BLOGS
								</Link>
							</li> */}
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
