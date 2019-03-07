import { ContainerProps, DropResult, DropCallback } from './interfaces';
export declare function domDropHandler({ element, draggables }: ContainerProps): (dropResult: DropResult, onDrop: DropCallback) => void;
export declare function reactDropHandler(): {
    handler: () => (dropResult: DropResult, onDrop: DropCallback) => void;
};
