import React, { useState } from 'react';
import { Form, Modal, FloatingLabel, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../../../redux/actions/customer';
import {
	phoneValidation,
	IdNumberValidation,
	emailValidation,
	nameValidation,
	numberValidation,
	textValidation,
} from '../../../utils/validation';
import { customerDefault } from '../../../assets/app/constanst';

const AddCustomerModal = (props) => {
	const { show, handlerModalClose } = props;
	const dispatch = useDispatch();

	const [newCustomer, setNewCustomer] = useState(customerDefault);
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
	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			nameValidation(newCustomer.name) &&
			emailValidation(newCustomer.email) &&
			phoneValidation(newCustomer.phone) &&
			IdNumberValidation(newCustomer.idNumber) &&
			textValidation(newCustomer.address) &&
			numberValidation(newCustomer.numberOfPeople.adult) &&
			numberValidation(newCustomer.numberOfPeople.child)
		) {
			dispatch(addCustomer(newCustomer));
			resetAddPostData();
		}
	};

	const resetAddPostData = () => {
		setNewCustomer(customerDefault);
		handlerModalClose();
	};

	const { name, email, phone, address, idNumber, numberOfPeople } = newCustomer;
	return (
		<>
			<Modal show={show} onHide={resetAddPostData} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Add Customer</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						<FloatingLabel controlId='floatingTextarea' label='Name' className='mb-3'>
							<Form.Control
								type='text'
								placeholder='Name'
								name='name'
								value={name || ''}
								onChange={onChangeNewForm}
								required
							/>
						</FloatingLabel>
						<FloatingLabel controlId='floatingEmail' label='Email' className='mb-3'>
							<Form.Control
								type='text'
								placeholder='Email'
								name='email'
								value={email || ''}
								onChange={onChangeNewForm}
								required
							/>
						</FloatingLabel>

						<Row>
							<Col>
								<FloatingLabel controlId='floatingPhone' label='Phone' className='mb-3'>
									<Form.Control
										type='text'
										placeholder='Phone Number'
										name='phone'
										value={phone || ''}
										onChange={onChangeNewForm}
										required
									/>
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel controlId='floatingIdNumber' label='Id Number' className='mb-3'>
									<Form.Control
										type='text'
										placeholder='Id Number'
										name='idNumber'
										value={idNumber || ''}
										onChange={onChangeNewForm}
										required
									/>
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
										value={numberOfPeople.adult > 0 ? numberOfPeople.adult : 0}
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
										value={numberOfPeople.child > 0 ? numberOfPeople.child : 0}
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
						<Button variant='primary' type='submit'>
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
