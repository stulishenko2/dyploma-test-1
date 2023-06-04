import * as Yup from 'yup';

export const createProductValidationSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	category: Yup.string().required('Category is required'),
	rank: Yup.number().required('Rank is required'),
});

export const createStoreyValidationSchema = Yup.object({
	category: Yup.string().required('Category is required'),
	height: Yup.number().required('Height is required'),
});
