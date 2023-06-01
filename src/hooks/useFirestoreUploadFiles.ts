import {useCallback, useState} from 'react';
import {ref as refStorage, uploadBytesResumable} from 'firebase/storage';
import {storage} from '../App';

export const useFirestoreUploadFiles = () => {
	const [isLoading, setIsLoading] = useState(false);

	const defaultDestinationPrefix = 'photo/';

	const upload = useCallback(
		async (file: File, destination = '') => {
			try {
				setIsLoading(true);
				const storageRef = refStorage(
					storage,
					defaultDestinationPrefix + destination + file.name,
				);

				const {
					ref: {fullPath, bucket},
				} = await uploadBytesResumable(storageRef, file, {
					contentType: file?.type,
				});
				return {
					fullPath,
					bucket,
				};
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		},
		[storage, defaultDestinationPrefix],
	);
	const uploadMultiple = useCallback(
		async (files: File[], destinationCreator: (img: File) => string) => {
			const images = [];
			try {
				setIsLoading(true);
				for await (const image of files) {
					const storageRef = refStorage(
						storage,
						defaultDestinationPrefix + destinationCreator(image),
					);

					const {
						ref: {fullPath, bucket},
					} = await uploadBytesResumable(storageRef, image, {
						contentType: image?.type,
					});
					images.push({
						fullPath,
						bucket,
					});
				}

				return images;
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		},
		[storage, defaultDestinationPrefix],
	);

	return {
		upload,
		uploadMultiple,
		isLoading,
	};
};
