export default class TypeArrayUtils {
    static compareTypes(t1, t2) {
        return TypeArrayUtils.TYPE_RANKINGS[t1] >
            TypeArrayUtils.TYPE_RANKINGS[t2] ? t1 : t2
    }
}

TypeArrayUtils.TYPE_MAP = { // Numpy type mappings
    uint8: Uint8ClampedArray,
    int8: Int8Array,
    uint16: Uint16Array,
    int16: Int16Array,
    uint32: Uint32Array,
    int32: Int32Array,
    float32: Float32Array,
    float64: Float64Array,
}

TypeArrayUtils.TYPE_RANKINGS = { // Numpy type mappings
    uint8: 0,
    int8: 1,
    uint16: 2,
    int16: 3,
    uint32: 4,
    int32: 5,
    float32: 6,
    float64: 7,
}