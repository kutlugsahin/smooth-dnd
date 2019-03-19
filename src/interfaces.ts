import layoutManager from './layoutManager';
import { ContainerOptions } from './exportTypes';

export type Position = { x: number; y: number };
export type MousePosition = { clientX: number; clientY: number };
export interface Rect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export type OffsetSize = { offsetWidth: number; offsetHeight: number }

export type Axis = 'x' | 'y';
export enum ScrollAxis {
  x = 'x',
  y = 'y',
  xy = 'xy'
}
export type Boundary = { begin: number; end: number };
export type TopLeft = { top: number; left: number };

export type Dictionary = { [key: string]: any };
export type Orientation = 'horizontal' | 'vertical';
export type ElementX = HTMLElement & Dictionary;

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
  shadowBeginEnd: Boundary & { beginAdjustment: number; rect?: TopLeft };
  dragLeft?: boolean;
	containerBoxChanged?: boolean;
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
  dispose: (container: IContainer) => void;
  prepareDrag: (container: IContainer, relevantContainer: IContainer[]) => void;
  handleDrag: (draggableInfo: DraggableInfo) => DragResult | null;
  handleDrop: (draggableInfo: DraggableInfo) => void;
  getDragResult: () => DragResult | null;
  getTranslateCalculator: (info: { dragResult: DragResult }) => any;
  onTranslated: () => void;
  getOptions: () => ContainerOptions;
  setDraggables: () => void;
  fireRemoveElement: () => void;
}

export interface GhostInfo {
  ghost: HTMLElement;
  centerDelta: Position;
  positionDelta: { left: number; top: number };
}
