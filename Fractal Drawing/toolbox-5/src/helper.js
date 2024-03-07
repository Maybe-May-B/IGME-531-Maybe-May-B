//creates a random number between the given min and max values
const random = (min,max) => {
    return Math.random() * (max + Math.abs(min)) - Math.abs(min);
}
//gets length between two points
const getAmplitude = (points) => {
    return Math.sqrt(Math.pow(points[1].x-points[0].x,2)+Math.pow(points[1].y-points[0].y,2));
}
//floors each element in a given array
const floorArray = array => {
    array.forEach(element => {element = Math.floor(element)});
    return array;
}
const findElement = (array,element) => {
    for (let i = 0; i < array.length; i++) {
        if(array[i] == element){
            return i;
        }
    }
    return -1;
}
//alters a value by a random value within a given amplitude
const perlin = (currentValue,recursions,amplitude,floor=-Number.MAX_VALUE,roof=Number.MAX_VALUE) => {
    let array = [];
    for(let i=0; i<recursions; i++){
        currentValue += random(-amplitude,amplitude);
        if(currentValue <= floor){
            currentValue = floor;
            currentValue += random(0,amplitude);
        }
        else if(currentValue >= roof){
            currentValue = roof;
            currentValue -= random(0,amplitude);
        }
        array.push(currentValue);
    }
    return array;
}
//rounds a number to a given decimal place
const round = (value,decimals=0) => {
    value = Math.round(value * Math.pow(10,decimals));
    return value/Math.pow(10,decimals);
}
const closestPoint = (array,point) => {
    let distance = 20;
    let currentDistance;
    let distanceIndex = -1;
    for(let i=0; i<array.length;i++){
        currentDistance = Math.sqrt(Math.pow(array[i].x-point.x,2)+Math.pow(array[i].y-point.y,2));
        if (currentDistance < distance){
            distanceIndex = i;
            distance = currentDistance;
        }
    }
    return distanceIndex;
}
const inRange = (array,point,range) => {
    let points = [];
    for(let i=0; i < array.length;i++){
        if(getAmplitude([point,array[i]]) <= range && array[i] != point){
            points.push(array[i]);
        }
    }
    return points;
}
export{random,floorArray,findElement,perlin,round,closestPoint,inRange};