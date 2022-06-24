import React, { useState } from 'react';
import { Form, Modal, Button, ButtonToolbar, Row, Col, FloatingLabel } from 'react-bootstrap';
import { convertStringToDate } from '../../../utils/convertDateTime';
import CustomerForm from '../FormBooking/CustomerForm';
import RoomForm from '../FormBooking/RoomForm';
import ServiceForm from './../FormBooking/ServiceForm';
import PrintBill from './PrintBill';

function DetailReceiptModal(props) {
	const { show, handlerModalClose, receipt } = props;
	const { booking, paidOut, refund, modeOfPayment } = receipt;

	const checkInDateConvert = convertStringToDate(booking.detail.checkInDate);
	const checkOutDateConvert = convertStringToDate(booking.detail.checkOutDate);

	const [isViewOpen, setIsViewOpen] = useState(false);
	const handlerModalViewClose = () => setIsViewOpen(false);

	//print

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
					<Modal.Title>{booking.code}</Modal.Title>
					{/* <div style={{ marginLeft: '30%', fontSize: '20px' }}>
						Total Price (USD):{' '}
						<strong style={{ color: 'red', fontSize: '20px' }}>{booking.detail.totalPrice}</strong>
					</div> */}
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
									<Form.Control
										type='text'
										value={booking.discount ? booking.discount?.discount : 0}
										disabled
									/>
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel controlId='floatingDeposit' label='Deposit (USD)' className='mb-3'>
									<Form.Control
										type='text'
										value={booking.deposit ? booking.deposit : 0}
										disabled
									/>
								</FloatingLabel>
							</Col>
						</Row>
						<Row style={{ borderBottom: '1px solid #bbb' }}>
							<Col>
								<FloatingLabel controlId='floatingPaidOut' label='Paid (USD) ' className='mb-3'>
									<Form.Control type='text' value={paidOut} readOnly />
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel controlId='floatingRefund' label='Refund (USD) ' className='mb-3'>
									<Form.Control type='text' value={refund} readOnly />
								</FloatingLabel>
							</Col>

							<Col>
								<FloatingLabel controlId='floatingVAT' label='VAT(%) ' className='mb-3'>
									<Form.Control type='text' value={10} readOnly />
								</FloatingLabel>
							</Col>

							<Col>
								<FloatingLabel
									controlId='floatingModeOfPayment'
									label='Mode Of Payment '
									className='mb-3'
								>
									<Form.Control type='text' value={modeOfPayment} readOnly />
								</FloatingLabel>
							</Col>
						</Row>

						<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
							<Form.Group controlId='formGridCustomer'>
								<h5>Customer</h5>
								<CustomerForm customer={booking.detail.customer} />
							</Form.Group>
						</Row>
						<Row className='mb-3' style={{ borderBottom: '1px solid #bbb' }}>
							<Form.Group controlId='formGridRoom'>
								<div className='form-label'>
									<h5>Room</h5>
									{/* <p>
										Room Price (USD): <strong style={{ color: 'red' }}>{booking.roomCharge}</strong>
									</p> */}
								</div>
								<RoomForm rooms={booking.detail.rooms} />
							</Form.Group>
						</Row>

						{[...booking.detail.services, ...booking.detail.products].length > 0 && (
							<Row className='mb-3'>
								<Form.Group as={Col} controlId='formGridService'>
									<div className='form-label'>
										<h5>Services and Products</h5>
										{/* <p>
											Service Price (USD):{' '}
											<strong style={{ color: 'red' }}>{booking.serviceCharge}</strong>
										</p> */}
									</div>
									<ServiceForm
										services={[...booking.detail.services, ...booking.detail.products]}
									/>
								</Form.Group>
							</Row>
						)}
					</Modal.Body>
					<Modal.Footer>
						<ButtonToolbar>
							<Button variant='danger' onClick={() => setIsViewOpen(true)}>
								Print
							</Button>
							{isViewOpen && (
								<PrintBill
									handlerModalClose={handlerModalViewClose}
									show={isViewOpen}
									receipt={receipt}
								/>
							)}
						</ButtonToolbar>
						<Button variant='secondary' onClick={handlerModalClose}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}

export default DetailReceiptModal;
