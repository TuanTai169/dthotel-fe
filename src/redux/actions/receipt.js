import * as types from '../constants/receipt';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HOST_API_URL } from '../constants/api';

// READ ALL Receipt
export const getAllReceipt = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_RECEIPT_LOADING, payload: true });

			const response = await axios.get(`${HOST_API_URL}/receipt`);
			if (response.data.success) {
				dispatch({
					type: types.GET_ALL_RECEIPT,
					payload: response.data.receipts,
				});
				dispatch({ type: types.SET_RECEIPT_LOADING, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: types.SET_RECEIPT_ERROR });
			error.response && toast.error(error.response.data.message);
		}
	};
};

// CHECK OUT
export const checkOut = (newReceipt) => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_RECEIPT_LOADING, payload: true });

			const response = await axios.post(`${HOST_API_URL}/receipt`, newReceipt);

			if (response.data.success) {
				dispatch({
					type: types.ADD_RECEIPT,
					payload: response.data.receipt,
				});
				dispatch({ type: types.SET_RECEIPT_LOADING, payload: false });
				toast.success(response.data.message);
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: types.SET_RECEIPT_LOADING, payload: false });
			error.response && toast.error(error.response.data.message);
		}
	};
};

// STATISTIC
export const getStatistic = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_RECEIPT_LOADING, payload: true });
			const response = await axios.get(`${HOST_API_URL}/receipt/statistic`);
			if (response.data.success) {
				dispatch({
					type: types.STATISTIC,
					payload: response.data.statistic,
				});
				dispatch({ type: types.SET_RECEIPT_LOADING, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: types.SET_RECEIPT_LOADING, payload: false });
			error.response && toast.error(error.response.data.message);
		}
	};
};

export const getVnPayUrl = (data) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(`${HOST_API_URL}/payment/create_payment_url`, data);
			if (!!res && res.data.success) {
				return res.data.vnpUrl;
			}
			return undefined;
		} catch (error) {
			console.log(error);
			error.response;
		}
	};
};
