import {createContext, type Dispatch, type SetStateAction} from 'react';
import {type Storey} from './App';

export type ShelfAmountContextType = {
	amount: number;
	setAmount?: Dispatch<SetStateAction<number>>;
};
export const shelfAmountContext = createContext<ShelfAmountContextType>({
	amount: 0,
});
