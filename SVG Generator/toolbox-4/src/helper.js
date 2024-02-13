//creates a random number between the given min and max values
const random = (min,max) => {
    return Math.random() * (max + Math.abs(min)) - Math.abs(min);
}
//floors each element in a given arraay
const floorArray = array => {
    array.forEach(element => {element = Math.floor(element)});
    return array;
}
const getLength = array => {
    let length = 0;
    array.forEach(element => length++);
    return length;
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

export{random,getLength,floorArray,perlin};