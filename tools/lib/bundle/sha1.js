"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha1Binary = exports.sha1 = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Compute the SHA1 of the given string
 *
 * see https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf
 *
 * WARNING: this function has not been designed not tested with security in mind.
 *          DO NOT USE IT IN A SECURITY SENSITIVE CONTEXT.
 *
 * Borrowed from @angular/compiler/src/i18n/digest.ts
 */
function _sha1(words32, len) {
    var _a, _b;
    var w = [];
    var _c = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0], a = _c[0], b = _c[1], c = _c[2], d = _c[3], e = _c[4];
    words32[len >> 5] |= 0x80 << (24 - (len % 32));
    words32[(((len + 64) >> 9) << 4) + 15] = len;
    for (var i = 0; i < words32.length; i += 16) {
        var _d = [a, b, c, d, e], h0 = _d[0], h1 = _d[1], h2 = _d[2], h3 = _d[3], h4 = _d[4];
        for (var j = 0; j < 80; j++) {
            if (j < 16) {
                w[j] = words32[i + j];
            }
            else {
                w[j] = rol32(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            }
            var _e = fk(j, b, c, d), f = _e[0], k = _e[1];
            var temp = [rol32(a, 5), f, e, k, w[j]].reduce(add32);
            _a = [d, c, rol32(b, 30), a, temp], e = _a[0], d = _a[1], c = _a[2], b = _a[3], a = _a[4];
        }
        _b = [add32(a, h0), add32(b, h1), add32(c, h2), add32(d, h3), add32(e, h4)], a = _b[0], b = _b[1], c = _b[2], d = _b[3], e = _b[4];
    }
    return byteStringToHexString(words32ToByteString([a, b, c, d, e]));
}
function add32(a, b) {
    return add32to64(a, b)[1];
}
function add32to64(a, b) {
    var low = (a & 0xffff) + (b & 0xffff);
    var high = (a >>> 16) + (b >>> 16) + (low >>> 16);
    return [high >>> 16, (high << 16) | (low & 0xffff)];
}
function add64(_a, _b) {
    var ah = _a[0], al = _a[1];
    var bh = _b[0], bl = _b[1];
    var _c = add32to64(al, bl), carry = _c[0], l = _c[1];
    var h = add32(add32(ah, bh), carry);
    return [h, l];
}
function sub32(a, b) {
    var low = (a & 0xffff) - (b & 0xffff);
    var high = (a >> 16) - (b >> 16) + (low >> 16);
    return (high << 16) | (low & 0xffff);
}
// Rotate a 32b number left `count` position
function rol32(a, count) {
    return (a << count) | (a >>> (32 - count));
}
// Rotate a 64b number left `count` position
function rol64(_a, count) {
    var hi = _a[0], lo = _a[1];
    var h = (hi << count) | (lo >>> (32 - count));
    var l = (lo << count) | (hi >>> (32 - count));
    return [h, l];
}
var Endian;
(function (Endian) {
    Endian[Endian["Little"] = 0] = "Little";
    Endian[Endian["Big"] = 1] = "Big";
})(Endian || (Endian = {}));
function fk(index, b, c, d) {
    if (index < 20) {
        return [(b & c) | (~b & d), 0x5a827999];
    }
    if (index < 40) {
        return [b ^ c ^ d, 0x6ed9eba1];
    }
    if (index < 60) {
        return [(b & c) | (b & d) | (c & d), 0x8f1bbcdc];
    }
    return [b ^ c ^ d, 0xca62c1d6];
}
function stringToWords32(str, endian) {
    var size = (str.length + 3) >>> 2;
    var words32 = [];
    for (var i = 0; i < size; i++) {
        words32[i] = wordAt(str, i * 4, endian);
    }
    return words32;
}
function arrayBufferToWords32(buffer, endian) {
    var size = (buffer.byteLength + 3) >>> 2;
    var words32 = [];
    var view = new Uint8Array(buffer);
    for (var i = 0; i < size; i++) {
        words32[i] = wordAt(view, i * 4, endian);
    }
    return words32;
}
function byteAt(str, index) {
    if (typeof str === 'string') {
        return index >= str.length ? 0 : str.charCodeAt(index) & 0xff;
    }
    else {
        return index >= str.byteLength ? 0 : str[index] & 0xff;
    }
}
function wordAt(str, index, endian) {
    var word = 0;
    if (endian === Endian.Big) {
        for (var i = 0; i < 4; i++) {
            word += byteAt(str, index + i) << (24 - 8 * i);
        }
    }
    else {
        for (var i = 0; i < 4; i++) {
            word += byteAt(str, index + i) << (8 * i);
        }
    }
    return word;
}
function words32ToByteString(words32) {
    return words32.reduce(function (str, word) { return str + word32ToByteString(word); }, '');
}
function word32ToByteString(word) {
    var str = '';
    for (var i = 0; i < 4; i++) {
        str += String.fromCharCode((word >>> (8 * (3 - i))) & 0xff);
    }
    return str;
}
function byteStringToHexString(str) {
    var hex = '';
    for (var i = 0; i < str.length; i++) {
        var b = byteAt(str, i);
        hex += (b >>> 4).toString(16) + (b & 0x0f).toString(16);
    }
    return hex.toLowerCase();
}
// based on http://www.danvk.org/hex2dec.html (JS can not handle more than 56b)
function byteStringToDecString(str) {
    var decimal = '';
    var toThePower = '1';
    for (var i = str.length - 1; i >= 0; i--) {
        decimal = addBigInt(decimal, numberTimesBigInt(byteAt(str, i), toThePower));
        toThePower = numberTimesBigInt(256, toThePower);
    }
    return decimal.split('').reverse().join('');
}
// x and y decimal, lowest significant digit first
function addBigInt(x, y) {
    var sum = '';
    var len = Math.max(x.length, y.length);
    for (var i = 0, carry = 0; i < len || carry; i++) {
        var tmpSum = carry + +(x[i] || 0) + +(y[i] || 0);
        if (tmpSum >= 10) {
            carry = 1;
            sum += tmpSum - 10;
        }
        else {
            carry = 0;
            sum += tmpSum;
        }
    }
    return sum;
}
function numberTimesBigInt(num, b) {
    var product = '';
    var bToThePower = b;
    for (; num !== 0; num = num >>> 1) {
        if (num & 1)
            product = addBigInt(product, bToThePower);
        bToThePower = addBigInt(bToThePower, bToThePower);
    }
    return product;
}
function sha1(str) {
    var utf8 = str;
    var words32 = stringToWords32(utf8, Endian.Big);
    return _sha1(words32, utf8.length * 8);
}
exports.sha1 = sha1;
function sha1Binary(buffer) {
    var words32 = arrayBufferToWords32(buffer, Endian.Big);
    return _sha1(words32, buffer.byteLength * 8);
}
exports.sha1Binary = sha1Binary;
//# sourceMappingURL=sha1.js.map