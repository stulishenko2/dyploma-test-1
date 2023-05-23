import {
	Box,
	Button,
	IconButton,
	MenuItem,
	Modal,
	Snackbar,
	SnackbarContent,
	TextField,
	Typography,
} from '@mui/material';
import React, {type ReactNode, useContext, useMemo, useState} from 'react';
import {ShelfAmountContext, type ShelfAmountContextType, ShelfContext, type ShelfContextType} from '../../../contexts';
import {type Product} from '../../../interfaces';
import {type Storey} from '../../../App';
// Import {Close as CloseIcon} from '@material-ui/icons';

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
	const {storeyList, setStoreyList} = useContext<ShelfContextType>(ShelfContext);
	const {width} = useContext<ShelfAmountContextType>(ShelfAmountContext);
	const [product, setProduct] = useState<Product | undefined>();
	const [isModalOpened, setIsModalOpened] = useState(false);
	const [open, setOpen] = React.useState(false);
	const standHeight: number = useMemo(() => storeyList.reduce<number>((acum, storey) => {
		acum += storey.height;
		return acum;
	}, 0), [storeyList]);

	const openPopup = () => {
		setIsModalOpened(true);
	};

	const handleProductSelect = (product: Product) => {
		setProduct(product);
	};

	const placeProduct = () => {
		const appropriateStoreys = storeyList.filter(s => s.category === product?.category).filter(s => {
			const acceptedWidth = s.productsAccepted.reduce((productsAcum, productAccepted) => {
				productsAcum += productAccepted.width;
				return productsAcum;
			}, 0) || 0;
			return width >= acceptedWidth + (product?.width ?? 0);
		}).filter(s => s.height >= (product?.height ?? 0));
		if (!appropriateStoreys.length) {
			setOpen(true);
			return;
		}

		const appropriateStorey: Storey | undefined = appropriateStoreys.reduce<Storey | undefined>((acum: Storey | undefined, s) => {
			if (!acum) {
				acum = s;
			} else if (acum.height > s.height) {
				acum = s;
			}

			return acum;
		}, undefined);

		const newStoreyList = storeyList.map((_val, index) => {
			if (_val.id === appropriateStorey?.id) {
				appropriateStorey.productsAccepted = product ? [...appropriateStorey.productsAccepted, product] : [...appropriateStorey.productsAccepted];
				return appropriateStorey;
			}

			return _val;
		});
		console.log(appropriateStorey, 'appropriateStorey');
		console.log(newStoreyList, 'newStoreyList');

		if (setStoreyList) {
			setStoreyList(newStoreyList);
		}

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
		<Box width={width} height={standHeight} bgcolor='lightblue'>
			{storeyList.map(s => <Box display='flex' key={s.index} height={s.height} boxSizing='border-box' border={'1px solid black'}>
				{s.productsAccepted.map(p => <Box key={p.name} width={p.width} height={p.height} border={'1px solid darkblue'} boxSizing='border-box' bgcolor={'darkblue'}>
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
					<Button onClick={placeProduct}>Place Product</Button>
				</Box>
			</Box>
		</Modal>
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
	</Box>;
};
