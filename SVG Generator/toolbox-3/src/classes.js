import * as h from "./helper.js";
class Style {
    constructor (fillColor="none",strokeColor="",strokeWidth=0){
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    };

    print = () => `fill:${this.fillColor};stroke:${this.strokeColor};stroke-width:${this.strokeWidth};`;
}

class Path {
    rect = () => `M 0 0 h 1 v 1 h -1 z`;
    tri = () => `M 0 0 h 1 l -0.5 1 z`;

    constructor(id="path-instance",shape=this.rect){
        this.id = id;
        this.d = shape();
    };

    print = () => `<path id=${this.id} d="${this.d}" />`;
}
class Polyline {
    rect = (skewX=0,skewY=0) => `0,0 1,0 1,1 0,1 0,0`;
    tri = (skewX=0,skewY=0) => `1,0 0,5,1 0,0`;

    constructor(id="polyline-instance",shape=this.rect){
        this.id = id;
        this.points = shape();
    };

    print = () => `<polyline id=${this.id} points="${this.points}`;
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

class Group {
    constructor(id,style,elements,translation,rotation,scaling) {
        this.id = id;
        this.style = style;
        this.elements = elements;
        this.translation = translation;
        this.rotation = rotation;
        this.scaling = scaling;
    }

    print = () => `<g id=${this.id} transform='${this.translation.format()} ${this.rotation.format()} ${this.scaling.format()}' style=${this.style.print()}>
                ${this.elements.join(" ")}
            </g>`;
}

export {Style,Translation,Rotation,Scaling,Path,Polyline,Group};