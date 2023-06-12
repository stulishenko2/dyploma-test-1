import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, TextField, InputAdornment} from '@mui/material';
import {CreateStoreyElement} from './pages/CreateStoreyElement/CreateStoreyElement';
import {buttonStyle, Index} from './pages/ViewShelf';
import {ShelfAmountContext, ShelfContext} from '../../contexts';
import {Notification} from '../Notification/Notification';

export enum OpenedForm {
	enterAmount = 'enter-setStoreyAmount',
	fillStorey = 'fill-storey',
}
export const ShelfPage = () => {
	const [openedForm, setOpenedForm] = useState<OpenedForm>(OpenedForm.enterAmount);
	const {storeyList} = useContext(ShelfContext);
	const {setStoreyAmount, storeyAmount, width, setWidth, depth, setDepth} = useContext(ShelfAmountContext);
	const [notificationOpen, setNotificationOpen] = useState(false);
	useEffect(() => {
		if (storeyList.length) {
			setOpenedForm(OpenedForm.fillStorey);
		}
	}, []);
	const renderForm = () => {
		switch (openedForm) {
			case OpenedForm.fillStorey:
				return <Box width={'100%'}>
					<Index/>
					<CreateStoreyElement storeyAmount={storeyAmount}/>
				</Box>;
			case OpenedForm.enterAmount:
			default:
				return <Box display={'flex'} justifyContent={'center'}>
					<Box width={'600px'} display={'flex'} flexDirection={'column'} gap={'20px'} boxShadow='14px 17px 40px 4px gray'
						 borderRadius='30px' padding="80px">
						<Box fontWeight={'bold'} fontSize={'x-large'}>
							Create Shelf
						</Box>
						<TextField
							type='number'
							label={'Enter yarus amount'}
							size='medium'
							id={'setStoreyAmount'}
							variant={'filled'}
							value={storeyAmount}
							onChange={e => {
								if (setStoreyAmount) {
									setStoreyAmount(Number(e.target.value));
								}
							}}
							error={Boolean(setStoreyAmount)}
						/>
						<TextField
							id={'width'}
							type='number'
							label={'Enter stand width'}
							size='medium'
							variant={'filled'}
							value={width}
							InputProps={{
								inputProps: {min: 10, max: 700},
								endAdornment: <InputAdornment position='end'>cm</InputAdornment>}}
							onChange={e => {
								if (setWidth) {
									setWidth(Number(e.target.value));
								}
							}}
							error={Boolean(width)}
						/>
						<TextField
							id={'depth'}
							type='number'
							label={'Enter depth'}
							size='medium'
							InputProps={{
								inputProps: {min: 20, max: 200},
								endAdornment: <InputAdornment position='end'>cm</InputAdornment>}}
							variant={'filled'}
							value={depth}
							onChange={e => {
								if (setDepth) {
									setDepth(Number(e.target.value));
								}
							}}
							error={Boolean(width)}
						/>
						<Button variant={'contained'} style={buttonStyle} onClick={() => {
							if (!storeyAmount || !width) {
								setNotificationOpen(true);
							} else {
								setOpenedForm(OpenedForm.fillStorey);
							}
						}}>Submit</Button>
					</Box>
					<Notification setOpen={setNotificationOpen} open={notificationOpen} msg={'Fill all fields'}/>
				</Box>;
		}
	};

	// Return <RectanglePlacement rectangles={[{width: 50, height: 70}, {width: 50, height: 80}, {width: 50, height: 90}]} shelfWidth={500}/>;
	return <Box width={'100%'} padding={'35px'} boxSizing={'border-box'}>
		{renderForm()}
	</Box>;
};
