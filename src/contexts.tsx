import {createContext, type Dispatch, type SetStateAction} from 'react';
import {type Storey} from './App';

export type ShelfAmountContextType = {
	storeyAmount: number;
	width: number;
	depth: number;
	setStoreyAmount?: Dispatch<SetStateAction<number>>;
	setWidth?: Dispatch<SetStateAction<number>>;
	setDepth?: Dispatch<SetStateAction<number>>;
};
export const ShelfAmountContext = createContext<ShelfAmountContextType>({
	storeyAmount: 0,
	width: 0,
	depth: 0,
});

export type UploadedFilesContextType = {
	uploadedFiles: Record<string, string>;
	setUploadedFiles?: (val: Dispatch<SetStateAction<Record<string, string>>>) => void;
};
export const UploadedFilesContext = createContext<UploadedFilesContextType>({
	uploadedFiles: {},
});

export type ShelfContextType = {
	storeyList: Storey[];
	setStoreyList?: Dispatch<SetStateAction<Storey[]>>;
	currentFillingStoreyIndex: number;
	setFillingStoreyIndex?: Dispatch<SetStateAction<number>>;
};
export const ShelfContext = createContext<ShelfContextType>({storeyList: [], currentFillingStoreyIndex: 0});
