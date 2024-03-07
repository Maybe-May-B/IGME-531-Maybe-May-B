import * as h from "./helper.js";
//property classes
class Style {
    constructor (properties={}){
        this.style = ``;
        for (const key in properties) {
            this.style += `${key}:${properties[key]};`;
        }
    };

    print = () => this.style;
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
    rect = () => [{type:`M`,points:[0,0]},{type:`h`,points:[1]},{type:`v`,points:[1]},{type:`h`,points:[-1]},{type:`z`,points:[]}];
    tri = () => [{type:`M`,points:[0,0]},{type:`h`,points:[1]},{type:`l`,points:[-0.5,1]},{type:`z`,points:[]}];
    line = () => [{type:`M`,points:[0,0]},{type:`h`,points:[1]}];
    polygon = (sides) => {
        let points = [];
        let theta = (2.0 * Math.PI)/sides;
        points.push({type:`M`,points:[Math.cos(0),Math.sin(0)]});
        for(let i=1;i<sides;i++){
            points.push({type:`L`,points:[h.round(Math.cos(theta*i),3),h.round(Math.sin(theta*i),3)]});
        }
        points.push({type:`z`,points:[]});
        return points;
    }
    web = (points,ends) => {
        let web = [];
        let closestPoint;
        let connectedPoints;
        for(let i=0; i<ends.length;i++){
            web.push([{type:`M`,points:[ends[i].x,ends[i].y]}]);
            closestPoint = points[h.closestPoint(points,ends[i])];
        }
    }

    constructor(id="path-instance",shape=this.rect()){
        this.id = id;
        this.d = shape;
    };
    validate = (data) => typeof(data.type) == `string` && typeof(data.points) == `object`;
    draw = () => {
        let pointsList = ``;
        for (let i = 0; i < this.d.length; i++) {
            pointsList += `${this.d[i].type} ${this.d[i].points.join(` `)} `;
        }
        return pointsList;
    }
    print = () => `<path id=${this.id} d="${this.draw()}" />`;
}
class Polyline {
    //basic shapes
    rect = () => [{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1}];
    tri = () => [{x:0,y:0},{x:1,y:0},{x:0.5,y:1}];
    line = () => [{x:0,y:0}, {x:1,y:0}];
    polygon = (sides) => {
        let points = [];
        let theta = (2.0 * Math.PI)/sides;
        for(let i=0;i<sides;i++){
            points.push({x:(Math.cos(theta*i)+1)*0.5,y:(Math.sin(theta*i)+1)*0.5});
        }
        return points;
    }
    polyline = (start,end,sides) => {
        let dx = (end.x-start.x)/sides;
        let dy = (end.y-start.y)/sides;
        let line = [];
        line.push(start);
        for(let i=1; i<sides-1;i++){
            line.push({x:start.x+(dx*i),y:start.y+(dy*i)});
        }
        line.push(end);
        return line;
    }

    constructor(id="polyline-instance",shape=this.rect(),closed=true){
        this.id = id;
        this.points = shape;
        this.closed = closed;
    };
    validate = (point) => typeof(point.x) == `number` && typeof(point.y) == `number`;
    draw = () => {
        let pointsList = ``;
        let length = this.points.length;
        for (let i = 0; i < length; i++) {
            pointsList += `${this.points[i].x},${this.points[i].y} `;
        }
        if(this.closed){
            pointsList += `${this.points[0].x},${this.points[0].y}`;
        }
        return pointsList;
    };
    print = () => `<polyline id=${this.id} points="${this.draw()}" />`;
}
class Group {
    constructor(id,style,elements,transforms) {
        this.id = id;
        this.style = style;
        this.elements = elements;
        this.transforms = transforms;
    }

    print = () => {
        let transform = ``;
        let elementList = ``;
        this.transforms.forEach(element => {transform += element.format()+` `});
        this.elements.forEach(element => {elementList += element.print()});

        return `<g id=${this.id} transform='${transform}' style=${this.style.print()}>
                ${elementList}
            </g>`
    };
}

export {Style,Translation,Rotation,Scaling,Path,Polyline,Group};