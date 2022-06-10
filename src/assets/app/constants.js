module.exports = {
	appConstant: {
		dbConnect:
			'mongodb+srv://dthotel:dthotel@dthotel.dohjt.mongodb.net/kltn-dthotel?retryWrites=true&w=majority',
		accessTokenSecret: 'dthotel',
		jwtExpiresIn: '14d',
		baseUrl: 'api',
		nameApp: 'DTHotel',
	},
	regex: {
		email:
			/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/,
		phoneNumber: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
		password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
	},

	RoomStatus: Object.freeze({
		Ready: {
			name: 'Ready',
			value: 0,
			backgroundColor: '#fff',
			variant: 'outline-success',
			className: 'bx bxs-check-circle',
		},
		Occupied: {
			name: 'Occupied',
			value: 1,
			backgroundColor: 'tomato',
			variant: 'outline-primary',
			className: 'bx bxs-user-check',
		},
		Cleaning: {
			name: 'Cleaning',
			value: 2,
			backgroundColor: 'yellow',
			variant: 'outline-danger',
			className: 'bx bxs-magic-wand',
		},
		Fixing: {
			name: 'Fixing',
			value: 3,
			backgroundColor: '#ccc',
			variant: 'outline-secondary',
			className: 'bx bxs-edit',
		},
		Booking: {
			name: 'Booking',
			value: 4,
			backgroundColor: '#fff',
			variant: 'outline-success',
			className: '',
		},
	}),

	BookingStatus: Object.freeze({
		Booking: { name: 'Booking', value: 0, color: 'blue' },
		checkIn: { name: 'Check In', value: 1, color: 'green' },
		checkout: { name: 'Checkout', value: 2, color: 'red' },
		cancelled: { name: 'Cancelled', value: 3, color: '#ccc' },
	}),

	userRoles: Object.freeze({
		Staff: { name: 'Staff', value: 0 },
		Employee: { name: 'Employee', value: 1 },
		Manager: { name: 'Manager', value: 2 },
		Admin: { name: 'Admin', value: 3 },
		SuperAdmin: { name: 'Super Admin', value: 4 },
	}),

	imageDefault: {
		src: 'https://drive.google.com/thumbnail?id=1wssym_RCzfAETooYk690s0mlcAv_CVhw',
		alt: 'default-img',
	},
	imagePayPal: {
		src: 'https://drive.google.com/thumbnail?id=1Szl4kHiJKfAeWNe8TLVOqCGMi3BK42AS',
		alt: 'paypal-img',
	},
	imageVNPay: {
		src: 'https://drive.google.com/thumbnail?id=1U_g_-i0t-iOjnIZ8UIXKvFxI3rAcOOBK',
		alt: 'vnpay-img',
	},

	capacityDefault: {
		adult: 1,
		child: 0,
	},
	roomDefault: {
		roomNumber: '',
		floor: 1,
		name: '',
		price: 0,
		capacity: {
			adult: 1,
			child: 0,
		},
		roomType: '',
		detail: {
			bedRoom: 0,
			bathRoom: 0,
			livingRoom: 0,
			kitchen: 0,
			desc: '',
		},
		bed: {
			single: 0,
			double: 0,
		},
		convenience: ['', ''],
	},
	customerDefault: {
		name: '',
		email: '',
		phone: '',
		address: '',
		idNumber: '',
		numberOfPeople: {
			adult: 1,
			child: 0,
		},
	},
	userDefault: {
		name: '',
		email: '',
		password: '',
		phone: '',
		address: '',
		image: {
			src: 'https://drive.google.com/thumbnail?id=1wssym_RCzfAETooYk690s0mlcAv_CVhw',
			alt: 'default-img',
		},
		role: '',
	},
};
