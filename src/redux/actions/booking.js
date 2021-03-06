import * as types from '../constants/booking';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HOST_API_URL } from '../constants/api';

// READ ALL BOOKING
export const getAllBooking = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_BOOKING_LOADING, payload: true });
			const response = await axios.get(`${HOST_API_URL}/booking`);

			if (response.data.success) {
				dispatch({
					type: types.GET_ALL_BOOKING,
					payload: response.data.bookings,
				});
				dispatch({ type: types.SET_BOOKING_LOADING, payload: false });
			}
		} catch (error) {
			console.log(error);
			error.response && toast.error(error.response.data.message);
			dispatch({ type: types.SET_BOOKING_ERROR });
		}
	};
};

// BOOKING/CHECK IN
export const addBooking = (newBooking, status) => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_BOOKING_LOADING, payload: true });
			const response = await axios.post(`${HOST_API_URL}/booking/${status}`, newBooking);
			if (response.data.success) {
				dispatch({
					type: types.BOOKING_CHECK_IN,
					payload: response.data.booking,
				});
				dispatch({ type: types.SET_BOOKING_LOADING, payload: false });
				toast.success(response.data.message);
			}
		} catch (error) {
			console.log(error);
			error.response && toast.error(error.response.data.message);
		}
	};
};

// BOOKING/CHECK IN
export const addBookingInWeb = (newBooking) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${HOST_API_URL}/booking/booking-in-web`, newBooking);
			if (response.data.success) {
				dispatch({
					type: types.BOOKING_CHECK_IN,
					payload: response.data.booking,
				});
			}
		} catch (error) {
			console.log(error);
			error.response && toast.error(error.response.data.message);
		}
	};
};

// UPDATE BOOKING
export const updateBooking = (updateBooking) => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_BOOKING_LOADING, payload: true });
			const response = await axios.put(
				`${HOST_API_URL}/booking/update/${updateBooking._id}`,
				updateBooking
			);
			if (response.data.success) {
				dispatch({
					type: types.UPDATE_BOOKING,
					payload: response.data.updatedBooking,
				});
				dispatch({ type: types.SET_BOOKING_LOADING, payload: false });
				toast.success(response.data.message);
			}
		} catch (error) {
			error.response && toast.error(error.response.data.message);
		}
	};
};

//CANCELLED BOOKING
export const cancelledBooking = (bookingId) => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_BOOKING_LOADING, payload: true });
			const response = await axios.put(`${HOST_API_URL}/booking/cancelled/${bookingId}`);
			if (response.data.success) {
				dispatch({
					type: types.CANCELLED_BOOKING,
					payload: bookingId,
				});
				dispatch({ type: types.SET_BOOKING_LOADING, payload: false });
				toast.success(response.data.message);
			}
		} catch (error) {
			console.log(error);
			error.response && toast.error(error.response.data.message);
			dispatch({ type: types.SET_BOOKING_LOADING, payload: false });
		}
	};
};

//CHANGE ROOM
export const changeRoom = (bookingId, startRoom, endRoom) => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_BOOKING_LOADING, payload: true });
			const response = await axios.put(
				`${HOST_API_URL}/booking/change-room/${bookingId}/${startRoom}/${endRoom}`
			);
			if (response.data.success) {
				dispatch({
					type: types.UPDATE_BOOKING,
					payload: response.data.updatedBooking,
				});
				dispatch({ type: types.SET_BOOKING_LOADING, payload: false });
				toast.success(response.data.message);
			}
		} catch (error) {
			console.log(error);
			error.response && toast.error(error.response.data.message);
			dispatch({ type: types.SET_BOOKING_LOADING, payload: false });
		}
	};
};

//CHANGE ROOM
export const setBooking = (data) => {
	return async (dispatch) => {
		try {
			dispatch({ type: types.SET_BOOKING_LOADING, payload: true });

			if (data) {
				dispatch({
					type: types.SET_BOOKING,
					payload: data,
				});
				dispatch({ type: types.SET_BOOKING_LOADING, payload: false });
			}
		} catch (error) {
			dispatch({ type: types.SET_BOOKING_LOADING, payload: false });
		}
	};
};
