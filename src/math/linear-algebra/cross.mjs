export default function cross({ A, B, R }) {
    R.data[0] = A.data[1 + A.header.offset] * B.data[2 + B.header.offset] - A.data[2 + A.header.offset] * B.data[1 + B.header.offset]
    R.data[1] = A.data[2 + A.header.offset] * B.data[0 + B.header.offset] - A.data[0 + A.header.offset] * B.data[2 + B.header.offset]
    R.data[2] = A.data[0 + A.header.offset] * B.data[1 + B.header.offset] - A.data[1 + A.header.offset] * B.data[0 + B.header.offset]

    return R
}