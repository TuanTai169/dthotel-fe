import React from 'react';
import { Link } from 'react-router-dom';
import { IoEarth } from 'react-icons/io5';
import logo from './../../../assets/images/LogoSwiss.png';
import './Navbar.scss';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
	const { t, i18n } = useTranslation();
	const onChangeLanguage = (e) => {
		// localStorage.setItem('language', e.target.value);
		i18n.changeLanguage(e.target.value);
	};

	return (
		<div>
			<header className='header'>
				<div className='header__nav'>
					<div className='header__nav__select-language'>
						<select className='select-language' name='language' onChange={onChangeLanguage}>
							<option value='en'>EN</option>
							<option value='vi'>VI</option>
						</select>
						<IoEarth style={{ color: '#ffce6a', fontSize: '20px' }} />
					</div>
					<nav className='header__nav__content'>
						<ul className='header__nav__content__items'>
							<li>
								<Link className='header__nav__content__items__link' to='/'>
									{t('navBar.home')}
								</Link>
							</li>
							<li>
								<Link className='header__nav__content__items__link' to='/rooms'>
									{t('navBar.rooms')}
								</Link>
							</li>
							<li>
								<img src={logo} alt='DT Logo' className='header__nav__content__items__logo' />
							</li>
							<li>
								<Link className='header__nav__content__items__link' to='/services'>
									{t('navBar.services')}
								</Link>
							</li>
							<li>
								<Link className='header__nav__content__items__link' to='/about-us'>
									{t('navBar.aboutUs')}
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				<div className='header__menu'></div>
			</header>
		</div>
	);
};

export default Navbar;
