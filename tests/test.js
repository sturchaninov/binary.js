var assert = require('chai').assert;
var Binary = require('../lib/binary').Binary;


var _hasArrayBuffers = typeof ArrayBuffer !== 'undefined';
if(!_hasArrayBuffers) {
  return;
}

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

    it('works with a byteArray and unicode string', function() {
      var byteArray = [227, 131, 145, 227, 130, 185, 227, 131, 175, 227, 131, 188, 227, 131, 137];
      var bin = Binary.fromByteArray(byteArray);
      var buffer = bin.asArrayBuffer();
      var otherBin = Binary.fromArrayBuffer(buffer);
      assert.deepEqual(otherBin.asString(), 'パスワード');
    });
  });
});


describe('Binary (with Buffer)', function() {


  describe('factory methods', function() {
    it('#fromBuffer', function() {
      var buffer = new Buffer(3);
      var bin = Binary.fromBuffer(buffer);
    });
  });

  describe('#asByteArray', function() {
    it('works with an Buffer', function() {
      var byteArray = [97, 98, 99];
      var buffer = new Buffer(byteArray);
      var bin = Binary.fromBuffer(buffer);
      assert.deepEqual(bin.asByteArray(), byteArray);
    });
  });

  describe('#asString', function() {
    it('works with an Buffer', function() {
      var byteArray = [97, 98, 99];
      var bin = Binary.fromArrayBuffer(new Buffer(byteArray));
      assert.deepEqual(bin.asString(), 'abc');
    });
  });

  describe('#asArrayBuffer', function() {
    it('works with an arrayBuffer', function() {
      var byteArray = [97, 98, 99];
      var buffer = new Buffer(byteArray);
      var bin = Binary.fromBuffer(buffer);

      var actualBuffer = bin.asArrayBuffer();
      var bufferView = new Uint8Array(actualBuffer);
      // Check that the lengths match
      assert.equal(bufferView.length, byteArray.length);
      // Check each item
      for(var i = 0; i < bufferView.length; i++) {
        assert.equal(bufferView[i], byteArray[i]);
      }
    });

    it('works with an arrayBuffer unicode', function() {
      var byteArray = [227, 131, 145, 227, 130, 185, 227, 131, 175, 227, 131, 188, 227, 131, 137];
      var buffer = new Buffer(byteArray);
      var bin = Binary.fromBuffer(buffer);

      var actualBuffer = bin.asArrayBuffer();
      var bufferView = new Uint8Array(actualBuffer);
      var otherBin = Binary.fromArrayBuffer(actualBuffer);
      // Check that the lengths match
      assert.equal(bufferView.length, byteArray.length);
      assert.equal(otherBin.asString(), 'パスワード');
    });

    it('works with a string', function() {
      var str = 'abc';
      var bin = Binary.fromString(str);
      var buffer = bin.asBuffer();
      var otherBin = Binary.fromBuffer(buffer);
      assert.equal(otherBin.asString(), str);
    });

    it('works with a byteArray', function() {
      var byteArray = [97, 98, 99];
      var bin = Binary.fromByteArray(byteArray);
      var buffer = bin.asBuffer();
      var otherBin = Binary.fromBuffer(buffer);
      assert.deepEqual(otherBin.asByteArray(), byteArray);
    });
  });
});