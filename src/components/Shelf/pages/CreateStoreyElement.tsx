import React, {useContext} from 'react';
import {Form, Formik, type FormikHelpers} from 'formik';
import {type Storey} from '../../App';
import {createStoreyValidationSchema} from '../../validations/validations';
import {Box, Button, Typography} from '@mui/material';
import {NumericInput} from '../helpers/TextInput/NumericInput';
import {SelectField} from '../helpers/CustomSelect/SelectField';
import {categoryOptions} from '../CreateProductPage/CreateProductPage';
import {ShelfContext} from '../../contexts';

const initialStoreyValues: Storey = {
	category: '',
	index: 0,
	numberOfAcceptableProducts: 0,
	productsAccepted: [],
};

export type CreateStoreyElementProps = {
	amount?: number;
};

export const CreateStoreyElement: React.FC<CreateStoreyElementProps> = ({amount}) => {
	const {currentFillingStoreyIndex, setFillingStoreyIndex, setShelfState, storeyList} = useContext(ShelfContext);

	const handleCreateStorey = (values: Storey, {resetForm}: FormikHelpers<Storey>) => {
		if (setShelfState) {
			setShelfState(actual => [...actual, values]);
			resetForm();
			if (setFillingStoreyIndex) {
				setFillingStoreyIndex(actual => actual + 1);
			} else {
				throw Error('setFillingStoreyIndex is not provided');
			}
		}
	};

	if (storeyList.length === amount) {
		return <Box>
               All completed
		</Box>;
	}

	return <Formik onSubmit={handleCreateStorey} validationSchema={createStoreyValidationSchema} enableReinitialize={true} initialValues={initialStoreyValues}>
		{() => (
			<Form style={{margin: '15px auto'}}>
				<Typography variant={'h3'} component={'h3'}>
                      Storey number {currentFillingStoreyIndex + 1}
				</Typography>
				<Box width={800} display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={'10px'}>
					<NumericInput name='numberOfAcceptableProducts' label='Enter number of acceptable products' />
					<SelectField name={'category'} label={'Category'} options={categoryOptions}/>
					<Button variant={'outlined'} type='submit'>Submit</Button>
				</Box>
			</Form>
		)
		}
	</Formik>;
};
