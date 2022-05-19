import React, { useState } from 'react';
import { Form, Modal, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom } from '../../../redux/actions/room';
import { numberValidation } from '../../../utils/validation';
import { roomDefault } from '../../../assets/app/constanst';

const AddRoomModal = (props) => {
	const { show, handlerModalClose } = props;
	const dispatch = useDispatch();

	const [newRoom, setNewRoom] = useState(roomDefault);
	const convenienceList = useSelector((state) => state.convenience.conveniences);
	const typesList = useSelector((state) => state.types.types);

	const onChangeNewForm = (event) => {
		setNewRoom({ ...newRoom, [event.target.name]: event.target.value });
	};
	const onChangeCapacity = (event) => {
		let newCapacity = { ...newRoom.capacity, [event.target.name]: event.target.value };
		setNewRoom({ ...newRoom, capacity: newCapacity });
	};
	const onChangeType = (arrType) => {
		setNewRoom({ ...newRoom, roomType: arrType });
	};
	const onChangeConvenience = (arrConvenience) => {
		setNewRoom({ ...newRoom, convenience: arrConvenience });
	};

	const handlerSubmit = (e) => {
		e.preventDefault();
		if (
			numberValidation(newRoom.floor) &&
			numberValidation(newRoom.price) &&
			numberValidation(newRoom.roomNumber) &&
			numberValidation(newRoom.capacity.adult) &&
			numberValidation(newRoom.capacity.child)
		) {
			dispatch(
				addRoom({
					...newRoom,
					roomType: newRoom.roomType.map((x) => x._id),
					convenience: newRoom.convenience.map((x) => x._id),
				})
			);
			resetAddPostData();
		}
	};
	const resetAddPostData = () => {
		setNewRoom(roomDefault);
		handlerModalClose();
	};

	const { roomNumber, floor, price, capacity, desc } = newRoom;
	return (
		<>
			<Modal show={show} onHide={resetAddPostData} animation={false} dialogClassName='modal-50w'>
				<Modal.Header closeButton>
					<Modal.Title>ADD ROOM </Modal.Title>
				</Modal.Header>
				<Form onSubmit={handlerSubmit}>
					<Modal.Body>
						<Row>
							<Form.Group className='col-6 mb-3' controlId='formBasicFloor'>
								<Form.Label>Floor</Form.Label>
								<Form.Control
									type='text'
									placeholder='1'
									name='floor'
									value={floor || ''}
									onChange={onChangeNewForm}
									required
								/>
							</Form.Group>

							<Form.Group className='col-6 mb-3' controlId='formBasicRoomNumber'>
								<Form.Label>Room Number</Form.Label>
								<Form.Control
									type='text'
									placeholder='101'
									name='roomNumber'
									value={roomNumber || ''}
									onChange={onChangeNewForm}
									required
								/>
							</Form.Group>
						</Row>
						<Row>
							<Form.Group className='col-6 mb-3' controlId='formBasicPrice'>
								<Form.Label>Price(USD)</Form.Label>
								<Form.Control
									type='number'
									placeholder='0'
									name='price'
									value={price || ''}
									onChange={onChangeNewForm}
									required
								/>
							</Form.Group>
							<Form.Group className='col-3 mb-3' controlId='formBasicAdult'>
								<Form.Label>Adult</Form.Label>
								<Form.Control
									type='number'
									placeholder='0'
									name='adult'
									value={capacity.adult > 0 ? capacity.adult : 1 || 1}
									onChange={onChangeCapacity}
									required
								/>
							</Form.Group>
							<Form.Group className='col-3 mb-3' controlId='formBasicChildren'>
								<Form.Label>Children</Form.Label>
								<Form.Control
									type='number'
									placeholder='0'
									name='child'
									value={capacity.child > -1 ? capacity.child : 0 || 0}
									onChange={onChangeCapacity}
									required
								/>
							</Form.Group>
						</Row>
						<Form.Group className='mb-3' controlId='formBasicType'>
							<Form.Label>Types</Form.Label>
							<Select
								isMulti
								name='types'
								options={typesList}
								getOptionLabel={(option) => option.nameTag}
								getOptionValue={(option) => option._id}
								onChange={onChangeType}
								className='basic-multi-select'
								classNamePrefix='select type'
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='formBasicConvenience'>
							<Form.Label>Convenience</Form.Label>
							<Select
								isMulti
								name='convenience'
								options={convenienceList}
								getOptionLabel={(option) => option.name}
								getOptionValue={(option) => option._id}
								onChange={onChangeConvenience}
								className='basic-multi-select'
								classNamePrefix='select convenience'
							/>
						</Form.Group>

						<Form.Group className='mb-3' controlId='formBasicDescription'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								placeholder='Description'
								name='desc'
								value={desc || ''}
								onChange={onChangeNewForm}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button type='submit'>Save</Button>
						<Button variant='secondary' onClick={resetAddPostData}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default AddRoomModal;
