import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import moment from 'moment';

// const { watch } = useForm();

export const phoneValidation = (phone) => {
	var pattern = new RegExp(/(0[3|5|7|8|9])+([0-9]{8})\b/g);
	if (!pattern.test(phone)) {
		toast.error('Please enter valid phone number.');
		return false;
	}
	return true;
};

export const IdNumberValidation = (IDNumber) => {
	var pattern = new RegExp(/([0-9]{12})\b/g);
	if (!pattern.test(IDNumber)) {
		toast.error('Please enter valid ID number.');
		return false;
	}
	return true;
};
export const emailValidation = (email) => {
	var pattern = new RegExp(
		/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
	);
	if (!pattern.test(email)) {
		toast.error('Please enter valid email.');
		return false;
	}
	return true;
};
export const nameValidation = (name) => {
	var pattern = new RegExp(/^[A-Za-z0-9 ]+$/);
	if (!pattern.test(name)) {
		toast.error('Please enter valid name');
		return false;
	}
	return true;
};

export const textValidation = (input) => {
	var pattern = new RegExp(/^([a-zA-z0-9/\\''(),-\s]{2,255})$/);
	if (!pattern.test(input)) {
		toast.error('Please enter valid input ');
		return false;
	}
	return true;
};

export const numberValidation = (number) => {
	var pattern = new RegExp(/^[0-9]+$/);
	if (!pattern.test(number)) {
		toast.error('Please enter valid number ');
		return false;
	}
	return true;
};
export const passwordValidation = (password) => {
	var pattern = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
	if (!pattern.test(password)) {
		toast.error(
			'Password containing at least 8 characters, 1 number, 1 special character, 1 lowercase (a-z) and 1 uppercase (A-Z)'
		);
		return false;
	}
	return true;
};

export const matchPasswordValidation = (password, confirmPassword) => {
	if (_.isEqual(password, confirmPassword) === false) {
		toast.error('Password did not match');
		return false;
	}

	return true;
};

export const checkStatusRoom = (rooms, bookings) => {
	let excludeDay = [];
	let listBooking = [];

	for (const room of rooms) {
		const roomId = room._id;
		for (const booking of bookings) {
			const item = booking.rooms.find((item) => item._id === roomId);
			if (item) {
				listBooking.push(booking);
			}
		}
	}

	for (const book of listBooking) {
		const checkIn = new Date(book.checkInDate);
		const checkOut = new Date(book.checkOutDate);

		const dates = getDates(checkIn, checkOut);
		dates.forEach((item) => {
			const day = moment(item).format('YYYY-MM-DD');
			if (!excludeDay.includes(day)) {
				excludeDay.push(day);
			}
		});
	}
	return excludeDay;
};

function getDates(startDate, endDate) {
	const dates = [];
	let currentDate = startDate;
	const addDays = function (days) {
		const date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	};
	while (currentDate <= endDate) {
		dates.push(currentDate);
		currentDate = addDays.call(currentDate, 1);
	}
	return dates;
}
export const PatternEmail = new RegExp(
	/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);
export const PatternPhone = new RegExp(/^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8}?)$/);
export const PatternId = new RegExp(/([0-9]{12}?)$\b/);
export const PatternPassword = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
export const PatternName1 = new RegExp(
	/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/
);
export const PatternName2 = new RegExp(/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?)?$/);

// export const PasswordValidation = PatternPassword.test(watch('password'));
// export const IdValidation = PatternId.test(watch('id'));
// export const EmailValidation = PatternEmail.test(watch('email'));
// export const PhoneValidation = PatternPhone.test(watch('phone'));
