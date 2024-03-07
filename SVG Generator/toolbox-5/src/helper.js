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
//checks if a given point lies on a line. Assumes that all points are collinear
const onLine = (line,point) => point.x <= Math.max(line[0].x,line[1].x) &&
    point.x >= Math.min(line[0].x,line[1].x) &&
    point.y <= Math.max(line[0].y,line[1].y) &&
    point.y >= Math.min(line[0].y,line[1].y);
//gets the orientation of an array of three points
const getOrientation = (points) => {
    const slope1 = (points[1].y-points[0].y)*(points[2].x-points[1].x);
    const slope2 = (points[2].y-points[1].y)*(points[1].x-points[0].x);
    if(slope2==slope1){
        return `collinear`;
    }
    else if(slope1 > slope2){
        return `clockwise`;
    }
    else {
        return `counterclockwise`;
    }
}
const getIntersect = (points) => {
    let orientations = [getOrientation([points[0],points[1],points[2]]),
        getOrientation([points[0],points[1],points[3]]),
        getOrientation([points[2],points[3],points[0]]),
        getOrientation([points[2],points[3],points[1]])];
    if ((orientations[0] != orientations[1] && orientations[2] != orientations) || 
        (orientations[0] == `collinear` && onLine([points[0],points[1]],points[2])) || 
        (orientations[1] == `collinear` && onLine([points[0],points[1]],points[3])) || 
        (orientations[2] == `collinear` && onLine([points[2],points[3]],points[0])) || 
        (orientations[3] == `collinear` && onLine([points[2],points[3]],points[1]))){

        }
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
const insideShape = (shape,point) =>{
    let inside = false;
    for(let i=0, j=shape.length; i < shape.length; j=i++){
        if(onLine([shape[i],shape[j]],point)){
            inside = !inside;
        }
    }
    return inside;
}
export{random,floorArray,findElement,perlin,round,getIntersect,closestPoint,inRange,insideShape};