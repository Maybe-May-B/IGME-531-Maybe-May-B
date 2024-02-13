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
    let variantSVG = document.querySelector("#variant-svg");
    let test = h.getLength(h.perlin(0,20,5,0));
    console.log(test);
    drawInterruptions(svg,12,pathInstance.line,5,50,50);
    drawInterruptions(variantSVG,12,pathInstance.tri,5,50,50);

}
const drawInterruptions = (svg,width,shape=pathInstance.line,amplitude=5,rows=50,columns=rows) => {
    styleInstance = new c.Style("none","black",2);
    scalingInstance = new c.Scaling(width);
    
    let translationsX = h.perlin(0,rows,amplitude);
    let translationsY = h.perlin(0,columns,amplitude);
    let rotations = h.perlin(0,rows*columns,amplitude*3);
    for(let y=0; y<columns;y++){
        for(let x=0; x<rows;x++){
            rotationInstance.change(rotations[(rows*y)+x]);
            let currentTranslation = {x:(width*x)+translationsX[x],y:(width*y)+translationsY[y]};
            if(currentTranslation.x < 0){
                currentTranslation.x = 0;
            }
            else if(currentTranslation.x > 650-width){
                currentTranslation.x = 650-width;
            }
            if(currentTranslation.y < 0){
                currentTranslation.y = 0;
            }
            else if (currentTranslation.y > 650-width){
                currentTranslation.y = 650-width;
            }
            translationInstance.change(currentTranslation.x+15,currentTranslation.y+15);
            let element = new c.Group(`group-${x+1}-${y+1}`,
                styleInstance,
                [new c.Path(`element-${x+1}-${y+1}`,shape).print()],
                translationInstance,
                rotationInstance,
                scalingInstance,
                width);
            svg.innerHTML += element.print();
        }
    }
}

export {init};