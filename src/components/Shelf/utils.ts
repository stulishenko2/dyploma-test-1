import {type Storey, firestore} from '../../App';
import {collection, doc, setDoc} from 'firebase/firestore';

export const saveStorey = async (storeyData: Storey[]) => {
	// IS IT RIGHT TABLE NAME?
	const ref = doc(collection(firestore, 'sectors'));

	await setDoc(ref, storeyData[0])
		.then(() => {
			console.log('Document successfully written to Firebase!');
		})
		.catch(error => {
			console.error('Error writing document: ', error);
		});

	return null;
};
