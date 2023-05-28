import React from 'react';
import {useDropzone} from 'react-dropzone';
import {Box} from '@mui/material';
import {useFormikContext} from 'formik';
import {type Product} from '../../interfaces';

export type MyDropzoneProps = Record<string, unknown>;

export function MyDropzone({}: MyDropzoneProps) {
	const {setFieldValue} = useFormikContext<Product>();

	const onDrop = (files: File[]) => {
		setFieldValue('file', files[0]);
	};

	const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
		onDrop,
		maxFiles: 1,
	});

	const files = acceptedFiles.map(file => (
		<li key={file.name}>
			{file.name} - {file.size} bytes
		</li>
	));

	return (
		<Box borderRadius={'16px'} border={'1px dashed'}>
			<div {...getRootProps({className: 'dropzone'})}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			<aside>
				<h4>File</h4>
				<ul>{files}</ul>
			</aside>
		</Box>
	);
}
