export default class Type {
    constructor({ size, array }) {
        this.size = size
        this.array = array
    }

    static promote(A, B) {
        if (A.header.type.size > B.header.type.size)
            return A.header.type

        return B.header.type
    }

    static isArray(array) {
        if (array === undefined)
            throw "Attempting to check type of something undefined"

        return array.constructor === Int8Array
            || array.constructor === Int16Array
            || array.constructor === Int32Array
            || array.constructor === Uint8Array
            || array.constructor === Uint16Array
            || array.constructor === Uint32Array
            || array.constructor === Float32Array
            || array.constructor === Float64Array
            || array.constructor === Uint8ClampedArray
    }

    static configolveArray(array) {
        if (array === undefined)
            throw "Attempting to configolve type of something undefined"

        if (array.constructor === Int8Array) return Type.Int8
        if (array.constructor === Int16Array) return Type.Int16
        if (array.constructor === Int32Array) return Type.Int32
        if (array.constructor === Uint8Array) return Type.Uint8
        if (array.constructor === Uint16Array) return Type.Uint16
        if (array.constructor === Uint32Array) return Type.Uint32
        if (array.constructor === Float32Array) return Type.Float32
        if (array.constructor === Float64Array) return Type.Float64
        if (array.constructor === Uint8ClampedArray) return Type.Uint8Clamped
    }

    static configolveSize(size) {
        if (size === undefined)
            throw "Attempting to configolve type of something undefined"

        if (size === 1) return Type.Float32
        if (size === 2) return Type.ComplexFloat32
        if (size === 4) return Type.QuatFloat32

        throw "Your type is not Float, Complex, or Quat"
    }

    static Int8 = new (class Int8 extends Type { })({ size: 1, array: Int8Array })
    static Int16 = new (class Int16 extends Type { })({ size: 1, array: Int16Array })
    static Int32 = new (class Int32 extends Type { })({ size: 1, array: Int32Array })
    static Uint8 = new (class Uint8 extends Type { })({ size: 1, array: Uint8Array })
    static Uint16 = new (class Uint16 extends Type { })({ size: 1, array: Uint16Array })
    static Uint32 = new (class Uint32 extends Type { })({ size: 1, array: Uint32Array })
    static Float32 = new (class Float32 extends Type { })({ size: 1, array: Float32Array })
    static Float64 = new (class Float64 extends Type { })({ size: 1, array: Float64Array })
    static Uint8Clamped = new (class Uint8Clamped extends Type { })({ size: 1, array: Uint8ClampedArray })

    static ComplexInt8 = new (class ComplexInt8 extends Type { })({ size: 2, array: Int8Array })
    static ComplexInt16 = new (class ComplexInt16 extends Type { })({ size: 2, array: Int16Array })
    static ComplexInt32 = new (class ComplexInt32 extends Type { })({ size: 2, array: Int32Array })
    static ComplexUint8 = new (class ComplexUint8 extends Type { })({ size: 2, array: Uint8Array })
    static ComplexUint16 = new (class ComplexUint16 extends Type { })({ size: 2, array: Uint16Array })
    static ComplexUint32 = new (class ComplexUint32 extends Type { })({ size: 2, array: Uint32Array })
    static ComplexFloat32 = new (class ComplexFloat32 extends Type { })({ size: 2, array: Float32Array })
    static ComplexFloat64 = new (class ComplexFloat64 extends Type { })({ size: 2, array: Float64Array })
    static ComplexUint8Clamped = new (class ComplexUint8Clamped extends Type { })({ size: 2, array: Uint8ClampedArray })

    static QuatInt8 = new (class QuatInt8 extends Type { })({ size: 4, array: Int8Array })
    static QuatInt16 = new (class QuatInt16 extends Type { })({ size: 4, array: Int16Array })
    static QuatInt32 = new (class QuatInt32 extends Type { })({ size: 4, array: Int32Array })
    static QuatUint8 = new (class QuatUint8 extends Type { })({ size: 4, array: Uint8Array })
    static QuatUint16 = new (class QuatUint16 extends Type { })({ size: 4, array: Uint16Array })
    static QuatUint32 = new (class QuatUint32 extends Type { })({ size: 4, array: Uint32Array })
    static QuatFloat32 = new (class QuatFloat32 extends Type { })({ size: 4, array: Float32Array })
    static QuatFloat64 = new (class QuatFloat64 extends Type { })({ size: 4, array: Float64Array })
    static QuatUint8Clamped = new (class QuatUint8Clamped extends Type { })({ size: 4, array: Uint8ClampedArray })
}
