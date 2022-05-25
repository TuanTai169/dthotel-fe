import * as types from '../constants/typeOfRoom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HOST_API_URL } from '../constants/api';

// READ ALL Types
export const getAllTypes = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_TYPES_LOADING, payload: true });
			const response = await axios.get(`${HOST_API_URL}/type-of-room`);
			if (response.data.success) {
				dispatch({
					type: types.GET_ALL_TYPES,
					payload: response.data.types,
				});
				dispatch({ type: types.SET_TYPES_LOADING, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: types.SET_TYPES_LOADING, payload: false });
			error.response && toast.error(error.response.data.message);
		}
	};
};

export const findType = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_TYPES_LOADING, payload: true });
			const response = await axios.get(`${HOST_API_URL}/type-of-room/${id}`);

			if (response.data.success) {
				dispatch({
					type: types.FIND_TYPES,
					payload: response.data.type,
				});
				dispatch({ type: types.SET_TYPES_LOADING, payload: false });
			}
		} catch (error) {
			dispatch({ type: types.SET_TYPES_LOADING, payload: false });
		}
	};
};

export const addType = (newType) => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_TYPES_LOADING, payload: true });
			const response = await axios.post(`${HOST_API_URL}/type-of-room`, newType);
			if (response.data.success) {
				dispatch({
					type: types.ADD_TYPES,
					payload: response.data.newType,
				});
				toast.success(response.data.message);
				dispatch({ type: types.SET_TYPES_LOADING, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: types.SET_TYPES_LOADING, payload: false });
			error.response && toast.error(error.response.data.message);
		}
	};
};

export const deleteType = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_TYPES_LOADING, payload: true });
			const response = await axios.put(`${HOST_API_URL}/type-of-room/delete/${id}`);
			if (response.data.success) {
				dispatch({
					type: types.DELETE_TYPES,
					payload: id,
				});
				toast.success(response.data.message);
				dispatch({ type: types.SET_TYPES_LOADING, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: types.SET_TYPES_LOADING, payload: false });
			error.response && toast.error(error.response.data.message);
		}
	};
};

export const updateTypes = (updateTypes) => {
	return async (dispatch) => {
		dispatch({ type: types.SET_TYPES_LOADING, payload: true });
		try {
			const response = await axios.put(
				`${HOST_API_URL}/type-of-room/update/${updateTypes._id}`,
				updateTypes
			);
			if (response.data.success) {
				dispatch({
					type: types.UPDATE_TYPES,
					payload: response.data.updatedType,
				});
				dispatch({ type: types.SET_TYPES_LOADING, payload: false });
				toast.success(response.data.message);
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: types.SET_TYPES_LOADING, payload: false });
			error.response && toast.error(error.response.data.message);
		}
	};
};
