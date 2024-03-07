import * as c from "./classes.js";
import * as h from "./helper.js";

let pathInstance,polylineInstance,translationInstance,rotationInstance,scalingInstance,styleInstance;
const init = () => {
    pathInstance = new c.Path();
    polylineInstance = new c.Polyline();
    translationInstance = new c.Translation(100,100);
    rotationInstance = new c.Rotation();
    scalingInstance = new c.Scaling(100,100);
    styleInstance = new c.Style({fill:"red",stroke:"red",'stroke-width':0});
    drawContinent(100,10,10,10,{x:300,y:300},{x:100,y:100});
}

const drawContinent = (continentSides,countrySides,premadeCountries,amplitude,dimensions,margins) => {
    let next = 0;
    let continentPoints = polylineInstance.polygon(continentSides);
    let countryPoints = [];
    let connectingPoints = [];
    let allPoints = [];
    let elements = [];
    let style = new c.Style({fill:'none',stroke:'white','stroke-width':5/Math.max(dimensions.x,dimensions.y)});
    let translating = new c.Translation(margins.x,margins.y);
    let scaling = new c.Scaling(dimensions.x,dimensions.y);
    let xSkews = h.perlin(0,continentSides,amplitude/dimensions.x);
    let ySkews = h.perlin(0,continentSides,amplitude/dimensions.y);
    let body = document.querySelector("body");

    for(let i=0; i< continentPoints.length; i++){
        continentPoints[i].x += xSkews[i];
        continentPoints[i].y += ySkews[i];
    }

    let continent = new c.Polyline("continent",[continentPoints[next]]);
    continentPoints.splice(next,1);
    while(continent.points.length < continentSides){
        let current = continent.points[continent.points.length-1];
        next = h.closestPoint(continentPoints,current);
        continent.points.push(continentPoints[next]);
        continentPoints.splice(next,1);
    }
    elements.push(continent);
    allPoints = allPoints.concat(continent.points);

    let xTranslations = h.perlin(0,premadeCountries,dimensions.x/premadeCountries);
    let yTranslations = h.perlin(0,premadeCountries,dimensions.y/premadeCountries);
    let countryScaling = new c.Scaling(1/premadeCountries);
    for(let i = 0; i < premadeCountries; i++){
        xSkews = h.perlin(0,countrySides,amplitude/(dimensions.x*2));
        ySkews = h.perlin(0,countrySides,amplitude/(dimensions.y*2));
        countryPoints.push(polylineInstance.polygon(countrySides));
        for(let j=0; j < countrySides; j++){
            countryPoints[i][j].x += xSkews[j];
            countryPoints[i][j].y += ySkews[j];
        }
        next = 0;
        let country = new c.Polyline(`country-${i+1}`,[countryPoints[i][next]]);
        countryPoints[i].splice(next,1);
        while(country.points.length < countrySides){
            let current = country.points[country.points.length-1];
            next = h.closestPoint(countryPoints[i],current);
            country.points.push(countryPoints[i][next]);
            countryPoints[i].splice(next,1);
        }
        let currentTranslation = new c.Translation(xTranslations[i],yTranslations[i]);
        elements.push(new c.Group(`country-${i+1}`,style,[country],[currentTranslation,countryScaling]));
    }
    console.log(elements);
    /*let xValues = [];
    let yValues = [];
    continent.points.forEach(element => {
        xValues.push(element.x);
        yValues.push(element.y);
    });
    for(let i=0; i<innerPoints; i++){
        borderPoints.push({x:h.random(Math.min(...xValues),Math.max(...xValues)),
            y:h.random(Math.min(...yValues),Math.max(...xValues))});
    }
    console.log(borderPoints);*/
    let group = new c.Group("group-1",style,elements,[translating,scaling]);
    body.innerHTML = `<svg id="svg-1" 
        height="650" 
        width="1000" style="background-color:black">
            ${group.print()}
        </svg>`;
}

export {init};