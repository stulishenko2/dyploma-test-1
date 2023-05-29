import {useState, useEffect, useRef, useCallback} from 'react';
import {getDownloadURL, ref} from 'firebase/storage';
import {storage} from "../App";


export const useFirestoreDownloadFile = (fullPath = '') => {
	const [fileUrl, setFileUrl] = useState<string>();
	const [isFileLoading, setIsFileLoading] = useState(false);
	const isMounted = useRef(false);

	const downloadFile = useCallback(
		async (currentPath: string = fullPath) => {
			setIsFileLoading(true);
			const storageFileRef = ref(storage, currentPath);
			if (currentPath) {
				try {
					const res = await getDownloadURL(storageFileRef);
					if (isMounted.current) {
						setFileUrl(res);
					}

					setIsFileLoading(false);
					return res;
				} catch (e) {
					console.error(e);
					setIsFileLoading(false);
				}
			}
		},
		[storage, fullPath],
	);

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (fullPath) {
			void downloadFile();
		}
	}, [fullPath]);

	return {fileUrl, downloadFile, isFileLoading};
};
