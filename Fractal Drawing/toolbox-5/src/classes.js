//#region value classes
class Point {
    constructor(x=0,y=x){
        this.x = x;
        this.y = y;
        this.amplitude = Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
    };

    normalize = () => new Point(this.x/this.amplitude, this.y/this.amplitude);
}
class Shape {
    rect = () => [new Point(0,0),new Point(1,0),new Point(1,1),new Point(0,1)];
    tri = () => [new Point(0,0),new Point(1,0),new Point(0.5,1)];
    line = () => [new Point(0,0),new Point(1,0)];
    polygon = (sides) => {
        let points = [];
        let theta = (2.0 * Math.PI)/sides;
        for(let i=0;i<sides;i++){
            points.push(new Point((Math.cos(theta*i)+1)*0.5,(Math.sin(theta*i)+1)*0.5));
        }
        return points;
    }
    
    constructor(points = [],closed = true){
        this.points = points;
        this.closed = closed;
        if(this.closed && this.points.length >= 3){
            this.points.push(this.points[0]);
        }
    }

    add = (point) => {
        this.points.push(point);
        if(this.closed && this.points.length >= 3){
            this.points.splice(this.points.length - 2, 1);
            this.points.push(this.points[0]);
        }
    }
    remove = (index) => {
        this.points.splice(index,1);
    }
    max = (property,roof) => {
        let max = roof;
        this.points.forEach(point => {
            if(point[property] > max){
                max = point[property];
            }
        });
        return max;
    }
    min = (property,roof) => {
        let min = roof;
        this.points.forEach(point => {
            if(point[property] < min){
                min = point[property];
            }
        });
        return min;
    }
    last = () => {
        return this.points[this.points.length-1];
    }
}
class Fractal {
    constructor(rules,axiom,results,properties){
        this.rules = rules;
        this.axiom = axiom;
        this.string = axiom;
        for (const method in results) {
            this[method] = results[method];
        }
        for (const property in properties) {
            this[property] = properties[property];
        }
    }

    iterate = (iterations) => {
        for(let i=0; i<iterations;i++){
            let iteratedString = '';
            for(let char=0; char<this.string.length;char++){
                iteratedString += this.rules[this.string[char]] || this.string[char];
            }
            this.string=iteratedString;
        }
        return this.string;
    }
    reset = () => this.string = this.axiom;
    interpret = () => {
        for(let i=0; i<this.string.length;i++){
            this.current = this[this.string[i]];
            this.current();
        }
    }
}
//#endregion

//#region tag classes
class Canvas {
    constructor(id,properties,elements,elementProperties){
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.elements = elements;
        
        this.canvas.id = id;
        for (const property in properties) {
            this.canvas[property] = properties[property];
        }
        for (const property in elementProperties) {
            this.ctx[property] = elementProperties[property];
        }
    }
    draw = (shapes = this.elements) => {
        shapes.forEach(element=> {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.moveTo(element.points[0].x,element.points[0].y);
            for(let i=1; i < element.points.length; i++){
                this.ctx.lineTo(element.points[i].x,element.points[i].y);
            }
            this.ctx.stroke();
            //this.ctx.fill();
            this.ctx.closePath();
            this.ctx.restore();
        });
    }
    print = destination => {
        destination.append(this.canvas);
    }
}
//#endregion

export {Point,Shape,Fractal,Canvas};