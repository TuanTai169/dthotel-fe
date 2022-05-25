import * as types from '../constants/convenience';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HOST_API_URL } from '../constants/api';

// READ ALL conveniences
export const getAllConveniences = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: true });
			const response = await axios.get(`${HOST_API_URL}/convenience`);
			if (response.data.success) {
				dispatch({
					type: types.GET_ALL_CONVENIENCES,
					payload: response.data.conveniences,
				});
				dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: false });
			error.response && toast.error(error.response.data.message);
		}
	};
};

export const findConvenience = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: true });
			const response = await axios.get(`${HOST_API_URL}/convenience/${id}`);

			if (response.data.success) {
				dispatch({
					type: types.FIND_CONVENIENCES,
					payload: response.data.convenience,
				});
				dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: false });
			}
		} catch (error) {
			dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: false });
		}
	};
};

export const addType = (newType) => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: true });
			const response = await axios.post(`${HOST_API_URL}/convenience`, newType);
			if (response.data.success) {
				dispatch({
					type: types.ADD_CONVENIENCES,
					payload: response.data.newConvenience,
				});
				toast.success(response.data.message);
				dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: false });
			error.response && toast.error(error.response.data.message);
		}
	};
};

export const deleteConvenience = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: true });
			const response = await axios.put(`${HOST_API_URL}/convenience/delete/${id}`);
			if (response.data.success) {
				dispatch({
					type: types.DELETE_CONVENIENCES,
					payload: id,
				});
				toast.success(response.data.message);
				dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: false });
			error.response && toast.error(error.response.data.message);
		}
	};
};

export const updateConveniences = (updateConvenience) => {
	return async (dispatch) => {
		dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: true });
		try {
			const response = await axios.put(
				`${HOST_API_URL}/convenience/update/${updateConvenience._id}`,
				updateConvenience
			);
			if (response.data.success) {
				dispatch({
					type: types.UPDATE_CONVENIENCES,
					payload: response.data.updatedConvenience,
				});
				dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: false });
				toast.success(response.data.message);
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: types.SET_CONVENIENCES_LOADING, payload: false });
			error.response && toast.error(error.response.data.message);
		}
	};
};
