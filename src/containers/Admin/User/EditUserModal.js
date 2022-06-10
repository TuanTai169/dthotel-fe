import React, { useState } from 'react';
import { Form, Modal, Button, FloatingLabel, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/actions/user';
import {
	phoneValidation,
	emailValidation,
	nameValidation,
	textValidation,
} from '../../../utils/validation';
import { userRoles } from '../../../assets/app/constants';

function EditUserModal(props) {
	const { show, handlerModalClose, user } = props;

	const dispatch = useDispatch();
	const currentRole = useSelector((state) => state.auth.user.roles);

	const [editUser, setEditUser] = useState(user);

	const onChangeNewForm = (event) =>
		setEditUser({
			...editUser,
			[event.target.name]: event.target.value,
		});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			nameValidation(editUser.name) &&
			emailValidation(editUser.email) &&
			phoneValidation(editUser.phone) &&
			textValidation(editUser.address)
		) {
			resetAddPostData();
			dispatch(updateUser(editUser, user._id));
		}
	};

	const resetAddPostData = () => {
		handlerModalClose();
		setEditUser(user);
	};

	const { name, email, password, phone, address, role } = editUser;

	return (
		<div>
			<Modal show={show} onHide={resetAddPostData} animation={false} dialogClassName='admin-modal'>
				<Modal.Header closeButton>
					<Modal.Title>Edit {name}</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						<FloatingLabel controlId='floatingName' label='Name' className='mb-3'>
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
								placeholder='email'
								name='email'
								value={email || ''}
								onChange={onChangeNewForm}
								disabled
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
								<FloatingLabel controlId='floatingRole' label='Role' className='mb-3'>
									<Form.Select name='role' value={role || ''} onChange={onChangeNewForm} required>
										<option value=''>--</option>
										{currentRole === userRoles.Admin.name && (
											<option value={userRoles.Admin.name}>{userRoles.Admin.name}</option>
										)}
										<option value={userRoles.Manager.name}>{userRoles.Manager.name}</option>
										<option value={userRoles.Employee.name}>{userRoles.Employee.name}</option>
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

export default EditUserModal;
