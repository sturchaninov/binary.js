var assert = require('chai').assert;
var Binary = require('../lib/binary').Binary;

describe('Binary (without ArrayBuffer)', function() {
  describe('factory methods', function() {
    it('#fromString', function() {
      var bin = Binary.fromString('abc');
    });
    
    it('#fromByteArray', function() {
      var byteArray = [97, 98, 99];
      var bin = Binary.fromByteArray(byteArray);
    });
    
  });

  describe('#asByteArray', function() {
    it('works with a byteArray', function() {
      var byteArray = [97, 98, 99];
      var bin = Binary.fromByteArray(byteArray);
      assert.deepEqual(bin.asByteArray(), byteArray);
    });

    it('works with a string', function() {
      var bin = Binary.fromString('abc');
      var byteArray = bin.asByteArray();
      assert.deepEqual([97, 98, 99], byteArray);
    });
  });

  describe('#asString', function() {
    it('works with a string', function() {
      var str = 'hello';
      var bin = Binary.fromString(str);
      assert.equal(bin.asString(), str);
    });
    it('works with a byteArray', function() {
      var byteArray = [97, 98, 99];
      var bin = Binary.fromByteArray(byteArray);
      assert.equal(bin.asString(), 'abc');
    });
  });
});

describe('Binary (with ArrayBuffer)', function() {
  var _hasArrayBuffers = window.ArrayBuffer !== undefined;
  if(!_hasArrayBuffers) {
    return;
  }
  
  describe('factory methods', function() {
    it('#fromArrayBuffer', function() {
      var buffer = new ArrayBuffer(3);
      var bin = Binary.fromArrayBuffer(buffer);
    });
  });

  describe('#asByteArray', function() {
    it('works with an arrayBuffer', function() {
      var byteArray = [97, 98, 99];
      var bufferView = new Uint8Array(byteArray);
      var bin = Binary.fromArrayBuffer(bufferView.buffer);
      assert.deepEqual(bin.asByteArray(), byteArray);
    });
  });

  describe('#asString', function() {
    it('works with an arrayBuffer', function() {
      var byteArray = [97, 98, 99];
      var bufferView = new Uint8Array(byteArray);
      var bin = Binary.fromArrayBuffer(bufferView.buffer);
      assert.deepEqual(bin.asString(), 'abc');
    });
  });
  
  describe('#asArrayBuffer', function() {
    it('works with an arrayBuffer', function() {
      var byteArray = [97, 98, 99];
      var bufferView = new Uint8Array(byteArray);
      var bin = Binary.fromArrayBuffer(bufferView.buffer);
      
      var actualBuffer = bin.asArrayBuffer();
      var bufferView = new Uint8Array(actualBuffer);
      // Check that the lengths match
      assert.equal(bufferView.length, byteArray.length);
      // Check each item
      for(var i = 0; i < bufferView.length; i++) {
        assert.equal(bufferView[i], byteArray[i]);
      }
    });

    it('works with a string', function() {
      var str = 'abc';
      var bin = Binary.fromString(str);
      var buffer = bin.asArrayBuffer();
      var otherBin = Binary.fromArrayBuffer(buffer);
      assert.equal(otherBin.asString(), str);
    });

    it('works with a byteArray', function() {
      var byteArray = [97, 98, 99];
      var bin = Binary.fromByteArray(byteArray);
      var buffer = bin.asArrayBuffer();
      var otherBin = Binary.fromArrayBuffer(buffer);
      assert.deepEqual(otherBin.asByteArray(), byteArray);
    });
  });
});


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

    var _hasArrayBuffers = window.ArrayBuffer !== undefined;
    if(!_hasArrayBuffers) {
      return;
    }

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
//    it(test10.message, function(){ test = test10.test(bin) });
//    it(test11.message, function(){ test = test11.test(bin) });

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
});