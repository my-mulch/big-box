import nd from '../ndarray'

const points = {
    origin: nd.array([100, 200, 300, 1]),
    attention: nd.array([600, 400, 0, 1]),
}

console.log(points.origin.subtract(points.attention).norm())
