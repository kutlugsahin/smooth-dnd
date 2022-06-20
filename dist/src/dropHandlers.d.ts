import { ContainerProps } from './interfaces';
import { DropResult } from './exportTypes';
export declare function domDropHandler({ element, draggables }: ContainerProps): (dropResult: DropResult, onDrop: (params: DropResult) => void) => void;
export declare function reactDropHandler(): {
    handler: () => (dropResult: DropResult, onDrop: (params: DropResult) => void) => void;
};
