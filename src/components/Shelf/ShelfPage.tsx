import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, TextField} from '@mui/material';
import {CreateStoreyElement} from './pages/CreateStoreyElement/CreateStoreyElement';
import {Index} from './pages/ViewShelf';
import {ShelfAmountContext, ShelfContext} from '../../contexts';

export enum OpenedForm {
	enterAmount = 'enter-amount',
	fillStorey = 'fill-storey',
}
export const ShelfPage = () => {
	const [openedForm, setOpenedForm] = useState<OpenedForm>(OpenedForm.enterAmount);
	const {storeyList} = useContext(ShelfContext);
	const {amount, setAmount, width, setWidth} = useContext(ShelfAmountContext);

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
					<CreateStoreyElement amount={amount}/>
				</Box>;
			case OpenedForm.enterAmount:
			default:
				return <Box display={'flex'} justifyContent={'center'}>
					<Box width={'600px'} display={'flex'} flexDirection={'column'} gap={'20px'}>
						<Box fontWeight={"bold"} fontSize={"x-large"}>
							Create Shelf
						</Box>
						<TextField
							type='number'
							label={'Enter yarus amount'}
							size='medium'
							id={'amount'}
							variant={'filled'}
							value={amount}
							onChange={e => {
								if (setAmount) {
									setAmount(Number(e.target.value));
								}
							}}
							error={Boolean(amount)}
						/>
						<TextField
							type='number'
							label={'Enter stand width'}
							size='medium'
							id={'width'}
							variant={'filled'}
							value={width}
							onChange={e => {
								if (setWidth) {
									setWidth(Number(e.target.value));
								}
							}}
							error={Boolean(width)}
						/>
						<Button onClick={() => {
							setOpenedForm(OpenedForm.fillStorey);
						}}>Submit</Button>
					</Box>
				</Box>;
		}
	};

	// Return <RectanglePlacement rectangles={[{width: 50, height: 70}, {width: 50, height: 80}, {width: 50, height: 90}]} shelfWidth={500}/>;
	return <Box width={'100%'} padding={'35px'} boxSizing={'border-box'}>
		{renderForm()}
	</Box>;
};
