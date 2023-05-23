import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, TextField} from '@mui/material';
import {CreateStoreyElement} from './pages/CreateStoreyElement';
import {ViewShelf} from './pages/ViewShelf';
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
				return <ViewShelf>
					<CreateStoreyElement amount={amount}/>
				</ViewShelf>;
			case OpenedForm.enterAmount:
			default:
				return <Box>
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
				</Box>;
		}
	};

	// Return <RectanglePlacement rectangles={[{width: 50, height: 70}, {width: 50, height: 80}, {width: 50, height: 90}]} shelfWidth={500}/>;
	return <div>
		{renderForm()}
	</div>;
};
