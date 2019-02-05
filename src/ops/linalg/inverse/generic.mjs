export default function (args) {
    const dim = Math.floor(Math.sqrt(args.result.data.length))
    const copy = args.of.copy()
    // Perform elementary row operations
    for (let i = 0; i < dim; i += 1) {
        // get the element e on the diagonal
        let e = copy.data[copy.header.offset + i * copy.header.strides[0] + i];

        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        if (e == 0) {
            //look through every row below the i'th row
            for (ii = i + 1; ii < dim; ii += 1) {
                //if the ii'th row has a non-0 in the i'th col
                if (copy.data[copy.header.offset + ii * copy.header.strides[0] + i] != 0) {
                    //it would make the diagonal have a non-0 so swap it
                    for (j = 0; j < dim; j++) {
                        e = copy.data[copy.header.offset + i * copy.header.strides[0] + j];       //temp store i'th row
                        copy.data[copy.header.offset + i * copy.header.strides[0] + j] = copy.data[copy.header.offset + ii * copy.header.strides[0] + j];//replace i'th row by ii'th
                        copy.data[copy.header.offset + ii * copy.header.strides[0] + j] = e;      //repace ii'th by temp
                        e = args.result.data[i * dim + j];       //temp store i'th row
                        args.result.data[i * dim + j] = args.result.data[ii * dim + j];//replace i'th row by ii'th
                        args.result.data[ii * dim + j] = e;      //repace ii'th by temp
                    }
                    //don't bother checking other rows since we've swapped
                    break;
                }
            }
            //get the new diagonal
            e = copy.data[copy.header.offset + i * copy.header.strides[0] + i];
            //if it's still 0, not invertable (error)
            if (e == 0) { return }
        }

        // Scale this row down by e (so we have a 1 on the diagonal)
        for (let j = 0; j < dim; j++) {
            copy.data[copy.header.offset + i * copy.header.strides[0] + j] = copy.data[copy.header.offset + i * copy.header.strides[0] + j] / e; //apply to original matrix
            args.result.data[i * dim + j] = args.result.data[i * dim + j] / e; //apply to identity
        }

        // Subtract this row (scaled appropriately for each row) from ALL of
        // the other rows so that there will be 0's in this column in the
        // rows above and below this one
        for (let ii = 0; ii < dim; ii++) {
            // Only apply to other rows (we want a 1 on the diagonal)
            if (ii == i) { continue; }

            // We want to change this element to 0
            e = copy.data[copy.header.offset + ii * copy.header.strides[0] + i];

            // Subtract (the row above(or below) scaled by e) from (the
            // current row) but start at the i'th column and assume all the
            // stuff left of diagonal is 0 (which it should be if we made this
            // algorithm correctly)
            for (let j = 0; j < dim; j++) {
                copy.data[copy.header.offset + ii * copy.header.strides[0] + j] -= e * copy.data[copy.header.offset + i * copy.header.strides[0] + j]; //apply to original matrix
                args.result.data[ii * dim + j] -= e * args.result.data[i * dim + j]; //apply to identity
            }
        }
    }

    return args.result
}