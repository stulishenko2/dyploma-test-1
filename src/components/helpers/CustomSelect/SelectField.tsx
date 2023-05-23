import React from 'react';
import Select, {components, type SingleValue} from 'react-select';
import {useField} from 'formik';
import styles from './SelectField.module.css';

export type SelectOption = {
	value: string;
	label: string;
};

type SelectFieldProps = {
	name: string;
	label: string;
	options: SelectOption[];
};

export const SelectField = ({name, label, options}: SelectFieldProps) => {
	const [field, meta, helpers] = useField(name);
	const {setValue} = helpers;

	const handleChange = (selectedOption: SingleValue<SelectOption>) => {
		setValue(selectedOption?.value);
	};

	const customStyles = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		control: (provided: any) => ({
			...provided,
			borderRadius: 0,
			border: 'none',
			borderBottom: `1px solid ${meta.touched && meta.error ? 'red' : '#ccc'}`,
			boxShadow: 'none',
		}),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		singleValue: (provided: any) => ({
			...provided,
			color: '#333',
		}),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		placeholder: (provided: any) => ({
			...provided,
			color: '#ccc',
		}),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		menu: (provided: any) => ({
			...provided,
			borderRadius: 0,
			marginTop: 0,
		}),
	};

	return (
		<div className={styles.container}>
			<label className={styles.label} htmlFor={name}>
				{label}
			</label>
			<Select
				options={options}
				value={options.find(option => option.value === field.value)}
				onChange={handleChange}
				styles={customStyles}
				components={{
					IndicatorSeparator: () => null,
					DropdownIndicator: props => (
						<components.DropdownIndicator {...props}>
							<span className={styles.arrow}>&#9660;</span>
						</components.DropdownIndicator>
					),
				}}
			/>
			{meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
		</div>
	);
};

