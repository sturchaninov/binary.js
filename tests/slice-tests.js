
var assert = require('chai').assert;
var Binary = require('../lib/binary').Binary;


var _hasArrayBuffers = typeof ArrayBuffer !== 'undefined';
if(!_hasArrayBuffers) {
  return;
}

var _hasBuffers = typeof Buffer !== 'undefined';
if(!_hasBuffers) {
  return;
}

describe('Slice method', function() {

  var test1 =
  { message: 'Start 0, end undefined',
    test: function(bin) {
      return {
        startCheck: 0,
        endCheck: undefined,
        expectedLength: 10,
        result: bin.slice(0)
      };
    }};

  var test2 =
  { message: 'Start 5, end undefined',
    test: function(bin) {
      return {
        startCheck: 5,
        endCheck: undefined,
        expectedLength: 5,
        result: bin.slice(5)
      }
    }};

  var test3 =
  { message: 'Start -1, end undefined',
    test: function(bin) {
      return {
        startCheck: 9,
        endCheck: undefined,
        expectedLength: 1,
        result: bin.slice(-1)
      }
    }};

  var test4 =
  { message: 'Start 1, end 1',
    test: function(bin) {
      return {
        startCheck: 1,
        endCheck: 1,
        expectedLength: 0,
        result: bin.slice(1, 1)
      }
    }};

  var test5 =
  { message: 'Start 0, end 10',
    test: function(bin) {
      return {
        startCheck: 0,
        endCheck: 10,
        expectedLength: 10,
        result: bin.slice(0, 10)
      }
    }};

  var test6 =
  { message: 'Start 5, end 10',
    test: function(bin) {
      return {
        startCheck: 5,
        endCheck: 10,
        expectedLength: 5,
        result: bin.slice(5, 10)
      }
    }};

  var test7 =
  { message: 'Start -5, end 7',
    test: function(bin) {
      return {
        startCheck: 5,
        endCheck: 7,
        expectedLength: 2,
        result: bin.slice(-5, 7)
      }
    }};

  var test8 =
  { message: 'Start -5, end -2',
    test: function(bin) {
      return {
        startCheck: 5,
        endCheck: -2,
        expectedLength: 3,
        result: bin.slice(-5, -2)
      }
    }};

  var test9 =
  { message: 'Start 0, end 100',
    test: function(bin) {
      return {
        startCheck: 0,
        endCheck: 10,
        expectedLength: 10,
        result: bin.slice(0, 100)
      }
    }};

  describe('Slice ArrayBuffer', function() {
    var buffer;
    var bin;
    var test;

    beforeEach(function() {
      buffer = Binary.fromByteArray([0,1,2,3,4,5,6,7,8,9]).asArrayBuffer();
      bin = Binary.fromArrayBuffer(buffer);
    });

    afterEach(function() {
      var bufferView = new Uint8Array(bin.asArrayBuffer());
      var resultView = new Uint8Array(test.result.asArrayBuffer());

      // Check that the lengths match
      assert.equal(test.expectedLength, resultView.length);


      // Check each item
      for(var i = test.startCheck; i < test.expectedLength; i++) {
        assert.equal(bufferView[i], resultView[i - test.startCheck]);
      }
    });

    it(test1.message, function(){ test = test1.test(bin) });
    it(test2.message, function(){ test = test2.test(bin) });
    it(test3.message, function(){ test = test3.test(bin) });
    it(test4.message, function(){ test = test4.test(bin) });
    it(test5.message, function(){ test = test5.test(bin) });
    it(test6.message, function(){ test = test6.test(bin) });
    it(test7.message, function(){ test = test7.test(bin) });
    it(test8.message, function(){ test = test8.test(bin) });
    it(test9.message, function(){ test = test9.test(bin) });
  });

  describe('Slice ByteArray', function() {

    var buffer;
    var bin;
    var test;

    beforeEach(function() {
      buffer = [0,1,2,3,4,5,6,7,8,9];
      bin = Binary.fromByteArray(buffer);
    });

    afterEach(function() {
      var byteArray = test.result.asByteArray();
      assert.equal(test.expectedLength, byteArray.length);
      assert.deepEqual(byteArray,
        (test.endCheck)
          ? buffer.slice(test.startCheck, test.endCheck)
          : buffer.slice(test.startCheck));
    });

    it(test1.message, function(){ test = test1.test(bin) });
    it(test2.message, function(){ test = test2.test(bin) });
    it(test3.message, function(){ test = test3.test(bin) });
    it(test4.message, function(){ test = test4.test(bin) });
    it(test5.message, function(){ test = test5.test(bin) });
    it(test6.message, function(){ test = test6.test(bin) });
    it(test7.message, function(){ test = test7.test(bin) });
    it(test8.message, function(){ test = test8.test(bin) });
    it(test9.message, function(){ test = test9.test(bin) });
  });

  describe('Slice String', function() {

    var buffer;
    var bin;
    var test;

    beforeEach(function() {
      buffer = '0123456789';
      bin = Binary.fromString(buffer);
    });

    afterEach(function() {
      var str = test.result.asString();
      assert.equal(str.length, test.expectedLength);
      var start = test.startCheck;
      var end = test.endCheck;
      if (start < 0) {
        start = buffer.length + start;
      }
      if (end && end < 0) {
        end = buffer.length + end;
      }
      assert.equal(str,
        (end)
          ? buffer.substring(start, end)
          : buffer.substring(start));
    });

    it(test1.message, function(){ test = test1.test(bin) });
    it(test2.message, function(){ test = test2.test(bin) });
    it(test3.message, function(){ test = test3.test(bin) });
    it(test4.message, function(){ test = test4.test(bin) });
    it(test5.message, function(){ test = test5.test(bin) });
    it(test6.message, function(){ test = test6.test(bin) });
    it(test7.message, function(){ test = test7.test(bin) });
    it(test8.message, function(){ test = test8.test(bin) });
    it(test9.message, function(){ test = test9.test(bin) });
  });

  describe('Slice between types', function() {

    it('Slice from String to ByteArray', function(){
      var buffer = '0123456789';
      var binary1 = Binary.fromString(buffer);
      var binary2 = Binary.fromByteArray(Binary.fromString(buffer).asByteArray());

      var result1 = binary1.slice(0);
      var result2 = binary2.slice(0);

      assert.equal(result1.asString(), result2.asString());

    });

    it('Slice from String to ArrayBuffer', function(){
      var buffer = '0123456789';
      var binary1 = Binary.fromString(buffer);
      var binary2 = Binary.fromArrayBuffer(Binary.fromString(buffer).asArrayBuffer());

      var result1 = binary1.slice(0);
      var result2 = binary2.slice(0);

      assert.equal(result1.asString(), result2.asString());

    });

    it('Slice from String to ByteArray test negatives (slice vs substring)', function(){
      var buffer = '0123456789';
      var binary1 = Binary.fromString(buffer);
      var binary2 = Binary.fromByteArray(Binary.fromString(buffer).asByteArray());

      var result1 = binary1.slice(-5, 7);
      var result2 = binary2.slice(-5, 7);

      assert.equal(result1.asString(), result2.asString());
    });

    it('Slice from String to ArrayBuffer test negatives (slice vs substring)', function(){
      var buffer = '0123456789';
      var binary1 = Binary.fromString(buffer);
      var binary2 = Binary.fromArrayBuffer(Binary.fromString(buffer).asArrayBuffer());

      var result1 = binary1.slice(-5, 7);
      var result2 = binary2.slice(-5, 7);

      assert.equal(result1.asString(), result2.asString());
    });

  });
});