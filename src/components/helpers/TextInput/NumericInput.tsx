import React from 'react';
import {Box, Input, TextField} from '@mui/material';
import {Field, type FieldProps, type FormikValues, useField} from 'formik';

export type NumericInputProps = {
	name: string;
	label: string;
};

export const NumericInput: React.FC<NumericInputProps> = ({name, label}) => {
	const [field, meta] = useField(name);

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
				/>
			)}
		</Field>
		{meta.touched && meta.error && <Box color={'red'}>
			{meta.error}
		</Box>}
	</Box>;
};
