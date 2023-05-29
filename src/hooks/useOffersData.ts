// Import {collection, limit, orderBy, query, where} from 'firebase/firestore';
// import {useFirestoreInfiniteQueryData} from '@react-query-firebase/firestore';
// import {useFirestore} from 'reactfire';
//
// import {createConvertor, createInfiniteNextQuery, DEFAULT_LIMIT} from '../components/utils/utils';
import {type Product} from '../interfaces';
// Import firebase from 'firebase/compat';
//
export type ProductG = Product & {fullPath: string; file?: File};
//
// const convertor = createConvertor<ProductG>();
//
// const UNKNOWN_ID = '-1';
//
// export const useSectorsData = () => {
// 	const firestore = useFirestore();
// 	const dataQuery = query(
// 		collection(firestore, 'sectors').withConverter(convertor),
// 		limit(DEFAULT_LIMIT),
// 	);
//
// 	return useFirestoreInfiniteQueryData(
// 		['sectors'],
// 		dataQuery,
// 		createInfiniteNextQuery<ProductG>(dataQuery, DEFAULT_LIMIT),
// 	);
// };
