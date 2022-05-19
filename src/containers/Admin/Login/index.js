import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/auth';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import usePasswordToggle from '../../../hooks/usePasswordToggle';
import FullLoading from '../../../components/Common/FullLoading';

const Login = () => {
	const [inputType, toggleIcon] = usePasswordToggle();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const authLoading = useSelector((state) => state.auth.authLoading);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ email, password }));
	};

	if (authLoading) return <FullLoading />;
	else if (isAuthenticated) return <Navigate to='/admin' />;
	return (
		<div className='login-page'>
			<div className='company-logo'>
				<img src={logo} alt='company-logo' />
			</div>
			<Form onSubmit={handleSubmit}>
				<FloatingLabel controlId='floatingEmail' label='Email' className='mb-3'>
					<Form.Control
						type='text'
						placeholder='email'
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete={'off'}
						required
					/>
				</FloatingLabel>
				<FloatingLabel controlId='floatingPass' label='Password' className='mb-3'>
					<Form.Control
						type={inputType}
						placeholder='*'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete={'current-password'}
						required
					/>
					<span className='password-toggle-icon'>{toggleIcon}</span>
				</FloatingLabel>

				<Button className='login-btn-submit' type='submit'>
					Login
				</Button>
			</Form>
			<div style={{ marginTop: '12px' }}>
				<Link to='forgot-password'>Forgot your password?</Link>
			</div>
		</div>
	);
};

export default Login;
