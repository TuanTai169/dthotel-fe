import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const PayPal = (props) => {
	const paypal = useRef();
	const { data, onSuccess } = props;
	const dispatch = useDispatch();

	const value = parseInt(data.deposit);

	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions, err) => {
					return actions.order.create({
						intent: 'CAPTURE',
						purchase_units: [
							{
								description: 'Payment',
								amount: {
									currency_code: 'USD',
									value: value,
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					await actions.order.capture();
					onSuccess();
				},
				onError: (err) => {
					console.log(err);
					toast.error(err);
				},
			})
			.render(paypal.current);
	}, [onSuccess, dispatch, data, value]);

	return (
		<div>
			<div ref={paypal}></div>
		</div>
	);
};

export default PayPal;
