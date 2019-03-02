import { Orientation, ElementX, Rect, Position } from './interfaces';
export interface PropMap {
    [key: string]: any;
}
export default function layoutManager(containerElement: ElementX, orientation: Orientation, _animationDuration: number): {
    getSize: (element: HTMLElement) => number;
    getContainerRectangles: () => {
        rect: any;
        visibleRect: any;
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
    getAxisValue: (position: Position) => any;
    setTranslation: (element: ElementX, translation: number) => void;
    getTranslation: (element: ElementX) => any;
    setVisibility: (element: ElementX, isVisible: boolean) => void;
    isVisible: (element: ElementX) => any;
    isInVisibleRect: (x: number, y: number) => boolean;
    dispose: () => void;
    getContainerScale: () => {
        scaleX: any;
        scaleY: any;
    };
    setScrollListener: (callback: Function) => void;
    setSize: (element: HTMLElement | CSSStyleDeclaration, size: string) => void;
    getTopLeftOfElementBegin: (begin: number) => {
        top: number;
        left: number;
    };
    getScrollSize: (element: HTMLElement) => any;
    getScrollValue: (element: HTMLElement) => any;
    setScrollValue: (element: HTMLElement, val: number) => void;
    invalidate: () => void;
    invalidateRects: () => void;
    getPosition: (position: Position) => any;
};
