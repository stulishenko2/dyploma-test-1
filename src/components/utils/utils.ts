// Import {
export {};
// 	Query,
// 	type Query,
// 	type QueryDocumentSnapshot,
// 	startAfter,
// } from 'firebase/firestore';
// import size from 'lodash/size';
// import last from 'lodash/last';
//
// export const DEFAULT_LIMIT = 20;
//
// export const createConvertor = <T>() => ({
// 	fromFirestore(snapshot: QueryDocumentSnapshot<T>) {
// 		return {
// 			...snapshot.data(),
// 			id: snapshot.id,
// 			path: snapshot.ref.path,
// 			ref: snapshot.ref,
// 		};
// 	},
// 	toFirestore(modelObject: T) {
// 		return modelObject;
// 	},
// });
//
// export const createInfiniteNextQuery = <T>(dataQuery: Query<T>, limit: number, afterKey = 'createdAt') => (snapshot: T[]) => {
// 	if (size(snapshot) < limit) {
// 	  return undefined;
// 	}
//
// 	const lastDocument = last(snapshot);
//
// 	if (lastDocument[afterKey]) {
// 		return query(dataQuery, startAfter(lastDocument[afterKey]));
// 	}
//
// 	return undefined;
// };
