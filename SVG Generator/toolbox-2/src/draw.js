import * as transform from "./transform.js";

const path = (id,shape=rectPath) => {
    return `<path id=${id} d="M 0 0 ${shape}" />`;
};
const polyline = (id,width,shape=rectPolyline) => {
    return `<polyline id=${id} points="${shape}"/>`
}
const g = (id,style,elements) => {
    return `<g id=${id} transform='${transform.translate()} ${transform.rotate()} ${transform.scale()}' style=${style}>
                ${elements.join(" ")}
            </g>`;
};

const rectPath = (width,height=width) => {
    return `h ${width} 
        v ${height} 
        h ${-width} 
        z`;
};
const circlePath = (diameter) => {
    return `m 0,${diameter/2} 
        q ${diameter/2},${-diameter/2} ${diameter},0 
        t ${-diameter},0`;
};

const rectPolyline = (width,height=width) => {
    let startingPoint = `${transform.skew(false,0)},${transform.skew(false,0)}`;
    return `${startingPoint} 
        ${transform.skew(false,width)},${transform.skew(false,0)} 
        ${transform.skew(false,width)},${transform.skew(false,height)} 
        ${transform.skew(false,0)},${transform.skew(false,height)} 
        ${startingPoint}`;
};

export {path,polyline,g,rectPath,circlePath,rectPolyline};