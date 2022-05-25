import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { updateRoom, getAllRoom } from '../../../redux/actions/room';
import { numberValidation } from '../../../utils/validation';

const EditRoomModal = (props) => {
	const { show, handlerEditModalClose, handlerModalParentClose, room } = props;
	const dispatch = useDispatch();

	const [editRoom, setEditRoom] = useState(room);
	const convenienceList = useSelector((state) => state.convenience.conveniences);
	const typesList = useSelector((state) => state.types.types);

	useEffect(() => setEditRoom(room), [room]);
	useEffect(() => {
		dispatch(getAllRoom());
	}, [dispatch]);

	const onChangeNewForm = (event) => {
		setEditRoom({ ...editRoom, [event.target.name]: event.target.value });
	};
	const onChangeCapacity = (event) => {
		let newCapacity = { ...editRoom.capacity, [event.target.name]: event.target.value };
		setEditRoom({ ...editRoom, capacity: newCapacity });
	};
	const onChangeType = (arrType) => {
		setEditRoom({ ...editRoom, roomType: arrType });
	};
	const onChangeConvenience = (arrConvenience) => {
		setEditRoom({ ...editRoom, convenience: arrConvenience });
	};

	const handlerSubmit = (e) => {
		e.preventDefault();
		if (
			numberValidation(editRoom.floor) &&
			numberValidation(editRoom.price) &&
			numberValidation(editRoom.roomNumber) &&
			numberValidation(editRoom.capacity.adult) &&
			numberValidation(editRoom.capacity.child)
		) {
			dispatch(
				updateRoom({
					...editRoom,
					roomType: editRoom.roomType.map((x) => x._id),
					convenience: editRoom.convenience.map((x) => x._id),
				})
			);
			resetEditPostData();
			handlerModalParentClose();
		}
	};

	const resetEditPostData = () => {
		handlerEditModalClose();
		setEditRoom(room);
	};
	const { roomNumber, floor, price, capacity, roomType, convenience, desc } = editRoom;

	return (
		<>
			<Modal show={show} onHide={resetEditPostData} animation={false} dialogClassName='modal-50w'>
				<Modal.Header closeButton>
					<Modal.Title>EDIT ROOM </Modal.Title>
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
									disabled
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
									disabled
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
								defaultValue={typesList.filter((x) => {
									if (roomType.findIndex((item) => item._id === x._id) > -1) return x;
								})}
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
								defaultValue={convenienceList.filter((x) => {
									if (convenience.findIndex((item) => item._id === x._id) > -1) return x;
								})}
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
						<Button variant='primary' type='submit'>
							Save
						</Button>
						<Button variant='secondary' onClick={resetEditPostData}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default EditRoomModal;
