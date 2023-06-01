import {Box, Divider, Typography} from '@mui/material';
import React, {useContext} from 'react';
import {ShelfContext, type ShelfContextType} from '../../../../contexts';
import RemoveIcon from '@mui/icons-material/Remove';

type BasketProps = Record<string, unknown>;

export const Basket: React.FC<BasketProps> = () => {
	const {storeyList, setStoreyList} = useContext<ShelfContextType>(ShelfContext);
	const removeProductFromStorey = (productId: string, storeyId: string) => {
		if (setStoreyList) {
			setStoreyList(actual => actual.map(s => {
				if (s.id === storeyId) {
					s.productsAccepted = s.productsAccepted.filter(pa => pa.id !== productId);

					return s;
				}

				return s;
			}));
		}
	};

	return <Box display={'flex'} justifyContent={'space-between'} flexWrap={'wrap'} >
		{storeyList.map((storey, index) => <Box key={index} width={400} margin={'10px'}>
			<Typography variant={'h5'} component={'h5'}>Storey number {index + 1}</Typography>
			<Box display={'flex'} justifyContent={'space-between'}>
				<Typography>Category</Typography>
				<Typography>{storey.category}</Typography>
			</Box>
			{storey.productsAccepted?.sort((a, b) => a.rank - b.rank).map((product, index) => <Box key={index}>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography>{product.name}</Typography>
					<RemoveIcon onClick={() => {
						removeProductFromStorey(product.id, storey.id);
					}}/>
				</Box>
			</Box>)}
			<Divider variant='fullWidth' color='primary' orientation='horizontal' />
		</Box>)}
	</Box>;
};
