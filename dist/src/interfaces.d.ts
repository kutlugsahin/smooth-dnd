import { ContainerOptions } from './exportTypes';
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
export declare type OffsetSize = {
    offsetWidth: number;
    offsetHeight: number;
};
export declare type Axis = 'x' | 'y';
export declare enum ScrollAxis {
    x = "x",
    y = "y",
    xy = "xy"
}
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
    getRect: () => Rect;
    descendants: ScrolableInfo[];
    axis: Axis;
}
export interface DragInfo {
    dragResult: DragResult;
    draggableInfo: DraggableInfo;
}
export interface DragResult {
    pos: number;
    addedIndex: number | null;
    removedIndex: number | null;
    elementSize: number;
    shadowBeginEnd: Boundary & {
        beginAdjustment: number;
        rect?: TopLeft;
        dropArea?: Boundary;
    };
    containerBoxChanged?: boolean;
    dropPlaceholderContainer?: HTMLDivElement;
}
export interface DraggableInfo {
    invalidateShadow: boolean | null;
    targetElement: HTMLElement | null;
    payload?: any;
    element?: HTMLElement;
    size: OffsetSize;
    container: IContainer;
    elementIndex: number;
    position: Position;
    mousePosition: Position;
    groupName?: string;
    ghostParent: HTMLElement | null;
    relevantContainers: IContainer[];
    cancelDrop?: boolean;
}
export interface ContainerProps {
    element: ElementX;
    draggables: ElementX[];
    getOptions: () => ContainerOptions;
    layout: LayoutManager;
}
export interface IContainer {
    element: HTMLElement;
    draggables: HTMLElement[];
    layout: LayoutManager;
    isDragRelevant: (sourceContainer: IContainer, payload: any) => boolean;
    dispose: (container: IContainer) => void;
    prepareDrag: (container: IContainer, relevantContainer: IContainer[]) => void;
    handleDrag: (draggableInfo: DraggableInfo) => DragResult | null;
    handleDrop: (draggableInfo: DraggableInfo) => void;
    getDragResult: () => DragResult | null;
    getTranslateCalculator: (info: {
        dragResult: DragResult;
    }) => any;
    onTranslated: () => void;
    getOptions: () => ContainerOptions;
    setDraggables: () => void;
    fireRemoveElement: () => void;
    getScrollMaxSpeed: () => number | undefined;
    setOptions: (options: ContainerOptions, merge?: boolean) => void;
    shouldUseTransformForGhost: () => boolean;
}
export interface GhostInfo {
    topLeft: {
        x: number;
        y: number;
    };
    ghost: HTMLElement;
    centerDelta: Position;
    positionDelta: {
        left: number;
        top: number;
    };
}
export interface LayoutManager {
    getSize: (element: HTMLElement | OffsetSize) => number;
    getContainerRectangles: () => {
        rect: any;
        visibleRect: any;
        lastVisibleRect: any;
    };
    getBeginEndOfDOMRect: (rect: Rect) => {
        begin: any;
        end: any;
    };
    getBeginEndOfContainer: () => {
        begin: any;
        end: any;
    };
    getBeginEndOfContainerVisibleRect: () => {
        begin: any;
        end: any;
    };
    getBeginEnd: (element: HTMLElement) => {
        begin: number;
        end: number;
    };
    getAxisValue: (position: Position) => Axis;
    setTranslation: (element: ElementX, translation: number) => void;
    getTranslation: (element: ElementX) => number;
    setVisibility: (element: ElementX, isVisible: boolean) => void;
    isVisible: (element: ElementX) => boolean;
    isInVisibleRect: (x: number, y: number) => boolean;
    setSize: (element: HTMLElement | CSSStyleDeclaration, size: string) => void;
    getTopLeftOfElementBegin: (begin: number) => {
        top: number;
        left: number;
    };
    getScrollSize: (element: HTMLElement) => number;
    getScrollValue: (element: HTMLElement) => number;
    setScrollValue: (element: HTMLElement, val: number) => void;
    invalidate: () => void;
    invalidateRects: () => void;
    getPosition: (position: Position) => Rect;
    setBegin: (style: CSSStyleDeclaration, value: string) => void;
}
