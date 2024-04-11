import * as c from "./classes.js";

const init = () => {
    drawFractal(new c.Point(300,300),{width:1500,height:600},"black",1,5,12);
}

const drawFractal = (start,dimensions,color,lineWidth,length,iterations) => {
    const canvas = new c.Canvas('fractal-canvas',dimensions,[new c.Shape([],false)],{strokeStyle:color,lineWidth:lineWidth});
    const rules = {
        'l':'ll',
        'u':'ulu'
    };
    const results = {
        'l': () => {
            if(fractal.point.x + fractal.length > fractal.dimensions.width || fractal.point.x - fractal.length < 0){
                fractal.direction.x *= -1;
            }
            fractal.point.x += fractal.length * fractal.direction.x;
            fractal.canvas.elements[0].add(new c.Point(fractal.point.x,fractal.point.y));
        },
        'u': () => {
            if(fractal.point.y + fractal.length > fractal.dimensions.height || fractal.point.y - fractal.length < 0){
                fractal.direction.y *= -1;
            }
            fractal.point.y += fractal.length * fractal.direction.y;
            fractal.canvas.elements[0].add(new c.Point(fractal.point.x,fractal.point.y));
        },
        'o': () => {
            fractal.canvas.elements[0].add(new c.Point(fractal.point.x,fractal.point.y));
        },
        'd': () => {
            fractal.canvas.draw();
            fractal.canvas.print(document.querySelector('body'));
        }
    };
    const properties = {
        canvas: canvas,
        length:length,
        point: start,
        dimensions:dimensions,
        direction:{x:1,y:-1}
    };
    let fractal = new c.Fractal(rules,"oud",results,properties);
    fractal.iterate(iterations);
    fractal.interpret();
}


export {init};