import React, {useState} from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {mainRoutes} from './routes';
import {ShelfAmountContext, ShelfContext} from './contexts';
import {type Product} from './interfaces';

export type Storey = {
	category: string;
	index: number;
	height: number;
	productsAccepted: Product[];
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
	return (
		<ShelfContext.Provider value={{storeyList, setStoreyList, currentFillingStoreyIndex: fillingStoreyIndex, setFillingStoreyIndex}}>
			<ShelfAmountContext.Provider value={{amount, setAmount, width, setWidth}}>
				<div className='App'>
					<RouterProvider router={router}/>
				</div>
			</ShelfAmountContext.Provider>
		</ShelfContext.Provider>

	);
}

export default App;
