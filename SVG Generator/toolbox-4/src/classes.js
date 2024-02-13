import * as h from "./helper.js";
//property classes
class Style {
    constructor (fillColor="none",strokeColor="",strokeWidth=0){
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    };

    print = (dimension) => `fill:${this.fillColor};stroke:${this.strokeColor};stroke-width:${this.strokeWidth/(dimension*2)};`;
}
class Translation {
    constructor(x=0,y=x){
        this.x = x;
        this.y = y;
    };

    change = (x,y) => {
        this.x = x;
        this.y = y;
    };
    add = (x,y=x) => {
        this.x += x;
        this.y += y;
    };
    format = () => `translate(${this.x},${this.y})`;
}
class Rotation {
    constructor(angle=0,rx=0.5,ry=rx){
        this.angle = angle;
        this.rx = rx;
        this.ry = ry;

        this.checkAngle();
    };

    checkAngle = () => {
        if(this.angle < 0){
            console.log("went counterclockwise");
            this.angle = 360 + this.angle;
        };
    };
    change = (angle,rx=0.5,ry=rx) => {
        this.angle = angle;
        this.rx = rx;
        this.ry = ry;

        this.checkAngle();
    };
    add = (angle,rx=0,ry=rx) => {
        this.angle += angle;
        this.rx += rx;
        this.ry += ry;

        this.checkAngle();
    }
    format = () => `rotate(${this.angle},${this.rx},${this.ry})`;
}
class Scaling {
    constructor(width=1,height=width){
        this.width = width;
        this.height = height;
    };

    change = (width,height) => {
        this.width = width;
        this.height = height;
    };
    add = (width,height=width) => {
        this.width += width;
        this.height += height;
    }
    format = () => `scale(${this.width},${this.height})`;
}

//tag classes
class Path {
    rect = () => `M 0 0 h 1 v 1 h -1 z`;
    tri = () => `M 0 0 h 1 l -0.5 1 z`;
    line = () => `M 0 0.5 h 1`;

    constructor(id="path-instance",shape=this.rect){
        this.id = id;
        this.d = shape();
    };

    print = () => `<path id=${this.id} d="${this.d}" />`;
}
class Polyline {
    rect = () => [{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:0,y:0}];
    tri = () => `1,0 0.5,1 0,0`;
    line = () => `0,0.5 1,0.5`;

    constructor(id="polyline-instance",shape=this.rect()){
        this.id = id;
        this.points = shape;
    };

    print = () => `<polyline id=${this.id} points="${this.points}"`;
}
class Group {
    constructor(id,style,elements,translation,rotation,scaling,dimension) {
        this.id = id;
        this.style = style;
        this.elements = elements;
        this.translation = translation;
        this.rotation = rotation;
        this.scaling = scaling;
        this.dimension = dimension;
    }

    print = () => `<g id=${this.id} transform='${this.translation.format()} ${this.rotation.format()} ${this.scaling.format()}' style=${this.style.print(this.dimension)}>
                ${this.elements.join(" ")}
            </g>`;
}

export {Style,Translation,Rotation,Scaling,Path,Polyline,Group};