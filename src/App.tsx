import React, {useEffect, useState} from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {mainRoutes} from './routes';
import {ShelfAmountContext, ShelfContext} from './contexts';
import {type Product} from './interfaces';

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {FirebaseAppProvider} from 'reactfire';
import {useProducts} from './hooks/useProducts';
import {ProductG} from "./hooks/useOffersData";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBCXm3HSM0d1BcGjWbb_bUrVrTRUt37-4c',
	authDomain: 'stylik-9ac0e.firebaseapp.com',
	projectId: 'stylik-9ac0e',
	storageBucket: 'stylik-9ac0e.appspot.com',
	messagingSenderId: '301906279541',
	appId: '1:301906279541:web:276fb1671e34abcb920c3c',
	measurementId: 'G-DXPJX8Y7D2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export type Storey = {
	category: string;
	height?: number;
	productsAccepted: ProductG[];
	id: string;
};

function App() {
	const [storeyList, setStoreyList] = useState<Storey[]>([]);
	const [amount, setAmount] = useState<number>(0);
	const [width, setWidth] = useState<number>(0);
	const [fillingStoreyIndex, setFillingStoreyIndex] = useState<number>(0);
	const router = createBrowserRouter([
		mainRoutes,
	]);
	useProducts();

	return (
		<FirebaseAppProvider firebaseApp={app}>
			<ShelfContext.Provider value={{storeyList, setStoreyList, currentFillingStoreyIndex: fillingStoreyIndex, setFillingStoreyIndex}}>
				<ShelfAmountContext.Provider value={{amount, setAmount, width, setWidth}}>
					<div className='App'>
						<RouterProvider router={router}/>
					</div>
				</ShelfAmountContext.Provider>
			</ShelfContext.Provider>
		</FirebaseAppProvider>
	);
}

export default App;
