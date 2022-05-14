import React from 'react';
import { useState } from 'react';

const SelectNumberPeople = (props) => {
	const { type } = props;
	const { name, number } = type;
	const [count, setCount] = useState(number);

	return (
		<div className='select-number-people text-title'>
			<label htmlFor='count' className='d-block '>
				{name}
			</label>
			<div className='count d-inline-flex align-items-center p-2 mb-2'>
				<button
					className='btn-count'
					onClick={() => (count > 0 ? setCount(count - 1) : setCount(0))}
				>
					-
				</button>
				<span className='count-value'>{count}</span>
				<button className='btn-count' onClick={() => setCount(count + 1)}>
					+
				</button>
			</div>
		</div>
	);
};

export default SelectNumberPeople;
