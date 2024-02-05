import * as i from './interfaces';

class Style {
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    opacity: number;
    constructor (fillColor: string,strokeColor: string ="",strokeWidth: number =0,opacity: number =1){
        Object.assign(this,fillColor,strokeColor,strokeWidth,opacity);
    }
    print(){
        return `fill:${this.fillColor};stroke:${this.strokeColor};stroke-width:${this.strokeWidth};opacity:${this.opacity}`;
    }
}

class Path implements i.ShapeInterface, i.TagInterface{
    id: string;
    d: string;

    constructor(id: string ="",shape =function filler(){""}){
        this.id = id;
        this.d = `M 0 0 ${shape()}`;
    }

    rect: () => `h 1 
        v 1 
        h -1 
        z;`;
    tri: () => `h 1 
        l -0.5 1
        z`;
    print() {
        return `<path id=${this.id} d="${this.d}" />`;
    };
}
class Polyline implements i.ShapeInterface, i.TagInterface{
    id: string;
    points: string;

    constructor();
    constructor(id?,shape?){
        this.id = id;
        this.points = `0,0 ${shape()}`;
    };

    rect: () => `1,0 
        1,1 
        0,1 
        0,0`;
    tri: () => `1,0 
    0,5,1 
    0,0`;
    print() {
        return `<polyline id=${this.id} points="${this.points}`;
    };
}

class Translation implements i.TransformInterface {
    x: number;
    y: number;

    constructor(x=0,y=x){
        Object.assign(this,x,y);
    };

    change(x?,y?) {
        Object.assign(this,x,y);
    };
    format() {
        return `translate(${this.x},${this.y})`;
    };
}
class Rotation implements i.TransformInterface {
    angle: number;
    rx: number;
    ry: number;
    goingClockwise: boolean;

    constructor(angle=0,rx=0.5,ry=rx,goingClockwise=true){
        Object.assign(this,angle,rx,ry,goingClockwise);
        this.checkAngle();
    };

    checkAngle(){
        if(!this.goingClockwise){
            this.angle = 360 - this.angle;
        };
    };
    change(angle?,rx?,ry?,goingClockwise?){
        Object.assign(this,angle,rx,ry,goingClockwise);
        this.checkAngle();
    };
    format(){
        return `rotate(${this.angle},${this.rx},${this.ry})`;
    };
}
class Scaling implements i.TransformInterface{
    width: number;
    height: number;

    constructor(width=1,height=width){
        Object.assign(this,width,height);
    };

    change(width?,height?){
        Object.assign(this,width,height);
    };
    format(){
        return `scale(${this.width},${this.height})`;
    }
}

class Group implements i.TagInterface{
    id: string;
    style: Style;
    elements: [string];
    translation: Translation;
    rotation: Rotation;
    scaling: Scaling;

    constructor(id,style,elements,translation,rotation,scaling) {
        Object.assign(this,id,style,elements,translation,rotation,scaling);
    }

    print(){
        return `<g id=${this.id} transform='${this.translation.format()} ${this.rotation.format()} ${this.scaling.format()}' style=${this.style}>
            ${this.elements.join(" ")}
        </g>`;
    };
}

export {Style,Translation,Rotation,Scaling,Path,Polyline,Group};