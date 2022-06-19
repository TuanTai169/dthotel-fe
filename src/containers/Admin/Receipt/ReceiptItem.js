import React, { useState } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import DetailReceiptModal from './DetailReceiptModal';

const ReceiptItem = (props) => {
	const { receipt } = props;

	const [isViewOpen, setIsViewOpen] = useState(false);
	const handlerModalViewClose = () => setIsViewOpen(false);

	return (
		<>
			<td>{receipt.booking.detail.customer.name}</td>
			<td>{receipt.booking.detail.customer.email}</td>
			<td>{receipt.booking.detail.customer.phone}</td>
			<td>{receipt.booking.detail.code}</td>
			<td>
				<ButtonToolbar>
					<Button variant='info' className='btn btn-view' onClick={() => setIsViewOpen(true)}>
						<i className='bx bx-detail icon-bg' style={{ color: '#fff' }}></i>
					</Button>
					{isViewOpen && (
						<DetailReceiptModal
							handlerModalClose={handlerModalViewClose}
							show={isViewOpen}
							receipt={receipt}
						/>
					)}
				</ButtonToolbar>
			</td>
		</>
	);
};

export default ReceiptItem;
