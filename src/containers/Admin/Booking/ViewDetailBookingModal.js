import React from 'react';
import { Modal, Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { convertStringToDate } from '../../../utils/convertDateTime';
import CustomerForm from '../FormBooking/CustomerForm';
import RoomForm from '../FormBooking/RoomForm';
import ServiceForm from '../FormBooking/ServiceForm';

const ViewDetailBookingModal = (props) => {
	const { show, handlerModalClose, booking } = props;

	const {
		code,
		customer,
		rooms,
		checkInDate,
		checkOutDate,
		deposit,
		discount,
		services,
		roomCharge,
		serviceCharge,
		totalPrice,
	} = booking;

	const checkInDateConvert = convertStringToDate(checkInDate);
	const checkOutDateConvert = convertStringToDate(checkOutDate);

	return (
		<>
			<Modal
				show={show}
				onHide={handlerModalClose}
				animation={false}
				size='lg'
				dialogClassName='admin-modal'
			>
				<Modal.Header closeButton>
					<Modal.Title>{code}</Modal.Title>
				</Modal.Header>
				<Form>
					<Modal.Body>
						<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
							<Col>
								<FloatingLabel controlId='floatingCheckIn' label='Check in ' className='mb-3'>
									<Form.Control type='text' value={checkInDateConvert} disabled />
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel controlId='floatingCheckOut' label='Check out' className='mb-3'>
									<Form.Control type='text' value={checkOutDateConvert} disabled />
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel controlId='floatingDiscount' label='Discount (%)' className='mb-3'>
									<Form.Control type='text' value={discount} disabled />
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel controlId='floatingDeposit' label='Deposit (USD)' className='mb-3'>
									<Form.Control type='text' value={deposit} disabled />
								</FloatingLabel>
							</Col>
						</Row>
						<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
							<Form.Group controlId='formGridCustomer'>
								<h5>Customer</h5>
								<CustomerForm customer={customer} />
							</Form.Group>
						</Row>
						<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
							<Form.Group controlId='formGridRoom'>
								<div className='form-label'>
									<h5>Room</h5>
									<p>
										Price (USD): <strong style={{ color: 'red' }}>{roomCharge}</strong>
									</p>
								</div>
								<RoomForm rooms={rooms} />
							</Form.Group>
						</Row>
						<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
							<Form.Group as={Col} controlId='formGridService'>
								<div className='form-label'>
									<h5>Service</h5>
									<p>
										Price (USD): <strong style={{ color: 'red' }}>{serviceCharge}</strong>
									</p>
								</div>
								<ServiceForm services={services} />
							</Form.Group>
						</Row>
						<p>
							Total Price (USD):{' '}
							<strong style={{ color: 'red', fontSize: '20px' }}>{totalPrice}</strong>
						</p>
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
};

export default ViewDetailBookingModal;
