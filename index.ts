import * as constants from './src/constants';
import container from './src/container';
import * as dropHandlers from './src/dropHandlers';
import { SmoothDnDCreator, ContainerOptions } from './src/exportTypes';
import { ElementX } from './src/interfaces';

export * from './src/exportTypes';

export {
    container as smoothDnD,
    constants,
    dropHandlers,
};

function delegateProperty(from: any, to:any, propName: string) {
    Object.defineProperty(from, propName, {
        set: (val?: boolean) => {
            to[propName] = val;
        },
        get: () => to[propName]
    })
}
    
const deprecetedDefaultExport: SmoothDnDCreator = function(element: ElementX, options?: ContainerOptions) {
    console.warn('default export is deprecated. please use named export "smoothDnD"');
    return container(element, options);
};

deprecetedDefaultExport.cancelDrag = function () {
    container.cancelDrag();
}

deprecetedDefaultExport.isDragging = function () {
    return container.isDragging();
}

delegateProperty(deprecetedDefaultExport, container, 'useTransformForGhost');
delegateProperty(deprecetedDefaultExport, container, 'maxScrollSpeed');
delegateProperty(deprecetedDefaultExport, container, 'wrapChild');
delegateProperty(deprecetedDefaultExport, container, 'dropHandler');


export default deprecetedDefaultExport;
