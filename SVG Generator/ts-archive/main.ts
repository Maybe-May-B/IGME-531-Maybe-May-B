import * as c from "./classes";

let pathInstance,polylineInstance,translationInstance,rotationInstance,scalingInstance;
const init = () => {
    pathInstance = new c.Path();
    polylineInstance = new c.Polyline();
    translationInstance = new c.Translation();
    rotationInstance = new c.Rotation();
    scalingInstance = new c.Scaling(100,100);
}
const drawSchotter = () => {
    
}

export {init};