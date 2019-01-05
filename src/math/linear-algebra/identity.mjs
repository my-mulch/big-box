import { sum, min } from '../elementwise'

export default function identity({ R }) {
    const diagonal = R.header.strides.reduce(sum)
    const numDiags = R.header.shape.reduce(min)

    for (let i = 0; i < numDiags; i += diagonal)
        result[i] = 1
}
