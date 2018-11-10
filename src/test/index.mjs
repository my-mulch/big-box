import nd from '../ndarray'


const a = nd.array([3, 4, 5])
const b = nd.array([4, 3, 5])
const c = nd.array([-5, -12, -13])

console.log(nd.cross(a, b))

// A x B: 5, 5, -7