const random = (min,max) => {
    return Math.random() * (max + Math.abs(min)) - Math.abs(min);
}

export{random};