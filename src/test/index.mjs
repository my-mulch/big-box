import nd from '../ndarray'

const A = nd.random.randint(1, 10, [3, 3])
const B = nd.inv(A)

console.log(A)
console.log()
console.log(B.dot(A).round(2))