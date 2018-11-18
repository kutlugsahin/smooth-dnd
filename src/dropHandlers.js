import { addChildAt, removeChildAt } from './utils';
import {
	wrapperClass,
	animationClass,
	containersInDraggable
} from './constants';


export function domDropHandler({ element, draggables, layout, options }) {
	return (dropResult, onDrop) => {
		// const { removedIndex, addedIndex, droppedElement } = dropResult;
		// let removedWrapper = null;
		// if (removedIndex !== null) {
		// 	removedWrapper = removeChildAt(element, removedIndex);
		// 	draggables.splice(removedIndex, 1);
		// }

		// if (addedIndex !== null) {
		// 	const wrapper = removedWrapper || droppedElement;
		// 	wrapper[containersInDraggable] = [];
		// 	addChildAt(element, wrapper, addedIndex);			
		// }

		if (onDrop) {
			onDrop(dropResult);
		}
	};
}

export function reactDropHandler() {
	const handler = ({ element, draggables, layout, options }) => {
		return (dropResult, onDrop) => {
			if (onDrop) {
				onDrop(dropResult);
			}
		};
	};

	return {
		handler
	};
}
