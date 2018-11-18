# smooth-dnd

A fast and lightweight drag&drop, sortable library for with many configuration options covering many d&d scenarios. There is no external dependencies. It uses css transitions for animations so it's hardware accelerated whenever possible.

For **React** components and usage follow <a href="https://github.com/kutlugsahin/react-smooth-dnd/">link</a> 

For **Angular** components and usage follow <a href="https://github.com/kutlugsahin/ngx-smooth-dnd/">link</a>  

For **Vue.js** components and usage follow <a href="https://github.com/kutlugsahin/vue-smooth-dnd/">link</a>  

**Show, don't tell !**
### <a href="https://kutlugsahin.github.io/smooth-dnd-demo/">Demo page</a>

### Installation

```shell
npm i smooth-dnd
```

## Usage

#### HTML



```html
<div id="container">
  <div>Draggable 1</div>
  <div>Draggable 2</div>
  <div>Draggable 3</div>
</div>
```

```js
var containerElement = document.getElementById('container');

var container = SmoothDnD(containerElement, options);
```

## API

### SmoothDnD

Global function to convert element to a Drag and Drop container.
```js
var container = SmoothDnD(containerElement, options);
```
#### Parameters
- **containerElement** : `DOMElement` : The parent element that contains the elements to be dragged
- **options** : `object` : Set of parameters described below.
#### Returns
- **container** : `object` : handle the the created container which contains **dispose** function.
  - **dispose** : `function` : function to be called to remove detach SmoothDND form the container. It should be called when removing the **containerElement** from the DOM.


## Options

| Property | Type | Default | Description |
|-|:-:|:-:|-|
| orientation |string|`vertical` | Orientation of the container. Can be **horizontal** or **vertical**.|
|behaviour|string|`move`| Property to describe weather the dragging item will be moved or copied to target container. Can be **move** or **copy**.|
|groupName|string|`undefined`|Draggables can be moved between the containers having the same group names. If not set container will not accept drags from outside. This behaviour can be overriden by shouldAcceptDrop function. See below.
|lockAxis|string|`undefined`|Locks the movement axis of the dragging. Possible values are **x**, **y** or **undefined**.
|dragHandleSelector|string|`undefined`|Css selector to test for enabling dragging. If not given item can be grabbed from anywhere in its boundaries.|
|nonDragAreaSelector|string|`undefined`|Css selector to prevent dragging. Can be useful when you have form elements or selectable text somewhere inside your draggable item. It has a precedence over **dragHandleSelector**.|
|dragBeginDelay|number| `0` (`200` for touch devices)|Time in milisecond. Delay to start dragging after item is pressed. Moving cursor before the delay more than 5px will cancel dragging.
|animationDuration|number|`250`|Animation duration in milisecond. To be consistent this animation duration will be applied to both drop and reorder animations.|
|autoScrollEnabled|boolean|`true`|First scrollable parent will scroll automatically if dragging item is close to boundaries.
|dragClass|string|`undefined`|Class to be added to the ghost item being dragged. The class will be added after it's added to the DOM so any transition in the class will be applied as intended.
|dropClass|string|`undefined`|Class to be added to the ghost item just before the drop animation begins.|
|removeOnDropOut|boolean|`undefined`|When set true onDrop will be called with a removedIndex if you drop element out of any relevant container|
|onDragStart|function|`undefined`|*See descriptions below*|
|onDragEnd|function|`undefined`|*See descriptions below*|
|onDropReady|function|`undefined`|*See descriptions below*|
|onDrop|function|`undefined`|*See descriptions below*|
|getChildPayload|function|`undefined`|*See descriptions below*|
|shouldAnimateDrop|function|`undefined`|*See descriptions below*|
|shouldAcceptDrop|function|`undefined`|*See descriptions below*|
|onDragEnter|function|`undefined`|*See descriptions below*|
|onDragLeave|function|`undefined`|*See descriptions below*|

---

### onDragStart

The function to be called by all container when drag start.
```js
function onDragStart({isSource, payload, willAcceptDrop}) {
  ...
}
```
#### Parameters
- **isSource** : `boolean` : true if it is called by the container which drag starts from otherwise false.
- **payload** : `object` : the payload object that is returned by getChildPayload function. It will be undefined in case getChildPayload is not set.
- **willAcceptDrop** : `boolean` : true if the dragged item can be dropped into the container, otherwise false.

### onDragEnd

The function to be called by all container when drag ends. Called before **onDrop** function
```js
function onDragEnd({isSource, payload, willAcceptDrop}) {
  ...
}
```
#### Parameters
- **isSource** : `boolean` : true if it is called by the container which drag starts from, otherwise false.
- **payload** : `object` : the payload object that is returned by getChildPayload function. It will be undefined in case getChildPayload is not set.
- **willAcceptDrop** : `boolean` : true if the dragged item can be dropped into the container, otherwise false.

### onDropReady

The function to be called by the container which is being drag over, when the index of possible drop position changed in container. Basically it is called each time the draggables in a container slides for opening a space for dragged item. **dropResult** is the only parameter passed to the function which contains the following properties.
```js
function onDropReady(dropResult) {
  const { removedIndex, addedIndex, payload, element } = dropResult;
  ...
}
```
#### Parameters
- **dropResult** : `object`
	- **removedIndex** : `number` : index of the removed children. Will be `null` if no item is removed. 
	- **addedIndex** : `number` : index to add droppped item. Will be `null` if no item is added. 
	- **payload** : `object` : the payload object retrieved by calling *getChildPayload* function.
	- **element** : `DOMElement` : the DOM element that is moved 

### onDrop

The function to be called by any relevant container when drop is over. (After drop animation ends). Source container and any container that could accept drop is considered relevant. **dropResult** is the only parameter passed to the function which contains the following properties.
```js
function onDrop(dropResult) {
  const { removedIndex, addedIndex, payload, element } = dropResult;
  ...
}
```
#### Parameters
- **dropResult** : `object`
	- **removedIndex** : `number` : index of the removed children. Will be `null` if no item is removed. 
	- **addedIndex** : `number` : index to add droppped item. Will be `null` if no item is added. 
	- **payload** : `object` : the payload object retrieved by calling *getChildPayload* function.
	- **element** : `DOMElement` : the DOM element that is moved 

### getChildPayload

The function to be called to get the payload object to be passed **onDrop** function.
```js
function getChildPayload(index) {
  return {
    ...
  }
}
```
#### Parameters
- **index** : `number` : index of the child item
#### Returns
- **payload** : `object`

### getGhostParent

The function to be called to get the element that the dragged ghost will be appended. Default parent element is the container itself.
The ghost element is positioned as 'fixed' and appended to given parent element. 
But if any anchestor of container has a transform property, ghost element will be positioned relative to that element which breaks the calculations. Thats why if you have any transformed parent element of Containers you should set this property so that it returns any element that has not transformed parent element.
```js
function getGhostParent() {
  // i.e return document.body;
}
```

### shouldAnimateDrop

The function to be called by the target container to which the dragged item will be droppped.
Sometimes dragged item's dimensions are not suitable with the target container and dropping animation can be wierd. So it can be disabled by returning **false**. If not set drop animations are enabled.
```js
function shouldAnimateDrop(sourceContainerOptions, payload) {
  return false;
}
```
#### Parameters
- **sourceContainerOptions** : `object` : options of the source container. (parent container of the dragged item)
- **payload** : `object` : the payload object retrieved by calling *getChildPayload* function.
#### Returns
- **boolean** : **true / false**

### shouldAcceptDrop

The function to be called by all containers before drag starts to determine the containers to which the drop is possible. Setting this function will override the **groupName** property and only the return value of this function will be taken into account.

```js
function shouldAcceptDrop(sourceContainerOptions, payload) {
  return true;
}
```
#### Parameters
- **sourceContainerOptions** : `object` : options of the source container. (parent container of the dragged item)
- **payload** : `object` : the payload object retrieved by calling *getChildPayload* function.
#### Returns
- **boolean** : **true / false**

### onDragEnter

The function to be called by the relevant container whenever a dragged item enters its boundaries while dragging.
```js
function onDragEnter() {
  ...
}
```

### onDragLeave

The function to be called by the relevant container whenever a dragged item leaves its boundaries while dragging.
```js
function onDragLeave() {
  ...
}
```