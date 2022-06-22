import React, { useState } from 'react';
import { Form, Modal, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateCustomer } from '../../../redux/actions/customer';
import {
	phoneValidation,
	IdNumberValidation,
	emailValidation,
	numberValidation,
	nameValidation,
	textValidation,
} from '../../../utils/validation';
import * as Validation from '../../../utils/validation';

function EditCustomerModal(props) {
	const { show, handlerModalClose, customer } = props;
	const dispatch = useDispatch();

	const [editCustomer, setEditCustomer] = useState(customer);

	const { register, watch } = new useForm();
	let NameValidation = true;
	let EmailValidation = true;
	let IdValidation = true;
	let PhoneValidation = true;
	NameValidation =
		Validation.PatternName1.test(watch('name')) || Validation.PatternName2.test(watch('name'));
	EmailValidation = Validation.PatternEmail.test(watch('email'));
	IdValidation = Validation.PatternId.test(watch('id'));
	PhoneValidation = Validation.PatternPhone.test(watch('phone'));

	const onChangeNewForm = (event) =>
		setEditCustomer({
			...editCustomer,
			[event.target.name]: event.target.value,
		});
	const onChangeNumberOfPeople = (event) => {
		let newNumberOfPeople = {
			...editCustomer.numberOfPeople,
			[event.target.name]: event.target.value,
		};
		setEditCustomer({ ...editCustomer, numberOfPeople: newNumberOfPeople });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			nameValidation(editCustomer.name) &&
			emailValidation(editCustomer.email) &&
			phoneValidation(editCustomer.phone) &&
			IdNumberValidation(editCustomer.idNumber) &&
			textValidation(editCustomer.address) &&
			numberValidation(editCustomer.numberOfPeople.adult) &&
			numberValidation(editCustomer.numberOfPeople.child)
		) {
			dispatch(updateCustomer(editCustomer, customer._id));
			resetAddPostData();
		}
	};

	const resetAddPostData = () => {
		handlerModalClose();
		setEditCustomer(customer);
	};
	const { name, email, phone, address, idNumber, numberOfPeople } = editCustomer;

	return (
		<div>
			<Modal show={show} onHide={resetAddPostData} animation={false} dialogClassName='admin-modal'>
				<Modal.Header closeButton>
					<Modal.Title>Edit Customer</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						<FloatingLabel controlId='floatingTextarea' label='Name' className='mb-3'>
							<Form.Control
								type='text'
								placeholder='Name'
								name='name'
								defaultValue={name || ''}
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
								placeholder='Email'
								name='email'
								defaultValue={email || ''}
								// onChange={onChangeNewForm}
								required
								// disabled
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
										defaultValue={phone || ''}
										// onChange={onChangeNewForm}
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
										defaultValue={idNumber || ''}
										// onChange={onChangeNewForm}
										required
										{...register('id')}
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
										defaultValue={numberOfPeople.adult > 0 ? numberOfPeople.adult : 0}
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
										defaultValue={numberOfPeople.child > 0 ? numberOfPeople.child : 0}
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
								defaultValue={address || ''}
								onChange={onChangeNewForm}
								required
							/>
						</FloatingLabel>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='primary' type='submit'>
							Save
						</Button>
						<Button variant='secondary' onClick={resetAddPostData}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</div>
	);
}

export default EditCustomerModal;
