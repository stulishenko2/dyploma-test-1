import {Box, Button, MenuItem, Modal, TextField, Typography} from '@mui/material';
import React, {type ReactNode, useContext, useState} from 'react';
import {ShelfContext, type ShelfContextType} from '../../contexts';
import {type Product} from '../../interfaces';

export const mockedProducts: Product[] = [
	{
		id: '1',
		rank: 1,
		name: 'Apple',
		category: 'Fruit',
	}, {
		id: '2',
		rank: 3,
		name: 'Lemon',
		category: 'Fruit',
	}, {
		id: '1',
		rank: 2,
		name: 'Banana',
		category: 'Fruit',
	},
];

type ViewShelfProps = {
	children: ReactNode;
};
const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};
export const ViewShelf: React.FC<ViewShelfProps> = ({children}) => {
	const {storeyList} = useContext<ShelfContextType>(ShelfContext);
	const [isModalOpened, setIsModalOpened] = useState(false);
	const openPopup = () => {
		setIsModalOpened(true);
	};

	const handleProductSelect = (product: Product) => {
		setIsModalOpened(false);
	};

	return <Box>
		{children}
		<Box display={'flex'} justifyContent={'space-between'} flexWrap={'wrap'}>
			{storeyList.map((storey, index) => <Box key={index} width={400}>
				<Typography variant={'h5'} component={'h5'}>Storey number {index + 1}</Typography>
				{storey.productsAccepted?.sort((a, b) => a.rank - b.rank).map((product, index) => <Box key={index}>
					{product.name}
				</Box>)}
			</Box>)}
		</Box>
		<Button variant={'outlined'} onClick={openPopup}>Add Product</Button>
		<Modal
			open={isModalOpened}
			onClose={() => {
				setIsModalOpened(false);
			}}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					Add Product
				</Typography>
				<Box sx={{mt: 2}}>
					<TextField
						select
						label='Select Product'
						helperText='Please select product'
					>
						{mockedProducts.map(option => (
							<MenuItem key={option.name} value={option.name} onClick={() => {
								handleProductSelect(option);
							}}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
				</Box>
			</Box>
		</Modal>
	</Box>;
};
