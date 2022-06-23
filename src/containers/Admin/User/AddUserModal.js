import React, { useState } from 'react';
import { Form, Modal, FloatingLabel, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../../redux/actions/user';
import usePasswordToggle from '../../../hooks/usePasswordToggle';
import {
	phoneValidation,
	emailValidation,
	passwordValidation,
	nameValidation,
	textValidation,
} from '../../../utils/validation';
import { userDefault, userRoles } from '../../../assets/app/constants';
import * as Validation from '../../../utils/validation';

const AddUserModal = (props) => {
	const { show, handlerModalClose } = props;
	const dispatch = useDispatch();
	const currentRole = useSelector((state) => state.auth.user.role);

	const [inputType, toggleIcon] = usePasswordToggle();
	const [newUser, setNewUser] = useState({ ...userDefault });

	const { register, watch, handleSubmit } = new useForm();
	let NameValidation,
		EmailValidation,
		PasswordValidation,
		PhoneValidation = true;
	NameValidation =
		Validation.PatternName1.test(watch('name')) || Validation.PatternName2.test(watch('name'));
	EmailValidation = Validation.PatternEmail.test(watch('email'));
	PasswordValidation = Validation.PatternPassword.test(watch('password'));
	PhoneValidation = Validation.PatternPhone.test(watch('phone'));

	const onChangeNewForm = (event) =>
		setNewUser({
			...newUser,
			[event.target.name]: event.target.value,
		});

	const onSubmit = (data, e) => {
		e.preventDefault();

		dispatch(addUser({ ...newUser, ...data }));
		resetAddPostData();
	};

	const resetAddPostData = () => {
		setNewUser(userDefault);
		handlerModalClose();
	};

	const { address, role } = newUser;

	return (
		<>
			<Modal show={show} onHide={resetAddPostData} animation={false} dialogClassName='admin-modal'>
				<Modal.Header closeButton>
					<Modal.Title>Add New User</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<FloatingLabel controlId='floatingTextarea' label='Name' className='mb-3'>
							<Form.Control
								type='text'
								placeholder='Name'
								name='name'
								// value={name || ''}
								// onChange={onChangeNewForm}
								required
								{...register('name')}
							/>
							<p className='alertValidation'>
								{NameValidation != true ? 'Please input a valid name!' : ''}
							</p>
						</FloatingLabel>

						<FloatingLabel controlId='floatingEmail' label='Email' className='mb-3'>
							<Form.Control
								type='text'
								placeholder='email'
								name='email'
								// value={email || ''}
								// onChange={onChangeNewForm}
								required
								{...register('email')}
							/>
							<p className='alertValidation'>
								{EmailValidation != true ? 'Please input a valid email!' : ''}
							</p>
						</FloatingLabel>
						<FloatingLabel controlId='floatingPassword' label='Password' className='mb-3'>
							<Form.Control
								type={inputType}
								placeholder='*'
								name='password'
								// value={password || ''}
								// onChange={onChangeNewForm}
								required
								{...register('password')}
							/>
							<span className='password-toggle-icon'>{toggleIcon}</span>
							<p className='alertValidation'>
								{PasswordValidation != true ? 'Please input a valid password!' : ''}
							</p>
						</FloatingLabel>
						<Row>
							<Col>
								<FloatingLabel controlId='floatingPhone' label='Phone' className='mb-3'>
									<Form.Control
										type='text'
										placeholder='Phone Number'
										name='phone'
										// value={phone || ''}
										// onChange={onChangeNewForm}
										required
										{...register('phone')}
									/>
									<p className='alertValidation'>
										{PhoneValidation != true ? 'Please input a valid phone number!' : ''}
									</p>
								</FloatingLabel>
							</Col>
						</Row>
						<Row>
							<Col>
								<FloatingLabel controlId='floatingRole' label='Role' className='mb-3'>
									<Form.Select name='role' value={role || ''} onChange={onChangeNewForm} required>
										<option value='' hidden>
											---
										</option>
										{currentRole === userRoles.Admin.name && (
											<option value={userRoles.Admin.name}>{userRoles.Admin.name}</option>
										)}
										<option value={userRoles?.Manager.name}>{userRoles.Manager.name}</option>
										<option value={userRoles?.Employee.name}>{userRoles.Employee.name}</option>
									</Form.Select>
								</FloatingLabel>
							</Col>
						</Row>
						<FloatingLabel controlId='floatingAddress' label='Address' className='mb-3'>
							<Form.Control
								as='textarea'
								name='address'
								placeholder='Address'
								value={address || ''}
								onChange={onChangeNewForm}
								required
							/>
						</FloatingLabel>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='primary'
							type='submit'
							disabled={
								!(NameValidation && EmailValidation && PasswordValidation && PhoneValidation)
							}
						>
							Save
						</Button>
						<Button variant='secondary' onClick={resetAddPostData}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default AddUserModal;
