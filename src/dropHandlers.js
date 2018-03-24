import { addChildAt, removeChildAt } from './utils';
import {
	wrapperClass,
	animationClass,
	containersInDraggable
} from './constants';


export function domDropHandler({ element, draggables, layout, options }) {
	return (dropResult, onDrop) => {
		const { removedIndex, addedIndex, droppedElement } = dropResult;
		if (removedIndex !== null) {
			removeChildAt(element, removedIndex);
			draggables.splice(removedIndex, 1);
		}

		if (addedIndex !== null) {
			const wrapper = document.createElement('div');
			wrapper.className = `${wrapperClass} ${options.orientation} ${animationClass} `;
			wrapper.appendChild(droppedElement.cloneNode(true));
			wrapper[containersInDraggable] = [];
			addChildAt(element, wrapper, addedIndex);
			if (addedIndex >= draggables.length) {
				draggables.push(wrapper);
			} else {
				draggables.splice(addedIndex, 0, wrapper);
			}
		}

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