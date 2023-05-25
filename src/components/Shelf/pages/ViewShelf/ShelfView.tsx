import {Box} from '@mui/material';
import React, {useContext, useMemo} from 'react';
import {ShelfAmountContext, type ShelfAmountContextType, ShelfContext, type ShelfContextType} from '../../../../contexts';

export const ShelfView = () => {
	const {width} = useContext<ShelfAmountContextType>(ShelfAmountContext);
	const {storeyList} = useContext<ShelfContextType>(ShelfContext);

	const standHeight: number = useMemo(() => storeyList.reduce<number>((acum, storey) => {
		acum += storey.height ?? 0;
		return acum;
	}, 0), [storeyList]);

	return <Box width={width} height={standHeight} bgcolor='lightblue'>
		{storeyList.map((s, index) => <Box display='flex' key={index} height={s.height} boxSizing='border-box' border={'1px solid black'}>
			{s.productsAccepted.map(p => <Box key={p.name} width={p.width} height={'100%'} border={'1px solid darkblue'} boxSizing='border-box' bgcolor={'darkblue'}>
			</Box>)}
		</Box>)}
	</Box>;
};
