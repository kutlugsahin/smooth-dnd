export interface SmoothDnD {
    dispose: () => void;
    setOptions: (options: ContainerOptions, merge?: boolean) => void;
}
export declare type SmoothDnDCreator = ((element: HTMLElement, options?: ContainerOptions) => SmoothDnD) & {
    dropHandler?: any;
    wrapChild?: boolean;
    maxScrollSpeed?: number;
    useTransformForGhost?: boolean;
    cancelDrag: () => void;
    isDragging: () => boolean;
};
declare type Callback<T> = (params: T) => void;
export interface DropResult {
    removedIndex: number | null;
    addedIndex: number | null;
    payload?: any;
    element?: HTMLElement;
}
export interface DropPlaceholderOptions {
    className?: string;
    animationDuration?: number;
    showOnTop?: boolean;
}
export interface DragStartParams {
    isSource: boolean;
    payload: any;
    willAcceptDrop: boolean;
}
export interface DragEndParams {
    isSource: boolean;
    payload: any;
    willAcceptDrop: boolean;
}
export declare type DragStartCallback = Callback<DragStartParams>;
export declare type DragEndCallback = Callback<DragEndParams>;
export declare type OnDropCallback = Callback<DropResult>;
export declare type OnDropReadyCallback = Callback<DropResult>;
export interface ContainerOptions {
    behaviour?: 'move' | 'copy' | 'drop-zone' | 'contain';
    groupName?: string;
    orientation?: 'vertical' | 'horizontal';
    dragHandleSelector?: string;
    nonDragAreaSelector?: string;
    dragBeginDelay?: number;
    animationDuration?: number;
    autoScrollEnabled?: boolean;
    lockAxis?: 'x' | 'y';
    dragClass?: string;
    dropClass?: string;
    onDragStart?: DragStartCallback;
    onDrop?: OnDropCallback;
    getChildPayload?: (index: number) => any;
    shouldAnimateDrop?: (sourceContainerOptions: ContainerOptions, payload: any) => boolean;
    shouldAcceptDrop?: (sourceContainerOptions: ContainerOptions, payload: any) => boolean;
    onDragEnter?: () => void;
    onDragLeave?: () => void;
    onDropReady?: OnDropReadyCallback;
    removeOnDropOut?: boolean;
    getGhostParent?: () => HTMLElement;
    onDragEnd?: DragEndCallback;
    dropPlaceholder?: DropPlaceholderOptions | boolean;
    dropHandler?: any;
    wrapChild?: boolean;
}
export {};
