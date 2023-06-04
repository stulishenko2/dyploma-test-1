import {Box, IconButton, Snackbar, SnackbarContent} from '@mui/material';
import React, {useState} from 'react';
import {bool} from 'yup';

export const Notification = ({msg, setOpen, open}: {msg: string; open: boolean; setOpen: (val: boolean) => void}) => {
	return <Box>
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
				message={msg}
				action={
					<IconButton color='inherit' size='small' onClick={() => {
						setOpen(false);
					}}>
						{/* <CloseIcon fontSize='small' /> */}
					</IconButton>
				}
			/>
		</Snackbar>
	</Box>;
};
