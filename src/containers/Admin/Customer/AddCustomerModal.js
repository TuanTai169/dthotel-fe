import React, { useState } from 'react';
import { Form, Modal, FloatingLabel, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../../../redux/actions/customer';

import { customerDefault } from '../../../assets/app/constants';
import * as Validation from '../../../utils/validation';

const AddCustomerModal = (props) => {
	const { show, handlerModalClose } = props;
	const dispatch = useDispatch();
	const { register, watch, handleSubmit } = new useForm();
	const [newCustomer, setNewCustomer] = useState({ ...customerDefault });
	const onChangeNewForm = (event) =>
		setNewCustomer({
			...newCustomer,
			[event.target.name]: event.target.value,
		});
	const onChangeNumberOfPeople = (event) => {
		let newNumberOfPeople = {
			...newCustomer.numberOfPeople,
			[event.target.name]: event.target.value,
		};
		setNewCustomer({ ...newCustomer, numberOfPeople: newNumberOfPeople });
	};
	const onSubmit = (data, e) => {
		e.preventDefault();
		dispatch(addCustomer({ ...newCustomer, ...data }));
		resetAddPostData();
	};

	const resetAddPostData = () => {
		setNewCustomer(customerDefault);
		handlerModalClose();
	};

	let NameValidation,
		EmailValidation,
		IdValidation,
		PhoneValidation = true;
	NameValidation =
		Validation.PatternName1.test(watch('name')) || Validation.PatternName2.test(watch('name'));
	EmailValidation = Validation.PatternEmail.test(watch('email'));
	IdValidation = Validation.PatternId.test(watch('idNumber'));
	PhoneValidation = Validation.PatternPhone.test(watch('phone'));

	const { address, numberOfPeople } = newCustomer;
	return (
		<>
			<Modal show={show} onHide={resetAddPostData} animation={false} dialogClassName='admin-modal'>
				<Modal.Header closeButton>
					<Modal.Title>Add Customer</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<FloatingLabel controlId='floatingTextarea' label='Name' className='mb-3'>
							<Form.Control
								type='text'
								placeholder='Name'
								name='name'
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
								placeholder='Email'
								name='email'
								required
								{...register('email')}
							/>
							<p className='alertValidation'>
								{EmailValidation != true ? 'Please input a valid email!' : ''}
							</p>
						</FloatingLabel>

						<Row>
							<Col>
								<FloatingLabel controlId='floatingPhone' label='Phone' className='mb-3'>
									<Form.Control
										type='text'
										placeholder='Phone Number'
										name='phone'
										required
										{...register('phone')}
									/>
									<p className='alertValidation'>
										{PhoneValidation != true ? 'Please input a valid phone number!' : ''}
									</p>
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel controlId='floatingIdNumber' label='Id Number' className='mb-3'>
									<Form.Control
										type='text'
										placeholder='Id Number'
										name='idNumber'
										required
										{...register('idNumber')}
									/>
									<p className='alertValidation'>
										{IdValidation != true ? 'Please input a valid ID number!' : ''}
									</p>
								</FloatingLabel>
							</Col>
						</Row>
						<Row>
							<Col>
								<FloatingLabel controlId='floatingAdult' label='Adult' className='mb-3'>
									<Form.Control
										type='number'
										placeholder='Adult'
										name='adult'
										min='1'
										value={numberOfPeople?.adult > 0 ? numberOfPeople.adult : 0}
										onChange={onChangeNumberOfPeople}
										required
									/>
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel controlId='floatingChild' label='Child' className='mb-3'>
									<Form.Control
										type='number'
										placeholder='Child'
										name='child'
										min='0'
										value={numberOfPeople?.child > 0 ? numberOfPeople.child : 0}
										onChange={onChangeNumberOfPeople}
										required
									/>
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
							disabled={!(NameValidation && EmailValidation && IdValidation && PhoneValidation)}
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

export default AddCustomerModal;
