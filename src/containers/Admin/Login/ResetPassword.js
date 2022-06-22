import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { HOST_API_URL } from '../../../redux/constants/api';
import usePasswordToggle from '../../../hooks/usePasswordToggle';
import { passwordValidation, matchPasswordValidation } from '../../../utils/validation';
import * as Validation from '../../../utils/validation';

const ResetPassword = () => {
	const [inputType, toggleIcon] = usePasswordToggle();
	const [data, setData] = useState({
		password: '',
		confirmPassword: '',
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const PasswordValidation = Validation.PatternPassword.test(watch('password'));
	const ConfirmPasswordValidation = Validation.PatternPassword.test(watch('confirmPassword'));

	const { token } = useParams();
	const navigate = useNavigate();

	const onChangeData = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const handlerResetPass = async () => {
		if (passwordValidation(password) && matchPasswordValidation(password, confirmPassword)) {
			try {
				const res = await axios.post(`${HOST_API_URL}/auth/reset-password/${token}`, {
					password,
				});
				navigate('/admin/login');
				return toast.success(res.data.message);
			} catch (err) {
				err.response.data.message && toast.error(err.response.data.message);
			}
		}
	};
	const { password, confirmPassword } = data;

	return (
		<div className='login-page'>
			<div className='company-logo'>
				<Link to='/admin'>
					<img src={logo} alt='company logo' />
				</Link>
			</div>
			<div className='forgot-title'>Reset Password</div>
			<FloatingLabel controlId='floatingPass' label='Password' className='mb-3'>
				<Form.Control
					{...register('password')}
					type={inputType}
					placeholder='*'
					name='password'
					// value={password}
					required
				/>
				<span className='password-toggle-icon'>{toggleIcon}</span>
				<p className='alertValidation'>
					{PasswordValidation != true ? 'Please enter valid password!' : ''}
				</p>
			</FloatingLabel>

			<FloatingLabel controlId='floatingConformPass' label='Confirm Password' className='mb-3'>
				<Form.Control
					{...register('confirmPassword')}
					type={inputType}
					placeholder='*'
					name='confirmPassword'
					// value={confirmPassword}
					required
				/>
				<p className='alertValidation'>
					{ConfirmPasswordValidation != true ? 'Please enter valid password!' : ''}
				</p>
			</FloatingLabel>

			<div className='div' style={{ color: '#919191' }}>
				Your password must:
				<li>Contain at least 8 characters</li>
				<li>Contain at least 1 uppercase</li>
				<li>Contain at least 1 lowercase</li>
				<li>Contain at least 1 special character</li>
			</div>
			<br />

			<Button
				className='login-btn-submit'
				onClick={handlerResetPass}
				disabled={!(ConfirmPasswordValidation && PasswordValidation)}
			>
				Reset Password
			</Button>
		</div>
	);
};

export default ResetPassword;
