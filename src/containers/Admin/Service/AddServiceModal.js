import React, { useState } from 'react';
import { Form, Modal, Button, FloatingLabel } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addService } from '../../../redux/actions/service';
import { nameValidation, numberValidation } from '../../../utils/validation';

const AddServiceModal = (props) => {
	const { show, handlerModalClose } = props;
	const dispatch = useDispatch();

	const [newService, setNewService] = useState({
		name: '',
		price: 0,
		isProduct: false,
	});

	const onChangeNewForm = (event) =>
		setNewService({ ...newService, [event.target.name]: event.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (nameValidation(newService.name) && numberValidation(newService.price)) {
			resetAddPostData();
			dispatch(
				addService({ ...newService, isProduct: newService.isProduct === '1' ? true : false })
			);
		}
	};

	const resetAddPostData = () => {
		setNewService({ name: '', price: 0, isProduct: false });
		handlerModalClose();
	};
	const { name, price } = newService;
	return (
		<>
			<Modal show={show} onHide={resetAddPostData} animation={false} dialogClassName='admin-modal'>
				<Modal.Header closeButton>
					<Modal.Title>Add Service</Modal.Title>
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

						<FloatingLabel controlId='floatingPrice' label='Price (USD)' className='mb-3'>
							<Form.Control
								type='number'
								placeholder='0'
								name='price'
								value={price || ''}
								onChange={onChangeNewForm}
								required
							/>
						</FloatingLabel>
						<FloatingLabel controlId='floatingSelect' label='Select type'>
							<Form.Select
								aria-label='Floating label select example'
								name='isProduct'
								onChange={onChangeNewForm}
							>
								<option>--</option>
								<option value='0'>Service</option>
								<option value='1'>Product</option>
							</Form.Select>
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

export default AddServiceModal;
