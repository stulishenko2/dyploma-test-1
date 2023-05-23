import {createContext, type Dispatch, type SetStateAction} from 'react';
import {type Storey} from './App';

export type ShelfAmountContextType = {
	amount: number;
	setAmount?: Dispatch<SetStateAction<number>>;
	width: number;
	setWidth?: Dispatch<SetStateAction<number>>;
};
export const ShelfAmountContext = createContext<ShelfAmountContextType>({
	amount: 0,
	width: 0,
});

export type ShelfContextType = {
	storeyList: Storey[];
	setStoreyList?: Dispatch<SetStateAction<Storey[]>>;
	currentFillingStoreyIndex: number;
	setFillingStoreyIndex?: Dispatch<SetStateAction<number>>;
};
export const ShelfContext = createContext<ShelfContextType>({storeyList: [], currentFillingStoreyIndex: 0});
