import {Box} from '@mui/material';
import React, {useContext, useEffect, useMemo} from 'react';
import {ShelfAmountContext, type ShelfAmountContextType, ShelfContext, type ShelfContextType} from '../../../../contexts';
import {useFirestoreDownloadFile} from '../../../../hooks/useFirestoreDownloadFile';
import {Image} from '@mui/icons-material';
import {type ProductG} from '../../../../hooks/useOffersData';
import {type Storey} from '../../../../App';
import {Product} from '../../../../interfaces';

export const sortedStoreys = (storey: Storey[]): Storey[] => {
	const newStoreyList = storey.map(s => {
		const pa = [...s.productsAccepted];
		pa.sort((a, b) => b.rank - a.rank);
		s.productsAccepted = pa;
		return s;
	});
	return newStoreyList;
};

export const ShelfView = () => {
	const {width} = useContext<ShelfAmountContextType>(ShelfAmountContext);
	const {storeyList} = useContext<ShelfContextType>(ShelfContext);
	const standHeight: number = useMemo(() => storeyList.reduce<number>((acum, storey) => {
		acum += storey.height ?? 0;
		return acum;
	}, 0), [storeyList]);

	return <Box width={width} height={standHeight} bgcolor='lightblue'>
		{storeyList.map((s, index) => <Box display='flex' key={index} height={s.height} boxSizing='border-box' border={'1px solid black'}>
			{s.productsAccepted.map((s, index) => <SectorView key={index} sector={s} index={index}/>)}
		</Box>,
		)}
	</Box>;
};

export type SectorViewProps = {
	sector: ProductG;
	index: number;
};

export const SectorView: React.FC<SectorViewProps> = ({sector, index}) => {
	const {downloadFile, fileUrl} = useFirestoreDownloadFile();
	useEffect(() => {
		const getImageFromFirestore = async () => {
			await downloadFile(sector.fullPath);
		};

		getImageFromFirestore().catch(e => {
			console.log(e);
		});
	}, []);

	return <Box width={sector.width} height={'100%'} boxSizing='border-box'>
		<img src={fileUrl} width={'100%'} height={'100%'}/>
	</Box>;
};
