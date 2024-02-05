//variables
let svg;

//methods
const init = () => {
    svg = document.querySelector("svg");
    const selector = document.querySelector("select");
    
    selector.onchange = e => {
        switch(e.target.value){
            case "Rectangles":
                drawSainteVictoireEnRouge(svg,createRect);
                break;
            case "Circles":
                drawSainteVictoireEnRouge(svg,createCircle);
        }
    }
    drawSainteVictoireEnRouge(svg,createRect);
}
const createRect = (location,id,style,rotation,x,y,width=1,height=width,rx=0,ry=rx) => {
    location.innerHTML += `<g transform=rotate(${rotation},${x},${y})>
        <rect id=${id} x=${x-width/2} y=${y-height/2} rx=${rx} ry=${ry} width=${width} height=${height} style=${style} />
        </g>`;
}
const createCircle = (location,id,style,rotation,x,y,d=1) => {
    location.innerHTML += `<g transform=rotate(${rotation},${x},${y})>
        <circle id=${id} cx=${x} cy=${y} r=${d/2} style=${style} />
        </g>`;
}
const createEllipse = (location,id,style,rotation,x,y,dx=0,dy=dx) => {
    location.innerHTML += `<g transform=rotate(${rotation} ${x} ${y})>
        <ellipse id=${id} cx=${x} cy=${y} rx=${dx/2} ry=${dy/2} style=${style} />
        </g>`;
}
const createLine = (location,id,style,rotation,x1,y1,x2,y2) => {
    location.innerHTML += `<g transform=rotate(${rotation},${(x2+x1)/2},${(y2+y1)/2})>
        <line id=${id} x1=${x1} y1=${y1} x2=${x2} y2=${y2} style=${style}/>
        </g>`;
}
const createPolygon = (location,id,style,rotation,points=[]) => {
    let pointsList = `"`;
    for(let point of points){
        pointsList += `${point[0]},${point[1]} `;
    }
    pointsList += `"`;
    console.log(pointsList);
    location.innerHTML += `<polygon id=${id} points=${pointsList} style=${style} />`;
}
const createStyle = (fillColor="", strokeColor="", strokeWidth=0) => {
    return `fill:${fillColor};stroke:${strokeColor};stroke-width:${strokeWidth};`;
}

const rect = (id,style,x1,y1=x1,x2,y2=x2) => {
    let pointsList = `"${x1},${y1} ${x2},${y1} ${x2},${y2} ${x1},${y2}"`;
    svg1.innerHTML += `<polyline id=${id} points=${pointsList} style=${style} />`
}
const circle = (id,style,x1,y1=x1,x2,y2=x2) => {
    let d = `M ${x1},${(y2+y1)/2}
        A ${(x2+x1)/2} ${(y2+y1)/2} 45`
}

const drawSainteVictoireEnRouge = (svg,draw=createRect) => {
    svg.innerHTML="";
    svg.innerHTML += `<g id=layer-1></g><g id=layer-2></g><g id=layer-3></g><g id=layer-4></g><g id=layer-5></g>`;
    const layer1 = document.querySelector("#layer-1");
    const layer2 = document.querySelector("#layer-2");
    const layer3 = document.querySelector("#layer-3");
    const layer4 = document.querySelector("#layer-4");
    const layer5 = document.querySelector("#layer-5");

    let currentStyle = createStyle("rgb(107,41,51)");
    draw(layer1,"shape-1-1",currentStyle,335,230,150,225);
    draw(layer1,"shape-1-2",currentStyle,330,530,570,225);
    draw(layer1,"shape-1-3",currentStyle,5,650,525,225);

    currentStyle = createStyle("rgb(190,42,42)");
    draw(layer2,"shape-2-1",currentStyle,5,125,395,225);
    draw(layer2,"shape-2-2",currentStyle,45,650,745,225);

    currentStyle = createStyle("rgb(191,48,44)");
    draw(layer3,"shape-3-1",currentStyle,355,390,130,225);

    currentStyle = createStyle("rgb(229,37,36)");
    draw(layer4,"shape-4-1",currentStyle,20,755,760,225);

    currentStyle = createStyle("rgb(232,65,57)");
    draw(layer5,"shape-5-1",currentStyle,45,200,260,225);
    draw(layer5,"shape-5-2",currentStyle,350,500,330,225);
}

init();