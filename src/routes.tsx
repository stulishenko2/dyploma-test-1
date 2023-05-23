import React from 'react';
import {ShelfPage} from './components/Shelf/ShelfPage';
import {CreateProductPage} from './components/CreateProductPage/CreateProductPage';
import {MainLayout} from './components/MainLayout/MainLayout';

export const mainRoutes = {
	path: '/',
	element: <MainLayout/>,
	children: [
		{path: '*', element: <div></div>},
		{
			path: '/shelf',
			element: <ShelfPage />,
		},
		{
			path: '/create-product',
			element: <CreateProductPage />,
		},
		{path: '404', element: <>Not found</>},
	],
};
