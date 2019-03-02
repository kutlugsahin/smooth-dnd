import { addChildAt, removeChildAt } from './utils';
import {
	wrapperClass,
	containersInDraggable
} from './constants';
import { ContainerProps, DropResult, DropCallback } from './interfaces';


export function domDropHandler({ element, draggables }: ContainerProps) {
	return (dropResult: DropResult, onDrop: DropCallback) => {
		const { removedIndex, addedIndex, droppedElement } = dropResult as any;
		let removedWrapper = null;
		if (removedIndex !== null) {
			removedWrapper = removeChildAt(element, removedIndex);
			draggables.splice(removedIndex, 1);
		}

		if (addedIndex !== null) {
			const wrapper = global.document.createElement('div');
			wrapper.className = `${wrapperClass}`;
			wrapper.appendChild(removedWrapper && removedWrapper.firstElementChild ? removedWrapper.firstElementChild : droppedElement);
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
	const handler = () => {
		return (dropResult: DropResult, onDrop: DropCallback) => {
			if (onDrop) {
				onDrop(dropResult);
			}
		};
	};

	return {
		handler
	};
}
