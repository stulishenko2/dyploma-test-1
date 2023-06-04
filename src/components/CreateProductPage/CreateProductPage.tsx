import React, {useState} from 'react';
import {Form, Formik} from 'formik';
import shortid from 'shortid';

import {SelectField} from '../helpers/CustomSelect/SelectField';
import {type Product} from '../../interfaces';
import {TextInput} from '../helpers/TextInput/TextInput';
import {NumericInput} from '../helpers/TextInput/NumericInput';
import {createProductValidationSchema} from '../../validations/validations';
import {Box, Button, IconButton, Snackbar, SnackbarContent} from '@mui/material';
import {addDoc, collection} from 'firebase/firestore';
import {firestore} from '../../App';
import {MyDropzone} from '../Dropzone/CustomDropzone';
import {useFirestoreUploadFiles} from '../../hooks/useFirestoreUploadFiles';
type InitialProduct = Omit<Product, 'id'>;

const initialValues: InitialProduct = {
	name: '',
	category: '',
	height: 0,
	width: 0,
	depth: 0,
	rank: 0,
};

export const categoryOptions = [
	{
		label: 'Grocery',
		value: 'Grocery',
	}, {
		label: 'Snacks',
		value: 'Snacks',
	}, {
		label: 'Sweets',
		value: 'sweets',
	}, {
		label: 'Drinks',
		value: 'Drinks',
	},
	{
		label: 'Milk products',
		value: 'Milk products',
	},
	{
		label: 'Chemistry',
		value: 'Chemistry',
	},
];

export const CreateProductPage = () => {
	const ref = collection(firestore, 'sectors');
	const [open, setOpen] = useState(false);
	const {upload} = useFirestoreUploadFiles();

	const createProduct = async (values: InitialProduct) => {
		console.log(values, 'values');
		if (!values.file) {
			return;
		}

		await upload(values.file).then(uploadResponse => {
			delete values.file;
			const requestProduct: Omit<Product, 'file'> & {fullPath: string} = {...values, id: shortid.generate(), fullPath: uploadResponse?.fullPath ?? ''};
			return requestProduct;
		}).then(async requestProduct => {
			await addDoc(ref, requestProduct).then(() => {
				setOpen(true);
			}).catch(e => {
				console.log(e);
			});
		}).catch(e => {
			console.log(e);
		});
	};

	return <Formik initialValues={initialValues} validationSchema={createProductValidationSchema} onSubmit={createProduct}>
		{() => (
			<Form style={{margin: '15px auto'}}>
				<Box width={800} display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={'10px'}>
					<TextInput name='name' label='Enter name' />
					<NumericInput name='rank' label='Enter rank' />
					<NumericInput name='width' label='Enter width' />
					<NumericInput name='height' label='Enter height' />
					<NumericInput name='depth' label='Enter depth' />
					<SelectField name={'category'} label={'Category'} options={categoryOptions}/>
					<MyDropzone />
					<Button variant={'outlined'} type='submit'>Submit</Button>
					<Box>
						<Snackbar
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							open={open}
							autoHideDuration={3000} // Optional: Set the duration for which the toast will be displayed
							onClose={() => {
								setOpen(false);
							}}
						>
							<SnackbarContent
								message={'Product Sector Created'}
								action={
									<IconButton color='inherit' size='small' onClick={() => {
										setOpen(false);
									}}>
										{/* <CloseIcon fontSize='small' /> */}
									</IconButton>
								}
							/>
						</Snackbar>
					</Box>
				</Box>
			</Form>
		)}
	</Formik>;
};
