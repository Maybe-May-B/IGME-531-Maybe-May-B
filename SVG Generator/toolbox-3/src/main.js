import * as c from "./classes.js";
import * as h from "./helper.js";

let pathInstance,polylineInstance,translationInstance,rotationInstance,scalingInstance,styleInstance;
const init = () => {
    pathInstance = new c.Path();
    polylineInstance = new c.Polyline();
    translationInstance = new c.Translation();
    rotationInstance = new c.Rotation();
    scalingInstance = new c.Scaling();
    styleInstance = new c.Style();

    let svg = document.querySelector("#original-svg");
    drawSchotter(document.querySelector("#original-svg"));
    drawSchotter(document.querySelector("#variant-svg"),pathInstance.tri);
}
const drawSchotter = (svg,shape=pathInstance.rect,dimension=30,rows=24,columns=12) => {
    //initializing instances
    styleInstance = new c.Style("none","black",2/dimension);
    scalingInstance = new c.Scaling(dimension);

    for(let y=1;y<=rows;y++){
        for(let x=1;x<=columns;x++){
            rotationInstance.change(h.random(-y,y),0.5,0.5);
            translationInstance.change(dimension*(x-1)+20,dimension*(y-1)+h.random(-y,y)+20);

            let element = new c.Group(`group-${x}-${y}`,
                styleInstance,
                [new c.Path(`element-${x}-${y}`,shape).print()],
                translationInstance,
                rotationInstance,
                scalingInstance);
            svg.innerHTML += element.print();

            rotationInstance.change(0);
            translationInstance.change(dimension*(x-1)+20,dimension*(y-1)+20);
        }
    }
}

export {init};