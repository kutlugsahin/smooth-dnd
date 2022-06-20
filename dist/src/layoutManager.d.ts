import { ElementX, Orientation, LayoutManager } from './interfaces';
export interface PropMap {
    [key: string]: any;
}
export default function layoutManager(containerElement: ElementX, orientation: Orientation, _animationDuration: number): LayoutManager;
