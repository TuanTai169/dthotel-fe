import * as types from '../constants/booking';

const initialState = {
	bookings: [],
	booking: null,
	currentBooking: null,
	isBookingLoading: false,
};
const bookingReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.GET_ALL_BOOKING:
			return {
				...state,
				bookings: payload,
			};
		case types.SET_BOOKING_LOADING:
			return {
				...state,
				isBookingLoading: payload,
			};
		case types.SET_BOOKING_ERROR:
			return {
				...state,
				bookings: [],
				isBookingLoading: true,
			};
		case types.BOOKING_CHECK_IN:
			return {
				...state,
				bookings: [...state.bookings, payload],
				booking: payload,
			};
		case types.UPDATE_BOOKING:
			const newBookings = state.bookings.map((booking) =>
				booking._id === payload._id ? payload : booking
			);
			return {
				...state,
				bookings: newBookings,
			};
		case types.CANCELLED_BOOKING:
			return {
				...state,
				bookings: state.bookings.filter((booking) => booking._id !== payload),
			};
		case types.SET_BOOKING:
			return {
				...state,
				currentBooking: payload,
			};
		default:
			return state;
	}
};

export default bookingReducer;
