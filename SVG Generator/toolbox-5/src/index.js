/*
  # Demo code for L-systems
*/


// ## An L-System needs...
// variables, constants (alphabet)
// rules (production rules)
// a way to expand a string through iteration
// way to interpret string into visual 

// ## The dragon curve drawn using an L-system.
// variables : F G
// constants : + −
// start  : F
// rules  : (F → F+G), (G → F-G)
// angle  : 90°
let alphabet = ['X', 'F'];
const axiom = 'X';
const rules = {
  'X': 'F+[[X]-X]-F[-FX]+X',
  'F': 'FF'
};

const iterate_once = (lindenmayerString) => {
  let newString = '';
  for (let i = 0; i < lindenmayerString.length; i++) {
    const result = rules[lindenmayerString[i]];
    newString += result || lindenmayerString[i];
  }
  return newString;
}

const iterateNTimes = (n, lindenmayerString) => {
  let newString = lindenmayerString;
  for (let i = 0; i < n; i++) {
    newString = iterate_once(newString);
  }
  return newString;
};

const makeVisual = (options, lindenmayerString) => {
  let theSvgString = '';
  
  // Basically constants
  let angle = (options.angle || 25) * Math.PI / 180;
  let startingPoint = options.startingPoint || [0, 0];
  let lineLength = options.lineLength || 10;

  // State
  let rotation = Math.PI*3/2;
  let points = [startingPoint];
  let stack = [];

  const moveForward = () => {
    const lastPoint = points[points.length - 1];

    const dx = Math.cos(rotation) * lineLength;
    const dy = Math.sin(rotation) * lineLength;

    points.push([lastPoint[0] + dx, lastPoint[1] + dy]);
  };

  const whatToDo = {
    'X': () => {
      return;
    },
    'F': () => {
      return moveForward();
    },
    '+': () => {
      rotation = rotation - angle;
    },
    '-': () => {
      rotation = rotation + angle;
    },
    '[': () => {
      stack.push([points[points.length - 1],rotation]);
    },
    ']': () => {
      let popped = stack.pop();
      points.push(popped[0]);
      rotation = popped[1];
    }
  };

  for (let i = 0; i < lindenmayerString.length; i++) {
    const toDo = whatToDo[lindenmayerString[i]];
    toDo();
  }

  // return a path moving through all the points
  return `<polyline points="${points.join(' ')}" 
                    fill="none" stroke="black" 
                    stroke-width="0.2px"/>`;
  
};

const expanded = iterateNTimes(5, axiom);

const result = makeVisual({
  lineLength: 1.5,
  angle: 25,
  startingPoint: [0, 0]
}, expanded);

// get result into the svg in the dom
const svg = document.querySelector('svg');
svg.innerHTML = result;

// let oneStep = iterate_once(axiom);
// debugger;