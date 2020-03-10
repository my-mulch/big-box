import Tensor from '../../tensor/index.mjs'
import TensorOperation from '../interface.mjs'

export default class LinearAlgebraOperation extends TensorOperation {
    constructor(args) {
        super(args)

        /** Dimensions */
        this.rows = this.of.header.shape[0]
        this.cols = this.with.header.shape[1] || this.of.header.shape[1]
        this.like = this.of.header.shape[1]
        this.size = this.rows
    }

    /** Resultant Tensor */
    resultant() { return Tensor.zerosLike(this.of) }

    /** Pointwise Source Implementation */
    pointwiseSourceBoilerplate() { }
    pointwiseSourceTemplate() {
        this.start()

        for (this.r = 0; this.r < this.rows; this.r++)
            for (this.c = 0; this.c < this.cols; this.c++)
                this.inLoop()

        this.finish()
    }

    /** (TODO) Symbolic Source Implementation */
    symbolicSourceBoilerplate() { }
    symbolicSourceTemplate() { }
}

