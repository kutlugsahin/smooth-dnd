import * as constants from './src/constants';
import container from './src/container';
import * as dropHandlers from './src/dropHandlers';
import { SmoothDnDCreator } from './src/exportTypes';
export * from './src/exportTypes';
export { container as smoothDnD, constants, dropHandlers, };
declare const deprecetedDefaultExport: SmoothDnDCreator;
export default deprecetedDefaultExport;
