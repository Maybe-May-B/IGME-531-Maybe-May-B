const params = {
    translation: {
        x: 3,
        y: 3
    },
    rotation: {
        x: 0,
        y: 0,
        angle: 0,
        goingClockwise: true
    },
    scaling: {
        x: 1,
        y: 1
    }
};

const changeTranslation = (x,y=x) => {
    params.translation.x = x;
    params.translation.y = y;
    return {x,y};
};
const changeRotation = (x,y,angle,goingClockwise) => {
    params.rotation.x = x;
    params.rotation.y = y;
    params.rotation.angle = angle;
    params.rotation.goingClockwise = goingClockwise;
    return {x,y,angle,goingClockwise};
};
const changeScaling = (x,y=x) => {
    params.scaling.x = x;
    params.scaling.y = y;
    return {x,y};
};
//formats instruction to scale
const translate = () => {
    return `translate(${params.translation.x},${params.translation.y})`;
};
//formats instructions to rotate
const rotate = () => {
    let angle = params.rotation.angle;
    if(!params.rotation.goingClockwise){
        angle = 360 - angle;
    }
    return `rotate(${angle},${params.rotation.x},${params.rotation.y})`;
};
//formats instructions to scale
const scale = () => {
    return `scale(${params.scaling.x},${params.scaling.y})`;
};
const skew = (onlyAdd,value,range=10) => {
    value += Math.random() * range;
    if(!onlyAdd){
        value -= range/2;
    };
    return value;
}

export {params,translate,rotate,scale,skew,changeTranslation,changeRotation,changeScaling};