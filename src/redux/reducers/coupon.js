import * as types from '../constants/coupon';

const initialState = {
	coupons: [],
	coupon: null,
	isCouponLoading: false,
};
const couponReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.GET_ALL_COUPON:
			return {
				...state,
				coupons: payload,
			};
		case types.SET_COUPON_LOADING:
			return {
				...state,
				isCouponLoading: payload,
			};
		case types.SET_COUPON_ERROR:
			return {
				...state,
				conveniences: [],
				isCouponLoading: true,
			};
		default:
			return state;
	}
};

export default couponReducer;
