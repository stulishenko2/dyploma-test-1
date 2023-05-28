import {Box, Button, IconButton, Snackbar, SnackbarContent} from '@mui/material';
import React, {useState} from 'react';
import {type Product} from '../../../../interfaces';
import {AddProductModal} from './AddProductModal';
import {ShelfView} from './ShelfView';
import {Basket} from './Basket';

export const mockedProducts: Product[] = [
	{
		id: '1',
		rank: 1,
		name: 'Apple',
		category: 'Fruit',
		height: 40,
		width: 20,
	}, {
		id: '2',
		rank: 3,
		name: 'Lemon',
		category: 'Fruit',
		height: 40,
		width: 30,
	}, {
		id: '1',
		rank: 2,
		name: 'Banana',
		category: 'Fruit',
		height: 40,
		width: 500,
	},
];

type ViewShelfProps = Record<string, unknown>;

export const Index: React.FC<ViewShelfProps> = ({}) => {
	const [open, setOpen] = React.useState(false);
	const [isModalOpened, setIsModalOpened] = useState(false);

	const openPopup = () => {
		setIsModalOpened(true);
	};

	return <Box width={'100%'}>
		<Box display='flex' justifyContent='space-between' gap='20px' width={'100%'} marginBottom={'20px'}>
			<Box display='flex' justifyContent='center' alignItems={'center'}>
				<ShelfView/>
			</Box>
			<Box width='350px' bgcolor={'#E1F5FE'} borderRadius={'20px'} borderColor={'#BBDEFB'} >
				<AddProductModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} setOpen={setOpen}/>
				<Basket/>
			</Box>
		</Box>
		<Button variant={'outlined'} onClick={openPopup}>Add Product</Button>
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
					message={'No appropriate shelf for such product'}
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
	</Box>;
};