import React from 'react';

import { Modal } from 'react-bootstrap';
const PolicyModal = (props) => {
	const { show, onClose } = props;

	return (
		<>
			<Modal show={show} onHide={onClose} size='lg'>
				<Modal.Header>
					<Modal.Title>Booking Policies</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='policy'>
						<div className='title'>Deluxe Twin Mountain View</div>
						<div className='detail'>
							<p className='item'>
								<strong>Cancellation: </strong> If cancelled or modified more than 3 days before the
								date of arrival, no penalty will be charged. If cancelled or modified less than 3
								days before the date of arrival, the first night will be charged. In case of
								no-show, the full booking item amount will be charged.
							</p>
							<p>
								<strong>Payment: </strong>
								No deposit will be charged. Balance due on arrival.
							</p>
							<p>
								<strong>The exchange rates: </strong> 1 USD = 23.500 VND.
							</p>
							<p>
								<strong>Meal included: </strong>
								Breakfast included.
							</p>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default PolicyModal;
