import * as constants from "./constants";
import container from "./container";
import * as dropHandlers from "./dropHandlers";
import { SmoothDnDCreator, ContainerOptions } from "./exportTypes";
import { ElementX } from "./interfaces";

export * from "./exportTypes";

export { container as smoothDnD, constants, dropHandlers };

function delegateProperty(from: any, to: any, propName: string) {
  Object.defineProperty(from, propName, {
    set: (val?: boolean) => {
      to[propName] = val;
    },
    get: () => to[propName]
  });
}

const deprecatedDefaultExport: SmoothDnDCreator = function(
  element: ElementX,
  options?: ContainerOptions
) {
  console.warn(
    'default export is deprecated. please use named export "smoothDnD"'
  );
  return container(element, options);
};

deprecatedDefaultExport.cancelDrag = function() {
  container.cancelDrag();
};

deprecatedDefaultExport.isDragging = function() {
  return container.isDragging();
};

delegateProperty(deprecatedDefaultExport, container, "useTransformForGhost");
delegateProperty(deprecatedDefaultExport, container, "maxScrollSpeed");
delegateProperty(deprecatedDefaultExport, container, "wrapChild");
delegateProperty(deprecatedDefaultExport, container, "dropHandler");

export default deprecatedDefaultExport;
