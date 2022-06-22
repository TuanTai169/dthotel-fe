import React, { useState } from 'react';
import { Form, Modal, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { addRoom } from '../../../redux/actions/room';
import { numberValidation } from '../../../utils/validation';
import { roomDefault, RoomStatus } from '../../../assets/app/constants';
import * as Validation from './../../../utils/validation';

const AddRoomModal = (props) => {
	const { show, handlerModalClose } = props;
	const dispatch = useDispatch();

	const [newRoom, setNewRoom] = useState(roomDefault);
	const convenienceList = useSelector((state) => state.convenience.conveniences);
	const typesList = useSelector((state) => state.types.types);
	const {
		register,
		watch,
		formState: { errors },
	} = useForm();

	let NameValidation = true;
	NameValidation =
		Validation.PatternName1.test(watch('name')) || Validation.PatternName2.test(watch('name'));

	const onChangeNewForm = (event) => {
		setNewRoom({ ...newRoom, [event.target.name]: event.target.value });
	};
	const onChangeCapacity = (event) => {
		let newCapacity = { ...newRoom.capacity, [event.target.name]: parseInt(event.target.value) };
		setNewRoom({ ...newRoom, capacity: newCapacity });
	};
	const onChangeType = (type) => {
		setNewRoom({ ...newRoom, roomType: type });
	};
	const onChangeConvenience = (arrConvenience) => {
		setNewRoom({ ...newRoom, convenience: arrConvenience });
	};

	const onChangeDetail = (e) => {
		if (e.target.name === 'desc') {
			let newDetail = { ...newRoom.detail, [e.target.name]: e.target.value };
			setNewRoom({ ...newRoom, detail: newDetail });
		} else {
			let newDetail = { ...newRoom.detail, [e.target.name]: parseInt(e.target.value) };
			setNewRoom({ ...newRoom, detail: newDetail });
		}
	};
	const onChangeBed = (e) => {
		let newBed = { ...newRoom.bed, [e.target.name]: parseInt(e.target.value) };
		setNewRoom({ ...newRoom, bed: newBed });
	};

	const handlerSubmit = (e) => {
		e.preventDefault();
		const data = {
			...newRoom,
			floor: parseInt(newRoom.floor),
			price: parseInt(newRoom.price),
			roomType: newRoom.roomType._id,
			convenience: newRoom.convenience.length > 0 ? newRoom.convenience.map((x) => x._id) : [],
			status: RoomStatus.Ready.name,
		};
		dispatch(addRoom(data));
		resetAddPostData();
	};
	const resetAddPostData = () => {
		setNewRoom(roomDefault);
		handlerModalClose();
	};

	const { roomNumber, name, floor, price, capacity, detail, bed } = newRoom;
	const { bedRoom, bathRoom, livingRoom, kitchen, desc } = detail;
	return (
		<>
			<Modal
				show={show}
				onHide={resetAddPostData}
				animation={false}
				dialogClassName='modal-50w admin-modal'
			>
				<Modal.Header closeButton>
					<Modal.Title>ADD ROOM </Modal.Title>
				</Modal.Header>
				<Form onSubmit={handlerSubmit}>
					<Modal.Body>
						<Row>
							<Form.Group className='col-3 mb-3' controlId='formBasicType'>
								<Form.Label>Types</Form.Label>
								<Select
									name='types'
									options={typesList}
									getOptionLabel={(option) => option.nameTag}
									getOptionValue={(option) => option._id}
									className='basic-multi-select'
									classNamePrefix='select type'
								/>
							</Form.Group>
							<Form.Group className='col-3 mb-3' controlId='formBasicPrice'>
								<Form.Label>Price(USD)</Form.Label>
								<Form.Control type='number' placeholder='0' name='price' min='1' />
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
						<Row>
							<Form.Group className='col-6 mb-3' controlId='formBasicRoomName'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Room name'
									name='name'
									required
									{...register('name')}
								/>
								<p className='alertValidation'>
									{NameValidation != true ? 'Please input a valid room name!' : ''}
								</p>
							</Form.Group>
							<Form.Group className='col-3 mb-3' controlId='formBasicFloor'>
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

							<Form.Group className='col-3 mb-3' controlId='formBasicRoomNumber'>
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
							<Form.Group className='col-3 mb-3' controlId='formBasicSingleBed'>
								<Form.Label>Single Bed</Form.Label>
								<Form.Control
									type='number'
									placeholder='0'
									name='single'
									min='0'
									value={bed.single || ''}
									onChange={onChangeBed}
								/>
							</Form.Group>
							<Form.Group className='col-3 mb-3' controlId='formBasicDoubleBed'>
								<Form.Label>Double Bed</Form.Label>
								<Form.Control
									type='number'
									placeholder='0'
									min='0'
									name='double'
									value={bed.double || ''}
									onChange={onChangeBed}
								/>
							</Form.Group>
							<Form.Group className='col-6 mb-3' controlId='formBasicConvenience'>
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
						</Row>

						<Row>
							<Form.Group className='col-3 mb-3' controlId='formBasicBedRoom'>
								<Form.Label>BedRoom</Form.Label>
								<Form.Control
									type='number'
									placeholder='0'
									min='0'
									name='bedRoom'
									value={bedRoom || ''}
									onChange={onChangeDetail}
								/>
							</Form.Group>
							<Form.Group className='col-3 mb-3' controlId='formBasicBathRoom'>
								<Form.Label>BathRoom</Form.Label>
								<Form.Control
									type='number'
									placeholder='0'
									min='0'
									name='bathRoom'
									value={bathRoom || ''}
									onChange={onChangeDetail}
								/>
							</Form.Group>
							<Form.Group className='col-3 mb-3' controlId='formBasicLivingRoom'>
								<Form.Label>LivingRoom</Form.Label>
								<Form.Control
									type='number'
									placeholder='0'
									min='0'
									name='livingRoom'
									value={livingRoom || ''}
									onChange={onChangeDetail}
								/>
							</Form.Group>
							<Form.Group className='col-3 mb-3' controlId='formBasicKitchen'>
								<Form.Label>Kitchen</Form.Label>
								<Form.Control
									type='number'
									placeholder='0'
									min='0'
									name='kitchen'
									value={kitchen || ''}
									onChange={onChangeDetail}
								/>
							</Form.Group>
						</Row>

						<Form.Group className='mb-3' controlId='formBasicDescription'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								placeholder='Description'
								name='desc'
								value={desc || ''}
								onChange={onChangeDetail}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button type='submit' disabled={!NameValidation}>
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

export default AddRoomModal;
