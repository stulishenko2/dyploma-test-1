import React, {useState} from 'react';

export type Rectangle = {height: number; width: number};

// Функція для сортування прямокутників за висотою та шириною
const sortRectanglesByHeightAndWidth = (rectangles: Rectangle[]) => rectangles.sort((a, b) => {
	if (a.height !== b.height) {
		return b.height - a.height; // Спочатку за висотою (від найвищого до найнижчого)
	}

	return b.width - a.width; // Потім за шириною (від найширшого до найвужчого)
});

const Shelf = ({width, height}: Rectangle) => (
	<div style={{width: `${width}px`, height: `${height}px`, border: '1px solid black'}} />
);

export const RectanglePlacement = ({rectangles, shelfWidth}: {rectangles: Rectangle[]; shelfWidth: number}) => {
	// Відсортувати прямокутники за висотою та шириною
	const [recState, setRecState] = useState(rectangles);
	const sortedRectangles = sortRectanglesByHeightAndWidth(recState);
	const addReactangle = () => {
		setRecState(actual => [...actual, {height: 50, width: 50}]);
	};

	const shelves = [{width: shelfWidth, height: 0}]; // Початкова полиця з нульовою висотою
	const placedRectangles = [] as Rectangle[];

	sortedRectangles.forEach(rectangle => {
		let currentShelf = shelves.find(shelf => rectangle.width <= shelf.width);
		if (!currentShelf) {
			// Якщо немає доступних полиць для розміщення, створити нову полицю
			currentShelf = {width: shelfWidth, height: 0};
			shelves.push(currentShelf);
		}

		// Розміщення прямокутника на поточній полиці
		placedRectangles.push(rectangle);
		currentShelf.height += rectangle.height;
		currentShelf.width -= rectangle.width;
	});

	return (
		<div>
			{shelves.map((shelf, index) => (
				<Shelf key={index} width={shelf.width} height={shelf.height} />
			))}
			<br />
			{placedRectangles.map((rectangle, index) => (
				<div key={index} style={{width: `${rectangle.width}px`, height: `${rectangle.height}px`, backgroundColor: 'lightblue', margin: '5px'}} />
			))}
			<button onClick={addReactangle}>
                Add
			</button>
		</div>
	);
};
