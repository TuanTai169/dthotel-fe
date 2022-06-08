import React from 'react';
import { useState } from 'react';

const SelectNumberPeople = (props) => {
	const { name, value, adult, onChangeSelect } = props;
	const [count, setCount] = useState(value);

	const handleSelect = (e) => {
		e.preventDefault();
		if (e.target.name === 'increase') {
			setCount(count + 1);
			onChangeSelect(name, count + 1);
		} else if (e.target.name === 'decrease') {
			count > 0 ? setCount(count - 1) : setCount(0);
			onChangeSelect(name, count > 0 ? count - 1 : 0);
		}
	};

	return (
		<div className='select-number-people text-title'>
			<label htmlFor='count' className='d-block '>
				{name}
			</label>
			<div className='count d-inline-flex align-items-center p-2 mb-2'>
				<button className='btn-count' name='decrease' onClick={(e) => handleSelect(e, count)}>
					-
				</button>
				<span className='count-value'>{count}</span>
				<button
					className='btn-count'
					name='increase'
					onClick={(e) => handleSelect(e, count)}
					disabled={count >= 2 * adult}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default SelectNumberPeople;
