import container from './src/container';
import * as constants from './src/constants';
import * as dropHandlers from './src/dropHandlers';
import { SmoothDnDCreator, ElementX, ContainerOptions } from './src/interfaces';

export { container as smoothDnD, constants, dropHandlers };

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
