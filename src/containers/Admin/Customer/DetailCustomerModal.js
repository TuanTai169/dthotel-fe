import React from 'react';
import { Form, Modal, Button, Row, Col, FloatingLabel } from 'react-bootstrap';

function DetailCustomerModal(props) {
	const { show, handlerModalClose, customer } = props;

	const { name, email, phone, address, idNumber, numberOfPeople } = customer;

	return (
		<>
			<Modal show={show} onHide={handlerModalClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>View Customer</Modal.Title>
				</Modal.Header>
				<Form>
					<Modal.Body>
						<FloatingLabel controlId='floatingTextarea' label='Name' className='mb-3'>
							<Form.Control
								type='text'
								placeholder='Name'
								name='name'
								value={name || ''}
								disabled
							/>
						</FloatingLabel>
						<FloatingLabel controlId='floatingEmail' label='Email' className='mb-3'>
							<Form.Control
								type='text'
								placeholder='Email'
								name='email'
								value={email || ''}
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
										disabled
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
										disabled
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
										disabled
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
										disabled
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
								disabled
							/>
						</FloatingLabel>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handlerModalClose}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}

export default DetailCustomerModal;
