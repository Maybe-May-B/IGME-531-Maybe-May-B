import * as c from "./classes.js";
import * as h from "./helper.js";

let pathInstance,polylineInstance,translationInstance,rotationInstance,scalingInstance,styleInstance;
const init = () => {
    pathInstance = new c.Path();
    polylineInstance = new c.Polyline();
    translationInstance = new c.Translation(100,100);
    rotationInstance = new c.Rotation();
    scalingInstance = new c.Scaling(100,100);
    styleInstance = new c.Style({fill:"red",stroke:"red",'stroke-width':0});

}


export {init};