import React, { useState } from 'react';
import { Form, Modal, Button, FloatingLabel } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateService } from '../../../redux/actions/service';
import { nameValidation, numberValidation } from '../../../utils/validation';
import * as Validation from '../../../utils/validation';

const EditServiceModal = (props) => {
	const { show, handlerModalClose, service } = props;
	const dispatch = useDispatch();

	const [editService, setEditService] = useState(service);
	const { register, watch, handleSubmit } = new useForm();
	let NameValidation = true;
	NameValidation =
		Validation.PatternName1.test(watch('name')) || Validation.PatternName2.test(watch('name'));

	const onChangeNewForm = (event) =>
		setEditService({
			...editService,
			[event.target.name]: event.target.value,
		});

	const onSubmit = (data, e) => {
		e.preventDefault();

		resetEditPostData();
		dispatch(updateService(editService));
	};

	const resetEditPostData = () => {
		handlerModalClose();
		setEditService(service);
	};
	const { name, price } = editService;
	return (
		<div>
			<Modal show={show} onHide={resetEditPostData} animation={false} dialogClassName='admin-modal'>
				<Modal.Header closeButton>
					<Modal.Title>Edit Service</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<FloatingLabel controlId='floatingName' label='Name' className='mb-3'>
							<Form.Control
								type='text'
								placeholder='Name'
								name='name'
								defaultValue={name || ''}
								required
								{...register('name')}
							/>
							<p className='alertValidation'>
								{NameValidation != true ? 'Please input a valid name!' : ''}
							</p>
						</FloatingLabel>

						<FloatingLabel controlId='floatingPrice' label='Price (USD)' className='mb-3'>
							<Form.Control
								type='number'
								placeholder='0'
								name='price'
								min='0'
								value={price || ''}
								onChange={onChangeNewForm}
								required
							/>
						</FloatingLabel>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='primary' type='submit' disabled={!NameValidation}>
							Save
						</Button>
						<Button variant='secondary' onClick={resetEditPostData}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</div>
	);
};

export default EditServiceModal;
