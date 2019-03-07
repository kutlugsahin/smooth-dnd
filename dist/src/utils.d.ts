import { Rect, Axis } from './interfaces';
export declare const getIntersection: (rect1: Rect, rect2: Rect) => {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export declare const getIntersectionOnAxis: (rect1: Rect, rect2: Rect, axis: Axis) => {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export declare const getContainerRect: (element: HTMLElement) => Rect;
export declare const getScrollingAxis: (element: HTMLElement) => string | null;
export declare const isScrolling: (element: HTMLElement, axis: Axis) => boolean;
export declare const isScrollingOrHidden: (element: HTMLElement, axis: Axis) => boolean;
export declare const hasBiggerChild: (element: HTMLElement, axis: Axis) => boolean;
export declare const hasScrollBar: (element: HTMLElement, axis: Axis) => boolean;
export declare const getVisibleRect: (element: HTMLElement, elementRect: Rect) => Rect;
export declare const listenScrollParent: (element: HTMLElement, clb: () => void) => {
    dispose: () => void;
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
export declare const getElementCursor: (element: Element | null) => any;
