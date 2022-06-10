import themeReducer from './themes';
import serviceReducer from './service';
import roomReducer from './room';
import authReducer from './auth';
import bookingReducer from './booking';
import customerReducer from './customer';
import userReducer from './user';
import receiptReducer from './receipt';
import typeReducer from './typeOfRoom';
import convenienceReducer from './convenience';
import couponReducer from './coupon';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	themeReducer,
	serviceReducer,
	roomReducer,
	bookingReducer,
	customerReducer,
	userReducer,
	receiptReducer,
	types: typeReducer,
	convenience: convenienceReducer,
	couponReducer,
	auth: authReducer,
});

export default rootReducer;
