import * as types from '../constants/typeOfRoom';

const initialState = {
	types: [],
	type: null,
	isTypeLoading: false,
};
const typeReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.GET_ALL_TYPES:
			return {
				...state,
				types: payload,
			};
		case types.SET_TYPES_LOADING:
			return {
				...state,
				isTypeLoading: payload,
			};
		case types.SET_TYPES_ERROR:
			return {
				...state,
				types: [],
				isTypeLoading: true,
			};
		case types.ADD_TYPES:
			return {
				...state,
				types: [...state.types, payload],
			};
		case types.DELETE_TYPES:
			return {
				...state,
				types: state.types.filter((type) => type._id !== payload),
			};

		case types.UPDATE_TYPES:
			const newTypes = state.types.map((type) => (type._id === payload._id ? payload : type));
			return {
				...state,
				types: newTypes,
			};
		case types.FIND_TYPES:
			return {
				...state,
				type: payload,
			};
		default:
			return state;
	}
};

export default typeReducer;
