import { ContainerOptions } from "./exportTypes";

export const defaultOptions: ContainerOptions = {
	groupName: undefined,
	behaviour: 'move', // move | copy
	orientation: 'vertical', // vertical | horizontal
	getChildPayload: undefined,
	animationDuration: 250,
	autoScrollEnabled: true,
	disableScrollOverlapDetection: false,
	shouldAcceptDrop: undefined,
	shouldAnimateDrop: undefined,
};
