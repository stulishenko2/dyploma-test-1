import React from 'react';
import {Box, TextField, type FilledInputProps, type OutlinedInputProps, type InputProps} from '@mui/material';
import {Field, type FieldProps, type FormikValues, useField} from 'formik';

export type NumericInputProps = {
	name: string;
	label: string;
	customProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>;
};

export const NumericInput: React.FC<NumericInputProps> = ({name, label, customProps}) => {
	const [field, meta] = useField(name);
	console.log(field);
	return <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
		<Field name={name}>
			{({field}: FieldProps<FormikValues>) => (
				<TextField
					type='number'
					label={label}
					size='medium'
					id={name}
					variant={'filled'}
					{...field}
					error={meta.touched && Boolean(meta.error)}
					InputProps={customProps}
				/>
			)}
		</Field>
		{meta.touched && meta.error && <Box color={'red'}>
			{meta.error}
		</Box>}
	</Box>;
};
