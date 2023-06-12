import {Box, Button, IconButton, Snackbar, SnackbarContent} from '@mui/material';
import React, {useContext, useState} from 'react';
import {type Product} from '../../../../interfaces';
import {AddProductModal} from './AddProductModal';
import {ShelfView, sortedStoreys} from './ShelfView';
import {Basket} from './Basket';
import {saveStorey} from '../../utils';
import {ShelfContext, type ShelfContextType} from '../../../../contexts';

export const mockedProducts: Product[] = [
	{
		id: '1',
		rank: 1,
		name: 'Apple',
		category: 'Fruit',
		height: 40,
		width: 20,
		depth: 20,
	}, {
		id: '2',
		rank: 3,
		name: 'Lemon',
		category: 'Fruit',
		height: 40,
		width: 30,
		depth: 30,
	}, {
		id: '1',
		rank: 2,
		name: 'Banana',
		category: 'Fruit',
		height: 40,
		width: 500,
		depth: 500,
	},
];

type ViewShelfProps = Record<string, unknown>;
export const buttonStyle = {
	backgroundColor: '#356c98', // Set your custom color here
};
export const Index: React.FC<ViewShelfProps> = () => {
	const [open, setOpen] = useState(false);
	const [isModalOpened, setIsModalOpened] = useState(false);
	const {storeyList, setStoreyList} = useContext(ShelfContext);

	const openPopup = () => {
		setIsModalOpened(true);
	};

	const sortSectorsByRank = () => {
		if (setStoreyList) {
			setStoreyList([...sortedStoreys(storeyList)]);
		}
	};

	const handleSaveProducts = async () => {
		await saveStorey(storeyList);
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
		<Box display='flex' justifyContent='center'>
			<Box display='flex' gap='15px' justifyContent='center' width='600px' boxShadow='14px 17px 40px 4px gray'
				 borderRadius='30px' padding='20px'>

				<Button variant={'contained'} style={buttonStyle} onClick={openPopup}>Add Product</Button>
				<Button variant={'contained'} style={buttonStyle} onClick={sortSectorsByRank}>Sort Sectors By Ranks</Button>
				{storeyList.length && <Button variant={'contained'} style={buttonStyle} onClick={handleSaveProducts}>Save changes</Button>}
			</Box>
		</Box>

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
