
class ElementWiseUtils {

    static axisWiseWorker_NN(index = 0, k = 0) {
        if (k === axis.shape.length)
            for (let j = 0; j < result.header.shape.length; j++)
                result.data[j] = reducer(mapper(A.data[index]), result.data[j])

        for (let i = 0; i < axis.shape.length; i++)
            worker(index + i * axis.strides[j], k + 1)
    }

    static axisWiseWorker_11(A, R) {
        for (let r0 = 0; r0 < R.header.shape[0]; r0++)
            for (let a0 = 0; a0 < A.header.shape[0]; a0++) {
                const /** Compute index for R and A */
                    rI = R.header.offset + r0 * R.header.strides[0],
                    aI = A.header.offset + a0 * A.header.strides[0]

                R.data[rI] = reducer(mapper(A.data[aI]), R.data[rI])
            }
    }


    static axisWiseWorker_12(A, R) {
        for (let r0 = 0; r0 < R.header.shape[0]; r0++)
            for (let a0 = 0; a0 < A.header.shape[0]; a0++)
                for (let a1 = 0; a1 < A.header.shape[1]; a1++) {
                    const /** Compute index for R and A */
                        rI = R.header.offset + r0 * R.header.strides[0],
                        aI = A.header.offset + a0 * A.header.strides[0] + a1 * A.header.strides[1]

                    R.data[rI] = reducer(mapper(A.data[aI]), R.data[rI])
                }
    }

    static axisWiseWorker_13(A, R) {
        for (let r0 = 0; r0 < R.header.shape[0]; r0++)
            for (let a0 = 0; a0 < A.header.shape[0]; a0++)
                for (let a1 = 0; a1 < A.header.shape[1]; a1++)
                    for (let a2 = 0; a2 < A.header.shape[2]; a2++) {
                        const /** Compute index for R and A */
                            rI = R.header.offset + r0 * R.header.strides[0],
                            aI = A.header.offset + a0 * A.header.strides[0] + a1 * A.header.strides[1] + a2 * A.header.strides[2]

                        R.data[rI] = reducer(mapper(A.data[aI]), R.data[rI])
                    }
    }

    static axisWiseWorker_14(A, R) {
        for (let r0 = 0; r0 < R.header.shape[0]; r0++)
            for (let a0 = 0; a0 < A.header.shape[0]; a0++)
                for (let a1 = 0; a1 < A.header.shape[1]; a1++)
                    for (let a2 = 0; a2 < A.header.shape[2]; a2++)
                        for (let a3 = 0; a3 < A.header.shape[3]; a3++) {
                            const /** Compute index for R and A */
                                rI = R.header.offset + r0 * R.header.strides[0],
                                aI = A.header.offset + a0 * A.header.strides[0] + a1 * A.header.strides[1] + a2 * A.header.strides[2] + a3 * A.header.strides[3]

                            R.data[rI] = reducer(mapper(A.data[aI]), R.data[rI])
                        }
    }


    static axisWiseWorker_21(A, R) {
        for (let r0 = 0; r0 < R.header.shape[0]; r0++)
            for (let r1 = 0; r1 < R.header.shape[1]; r1++)
                for (let a0 = 0; a0 < A.header.shape[0]; a0++) {
                    const /** Compute index for R and A */
                        rI = R.header.offset + r0 * R.header.strides[0] + r1 * R.header.strides[1],
                        aI = A.header.offset + a0 * A.header.strides[0]

                    R.data[rI] = reducer(mapper(A.data[aI]), R.data[rI])
                }
    }

    static axisWiseWorker_22(A, R) {
        for (let r0 = 0; r0 < R.header.shape[0]; r0++)
            for (let r1 = 0; r1 < R.header.shape[1]; r1++)
                for (let a0 = 0; a0 < A.header.shape[0]; a0++)
                    for (let a1 = 0; a1 < A.header.shape[1]; a1++) {
                        const /** Compute index for R and A */
                            rI = R.header.offset + r0 * R.header.strides[0] + r1 * R.header.strides[1],
                            aI = A.header.offset + a0 * A.header.strides[0] + a1 * A.header.strides[1]

                        R.data[rI] = reducer(mapper(A.data[aI]), R.data[rI])
                    }
    }

    static axisWiseWorker_23(A, R) {
        for (let r0 = 0; r0 < R.header.shape[0]; r0++)
            for (let r1 = 0; r1 < R.header.shape[1]; r1++)
                for (let a0 = 0; a0 < A.header.shape[0]; a0++)
                    for (let a1 = 0; a1 < A.header.shape[1]; a1++)
                        for (let a2 = 0; a2 < A.header.shape[2]; a2++) {
                            const /** Compute index for R and A */
                                rI = R.header.offset + r0 * R.header.strides[0] + r1 * R.header.strides[1],
                                aI = A.header.offset + a0 * A.header.strides[0] + a1 * A.header.strides[1] + a2 * A.header.strides[2]

                            R.data[rI] = reducer(mapper(A.data[aI]), R.data[rI])
                        }
    }

    static axisWiseWorker_24(A, R) {
        for (let r0 = 0; r0 < R.header.shape[0]; r0++)
            for (let r1 = 0; r1 < R.header.shape[1]; r1++)
                for (let a0 = 0; a0 < A.header.shape[0]; a0++)
                    for (let a1 = 0; a1 < A.header.shape[1]; a1++)
                        for (let a2 = 0; a2 < A.header.shape[2]; a2++)
                            for (let a3 = 0; a3 < A.header.shape[3]; a3++) {
                                const /** Compute index for R and A */
                                    rI = R.header.offset + r0 * R.header.strides[0] + r1 * R.header.strides[1],
                                    aI = A.header.offset + a0 * A.header.strides[0] + a1 * A.header.strides[1] + a2 * A.header.strides[2] + a3 * A.header.strides[3]

                                R.data[rI] = reducer(mapper(A.data[aI]), R.data[rI])
                            }
    }

    static axisWiseWorker_31(A, R) {
        for (let r0 = 0; r0 < R.header.shape[0]; r0++)
            for (let r1 = 0; r1 < R.header.shape[1]; r1++)
                for (let r2 = 0; r2 < R.header.shape[2]; r2++)
                    for (let a0 = 0; a0 < A.header.shape[0]; a0++) {
                        const /** Compute index for R and A */
                            rI = R.header.offset + r0 * R.header.strides[0] + r1 * R.header.strides[0] + r2 * R.header.strides[0],
                            aI = A.header.offset + a0 * A.header.strides[0]

                        R.data[rI] = reducer(mapper(A.data[aI]), R.data[rI])
                    }
    }

    static axisWiseWorker_32(A, R) {
        for (let r0 = 0; r0 < R.header.shape[0]; r0++)
            for (let r1 = 0; r1 < R.header.shape[1]; r1++)
                for (let r2 = 0; r2 < R.header.shape[2]; r2++)
                    for (let a0 = 0; a0 < A.header.shape[0]; a0++)
                        for (let a1 = 0; a1 < A.header.shape[1]; a1++) {
                            const /** Compute index for R and A */
                                rI = R.header.offset + r0 * R.header.strides[0] + r1 * R.header.strides[0] + r2 * R.header.strides[0],
                                aI = A.header.offset + a0 * A.header.strides[0] + a1 * A.header.strides[0]

                            R.data[rI] = reducer(mapper(A.data[aI]), R.data[rI])
                        }
    }

    static axisWiseWorker_33(A, R) {
        for (let r0 = 0; r0 < R.header.shape[0]; r0++)
            for (let r1 = 0; r1 < R.header.shape[1]; r1++)
                for (let r2 = 0; r2 < R.header.shape[2]; r2++)
                    for (let a0 = 0; a0 < A.header.shape[0]; a0++)
                        for (let a1 = 0; a1 < A.header.shape[1]; a1++) {
                            const /** Compute index for R and A */
                                rI = R.header.offset + r0 * R.header.strides[0] + r1 * R.header.strides[0] + r2 * R.header.strides[0],
                                aI = A.header.offset + a0 * A.header.strides[0] + a1 * A.header.strides[0]

                            R.data[rI] = reducer(mapper(A.data[aI]), R.data[rI])
                        }
    }

}