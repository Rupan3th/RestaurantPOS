import _ from 'lodash';
export function convertByte2Short(byteA, byteB) {
    var sign = byteA & (1 << 7);
    var x = (((byteA & 0xFF) << 8) | (byteB & 0xFF));
    if (sign) {
        result = 0xFFFF0000 | x;  // fill in most significant bits with 1's
        return result
    }
    return x
}


export function convertByteArray2ShortArray(byteArray) {
    let chunks = _.chunk(byteArray, 2);
    
    let shorts = chunks.map((chunk, i) => (
        convertByte2Short(chunk[0], chunk[1])
    ))

    return shorts
}

export function convertByteArray2FloatArray(byteArray) {
    let cnt = byteArray.length

    
    let chunks = _.chunk(byteArray, 2);
    
    let floats = chunks.map((chunk, i) => (
        convertByte2Short(chunk[0], chunk[1]) / 65536.0
    ))

    return floats
}