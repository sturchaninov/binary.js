/**
 * Provides a binary type that can be initialized with many different forms of
 * data
 */
(function(exports) {
  /**
   * The Binary class
   */
  function Binary(data, type) {
    this._data = data;
    this._type = type;
  }

  /**
   * Initializes the binary class from the string
   */
  Binary.fromString = function(data) {
    return new Binary(data, 'string');
  };
  
  /**
   * Initializes the binary class from an arrayBuffer
   */
  Binary.fromArrayBuffer = function(data) {
    return new Binary(data, 'arrayBuffer');
  };
  
  /**
   * Initializes the binary class from an array of bytes
   */
  Binary.fromByteArray = function(data) {
    return new Binary(data, 'byteArray');
  };

  /**
   * Turn the binary data into an array buffer
   */
  Binary.prototype.asArrayBuffer = function() {
    return conversionMethods[this._type]['arrayBuffer'](this._data);
  };

  /**
   * Turn the binary data into a string
   */
  Binary.prototype.asString = function() {
    return conversionMethods[this._type]['string'](this._data);
  };

  /**
   * Turn the binary data into an array of bytes
   */
  Binary.prototype.asByteArray = function() {
    return conversionMethods[this._type]['byteArray'](this._data);
  };


  // Converting from a byte array
  var byteArrayConversion = {
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
    }
  };

  // Converting from an arraybuffer
  var arrayBufferConversion = {
    string: function(buffer) {
      return String.fromCharCode.apply(null, new Uint8Array(buffer));
    },
    byteArray: function(buffer) {
      return Array.apply(null, new Uint8Array(buffer));
    }
  };
  
  var conversionMethods = {
    string: stringConversion,
    arrayBuffer: arrayBufferConversion,
    byteArray: byteArrayConversion
  };

  exports.binary = {
    Binary: Binary
  };
})(this);
