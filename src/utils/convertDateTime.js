import moment from 'moment';
export const convertStringToDate = (date) => {
	const dt = new Date(date);
	const fmDate =
		('00' + dt.getDate()).slice(-2) +
		'/' +
		('00' + (dt.getMonth() + 1)).slice(-2) +
		'/' +
		dt.getFullYear() +
		' ' +
		('00' + dt.getHours()).slice(-2) +
		':' +
		('00' + dt.getMinutes()).slice(-2);
	return fmDate;
};

export const convertBirthDate = (birthDate) => {
	const dt = new Date(birthDate);
	const fmDate =
		dt.getFullYear() +
		'-' +
		('00' + (dt.getMonth() + 1)).slice(-2) +
		'-' +
		('00' + dt.getDate()).slice(-2);
	return fmDate;
};

export const getDateRange = (checkInDate, checkOutDate) => {
	const start = moment(checkInDate, 'YYYY-MM-DD');
	const end = moment(checkOutDate, 'YYYY-MM-DD');
	//Difference in number of days
	return moment.duration(end.diff(start)).asDays();
};
