import React, {useContext, useState} from 'react';
import {Form, Formik} from 'formik';
import {type Storey} from '../../../../App';
import {createStoreyValidationSchema} from '../../../../validations/validations';
import {Box, Button, Modal, Typography} from '@mui/material';
import {NumericInput} from '../../../helpers/TextInput/NumericInput';
import {SelectField} from '../../../helpers/CustomSelect/SelectField';
import {categoryOptions} from '../../../CreateProductPage/CreateProductPage';
import {ShelfContext} from '../../../../contexts';
import shortid from 'shortid';

const initialStoreyValues: Storey = {
	category: '',
	productsAccepted: [],
	id: '',
};

export type CreateStoreyElementProps = {
	amount?: number;
};

export const CreateStoreyElement: React.FC<CreateStoreyElementProps> = ({amount}) => {
	const {currentFillingStoreyIndex, setFillingStoreyIndex, setStoreyList, storeyList} = useContext(ShelfContext);
	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	const handleCreateStorey = (values: Storey) => {
		const uniqueId: string = shortid.generate();
		if (!uniqueId) {
			throw Error('uniqueId is absent');
		}

		const newStorey = {...values, id: uniqueId};
		if (setStoreyList) {
			setStoreyList(actual => [...actual, newStorey]);
			if (setFillingStoreyIndex) {
				setFillingStoreyIndex(actual => actual + 1);
			} else {
				throw Error('setFillingStoreyIndex is not provided');
			}
		}

		if (storeyList.length + 1 === amount) {
			handleClose();
		}
	};

	return <Modal open={open}>
		<Box
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				bgcolor: 'background.paper',
				boxShadow: 24,
				p: 4,
			}}
		>
			<Formik onSubmit={handleCreateStorey} validationSchema={createStoreyValidationSchema} enableReinitialize={true} initialValues={initialStoreyValues}>
				<Form style={{margin: '15px auto'}}>
					<Box display={'flex'} flexDirection={'column'} gap={'20px'}>
						<Typography variant={'h3'} component={'h3'} align={'center'}>
                      Storey number {currentFillingStoreyIndex + 1}
						</Typography>
						<Box width={800} display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={'10px'}>
							<NumericInput name='height' label='Enter height' />
							<SelectField name={'category'} label={'Category'} options={categoryOptions}/>
							<Button variant={'outlined'} type='submit'>Submit</Button>
						</Box>
					</Box>
				</Form>
			</Formik>
		</Box>
	</Modal>;
};
