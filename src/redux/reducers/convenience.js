import * as types from '../constants/convenience';

const initialState = {
	conveniences: [],
	convenience: null,
	isConvenienceLoading: false,
};
const convenienceReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.GET_ALL_CONVENIENCES:
			return {
				...state,
				conveniences: payload,
			};
		case types.SET_CONVENIENCES_LOADING:
			return {
				...state,
				isConvenienceLoading: payload,
			};
		case types.SET_CONVENIENCES_ERROR:
			return {
				...state,
				conveniences: [],
				isConvenienceLoading: true,
			};
		case types.ADD_CONVENIENCES:
			return {
				...state,
				conveniences: [...state.conveniences, payload],
			};
		case types.DELETE_CONVENIENCES:
			return {
				...state,
				conveniences: state.conveniences.filter((item) => item._id !== payload),
			};

		case types.UPDATE_CONVENIENCES:
			const newConveniences = state.conveniences.map((item) =>
				item._id === payload._id ? payload : item
			);
			return {
				...state,
				conveniences: newConveniences,
			};
		case types.FIND_CONVENIENCES:
			return {
				...state,
				convenience: payload,
			};
		default:
			return state;
	}
};

export default convenienceReducer;
