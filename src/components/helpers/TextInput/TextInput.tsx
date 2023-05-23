import React from 'react';
import {Field, type FieldProps, type FormikValues, useField} from 'formik';
import {Box, TextField} from '@mui/material';

type TextInputProps = {
	name: string;
	label: string;
};

export const TextInput: React.FC<TextInputProps> = ({name, label, ...restProps}) => {
	const [field, meta] = useField(name);

	return <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
		{/* <label htmlFor='username'>{label}</label> */}
		<Field name={name}>
			{({field}: FieldProps<FormikValues>) => (
				<TextField
					type='text'
					label={label}
					size='small'
					id={name}
					variant={'filled'}
					{...field}
					error={meta.touched && Boolean(meta.error)}
				/>
			)}
		</Field>
		{meta.touched && meta.error && <Box color={'red'}>
			{meta.error}
		</Box>}
	</Box>;
};

