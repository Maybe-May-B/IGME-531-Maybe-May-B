import * as c from "./classes.js";
import * as h from "./helper.js";

let polylineInstance;
const init = () => {
    polylineInstance = new c.Polyline();
    drawTiles(50,10,10,7,{x:100,y:100},{x:50,y:50});
    
}

const drawTiles = (sides,rows,columns,maxAmplitude,dimensions,margins) => {
    let next;
    let elements = [];
    let style = new c.Style({fill:'none',stroke:'white','stroke-width':1/Math.max(dimensions.x,dimensions.y)});
    let scaling = new c.Scaling(dimensions.x,dimensions.y);
    let rotations = h.perlin(0,rows*columns,maxAmplitude,0,360);
    for(let y=0; y<rows;y++){
        for(let x=0; x<columns;x++){
            next = 0;
            let points = polylineInstance.polygon(sides);
            let translating = new c.Translation((dimensions.x+margins.x)*x,(dimensions.y+margins.y)*y);
            let rotating = new c.Rotation(rotations[(y*columns)+x]);
            let xSkews = h.perlin(0,sides,(maxAmplitude/(dimensions.x*columns))*(x+1));
            let ySkews = h.perlin(0,sides,(maxAmplitude/(dimensions.y*rows))*(y+1));
            for(let i=0; i< points.length; i++){
                points[i].x += xSkews[i];
                points[i].y += ySkews[i];
            }
            let shape = new c.Polyline(`shape`,[points[next]]);
            points.splice(next,1);
            while(shape.points.length < sides){
                let current = shape.points[shape.points.length-1];
                next = h.closestPoint(points,current);
                shape.points.push(points[next]);
                points.splice(next,1);
            }
            elements.push(new c.Group(`group-${x+1}-${y+1}`,style,[shape],[translating,rotating,scaling]));
        }
    }
    let body = document.querySelector("body");
    let group = new c.Group("group-1",style,elements,[new c.Translation(margins.x,margins.y)]);
    body.innerHTML = `<svg id="svg-1" 
        height="${rows*(dimensions.y+margins.y)+(margins.y*2)}" 
        width="${columns*(dimensions.x+margins.x)+(margins.x*2)}" style="background-color:black">
            ${group.print()}
        </svg>
        <button>save</button>`;
    document.querySelector("button").onclick = download;
}
const download = () => {
    console.log("check");
    const file = new Blob([document.querySelector("#svg-1").outerHTML],{type: "image/svg+xml"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "tiles.svg";
    link.click();
    URL.revokeObjectURL(link.href);
}

export {init};