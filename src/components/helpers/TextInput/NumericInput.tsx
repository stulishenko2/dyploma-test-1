import React from 'react';
import {useField} from 'formik';
import {Input} from '@mui/material';

type TextInputProps = {
	name: string;
	label: string;
};

export const TextInput: React.FC<TextInputProps> = ({name, label, ...restProps}) => {
	const [field, meta] = useField(name);

	return (<div>
		<label htmlFor='quantity'>Quantity:</label>
		<Input
			type='number'
			id='quantity'
			name='quantity'
			inputProps={{min: '1', max: '10'}}
			value={quantity}
			onChange={handleQuantityChange}
			placeholder='Enter quantity'
			disabled={false}
		/>
	</div>
	);
};

