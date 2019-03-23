export interface SmoothDnD {
	dispose: () => void;
}

export type SmoothDnDCreator = ((element: HTMLElement, options?: ContainerOptions) => SmoothDnD) & {
	dropHandler?: any;
	wrapChild?: boolean;
};

export interface DropResult {
	removedIndex: number | null;
	addedIndex: number | null;
	payload?: any;
	element?: HTMLElement;
}

export interface DropPreviewOptions {
	className?: string;
	animationDuration?: string;
	showOnTop?: boolean;
}

export type DragStartEndCallback = (info: { isSource: boolean; payload: any; willAcceptDrop: boolean }) => void;
export type DropCallback = (dropResult: DropResult) => void;

export interface ContainerOptions {
	behaviour?: 'move' | 'copy' | 'drop-zone' | 'contain';
	groupName?: string; // if not defined => container will not interfere with other containers
	orientation?: 'vertical' | 'horizontal';
	dragHandleSelector?: string;
	nonDragAreaSelector?: string;
	dragBeginDelay?: number;
	animationDuration?: number;
	autoScrollEnabled?: boolean;
	lockAxis?: 'x' | 'y';
	dragClass?: string;
	dropClass?: string;
	onDragStart?: DragStartEndCallback;
	onDrop?: DropCallback;
	getChildPayload?: (index: number) => any;
	shouldAnimateDrop?: (sourceContainerOptions: ContainerOptions, payload: any) => boolean;
	shouldAcceptDrop?: (sourceContainerOptions: ContainerOptions, payload: any) => boolean;
	onDragEnter?: () => void;
	onDragLeave?: () => void;
	onDropReady?: DropCallback;
	removeOnDropOut?: boolean;
	getGhostParent?: () => HTMLElement;
	onDragEnd?: DragStartEndCallback;
	dropPlaceholder?: DropPreviewOptions | boolean;	
}