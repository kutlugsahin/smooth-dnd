export interface SmoothDnD {
	dispose: () => void;
	setOptions: (options: ContainerOptions, merge?: boolean) => void;	
}

export type SmoothDnDCreator = ((element: HTMLElement, options?: ContainerOptions) => SmoothDnD) & {
	dropHandler?: any;
	wrapChild?: boolean;
	maxScrollSpeed?: number;
	disableScrollOverlapDetection?: boolean;
	useTransformForGhost?: boolean;
	cancelDrag: () => void;
	isDragging: () => boolean;
};

type Callback<T> = (params: T) => void;

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

export interface DragStartParams { isSource: boolean; payload: any; willAcceptDrop: boolean }
export interface DragEndParams { isSource: boolean; payload: any; willAcceptDrop: boolean }

export type DragStartCallback = Callback<DragStartParams>;
export type DragEndCallback = Callback<DragEndParams>;
export type OnDropCallback = Callback<DropResult>;
export type OnDropReadyCallback = Callback<DropResult>;


export interface ContainerOptions {
	behaviour?: 'move' | 'copy' | 'drop-zone' | 'contain';
	groupName?: string; // if not defined => container will not interfere with other containers
	orientation?: 'vertical' | 'horizontal';
	dragHandleSelector?: string;
	nonDragAreaSelector?: string;
	dragBeginDelay?: number;
	animationDuration?: number;
	autoScrollEnabled?: boolean;
	disableScrollOverlapDetection?: boolean;
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
}
