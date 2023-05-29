import {type ProductG} from './useOffersData';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {firestore} from '../App';
import {useEffect, useState} from 'react';

export const useProducts = () => {
	const [productsList, setProductsList] = useState<ProductG[]>([]);
	const fetchProducts = async () => {
		const productsRef = collection(firestore, 'sectors');

		// Adjust the query to match your specific requirements
		const q = query(productsRef);

		const querySnapshot = await getDocs(q);

		// Convert the documents to the expected type (ProductG)
		const products: ProductG[] = querySnapshot.docs.map(doc => doc.data() as ProductG);
		console.log(products, 'products');
		setProductsList(products);
	};

	useEffect(() => {
		void fetchProducts().then(r => {
			console.log('fetched Products');
		});
	}, []);
	return {productsList, fetchProducts};
};
