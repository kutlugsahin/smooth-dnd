import layoutManager from './layoutManager';
export declare type Position = {
    x: number;
    y: number;
};
export declare type MousePosition = {
    clientX: number;
    clientY: number;
};
export interface Rect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export declare type Axis = 'x' | 'y';
export declare type Boundary = {
    begin: number;
    end: number;
};
export declare type TopLeft = {
    top: number;
    left: number;
};
export declare type Dictionary = {
    [key: string]: any;
};
export declare type Orientation = 'horizontal' | 'vertical';
export declare type ElementX = HTMLElement & Dictionary;
export interface ScrolableInfo {
    element: HTMLElement;
    rect: Rect;
    descendants: ScrolableInfo[];
    invalidate: () => void;
    axis: Axis;
    dispose: Function;
}
export declare type SmoothDnDCreator = (element: HTMLElement, options: ContainerOptions) => SmoothDnD;
export interface SmoothDnD {
    dispose: () => void;
}
export interface DropResult {
    removedIndex: number | null;
    addedIndex: number | null;
    payload?: any;
    element: HTMLElement;
}
export interface DragResult {
    pos: number;
    addedIndex: number | null;
    removedIndex: number | null;
    elementSize: number;
    shadowBeginEnd: Boundary & {
        beginAdjustment: number;
        rect?: TopLeft;
    };
    dragLeft?: boolean;
    containerBoxChanged?: boolean;
}
export interface DraggableInfo {
    invalidateShadow: boolean | null;
    targetElement: HTMLElement | null;
    payload?: any;
    element: HTMLElement;
    container: IContainer;
    elementIndex: number;
    position: Position;
    mousePosition: Position;
    groupName?: string;
    ghostParent: HTMLElement | null;
}
export interface DragInfo {
    dragResult: DragResult;
    draggableInfo: DraggableInfo;
}
export declare type DragStartEndCallback = (info: {
    isSource: boolean;
    payload: any;
    willAcceptDrop: boolean;
}) => void;
export declare type DropCallback = (dropResult: DropResult) => void;
export interface ContainerOptions {
    behaviour?: 'move' | 'copy' | 'drop-zone';
    groupName?: string;
    orientation?: 'vertical' | 'horizontal';
    dragHandleSelector?: string;
    nonDragAreaSelector?: string;
    dragBeginDelay?: number;
    animationDuration?: number;
    autoScrollEnabled?: boolean;
    lockAxis?: Axis;
    dragClass?: string;
    dropClass?: string;
    onDragStart?: DragStartEndCallback;
    onDrop?: DropCallback;
    getChildPayload?: (index: number) => any;
    shouldAnimateDrop?: (sourceContainerOptions: ContainerOptions, payload: any) => boolean;
    shouldAcceptDrop?: (sourceContainerOptions: ContainerOptions, payload: any) => boolean;
    onDragEnter?: () => {};
    onDragLeave?: () => {};
    onDropReady?: DropCallback;
    removeOnDropOut?: boolean;
    getGhostParent?: () => HTMLElement;
    onDragEnd?: DragStartEndCallback;
}
export interface ContainerProps {
    element: ElementX;
    draggables: ElementX[];
    options: ContainerOptions;
    layout: ReturnType<typeof layoutManager>;
}
export interface IContainer {
    element: HTMLElement;
    draggables: HTMLElement[];
    layout: ReturnType<typeof layoutManager>;
    isDragRelevant: (sourceContainer: IContainer, payload: any) => boolean;
    getScale: () => {
        scaleX: number;
        scaleY: number;
    };
    getChildContainers: () => IContainer[];
    onChildPositionCaptured: (isCaptured: boolean) => void;
    dispose: (container: IContainer) => void;
    prepareDrag: (container: IContainer, relevantContainer: IContainer[]) => void;
    isPosInChildContainer: () => boolean;
    handleDrag: (draggableInfo: DraggableInfo) => DragResult | null;
    handleDrop: (draggableInfo: DraggableInfo) => void;
    getDragResult: () => DragResult | null;
    getTranslateCalculator: (info: {
        dragResult: DragResult;
    }) => any;
    setParentContainer: (container: IContainer) => void;
    getParentContainer: () => IContainer | null;
    onTranslated: () => void;
    getOptions: () => ContainerOptions;
    setDraggables: () => void;
}
export interface GhostInfo {
    ghost: HTMLElement;
    centerDelta: Position;
    positionDelta: {
        left: number;
        top: number;
    };
}
