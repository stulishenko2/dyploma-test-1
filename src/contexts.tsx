import {createContext, type Dispatch, type SetStateAction} from 'react';
import {type Storey} from './App';

export type ShelfAmountContextType = {
	amount: number;
	width: number;
	depth: number;
	setAmount?: Dispatch<SetStateAction<number>>;
	setWidth?: Dispatch<SetStateAction<number>>;
	setDepth?: Dispatch<SetStateAction<number>>;
};
export const ShelfAmountContext = createContext<ShelfAmountContextType>({
	amount: 0,
	width: 0,
	depth: 0,
});

export type ShelfContextType = {
	storeyList: Storey[];
	setStoreyList?: Dispatch<SetStateAction<Storey[]>>;
	currentFillingStoreyIndex: number;
	setFillingStoreyIndex?: Dispatch<SetStateAction<number>>;
};
export const ShelfContext = createContext<ShelfContextType>({storeyList: [], currentFillingStoreyIndex: 0});
