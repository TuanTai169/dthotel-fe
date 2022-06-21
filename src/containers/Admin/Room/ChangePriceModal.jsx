import React, { useState } from 'react';
import { Modal, Form, Row, Button } from 'react-bootstrap';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { changePrice, getAllRoom } from './../../../redux/actions/room';

const ChangePriceModal = (props) => {
	const { show, handlerModalClose, rooms } = props;
	const [type, setType] = useState('');
	const [selectedRoom, setSelectedRoom] = useState([...rooms]);
	const [list, setList] = useState([]);
	const [percent, setPercent] = useState(0);
	const typesList = useSelector((state) => state.types.types);

	const dispatch = useDispatch();

	const onChangeType = (type) => {
		if (type !== null) {
			const filterListRoom = [...rooms].filter((room) => room.roomType._id === type._id);
			setType(type.type);
			setSelectedRoom(filterListRoom);
		} else {
			setType('');
			setSelectedRoom([...rooms]);
		}
	};
	const onChangeSelectedRoom = (list) => {
		if (list.length > 0) {
			if (list[0]._id === 'all') {
				setType('all');
				setList(selectedRoom.map((r) => r._id));
			} else {
				setList(list.map((r) => r._id));
			}
		} else {
			setType('');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			list,
			percent,
		};
		console.log(data);
		dispatch(changePrice(data));
		resetData();
		setTimeout(() => dispatch(getAllRoom()), 4000);
	};

	const resetData = () => {
		setList([]);
		setType('');
		setPercent(0);
		handlerModalClose();
	};

	const selectAllRoomOption = {
		roomNumber: 'All Rooms',
		_id: 'all',
	};

	return (
		<div>
			<Modal show={show} onHide={handlerModalClose} animation={false} dialogClassName='admin-modal'>
				<Modal.Header closeButton>
					<Modal.Title>Change Price</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Form.Group className='col-6 mb-3' controlId='formBasicType'>
							<Form.Label>Types</Form.Label>
							<Select
								name='types'
								options={[...typesList]}
								getOptionLabel={(option) => option.nameTag}
								getOptionValue={(option) => option._id}
								onChange={onChangeType}
								className='basic-multi-select'
								classNamePrefix='select type'
								isClearable
							/>
						</Form.Group>

						<Form.Group className='col-6 mb-3' controlId='formBasicPrice'>
							<Form.Label>Decrease/Increase (%)</Form.Label>
							<Form.Control
								type='number'
								name='percent'
								value={percent || ''}
								onChange={(e) => setPercent(isNaN(e.target.value) ? 0 : parseInt(e.target.value))}
								required
							/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group className=' mb-3' controlId='formBasicType'>
							<Form.Label>Rooms</Form.Label>
							<Select
								name='room'
								options={[selectAllRoomOption, ...selectedRoom]}
								getOptionLabel={(option) => option.roomNumber}
								getOptionValue={(option) => option._id}
								onChange={onChangeSelectedRoom}
								className='basic-multi-select'
								classNamePrefix='select rooms'
								isMulti
								isOptionDisabled={(option) => option.roomNumber && type === 'all'}
							/>
						</Form.Group>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleSubmit}>Save</Button>
					<Button variant='secondary' onClick={handlerModalClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ChangePriceModal;
