import * as c from "./classes.js";
import * as h from "./helper.js";

let shapeInstance, styleInstance;
const init = () => {
    shapeInstance = new c.Shape();
    styleInstance = new c.Style();

    const rules = {
        'a':'bacab',
        'b':'bb',
    };
    const results = {
        'a': () => {},
        'b': () => {},
        'c': () => {}
    };
    const properties = {
        sides: 0,
        scale: 100
    };
    let fractal = new c.Fractal(rules,'a',results,properties);
    for(let i=1; i<= 5;i++){
        console.log(fractal.iterate(i));
        fractal.reset();
    }
}

const drawFractal = () => {
    const rules = {
        'l':'ltltl',
        't':'ttt'
    };
    const results = {
        'l': () => {
            //
        },
        't': () => {
            this.angle += 90;
            this.angle = this.angle % 360;
        }
    };
    const properties = {
        //
    };
    let fractal = new c.Fractal(rules,"ltltltl");
}


export {init};