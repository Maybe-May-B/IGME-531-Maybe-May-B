interface ShapeInterface {
    rect: () => string,
    tri: () => string,
}
interface TransformInterface {
    change: () => void,
    format: () => string
}
interface TagInterface {
    id: string,
    print: () => string
}
export {ShapeInterface,TransformInterface,TagInterface};