import React from 'react';
import {Form, Formik, type FormikValues} from 'formik';
import {SelectField} from '../helpers/CustomSelect/SelectField';
import {type Product} from '../../interfaces';
import {TextInput} from '../helpers/TextInput/TextInput';
import {NumericInput} from '../helpers/TextInput/NumericInput';
import {createProductValidationSchema} from '../../validations/validations';
import {Box, Button} from '@mui/material';

const initialValues: Product = {
	name: '',
	category: '',
	id: '',
	height: 0,
	width: 0,
	rank: 0,
};
export const categoryOptions = [
	{
		label: 'Fruit',
		value: 'Fruit',
	}, {
		label: 'Vegetable',
		value: 'Vegetable',
	}, {
		label: 'Nuts',
		value: 'Nuts',
	}, {
		label: 'Drinks',
		value: 'Drinks',
	},
];

export const CreateProductPage = () => {
	const createProduct = (values: FormikValues) => {
		console.log(values, 'values');
	};

	return <Formik<Product> initialValues={initialValues} validationSchema={createProductValidationSchema} onSubmit={createProduct}>
		{() => (
			<Form style={{margin: '15px auto'}}>
				<Box width={800} display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={'10px'}>
					<TextInput name='name' label='Enter name' />
					<NumericInput name='rank' label='Enter rank' />
					<NumericInput name='width' label='Enter width' />
					<NumericInput name='height' label='Enter height' />
					<NumericInput name='id' label='Enter code' />
					<SelectField name={'category'} label={'Category'} options={categoryOptions}/>
					<Button variant={'outlined'} type='submit'>Submit</Button>
				</Box>
			</Form>
		)}
	</Formik>;
};
