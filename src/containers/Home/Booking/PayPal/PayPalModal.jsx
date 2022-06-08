import React from 'react';
import { Modal } from 'react-bootstrap';
import PayPal from './index';

const PayPalModal = (props) => {
	const { show, closeModal, data, onSuccess } = props;
	return (
		<>
			<Modal show={show} onHide={closeModal}>
				<Modal.Header>
					<Modal.Title>Payment by PayPal</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<PayPal data={data} onSuccess={onSuccess} />
				</Modal.Body>
			</Modal>
		</>
	);
};

export default PayPalModal;
