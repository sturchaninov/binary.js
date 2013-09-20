/**
 * Provides a binary type that can be initialized with many different forms of
 * data
 */
  
/**
 * The Binary class
 *
 * @param {Any} data The binary data
 * @param {String} type The type of the data
 */
function Binary(data, type) {
  this._data = data;
  this._type = type;
}

/**
 * @static 
 *
 * Initializes the binary class from the string
 *
 * @param {String} data The string to use as the binary data
 *
 * @returns {Binary} A new binary object
 */
Binary.fromString = function(data) {
  return new Binary(data, 'string');
};

/**
 * @static 
 *
 * Initializes the binary class from an arrayBuffer
 *
 * @param {ArrayBuffer} data The array buffer to use as the binary data
 *
 * @returns {Binary} A new binary object
 */
Binary.fromArrayBuffer = function(data) {
  return new Binary(data, 'arrayBuffer');
};

/**
 * @static
 *
 * Initializes the binary class from an array of bytes
 *
 * @param {Array} data The array of bytes to use as the binary data
 * 
 * @returns {Binary} A new binary object
 */
Binary.fromByteArray = function(data) {
  return new Binary(data, 'byteArray');
};

/**
 * Turn the binary data into an array buffer
 *
 * @returns {ArrayBuffer} Data represented as an array buffer
 */
Binary.prototype.asArrayBuffer = function() {
  return conversionMethods[this._type]['arrayBuffer'](this._data);
};

/**
 * Turn the binary data into a string
 *
 * @returns {String} Data represented as a string
 */
Binary.prototype.asString = function() {
  return conversionMethods[this._type]['string'](this._data);
};

/**
 * Turn the binary data into an array of bytes
 *
 * @returns {Array} Data represented as an array of bytes
 */
Binary.prototype.asByteArray = function() {
  return conversionMethods[this._type]['byteArray'](this._data);
};

/**
 @param {Number} [start]
 @param {Number} [end]
 @return {Binary}
 */
Binary.prototype.slice = function(start, end) {
  return sliceMethods[this._type](this._data, start, end);
};


// Converting from a byte array
var byteArrayConversion = {
  byteArray: function(byteArray) {
    return byteArray;
  },
  string: function(byteArray) {
    var s = '';
    for(var i = 0; i < byteArray.length; i++) {
      s += String.fromCharCode(byteArray[i]);
    }
    return s;
  },
  arrayBuffer: function(byteArray) {
    var length = byteArray.length
    var buffer = new ArrayBuffer(length);
    var bufferView = new Uint8Array(buffer);
    for(var i = 0; i < length; i++) {
      bufferView[i] = byteArray[i];
    }
    return buffer;
  }
};

// Converting from a string
var stringConversion = {
  byteArray: function(str) {
    var byteArray = [];
    for(var i = 0; i < str.length; i++) {
      byteArray.push(str.charCodeAt(i));
    }
    return byteArray;
  },
  arrayBuffer: function(str) {
    var length = str.length;
    var buffer = new ArrayBuffer(length);
    var bufferView = new Uint8Array(buffer);
    for(var i = 0; i < length; i++) {
      bufferView[i] = str.charCodeAt(i);
    }
    return buffer;
  },
  string: function(str) {
    return str;
  }
};

// Converting from an arraybuffer
var arrayBufferConversion = {
  arrayBuffer: function(buffer) {
    return buffer;
  },
  string: function(buffer) {
    var uint8Array = new Uint8Array(buffer);
    var str = '';
    for(var i = 0; i < uint8Array.length; i++) {
      str = str + String.fromCharCode(uint8Array[i]);
    }
    return str;
  },
  byteArray: function(buffer) {
    var uint8Array = new Uint8Array(buffer);
    // Initialize array
    var byteArray = new Array(uint8Array.length);
    for(var i = 0; i < byteArray.length; i++) {
      byteArray[i] = uint8Array[i];
    }
    return byteArray;
  }
};

var conversionMethods = {
  string: stringConversion,
  arrayBuffer: arrayBufferConversion,
  byteArray: byteArrayConversion
};

var sliceMethods = {
  string: sliceString,
  arrayBuffer: sliceArrayBuffer,
  byteArray: sliceByteArray
}

function sliceString(data, start, end) {
  if (start < 0) {
    start = data.length + start;
  }
  if (end && end < 0) {
    end = data.length + end;
  }
  return Binary.fromString(
    !(arguments[2])
      ? data.substring(start)
      : data.substring(start, end));
}

/**
 * Slices an ArrayBuffer.  If ArrayBuffer.prototype.slice doesn't exists,
 * thanks Bill, then we'll convert to a byte array then slice it.  Not
 * efficient, but I don't care about IE.
 *
 * @param {ArrayBuffer} data ArrayBuffer in
 * @param start
 * @param end
 * @returns {Binary}
 */
function sliceArrayBuffer(data, start, end) {
  if (ArrayBuffer.prototype.slice) {
    return Binary.fromArrayBuffer(
      !arguments[2]
        ? data.slice(start)
        : data.slice(start, end));
  } else {
    return sliceByteArray(arrayBufferConversion.byteArray(data), start, end);
  }
}

function sliceByteArray(data, start, end) {
  return Binary.fromByteArray(
    !(arguments[2])
      ? data.slice(start)
      : data.slice(start, end));
}

exports.Binary = Binary;
