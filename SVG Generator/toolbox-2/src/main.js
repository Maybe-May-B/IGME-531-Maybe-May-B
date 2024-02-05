import * as draw from "./draw.js";
import * as transform from "./transform.js";

const init = () => {
    drawDesOrderes(document.querySelector("#path-svg"),34,draw.rectPath);
    drawDesOrderes(document.querySelector("#polyline-svg"),34,draw.rectPolyline);
    drawDesOrderes(document.querySelector("#variant-svg"),34,draw.circlePath);
};

const drawDesOrderes = (svg,dimension,shape) => {
    let style = "fill:none;stroke:black;stroke-width:1;";
    let drawing = ``;
    for(let y=1; y<=14;y++){
        for(let x=1; x<=14;x++){
            let rectLayers = Math.floor(transform.skew(false,6,2));
            let rects = [];
            for(let z=1; z<=rectLayers; z++){
                let centering = transform.changeScaling(transform.skew(true,0.3,0.7));
                let translation = transform.changeTranslation(dimension*(1-centering.x)/2,dimension*(1-centering.y)/2);
                rects.push(draw.g(`group-${x}-${y}`,style,[draw.path(`rect-${x}-${y}-${z}`,shape(dimension))]));
                transform.changeTranslation(-translation.x,-translation.y);
            };
            transform.changeTranslation(dimension*(x-1),dimension*(y-1));
            transform.changeScaling(1,1);
            drawing += draw.g(`group-${x}-${y}`,style,rects);
        }
    };
    svg.innerHTML = drawing;
}

init();