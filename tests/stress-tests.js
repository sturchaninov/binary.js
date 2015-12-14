
var assert = require('chai').assert;
var Binary = require('../lib/binary').Binary;
var moment = require('moment');


var _hasArrayBuffers = typeof ArrayBuffer !== 'undefined';
if(!_hasArrayBuffers) {
  return;
}


describe('Binary Stress Tests', function() {

  var MB_1 = new Buffer(1 << 20);

  describe('Converts with a 1 MB buffer', function() {
    it('converts to String', function() {
      var binary = Binary.fromBuffer(MB_1);
      var str = binary.asString();
      var other = Binary.fromString(str);
      var otherBuffer = other.asBuffer();
      assert.equal(otherBuffer.length, MB_1.length);
    });
  });

});

