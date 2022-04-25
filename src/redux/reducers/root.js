import themeReducer from './themes';
import serviceReducer from './service';
import roomReducer from './room';
import authReducer from './auth';
import bookingReducer from './booking';
import customerReducer from './customer';
import userReducer from './user';
import receiptReducer from './receipt';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	themeReducer,
	serviceReducer,
	roomReducer,
	bookingReducer,
	customerReducer,
	userReducer,
	receiptReducer,
	auth: authReducer,
});

export default rootReducer;
