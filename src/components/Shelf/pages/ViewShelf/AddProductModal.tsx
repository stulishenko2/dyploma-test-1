import {Box, Button, MenuItem, Modal, TextField, Typography} from '@mui/material';
import React, {useContext, useState} from 'react';
import {type Product} from '../../../../interfaces';
import {type Storey} from '../../../../App';
import {
	ShelfAmountContext,
	type ShelfAmountContextType,
	ShelfContext,
	type ShelfContextType,
} from '../../../../contexts';
import firebase from 'firebase/compat';
import {useProducts} from '../../../../hooks/useProducts';
import {type ProductG} from '../../../../hooks/useOffersData';

type AddProductModalProps = {
	isModalOpened: boolean;
	setIsModalOpened: (val: boolean) => void;
	setOpen: (val: boolean) => void;
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

export const AddProductModal: React.FC<AddProductModalProps> = ({setIsModalOpened, isModalOpened, setOpen}) => {
	const [product, setProduct] = useState<ProductG | undefined>();
	const {storeyList, setStoreyList} = useContext<ShelfContextType>(ShelfContext);
	const {width} = useContext<ShelfAmountContextType>(ShelfAmountContext);

	const {productsList} = useProducts();

	const handleProductSelect = (product: ProductG) => {
		setProduct(product);
	};

	const placeProduct = () => {
		const appropriateStoreys = storeyList.filter(s => s.category === product?.category).filter(s => {
			const acceptedWidth = s.productsAccepted.reduce((productsAcum, productAccepted) => {
				productsAcum += productAccepted.width;
				return productsAcum;
			}, 0) || 0;
			return width >= acceptedWidth + (product?.width ?? 0);
		}).filter(s => {
			if (s.height) {
				return 	s.height >= (product?.height ?? 0);
			}

			return false;
		});
		if (!appropriateStoreys.length) {
			setOpen(true);
			return;
		}

		const appropriateStorey: Storey | undefined = appropriateStoreys.reduce<Storey | undefined>((acum: Storey | undefined, s) => {
			if (!acum) {
				acum = s;
			} else if ((acum.height ?? 0) > (s?.height ?? 0)) {
				acum = s;
			}

			return acum;
		}, undefined);
		console.log(appropriateStorey, 'appropriateStorey');

		const newStoreyList = storeyList.map((_val, index) => {
			if (_val.id === appropriateStorey?.id) {
				appropriateStorey.productsAccepted = product ? [...appropriateStorey.productsAccepted, product] : [...appropriateStorey.productsAccepted];
				return appropriateStorey;
			}

			return _val;
		});

		if (setStoreyList) {
			setStoreyList(newStoreyList);
		}

		setIsModalOpened(false);
	};

	return <Modal
		open={isModalOpened}
		onClose={() => {
			setIsModalOpened(false);
		}}
		aria-labelledby='modal-modal-title'
		aria-describedby='modal-modal-description'
	>
		<Box sx={style} display={'flex'} flexDirection={'column'} gap={'20px'}>
			<Typography id='modal-modal-title' variant='h6' component='h2' align={'center'}>
				Add Product
			</Typography>
			<Box sx={{mt: 2}}>
				<TextField
					select
					label='Select Product'
					helperText='Please select product'
				>
					{productsList.map(option => (
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
	</Modal>;
};
