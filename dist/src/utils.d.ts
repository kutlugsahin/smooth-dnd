import { Rect, ScrollAxis, IContainer } from './interfaces';
export declare const getIntersection: (rect1: Rect, rect2: Rect) => {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export declare const getIntersectionOnAxis: (rect1: Rect, rect2: Rect, axis: "x" | "y") => {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export declare const getContainerRect: (element: HTMLElement) => Rect;
export declare const getScrollingAxis: (element: HTMLElement) => ScrollAxis | null;
export declare const isScrolling: (element: HTMLElement, axis: "x" | "y") => boolean;
export declare const isScrollingOrHidden: (element: HTMLElement, axis: "x" | "y") => boolean;
export declare const hasBiggerChild: (element: HTMLElement, axis: "x" | "y") => boolean;
export declare const hasScrollBar: (element: HTMLElement, axis: "x" | "y") => boolean;
export declare const getVisibleRect: (element: HTMLElement, elementRect: Rect) => Rect;
export declare const getParentRelevantContainerElement: (element: Element, relevantContainers: IContainer[]) => any;
export declare const listenScrollParent: (element: HTMLElement, clb: () => void) => {
    dispose: () => void;
    start: () => void;
    stop: () => void;
};
export declare const hasParent: (element: HTMLElement, parent: HTMLElement) => boolean;
export declare const getParent: (element: Element | null, selector: string) => Element | null;
export declare const hasClass: (element: HTMLElement, cls: string) => boolean;
export declare const addClass: (element: Element | null | undefined, cls: string) => void;
export declare const removeClass: (element: HTMLElement, cls: string) => void;
export declare const debounce: (fn: Function, delay: number, immediate: boolean) => (...params: any[]) => void;
export declare const removeChildAt: (parent: HTMLElement, index: number) => Element;
export declare const addChildAt: (parent: HTMLElement, child: HTMLElement, index: number) => void;
export declare const isMobile: () => boolean;
export declare const clearSelection: () => void;
export declare const getElementCursor: (element: Element | null) => string | null;
export declare const getDistanceToParent: (parent: HTMLElement, child: HTMLElement) => number | null;
export declare function isVisible(rect: Rect): boolean;
