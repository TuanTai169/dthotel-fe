import React, { useState } from 'react';
import { Form, Modal, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
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

function EditCustomerModal(props) {
	const { show, handlerModalClose, customer } = props;
	const dispatch = useDispatch();

	const [editCustomer, setEditCustomer] = useState(customer);

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
			<Modal show={show} onHide={resetAddPostData} animation={false}>
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
								disabled
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
		</div>
	);
}

export default EditCustomerModal;
