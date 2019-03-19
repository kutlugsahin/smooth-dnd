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

const deprecetedDefaultExport: SmoothDnDCreator = function(element: ElementX, options?: ContainerOptions) {
    console.warn('default export is deprecated. please use named export "smoothDnD"');

    if (deprecetedDefaultExport.dropHandler !== undefined) {
        container.dropHandler = deprecetedDefaultExport.dropHandler;
    }

    if (deprecetedDefaultExport.wrapChild !== undefined) {
        container.wrapChild = deprecetedDefaultExport.wrapChild;
    }

    return container(element, options);
};

export default deprecetedDefaultExport;
