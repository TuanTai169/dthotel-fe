import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Row, Col } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { updateRoom, getAllRoom } from '../../../redux/actions/room';
import * as Validation from '../../../utils/validation';
import { RoomStatus, userRoles } from '../../../assets/app/constants';
import { uploadImage } from './../../../redux/actions/room';

const EditRoomModal = (props) => {
	const { show, handlerEditModalClose, handlerModalParentClose, room } = props;
	const dispatch = useDispatch();

	const [editRoom, setEditRoom] = useState(room);
	const [roomImages, setRoomImages] = useState([]);
	const convenienceList = useSelector((state) => state.convenience.conveniences);
	const users = useSelector((state) => state.userReducer.users);
	const typesList = useSelector((state) => state.types.types);
	const { register, watch, handleSubmit } = new useForm();

	let NameValidation = true;
	NameValidation =
		Validation.PatternName1.test(watch('name')) || Validation.PatternName2.test(watch('name'));

	useEffect(() => setEditRoom(room), [room]);
	useEffect(() => {
		dispatch(getAllRoom());
	}, [dispatch]);

	const onChangeNewForm = (event) => {
		setEditRoom({ ...editRoom, [event.target.name]: event.target.value });
	};
	const onChangeCapacity = (event) => {
		let newCapacity = { ...editRoom.capacity, [event.target.name]: parseInt(event.target.value) };
		setEditRoom({ ...editRoom, capacity: newCapacity });
	};
	const onChangeType = (type) => {
		setEditRoom({ ...editRoom, roomType: type });
	};
	const onChangeConvenience = (arrConvenience) => {
		setEditRoom({ ...editRoom, convenience: arrConvenience });
	};

	const onChangeCleaner = (user) => {
		setEditRoom({ ...editRoom, cleaner: user });
	};

	const onChangeDetail = (e) => {
		if (e.target.name === 'desc') {
			let newDetail = { ...editRoom.detail, [e.target.name]: e.target.value };
			setEditRoom({ ...editRoom, detail: newDetail });
		} else {
			let newDetail = { ...editRoom.detail, [e.target.name]: parseInt(e.target.value) };
			setEditRoom({ ...editRoom, detail: newDetail });
		}
	};
	const onChangeBed = (e) => {
		let newBed = { ...editRoom.bed, [e.target.name]: parseInt(e.target.value) };
		setEditRoom({ ...editRoom, bed: newBed });
	};

	const onChangeImages = (e) => {
		e.preventDefault();
		setRoomImages(e.target.files);
	};

	const onSubmit = (data, e) => {
		e.preventDefault();
		const json = {
			...editRoom,
			name: data.name,
			floor: parseInt(editRoom.floor),
			price: parseInt(editRoom.price),
			roomType: editRoom.roomType._id,
			convenience: editRoom.convenience.length > 0 ? editRoom.convenience.map((x) => x._id) : [],
			status: editRoom.status,
			cleaner: editRoom.cleaner?._id,
		};

		console.log(json);
		// add image into form data
		dispatch(updateRoom(json));
		if (roomImages.length > 0) {
			const formData = new FormData();
			for (let i = 0; i < roomImages.length; i++) {
				formData.append(`files`, roomImages[i]);
			}
			dispatch(uploadImage(editRoom._id, formData));
		}

		resetEditPostData();
		handlerModalParentClose();
	};

	const resetEditPostData = () => {
		handlerEditModalClose();
		setEditRoom(room);
	};

	const cleanerList = users.filter((user) => user.role === userRoles.Cleaner.name);
	const { roomType, convenience, cleaner, roomNumber, name, floor, price, capacity, detail, bed } =
		editRoom;
	const { bedRoom, bathRoom, livingRoom, kitchen, desc } = detail;

	return (
		<>
			<Modal
				show={show}
				onHide={resetEditPostData}
				animation={false}
				dialogClassName='modal-50w admin-modal'
			>
				<Modal.Header closeButton>
					<Modal.Title>EDIT ROOM </Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<Row>
							<Form.Group className='col-3 mb-3' controlId='formBasicType'>
								<Form.Label>Types</Form.Label>
								<Select
									name='types'
									options={typesList}
									defaultValue={typesList.filter((x) => {
										if ((roomType._id === x._id) > -1) return x;
									})}
									getOptionLabel={(option) => option.nameTag}
									getOptionValue={(option) => option._id}
									onChange={onChangeType}
									className='basic-multi-select'
									classNamePrefix='select type'
								/>
							</Form.Group>
							<Form.Group className='col-3 mb-3' controlId='formBasicPrice'>
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
						<Row>
							<Form.Group className='col-6 mb-3' controlId='formBasicRoomName'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Room name'
									name='name'
									defaultValue={name || ''}
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
									readOnly
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
									readOnly
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
							<Form.Group className='col-6 mb-3' controlId='formBasicCleaner'>
								<Form.Label>Cleaner</Form.Label>
								<Select
									name='cleaner'
									options={cleanerList}
									defaultValue={cleanerList.filter((x) => {
										if (cleaner?._id === x._id) return x;
									})}
									getOptionLabel={(option) => option.name}
									getOptionValue={(option) => option._id}
									onChange={onChangeCleaner}
									className='basic-select'
									classNamePrefix='select cleaner'
								/>
							</Form.Group>
						</Row>

						<Row>
							<Form.Group className='col-12 mb-3' controlId='formBasicConvenience'>
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

						<Form.Group controlId='formFileMultiple' className='mb-3'>
							<Form.Label>Images</Form.Label>
							<Form.Control type='file' multiple onChange={onChangeImages} />
						</Form.Group>

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
						<Button variant='primary' type='submit' disabled={!NameValidation}>
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
