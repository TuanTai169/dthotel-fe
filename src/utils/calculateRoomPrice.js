import moment from 'moment';

export const totalRoomCharge = (rooms, checkInDate, checkOutDate, listRoom) => {
	let total = 0;
	let sumRoomsPrice = 0;

	const hourDiff = getNumberOfHour(checkInDate, checkOutDate);

	if (Array.isArray(rooms) && rooms.length > 0) {
		rooms.forEach((item) => {
			const room = listRoom.find((x) => x._id === item.room);
			if (room) {
				sumRoomsPrice += room.price;
			}
		});
	}

	if (hourDiff < 24) {
		total = priceInHour(hourDiff, sumRoomsPrice);
	} else {
		const early = earlyCheckIn(checkInDate, sumRoomsPrice);
		const late = lateCheckOut(checkOutDate, sumRoomsPrice);

		total = ((hourDiff - early.hour - late.hour) * sumRoomsPrice) / 24 + early.price + late.price;
	}

	return Number(parseFloat(total).toFixed(2));
};

export const totalServiceCharge = (services, products, listServices) => {
	let total = 0;
	if (Array.isArray(services) && services.length > 0) {
		services.forEach((s) => {
			const item = listServices.find((x) => x._id === s.service);
			if (item) {
				total += item.price * s.amount;
			}
		});
	}
	if (Array.isArray(products) && products.length > 0) {
		products.forEach((s) => {
			const item = listServices.find((x) => x._id === s.service);
			if (item) {
				total += item.price * s.amount;
			}
		});
	}

	return Number(parseFloat(total).toFixed(2));
};

const getNumberOfHour = (checkInDate, checkOutDate) => {
	const start = moment(checkInDate, 'YYYY-MM-DD HH:mm');
	const end = moment(checkOutDate, 'YYYY-MM-DD HH:mm');
	//Difference in number of days
	const hourDiff = moment.duration(end.diff(start)).asHours();
	return hourDiff;
};

export const convertCurrency = (price, currency) => {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(price);
};

const earlyCheckIn = (checkInDate, roomCharge) => {
	let early = {};

	const start = moment(checkInDate, 'YYYY-MM-DD HH:mm');
	const end = moment(checkInDate, 'YYYY-MM-DD').set({
		hours: 14,
		minutes: 0,
	});

	//Difference in number of days
	const diff = moment.duration(end.diff(start)).asHours();
	early['hour'] = diff;

	if (diff <= 4 && diff > 0) {
		early['price'] = 0.3 * roomCharge;
	} else if (diff <= 7 && diff > 4) {
		early['price'] = 0.5 * roomCharge;
	} else if (diff > 7) {
		early['price'] = 1 * roomCharge;
	} else {
		early['price'] = 0 * roomCharge;
	}
	return early;
};

const lateCheckOut = (checkOutDate, roomCharge) => {
	let late = {};

	const start = moment(checkOutDate, 'YYYY-MM-DD').set({
		hours: 12,
		minutes: 0,
	});
	const end = moment(checkOutDate, 'YYYY-MM-DD HH:mm');

	//Difference in number of days
	const diff = moment.duration(end.diff(start)).asHours();
	late['hour'] = diff;

	if (diff <= 3 && diff > 0) {
		late['price'] = 0.3 * roomCharge;
	} else if (diff <= 6 && diff > 3) {
		late['price'] = 0.5 * roomCharge;
	} else if (diff > 6) {
		late['price'] = 1 * roomCharge;
	} else {
		late['price'] = 0 * roomCharge;
	}
	return late;
};
const priceInHour = (hourDiff, roomCharge) => {
	let price = 0;
	if (hourDiff < 2) {
		price = 0.6 * roomCharge;
	} else {
		price = 0.6 * roomCharge + (0.4 * roomCharge * (hourDiff - 2)) / 22;
	}
	return price;
};
