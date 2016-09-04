binary.js - Deal with binary data effectively
=============================================

binary.js provides an abstraction for dealing with binary data. This makes it
trivial to treat binary data in 3 different forms: ArrayBuffer, String, or
ByteArray (array of uint8's).

Usage
-----

Inclusion in a client-side or server-side script:

```js
var Binary = require('binary').Binary;
```

Creating new Binary objects:

```js
// Create a binary using a string
var binStr = Binary.fromString('foo');

// Create a binary using an arraybuffer
var binArrayBuf = Binary.fromArrayBuffer(someArrayBuffer);

// Create a binary from a bytearray
var binArray = Binary.fromByteArray([90, 91, 92]);
```

Export data from a binary object given Binary ``someBin``:
    
```js
// Export as a string
var str = someBin.asString();

// Export as an arraybuffer
var arrayBuf = someBin.asArrayBuffer();

// Export as a bytearray
var byteArray = someBin.asByteArray();
```
