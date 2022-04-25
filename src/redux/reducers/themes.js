import * as types from '../constants/theme';
const themeReducer = (state = {}, action) => {
	switch (action.type) {
		case types.SET_MODE:
			return {
				...state,
				mode: action.payload,
			};
		case types.SET_COLOR:
			return {
				...state,
				color: action.payload,
			};
		default:
			return state;
	}
};

export default themeReducer;
