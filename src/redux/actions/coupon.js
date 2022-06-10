import * as types from '../constants/coupon';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HOST_API_URL } from '../constants/api';

// READ ALL conveniences
export const getAllCoupon = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_COUPON_LOADING, payload: true });
			const response = await axios.get(`${HOST_API_URL}/coupon`);
			if (response.data.success) {
				dispatch({
					type: types.GET_ALL_COUPON,
					payload: response.data.coupons,
				});
			} else {
				dispatch({ type: types.SET_COUPON_ERROR, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: types.SET_COUPON_LOADING, payload: false });
			error.response && toast.error(error.response.data.message);
		}
	};
};
