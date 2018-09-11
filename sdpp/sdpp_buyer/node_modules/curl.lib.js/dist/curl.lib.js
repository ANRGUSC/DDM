(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["curl.lib.js"] = factory();
	else
		root["curl.lib.js"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/curl.lib.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/crypto-js/aes.js":
/*!***************************************!*\
  !*** ./node_modules/crypto-js/aes.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./enc-base64 */ "./node_modules/crypto-js/enc-base64.js"), __webpack_require__(/*! ./md5 */ "./node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./evpkdf */ "./node_modules/crypto-js/evpkdf.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Lookup tables
	    var SBOX = [];
	    var INV_SBOX = [];
	    var SUB_MIX_0 = [];
	    var SUB_MIX_1 = [];
	    var SUB_MIX_2 = [];
	    var SUB_MIX_3 = [];
	    var INV_SUB_MIX_0 = [];
	    var INV_SUB_MIX_1 = [];
	    var INV_SUB_MIX_2 = [];
	    var INV_SUB_MIX_3 = [];

	    // Compute lookup tables
	    (function () {
	        // Compute double table
	        var d = [];
	        for (var i = 0; i < 256; i++) {
	            if (i < 128) {
	                d[i] = i << 1;
	            } else {
	                d[i] = (i << 1) ^ 0x11b;
	            }
	        }

	        // Walk GF(2^8)
	        var x = 0;
	        var xi = 0;
	        for (var i = 0; i < 256; i++) {
	            // Compute sbox
	            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	            SBOX[x] = sx;
	            INV_SBOX[sx] = x;

	            // Compute multiplication
	            var x2 = d[x];
	            var x4 = d[x2];
	            var x8 = d[x4];

	            // Compute sub bytes, mix columns tables
	            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
	            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
	            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
	            SUB_MIX_3[x] = t;

	            // Compute inv sub bytes, inv mix columns tables
	            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
	            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
	            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
	            INV_SUB_MIX_3[sx] = t;

	            // Compute next counter
	            if (!x) {
	                x = xi = 1;
	            } else {
	                x = x2 ^ d[d[d[x8 ^ x2]]];
	                xi ^= d[d[xi]];
	            }
	        }
	    }());

	    // Precomputed Rcon lookup
	    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

	    /**
	     * AES block cipher algorithm.
	     */
	    var AES = C_algo.AES = BlockCipher.extend({
	        _doReset: function () {
	            // Skip reset of nRounds has been set before and key did not change
	            if (this._nRounds && this._keyPriorReset === this._key) {
	                return;
	            }

	            // Shortcuts
	            var key = this._keyPriorReset = this._key;
	            var keyWords = key.words;
	            var keySize = key.sigBytes / 4;

	            // Compute number of rounds
	            var nRounds = this._nRounds = keySize + 6;

	            // Compute number of key schedule rows
	            var ksRows = (nRounds + 1) * 4;

	            // Compute key schedule
	            var keySchedule = this._keySchedule = [];
	            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
	                if (ksRow < keySize) {
	                    keySchedule[ksRow] = keyWords[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 1];

	                    if (!(ksRow % keySize)) {
	                        // Rot word
	                        t = (t << 8) | (t >>> 24);

	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

	                        // Mix Rcon
	                        t ^= RCON[(ksRow / keySize) | 0] << 24;
	                    } else if (keySize > 6 && ksRow % keySize == 4) {
	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	                    }

	                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
	                }
	            }

	            // Compute inv key schedule
	            var invKeySchedule = this._invKeySchedule = [];
	            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
	                var ksRow = ksRows - invKsRow;

	                if (invKsRow % 4) {
	                    var t = keySchedule[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 4];
	                }

	                if (invKsRow < 4 || ksRow <= 4) {
	                    invKeySchedule[invKsRow] = t;
	                } else {
	                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
	                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
	                }
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
	        },

	        decryptBlock: function (M, offset) {
	            // Swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;

	            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

	            // Inv swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;
	        },

	        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
	            // Shortcut
	            var nRounds = this._nRounds;

	            // Get input, add round key
	            var s0 = M[offset]     ^ keySchedule[0];
	            var s1 = M[offset + 1] ^ keySchedule[1];
	            var s2 = M[offset + 2] ^ keySchedule[2];
	            var s3 = M[offset + 3] ^ keySchedule[3];

	            // Key schedule row counter
	            var ksRow = 4;

	            // Rounds
	            for (var round = 1; round < nRounds; round++) {
	                // Shift rows, sub bytes, mix columns, add round key
	                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
	                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
	                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
	                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

	                // Update state
	                s0 = t0;
	                s1 = t1;
	                s2 = t2;
	                s3 = t3;
	            }

	            // Shift rows, sub bytes, add round key
	            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

	            // Set output
	            M[offset]     = t0;
	            M[offset + 1] = t1;
	            M[offset + 2] = t2;
	            M[offset + 3] = t3;
	        },

	        keySize: 256/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
	     */
	    C.AES = BlockCipher._createHelper(AES);
	}());


	return CryptoJS.AES;

}));

/***/ }),

/***/ "./node_modules/crypto-js/cipher-core.js":
/*!***********************************************!*\
  !*** ./node_modules/crypto-js/cipher-core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./evpkdf */ "./node_modules/crypto-js/evpkdf.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Cipher core components.
	 */
	CryptoJS.lib.Cipher || (function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var Base64 = C_enc.Base64;
	    var C_algo = C.algo;
	    var EvpKDF = C_algo.EvpKDF;

	    /**
	     * Abstract base cipher template.
	     *
	     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
	     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
	     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
	     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
	     */
	    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {WordArray} iv The IV to use for this operation.
	         */
	        cfg: Base.extend(),

	        /**
	         * Creates this cipher in encryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createEncryptor: function (key, cfg) {
	            return this.create(this._ENC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Creates this cipher in decryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createDecryptor: function (key, cfg) {
	            return this.create(this._DEC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Initializes a newly created cipher.
	         *
	         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
	         */
	        init: function (xformMode, key, cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Store transform mode and key
	            this._xformMode = xformMode;
	            this._key = key;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this cipher to its initial state.
	         *
	         * @example
	         *
	         *     cipher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-cipher logic
	            this._doReset();
	        },

	        /**
	         * Adds data to be encrypted or decrypted.
	         *
	         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.process('data');
	         *     var encrypted = cipher.process(wordArray);
	         */
	        process: function (dataUpdate) {
	            // Append
	            this._append(dataUpdate);

	            // Process available blocks
	            return this._process();
	        },

	        /**
	         * Finalizes the encryption or decryption process.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after final processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.finalize();
	         *     var encrypted = cipher.finalize('data');
	         *     var encrypted = cipher.finalize(wordArray);
	         */
	        finalize: function (dataUpdate) {
	            // Final data update
	            if (dataUpdate) {
	                this._append(dataUpdate);
	            }

	            // Perform concrete-cipher logic
	            var finalProcessedData = this._doFinalize();

	            return finalProcessedData;
	        },

	        keySize: 128/32,

	        ivSize: 128/32,

	        _ENC_XFORM_MODE: 1,

	        _DEC_XFORM_MODE: 2,

	        /**
	         * Creates shortcut functions to a cipher's object interface.
	         *
	         * @param {Cipher} cipher The cipher to create a helper for.
	         *
	         * @return {Object} An object with encrypt and decrypt shortcut functions.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
	         */
	        _createHelper: (function () {
	            function selectCipherStrategy(key) {
	                if (typeof key == 'string') {
	                    return PasswordBasedCipher;
	                } else {
	                    return SerializableCipher;
	                }
	            }

	            return function (cipher) {
	                return {
	                    encrypt: function (message, key, cfg) {
	                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
	                    },

	                    decrypt: function (ciphertext, key, cfg) {
	                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
	                    }
	                };
	            };
	        }())
	    });

	    /**
	     * Abstract base stream cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
	     */
	    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
	        _doFinalize: function () {
	            // Process partial blocks
	            var finalProcessedBlocks = this._process(!!'flush');

	            return finalProcessedBlocks;
	        },

	        blockSize: 1
	    });

	    /**
	     * Mode namespace.
	     */
	    var C_mode = C.mode = {};

	    /**
	     * Abstract base block cipher mode template.
	     */
	    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
	        /**
	         * Creates this mode for encryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
	         */
	        createEncryptor: function (cipher, iv) {
	            return this.Encryptor.create(cipher, iv);
	        },

	        /**
	         * Creates this mode for decryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
	         */
	        createDecryptor: function (cipher, iv) {
	            return this.Decryptor.create(cipher, iv);
	        },

	        /**
	         * Initializes a newly created mode.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
	         */
	        init: function (cipher, iv) {
	            this._cipher = cipher;
	            this._iv = iv;
	        }
	    });

	    /**
	     * Cipher Block Chaining mode.
	     */
	    var CBC = C_mode.CBC = (function () {
	        /**
	         * Abstract base CBC mode.
	         */
	        var CBC = BlockCipherMode.extend();

	        /**
	         * CBC encryptor.
	         */
	        CBC.Encryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // XOR and encrypt
	                xorBlock.call(this, words, offset, blockSize);
	                cipher.encryptBlock(words, offset);

	                // Remember this block to use with next block
	                this._prevBlock = words.slice(offset, offset + blockSize);
	            }
	        });

	        /**
	         * CBC decryptor.
	         */
	        CBC.Decryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // Remember this block to use with next block
	                var thisBlock = words.slice(offset, offset + blockSize);

	                // Decrypt and XOR
	                cipher.decryptBlock(words, offset);
	                xorBlock.call(this, words, offset, blockSize);

	                // This block becomes the previous block
	                this._prevBlock = thisBlock;
	            }
	        });

	        function xorBlock(words, offset, blockSize) {
	            // Shortcut
	            var iv = this._iv;

	            // Choose mixing block
	            if (iv) {
	                var block = iv;

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            } else {
	                var block = this._prevBlock;
	            }

	            // XOR blocks
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= block[i];
	            }
	        }

	        return CBC;
	    }());

	    /**
	     * Padding namespace.
	     */
	    var C_pad = C.pad = {};

	    /**
	     * PKCS #5/7 padding strategy.
	     */
	    var Pkcs7 = C_pad.Pkcs7 = {
	        /**
	         * Pads data using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to pad.
	         * @param {number} blockSize The multiple that the data should be padded to.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
	         */
	        pad: function (data, blockSize) {
	            // Shortcut
	            var blockSizeBytes = blockSize * 4;

	            // Count padding bytes
	            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	            // Create padding word
	            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

	            // Create padding
	            var paddingWords = [];
	            for (var i = 0; i < nPaddingBytes; i += 4) {
	                paddingWords.push(paddingWord);
	            }
	            var padding = WordArray.create(paddingWords, nPaddingBytes);

	            // Add padding
	            data.concat(padding);
	        },

	        /**
	         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to unpad.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
	         */
	        unpad: function (data) {
	            // Get number of padding bytes from last byte
	            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	            // Remove padding
	            data.sigBytes -= nPaddingBytes;
	        }
	    };

	    /**
	     * Abstract base block cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
	     */
	    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Mode} mode The block mode to use. Default: CBC
	         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
	         */
	        cfg: Cipher.cfg.extend({
	            mode: CBC,
	            padding: Pkcs7
	        }),

	        reset: function () {
	            // Reset cipher
	            Cipher.reset.call(this);

	            // Shortcuts
	            var cfg = this.cfg;
	            var iv = cfg.iv;
	            var mode = cfg.mode;

	            // Reset block mode
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                var modeCreator = mode.createEncryptor;
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                var modeCreator = mode.createDecryptor;
	                // Keep at least one block in the buffer for unpadding
	                this._minBufferSize = 1;
	            }

	            if (this._mode && this._mode.__creator == modeCreator) {
	                this._mode.init(this, iv && iv.words);
	            } else {
	                this._mode = modeCreator.call(mode, this, iv && iv.words);
	                this._mode.__creator = modeCreator;
	            }
	        },

	        _doProcessBlock: function (words, offset) {
	            this._mode.processBlock(words, offset);
	        },

	        _doFinalize: function () {
	            // Shortcut
	            var padding = this.cfg.padding;

	            // Finalize
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                // Pad data
	                padding.pad(this._data, this.blockSize);

	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');

	                // Unpad data
	                padding.unpad(finalProcessedBlocks);
	            }

	            return finalProcessedBlocks;
	        },

	        blockSize: 128/32
	    });

	    /**
	     * A collection of cipher parameters.
	     *
	     * @property {WordArray} ciphertext The raw ciphertext.
	     * @property {WordArray} key The key to this ciphertext.
	     * @property {WordArray} iv The IV used in the ciphering operation.
	     * @property {WordArray} salt The salt used with a key derivation function.
	     * @property {Cipher} algorithm The cipher algorithm.
	     * @property {Mode} mode The block mode used in the ciphering operation.
	     * @property {Padding} padding The padding scheme used in the ciphering operation.
	     * @property {number} blockSize The block size of the cipher.
	     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
	     */
	    var CipherParams = C_lib.CipherParams = Base.extend({
	        /**
	         * Initializes a newly created cipher params object.
	         *
	         * @param {Object} cipherParams An object with any of the possible cipher parameters.
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.lib.CipherParams.create({
	         *         ciphertext: ciphertextWordArray,
	         *         key: keyWordArray,
	         *         iv: ivWordArray,
	         *         salt: saltWordArray,
	         *         algorithm: CryptoJS.algo.AES,
	         *         mode: CryptoJS.mode.CBC,
	         *         padding: CryptoJS.pad.PKCS7,
	         *         blockSize: 4,
	         *         formatter: CryptoJS.format.OpenSSL
	         *     });
	         */
	        init: function (cipherParams) {
	            this.mixIn(cipherParams);
	        },

	        /**
	         * Converts this cipher params object to a string.
	         *
	         * @param {Format} formatter (Optional) The formatting strategy to use.
	         *
	         * @return {string} The stringified cipher params.
	         *
	         * @throws Error If neither the formatter nor the default formatter is set.
	         *
	         * @example
	         *
	         *     var string = cipherParams + '';
	         *     var string = cipherParams.toString();
	         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
	         */
	        toString: function (formatter) {
	            return (formatter || this.formatter).stringify(this);
	        }
	    });

	    /**
	     * Format namespace.
	     */
	    var C_format = C.format = {};

	    /**
	     * OpenSSL formatting strategy.
	     */
	    var OpenSSLFormatter = C_format.OpenSSL = {
	        /**
	         * Converts a cipher params object to an OpenSSL-compatible string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The OpenSSL-compatible string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            // Shortcuts
	            var ciphertext = cipherParams.ciphertext;
	            var salt = cipherParams.salt;

	            // Format
	            if (salt) {
	                var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
	            } else {
	                var wordArray = ciphertext;
	            }

	            return wordArray.toString(Base64);
	        },

	        /**
	         * Converts an OpenSSL-compatible string to a cipher params object.
	         *
	         * @param {string} openSSLStr The OpenSSL-compatible string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
	         */
	        parse: function (openSSLStr) {
	            // Parse base64
	            var ciphertext = Base64.parse(openSSLStr);

	            // Shortcut
	            var ciphertextWords = ciphertext.words;

	            // Test for salt
	            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
	                // Extract salt
	                var salt = WordArray.create(ciphertextWords.slice(2, 4));

	                // Remove salt from ciphertext
	                ciphertextWords.splice(0, 4);
	                ciphertext.sigBytes -= 16;
	            }

	            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
	        }
	    };

	    /**
	     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
	     */
	    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
	         */
	        cfg: Base.extend({
	            format: OpenSSLFormatter
	        }),

	        /**
	         * Encrypts a message.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Encrypt
	            var encryptor = cipher.createEncryptor(key, cfg);
	            var ciphertext = encryptor.finalize(message);

	            // Shortcut
	            var cipherCfg = encryptor.cfg;

	            // Create and return serializable cipher params
	            return CipherParams.create({
	                ciphertext: ciphertext,
	                key: key,
	                iv: cipherCfg.iv,
	                algorithm: cipher,
	                mode: cipherCfg.mode,
	                padding: cipherCfg.padding,
	                blockSize: cipher.blockSize,
	                formatter: cfg.format
	            });
	        },

	        /**
	         * Decrypts serialized ciphertext.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Decrypt
	            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

	            return plaintext;
	        },

	        /**
	         * Converts serialized ciphertext to CipherParams,
	         * else assumed CipherParams already and returns ciphertext unchanged.
	         *
	         * @param {CipherParams|string} ciphertext The ciphertext.
	         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
	         *
	         * @return {CipherParams} The unserialized ciphertext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
	         */
	        _parse: function (ciphertext, format) {
	            if (typeof ciphertext == 'string') {
	                return format.parse(ciphertext, this);
	            } else {
	                return ciphertext;
	            }
	        }
	    });

	    /**
	     * Key derivation function namespace.
	     */
	    var C_kdf = C.kdf = {};

	    /**
	     * OpenSSL key derivation function.
	     */
	    var OpenSSLKdf = C_kdf.OpenSSL = {
	        /**
	         * Derives a key and IV from a password.
	         *
	         * @param {string} password The password to derive from.
	         * @param {number} keySize The size in words of the key to generate.
	         * @param {number} ivSize The size in words of the IV to generate.
	         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
	         *
	         * @return {CipherParams} A cipher params object with the key, IV, and salt.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
	         */
	        execute: function (password, keySize, ivSize, salt) {
	            // Generate random salt
	            if (!salt) {
	                salt = WordArray.random(64/8);
	            }

	            // Derive key and IV
	            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

	            // Separate key and IV
	            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
	            key.sigBytes = keySize * 4;

	            // Return params
	            return CipherParams.create({ key: key, iv: iv, salt: salt });
	        }
	    };

	    /**
	     * A serializable cipher wrapper that derives the key from a password,
	     * and returns ciphertext as a serializable cipher params object.
	     */
	    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
	         */
	        cfg: SerializableCipher.cfg.extend({
	            kdf: OpenSSLKdf
	        }),

	        /**
	         * Encrypts a message using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Encrypt
	            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

	            // Mix in derived params
	            ciphertext.mixIn(derivedParams);

	            return ciphertext;
	        },

	        /**
	         * Decrypts serialized ciphertext using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Decrypt
	            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

	            return plaintext;
	        }
	    });
	}());


}));

/***/ }),

/***/ "./node_modules/crypto-js/core.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/core.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else {}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),

/***/ "./node_modules/crypto-js/enc-base64.js":
/*!**********************************************!*\
  !*** ./node_modules/crypto-js/enc-base64.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));

/***/ }),

/***/ "./node_modules/crypto-js/enc-utf16.js":
/*!*********************************************!*\
  !*** ./node_modules/crypto-js/enc-utf16.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * UTF-16 BE encoding strategy.
	     */
	    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
	        /**
	         * Converts a word array to a UTF-16 BE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 BE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 BE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 BE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    /**
	     * UTF-16 LE encoding strategy.
	     */
	    C_enc.Utf16LE = {
	        /**
	         * Converts a word array to a UTF-16 LE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 LE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 LE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 LE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    function swapEndian(word) {
	        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
	    }
	}());


	return CryptoJS.enc.Utf16;

}));

/***/ }),

/***/ "./node_modules/crypto-js/evpkdf.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/evpkdf.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./sha1 */ "./node_modules/crypto-js/sha1.js"), __webpack_require__(/*! ./hmac */ "./node_modules/crypto-js/hmac.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var MD5 = C_algo.MD5;

	    /**
	     * This key derivation function is meant to conform with EVP_BytesToKey.
	     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
	     */
	    var EvpKDF = C_algo.EvpKDF = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: MD5,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.EvpKDF.create();
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Derives a key from a password.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init hasher
	            var hasher = cfg.hasher.create();

	            // Initial values
	            var derivedKey = WordArray.create();

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                if (block) {
	                    hasher.update(block);
	                }
	                var block = hasher.update(password).finalize(salt);
	                hasher.reset();

	                // Iterations
	                for (var i = 1; i < iterations; i++) {
	                    block = hasher.finalize(block);
	                    hasher.reset();
	                }

	                derivedKey.concat(block);
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Derives a key from a password.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.EvpKDF(password, salt);
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.EvpKDF = function (password, salt, cfg) {
	        return EvpKDF.create(cfg).compute(password, salt);
	    };
	}());


	return CryptoJS.EvpKDF;

}));

/***/ }),

/***/ "./node_modules/crypto-js/format-hex.js":
/*!**********************************************!*\
  !*** ./node_modules/crypto-js/format-hex.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var CipherParams = C_lib.CipherParams;
	    var C_enc = C.enc;
	    var Hex = C_enc.Hex;
	    var C_format = C.format;

	    var HexFormatter = C_format.Hex = {
	        /**
	         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The hexadecimally encoded string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            return cipherParams.ciphertext.toString(Hex);
	        },

	        /**
	         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
	         *
	         * @param {string} input The hexadecimally encoded string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
	         */
	        parse: function (input) {
	            var ciphertext = Hex.parse(input);
	            return CipherParams.create({ ciphertext: ciphertext });
	        }
	    };
	}());


	return CryptoJS.format.Hex;

}));

/***/ }),

/***/ "./node_modules/crypto-js/hmac.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/hmac.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));

/***/ }),

/***/ "./node_modules/crypto-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/crypto-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./x64-core */ "./node_modules/crypto-js/x64-core.js"), __webpack_require__(/*! ./lib-typedarrays */ "./node_modules/crypto-js/lib-typedarrays.js"), __webpack_require__(/*! ./enc-utf16 */ "./node_modules/crypto-js/enc-utf16.js"), __webpack_require__(/*! ./enc-base64 */ "./node_modules/crypto-js/enc-base64.js"), __webpack_require__(/*! ./md5 */ "./node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./sha1 */ "./node_modules/crypto-js/sha1.js"), __webpack_require__(/*! ./sha256 */ "./node_modules/crypto-js/sha256.js"), __webpack_require__(/*! ./sha224 */ "./node_modules/crypto-js/sha224.js"), __webpack_require__(/*! ./sha512 */ "./node_modules/crypto-js/sha512.js"), __webpack_require__(/*! ./sha384 */ "./node_modules/crypto-js/sha384.js"), __webpack_require__(/*! ./sha3 */ "./node_modules/crypto-js/sha3.js"), __webpack_require__(/*! ./ripemd160 */ "./node_modules/crypto-js/ripemd160.js"), __webpack_require__(/*! ./hmac */ "./node_modules/crypto-js/hmac.js"), __webpack_require__(/*! ./pbkdf2 */ "./node_modules/crypto-js/pbkdf2.js"), __webpack_require__(/*! ./evpkdf */ "./node_modules/crypto-js/evpkdf.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"), __webpack_require__(/*! ./mode-cfb */ "./node_modules/crypto-js/mode-cfb.js"), __webpack_require__(/*! ./mode-ctr */ "./node_modules/crypto-js/mode-ctr.js"), __webpack_require__(/*! ./mode-ctr-gladman */ "./node_modules/crypto-js/mode-ctr-gladman.js"), __webpack_require__(/*! ./mode-ofb */ "./node_modules/crypto-js/mode-ofb.js"), __webpack_require__(/*! ./mode-ecb */ "./node_modules/crypto-js/mode-ecb.js"), __webpack_require__(/*! ./pad-ansix923 */ "./node_modules/crypto-js/pad-ansix923.js"), __webpack_require__(/*! ./pad-iso10126 */ "./node_modules/crypto-js/pad-iso10126.js"), __webpack_require__(/*! ./pad-iso97971 */ "./node_modules/crypto-js/pad-iso97971.js"), __webpack_require__(/*! ./pad-zeropadding */ "./node_modules/crypto-js/pad-zeropadding.js"), __webpack_require__(/*! ./pad-nopadding */ "./node_modules/crypto-js/pad-nopadding.js"), __webpack_require__(/*! ./format-hex */ "./node_modules/crypto-js/format-hex.js"), __webpack_require__(/*! ./aes */ "./node_modules/crypto-js/aes.js"), __webpack_require__(/*! ./tripledes */ "./node_modules/crypto-js/tripledes.js"), __webpack_require__(/*! ./rc4 */ "./node_modules/crypto-js/rc4.js"), __webpack_require__(/*! ./rabbit */ "./node_modules/crypto-js/rabbit.js"), __webpack_require__(/*! ./rabbit-legacy */ "./node_modules/crypto-js/rabbit-legacy.js"));
	}
	else {}
}(this, function (CryptoJS) {

	return CryptoJS;

}));

/***/ }),

/***/ "./node_modules/crypto-js/lib-typedarrays.js":
/*!***************************************************!*\
  !*** ./node_modules/crypto-js/lib-typedarrays.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Check if typed arrays are supported
	    if (typeof ArrayBuffer != 'function') {
	        return;
	    }

	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;

	    // Reference original init
	    var superInit = WordArray.init;

	    // Augment WordArray.init to handle typed arrays
	    var subInit = WordArray.init = function (typedArray) {
	        // Convert buffers to uint8
	        if (typedArray instanceof ArrayBuffer) {
	            typedArray = new Uint8Array(typedArray);
	        }

	        // Convert other array views to uint8
	        if (
	            typedArray instanceof Int8Array ||
	            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
	            typedArray instanceof Int16Array ||
	            typedArray instanceof Uint16Array ||
	            typedArray instanceof Int32Array ||
	            typedArray instanceof Uint32Array ||
	            typedArray instanceof Float32Array ||
	            typedArray instanceof Float64Array
	        ) {
	            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
	        }

	        // Handle Uint8Array
	        if (typedArray instanceof Uint8Array) {
	            // Shortcut
	            var typedArrayByteLength = typedArray.byteLength;

	            // Extract bytes
	            var words = [];
	            for (var i = 0; i < typedArrayByteLength; i++) {
	                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
	            }

	            // Initialize this word array
	            superInit.call(this, words, typedArrayByteLength);
	        } else {
	            // Else call normal init
	            superInit.apply(this, arguments);
	        }
	    };

	    subInit.prototype = WordArray;
	}());


	return CryptoJS.lib.WordArray;

}));

/***/ }),

/***/ "./node_modules/crypto-js/md5.js":
/*!***************************************!*\
  !*** ./node_modules/crypto-js/md5.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));

/***/ }),

/***/ "./node_modules/crypto-js/mode-cfb.js":
/*!********************************************!*\
  !*** ./node_modules/crypto-js/mode-cfb.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Cipher Feedback block mode.
	 */
	CryptoJS.mode.CFB = (function () {
	    var CFB = CryptoJS.lib.BlockCipherMode.extend();

	    CFB.Encryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;

	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

	            // Remember this block to use with next block
	            this._prevBlock = words.slice(offset, offset + blockSize);
	        }
	    });

	    CFB.Decryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;

	            // Remember this block to use with next block
	            var thisBlock = words.slice(offset, offset + blockSize);

	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

	            // This block becomes the previous block
	            this._prevBlock = thisBlock;
	        }
	    });

	    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
	        // Shortcut
	        var iv = this._iv;

	        // Generate keystream
	        if (iv) {
	            var keystream = iv.slice(0);

	            // Remove IV for subsequent blocks
	            this._iv = undefined;
	        } else {
	            var keystream = this._prevBlock;
	        }
	        cipher.encryptBlock(keystream, 0);

	        // Encrypt
	        for (var i = 0; i < blockSize; i++) {
	            words[offset + i] ^= keystream[i];
	        }
	    }

	    return CFB;
	}());


	return CryptoJS.mode.CFB;

}));

/***/ }),

/***/ "./node_modules/crypto-js/mode-ctr-gladman.js":
/*!****************************************************!*\
  !*** ./node_modules/crypto-js/mode-ctr-gladman.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/** @preserve
	 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
	 * derived from CryptoJS.mode.CTR
	 * Jan Hruby jhruby.web@gmail.com
	 */
	CryptoJS.mode.CTRGladman = (function () {
	    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

		function incWord(word)
		{
			if (((word >> 24) & 0xff) === 0xff) { //overflow
			var b1 = (word >> 16)&0xff;
			var b2 = (word >> 8)&0xff;
			var b3 = word & 0xff;

			if (b1 === 0xff) // overflow b1
			{
			b1 = 0;
			if (b2 === 0xff)
			{
				b2 = 0;
				if (b3 === 0xff)
				{
					b3 = 0;
				}
				else
				{
					++b3;
				}
			}
			else
			{
				++b2;
			}
			}
			else
			{
			++b1;
			}

			word = 0;
			word += (b1 << 16);
			word += (b2 << 8);
			word += b3;
			}
			else
			{
			word += (0x01 << 24);
			}
			return word;
		}

		function incCounter(counter)
		{
			if ((counter[0] = incWord(counter[0])) === 0)
			{
				// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
				counter[1] = incWord(counter[1]);
			}
			return counter;
		}

	    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;

	            // Generate keystream
	            if (iv) {
	                counter = this._counter = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }

				incCounter(counter);

				var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    CTRGladman.Decryptor = Encryptor;

	    return CTRGladman;
	}());




	return CryptoJS.mode.CTRGladman;

}));

/***/ }),

/***/ "./node_modules/crypto-js/mode-ctr.js":
/*!********************************************!*\
  !*** ./node_modules/crypto-js/mode-ctr.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Counter block mode.
	 */
	CryptoJS.mode.CTR = (function () {
	    var CTR = CryptoJS.lib.BlockCipherMode.extend();

	    var Encryptor = CTR.Encryptor = CTR.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;

	            // Generate keystream
	            if (iv) {
	                counter = this._counter = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }
	            var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);

	            // Increment counter
	            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    CTR.Decryptor = Encryptor;

	    return CTR;
	}());


	return CryptoJS.mode.CTR;

}));

/***/ }),

/***/ "./node_modules/crypto-js/mode-ecb.js":
/*!********************************************!*\
  !*** ./node_modules/crypto-js/mode-ecb.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Electronic Codebook block mode.
	 */
	CryptoJS.mode.ECB = (function () {
	    var ECB = CryptoJS.lib.BlockCipherMode.extend();

	    ECB.Encryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.encryptBlock(words, offset);
	        }
	    });

	    ECB.Decryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.decryptBlock(words, offset);
	        }
	    });

	    return ECB;
	}());


	return CryptoJS.mode.ECB;

}));

/***/ }),

/***/ "./node_modules/crypto-js/mode-ofb.js":
/*!********************************************!*\
  !*** ./node_modules/crypto-js/mode-ofb.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Output Feedback block mode.
	 */
	CryptoJS.mode.OFB = (function () {
	    var OFB = CryptoJS.lib.BlockCipherMode.extend();

	    var Encryptor = OFB.Encryptor = OFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var keystream = this._keystream;

	            // Generate keystream
	            if (iv) {
	                keystream = this._keystream = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }
	            cipher.encryptBlock(keystream, 0);

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    OFB.Decryptor = Encryptor;

	    return OFB;
	}());


	return CryptoJS.mode.OFB;

}));

/***/ }),

/***/ "./node_modules/crypto-js/pad-ansix923.js":
/*!************************************************!*\
  !*** ./node_modules/crypto-js/pad-ansix923.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * ANSI X.923 padding strategy.
	 */
	CryptoJS.pad.AnsiX923 = {
	    pad: function (data, blockSize) {
	        // Shortcuts
	        var dataSigBytes = data.sigBytes;
	        var blockSizeBytes = blockSize * 4;

	        // Count padding bytes
	        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

	        // Compute last byte position
	        var lastBytePos = dataSigBytes + nPaddingBytes - 1;

	        // Pad
	        data.clamp();
	        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
	        data.sigBytes += nPaddingBytes;
	    },

	    unpad: function (data) {
	        // Get number of padding bytes from last byte
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	        // Remove padding
	        data.sigBytes -= nPaddingBytes;
	    }
	};


	return CryptoJS.pad.Ansix923;

}));

/***/ }),

/***/ "./node_modules/crypto-js/pad-iso10126.js":
/*!************************************************!*\
  !*** ./node_modules/crypto-js/pad-iso10126.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * ISO 10126 padding strategy.
	 */
	CryptoJS.pad.Iso10126 = {
	    pad: function (data, blockSize) {
	        // Shortcut
	        var blockSizeBytes = blockSize * 4;

	        // Count padding bytes
	        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	        // Pad
	        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
	             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
	    },

	    unpad: function (data) {
	        // Get number of padding bytes from last byte
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	        // Remove padding
	        data.sigBytes -= nPaddingBytes;
	    }
	};


	return CryptoJS.pad.Iso10126;

}));

/***/ }),

/***/ "./node_modules/crypto-js/pad-iso97971.js":
/*!************************************************!*\
  !*** ./node_modules/crypto-js/pad-iso97971.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * ISO/IEC 9797-1 Padding Method 2.
	 */
	CryptoJS.pad.Iso97971 = {
	    pad: function (data, blockSize) {
	        // Add 0x80 byte
	        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

	        // Zero pad the rest
	        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
	    },

	    unpad: function (data) {
	        // Remove zero padding
	        CryptoJS.pad.ZeroPadding.unpad(data);

	        // Remove one more byte -- the 0x80 byte
	        data.sigBytes--;
	    }
	};


	return CryptoJS.pad.Iso97971;

}));

/***/ }),

/***/ "./node_modules/crypto-js/pad-nopadding.js":
/*!*************************************************!*\
  !*** ./node_modules/crypto-js/pad-nopadding.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * A noop padding strategy.
	 */
	CryptoJS.pad.NoPadding = {
	    pad: function () {
	    },

	    unpad: function () {
	    }
	};


	return CryptoJS.pad.NoPadding;

}));

/***/ }),

/***/ "./node_modules/crypto-js/pad-zeropadding.js":
/*!***************************************************!*\
  !*** ./node_modules/crypto-js/pad-zeropadding.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Zero padding strategy.
	 */
	CryptoJS.pad.ZeroPadding = {
	    pad: function (data, blockSize) {
	        // Shortcut
	        var blockSizeBytes = blockSize * 4;

	        // Pad
	        data.clamp();
	        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
	    },

	    unpad: function (data) {
	        // Shortcut
	        var dataWords = data.words;

	        // Unpad
	        var i = data.sigBytes - 1;
	        while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
	            i--;
	        }
	        data.sigBytes = i + 1;
	    }
	};


	return CryptoJS.pad.ZeroPadding;

}));

/***/ }),

/***/ "./node_modules/crypto-js/pbkdf2.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/pbkdf2.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./sha1 */ "./node_modules/crypto-js/sha1.js"), __webpack_require__(/*! ./hmac */ "./node_modules/crypto-js/hmac.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA1 = C_algo.SHA1;
	    var HMAC = C_algo.HMAC;

	    /**
	     * Password-Based Key Derivation Function 2 algorithm.
	     */
	    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hasher to use. Default: SHA1
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: SHA1,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.PBKDF2.create();
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Computes the Password-Based Key Derivation Function 2.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init HMAC
	            var hmac = HMAC.create(cfg.hasher, password);

	            // Initial values
	            var derivedKey = WordArray.create();
	            var blockIndex = WordArray.create([0x00000001]);

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var blockIndexWords = blockIndex.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                var block = hmac.update(salt).finalize(blockIndex);
	                hmac.reset();

	                // Shortcuts
	                var blockWords = block.words;
	                var blockWordsLength = blockWords.length;

	                // Iterations
	                var intermediate = block;
	                for (var i = 1; i < iterations; i++) {
	                    intermediate = hmac.finalize(intermediate);
	                    hmac.reset();

	                    // Shortcut
	                    var intermediateWords = intermediate.words;

	                    // XOR intermediate with block
	                    for (var j = 0; j < blockWordsLength; j++) {
	                        blockWords[j] ^= intermediateWords[j];
	                    }
	                }

	                derivedKey.concat(block);
	                blockIndexWords[0]++;
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Computes the Password-Based Key Derivation Function 2.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.PBKDF2(password, salt);
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.PBKDF2 = function (password, salt, cfg) {
	        return PBKDF2.create(cfg).compute(password, salt);
	    };
	}());


	return CryptoJS.PBKDF2;

}));

/***/ }),

/***/ "./node_modules/crypto-js/rabbit-legacy.js":
/*!*************************************************!*\
  !*** ./node_modules/crypto-js/rabbit-legacy.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./enc-base64 */ "./node_modules/crypto-js/enc-base64.js"), __webpack_require__(/*! ./md5 */ "./node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./evpkdf */ "./node_modules/crypto-js/evpkdf.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    // Reusable objects
	    var S  = [];
	    var C_ = [];
	    var G  = [];

	    /**
	     * Rabbit stream cipher algorithm.
	     *
	     * This is a legacy version that neglected to convert the key to little-endian.
	     * This error doesn't affect the cipher's security,
	     * but it does affect its compatibility with other implementations.
	     */
	    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var K = this._key.words;
	            var iv = this.cfg.iv;

	            // Generate initial state values
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];

	            // Generate initial counter values
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];

	            // Carry bit
	            this._b = 0;

	            // Iterate the system four times
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }

	            // Modify the counters
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }

	            // IV setup
	            if (iv) {
	                // Shortcuts
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];

	                // Generate four subvectors
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

	                // Modify counter values
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;

	                // Iterate the system four times
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var X = this._X;

	            // Iterate the system
	            nextState.call(this);

	            // Generate four keystream words
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

	            for (var i = 0; i < 4; i++) {
	                // Swap endian
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

	                // Encrypt
	                M[offset + i] ^= S[i];
	            }
	        },

	        blockSize: 128/32,

	        ivSize: 64/32
	    });

	    function nextState() {
	        // Shortcuts
	        var X = this._X;
	        var C = this._C;

	        // Save old counter values
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }

	        // Calculate new counter values
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

	        // Calculate the g-values
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];

	            // Construct high and low argument for squaring
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;

	            // Calculate high and low result of squaring
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

	            // High XOR low
	            G[i] = gh ^ gl;
	        }

	        // Calculate new state values
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
	     */
	    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
	}());


	return CryptoJS.RabbitLegacy;

}));

/***/ }),

/***/ "./node_modules/crypto-js/rabbit.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/rabbit.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./enc-base64 */ "./node_modules/crypto-js/enc-base64.js"), __webpack_require__(/*! ./md5 */ "./node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./evpkdf */ "./node_modules/crypto-js/evpkdf.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    // Reusable objects
	    var S  = [];
	    var C_ = [];
	    var G  = [];

	    /**
	     * Rabbit stream cipher algorithm
	     */
	    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var K = this._key.words;
	            var iv = this.cfg.iv;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
	                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
	            }

	            // Generate initial state values
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];

	            // Generate initial counter values
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];

	            // Carry bit
	            this._b = 0;

	            // Iterate the system four times
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }

	            // Modify the counters
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }

	            // IV setup
	            if (iv) {
	                // Shortcuts
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];

	                // Generate four subvectors
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

	                // Modify counter values
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;

	                // Iterate the system four times
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var X = this._X;

	            // Iterate the system
	            nextState.call(this);

	            // Generate four keystream words
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

	            for (var i = 0; i < 4; i++) {
	                // Swap endian
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

	                // Encrypt
	                M[offset + i] ^= S[i];
	            }
	        },

	        blockSize: 128/32,

	        ivSize: 64/32
	    });

	    function nextState() {
	        // Shortcuts
	        var X = this._X;
	        var C = this._C;

	        // Save old counter values
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }

	        // Calculate new counter values
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

	        // Calculate the g-values
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];

	            // Construct high and low argument for squaring
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;

	            // Calculate high and low result of squaring
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

	            // High XOR low
	            G[i] = gh ^ gl;
	        }

	        // Calculate new state values
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
	     */
	    C.Rabbit = StreamCipher._createHelper(Rabbit);
	}());


	return CryptoJS.Rabbit;

}));

/***/ }),

/***/ "./node_modules/crypto-js/rc4.js":
/*!***************************************!*\
  !*** ./node_modules/crypto-js/rc4.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./enc-base64 */ "./node_modules/crypto-js/enc-base64.js"), __webpack_require__(/*! ./md5 */ "./node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./evpkdf */ "./node_modules/crypto-js/evpkdf.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    /**
	     * RC4 stream cipher algorithm.
	     */
	    var RC4 = C_algo.RC4 = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;
	            var keySigBytes = key.sigBytes;

	            // Init sbox
	            var S = this._S = [];
	            for (var i = 0; i < 256; i++) {
	                S[i] = i;
	            }

	            // Key setup
	            for (var i = 0, j = 0; i < 256; i++) {
	                var keyByteIndex = i % keySigBytes;
	                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

	                j = (j + S[i] + keyByte) % 256;

	                // Swap
	                var t = S[i];
	                S[i] = S[j];
	                S[j] = t;
	            }

	            // Counters
	            this._i = this._j = 0;
	        },

	        _doProcessBlock: function (M, offset) {
	            M[offset] ^= generateKeystreamWord.call(this);
	        },

	        keySize: 256/32,

	        ivSize: 0
	    });

	    function generateKeystreamWord() {
	        // Shortcuts
	        var S = this._S;
	        var i = this._i;
	        var j = this._j;

	        // Generate keystream word
	        var keystreamWord = 0;
	        for (var n = 0; n < 4; n++) {
	            i = (i + 1) % 256;
	            j = (j + S[i]) % 256;

	            // Swap
	            var t = S[i];
	            S[i] = S[j];
	            S[j] = t;

	            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
	        }

	        // Update counters
	        this._i = i;
	        this._j = j;

	        return keystreamWord;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4 = StreamCipher._createHelper(RC4);

	    /**
	     * Modified RC4 stream cipher algorithm.
	     */
	    var RC4Drop = C_algo.RC4Drop = RC4.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} drop The number of keystream words to drop. Default 192
	         */
	        cfg: RC4.cfg.extend({
	            drop: 192
	        }),

	        _doReset: function () {
	            RC4._doReset.call(this);

	            // Drop
	            for (var i = this.cfg.drop; i > 0; i--) {
	                generateKeystreamWord.call(this);
	            }
	        }
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
	}());


	return CryptoJS.RC4;

}));

/***/ }),

/***/ "./node_modules/crypto-js/ripemd160.js":
/*!*********************************************!*\
  !*** ./node_modules/crypto-js/ripemd160.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var _zl = WordArray.create([
	        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
	    var _zr = WordArray.create([
	        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
	    var _sl = WordArray.create([
	         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
	    var _sr = WordArray.create([
	        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);

	    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
	    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

	    /**
	     * RIPEMD160 hash algorithm.
	     */
	    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
	        _doReset: function () {
	            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
	        },

	        _doProcessBlock: function (M, offset) {

	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                // Swap
	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }
	            // Shortcut
	            var H  = this._hash.words;
	            var hl = _hl.words;
	            var hr = _hr.words;
	            var zl = _zl.words;
	            var zr = _zr.words;
	            var sl = _sl.words;
	            var sr = _sr.words;

	            // Working variables
	            var al, bl, cl, dl, el;
	            var ar, br, cr, dr, er;

	            ar = al = H[0];
	            br = bl = H[1];
	            cr = cl = H[2];
	            dr = dl = H[3];
	            er = el = H[4];
	            // Computation
	            var t;
	            for (var i = 0; i < 80; i += 1) {
	                t = (al +  M[offset+zl[i]])|0;
	                if (i<16){
		            t +=  f1(bl,cl,dl) + hl[0];
	                } else if (i<32) {
		            t +=  f2(bl,cl,dl) + hl[1];
	                } else if (i<48) {
		            t +=  f3(bl,cl,dl) + hl[2];
	                } else if (i<64) {
		            t +=  f4(bl,cl,dl) + hl[3];
	                } else {// if (i<80) {
		            t +=  f5(bl,cl,dl) + hl[4];
	                }
	                t = t|0;
	                t =  rotl(t,sl[i]);
	                t = (t+el)|0;
	                al = el;
	                el = dl;
	                dl = rotl(cl, 10);
	                cl = bl;
	                bl = t;

	                t = (ar + M[offset+zr[i]])|0;
	                if (i<16){
		            t +=  f5(br,cr,dr) + hr[0];
	                } else if (i<32) {
		            t +=  f4(br,cr,dr) + hr[1];
	                } else if (i<48) {
		            t +=  f3(br,cr,dr) + hr[2];
	                } else if (i<64) {
		            t +=  f2(br,cr,dr) + hr[3];
	                } else {// if (i<80) {
		            t +=  f1(br,cr,dr) + hr[4];
	                }
	                t = t|0;
	                t =  rotl(t,sr[i]) ;
	                t = (t+er)|0;
	                ar = er;
	                er = dr;
	                dr = rotl(cr, 10);
	                cr = br;
	                br = t;
	            }
	            // Intermediate hash value
	            t    = (H[1] + cl + dr)|0;
	            H[1] = (H[2] + dl + er)|0;
	            H[2] = (H[3] + el + ar)|0;
	            H[3] = (H[4] + al + br)|0;
	            H[4] = (H[0] + bl + cr)|0;
	            H[0] =  t;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	            );
	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 5; i++) {
	                // Shortcut
	                var H_i = H[i];

	                // Swap
	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });


	    function f1(x, y, z) {
	        return ((x) ^ (y) ^ (z));

	    }

	    function f2(x, y, z) {
	        return (((x)&(y)) | ((~x)&(z)));
	    }

	    function f3(x, y, z) {
	        return (((x) | (~(y))) ^ (z));
	    }

	    function f4(x, y, z) {
	        return (((x) & (z)) | ((y)&(~(z))));
	    }

	    function f5(x, y, z) {
	        return ((x) ^ ((y) |(~(z))));

	    }

	    function rotl(x,n) {
	        return (x<<n) | (x>>>(32-n));
	    }


	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.RIPEMD160('message');
	     *     var hash = CryptoJS.RIPEMD160(wordArray);
	     */
	    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
	     */
	    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
	}(Math));


	return CryptoJS.RIPEMD160;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha1.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/sha1.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];

	            // Computation
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }

	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }

	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());


	return CryptoJS.SHA1;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha224.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha224.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./sha256 */ "./node_modules/crypto-js/sha256.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA256 = C_algo.SHA256;

	    /**
	     * SHA-224 hash algorithm.
	     */
	    var SHA224 = C_algo.SHA224 = SHA256.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA256._doFinalize.call(this);

	            hash.sigBytes -= 4;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA224('message');
	     *     var hash = CryptoJS.SHA224(wordArray);
	     */
	    C.SHA224 = SHA256._createHelper(SHA224);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA224(message, key);
	     */
	    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
	}());


	return CryptoJS.SHA224;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha256.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha256.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha3.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/sha3.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./x64-core */ "./node_modules/crypto-js/x64-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var C_algo = C.algo;

	    // Constants tables
	    var RHO_OFFSETS = [];
	    var PI_INDEXES  = [];
	    var ROUND_CONSTANTS = [];

	    // Compute Constants
	    (function () {
	        // Compute rho offset constants
	        var x = 1, y = 0;
	        for (var t = 0; t < 24; t++) {
	            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

	            var newX = y % 5;
	            var newY = (2 * x + 3 * y) % 5;
	            x = newX;
	            y = newY;
	        }

	        // Compute pi index constants
	        for (var x = 0; x < 5; x++) {
	            for (var y = 0; y < 5; y++) {
	                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
	            }
	        }

	        // Compute round constants
	        var LFSR = 0x01;
	        for (var i = 0; i < 24; i++) {
	            var roundConstantMsw = 0;
	            var roundConstantLsw = 0;

	            for (var j = 0; j < 7; j++) {
	                if (LFSR & 0x01) {
	                    var bitPosition = (1 << j) - 1;
	                    if (bitPosition < 32) {
	                        roundConstantLsw ^= 1 << bitPosition;
	                    } else /* if (bitPosition >= 32) */ {
	                        roundConstantMsw ^= 1 << (bitPosition - 32);
	                    }
	                }

	                // Compute next LFSR
	                if (LFSR & 0x80) {
	                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
	                    LFSR = (LFSR << 1) ^ 0x71;
	                } else {
	                    LFSR <<= 1;
	                }
	            }

	            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
	        }
	    }());

	    // Reusable objects for temporary values
	    var T = [];
	    (function () {
	        for (var i = 0; i < 25; i++) {
	            T[i] = X64Word.create();
	        }
	    }());

	    /**
	     * SHA-3 hash algorithm.
	     */
	    var SHA3 = C_algo.SHA3 = Hasher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} outputLength
	         *   The desired number of bits in the output hash.
	         *   Only values permitted are: 224, 256, 384, 512.
	         *   Default: 512
	         */
	        cfg: Hasher.cfg.extend({
	            outputLength: 512
	        }),

	        _doReset: function () {
	            var state = this._state = []
	            for (var i = 0; i < 25; i++) {
	                state[i] = new X64Word.init();
	            }

	            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var state = this._state;
	            var nBlockSizeLanes = this.blockSize / 2;

	            // Absorb
	            for (var i = 0; i < nBlockSizeLanes; i++) {
	                // Shortcuts
	                var M2i  = M[offset + 2 * i];
	                var M2i1 = M[offset + 2 * i + 1];

	                // Swap endian
	                M2i = (
	                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
	                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
	                );
	                M2i1 = (
	                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
	                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
	                );

	                // Absorb message into state
	                var lane = state[i];
	                lane.high ^= M2i1;
	                lane.low  ^= M2i;
	            }

	            // Rounds
	            for (var round = 0; round < 24; round++) {
	                // Theta
	                for (var x = 0; x < 5; x++) {
	                    // Mix column lanes
	                    var tMsw = 0, tLsw = 0;
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        tMsw ^= lane.high;
	                        tLsw ^= lane.low;
	                    }

	                    // Temporary values
	                    var Tx = T[x];
	                    Tx.high = tMsw;
	                    Tx.low  = tLsw;
	                }
	                for (var x = 0; x < 5; x++) {
	                    // Shortcuts
	                    var Tx4 = T[(x + 4) % 5];
	                    var Tx1 = T[(x + 1) % 5];
	                    var Tx1Msw = Tx1.high;
	                    var Tx1Lsw = Tx1.low;

	                    // Mix surrounding columns
	                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
	                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        lane.high ^= tMsw;
	                        lane.low  ^= tLsw;
	                    }
	                }

	                // Rho Pi
	                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
	                    // Shortcuts
	                    var lane = state[laneIndex];
	                    var laneMsw = lane.high;
	                    var laneLsw = lane.low;
	                    var rhoOffset = RHO_OFFSETS[laneIndex];

	                    // Rotate lanes
	                    if (rhoOffset < 32) {
	                        var tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
	                        var tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
	                    } else /* if (rhoOffset >= 32) */ {
	                        var tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
	                        var tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
	                    }

	                    // Transpose lanes
	                    var TPiLane = T[PI_INDEXES[laneIndex]];
	                    TPiLane.high = tMsw;
	                    TPiLane.low  = tLsw;
	                }

	                // Rho pi at x = y = 0
	                var T0 = T[0];
	                var state0 = state[0];
	                T0.high = state0.high;
	                T0.low  = state0.low;

	                // Chi
	                for (var x = 0; x < 5; x++) {
	                    for (var y = 0; y < 5; y++) {
	                        // Shortcuts
	                        var laneIndex = x + 5 * y;
	                        var lane = state[laneIndex];
	                        var TLane = T[laneIndex];
	                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
	                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

	                        // Mix rows
	                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
	                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
	                    }
	                }

	                // Iota
	                var lane = state[0];
	                var roundConstant = ROUND_CONSTANTS[round];
	                lane.high ^= roundConstant.high;
	                lane.low  ^= roundConstant.low;;
	            }
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;
	            var blockSizeBits = this.blockSize * 32;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
	            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var state = this._state;
	            var outputLengthBytes = this.cfg.outputLength / 8;
	            var outputLengthLanes = outputLengthBytes / 8;

	            // Squeeze
	            var hashWords = [];
	            for (var i = 0; i < outputLengthLanes; i++) {
	                // Shortcuts
	                var lane = state[i];
	                var laneMsw = lane.high;
	                var laneLsw = lane.low;

	                // Swap endian
	                laneMsw = (
	                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
	                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
	                );
	                laneLsw = (
	                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
	                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
	                );

	                // Squeeze state to retrieve hash
	                hashWords.push(laneLsw);
	                hashWords.push(laneMsw);
	            }

	            // Return final computed hash
	            return new WordArray.init(hashWords, outputLengthBytes);
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);

	            var state = clone._state = this._state.slice(0);
	            for (var i = 0; i < 25; i++) {
	                state[i] = state[i].clone();
	            }

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA3('message');
	     *     var hash = CryptoJS.SHA3(wordArray);
	     */
	    C.SHA3 = Hasher._createHelper(SHA3);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA3(message, key);
	     */
	    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
	}(Math));


	return CryptoJS.SHA3;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha384.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha384.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./x64-core */ "./node_modules/crypto-js/x64-core.js"), __webpack_require__(/*! ./sha512 */ "./node_modules/crypto-js/sha512.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;
	    var SHA512 = C_algo.SHA512;

	    /**
	     * SHA-384 hash algorithm.
	     */
	    var SHA384 = C_algo.SHA384 = SHA512.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
	                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
	                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
	                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA512._doFinalize.call(this);

	            hash.sigBytes -= 16;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA384('message');
	     *     var hash = CryptoJS.SHA384(wordArray);
	     */
	    C.SHA384 = SHA512._createHelper(SHA384);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA384(message, key);
	     */
	    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
	}());


	return CryptoJS.SHA384;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha512.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha512.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./x64-core */ "./node_modules/crypto-js/x64-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;

	    function X64Word_create() {
	        return X64Word.create.apply(X64Word, arguments);
	    }

	    // Constants
	    var K = [
	        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
	        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
	        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
	        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
	        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
	        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
	        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
	        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
	        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
	        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
	        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
	        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
	        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
	        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
	        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
	        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
	        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
	        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
	        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
	        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
	        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
	        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
	        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
	        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
	        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
	        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
	        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
	        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
	        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
	        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
	        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
	        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
	        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
	        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
	        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
	        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
	        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
	        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
	        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
	        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
	    ];

	    // Reusable objects
	    var W = [];
	    (function () {
	        for (var i = 0; i < 80; i++) {
	            W[i] = X64Word_create();
	        }
	    }());

	    /**
	     * SHA-512 hash algorithm.
	     */
	    var SHA512 = C_algo.SHA512 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
	                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
	                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
	                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var H = this._hash.words;

	            var H0 = H[0];
	            var H1 = H[1];
	            var H2 = H[2];
	            var H3 = H[3];
	            var H4 = H[4];
	            var H5 = H[5];
	            var H6 = H[6];
	            var H7 = H[7];

	            var H0h = H0.high;
	            var H0l = H0.low;
	            var H1h = H1.high;
	            var H1l = H1.low;
	            var H2h = H2.high;
	            var H2l = H2.low;
	            var H3h = H3.high;
	            var H3l = H3.low;
	            var H4h = H4.high;
	            var H4l = H4.low;
	            var H5h = H5.high;
	            var H5l = H5.low;
	            var H6h = H6.high;
	            var H6l = H6.low;
	            var H7h = H7.high;
	            var H7l = H7.low;

	            // Working variables
	            var ah = H0h;
	            var al = H0l;
	            var bh = H1h;
	            var bl = H1l;
	            var ch = H2h;
	            var cl = H2l;
	            var dh = H3h;
	            var dl = H3l;
	            var eh = H4h;
	            var el = H4l;
	            var fh = H5h;
	            var fl = H5l;
	            var gh = H6h;
	            var gl = H6l;
	            var hh = H7h;
	            var hl = H7l;

	            // Rounds
	            for (var i = 0; i < 80; i++) {
	                // Shortcut
	                var Wi = W[i];

	                // Extend message
	                if (i < 16) {
	                    var Wih = Wi.high = M[offset + i * 2]     | 0;
	                    var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	                } else {
	                    // Gamma0
	                    var gamma0x  = W[i - 15];
	                    var gamma0xh = gamma0x.high;
	                    var gamma0xl = gamma0x.low;
	                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

	                    // Gamma1
	                    var gamma1x  = W[i - 2];
	                    var gamma1xh = gamma1x.high;
	                    var gamma1xl = gamma1x.low;
	                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

	                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	                    var Wi7  = W[i - 7];
	                    var Wi7h = Wi7.high;
	                    var Wi7l = Wi7.low;

	                    var Wi16  = W[i - 16];
	                    var Wi16h = Wi16.high;
	                    var Wi16l = Wi16.low;

	                    var Wil = gamma0l + Wi7l;
	                    var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	                    var Wil = Wil + gamma1l;
	                    var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	                    var Wil = Wil + Wi16l;
	                    var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

	                    Wi.high = Wih;
	                    Wi.low  = Wil;
	                }

	                var chh  = (eh & fh) ^ (~eh & gh);
	                var chl  = (el & fl) ^ (~el & gl);
	                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

	                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

	                // t1 = h + sigma1 + ch + K[i] + W[i]
	                var Ki  = K[i];
	                var Kih = Ki.high;
	                var Kil = Ki.low;

	                var t1l = hl + sigma1l;
	                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	                var t1l = t1l + chl;
	                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	                var t1l = t1l + Kil;
	                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	                var t1l = t1l + Wil;
	                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

	                // t2 = sigma0 + maj
	                var t2l = sigma0l + majl;
	                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

	                // Update working variables
	                hh = gh;
	                hl = gl;
	                gh = fh;
	                gl = fl;
	                fh = eh;
	                fl = el;
	                el = (dl + t1l) | 0;
	                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	                dh = ch;
	                dl = cl;
	                ch = bh;
	                cl = bl;
	                bh = ah;
	                bl = al;
	                al = (t1l + t2l) | 0;
	                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	            }

	            // Intermediate hash value
	            H0l = H0.low  = (H0l + al);
	            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	            H1l = H1.low  = (H1l + bl);
	            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	            H2l = H2.low  = (H2l + cl);
	            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	            H3l = H3.low  = (H3l + dl);
	            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	            H4l = H4.low  = (H4l + el);
	            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	            H5l = H5.low  = (H5l + fl);
	            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	            H6l = H6.low  = (H6l + gl);
	            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	            H7l = H7.low  = (H7l + hl);
	            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Convert hash to 32-bit word array before returning
	            var hash = this._hash.toX32();

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        },

	        blockSize: 1024/32
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA512('message');
	     *     var hash = CryptoJS.SHA512(wordArray);
	     */
	    C.SHA512 = Hasher._createHelper(SHA512);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA512(message, key);
	     */
	    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
	}());


	return CryptoJS.SHA512;

}));

/***/ }),

/***/ "./node_modules/crypto-js/tripledes.js":
/*!*********************************************!*\
  !*** ./node_modules/crypto-js/tripledes.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./enc-base64 */ "./node_modules/crypto-js/enc-base64.js"), __webpack_require__(/*! ./md5 */ "./node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./evpkdf */ "./node_modules/crypto-js/evpkdf.js"), __webpack_require__(/*! ./cipher-core */ "./node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Permuted Choice 1 constants
	    var PC1 = [
	        57, 49, 41, 33, 25, 17, 9,  1,
	        58, 50, 42, 34, 26, 18, 10, 2,
	        59, 51, 43, 35, 27, 19, 11, 3,
	        60, 52, 44, 36, 63, 55, 47, 39,
	        31, 23, 15, 7,  62, 54, 46, 38,
	        30, 22, 14, 6,  61, 53, 45, 37,
	        29, 21, 13, 5,  28, 20, 12, 4
	    ];

	    // Permuted Choice 2 constants
	    var PC2 = [
	        14, 17, 11, 24, 1,  5,
	        3,  28, 15, 6,  21, 10,
	        23, 19, 12, 4,  26, 8,
	        16, 7,  27, 20, 13, 2,
	        41, 52, 31, 37, 47, 55,
	        30, 40, 51, 45, 33, 48,
	        44, 49, 39, 56, 34, 53,
	        46, 42, 50, 36, 29, 32
	    ];

	    // Cumulative bit shift constants
	    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

	    // SBOXes and round permutation constants
	    var SBOX_P = [
	        {
	            0x0: 0x808200,
	            0x10000000: 0x8000,
	            0x20000000: 0x808002,
	            0x30000000: 0x2,
	            0x40000000: 0x200,
	            0x50000000: 0x808202,
	            0x60000000: 0x800202,
	            0x70000000: 0x800000,
	            0x80000000: 0x202,
	            0x90000000: 0x800200,
	            0xa0000000: 0x8200,
	            0xb0000000: 0x808000,
	            0xc0000000: 0x8002,
	            0xd0000000: 0x800002,
	            0xe0000000: 0x0,
	            0xf0000000: 0x8202,
	            0x8000000: 0x0,
	            0x18000000: 0x808202,
	            0x28000000: 0x8202,
	            0x38000000: 0x8000,
	            0x48000000: 0x808200,
	            0x58000000: 0x200,
	            0x68000000: 0x808002,
	            0x78000000: 0x2,
	            0x88000000: 0x800200,
	            0x98000000: 0x8200,
	            0xa8000000: 0x808000,
	            0xb8000000: 0x800202,
	            0xc8000000: 0x800002,
	            0xd8000000: 0x8002,
	            0xe8000000: 0x202,
	            0xf8000000: 0x800000,
	            0x1: 0x8000,
	            0x10000001: 0x2,
	            0x20000001: 0x808200,
	            0x30000001: 0x800000,
	            0x40000001: 0x808002,
	            0x50000001: 0x8200,
	            0x60000001: 0x200,
	            0x70000001: 0x800202,
	            0x80000001: 0x808202,
	            0x90000001: 0x808000,
	            0xa0000001: 0x800002,
	            0xb0000001: 0x8202,
	            0xc0000001: 0x202,
	            0xd0000001: 0x800200,
	            0xe0000001: 0x8002,
	            0xf0000001: 0x0,
	            0x8000001: 0x808202,
	            0x18000001: 0x808000,
	            0x28000001: 0x800000,
	            0x38000001: 0x200,
	            0x48000001: 0x8000,
	            0x58000001: 0x800002,
	            0x68000001: 0x2,
	            0x78000001: 0x8202,
	            0x88000001: 0x8002,
	            0x98000001: 0x800202,
	            0xa8000001: 0x202,
	            0xb8000001: 0x808200,
	            0xc8000001: 0x800200,
	            0xd8000001: 0x0,
	            0xe8000001: 0x8200,
	            0xf8000001: 0x808002
	        },
	        {
	            0x0: 0x40084010,
	            0x1000000: 0x4000,
	            0x2000000: 0x80000,
	            0x3000000: 0x40080010,
	            0x4000000: 0x40000010,
	            0x5000000: 0x40084000,
	            0x6000000: 0x40004000,
	            0x7000000: 0x10,
	            0x8000000: 0x84000,
	            0x9000000: 0x40004010,
	            0xa000000: 0x40000000,
	            0xb000000: 0x84010,
	            0xc000000: 0x80010,
	            0xd000000: 0x0,
	            0xe000000: 0x4010,
	            0xf000000: 0x40080000,
	            0x800000: 0x40004000,
	            0x1800000: 0x84010,
	            0x2800000: 0x10,
	            0x3800000: 0x40004010,
	            0x4800000: 0x40084010,
	            0x5800000: 0x40000000,
	            0x6800000: 0x80000,
	            0x7800000: 0x40080010,
	            0x8800000: 0x80010,
	            0x9800000: 0x0,
	            0xa800000: 0x4000,
	            0xb800000: 0x40080000,
	            0xc800000: 0x40000010,
	            0xd800000: 0x84000,
	            0xe800000: 0x40084000,
	            0xf800000: 0x4010,
	            0x10000000: 0x0,
	            0x11000000: 0x40080010,
	            0x12000000: 0x40004010,
	            0x13000000: 0x40084000,
	            0x14000000: 0x40080000,
	            0x15000000: 0x10,
	            0x16000000: 0x84010,
	            0x17000000: 0x4000,
	            0x18000000: 0x4010,
	            0x19000000: 0x80000,
	            0x1a000000: 0x80010,
	            0x1b000000: 0x40000010,
	            0x1c000000: 0x84000,
	            0x1d000000: 0x40004000,
	            0x1e000000: 0x40000000,
	            0x1f000000: 0x40084010,
	            0x10800000: 0x84010,
	            0x11800000: 0x80000,
	            0x12800000: 0x40080000,
	            0x13800000: 0x4000,
	            0x14800000: 0x40004000,
	            0x15800000: 0x40084010,
	            0x16800000: 0x10,
	            0x17800000: 0x40000000,
	            0x18800000: 0x40084000,
	            0x19800000: 0x40000010,
	            0x1a800000: 0x40004010,
	            0x1b800000: 0x80010,
	            0x1c800000: 0x0,
	            0x1d800000: 0x4010,
	            0x1e800000: 0x40080010,
	            0x1f800000: 0x84000
	        },
	        {
	            0x0: 0x104,
	            0x100000: 0x0,
	            0x200000: 0x4000100,
	            0x300000: 0x10104,
	            0x400000: 0x10004,
	            0x500000: 0x4000004,
	            0x600000: 0x4010104,
	            0x700000: 0x4010000,
	            0x800000: 0x4000000,
	            0x900000: 0x4010100,
	            0xa00000: 0x10100,
	            0xb00000: 0x4010004,
	            0xc00000: 0x4000104,
	            0xd00000: 0x10000,
	            0xe00000: 0x4,
	            0xf00000: 0x100,
	            0x80000: 0x4010100,
	            0x180000: 0x4010004,
	            0x280000: 0x0,
	            0x380000: 0x4000100,
	            0x480000: 0x4000004,
	            0x580000: 0x10000,
	            0x680000: 0x10004,
	            0x780000: 0x104,
	            0x880000: 0x4,
	            0x980000: 0x100,
	            0xa80000: 0x4010000,
	            0xb80000: 0x10104,
	            0xc80000: 0x10100,
	            0xd80000: 0x4000104,
	            0xe80000: 0x4010104,
	            0xf80000: 0x4000000,
	            0x1000000: 0x4010100,
	            0x1100000: 0x10004,
	            0x1200000: 0x10000,
	            0x1300000: 0x4000100,
	            0x1400000: 0x100,
	            0x1500000: 0x4010104,
	            0x1600000: 0x4000004,
	            0x1700000: 0x0,
	            0x1800000: 0x4000104,
	            0x1900000: 0x4000000,
	            0x1a00000: 0x4,
	            0x1b00000: 0x10100,
	            0x1c00000: 0x4010000,
	            0x1d00000: 0x104,
	            0x1e00000: 0x10104,
	            0x1f00000: 0x4010004,
	            0x1080000: 0x4000000,
	            0x1180000: 0x104,
	            0x1280000: 0x4010100,
	            0x1380000: 0x0,
	            0x1480000: 0x10004,
	            0x1580000: 0x4000100,
	            0x1680000: 0x100,
	            0x1780000: 0x4010004,
	            0x1880000: 0x10000,
	            0x1980000: 0x4010104,
	            0x1a80000: 0x10104,
	            0x1b80000: 0x4000004,
	            0x1c80000: 0x4000104,
	            0x1d80000: 0x4010000,
	            0x1e80000: 0x4,
	            0x1f80000: 0x10100
	        },
	        {
	            0x0: 0x80401000,
	            0x10000: 0x80001040,
	            0x20000: 0x401040,
	            0x30000: 0x80400000,
	            0x40000: 0x0,
	            0x50000: 0x401000,
	            0x60000: 0x80000040,
	            0x70000: 0x400040,
	            0x80000: 0x80000000,
	            0x90000: 0x400000,
	            0xa0000: 0x40,
	            0xb0000: 0x80001000,
	            0xc0000: 0x80400040,
	            0xd0000: 0x1040,
	            0xe0000: 0x1000,
	            0xf0000: 0x80401040,
	            0x8000: 0x80001040,
	            0x18000: 0x40,
	            0x28000: 0x80400040,
	            0x38000: 0x80001000,
	            0x48000: 0x401000,
	            0x58000: 0x80401040,
	            0x68000: 0x0,
	            0x78000: 0x80400000,
	            0x88000: 0x1000,
	            0x98000: 0x80401000,
	            0xa8000: 0x400000,
	            0xb8000: 0x1040,
	            0xc8000: 0x80000000,
	            0xd8000: 0x400040,
	            0xe8000: 0x401040,
	            0xf8000: 0x80000040,
	            0x100000: 0x400040,
	            0x110000: 0x401000,
	            0x120000: 0x80000040,
	            0x130000: 0x0,
	            0x140000: 0x1040,
	            0x150000: 0x80400040,
	            0x160000: 0x80401000,
	            0x170000: 0x80001040,
	            0x180000: 0x80401040,
	            0x190000: 0x80000000,
	            0x1a0000: 0x80400000,
	            0x1b0000: 0x401040,
	            0x1c0000: 0x80001000,
	            0x1d0000: 0x400000,
	            0x1e0000: 0x40,
	            0x1f0000: 0x1000,
	            0x108000: 0x80400000,
	            0x118000: 0x80401040,
	            0x128000: 0x0,
	            0x138000: 0x401000,
	            0x148000: 0x400040,
	            0x158000: 0x80000000,
	            0x168000: 0x80001040,
	            0x178000: 0x40,
	            0x188000: 0x80000040,
	            0x198000: 0x1000,
	            0x1a8000: 0x80001000,
	            0x1b8000: 0x80400040,
	            0x1c8000: 0x1040,
	            0x1d8000: 0x80401000,
	            0x1e8000: 0x400000,
	            0x1f8000: 0x401040
	        },
	        {
	            0x0: 0x80,
	            0x1000: 0x1040000,
	            0x2000: 0x40000,
	            0x3000: 0x20000000,
	            0x4000: 0x20040080,
	            0x5000: 0x1000080,
	            0x6000: 0x21000080,
	            0x7000: 0x40080,
	            0x8000: 0x1000000,
	            0x9000: 0x20040000,
	            0xa000: 0x20000080,
	            0xb000: 0x21040080,
	            0xc000: 0x21040000,
	            0xd000: 0x0,
	            0xe000: 0x1040080,
	            0xf000: 0x21000000,
	            0x800: 0x1040080,
	            0x1800: 0x21000080,
	            0x2800: 0x80,
	            0x3800: 0x1040000,
	            0x4800: 0x40000,
	            0x5800: 0x20040080,
	            0x6800: 0x21040000,
	            0x7800: 0x20000000,
	            0x8800: 0x20040000,
	            0x9800: 0x0,
	            0xa800: 0x21040080,
	            0xb800: 0x1000080,
	            0xc800: 0x20000080,
	            0xd800: 0x21000000,
	            0xe800: 0x1000000,
	            0xf800: 0x40080,
	            0x10000: 0x40000,
	            0x11000: 0x80,
	            0x12000: 0x20000000,
	            0x13000: 0x21000080,
	            0x14000: 0x1000080,
	            0x15000: 0x21040000,
	            0x16000: 0x20040080,
	            0x17000: 0x1000000,
	            0x18000: 0x21040080,
	            0x19000: 0x21000000,
	            0x1a000: 0x1040000,
	            0x1b000: 0x20040000,
	            0x1c000: 0x40080,
	            0x1d000: 0x20000080,
	            0x1e000: 0x0,
	            0x1f000: 0x1040080,
	            0x10800: 0x21000080,
	            0x11800: 0x1000000,
	            0x12800: 0x1040000,
	            0x13800: 0x20040080,
	            0x14800: 0x20000000,
	            0x15800: 0x1040080,
	            0x16800: 0x80,
	            0x17800: 0x21040000,
	            0x18800: 0x40080,
	            0x19800: 0x21040080,
	            0x1a800: 0x0,
	            0x1b800: 0x21000000,
	            0x1c800: 0x1000080,
	            0x1d800: 0x40000,
	            0x1e800: 0x20040000,
	            0x1f800: 0x20000080
	        },
	        {
	            0x0: 0x10000008,
	            0x100: 0x2000,
	            0x200: 0x10200000,
	            0x300: 0x10202008,
	            0x400: 0x10002000,
	            0x500: 0x200000,
	            0x600: 0x200008,
	            0x700: 0x10000000,
	            0x800: 0x0,
	            0x900: 0x10002008,
	            0xa00: 0x202000,
	            0xb00: 0x8,
	            0xc00: 0x10200008,
	            0xd00: 0x202008,
	            0xe00: 0x2008,
	            0xf00: 0x10202000,
	            0x80: 0x10200000,
	            0x180: 0x10202008,
	            0x280: 0x8,
	            0x380: 0x200000,
	            0x480: 0x202008,
	            0x580: 0x10000008,
	            0x680: 0x10002000,
	            0x780: 0x2008,
	            0x880: 0x200008,
	            0x980: 0x2000,
	            0xa80: 0x10002008,
	            0xb80: 0x10200008,
	            0xc80: 0x0,
	            0xd80: 0x10202000,
	            0xe80: 0x202000,
	            0xf80: 0x10000000,
	            0x1000: 0x10002000,
	            0x1100: 0x10200008,
	            0x1200: 0x10202008,
	            0x1300: 0x2008,
	            0x1400: 0x200000,
	            0x1500: 0x10000000,
	            0x1600: 0x10000008,
	            0x1700: 0x202000,
	            0x1800: 0x202008,
	            0x1900: 0x0,
	            0x1a00: 0x8,
	            0x1b00: 0x10200000,
	            0x1c00: 0x2000,
	            0x1d00: 0x10002008,
	            0x1e00: 0x10202000,
	            0x1f00: 0x200008,
	            0x1080: 0x8,
	            0x1180: 0x202000,
	            0x1280: 0x200000,
	            0x1380: 0x10000008,
	            0x1480: 0x10002000,
	            0x1580: 0x2008,
	            0x1680: 0x10202008,
	            0x1780: 0x10200000,
	            0x1880: 0x10202000,
	            0x1980: 0x10200008,
	            0x1a80: 0x2000,
	            0x1b80: 0x202008,
	            0x1c80: 0x200008,
	            0x1d80: 0x0,
	            0x1e80: 0x10000000,
	            0x1f80: 0x10002008
	        },
	        {
	            0x0: 0x100000,
	            0x10: 0x2000401,
	            0x20: 0x400,
	            0x30: 0x100401,
	            0x40: 0x2100401,
	            0x50: 0x0,
	            0x60: 0x1,
	            0x70: 0x2100001,
	            0x80: 0x2000400,
	            0x90: 0x100001,
	            0xa0: 0x2000001,
	            0xb0: 0x2100400,
	            0xc0: 0x2100000,
	            0xd0: 0x401,
	            0xe0: 0x100400,
	            0xf0: 0x2000000,
	            0x8: 0x2100001,
	            0x18: 0x0,
	            0x28: 0x2000401,
	            0x38: 0x2100400,
	            0x48: 0x100000,
	            0x58: 0x2000001,
	            0x68: 0x2000000,
	            0x78: 0x401,
	            0x88: 0x100401,
	            0x98: 0x2000400,
	            0xa8: 0x2100000,
	            0xb8: 0x100001,
	            0xc8: 0x400,
	            0xd8: 0x2100401,
	            0xe8: 0x1,
	            0xf8: 0x100400,
	            0x100: 0x2000000,
	            0x110: 0x100000,
	            0x120: 0x2000401,
	            0x130: 0x2100001,
	            0x140: 0x100001,
	            0x150: 0x2000400,
	            0x160: 0x2100400,
	            0x170: 0x100401,
	            0x180: 0x401,
	            0x190: 0x2100401,
	            0x1a0: 0x100400,
	            0x1b0: 0x1,
	            0x1c0: 0x0,
	            0x1d0: 0x2100000,
	            0x1e0: 0x2000001,
	            0x1f0: 0x400,
	            0x108: 0x100400,
	            0x118: 0x2000401,
	            0x128: 0x2100001,
	            0x138: 0x1,
	            0x148: 0x2000000,
	            0x158: 0x100000,
	            0x168: 0x401,
	            0x178: 0x2100400,
	            0x188: 0x2000001,
	            0x198: 0x2100000,
	            0x1a8: 0x0,
	            0x1b8: 0x2100401,
	            0x1c8: 0x100401,
	            0x1d8: 0x400,
	            0x1e8: 0x2000400,
	            0x1f8: 0x100001
	        },
	        {
	            0x0: 0x8000820,
	            0x1: 0x20000,
	            0x2: 0x8000000,
	            0x3: 0x20,
	            0x4: 0x20020,
	            0x5: 0x8020820,
	            0x6: 0x8020800,
	            0x7: 0x800,
	            0x8: 0x8020000,
	            0x9: 0x8000800,
	            0xa: 0x20800,
	            0xb: 0x8020020,
	            0xc: 0x820,
	            0xd: 0x0,
	            0xe: 0x8000020,
	            0xf: 0x20820,
	            0x80000000: 0x800,
	            0x80000001: 0x8020820,
	            0x80000002: 0x8000820,
	            0x80000003: 0x8000000,
	            0x80000004: 0x8020000,
	            0x80000005: 0x20800,
	            0x80000006: 0x20820,
	            0x80000007: 0x20,
	            0x80000008: 0x8000020,
	            0x80000009: 0x820,
	            0x8000000a: 0x20020,
	            0x8000000b: 0x8020800,
	            0x8000000c: 0x0,
	            0x8000000d: 0x8020020,
	            0x8000000e: 0x8000800,
	            0x8000000f: 0x20000,
	            0x10: 0x20820,
	            0x11: 0x8020800,
	            0x12: 0x20,
	            0x13: 0x800,
	            0x14: 0x8000800,
	            0x15: 0x8000020,
	            0x16: 0x8020020,
	            0x17: 0x20000,
	            0x18: 0x0,
	            0x19: 0x20020,
	            0x1a: 0x8020000,
	            0x1b: 0x8000820,
	            0x1c: 0x8020820,
	            0x1d: 0x20800,
	            0x1e: 0x820,
	            0x1f: 0x8000000,
	            0x80000010: 0x20000,
	            0x80000011: 0x800,
	            0x80000012: 0x8020020,
	            0x80000013: 0x20820,
	            0x80000014: 0x20,
	            0x80000015: 0x8020000,
	            0x80000016: 0x8000000,
	            0x80000017: 0x8000820,
	            0x80000018: 0x8020820,
	            0x80000019: 0x8000020,
	            0x8000001a: 0x8000800,
	            0x8000001b: 0x0,
	            0x8000001c: 0x20800,
	            0x8000001d: 0x820,
	            0x8000001e: 0x20020,
	            0x8000001f: 0x8020800
	        }
	    ];

	    // Masks that select the SBOX input
	    var SBOX_MASK = [
	        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
	        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
	    ];

	    /**
	     * DES block cipher algorithm.
	     */
	    var DES = C_algo.DES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;

	            // Select 56 bits according to PC1
	            var keyBits = [];
	            for (var i = 0; i < 56; i++) {
	                var keyBitPos = PC1[i] - 1;
	                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
	            }

	            // Assemble 16 subkeys
	            var subKeys = this._subKeys = [];
	            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
	                // Create subkey
	                var subKey = subKeys[nSubKey] = [];

	                // Shortcut
	                var bitShift = BIT_SHIFTS[nSubKey];

	                // Select 48 bits according to PC2
	                for (var i = 0; i < 24; i++) {
	                    // Select from the left 28 key bits
	                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

	                    // Select from the right 28 key bits
	                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
	                }

	                // Since each subkey is applied to an expanded 32-bit input,
	                // the subkey can be broken into 8 values scaled to 32-bits,
	                // which allows the key to be used without expansion
	                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
	                for (var i = 1; i < 7; i++) {
	                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
	                }
	                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
	            }

	            // Compute inverse subkeys
	            var invSubKeys = this._invSubKeys = [];
	            for (var i = 0; i < 16; i++) {
	                invSubKeys[i] = subKeys[15 - i];
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._subKeys);
	        },

	        decryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._invSubKeys);
	        },

	        _doCryptBlock: function (M, offset, subKeys) {
	            // Get input
	            this._lBlock = M[offset];
	            this._rBlock = M[offset + 1];

	            // Initial permutation
	            exchangeLR.call(this, 4,  0x0f0f0f0f);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeLR.call(this, 1,  0x55555555);

	            // Rounds
	            for (var round = 0; round < 16; round++) {
	                // Shortcuts
	                var subKey = subKeys[round];
	                var lBlock = this._lBlock;
	                var rBlock = this._rBlock;

	                // Feistel function
	                var f = 0;
	                for (var i = 0; i < 8; i++) {
	                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
	                }
	                this._lBlock = rBlock;
	                this._rBlock = lBlock ^ f;
	            }

	            // Undo swap from last round
	            var t = this._lBlock;
	            this._lBlock = this._rBlock;
	            this._rBlock = t;

	            // Final permutation
	            exchangeLR.call(this, 1,  0x55555555);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeLR.call(this, 4,  0x0f0f0f0f);

	            // Set output
	            M[offset] = this._lBlock;
	            M[offset + 1] = this._rBlock;
	        },

	        keySize: 64/32,

	        ivSize: 64/32,

	        blockSize: 64/32
	    });

	    // Swap bits across the left and right words
	    function exchangeLR(offset, mask) {
	        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
	        this._rBlock ^= t;
	        this._lBlock ^= t << offset;
	    }

	    function exchangeRL(offset, mask) {
	        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
	        this._lBlock ^= t;
	        this._rBlock ^= t << offset;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
	     */
	    C.DES = BlockCipher._createHelper(DES);

	    /**
	     * Triple-DES block cipher algorithm.
	     */
	    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;

	            // Create DES instances
	            this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
	            this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
	            this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
	        },

	        encryptBlock: function (M, offset) {
	            this._des1.encryptBlock(M, offset);
	            this._des2.decryptBlock(M, offset);
	            this._des3.encryptBlock(M, offset);
	        },

	        decryptBlock: function (M, offset) {
	            this._des3.decryptBlock(M, offset);
	            this._des2.encryptBlock(M, offset);
	            this._des1.decryptBlock(M, offset);
	        },

	        keySize: 192/32,

	        ivSize: 64/32,

	        blockSize: 64/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
	     */
	    C.TripleDES = BlockCipher._createHelper(TripleDES);
	}());


	return CryptoJS.TripleDES;

}));

/***/ }),

/***/ "./node_modules/crypto-js/x64-core.js":
/*!********************************************!*\
  !*** ./node_modules/crypto-js/x64-core.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var X32WordArray = C_lib.WordArray;

	    /**
	     * x64 namespace.
	     */
	    var C_x64 = C.x64 = {};

	    /**
	     * A 64-bit word.
	     */
	    var X64Word = C_x64.Word = Base.extend({
	        /**
	         * Initializes a newly created 64-bit word.
	         *
	         * @param {number} high The high 32 bits.
	         * @param {number} low The low 32 bits.
	         *
	         * @example
	         *
	         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
	         */
	        init: function (high, low) {
	            this.high = high;
	            this.low = low;
	        }

	        /**
	         * Bitwise NOTs this word.
	         *
	         * @return {X64Word} A new x64-Word object after negating.
	         *
	         * @example
	         *
	         *     var negated = x64Word.not();
	         */
	        // not: function () {
	            // var high = ~this.high;
	            // var low = ~this.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ANDs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to AND with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ANDing.
	         *
	         * @example
	         *
	         *     var anded = x64Word.and(anotherX64Word);
	         */
	        // and: function (word) {
	            // var high = this.high & word.high;
	            // var low = this.low & word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to OR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ORing.
	         *
	         * @example
	         *
	         *     var ored = x64Word.or(anotherX64Word);
	         */
	        // or: function (word) {
	            // var high = this.high | word.high;
	            // var low = this.low | word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise XORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to XOR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after XORing.
	         *
	         * @example
	         *
	         *     var xored = x64Word.xor(anotherX64Word);
	         */
	        // xor: function (word) {
	            // var high = this.high ^ word.high;
	            // var low = this.low ^ word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the left.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftL(25);
	         */
	        // shiftL: function (n) {
	            // if (n < 32) {
	                // var high = (this.high << n) | (this.low >>> (32 - n));
	                // var low = this.low << n;
	            // } else {
	                // var high = this.low << (n - 32);
	                // var low = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the right.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftR(7);
	         */
	        // shiftR: function (n) {
	            // if (n < 32) {
	                // var low = (this.low >>> n) | (this.high << (32 - n));
	                // var high = this.high >>> n;
	            // } else {
	                // var low = this.high >>> (n - 32);
	                // var high = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Rotates this word n bits to the left.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotL(25);
	         */
	        // rotL: function (n) {
	            // return this.shiftL(n).or(this.shiftR(64 - n));
	        // },

	        /**
	         * Rotates this word n bits to the right.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotR(7);
	         */
	        // rotR: function (n) {
	            // return this.shiftR(n).or(this.shiftL(64 - n));
	        // },

	        /**
	         * Adds this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to add with this word.
	         *
	         * @return {X64Word} A new x64-Word object after adding.
	         *
	         * @example
	         *
	         *     var added = x64Word.add(anotherX64Word);
	         */
	        // add: function (word) {
	            // var low = (this.low + word.low) | 0;
	            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
	            // var high = (this.high + word.high + carry) | 0;

	            // return X64Word.create(high, low);
	        // }
	    });

	    /**
	     * An array of 64-bit words.
	     *
	     * @property {Array} words The array of CryptoJS.x64.Word objects.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var X64WordArray = C_x64.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create();
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ]);
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ], 10);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 8;
	            }
	        },

	        /**
	         * Converts this 64-bit word array to a 32-bit word array.
	         *
	         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
	         *
	         * @example
	         *
	         *     var x32WordArray = x64WordArray.toX32();
	         */
	        toX32: function () {
	            // Shortcuts
	            var x64Words = this.words;
	            var x64WordsLength = x64Words.length;

	            // Convert
	            var x32Words = [];
	            for (var i = 0; i < x64WordsLength; i++) {
	                var x64Word = x64Words[i];
	                x32Words.push(x64Word.high);
	                x32Words.push(x64Word.low);
	            }

	            return X32WordArray.create(x32Words, this.sigBytes);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {X64WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = x64WordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);

	            // Clone "words" array
	            var words = clone.words = this.words.slice(0);

	            // Clone each X64Word object
	            var wordsLength = words.length;
	            for (var i = 0; i < wordsLength; i++) {
	                words[i] = words[i].clone();
	            }

	            return clone;
	        }
	    });
	}());


	return CryptoJS;

}));

/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/crypto/bundle/bundle.js":
/*!*****************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/crypto/bundle/bundle.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Curl = __webpack_require__(/*! ../curl/curl */ "./node_modules/iota.crypto.js/lib/crypto/curl/curl.js");
var Kerl = __webpack_require__(/*! ../kerl/kerl */ "./node_modules/iota.crypto.js/lib/crypto/kerl/kerl.js");
var Converter = __webpack_require__(/*! ../converter/converter */ "./node_modules/iota.crypto.js/lib/crypto/converter/converter.js");
var tritAdd = __webpack_require__(/*! ../helpers/adder */ "./node_modules/iota.crypto.js/lib/crypto/helpers/adder.js");

/**
*
*   @constructor bundle
**/
function Bundle() {

    // Declare empty bundle
    this.bundle = [];
}

/**
*
*
**/

Bundle.prototype.addEntry = function(signatureMessageLength, address, value, tag, timestamp, index) {

    for (var i = 0; i < signatureMessageLength; i++) {

        var transactionObject = new Object();
        transactionObject.address = address;
        transactionObject.value = i == 0 ? value : 0;
        transactionObject.obsoleteTag = tag;
        transactionObject.tag = tag;
        transactionObject.timestamp = timestamp;

        this.bundle[this.bundle.length] = transactionObject;
    }
}

/**
*
*
**/
Bundle.prototype.addTrytes = function(signatureFragments) {

    var emptySignatureFragment = '';
    var emptyHash = '999999999999999999999999999999999999999999999999999999999999999999999999999999999';
    var emptyTag = '9'.repeat(27);
    var emptyTimestamp = '9'.repeat(9);

    for (var j = 0; emptySignatureFragment.length < 2187; j++) {
        emptySignatureFragment += '9';
    }

    for (var i = 0; i < this.bundle.length; i++) {

        // Fill empty signatureMessageFragment
        this.bundle[i].signatureMessageFragment = signatureFragments[i] ? signatureFragments[i] : emptySignatureFragment;

        // Fill empty trunkTransaction
        this.bundle[i].trunkTransaction = emptyHash;

        // Fill empty branchTransaction
        this.bundle[i].branchTransaction = emptyHash;

        this.bundle[i].attachmentTimestamp = emptyTimestamp;
        this.bundle[i].attachmentTimestampLowerBound = emptyTimestamp;
        this.bundle[i].attachmentTimestampUpperBound = emptyTimestamp;
        // Fill empty nonce
        this.bundle[i].nonce = emptyTag;
    }
}


/**
*
*
**/
Bundle.prototype.finalize = function() {
    var validBundle = false;

  while(!validBundle) {

    var kerl = new Kerl();
    kerl.initialize();

    for (var i = 0; i < this.bundle.length; i++) {

        var valueTrits = Converter.trits(this.bundle[i].value);
        while (valueTrits.length < 81) {
            valueTrits[valueTrits.length] = 0;
        }

        var timestampTrits = Converter.trits(this.bundle[i].timestamp);
        while (timestampTrits.length < 27) {
            timestampTrits[timestampTrits.length] = 0;
        }

        var currentIndexTrits = Converter.trits(this.bundle[i].currentIndex = i);
        while (currentIndexTrits.length < 27) {
            currentIndexTrits[currentIndexTrits.length] = 0;
        }

        var lastIndexTrits = Converter.trits(this.bundle[i].lastIndex = this.bundle.length - 1);
        while (lastIndexTrits.length < 27) {
            lastIndexTrits[lastIndexTrits.length] = 0;
        }

        var bundleEssence = Converter.trits(this.bundle[i].address + Converter.trytes(valueTrits) + this.bundle[i].obsoleteTag + Converter.trytes(timestampTrits) + Converter.trytes(currentIndexTrits) + Converter.trytes(lastIndexTrits));
        kerl.absorb(bundleEssence, 0, bundleEssence.length);
    }

    var hash = [];
    kerl.squeeze(hash, 0, Curl.HASH_LENGTH);
    hash = Converter.trytes(hash);

    for (var i = 0; i < this.bundle.length; i++) {

        this.bundle[i].bundle = hash;
    }

    var normalizedHash = this.normalizedBundle(hash);
    if(normalizedHash.indexOf(13 /* = M */) != -1) {
      // Insecure bundle. Increment Tag and recompute bundle hash.
      var increasedTag = tritAdd(Converter.trits(this.bundle[0].obsoleteTag), [1]);
      this.bundle[0].obsoleteTag = Converter.trytes(increasedTag);
    } else {
      validBundle = true;
    }
  }
}

/**
*   Normalizes the bundle hash
*
**/
Bundle.prototype.normalizedBundle = function(bundleHash) {

    var normalizedBundle = [];

    for (var i = 0; i < 3; i++) {

        var sum = 0;
        for (var j = 0; j < 27; j++) {

            sum += (normalizedBundle[i * 27 + j] = Converter.value(Converter.trits(bundleHash.charAt(i * 27 + j))));
        }

        if (sum >= 0) {

            while (sum-- > 0) {

                for (var j = 0; j < 27; j++) {

                    if (normalizedBundle[i * 27 + j] > -13) {

                        normalizedBundle[i * 27 + j]--;
                        break;
                    }
                }
            }
        } else {

            while (sum++ < 0) {

                for (var j = 0; j < 27; j++) {

                    if (normalizedBundle[i * 27 + j] < 13) {

                        normalizedBundle[i * 27 + j]++;
                        break;
                    }
                }
            }
        }
    }

    return normalizedBundle;
}

module.exports = Bundle;


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/crypto/converter/converter.js":
/*!***********************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/crypto/converter/converter.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 *
 *   Conversion functions
 *
 **/

var RADIX = 3;
var RADIX_BYTES = 256;
var MAX_TRIT_VALUE = 1;
var MIN_TRIT_VALUE = -1;
var BYTE_HASH_LENGTH = 48;

// All possible tryte values
var trytesAlphabet = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// map of all trits representations
var trytesTrits = [
    [ 0,  0,  0],
    [ 1,  0,  0],
    [-1,  1,  0],
    [ 0,  1,  0],
    [ 1,  1,  0],
    [-1, -1,  1],
    [ 0, -1,  1],
    [ 1, -1,  1],
    [-1,  0,  1],
    [ 0,  0,  1],
    [ 1,  0,  1],
    [-1,  1,  1],
    [ 0,  1,  1],
    [ 1,  1,  1],
    [-1, -1, -1],
    [ 0, -1, -1],
    [ 1, -1, -1],
    [-1,  0, -1],
    [ 0,  0, -1],
    [ 1,  0, -1],
    [-1,  1, -1],
    [ 0,  1, -1],
    [ 1,  1, -1],
    [-1, -1,  0],
    [ 0, -1,  0],
    [ 1, -1,  0],
    [-1,  0,  0]
];

/**
 *   Converts trytes into trits
 *
 *   @method trits
 *   @param {String|Int} input Tryte value to be converted. Can either be string or int
 *   @param {Array} state (optional) state to be modified
 *   @returns {Array} trits
 **/
var trits = function( input, state ) {

    var trits = state || [];

    if (Number.isInteger(input)) {

        var absoluteValue = input < 0 ? -input : input;

        while (absoluteValue > 0) {

            var remainder = absoluteValue % 3;
            absoluteValue = Math.floor(absoluteValue / 3);

            if (remainder > 1) {
                remainder = -1;
                absoluteValue++;
            }

            trits[trits.length] = remainder;
        }
        if (input < 0) {

            for (var i = 0; i < trits.length; i++) {

                trits[i] = -trits[i];
            }
        }
    } else {

        for (var i = 0; i < input.length; i++) {

            var index = trytesAlphabet.indexOf(input.charAt(i));
            trits[i * 3] = trytesTrits[index][0];
            trits[i * 3 + 1] = trytesTrits[index][1];
            trits[i * 3 + 2] = trytesTrits[index][2];
        }
    }

    return trits;
}

/**
 *   Converts trits into trytes
 *
 *   @method trytes
 *   @param {Array} trits
 *   @returns {String} trytes
 **/
var trytes = function(trits) {

    var trytes = "";

    for ( var i = 0; i < trits.length; i += 3 ) {

        // Iterate over all possible tryte values to find correct trit representation
        for ( var j = 0; j < trytesAlphabet.length; j++ ) {

            if ( trytesTrits[ j ][ 0 ] === trits[ i ] && trytesTrits[ j ][ 1 ] === trits[ i + 1 ] && trytesTrits[ j ][ 2 ] === trits[ i + 2 ] ) {

                trytes += trytesAlphabet.charAt( j );
                break;

            }

        }

    }

    return trytes;
}

/**
 *   Converts trits into an integer value
 *
 *   @method value
 *   @param {Array} trits
 *   @returns {int} value
 **/
var value = function(trits) {

    var returnValue = 0;

    for ( var i = trits.length; i-- > 0; ) {

        returnValue = returnValue * 3 + trits[ i ];
    }

    return returnValue;
}

/**
 *   Converts an integer value to trits
 *
 *   @method value
 *   @param {Int} value
 *   @returns {Array} trits
 **/
var fromValue = function(value) {

    var destination = [];
    var absoluteValue = value < 0 ? -value : value;
    var i = 0;

    while( absoluteValue > 0 ) {

        var remainder = ( absoluteValue % RADIX );
        absoluteValue = Math.floor( absoluteValue / RADIX );

        if ( remainder > MAX_TRIT_VALUE ) {

            remainder = MIN_TRIT_VALUE;
            absoluteValue++;

        }

        destination[ i ] = remainder;
        i++;

    }

    if ( value < 0 ) {

        for ( var j = 0; j < destination.length; j++ ) {

            // switch values
            destination[ j ] = destination[ j ] === 0 ? 0: -destination[ j ];

        }

    }

    return destination;
}

module.exports = {
    trits           : trits,
    trytes          : trytes,
    value           : value,
    fromValue       : fromValue
};


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/crypto/converter/words.js":
/*!*******************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/crypto/converter/words.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var INT_LENGTH = 12;
var BYTE_LENGTH = 48;
var RADIX = 3;
/// hex representation of (3^242)/2
var HALF_3 = new Uint32Array([
    0xa5ce8964,
    0x9f007669,
    0x1484504f,
    0x3ade00d9,
    0x0c24486e,
    0x50979d57,
    0x79a4c702,
    0x48bbae36,
    0xa9f6808b,
    0xaa06a805,
    0xa87fabdf,
    0x5e69ebef
]);

var clone_uint32Array = function(sourceArray) {
  var destination = new ArrayBuffer(sourceArray.byteLength);
  new Uint32Array(destination).set(new Uint32Array(sourceArray));

  return destination;
};

var ta_slice = function(array) {
  if (array.slice !== undefined) {
      return array.slice();
  }

  return clone_uint32Array(array);
};

var ta_reverse = function(array) {
  if (array.reverse !== undefined) {
    array.reverse();
    return;
  }

  var i = 0,
    n = array.length,
    middle = Math.floor(n / 2),
    temp = null;

  for (; i < middle; i += 1) {
    temp = array[i];
    array[i] = array[n - 1 - i];
    array[n - 1 - i] = temp;
  }
};

/// negates the (unsigned) input array
var bigint_not = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = (~arr[i]) >>> 0;
    }
};

/// rshift that works with up to 53
/// JS's shift operators only work on 32 bit integers
/// ours is up to 33 or 34 bits though, so
/// we need to implement shifting manually
var rshift = function(number, shift) {
    return (number / Math.pow(2, shift)) >>> 0;
};

/// swaps endianness
var swap32 = function(val) {
    return ((val & 0xFF) << 24) |
        ((val & 0xFF00) << 8) |
        ((val >> 8) & 0xFF00) |
        ((val >> 24) & 0xFF);
}

/// add with carry
var full_add = function(lh, rh, carry) {
    var v = lh + rh;
    var l = (rshift(v, 32)) & 0xFFFFFFFF;
    var r = (v & 0xFFFFFFFF) >>> 0;
    var carry1 = l != 0;

    if (carry) {
        v = r + 1;
    }
    l = (rshift(v, 32)) & 0xFFFFFFFF;
    r = (v & 0xFFFFFFFF) >>> 0;
    var carry2 = l != 0;

    return [r, carry1 || carry2];
};

/// subtracts rh from base
var bigint_sub = function(base, rh) {
    var noborrow = true;

    for (var i = 0; i < base.length; i++) {
        var vc = full_add(base[i], (~rh[i] >>> 0), noborrow);
        base[i] = vc[0];
        noborrow = vc[1];
    }

    if (!noborrow) {
        throw "noborrow";
    }
};

/// compares two (unsigned) big integers
var bigint_cmp = function(lh, rh) {
    for (var i = lh.length; i-- > 0;) {
        var a = lh[i] >>> 0;
        var b = rh[i] >>> 0;
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        }
    }
    return 0;
};

/// adds rh to base in place
var bigint_add = function(base, rh) {
    var carry = false;
    for (var i = 0; i < base.length; i++) {
        var vc = full_add(base[i], rh[i], carry);
        base[i] = vc[0];
        carry = vc[1];
    }
};

/// adds a small (i.e. <32bit) number to base
var bigint_add_small = function(base, other) {
    var vc = full_add(base[0], other, false);
    base[0] = vc[0];
    var carry = vc[1];

    var i = 1;
    while (carry && i < base.length) {
        var vc = full_add(base[i], 0, carry);
        base[i] = vc[0];
        carry = vc[1];
        i += 1;
    }

    return i;
};

/// converts the given byte array to trits
var words_to_trits = function(words) {
    if (words.length != INT_LENGTH) {
        throw "Invalid words length";
    }

    var trits = new Int8Array(243);
    var base = new Uint32Array(words);

    ta_reverse(base);

    var flip_trits = false;
    if (base[INT_LENGTH - 1] >> 31 == 0) {
        // positive two's complement number.
        // add HALF_3 to move it to the right place.
        bigint_add(base, HALF_3);
    } else {
        // negative number.
        bigint_not(base);
        if (bigint_cmp(base, HALF_3) > 0) {
            bigint_sub(base, HALF_3);
            flip_trits = true;
        } else {
            /// bigint is between (unsigned) HALF_3 and (2**384 - 3**242/2).
            bigint_add_small(base, 1);
            var tmp = ta_slice(HALF_3);
            bigint_sub(tmp, base);
            base = tmp;
        }
    }


    var rem = 0;

    for (var i = 0; i < 242; i++) {
        rem = 0;
        for (var j = INT_LENGTH - 1; j >= 0; j--) {
            var lhs = (rem != 0 ? rem * 0xFFFFFFFF + rem : 0) + base[j];
            var rhs = RADIX;

            var q = (lhs / rhs) >>> 0;
            var r = (lhs % rhs) >>> 0;

            base[j] = q;
            rem = r;
        }

        trits[i] = rem - 1;
    }

    if (flip_trits) {
        for (var i = 0; i < trits.length; i++) {
            trits[i] = -trits[i];
        }
    }

    return trits;
}

var is_null = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != 0) {
            return false;
            break;
        }
    }
    return true;
}

var trits_to_words = function(trits) {
    if (trits.length != 243) {
        throw "Invalid trits length";
    }

    var base = new Uint32Array(INT_LENGTH);

    if (trits.slice(0, 242).every(function(a) {
            a == -1
        })) {
        base = ta_slice(HALF_3);
        bigint_not(base);
        bigint_add_small(base, 1);
    } else {
        var size = 1;
        for (var i = trits.length - 1; i-- > 0;) {
            var trit = trits[i] + 1;

            //multiply by radix
            {
                var sz = size;
                var carry = 0;

                for (var j = 0; j < sz; j++) {
                    var v = base[j] * RADIX + carry;
                    carry = rshift(v, 32);
                    base[j] = (v & 0xFFFFFFFF) >>> 0;
                }

                if (carry > 0) {
                    base[sz] = carry;
                    size += 1;
                }
            }

            //addition
            {
                var sz = bigint_add_small(base, trit);
                if (sz > size) {
                    size = sz;
                }
            }
        }

        if (!is_null(base)) {
            if (bigint_cmp(HALF_3, base) <= 0) {
                // base >= HALF_3
                // just do base - HALF_3
                bigint_sub(base, HALF_3);
            } else {
                // base < HALF_3
                // so we need to transform it to a two's complement representation
                // of (base - HALF_3).
                // as we don't have a wrapping (-), we need to use some bit magic
                var tmp = ta_slice(HALF_3);
                bigint_sub(tmp, base);
                bigint_not(tmp);
                bigint_add_small(tmp, 1);
                base = tmp;
            }
        }
    }

    ta_reverse(base);

    for (var i = 0; i < base.length; i++) {
        base[i] = swap32(base[i]);
    }

    return base;
};

module.exports = {
    trits_to_words: trits_to_words,
    words_to_trits: words_to_trits
};


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/crypto/curl/curl.js":
/*!*************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/crypto/curl/curl.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Converter = __webpack_require__(/*! ../converter/converter */ "./node_modules/iota.crypto.js/lib/crypto/converter/converter.js");

/**
**      Cryptographic related functions to IOTA's Curl (sponge function)
**/

var NUMBER_OF_ROUNDS = 81;
var HASH_LENGTH = 243;
var STATE_LENGTH = 3 * HASH_LENGTH;

function Curl(rounds) {
    if (rounds) {
      this.rounds = rounds;
    } else {
      this.rounds = NUMBER_OF_ROUNDS;
    }
    // truth table
    this.truthTable = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0];
}

Curl.HASH_LENGTH = HASH_LENGTH;

/**
*   Initializes the state with STATE_LENGTH trits
*
*   @method initialize
**/
Curl.prototype.initialize = function(state, length) {

    if (state) {

        this.state = state;

    } else {

        this.state = [];

        for (var i = 0; i < STATE_LENGTH; i++) {

            this.state[i] = 0;

        }
    }
}

Curl.prototype.reset = function() {
  this.initialize();
}

/**
*   Sponge absorb function
*
*   @method absorb
**/
Curl.prototype.absorb = function(trits, offset, length) {

    do {

        var i = 0;
        var limit = (length < HASH_LENGTH ? length : HASH_LENGTH);

        while (i < limit) {

            this.state[i++] = trits[offset++];
        }

        this.transform();

    } while (( length -= HASH_LENGTH ) > 0)

}

/**
*   Sponge squeeze function
*
*   @method squeeze
**/
Curl.prototype.squeeze = function(trits, offset, length) {

    do {

        var i = 0;
        var limit = (length < HASH_LENGTH ? length : HASH_LENGTH);

        while (i < limit) {

            trits[offset++] = this.state[i++];
        }

        this.transform();

    } while (( length -= HASH_LENGTH ) > 0)
}

/**
*   Sponge transform function
*
*   @method transform
**/
Curl.prototype.transform = function() {

    var stateCopy = [], index = 0;

    for (var round = 0; round < this.rounds; round++) {

        stateCopy = this.state.slice();

        for (var i = 0; i < STATE_LENGTH; i++) {

            this.state[i] = this.truthTable[stateCopy[index] + (stateCopy[index += (index < 365 ? 364 : -365)] << 2) + 5];
        }
    }
}

module.exports = Curl


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/crypto/helpers/adder.js":
/*!*****************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/crypto/helpers/adder.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* copyright Paul Handy, 2017 */

function sum( a, b ) {

    var s = a + b;

    switch( s ) {

        case 2: return -1;
        case -2: return 1;
        default: return s;

    }
}

function cons( a, b ) {

    if( a === b ) {

        return a;

    }

    return 0;
}

function any( a, b ) {

    var s = a + b;

    if ( s > 0 ) {

        return 1;

    } else if ( s < 0 ) {

        return -1;

    }

    return 0;
}

function full_add( a, b, c ) {

    var s_a     =   sum( a, b );
    var c_a     =   cons( a, b );
    var c_b     =   cons( s_a, c );
    var c_out   =   any( c_a, c_b );
    var s_out   =   sum( s_a, c );

    return [ s_out, c_out ];

}

function add( a, b ) {

    var out = new Array( Math.max( a.length, b.length ) );
    var carry = 0;
    var a_i, b_i;

    for( var i = 0; i < out.length; i++ ) {

        a_i = i < a.length ? a[ i ] : 0;
        b_i = i < b.length ? b[ i ] : 0;
        var f_a = full_add( a_i, b_i, carry );
        out[ i ] = f_a[ 0 ];
        carry = f_a[ 1 ];

    }

    return out;

}

module.exports = add;


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/crypto/hmac/hmac.js":
/*!*************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/crypto/hmac/hmac.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Curl = __webpack_require__(/*! ../curl/curl */ "./node_modules/iota.crypto.js/lib/crypto/curl/curl.js");
var Converter = __webpack_require__(/*! ../converter/converter */ "./node_modules/iota.crypto.js/lib/crypto/converter/converter.js");
var HMAC_ROUNDS = 27;

function hmac(key) {
    this._key = Converter.trits(key);
}

hmac.prototype.addHMAC = function(bundle) {
    var curl = new Curl(HMAC_ROUNDS);
    var key = this._key;
    for(var i = 0; i < bundle.bundle.length; i++) {
        if (bundle.bundle[i].value > 0) {
            var bundleHashTrits = Converter.trits(bundle.bundle[i].bundle);
            var hmac = new Int8Array(243);
            curl.initialize();
            curl.absorb(key);
            curl.absorb(bundleHashTrits);
            curl.squeeze(hmac);
            var hmacTrytes = Converter.trytes(hmac);
            bundle.bundle[i].signatureMessageFragment = hmacTrytes + bundle.bundle[i].signatureMessageFragment.substring(81, 2187);
        }
    }
}

module.exports = hmac;


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/crypto/kerl/kerl.js":
/*!*************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/crypto/kerl/kerl.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CryptoJS = __webpack_require__(/*! crypto-js */ "./node_modules/crypto-js/index.js");
var Converter = __webpack_require__(/*! ../converter/converter */ "./node_modules/iota.crypto.js/lib/crypto/converter/converter.js");
var Curl = __webpack_require__(/*! ../curl/curl */ "./node_modules/iota.crypto.js/lib/crypto/curl/curl.js");
var WConverter = __webpack_require__(/*! ../converter/words */ "./node_modules/iota.crypto.js/lib/crypto/converter/words.js");

var BIT_HASH_LENGTH = 384;

function Kerl() {


    this.k = CryptoJS.algo.SHA3.create();
    this.k.init({
        outputLength: BIT_HASH_LENGTH
    });
}

Kerl.BIT_HASH_LENGTH = BIT_HASH_LENGTH;
Kerl.HASH_LENGTH = Curl.HASH_LENGTH;

Kerl.prototype.initialize = function(state) {}

Kerl.prototype.reset = function() {

    this.k.reset();

}

Kerl.prototype.absorb = function(trits, offset, length) {


    if (length && ((length % 243) !== 0)) {

        throw new Error('Illegal length provided');

    }

    do {
        var limit = (length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH);

        var trit_state = trits.slice(offset, offset + limit);
        offset += limit;

        // convert trit state to words
        var wordsToAbsorb = WConverter.trits_to_words(trit_state);

        // absorb the trit stat as wordarray
        this.k.update(
            CryptoJS.lib.WordArray.create(wordsToAbsorb));

    } while ((length -= Curl.HASH_LENGTH) > 0);

}



Kerl.prototype.squeeze = function(trits, offset, length) {

    if (length && ((length % 243) !== 0)) {

        throw new Error('Illegal length provided');

    }
    do {

        // get the hash digest
        var kCopy = this.k.clone();
        var final = kCopy.finalize();

        // Convert words to trits and then map it into the internal state
        var trit_state = WConverter.words_to_trits(final.words);

        var i = 0;
        var limit = (length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH);

        while (i < limit) {
            trits[offset++] = trit_state[i++];
        }

        this.reset();

        for (i = 0; i < final.words.length; i++) {
            final.words[i] = final.words[i] ^ 0xFFFFFFFF;
        }

        this.k.update(final);

    } while ((length -= Curl.HASH_LENGTH) > 0);
}

module.exports = Kerl;


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/crypto/signing/oldSigning.js":
/*!**********************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/crypto/signing/oldSigning.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Curl = __webpack_require__(/*! ../curl/curl */ "./node_modules/iota.crypto.js/lib/crypto/curl/curl.js");
var Converter = __webpack_require__(/*! ../converter/converter */ "./node_modules/iota.crypto.js/lib/crypto/converter/converter.js");
var Bundle = __webpack_require__(/*! ../bundle/bundle */ "./node_modules/iota.crypto.js/lib/crypto/bundle/bundle.js");
var add = __webpack_require__(/*! ../helpers/adder */ "./node_modules/iota.crypto.js/lib/crypto/helpers/adder.js");

/**
*           Signing related functions
*
**/
var key = function(seed, index, length) {

    while ((seed.length % 243) !== 0) {
      seed.push(0);
    }

    var indexTrits = Converter.fromValue( index );
    var subseed = add( seed.slice( ), indexTrits );

    var curl = new Curl( );

    curl.initialize( );
    curl.absorb(subseed, 0, subseed.length);
    curl.squeeze(subseed, 0, subseed.length);

    curl.initialize( );
    curl.absorb(subseed, 0, subseed.length);

    var key = [], offset = 0, buffer = [];

    while (length-- > 0) {

        for (var i = 0; i < 27; i++) {

            curl.squeeze(buffer, 0, subseed.length);
            for (var j = 0; j < 243; j++) {

                key[offset++] = buffer[j];
            }
        }
    }
    return key;
}

/**
*
*
**/
var digests = function(key) {

    var digests = [], buffer = [];

    for (var i = 0; i < Math.floor(key.length / 6561); i++) {

        var keyFragment = key.slice(i * 6561, (i + 1) * 6561);

        for (var j = 0; j < 27; j++) {

            buffer = keyFragment.slice(j * 243, (j + 1) * 243);

            for (var k = 0; k < 26; k++) {

                var kCurl = new Curl();
                kCurl.initialize();
                kCurl.absorb(buffer, 0, buffer.length);
                kCurl.squeeze(buffer, 0, Curl.HASH_LENGTH);
            }

            for (var k = 0; k < 243; k++) {

                keyFragment[j * 243 + k] = buffer[k];
            }
        }

        var curl = new Curl()

        curl.initialize();
        curl.absorb(keyFragment, 0, keyFragment.length);
        curl.squeeze(buffer, 0, Curl.HASH_LENGTH);

        for (var j = 0; j < 243; j++) {

            digests[i * 243 + j] = buffer[j];
        }
    }
    return digests;
}

/**
*
*
**/
var address = function(digests) {

    var addressTrits = [];

    var curl = new Curl();

    curl.initialize();
    curl.absorb(digests, 0, digests.length);
    curl.squeeze(addressTrits, 0, Curl.HASH_LENGTH);

    return addressTrits;
}

/**
*
*
**/
var digest = function(normalizedBundleFragment, signatureFragment) {

    var buffer = []

    var curl = new Curl();

    curl.initialize();

    for (var i = 0; i< 27; i++) {
        buffer = signatureFragment.slice(i * 243, (i + 1) * 243);

        for (var j = normalizedBundleFragment[i] + 13; j-- > 0; ) {

            var jCurl = new Curl();

            jCurl.initialize();
            jCurl.absorb(buffer, 0, buffer.length);
            jCurl.squeeze(buffer, 0, Curl.HASH_LENGTH);
        }

        curl.absorb(buffer, 0, buffer.length);
    }

    curl.squeeze(buffer, 0, Curl.HASH_LENGTH);
    return buffer;
}

/**
*
*
**/
var signatureFragment = function(normalizedBundleFragment, keyFragment) {

    var signatureFragment = keyFragment.slice(), hash = [];

    var curl = new Curl();

    for (var i = 0; i < 27; i++) {

        hash = signatureFragment.slice(i * 243, (i + 1) * 243);

        for (var j = 0; j < 13 - normalizedBundleFragment[i]; j++) {

            curl.initialize();
            curl.absorb(hash, 0, hash.length);
            curl.squeeze(hash, 0, Curl.HASH_LENGTH);
        }

        for (var j = 0; j < 243; j++) {

            signatureFragment[i * 243 + j] = hash[j];
        }
    }

    return signatureFragment;
}

/**
*
*
**/
var validateSignatures = function(expectedAddress, signatureFragments, bundleHash) {

    var self = this;
    var bundle = new Bundle();

    var normalizedBundleFragments = [];
    var normalizedBundleHash = bundle.normalizedBundle(bundleHash);

    // Split hash into 3 fragments
    for (var i = 0; i < 3; i++) {
        normalizedBundleFragments[i] = normalizedBundleHash.slice(i * 27, (i + 1) * 27);
    }

    // Get digests
    var digests = [];

    for (var i = 0; i < signatureFragments.length; i++) {

        var digestBuffer = digest(normalizedBundleFragments[i % 3], Converter.trits(signatureFragments[i]));

        for (var j = 0; j < 243; j++) {

            digests[i * 243 + j] = digestBuffer[j]
        }
    }

    var address = Converter.trytes(self.address(digests));

    return (expectedAddress === address);
}


module.exports = {
    key                 : key,
    digests             : digests,
    address             : address,
    digest              : digest,
    signatureFragment   : signatureFragment,
    validateSignatures  : validateSignatures
}


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/crypto/signing/signing.js":
/*!*******************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/crypto/signing/signing.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Curl = __webpack_require__(/*! ../curl/curl */ "./node_modules/iota.crypto.js/lib/crypto/curl/curl.js");
var Kerl = __webpack_require__(/*! ../kerl/kerl */ "./node_modules/iota.crypto.js/lib/crypto/kerl/kerl.js");
var Converter = __webpack_require__(/*! ../converter/converter */ "./node_modules/iota.crypto.js/lib/crypto/converter/converter.js");
var Bundle = __webpack_require__(/*! ../bundle/bundle */ "./node_modules/iota.crypto.js/lib/crypto/bundle/bundle.js");
var add = __webpack_require__(/*! ../helpers/adder */ "./node_modules/iota.crypto.js/lib/crypto/helpers/adder.js");
var oldSigning = __webpack_require__(/*! ./oldSigning */ "./node_modules/iota.crypto.js/lib/crypto/signing/oldSigning.js");
var errors = __webpack_require__(/*! ../../errors/inputErrors */ "./node_modules/iota.crypto.js/lib/errors/inputErrors.js");

/**
*           Signing related functions
*
**/
var key = function(seed, index, length) {

    while ((seed.length % 243) !== 0) {
      seed.push(0);
    }

    var indexTrits = Converter.fromValue( index );
    var subseed = add( seed.slice( ), indexTrits );

    var kerl = new Kerl( );

    kerl.initialize( );
    kerl.absorb(subseed, 0, subseed.length);
    kerl.squeeze(subseed, 0, subseed.length);

    kerl.reset( );
    kerl.absorb(subseed, 0, subseed.length);

    var key = [], offset = 0, buffer = [];

    while (length-- > 0) {

        for (var i = 0; i < 27; i++) {

            kerl.squeeze(buffer, 0, subseed.length);
            for (var j = 0; j < 243; j++) {

                key[offset++] = buffer[j];
            }
        }
    }
    return key;
}

/**
*
*
**/
var digests = function(key) {

    var digests = [], buffer = [];

    for (var i = 0; i < Math.floor(key.length / 6561); i++) {

        var keyFragment = key.slice(i * 6561, (i + 1) * 6561);

        for (var j = 0; j < 27; j++) {

            buffer = keyFragment.slice(j * 243, (j + 1) * 243);

            for (var k = 0; k < 26; k++) {

                var kKerl = new Kerl();
                kKerl.initialize();
                kKerl.absorb(buffer, 0, buffer.length);
                kKerl.squeeze(buffer, 0, Curl.HASH_LENGTH);
            }

            for (var k = 0; k < 243; k++) {

                keyFragment[j * 243 + k] = buffer[k];
            }
        }

        var kerl = new Kerl()

        kerl.initialize();
        kerl.absorb(keyFragment, 0, keyFragment.length);
        kerl.squeeze(buffer, 0, Curl.HASH_LENGTH);

        for (var j = 0; j < 243; j++) {

            digests[i * 243 + j] = buffer[j];
        }
    }
    return digests;
}

/**
*
*
**/
var address = function(digests) {

    var addressTrits = [];

    var kerl = new Kerl();

    kerl.initialize();
    kerl.absorb(digests, 0, digests.length);
    kerl.squeeze(addressTrits, 0, Curl.HASH_LENGTH);

    return addressTrits;
}

/**
*
*
**/
var digest = function(normalizedBundleFragment, signatureFragment) {

    var buffer = []

    var kerl = new Kerl();

    kerl.initialize();

    for (var i = 0; i< 27; i++) {
        buffer = signatureFragment.slice(i * 243, (i + 1) * 243);

        for (var j = normalizedBundleFragment[i] + 13; j-- > 0; ) {

            var jKerl = new Kerl();

            jKerl.initialize();
            jKerl.absorb(buffer, 0, buffer.length);
            jKerl.squeeze(buffer, 0, Curl.HASH_LENGTH);
        }

        kerl.absorb(buffer, 0, buffer.length);
    }

    kerl.squeeze(buffer, 0, Curl.HASH_LENGTH);
    return buffer;
}

/**
*
*
**/
var signatureFragment = function(normalizedBundleFragment, keyFragment) {

    var signatureFragment = keyFragment.slice(), hash = [];

    var kerl = new Kerl();

    for (var i = 0; i < 27; i++) {

        hash = signatureFragment.slice(i * 243, (i + 1) * 243);

        for (var j = 0; j < 13 - normalizedBundleFragment[i]; j++) {

            kerl.initialize();
            kerl.reset();
            kerl.absorb(hash, 0, hash.length);
            kerl.squeeze(hash, 0, Curl.HASH_LENGTH);
        }

        for (var j = 0; j < 243; j++) {

            signatureFragment[i * 243 + j] = hash[j];
        }
    }

    return signatureFragment;
}

/**
*
*
**/
var validateSignatures = function(expectedAddress, signatureFragments, bundleHash) {
    if (!bundleHash) {
        throw errors.invalidBundleHash();
    }

    var self = this;
    var bundle = new Bundle();

    var normalizedBundleFragments = [];
    var normalizedBundleHash = bundle.normalizedBundle(bundleHash);

    // Split hash into 3 fragments
    for (var i = 0; i < 3; i++) {
        normalizedBundleFragments[i] = normalizedBundleHash.slice(i * 27, (i + 1) * 27);
    }

    // Get digests
    var digests = [];

    for (var i = 0; i < signatureFragments.length; i++) {

        var digestBuffer = digest(normalizedBundleFragments[i % 3], Converter.trits(signatureFragments[i]));

        for (var j = 0; j < 243; j++) {

            digests[i * 243 + j] = digestBuffer[j]
        }
    }

    var address = Converter.trytes(self.address(digests));

    return (expectedAddress === address);
}


module.exports = {
    key                 : key,
    digests             : digests,
    address             : address,
    digest              : digest,
    signatureFragment   : signatureFragment,
    validateSignatures  : validateSignatures
}


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/errors/inputErrors.js":
/*!***************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/errors/inputErrors.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = {

    invalidTrytes: function() {
        return new Error("Invalid Trytes provided");
    },
    invalidSeed: function() {
        return new Error("Invalid Seed provided");
    },
    invalidIndex: function() {
        return new Error("Invalid Index option provided");
    }, 
    invalidSecurity: function() {
        return new Error("Invalid Security option provided");
    },
    invalidChecksum: function(address) {
        return new Error("Invalid Checksum supplied for address: " + address)
    },
    invalidAttachedTrytes: function() {
        return new Error("Invalid attached Trytes provided");
    },
    invalidTransfers: function() {
        return new Error("Invalid transfers object");
    },
    invalidKey: function() {
        return new Error("You have provided an invalid key value");
    },
    invalidTrunkOrBranch: function(hash) {
        return new Error("You have provided an invalid hash as a trunk/branch: " + hash);
    },
    invalidUri: function(uri) {
        return new Error("You have provided an invalid URI for your Neighbor: " + uri)
    },
    notInt: function() {
        return new Error("One of your inputs is not an integer");
    },
    invalidInputs: function() {
        return new Error("Invalid inputs provided");
    }
}


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/iota.crypto.js":
/*!********************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/iota.crypto.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  curl: __webpack_require__(/*! ./crypto/curl/curl */ "./node_modules/iota.crypto.js/lib/crypto/curl/curl.js"),
  kerl: __webpack_require__(/*! ./crypto/kerl/kerl */ "./node_modules/iota.crypto.js/lib/crypto/kerl/kerl.js"),
  bundle: __webpack_require__(/*! ./crypto/bundle/bundle */ "./node_modules/iota.crypto.js/lib/crypto/bundle/bundle.js"),
  converter: __webpack_require__(/*! ./crypto/converter/converter */ "./node_modules/iota.crypto.js/lib/crypto/converter/converter.js"),
  signing: __webpack_require__(/*! ./crypto/signing/signing */ "./node_modules/iota.crypto.js/lib/crypto/signing/signing.js"),
  oldSigning: __webpack_require__(/*! ./crypto/signing/oldSigning */ "./node_modules/iota.crypto.js/lib/crypto/signing/oldSigning.js"),
  hmac: __webpack_require__(/*! ./crypto/hmac/hmac */ "./node_modules/iota.crypto.js/lib/crypto/hmac/hmac.js"),
  multisig: __webpack_require__(/*! ./multisig/multisig */ "./node_modules/iota.crypto.js/lib/multisig/multisig.js"),
  utils: __webpack_require__(/*! ./utils/utils */ "./node_modules/iota.crypto.js/lib/utils/utils.js"),
  valid: __webpack_require__(/*! ./errors/inputErrors */ "./node_modules/iota.crypto.js/lib/errors/inputErrors.js"),
  add: __webpack_require__(/*! ./crypto/helpers/adder */ "./node_modules/iota.crypto.js/lib/crypto/helpers/adder.js")
}


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/multisig/address.js":
/*!*************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/multisig/address.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Converter      =  __webpack_require__(/*! ../crypto/converter/converter */ "./node_modules/iota.crypto.js/lib/crypto/converter/converter.js");
var Curl           =  __webpack_require__(/*! ../crypto/curl/curl */ "./node_modules/iota.crypto.js/lib/crypto/curl/curl.js");
var Kerl           =  __webpack_require__(/*! ../crypto/kerl/kerl */ "./node_modules/iota.crypto.js/lib/crypto/kerl/kerl.js");
var Signing        =  __webpack_require__(/*! ../crypto/signing/signing */ "./node_modules/iota.crypto.js/lib/crypto/signing/signing.js");
var Utils          =  __webpack_require__(/*! ../utils/utils */ "./node_modules/iota.crypto.js/lib/utils/utils.js");
var inputValidator =  __webpack_require__(/*! ../utils/inputValidator */ "./node_modules/iota.crypto.js/lib/utils/inputValidator.js");


/**
*   Initializes a new multisig address
*
*   @method addDigest
*   @param {string|array} digest digest trytes
*   @return {object} address instance
*
**/
function Address(digests) {

  if (!(this instanceof Address)) {
    return new Address(digests);
  }

  // Initialize kerl instance
  this._kerl = new Kerl();
  this._kerl.initialize();


  // Add digests if any
  if (digests) {

    this.absorb(digests);
  }
}

/**
*   Absorbs key digests
*
*   @method absorb
*   @param {string|array} digest digest trytes
*   @return {object} address instance
*
**/
Address.prototype.absorb = function (digest) {

  // Construct array
  var digests = Array.isArray(digest) ? digest : [digest];

  // Add digests
  for (var i = 0; i < digests.length; i++) {

    // Get trits of digest
    var digestTrits = Converter.trits(digests[i]);

    // Absorb digest
    this._kerl.absorb(digestTrits, 0, digestTrits.length);
  }

  return this;
}

/**
*   Finalizes and returns the multisig address in trytes
*
*   @method finalize
*   @param {string} digest digest trytes, optional
*   @return {string} address trytes
*
**/
Address.prototype.finalize = function (digest) {

    // Absorb last digest if provided
    if (digest) {
      this.absorb(digest);
    }

    // Squeeze the address trits
    var addressTrits = [];
    this._kerl.squeeze(addressTrits, 0, Curl.HASH_LENGTH);

    // Convert trits into trytes and return the address
    return Converter.trytes(addressTrits);
}


module.exports = Address;


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/multisig/multisig.js":
/*!**************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/multisig/multisig.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Signing         =  __webpack_require__(/*! ../crypto/signing/signing */ "./node_modules/iota.crypto.js/lib/crypto/signing/signing.js");
var Converter       =  __webpack_require__(/*! ../crypto/converter/converter */ "./node_modules/iota.crypto.js/lib/crypto/converter/converter.js");
var Kerl            =  __webpack_require__(/*! ../crypto/kerl/kerl */ "./node_modules/iota.crypto.js/lib/crypto/kerl/kerl.js");
var Curl            =  __webpack_require__(/*! ../crypto/curl/curl */ "./node_modules/iota.crypto.js/lib/crypto/curl/curl.js");
var Bundle          =  __webpack_require__(/*! ../crypto/bundle/bundle */ "./node_modules/iota.crypto.js/lib/crypto/bundle/bundle.js");
var Utils           =  __webpack_require__(/*! ../utils/utils */ "./node_modules/iota.crypto.js/lib/utils/utils.js");
var inputValidator  =  __webpack_require__(/*! ../utils/inputValidator */ "./node_modules/iota.crypto.js/lib/utils/inputValidator.js");
var errors          =  __webpack_require__(/*! ../errors/inputErrors */ "./node_modules/iota.crypto.js/lib/errors/inputErrors.js");
var Address         =  __webpack_require__(/*! ./address */ "./node_modules/iota.crypto.js/lib/multisig/address.js");

function Multisig(provider) {

    this._makeRequest = provider;
}


/**
*   Gets the key value of a seed
*
*   @method getKey
*   @param {string} seed
*   @param {int} index
*   @param {int} security Security level to be used for the private key / address. Can be 1, 2 or 3
*   @returns {string} digest trytes
**/
Multisig.getKey = function(seed, index, security) {

    return Converter.trytes(Signing.key(Converter.trits(seed), index, security));
}

/**
*   Gets the digest value of a seed
*
*   @method getDigest
*   @param {string} seed
*   @param {int} index
*   @param {int} security Security level to be used for the private key / address. Can be 1, 2 or 3
*   @returns {string} digest trytes
**/
Multisig.getDigest = function(seed, index, security) {

    var key = Signing.key(Converter.trits(seed), index, security);
    return Converter.trytes(Signing.digests(key));
}

/**
*   Multisig address constructor
*/
Multisig.address = Address;

/**
*   Validates  a generated multisig address
*
*   @method validateAddress
*   @param {string} multisigAddress
*   @param {array} digests
*   @returns {bool}
**/
Multisig.validateAddress = function(multisigAddress, digests) {

    var kerl = new Kerl();

    // initialize Kerl with the provided state
    kerl.initialize();

    // Absorb all key digests
    digests.forEach(function(keyDigest) {
        var trits = Converter.trits(keyDigest);
        kerl.absorb(Converter.trits(keyDigest), 0, trits.length);
    })

    // Squeeze address trits
    var addressTrits = [];
    kerl.squeeze(addressTrits, 0, Curl.HASH_LENGTH);

    // Convert trits into trytes and return the address
    return Converter.trytes(addressTrits) === multisigAddress;
}


/**
*   Prepares transfer by generating the bundle with the corresponding cosigner transactions
*   Does not contain signatures
*
*   @method initiateTransfer
*   @param {object} input the input addresses as well as the securitySum, and balance
*                   where `address` is the input multisig address
*                   and `securitySum` is the sum of security levels used by all co-signers
*                   and `balance` is the expected balance, if you wish to override getBalances
*   @param {string} remainderAddress Has to be generated by the cosigners before initiating the transfer, can be null if fully spent
*   @param {object} transfers
*   @param {function} callback
*   @returns {array} Array of transaction objects
**/
Multisig.initiateTransfer = function(input, remainderAddress, transfers, callback) {

    var self = this;

    // If message or tag is not supplied, provide it
    // Also remove the checksum of the address if it's there
    transfers.forEach(function(thisTransfer) {
        thisTransfer.message = thisTransfer.message ? thisTransfer.message : '';
        thisTransfer.tag = thisTransfer.tag ? thisTransfer.tag : '';
        thisTransfer.obsoleteTag = thisTransfer.obsoleteTag ? thisTransfer.obsoleteTag : '';        
        thisTransfer.address = Utils.noChecksum(thisTransfer.address);
    })

    // Input validation of transfers object
    if (!inputValidator.isTransfersArray(transfers)) {
        return callback(errors.invalidTransfers());
    }

    // check if int
    if (!inputValidator.isValue(input.securitySum)) {
        return callback(errors.invalidInputs());
    }

    // validate input address
    if (!inputValidator.isAddress(input.address)) {
        return callback(errors.invalidTrytes());
    }

    // validate remainder address
    if (remainderAddress && !inputValidator.isAddress(remainderAddress)) {
        return callback(errors.invalidTrytes());
    }

    // Create a new bundle
    var bundle = new Bundle();

    var totalValue = 0;
    var signatureFragments = [];
    var tag;

    //
    //  Iterate over all transfers, get totalValue
    //  and prepare the signatureFragments, message and tag
    //
    for (var i = 0; i < transfers.length; i++) {

        var signatureMessageLength = 1;

        // If message longer than 2187 trytes, increase signatureMessageLength (add multiple transactions)
        if (transfers[i].message.length > 2187) {

            // Get total length, message / maxLength (2187 trytes)
            signatureMessageLength += Math.floor(transfers[i].message.length / 2187);

            var msgCopy = transfers[i].message;

            // While there is still a message, copy it
            while (msgCopy) {

                var fragment = msgCopy.slice(0, 2187);
                msgCopy = msgCopy.slice(2187, msgCopy.length);

                // Pad remainder of fragment
                for (var j = 0; fragment.length < 2187; j++) {
                    fragment += '9';
                }

                signatureFragments.push(fragment);
            }

        } else {
            // Else, get single fragment with 2187 of 9's trytes
            var fragment = '';

            if (transfers[i].message) {
                fragment = transfers[i].message.slice(0, 2187)
            }

            for (var j = 0; fragment.length < 2187; j++) {
                fragment += '9';
            }

            signatureFragments.push(fragment);
        }

        // get current timestamp in seconds
        var timestamp = Math.floor(Date.now() / 1000);

        // If no tag defined, get 27 tryte tag.
        tag = transfers[i].tag ? transfers[i].tag : '999999999999999999999999999';

        // Pad for required 27 tryte length
        for (var j = 0; tag.length < 27; j++) {
            tag += '9';
        }

        // Add first entries to the bundle
        // Slice the address in case the user provided a checksummed one
        bundle.addEntry(signatureMessageLength, transfers[i].address.slice(0, 81), transfers[i].value, tag, timestamp);

        // Sum up total value
        totalValue += parseInt(transfers[i].value);
    }

    // Get inputs if we are sending tokens
    if (totalValue) {

        function createBundle(totalBalance, callback) {
            if (totalBalance > 0) {

                var toSubtract = 0 - totalBalance;
                var timestamp = Math.floor(Date.now() / 1000);

                // Add input as bundle entry
                // Only a single entry, signatures will be added later
                bundle.addEntry(input.securitySum, input.address, toSubtract, tag, timestamp);
            }

            if (totalValue > totalBalance) {
                return callback(new Error("Not enough balance."));
            }


            // If there is a remainder value
            // Add extra output to send remaining funds to
            if (totalBalance > totalValue) {

                var remainder = totalBalance - totalValue;

                // Remainder bundle entry if necessary
                if (!remainderAddress) {
                    return callback(new Error("No remainder address defined"));
                }

                bundle.addEntry(1, remainderAddress, remainder, tag, timestamp);
            }

            bundle.finalize();
            bundle.addTrytes(signatureFragments);

            return callback(null, bundle.bundle);
        };

        if (input.balance) {
          createBundle(input.balance, callback);
        } else {
          var command = {
              'command': 'getBalances',
              'addresses': new Array(input.address),
              'threshold': 100
          }
          self._makeRequest.send(command, function(e, balances) {
              if (e) return callback(e);
              createBundle(parseInt(balances.balances[0]), callback);
          });
        }

    } else {

        return callback(new Error("Invalid value transfer: the transfer does not require a signature."));
    }

}


/**
*   Adds the cosigner signatures to the corresponding bundle transaction
*
*   @method addSignature
*   @param {array} bundleToSign
*   @param {int} cosignerIndex
*   @param {string} inputAddress
*   @param {string} key
*   @param {function} callback
*   @returns {array} trytes Returns bundle trytes
**/
Multisig.addSignature = function(bundleToSign, inputAddress, key, callback) {

    var bundle = new Bundle();
    bundle.bundle = bundleToSign;

    // Get the security used for the private key
    // 1 security level = 2187 trytes
    var security = (key.length / 2187);

    // convert private key trytes into trits
    var key = Converter.trits(key);


    // First get the total number of already signed transactions
    // use that for the bundle hash calculation as well as knowing
    // where to add the signature
    var numSignedTxs = 0;

    for (var i = 0; i < bundle.bundle.length; i++) {

        if (bundle.bundle[i].address === inputAddress) {

            // If transaction is already signed, increase counter
            if (!inputValidator.isNinesTrytes(bundle.bundle[i].signatureMessageFragment)) {

                numSignedTxs++;
            }
            // Else sign the transactionse
            else {

                var bundleHash = bundle.bundle[i].bundle;

                //  First 6561 trits for the firstFragment
                var firstFragment = key.slice(0, 6561);

                //  Get the normalized bundle hash
                var normalizedBundleHash = bundle.normalizedBundle(bundleHash);
                var normalizedBundleFragments = [];

                // Split hash into 3 fragments
                for (var k = 0; k < 3; k++) {
                    normalizedBundleFragments[k] = normalizedBundleHash.slice(k * 27, (k + 1) * 27);
                }

                //  First bundle fragment uses 27 trytes
                var firstBundleFragment = normalizedBundleFragments[numSignedTxs % 3];

                //  Calculate the new signatureFragment with the first bundle fragment
                var firstSignedFragment = Signing.signatureFragment(firstBundleFragment, firstFragment);

                //  Convert signature to trytes and assign the new signatureFragment
                bundle.bundle[i].signatureMessageFragment = Converter.trytes(firstSignedFragment);

                for (var j = 1; j < security; j++) {

                    //  Next 6561 trits for the firstFragment
                    var nextFragment = key.slice(6561 * j, (j + 1) * 6561);

                    //  Use the next 27 trytes
                    var nextBundleFragment = normalizedBundleFragments[(numSignedTxs + j) % 3];

                    //  Calculate the new signatureFragment with the first bundle fragment
                    var nextSignedFragment = Signing.signatureFragment(nextBundleFragment, nextFragment);

                    //  Convert signature to trytes and add new bundle entry at i + j position
                    // Assign the signature fragment
                    bundle.bundle[i + j].signatureMessageFragment = Converter.trytes(nextSignedFragment);
                }

                break;
            }
        }
    }

    return callback(null, bundle.bundle);
}

module.exports = Multisig;


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/utils/asciiToTrytes.js":
/*!****************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/utils/asciiToTrytes.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//
//  Conversion of ascii encoded bytes to trytes.
//  Input is a string (can be stringified JSON object), return value is Trytes
//
//  How the conversion works:
//    2 Trytes === 1 Byte
//    There are a total of 27 different tryte values: 9ABCDEFGHIJKLMNOPQRSTUVWXYZ
//
//    1. We get the decimal value of an individual ASCII character
//    2. From the decimal value, we then derive the two tryte values by basically calculating the tryte equivalent (e.g. 100 === 19 + 3 * 27)
//      a. The first tryte value is the decimal value modulo 27 (27 trytes)
//      b. The second value is the remainder (decimal value - first value), divided by 27
//    3. The two values returned from Step 2. are then input as indices into the available values list ('9ABCDEFGHIJKLMNOPQRSTUVWXYZ') to get the correct tryte value
//
//   EXAMPLES
//      Lets say we want to convert the ASCII character "Z".
//        1. 'Z' has a decimal value of 90.
//        2. 90 can be represented as 9 + 3 * 27. To make it simpler:
//           a. First value: 90 modulo 27 is 9. This is now our first value
//           b. Second value: (90 - 9) / 27 is 3. This is our second value.
//        3. Our two values are now 9 and 3. To get the tryte value now we simply insert it as indices into '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'
//           a. The first tryte value is '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'[9] === "I"
//           b. The second tryte value is '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'[3] === "C"
//        Our tryte pair is "IC"
//
//      RESULT:
//        The ASCII char "Z" is represented as "IC" in trytes.
//
function toTrytes(input) {

    // If input is not a string, return null
    if ( typeof input !== 'string' ) return null

    var TRYTE_VALUES = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var trytes = "";

    for (var i = 0; i < input.length; i++) {
        var char = input[i];
        var asciiValue = char.charCodeAt(0);

        // If not recognizable ASCII character, return null
        if (asciiValue > 255) {
            //asciiValue = 32
            return null;
        }

        var firstValue = asciiValue % 27;
        var secondValue = (asciiValue - firstValue) / 27;

        var trytesValue = TRYTE_VALUES[firstValue] + TRYTE_VALUES[secondValue];

        trytes += trytesValue;
    }

    return trytes;
}


//
//  Trytes to bytes
//  Reverse operation from the byteToTrytes function in send.js
//  2 Trytes == 1 Byte
//  We assume that the trytes are a JSON encoded object thus for our encoding:
//    First character = {
//    Last character = }
//    Everything after that is 9's padding
//
function fromTrytes(inputTrytes) {

    // If input is not a string, return null
    if ( typeof inputTrytes !== 'string' ) return null

    // If input length is odd, return null
    if ( inputTrytes.length % 2 ) return null

    var TRYTE_VALUES = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var outputString = "";

    for (var i = 0; i < inputTrytes.length; i += 2) {
        // get a trytes pair
        var trytes = inputTrytes[i] + inputTrytes[i + 1];

        var firstValue = TRYTE_VALUES.indexOf(trytes[0]);
        var secondValue = TRYTE_VALUES.indexOf(trytes[1]);

        var decimalValue = firstValue + secondValue * 27;

        var character = String.fromCharCode(decimalValue);

        outputString += character;
    }

    return outputString;
}

module.exports = {
    toTrytes: toTrytes,
    fromTrytes: fromTrytes
}


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/utils/extractJson.js":
/*!**************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/utils/extractJson.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ascii = __webpack_require__(/*! ./asciiToTrytes */ "./node_modules/iota.crypto.js/lib/utils/asciiToTrytes.js");
var inputValidator = __webpack_require__(/*! ./inputValidator */ "./node_modules/iota.crypto.js/lib/utils/inputValidator.js");

/**
*   extractJson takes a bundle as input and from the signatureMessageFragments extracts the correct JSON
*   data which was encoded and sent with the transaction.
*
*   @method extractJson
*   @param {array} bundle
*   @returns {Object}
**/
function extractJson(bundle) {

    // if wrong input return null
    if ( !inputValidator.isArray(bundle) || bundle[0] === undefined ) return null;


    // Sanity check: if the first tryte pair is not opening bracket, it's not a message
    var firstTrytePair = bundle[0].signatureMessageFragment[0] + bundle[0].signatureMessageFragment[1];

    if (firstTrytePair !== "OD") return null;

    var index = 0;
    var notEnded = true;
    var trytesChunk = '';
    var trytesChecked = 0;
    var preliminaryStop = false;
    var finalJson = '';

    while (index < bundle.length && notEnded) {

        var messageChunk = bundle[index].signatureMessageFragment;

        // We iterate over the message chunk, reading 9 trytes at a time
        for (var i = 0; i < messageChunk.length; i += 9) {

            // get 9 trytes
            var trytes = messageChunk.slice(i, i + 9);
            trytesChunk += trytes;

            // Get the upper limit of the tytes that need to be checked
            // because we only check 2 trytes at a time, there is sometimes a leftover
            var upperLimit = trytesChunk.length - trytesChunk.length % 2;

            var trytesToCheck = trytesChunk.slice(trytesChecked, upperLimit);

            // We read 2 trytes at a time and check if it equals the closing bracket character
            for (var j = 0; j < trytesToCheck.length; j += 2) {

                var trytePair = trytesToCheck[j] + trytesToCheck[j + 1];

                // If closing bracket char was found, and there are only trailing 9's
                // we quit and remove the 9's from the trytesChunk.
                if ( preliminaryStop && trytePair === '99' ) {

                    notEnded = false;
                    // TODO: Remove the trailing 9's from trytesChunk
                    //var closingBracket = trytesToCheck.indexOf('QD') + 1;

                    //trytesChunk = trytesChunk.slice( 0, ( trytesChunk.length - trytesToCheck.length ) + ( closingBracket % 2 === 0 ? closingBracket : closingBracket + 1 ) );

                    break;
                }

                finalJson += ascii.fromTrytes(trytePair);

                // If tryte pair equals closing bracket char, we set a preliminary stop
                // the preliminaryStop is useful when we have a nested JSON object
                if (trytePair === "QD") {
                    preliminaryStop = true;
                }
            }

            if (!notEnded)
                break;

            trytesChecked += trytesToCheck.length;
        }

        // If we have not reached the end of the message yet, we continue with the next
        // transaction in the bundle
        index += 1;

    }

    // If we did not find any JSON, return null
    if (notEnded) {

        return null;

    } else {

        return finalJson;

    }
}

module.exports = extractJson;


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/utils/inputValidator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/utils/inputValidator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
*   checks if input is correct address
*
*   @method isAddress
*   @param {string} address
*   @returns {boolean}
**/
var isAddress = function(address) {
    // TODO: In the future check checksum

    // Check if address with checksum
    if (address.length === 90) {

        if (!isTrytes(address, 90)) {
            return false;
        }
    } else {

        if (!isTrytes(address, 81)) {
            return false;
        }
    }

    return true;
}

/**
*   checks if input is correct trytes consisting of A-Z9
*   optionally validate length
*
*   @method isTrytes
*   @param {string} trytes
*   @param {integer} length optional
*   @returns {boolean}
**/
var isTrytes = function(trytes, length) {

    // If no length specified, just validate the trytes
    if (!length) length = "0,"

    var regexTrytes = new RegExp("^[9A-Z]{" + length +"}$");
    return regexTrytes.test(trytes) && isString(trytes);
}

/**
*   checks if input is correct trytes consisting of A-Z9
*   optionally validate length
*
*   @method isNinesTrytes
*   @param {string} trytes
*   @returns {boolean}
**/
var isNinesTrytes = function(trytes) {

    return /^[9]+$/.test(trytes) && isString(trytes);
}

/**
*   checks if integer value
*
*   @method isValue
*   @param {string} value
*   @returns {boolean}
**/
var isValue = function(value) {

    // check if correct number
    return Number.isInteger(value)
}

/**
*   checks whether input is a value or not. Can be a string, float or integer
*
*   @method isNum
*   @param {int}
*   @returns {boolean}
**/
var isNum = function(input) {

    return /^(\d+\.?\d{0,15}|\.\d{0,15})$/.test(input);
}

/**
*   checks if input is correct hash
*
*   @method isHash
*   @param {string} hash
*   @returns {boolean}
**/
var isHash = function(hash) {

    // Check if valid, 81 trytes
    if (!isTrytes(hash, 81)) {

        return false;
    }

    return true;
}

/**
*   checks whether input is a string or not
*
*   @method isString
*   @param {string}
*   @returns {boolean}
**/
var isString = function(string) {

    return typeof string === 'string';
}


/**
*   checks whether input is an array or not
*
*   @method isArray
*   @param {object}
*   @returns {boolean}
**/
var isArray = function(array) {

    return array instanceof Array;
}


/**
*   checks whether input is object or not
*
*   @method isObject
*   @param {object}
*   @returns {boolean}
**/
var isObject = function(object) {

    return typeof object === 'object';
}



/**
*   checks if input is correct hash
*
*   @method isTransfersArray
*   @param {array} hash
*   @returns {boolean}
**/
var isTransfersArray = function(transfersArray) {

    if (!isArray(transfersArray)) return false;

    for (var i = 0; i < transfersArray.length; i++) {

        var transfer = transfersArray[i];

        // Check if valid address
        var address = transfer.address;
        if (!isAddress(address)) {
            return false;
        }

        // Validity check for value
        var value = transfer.value;
        if (!isValue(value)) {
            return false;
        }

        // Check if message is correct trytes of any length
        var message = transfer.message;
        if (!isTrytes(message, "0,")) {
            return false;
        }

        // Check if tag is correct trytes of {0,27} trytes
        var tag = transfer.tag || transfer.obsoleteTag;
        if (!isTrytes(tag, "0,27")) {
            return false;
        }

    }

    return true;
}

/**
*   checks if input is list of correct trytes
*
*   @method isArrayOfHashes
*   @param {list} hashesArray
*   @returns {boolean}
**/
var isArrayOfHashes = function(hashesArray) {

    if (!isArray(hashesArray)) return false;

    for (var i = 0; i < hashesArray.length; i++) {

        var hash = hashesArray[i];

        // Check if address with checksum
        if (hash.length === 90) {

            if (!isTrytes(hash, 90)) {
                return false;
            }
        } else {

            if (!isTrytes(hash, 81)) {
                return false;
            }
        }
    }

    return true;
}

/**
*   checks if input is list of correct trytes
*
*   @method isArrayOfTrytes
*   @param {list} trytesArray
*   @returns {boolean}
**/
var isArrayOfTrytes = function(trytesArray) {

    if (!isArray(trytesArray)) return false;

    for (var i = 0; i < trytesArray.length; i++) {

        var tryteValue = trytesArray[i];

        // Check if correct 2673 trytes
        if (!isTrytes(tryteValue, 2673)) {
            return false;
        }
    }

    return true;
}

/**
*   checks if attached trytes if last 241 trytes are non-zero
*
*   @method isArrayOfAttachedTrytes
*   @param {array} trytesArray
*   @returns {boolean}
**/
var isArrayOfAttachedTrytes = function(trytesArray) {

    if (!isArray(trytesArray)) return false;

    for (var i = 0; i < trytesArray.length; i++) {

        var tryteValue = trytesArray[i];

        // Check if correct 2673 trytes
        if (!isTrytes(tryteValue, 2673)) {
            return false;
        }

        var lastTrytes = tryteValue.slice(2673 - (3 * 81));

        if (/^[9]+$/.test(lastTrytes)) {
            return false;
        }
    }

    return true;
}

/**
*   checks if correct bundle with transaction object
*
*   @method isArrayOfTxObjects
*   @param {array} bundle
*   @returns {boolean}
**/
var isArrayOfTxObjects = function(bundle) {

    if (!isArray(bundle) || bundle.length === 0) return false;

    var validArray = true;

    bundle.forEach(function(txObject) {

        var keysToValidate = [
            {
                key: 'hash',
                validator: isHash,
                args: null
            }, {
                key: 'signatureMessageFragment',
                validator: isTrytes,
                args: 2187
            }, {
                key: 'address',
                validator: isHash,
                args: null
            }, {
                key: 'value',
                validator: isValue,
                args: null
            }, {
                key: 'obsoleteTag',
                validator: isTrytes,
                args: 27
            }, {
                key: 'timestamp',
                validator: isValue,
                args: null
            }, {
                key: 'currentIndex',
                validator: isValue,
                args: null
            },{
                key: 'lastIndex',
                validator: isValue,
                args: null
            }, {
                key: 'bundle',
                validator: isHash,
                args: null
            }, {
                key: 'trunkTransaction',
                validator: isHash,
                args: null
            }, {
                key: 'branchTransaction',
                validator: isHash,
                args: null
            }, {
                key: 'tag',
                validator: isTrytes,
                args: 27
            }, {
                key: 'attachmentTimestamp',
                validator: isValue,
                args: null
            }, {
                key: 'attachmentTimestampLowerBound',
                validator: isValue,
                args: null
            }, {
                key: 'attachmentTimestampUpperBound',
                validator: isValue,
                args: null
            }, {
                key: 'nonce',
                validator: isTrytes,
                args: 27
            }
        ]

        for (var i = 0; i < keysToValidate.length; i++) {

            var key = keysToValidate[i].key;
            var validator = keysToValidate[i].validator;
            var args = keysToValidate[i].args

            // If input does not have keyIndex and address, return false
            if (!txObject.hasOwnProperty(key)) {
                validArray = false;
                break;
            }

            // If input validator function does not return true, exit
            if (!validator(txObject[key], args)) {
                validArray = false;
                break;
            }
        }
    })

    return validArray;
}

/**
*   checks if correct inputs list
*
*   @method isInputs
*   @param {array} inputs
*   @returns {boolean}
**/
var isInputs = function(inputs) {

    if (!isArray(inputs)) return false;

    for (var i = 0; i < inputs.length; i++) {

        var input = inputs[i];

        // If input does not have keyIndex and address, return false
        if (!input.hasOwnProperty('security') || !input.hasOwnProperty('keyIndex') || !input.hasOwnProperty('address')) return false;

        if (!isAddress(input.address)) {
            return false;
        }

        if (!isValue(input.security)) {
            return false;
        }

        if (!isValue(input.keyIndex)) {
            return false;
        }
    }

    return true;
}

/**
*   Checks that a given uri is valid
*
*   Valid Examples:
*   udp://[2001:db8:a0b:12f0::1]:14265
*   udp://[2001:db8:a0b:12f0::1]
*   udp://8.8.8.8:14265
*   udp://domain.com
*   udp://domain2.com:14265
*
*   @method isUri
*   @param {string} node
*   @returns {bool} valid
**/
var isUri = function(node) {

    var getInside = /^(udp|tcp):\/\/([\[][^\]\.]*[\]]|[^\[\]:]*)[:]{0,1}([0-9]{1,}$|$)/i;

    var stripBrackets = /[\[]{0,1}([^\[\]]*)[\]]{0,1}/;

    var uriTest = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/;

    if(!getInside.test(node)) {
        return false;
    }

    return uriTest.test(stripBrackets.exec(getInside.exec(node)[1])[1]);
}

module.exports = {
    isAddress: isAddress,
    isTrytes: isTrytes,
    isNinesTrytes: isNinesTrytes,
    isValue: isValue,
    isHash: isHash,
    isTransfersArray: isTransfersArray,
    isArrayOfHashes: isArrayOfHashes,
    isArrayOfTrytes: isArrayOfTrytes,
    isArrayOfAttachedTrytes: isArrayOfAttachedTrytes,
    isArrayOfTxObjects: isArrayOfTxObjects,
    isInputs: isInputs,
    isString: isString,
    isNum: isNum,
    isArray: isArray,
    isObject: isObject,
    isUri: isUri
}


/***/ }),

/***/ "./node_modules/iota.crypto.js/lib/utils/utils.js":
/*!********************************************************!*\
  !*** ./node_modules/iota.crypto.js/lib/utils/utils.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var inputValidator  =   __webpack_require__(/*! ./inputValidator */ "./node_modules/iota.crypto.js/lib/utils/inputValidator.js");
var Curl            =   __webpack_require__(/*! ../crypto/curl/curl */ "./node_modules/iota.crypto.js/lib/crypto/curl/curl.js");
var Kerl            =   __webpack_require__(/*! ../crypto/kerl/kerl */ "./node_modules/iota.crypto.js/lib/crypto/kerl/kerl.js");
var Converter       =   __webpack_require__(/*! ../crypto/converter/converter */ "./node_modules/iota.crypto.js/lib/crypto/converter/converter.js");
var Signing         =   __webpack_require__(/*! ../crypto/signing/signing */ "./node_modules/iota.crypto.js/lib/crypto/signing/signing.js");
var CryptoJS        =   __webpack_require__(/*! crypto-js */ "./node_modules/crypto-js/index.js");
var ascii           =   __webpack_require__(/*! ./asciiToTrytes */ "./node_modules/iota.crypto.js/lib/utils/asciiToTrytes.js");
var extractJson     =   __webpack_require__(/*! ./extractJson */ "./node_modules/iota.crypto.js/lib/utils/extractJson.js");


/**
*   Table of IOTA Units based off of the standard System of Units
**/
var unitMap = {
    'i'   :   1,
    'Ki'  :   1000,
    'Mi'  :   1000000,
    'Gi'  :   1000000000,
    'Ti'  :   1000000000000,
    'Pi'  :   1000000000000000  // For the very, very rich
}

/**
*   converts IOTA units
*
*   @method convertUnits
*   @param {string || int || float} value
*   @param {string} fromUnit
*   @param {string} toUnit
*   @returns {integer} converted
**/
var convertUnits = function(value, fromUnit, toUnit) {

    // Check if wrong unit provided
    if (unitMap[fromUnit] === undefined || unitMap[toUnit] === undefined) {

        throw new Error("Invalid unit provided");
    }

    var afterComma = String(value).match(/\.([\d]+)$/);

    if (afterComma && afterComma[1].length > String(unitMap[fromUnit]).length - 1) {

        throw new Error("Too many digits after comma");
    }

    // If not valid value, throw error
    if (!inputValidator.isNum(value)) {

        throw new Error("Invalid value");
    }


    var floatValue = parseFloat(value);

    var converted = (floatValue * unitMap[fromUnit]) / unitMap[toUnit];

    return converted;
}

/**
*   Generates the 9-tryte checksum of an address
*
*   @method addChecksum
*   @param {string | list} inputValue
*   @param {int} checksumLength
@   @param {bool} isAddress default is true
*   @returns {string | list} address (with checksum)
**/
var addChecksum = function(inputValue, checksumLength, isAddress) {

    // checksum length is either user defined, or 9 trytes
    var checksumLength = checksumLength || 9;
    var isAddress = (isAddress !== false);

    // the length of the trytes to be validated
    var validationLength = isAddress ? 81 : null;

    var isSingleInput = inputValidator.isString( inputValue );

    // If only single address, turn it into an array
    if ( isSingleInput ) inputValue = new Array( inputValue );

    var inputsWithChecksum = [];

    inputValue.forEach(function(thisValue) {

        // check if correct trytes
        if (!inputValidator.isTrytes(thisValue, validationLength)) {
            throw new Error("Invalid input");
        }

        var kerl = new Kerl();
        kerl.initialize();

        // Address trits
        var addressTrits = Converter.trits(thisValue);

        // Checksum trits
        var checksumTrits = [];

        // Absorb address trits
        kerl.absorb(addressTrits, 0, addressTrits.length);

        // Squeeze checksum trits
        kerl.squeeze(checksumTrits, 0, Curl.HASH_LENGTH);

        // First 9 trytes as checksum
        var checksum = Converter.trytes( checksumTrits ).substring( 81 - checksumLength, 81 );
        inputsWithChecksum.push( thisValue + checksum );
    });

    if (isSingleInput) {

        return inputsWithChecksum[ 0 ];

    } else {

        return inputsWithChecksum;

    }
}

/**
*   Removes the 9-tryte checksum of an address
*
*   @method noChecksum
*   @param {string | list} address
*   @returns {string | list} address (without checksum)
**/
var noChecksum = function(address) {

    var isSingleAddress = inputValidator.isString(address)

    // If only single address, turn it into an array
    if (isSingleAddress) address = new Array(address);

    var addressesWithChecksum = [];

    address.forEach(function(thisAddress) {
        addressesWithChecksum.push(thisAddress.slice(0, 81))
    })

    // return either string or the list
    if (isSingleAddress) {

        return addressesWithChecksum[0];

    } else {

        return addressesWithChecksum;

    }
}

/**
*   Validates the checksum of an address
*
*   @method isValidChecksum
*   @param {string} addressWithChecksum
*   @returns {bool}
**/
var isValidChecksum = function(addressWithChecksum) {

    var addressWithoutChecksum = noChecksum(addressWithChecksum);

    var newChecksum = addChecksum(addressWithoutChecksum);

    return newChecksum === addressWithChecksum;
}

/**
*   Converts transaction trytes of 2673 trytes into a transaction object
*
*   @method transactionObject
*   @param {string} trytes
*   @returns {String} transactionObject
**/
var transactionObject = function(trytes) {

    if (!trytes) return;

    // validity check
    for (var i = 2279; i < 2295; i++) {

        if (trytes.charAt(i) !== "9") {

            return null;

        }
    }

    var thisTransaction = {};
    var transactionTrits = Converter.trits(trytes);
    var hash = [];

    var curl = new Curl();

    // generate the correct transaction hash
    curl.initialize();
    curl.absorb(transactionTrits, 0, transactionTrits.length);
    curl.squeeze(hash, 0, 243);

    thisTransaction.hash = Converter.trytes(hash);
    thisTransaction.signatureMessageFragment = trytes.slice(0, 2187);
    thisTransaction.address = trytes.slice(2187, 2268);
    thisTransaction.value = Converter.value(transactionTrits.slice(6804, 6837));
    thisTransaction.obsoleteTag = trytes.slice(2295, 2322);
    thisTransaction.timestamp = Converter.value(transactionTrits.slice(6966, 6993));
    thisTransaction.currentIndex = Converter.value(transactionTrits.slice(6993, 7020));
    thisTransaction.lastIndex = Converter.value(transactionTrits.slice(7020, 7047));
    thisTransaction.bundle = trytes.slice(2349, 2430);
    thisTransaction.trunkTransaction = trytes.slice(2430, 2511);
    thisTransaction.branchTransaction = trytes.slice(2511, 2592);

    thisTransaction.tag = trytes.slice(2592, 2619);
    thisTransaction.attachmentTimestamp = Converter.value(transactionTrits.slice(7857, 7884));
    thisTransaction.attachmentTimestampLowerBound = Converter.value(transactionTrits.slice(7884, 7911));
    thisTransaction.attachmentTimestampUpperBound = Converter.value(transactionTrits.slice(7911, 7938));
    thisTransaction.nonce = trytes.slice(2646, 2673);

    return thisTransaction;
}

/**
*   Converts a transaction object into trytes
*
*   @method transactionTrytes
*   @param {object} transactionTrytes
*   @returns {String} trytes
**/
var transactionTrytes = function(transaction) {

    var valueTrits = Converter.trits(transaction.value);
    while (valueTrits.length < 81) {
        valueTrits[valueTrits.length] = 0;
    }

    var timestampTrits = Converter.trits(transaction.timestamp);
    while (timestampTrits.length < 27) {
        timestampTrits[timestampTrits.length] = 0;
    }

    var currentIndexTrits = Converter.trits(transaction.currentIndex);
    while (currentIndexTrits.length < 27) {
        currentIndexTrits[currentIndexTrits.length] = 0;
    }

    var lastIndexTrits = Converter.trits(transaction.lastIndex);
    while (lastIndexTrits.length < 27) {
        lastIndexTrits[lastIndexTrits.length] = 0;
    }

    var attachmentTimestampTrits = Converter.trits(transaction.attachmentTimestamp || 0);
    while (attachmentTimestampTrits.length < 27) {
        attachmentTimestampTrits[attachmentTimestampTrits.length] = 0;
    }

    var attachmentTimestampLowerBoundTrits = Converter.trits(transaction.attachmentTimestampLowerBound || 0);
    while (attachmentTimestampLowerBoundTrits.length < 27) {
        attachmentTimestampLowerBoundTrits[attachmentTimestampLowerBoundTrits.length] = 0;
    }

    var attachmentTimestampUpperBoundTrits = Converter.trits(transaction.attachmentTimestampUpperBound || 0);
    while (attachmentTimestampUpperBoundTrits.length < 27) {
        attachmentTimestampUpperBoundTrits[attachmentTimestampUpperBoundTrits.length] = 0;
    }

    transaction.tag = transaction.tag || transaction.obsoleteTag;

    return transaction.signatureMessageFragment
    + transaction.address
    + Converter.trytes(valueTrits)
    + transaction.obsoleteTag
    + Converter.trytes(timestampTrits)
    + Converter.trytes(currentIndexTrits)
    + Converter.trytes(lastIndexTrits)
    + transaction.bundle
    + transaction.trunkTransaction
    + transaction.branchTransaction
    + transaction.tag
    + Converter.trytes(attachmentTimestampTrits)
    + Converter.trytes(attachmentTimestampLowerBoundTrits)
    + Converter.trytes(attachmentTimestampUpperBoundTrits)
    + transaction.nonce;
}

/**
*   Categorizes a list of transfers between sent and received
*
*   @method categorizeTransfers
*   @param {object} transfers Transfers (bundles)
*   @param {list} addresses List of addresses that belong to the user
*   @returns {String} trytes
**/
var categorizeTransfers = function(transfers, addresses) {

    var categorized = {
        'sent'      : [],
        'received'  : []
    }

    // Iterate over all bundles and sort them between incoming and outgoing transfers
    transfers.forEach(function(bundle) {

        var spentAlreadyAdded = false;

        // Iterate over every bundle entry
        bundle.forEach(function(bundleEntry, bundleIndex) {

            // If bundle address in the list of addresses associated with the seed
            // add the bundle to the
            if (addresses.indexOf(bundleEntry.address) > -1) {

                // Check if it's a remainder address
                var isRemainder = (bundleEntry.currentIndex === bundleEntry.lastIndex) && bundleEntry.lastIndex !== 0;

                // check if sent transaction
                if (bundleEntry.value < 0 && !spentAlreadyAdded && !isRemainder) {

                    categorized.sent.push(bundle);

                    // too make sure we do not add transactions twice
                    spentAlreadyAdded = true;
                }
                // check if received transaction, or 0 value (message)
                // also make sure that this is not a 2nd tx for spent inputs
                else if (bundleEntry.value >= 0 && !spentAlreadyAdded && !isRemainder) {

                    categorized.received.push(bundle);
                }
            }
        })
    })

    return categorized;
}


/**
*   Validates the signatures
*
*   @method validateSignatures
*   @param {array} signedBundle
*   @param {string} inputAddress
*   @returns {bool}
**/
var validateSignatures = function(signedBundle, inputAddress) {


    var bundleHash;
    var signatureFragments = [];

    for (var i = 0; i < signedBundle.length; i++) {

        if (signedBundle[i].address === inputAddress) {

            bundleHash = signedBundle[i].bundle;

            // if we reached remainder bundle
            if (inputValidator.isNinesTrytes(signedBundle[i].signatureMessageFragment)) {
                break;
            }

            signatureFragments.push(signedBundle[i].signatureMessageFragment)
        }
    }

    if (!bundleHash) {
        return false;
    }

    return Signing.validateSignatures(inputAddress, signatureFragments, bundleHash);
}


/**
*   Checks is a Bundle is valid. Validates signatures and overall structure. Has to be tail tx first.
*
*   @method isValidBundle
*   @param {array} bundle
*   @returns {bool} valid
**/
var isBundle = function(bundle) {

    // If not correct bundle
    if (!inputValidator.isArrayOfTxObjects(bundle)) return false;

    var totalSum = 0, lastIndex, bundleHash = bundle[0].bundle;

    // Prepare to absorb txs and get bundleHash
    var bundleFromTxs = [];

    var kerl = new Kerl();
    kerl.initialize();

    // Prepare for signature validation
    var signaturesToValidate = [];

    bundle.forEach(function(bundleTx, index) {

        totalSum += bundleTx.value;

        // currentIndex has to be equal to the index in the array
        if (bundleTx.currentIndex !== index) return false;

        // Get the transaction trytes
        var thisTxTrytes = transactionTrytes(bundleTx);

        // Absorb bundle hash + value + timestamp + lastIndex + currentIndex trytes.
        var thisTxTrits = Converter.trits(thisTxTrytes.slice(2187, 2187 + 162));
        kerl.absorb(thisTxTrits, 0, thisTxTrits.length);

        // Check if input transaction
        if (bundleTx.value < 0) {
            var thisAddress = bundleTx.address;

            var newSignatureToValidate = {
                'address': thisAddress,
                'signatureFragments': Array(bundleTx.signatureMessageFragment)
            }

            // Find the subsequent txs with the remaining signature fragment
            for (var i = index; i < bundle.length - 1; i++) {
                var newBundleTx = bundle[i + 1];

                // Check if new tx is part of the signature fragment
                if (newBundleTx.address === thisAddress && newBundleTx.value === 0) {
                    newSignatureToValidate.signatureFragments.push(newBundleTx.signatureMessageFragment);
                }
            }

            signaturesToValidate.push(newSignatureToValidate);
        }
    });

    // Check for total sum, if not equal 0 return error
    if (totalSum !== 0) return false;

    // get the bundle hash from the bundle transactions
    kerl.squeeze(bundleFromTxs, 0, Curl.HASH_LENGTH);
    var bundleFromTxs = Converter.trytes(bundleFromTxs);

    // Check if bundle hash is the same as returned by tx object
    if (bundleFromTxs !== bundleHash) return false;

    // Last tx in the bundle should have currentIndex === lastIndex
    if (bundle[bundle.length - 1].currentIndex !== bundle[bundle.length - 1].lastIndex) return false;

    // Validate the signatures
    for (var i = 0; i < signaturesToValidate.length; i++) {

        var isValidSignature = Signing.validateSignatures(signaturesToValidate[i].address, signaturesToValidate[i].signatureFragments, bundleHash);

        if (!isValidSignature) return false;
    }

    return true;
}

module.exports = {
    inputValidator      : inputValidator,    
    convertUnits        : convertUnits,
    addChecksum         : addChecksum,
    noChecksum          : noChecksum,
    isValidChecksum     : isValidChecksum,
    transactionObject   : transactionObject,
    transactionTrytes   : transactionTrytes,
    categorizeTransfers : categorizeTransfers,
    toTrytes            : ascii.toTrytes,
    fromTrytes          : ascii.fromTrytes,
    extractJson         : extractJson,
    validateSignatures  : validateSignatures,
    isBundle            : isBundle
}


/***/ }),

/***/ "./src/WebGL/index.js":
/*!****************************!*\
  !*** ./src/WebGL/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var initGL = __webpack_require__(/*! ./initGL */ "./src/WebGL/initGL.js");
var newBuffer = __webpack_require__(/*! ./newBuffer */ "./src/WebGL/newBuffer.js");
var createTexture = __webpack_require__(/*! ./texture */ "./src/WebGL/texture.js");
var ShaderCode = __webpack_require__(/*! ./shadercode */ "./src/WebGL/shadercode.js");

function _frameBufferSetTexture(gl, fbo, nTexture, dim) {
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  // Types arrays speed this up tremendously.
  //var nTexture = createTexture(gl, new Int32Array(length), dim);

  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, nTexture, 0);

  // Test for mobile bug MDN->WebGL_best_practices, bullet 7
  var frameBufferStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE;

  if (!frameBufferStatus) throw new Error('turbojs: Error attaching float texture to framebuffer. Your device is probably incompatible. Error info: ' + frameBufferStatus.message);
}
function alloc(sz) {
  // A sane limit for most GPUs out there.
  // JS falls apart before GLSL limits could ever be reached.

  var ns = Math.pow(Math.pow(2, Math.ceil(Math.log(sz) / 1.386) - 1), 2);
  return {
    //data : new Int32Array(ns * 16),
    data: new Int32Array(sz),
    length: sz
  };
}
var _bindBuffers = function _bindBuffers(gl, buffers, attrib) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texture);
  gl.enableVertexAttribArray(attrib.texture);
  gl.vertexAttribPointer(attrib.texture, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.enableVertexAttribArray(attrib.position);
  gl.vertexAttribPointer(attrib.position, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
};
var _createVertexShader = function _createVertexShader(gl) {
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, ShaderCode.vertexShaderCode);
  gl.compileShader(vertexShader);

  // This should not fail.
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) throw new Error("\nturbojs: Could not build internal vertex shader (fatal).\n" + "\n" + "INFO: >REPORT< THIS. That's our fault!\n" + "\n" + "--- CODE DUMP ---\n" + ShaderCode.vertexShaderCode + "\n\n" + "--- ERROR LOG ---\n" + gl.getShaderInfoLog(vertexShader));
  return vertexShader;
};
var _createFragmentShader = function _createFragmentShader(gl, code) {
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(fragmentShader, ShaderCode.stdlib + code);

  gl.compileShader(fragmentShader);
  // Use this output to debug the shader
  // Keep in mind that WebGL GLSL is **much** stricter than e.g. OpenGL GLSL
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    var LOC = code.split('\n');
    var dbgMsg = "ERROR: Could not build shader (fatal).\n\n------------------ KERNEL CODE DUMP ------------------\n";

    for (var nl = 0; nl < LOC.length; nl++) {
      dbgMsg += ShaderCode.stdlib.split('\n').length + nl + "> " + LOC[nl] + "\n";
    }dbgMsg += "\n--------------------- ERROR  LOG ---------------------\n" + gl.getShaderInfoLog(fragmentShader);

    throw new Error(dbgMsg);
  }
  return fragmentShader;
};
var _finishRun = function _finishRun(gl) {
  gl.bindVertexArray(null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};
var WebGLWorker = function WebGLWorker(l, s) {

  var worker = new Object();
  worker.gl = initGL();
  var gl = worker.gl;

  worker.dim = {
    x: l,
    y: 0
  };
  var MAXIMAGESIZE = Math.pow(gl.MAX_TEXTURE_SIZE, 2) * 0.50;
  var IMAGE_SIZE = Math.floor(MAXIMAGESIZE / worker.dim.x / s) * worker.dim.x * s;
  worker.dim.y = IMAGE_SIZE / worker.dim.x / s;
  var length = IMAGE_SIZE;

  worker.programs = new Map();
  worker.ipt = alloc(length);

  // GPU texture buffer = from JS typed array
  worker.buffers = {
    position: newBuffer(gl, [-1, -1, 1, -1, 1, 1, -1, 1]),
    texture: newBuffer(gl, [0, 0, 1, 0, 1, 1, 0, 1]),
    index: newBuffer(gl, [1, 2, 0, 3, 0, 2], Uint16Array, gl.ELEMENT_ARRAY_BUFFER)
  };

  worker.attrib = {
    position: 0,
    texture: 1
  };

  worker.vao = gl.createVertexArray();
  gl.bindVertexArray(worker.vao);
  _bindBuffers(gl, worker.buffers, worker.attrib);
  gl.bindVertexArray(null);
  worker.vertexShader = _createVertexShader(gl);
  worker.framebuffer = gl.createFramebuffer();
  worker.texture0 = createTexture(gl, worker.ipt.data, worker.dim);
  worker.texture1 = createTexture(gl, new Int32Array(length), worker.dim);
  return worker;
};
module.exports = {
  worker: WebGLWorker,
  addProgram: function addProgram(worker, name, code) {
    for (var _len = arguments.length, uniforms = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      uniforms[_key - 3] = arguments[_key];
    }

    var gl = worker.gl;
    var vertexShader = worker.vertexShader;

    var fragmentShader = _createFragmentShader(worker.gl, code);
    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.bindAttribLocation(program, worker.attrib.position, 'position');
    gl.bindAttribLocation(program, worker.attrib.texture, 'texture');
    gl.linkProgram(program);
    var u_vars = new Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = uniforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var variable = _step.value;

        u_vars.set(variable, gl.getUniformLocation(program, variable));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!!worker.programs.get(name)) {
      console.log("program exists");
    }
    worker.programs.set(name, { program: program, u_vars: u_vars });
  },
  /*
  use: (name) => {
  },
  */
  run: function run(worker, name, count) {
    for (var _len2 = arguments.length, uniforms = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      uniforms[_key2 - 3] = arguments[_key2];
    }

    var gl = worker.gl;
    var info = worker.programs.get(name);
    var program = info.program;
    var u_vars = info.u_vars;
    if (program === null) throw new Error("No Such Program!");

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('turbojs: Failed to link GLSL program code.');

    var uTexture = gl.getUniformLocation(program, 'u_texture');
    gl.useProgram(program);

    count = count || 1;
    while (count-- > 0) {
      gl.bindTexture(gl.TEXTURE_2D, worker.texture0);
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(uTexture, 0);

      gl.viewport(0, 0, worker.dim.x, worker.dim.y);
      _frameBufferSetTexture(gl, worker.framebuffer, worker.texture1, worker.dim); //new
      gl.bindVertexArray(worker.vao);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = uniforms[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var u_v = _step2.value;

          gl.uniform1i(u_vars.get(u_v.n), u_v.v);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      var tex0 = worker.texture0;
      worker.texture0 = worker.texture1;
      worker.texture1 = tex0;
    }

    _finishRun(gl);
  },
  readData: function readData(worker, x, y, N, M) {
    var gl = worker.gl;
    x = x || 0;
    y = y || 0;
    N = N || worker.dim.x;
    M = M || worker.dim.y;
    gl.bindFramebuffer(gl.FRAMEBUFFER, worker.framebuffer);
    gl.readPixels(x, y, N, M, gl.RGBA_INTEGER, gl.INT, worker.ipt.data);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return worker.ipt.data.subarray(0, worker.ipt.length);
  },
  writeData: function writeData(worker, data) {
    var gl = worker.gl;
    gl.bindTexture(gl.TEXTURE_2D, worker.texture0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32I, worker.dim.x, worker.dim.y, 0, gl.RGBA_INTEGER, gl.INT, data);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
};

/***/ }),

/***/ "./src/WebGL/initGL.js":
/*!*****************************!*\
  !*** ./src/WebGL/initGL.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var canvas = document.createElement('canvas');
  //var canvas = document.getElementById('c');
  var gl = null;
  var attr = { alpha: false, antialias: false };

  // Try to grab the standard context. If it fails, fallback to experimental.
  gl = canvas.getContext("webgl2", attr) || canvas.getContext("experimental-webgl2", attr);

  // If we don't have a GL context, give up now
  if (!gl) {
    // gl instanceof WebGLRenderingContext)
    throw new Error("Unable to initialize WebGL. Your browser may not support it.");
  }

  return gl;
};

/***/ }),

/***/ "./src/WebGL/newBuffer.js":
/*!********************************!*\
  !*** ./src/WebGL/newBuffer.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (gl, data, f, e) {
  var buf = gl.createBuffer();

  gl.bindBuffer(e || gl.ARRAY_BUFFER, buf);
  gl.bufferData(e || gl.ARRAY_BUFFER, new (f || Float32Array)(data), gl.STATIC_DRAW);

  return buf;
};

/***/ }),

/***/ "./src/WebGL/shadercode.js":
/*!*********************************!*\
  !*** ./src/WebGL/shadercode.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  vertexShaderCode: "#version 300 es\nlayout(location = 0) in vec2 position;\nlayout(location = 1) in vec2 texture;\nout vec2 pos;\n\nvoid main(void) {\n  pos = texture;\n  gl_Position = vec4(position.xy, 0.0, 1.0);\n}",
  stdlib: "#version 300 es\nprecision highp float;\nprecision highp int;\nprecision highp isampler2D;\nuniform isampler2D u_texture;\nin vec2 pos;\nout ivec4 color;\n//out int isFinished;\n\nvec2 size;\nivec2 my_coord;\n\nvoid init(void) {\n  //size = vec2(textureSize(u_texture, 0) - 1);\n  size = vec2(textureSize(u_texture, 0));\n  my_coord = ivec2(pos * size);\n}\n\nivec4 read(void) {\n  return texture(u_texture, pos);\n}\n\nivec4 read_at(ivec2 coord) {\n  return texelFetch(u_texture, coord, 0);\n}\n\nvoid commit(ivec4 val) {\n  color = val;\n}\n" };

/***/ }),

/***/ "./src/WebGL/texture.js":
/*!******************************!*\
  !*** ./src/WebGL/texture.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Transfer data onto clamped texture and turn off any filtering
module.exports = function createTexture(gl, data, dim) {
  var texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32I, dim.x, dim.y, 0, gl.RGBA_INTEGER, gl.INT, data);
  //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, size, size, 0, gl.RGBA, gl.FLOAT, data);
  //gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA32F, size, size);
  gl.bindTexture(gl.TEXTURE_2D, null);

  return texture;
};

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HASH_LENGTH = 243;
var INT_LENGTH = 27;
var NONCE_LENGTH = HASH_LENGTH / 3;
var TIMESTAMP_START = NONCE_LENGTH;
var TIMESTAMP_LOWER_BOUND_START = TIMESTAMP_START + INT_LENGTH;
var TIMESTAMP_UPPER_BOUND_START = TIMESTAMP_LOWER_BOUND_START + INT_LENGTH;
var NONCE_START = HASH_LENGTH - NONCE_LENGTH;

module.exports = {
  HASH_LENGTH: HASH_LENGTH,
  STATE_LENGTH: HASH_LENGTH * 3,
  TIMESTAMP_START: TIMESTAMP_START,
  TIMESTAMP_LOWER_BOUND_START: TIMESTAMP_LOWER_BOUND_START,
  TIMESTAMP_UPPER_BOUND_START: TIMESTAMP_UPPER_BOUND_START,
  NONCE_START: NONCE_START,
  NONCE_LENGTH: NONCE_LENGTH,
  INT_LENGTH: INT_LENGTH,
  NUMBER_OF_ROUNDS: 81,
  TRANSACTION_LENGTH: HASH_LENGTH * 33
};

/***/ }),

/***/ "./src/curl.js":
/*!*********************!*\
  !*** ./src/curl.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Const = __webpack_require__(/*! ./constants */ "./src/constants.js");

/**
 **      Cryptographic related functions to IOTA's Curl (sponge function)
 **/

function Curl(state) {
  // truth table
  this.truthTable = new Int8Array([1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0]);
  this.HASH_LENGTH = Const.HASH_LENGTH;
  this.initialize(state);
  this.reset();
}

/**
 *   Initializes the state with 729 trits
 *
 *   @method initialize
 **/
Curl.prototype.initialize = function (state, length) {

  if (state) {
    this.state = state;
  } else {
    this.state = new Int8Array(Const.STATE_LENGTH);
  }
};

Curl.prototype.reset = function () {
  this.state.fill(0);
};

/**
 *   Sponge absorb function
 *
 *   @method absorb
 **/
Curl.prototype.absorb = function (trits, offset, length) {

  do {

    var i = 0;
    var limit = length < Const.HASH_LENGTH ? length : Const.HASH_LENGTH;

    while (i < limit) {

      this.state[i++] = trits[offset++];
    }

    this.transform();
  } while ((length -= Const.HASH_LENGTH) > 0);
};

/**
 *   Sponge squeeze function
 *
 *   @method squeeze
 **/
Curl.prototype.squeeze = function (trits, offset, length) {

  do {

    var i = 0;
    var limit = length < Const.HASH_LENGTH ? length : Const.HASH_LENGTH;

    while (i < limit) {

      trits[offset++] = this.state[i++];
    }

    this.transform();
  } while ((length -= Const.HASH_LENGTH) > 0);
};

/**
 *   Sponge transform function
 *
 *   @method transform
 **/
Curl.prototype.transform = function () {

  var stateCopy = [],
      index = 0;

  for (var round = 0; round < Const.NUMBER_OF_ROUNDS; round++) {

    stateCopy = this.state.slice();

    for (var i = 0; i < Const.STATE_LENGTH; i++) {

      this.state[i] = this.truthTable[stateCopy[index] + (stateCopy[index += index < 365 ? 364 : -365] << 2) + 5];
    }
  }
};

module.exports = Curl;

/***/ }),

/***/ "./src/curl.lib.js":
/*!*************************!*\
  !*** ./src/curl.lib.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PearlDiver = __webpack_require__(/*! ./pearldiver */ "./src/pearldiver.js");
var Curl = __webpack_require__(/*! ./curl */ "./src/curl.js");
var Const = __webpack_require__(/*! ./constants */ "./src/constants.js");
var Converter = __webpack_require__(/*! iota.crypto.js */ "./node_modules/iota.crypto.js/lib/iota.crypto.js").converter;
var NONCE_TIMESTAMP_LOWER_BOUND = 0;
var NONCE_TIMESTAMP_UPPER_BOUND = Converter.fromValue(0xffffffffffffffff);
var MAX_TIMESTAMP_VALUE = (Math.pow(3, 27) - 1) / 2;

var pdInstance = void 0;

var pow = function pow(options, success, error) {
  var state = void 0;

  if ('trytes' in options) {
    state = PearlDiver.prepare(options.trytes);
  } else if ('state' in options) {
    state = PearlDiver.offsetState(options.state);
  } else {
    error("Error: no trytes or state matrix provided");
  }
  var powPromise = PearlDiver.search(pdInstance, state, options.minWeight);
  if (typeof success === 'function') {
    powPromise.then(success).catch(error);
  }
  return powPromise;
};

var TAG_TRINARY_START = 2295;
var TAG_TRINARY_SIZE = 27;

var setTimestamp = function setTimestamp(state) {
  var timestamp = state.subarray(Const.TIMESTAMP_START, Const.TIMESTAMP_LOWER_BOUND_START);
  var upper = state.subarray(Const.TIMESTAMP_UPPER_BOUND_START, Const.NONCE_START);
  timestamp.fill(0);
  Converter.fromValue(Date.now()).map(function (v, i) {
    return timestamp[i] = v;
  });
  state.subarray(Const.TIMESTAMP_LOWER_BOUND_START, Const.TIMESTAMP_UPPER_BOUND_START).fill(0);
  upper.fill(0);
  NONCE_TIMESTAMP_UPPER_BOUND.map(function (v, i) {
    return upper[i] = v;
  });
};

var overrideAttachToTangle = function overrideAttachToTangle(iota) {
  iota.api.attachToTangle = function (trunkTransaction, branchTransaction, minWeight, trytes, callback) {
    var ccurlHashing = function ccurlHashing(trunkTransaction, branchTransaction, minWeight, trytes, callback) {
      var iotaObj = iota;

      // inputValidator: Check if correct hash
      if (!iotaObj.valid.isHash(trunkTransaction)) {
        return callback(new Error("Invalid trunkTransaction"));
      }

      // inputValidator: Check if correct hash
      if (!iotaObj.valid.isHash(branchTransaction)) {
        return callback(new Error("Invalid branchTransaction"));
      }

      // inputValidator: Check if int
      if (!iotaObj.valid.isValue(minWeight)) {
        return callback(new Error("Invalid minWeightMagnitude"));
      }

      var finalBundleTrytes = [];
      var previousTxHash;
      var i = 0;

      function loopTrytes() {
        getBundleTrytes(trytes[i], function (error) {
          if (error) {
            return callback(error);
          } else {
            i++;
            if (i < trytes.length) {
              loopTrytes();
            } else {
              // reverse the order so that it's ascending from currentIndex
              return callback(null, finalBundleTrytes.reverse());
            }
          }
        });
      }

      function getBundleTrytes(thisTrytes, callback) {
        // PROCESS LOGIC:
        // Start with last index transaction
        // Assign it the trunk / branch which the user has supplied
        // IF there is a bundle, chain  the bundle transactions via
        // trunkTransaction together

        var txObject = iotaObj.utils.transactionObject(thisTrytes);
        txObject.tag = txObject.tag || txObject.obsoleteTag;
        txObject.attachmentTimestamp = Date.now();
        txObject.attachmentTimestampLowerBound = 0;
        txObject.attachmentTimestampUpperBound = MAX_TIMESTAMP_VALUE;
        // If this is the first transaction, to be processed
        // Make sure that it's the last in the bundle and then
        // assign it the supplied trunk and branch transactions
        if (!previousTxHash) {
          // Check if last transaction in the bundle
          if (txObject.lastIndex !== txObject.currentIndex) {
            return callback(new Error("Wrong bundle order. The bundle should be ordered in descending order from currentIndex"));
          }

          txObject.trunkTransaction = trunkTransaction;
          txObject.branchTransaction = branchTransaction;
        } else {
          // Chain the bundle together via the trunkTransaction (previous tx in the bundle)
          // Assign the supplied trunkTransaciton as branchTransaction
          txObject.trunkTransaction = previousTxHash;
          txObject.branchTransaction = trunkTransaction;
        }

        var newTrytes = iotaObj.utils.transactionTrytes(txObject);

        curl.pow({ trytes: newTrytes, minWeight: minWeight }).then(function (nonce) {
          var returnedTrytes = newTrytes.substr(0, 2673 - 81).concat(nonce);
          var newTxObject = iotaObj.utils.transactionObject(returnedTrytes);

          // Assign the previousTxHash to this tx
          var txHash = newTxObject.hash;
          previousTxHash = txHash;

          finalBundleTrytes.push(returnedTrytes);
          callback(null);
        }).catch(callback);
      }
      loopTrytes();
    };
    ccurlHashing(trunkTransaction, branchTransaction, minWeight, trytes, function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
      if (callback) {
        return callback(error, success);
      } else {
        return success;
      }
    });
  };
};

window.curl = module.exports = {
  init: function init() {
    pdInstance = PearlDiver.instance();
    if (pdInstance == null) {
      return false;
    }
    return true;
  },
  pow: pow,
  prepare: PearlDiver.prepare,
  setOffset: function setOffset(o) {
    pdInstance.offset = o;
  },
  interrupt: function (_interrupt) {
    function interrupt() {
      return _interrupt.apply(this, arguments);
    }

    interrupt.toString = function () {
      return _interrupt.toString();
    };

    return interrupt;
  }(function () {
    return interrupt(pdInstance);
  }),
  resume: function resume() {
    return PearlDiver.doNext(pdInstance);
  },
  remove: function remove() {
    return pdInstance.queue.unshift();
  },
  //getHashRows: (c) => c(PearlDiver.getHashCount()),
  overrideAttachToTangle: overrideAttachToTangle
};

/***/ }),

/***/ "./src/pearldiver.js":
/*!***************************!*\
  !*** ./src/pearldiver.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Converter = __webpack_require__(/*! iota.crypto.js */ "./node_modules/iota.crypto.js/lib/iota.crypto.js").converter;
var Curl = __webpack_require__(/*! ./curl */ "./src/curl.js");
var WebGL = __webpack_require__(/*! ./WebGL */ "./src/WebGL/index.js");
var SearchInit = __webpack_require__(/*! ./searchInit */ "./src/searchInit.js");
var KRNL = __webpack_require__(/*! ./shaders */ "./src/shaders/index.js");
var Const = __webpack_require__(/*! ./constants */ "./src/constants.js");

var TEXELSIZE = 4;

var PDState = {
  READY: 0,
  SEARCHING: 1,
  INTERRUPTED: -1
};

var pack = function pack(l) {
  return function (r, k, i) {
    return (i % l === 0 ? r.push([k]) : r[r.length - 1].push(k)) && r;
  };
};

var pearlDiverCallback = function pearlDiverCallback(res, transactionTrits, minWeightMagnitude, m_self) {
  return function (nonce, searchObject) {
    res(Converter.trytes(nonce));
  };
};

var PearlDiverInstance = function PearlDiverInstance(offset) {
  if (WebGL) {
    var instance = new Object();
    instance.context = WebGL.worker(Const.STATE_LENGTH + 1, TEXELSIZE);
    instance.offset = instance.context.dim.y * (offset || 0);
    instance.buf = instance.context.ipt.data;
    WebGL.addProgram(instance.context, "init", KRNL.init, "gr_offset");
    WebGL.addProgram(instance.context, "increment", KRNL.increment);
    WebGL.addProgram(instance.context, "twist", KRNL.transform);
    WebGL.addProgram(instance.context, "check", KRNL.check, "minWeightMagnitude");
    WebGL.addProgram(instance.context, "col_check", KRNL.col_check);
    WebGL.addProgram(instance.context, "finalize", KRNL.finalize);
    instance.state = PDState.READY;
    instance.queue = [];
    return instance;
  }
};

var search = function search(instance, states, minWeight) {
  if (!instance.context) {
    Promise.reject(new Error("Webgl2 Is not Available"));
  } else if (minWeight >= Const.HASH_LENGTH || minWeight <= 0) {
    Promise.reject(new Error("Bad Min-Weight Magnitude"));
  }
  return new Promise(function (res, rej) {
    instance.queue.push({
      states: states,
      mwm: minWeight,
      call: pearlDiverCallback(res, states, minWeight, instance)
    });
    if (instance.state == PDState.READY) doNext(instance);
  });
};

var interrupt = function interrupt(instance) {
  if (instance.state == PDState.SEARCHING) instance.state = PDState.INTERRUPTED;
};

var doNext = function doNext(instance) {
  var next = instance.queue.shift();
  if (instance.state != PDState.SEARCHING) {
    if (next != null) {
      instance.state = PDState.SEARCHING;
      _WebGLFindNonce(instance, next);
    }
  } else {
    instance.state = PDState.READY;
  }
};

var _save = function _save(instance, searchObject) {
  instance.buf.reduce(pack(4), []).slice(0, Const.STATE_LENGTH).reduce(function (a, v) {
    return a.map(function (c, i) {
      return c.push(v[i]);
    }) && a;
  }, [[], []]).reduce(function (a, v, i) {
    return (i % 2 ? a.set("high", v) : a.set("low", v)) && a;
  }, new Map()).forEach(function (v, k) {
    return searchObject.states[k] = v;
  });
  instance.queue.unshift(searchObject);
};

var _WebGLWriteBuffers = function _WebGLWriteBuffers(instance, states) {
  for (var i = 0; i < Const.STATE_LENGTH; i++) {
    instance.buf[i * TEXELSIZE] = states.low[i];
    instance.buf[i * TEXELSIZE + 1] = states.high[i];
    instance.buf[i * TEXELSIZE + 2] = states.low[i];
    instance.buf[i * TEXELSIZE + 3] = states.high[i];
  }
};

var _WebGLSearch = function _WebGLSearch(instance, searchObject) {
  WebGL.run(instance.context, "increment");
  WebGL.run(instance.context, "twist", Const.NUMBER_OF_ROUNDS);
  WebGL.run(instance.context, "check", 1, { n: "minWeightMagnitude", v: searchObject.mwm });
  WebGL.run(instance.context, "col_check");

  if (WebGL.readData(instance.context, Const.STATE_LENGTH, 0, 1, 1)[2] === -1) {
    if (instance.state == PDState.INTERRUPTED) return instance._save(searchObject);
    //requestAnimationFrame(() => instance._WebGLSearch(searchObject));
    setTimeout(function () {
      return _WebGLSearch(instance, searchObject);
    }, 1);
  } else {
    WebGL.run(instance.context, "finalize");
    searchObject.call(WebGL.readData(instance.context, 0, 0, instance.context.dim.x, 1).reduce(pack(4), []).slice(0, Const.HASH_LENGTH).map(function (x) {
      return x[3];
    }), searchObject);
    doNext(instance);
  }
};

var _WebGLFindNonce = function _WebGLFindNonce(instance, searchObject) {
  _WebGLWriteBuffers(instance, searchObject.states);
  WebGL.writeData(instance.context, instance.buf);
  WebGL.run(instance.context, "init", 1, { n: "gr_offset", v: instance.offset });
  //requestAnimationFrame(() => instance._WebGLSearch(searchObject));
  setTimeout(function () {
    return _WebGLSearch(instance, searchObject);
  }, 1);
};
var searchWithCallback = function searchWithCallback(instance, transactionTrytes, minWeightMagnitude, callback, err) {
  if (transactionTrits.length < Const.TRANSACTION_LENGTH - Const.HASH_LENGTH) return null;
  var curl = new Curl();
  var transactionTrits = Converter.trits(transactionTrytes);
  curl.absorb(transactionTrits, 0, Const.TRANSACTION_LENGTH - Const.HASH_LENGTH);
  var states = SearchInit.toPair(curl.state, minWeightMagnitude);
  search(instance, states, minWeightMagnitude).then(callback).catch(err);
};
var offsetState = function offsetState(state) {
  return SearchInit.toPair(Converter.trits(state));
};
var prepare = function prepare(transactionTrytes, minWeightMagnitude) {
  var curl = new Curl();
  var transactionTrits = Converter.trits(transactionTrytes);
  curl.absorb(transactionTrits, 0, Const.TRANSACTION_LENGTH - Const.HASH_LENGTH);
  transactionTrits.slice(Const.TRANSACTION_LENGTH - Const.HASH_LENGTH, Const.TRANSACTION_LENGTH).forEach(function (v, i) {
    curl.state[i] = v;
  });
  var states = SearchInit.toPair(curl.state);
  return states;
};

module.exports = {
  instance: PearlDiverInstance,
  offsetState: offsetState,
  prepare: prepare,
  search: search,
  doNext: doNext
};

/***/ }),

/***/ "./src/searchInit.js":
/*!***************************!*\
  !*** ./src/searchInit.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Const = __webpack_require__(/*! ./constants */ "./src/constants.js");
var TRYTE_LENGTH = 2673,
    TRANSACTION_LENGTH = TRYTE_LENGTH * 3,
    LOW_BITS = 0,
    //00000000,
HIGH_BITS = -1,
    //0xFFFFFFFF,//FFFFFFFF,4294967295, 
LOW_0 = 0xDB6DB6DB,
    //6DB6DB6D,
LOW_1 = 0xF1F8FC7E,
    //3F1F8FC7,
LOW_2 = 0x7FFFE00F,
    //FFFC01FF,
LOW_3 = 0xFFC00000,
    //07FFFFFF,
HIGH_0 = 0xB6DB6DB6,
    //DB6DB6DB,
HIGH_1 = 0x8FC7E3F1,
    //F8FC7E3F,
HIGH_2 = 0xFFC01FFF,
    //F803FFFF,
HIGH_3 = 0x003FFFFF; //FFFFFFFF,
/*
  HIGH_BITS= 0xFFFFFFFFFFFFFFFF,
  LOW_BITS= 0x0000000000000000,
  LOW_0= 0xDB6DB6DB6DB6DB6D,
  HIGH_0= 0xB6DB6DB6DB6DB6DB,
  LOW_1= 0xF1F8FC7E3F1F8FC7,
  HIGH_1= 0x8FC7E3F1F8FC7E3F,
  LOW_2= 0x7FFFE00FFFFC01FF,
  HIGH_2= 0xFFC01FFFF803FFFF,
  LOW_3= 0xFFC0000007FFFFFF,
  HIGH_3= 0x003FFFFFFFFFFFFF;
  */

function offset(states, offset) {
  states.low[offset + 0] = LOW_0;
  states.low[offset + 1] = LOW_1;
  states.low[offset + 2] = LOW_2;
  states.low[offset + 3] = LOW_3;
  states.high[offset + 0] = HIGH_0;
  states.high[offset + 1] = HIGH_1;
  states.high[offset + 2] = HIGH_2;
  states.high[offset + 3] = HIGH_3;
}

function toPair(state) {
  var states = {
    low: new Int32Array(Const.STATE_LENGTH),
    high: new Int32Array(Const.STATE_LENGTH)
  };
  state.forEach(function (trit, i) {
    switch (trit) {
      case 0:
        {
          states.low[i] = HIGH_BITS;
          states.high[i] = HIGH_BITS;
        }break;
      case 1:
        {
          states.low[i] = LOW_BITS;
          states.high[i] = HIGH_BITS;
        }break;
      default:
        {
          states.low[i] = HIGH_BITS;
          states.high[i] = LOW_BITS;
        }
    }
  });
  offset(states, Const.NONCE_START);
  return states;
}

function transform(states) {
  var scratchpadHigh, scratchpadLow;
  var scratchpadIndex = 0,
      round,
      stateIndex;
  var alpha, beta, gamma, delta;

  for (round = Const.NUMBER_OF_ROUNDS; round-- > 0;) {
    scratchpadLow = states.low.slice();
    scratchpadHigh = states.high.slice();

    for (stateIndex = 0; stateIndex < Const.STATE_LENGTH; stateIndex++) {
      alpha = scratchpadLow[scratchpadIndex];
      beta = scratchpadHigh[scratchpadIndex];
      gamma = scratchpadHigh[scratchpadIndex += scratchpadIndex < 365 ? 364 : -365];
      delta = (alpha | ~gamma) & (scratchpadLow[scratchpadIndex] ^ beta);

      states.low[stateIndex] = ~delta;
      states.high[stateIndex] = alpha ^ gamma | delta;
    }
  }
}

module.exports = { toPair: toPair, transform: transform };
/*
export default function (states, transactionTrits) {
  var i, offset = 0;
  var j;
  //for (i = HASH_LENGTH; i < STATE_LENGTH; i++) {
  for (i = 0; i < Const.STATE_LENGTH; i++) {
    if (i >= Const.HASH_LENGTH && i < Const.STATE_LENGTH) {
      states.low[i] = HIGH_BITS;
      states.high[i] = HIGH_BITS;
    } else {
      states.low[i] = 0;
      states.high[i] = 0;
    }
  }

  for (i = (Const.TRANSACTION_LENGTH - Const.HASH_LENGTH) / Const.HASH_LENGTH; i-- > 0; ) {

    for (j = 0; j < Const.HASH_LENGTH; j++) {
      switch (transactionTrits[offset++]) {
        case 0: {
          states.low[j] = HIGH_BITS;
          states.high[j] = HIGH_BITS;
        } break;
        case 1: {
          states.low[j] = LOW_BITS;
          states.high[j] = HIGH_BITS;
        } break;
        default: {
          states.low[j] = HIGH_BITS;
          states.high[j] = LOW_BITS;
        }
      }
    }
    transform(states);
  }
  states.low[0] = LOW_0;   //0b1101101101101101101101101101101101101101101101101101101101101101L; 
  states.high[0] = HIGH_0; //0b1011011011011011011011011011011011011011011011011011011011011011L;
  states.low[1] = LOW_1;   //0b1111000111111000111111000111111000111111000111111000111111000111L; 
  states.high[1] = HIGH_1; //0b1000111111000111111000111111000111111000111111000111111000111111L;
  states.low[2] = LOW_2;   //0b0111111111111111111000000000111111111111111111000000000111111111L; 
  states.high[2] = HIGH_2; //0b1111111111000000000111111111111111111000000000111111111111111111L;
  states.low[3] = LOW_3;   //0b1111111111000000000000000000000000000111111111111111111111111111L; 
  states.high[3] = HIGH_3; //0b0000000000111111111111111111111111111111111111111111111111111111L;
}
*/

/***/ }),

/***/ "./src/shaders/add.js":
/*!****************************!*\
  !*** ./src/shaders/add.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\nint sum (int a, int b) {\n  int my_sum = a + b;\n  return my_sum == 2 ? -1 : (my_sum == -2) ? 1 : my_sum;\n}\nint cons (int a, int b) {\n  return (a == 1 && b == 1)? 1 : (a == -1 && b == -1) ? -1 : 0;\n}\nint any_t (int a, int b) {\n  int my_any = a + b;\n  return my_any == 0 ? 0 : (my_any > 0) ? 1 : -1;\n}\nivec2 full_adder(int a, int b, int c) {\n  int c_a, c_b, sum_ab, c_s;\n\n  c_a    = cons(a,b);\n  sum_ab = sum(a,b);\n  c_b    = cons(sum_ab,c);\n  c_s    = any_t(c_a, c_b);\n\n  return ivec2(sum(sum_ab, c), c_s);\n}\nivec2 get_sum_to_index(int from, int to, int number_to_add, int row) {\n  int trit_to_add, trit_at_index, pow, carry, num_carry;\n  ivec2 read_in, sum_out, out_trit;\n  pow = 1;\n  carry = 0;\n  num_carry = 0;\n\n  for(int i = from; i < to; i++) {\n    //if(trit_to_add == 0 && sum_out.t == 0) continue;\n\n    read_in = read_at ( ivec2 (i, row)).rg;\n\n    trit_to_add = ((number_to_add / pow) % 3) + num_carry;\n    num_carry = trit_to_add > 1 ? 1 : 0;\n    trit_to_add = (trit_to_add == 2 ? -1 : (trit_to_add == 3 ? 0 : trit_to_add));\n\n    sum_out = full_adder(\n      (read_in.s == LOW_BITS ? 1 : read_in.t == LOW_BITS? -1 : 0), \n      trit_to_add, \n      carry\n    );\n\n    if(my_coord.x == i) break;\n    carry = sum_out.t;\n    pow *=3;\n  }\n  if(sum_out.s == 0) {\n    return ivec2(HIGH_BITS);\n  } else if (sum_out.s == 1) {\n    return ivec2(LOW_BITS, HIGH_BITS);\n  } else {\n    return ivec2(HIGH_BITS, LOW_BITS);\n  }\n}\n";

/***/ }),

/***/ "./src/shaders/barrier.js":
/*!********************************!*\
  !*** ./src/shaders/barrier.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\n// Choose high != 0 if you want to barrier rg values, 0 if you want to barrier ba\n#define WAITNUM 2\nvoid barrier(ivec2 watch_coords, int high) {\n  ivec4 my_vec = read();\n  if(watch_coords == my_coord) {\n    int hold_index = 0;\n    ivec4 hold_texel;\n    my_vec.g = my_vec.a + 1;\n    my_vec.b = my_vec.g + 1;\n    commit(my_vec);\n    while(hold_index < STATE_LENGTH) {\n      hold_texel = read_at(ivec2(hold_index, my_coord.y));\n      if((high == 0 && hold_texel.r == WAITNUM) ||(high != 0 && hold_texel.a == WAITNUM))\n        hold_index++;\n    }\n    my_vec.a = my_vec.g;\n    //my_vec.a = 123;\n  } else {\n    ivec4 watch = read_at(watch_coords); // r: val to watch, g: expected val, b: next val (should be 1+ expected val)\n    int hold = high == 0 ? my_vec.r : my_vec.a;\n    if(high == 0)\n      my_vec.r = WAITNUM;\n    else\n      my_vec.a = WAITNUM;\n    commit(my_vec);\n    while(watch.g == watch.b || watch.a != watch.g) {\n      //while(watch.g == watch.b || watch.a != 123) {\n      watch = read_at(watch_coords);\n    }\n  }\n  commit(my_vec);\n}\n";

/***/ }),

/***/ "./src/shaders/check.js":
/*!******************************!*\
  !*** ./src/shaders/check.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { do_check: "\nint check(int row, int min_weight_magnitude) {\n  int nonce_probe, i;\n  ivec2 r_texel;\n  nonce_probe = HIGH_BITS;\n  for(i = min_weight_magnitude; i-- > 0; ) {\n    r_texel = read_at(ivec2(HASH_LENGTH - 1 - i, row)).ba;\n    nonce_probe &= ~(r_texel.s ^ r_texel.t);\n    if(nonce_probe == 0) break;\n  }\n  return nonce_probe;\n}\n", k_check: "\nuniform int minWeightMagnitude;\nvoid main() {\n  init();\n  ivec4 my_vec = read();\n  if(my_coord.x == STATE_LENGTH) {\n    my_vec.r = minWeightMagnitude;\n    my_vec.a = check(my_coord.y, minWeightMagnitude);\n  }\n  commit(my_vec);\n}\n", col: "\nvoid main() {\n  init();\n  ivec4 my_vec = read();\n  int i;\n  if(my_coord.x == STATE_LENGTH && my_coord.y == 0) {\n    my_vec.b = 0;\n    if(my_vec.a == 0) {\n      ivec4 read_vec;\n      my_vec.b = -1;\n      for(i = 1; i < int(size.y); i++) {\n        read_vec = read_at( ivec2( STATE_LENGTH, i));\n        if(read_vec.a != 0) {\n          my_vec.a = read_vec.a;\n          my_vec.b = i;\n          break;\n        }\n      }\n    }\n  }\n  commit(my_vec);\n}\n"
};

/***/ }),

/***/ "./src/shaders/finalize.js":
/*!*********************************!*\
  !*** ./src/shaders/finalize.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\nvoid main() {\n  init();\n  ivec4 my_vec = read();\n  if(my_coord.y == 0 && my_coord.x == STATE_LENGTH) {\n    my_vec.g = check(my_vec.b, my_vec.r);\n  }\n  if(my_coord.y == 0 && my_coord.x < HASH_LENGTH) {\n    ivec4 info_vec = read_at(ivec2(STATE_LENGTH, 0));\n    int nonce_probe = info_vec.a;\n    int row = info_vec.b;\n    ivec4 hash_vec = read_at(ivec2(my_coord.x, row));\n    my_vec.a = (hash_vec.r & nonce_probe) == 0? 1 : ((hash_vec.g & nonce_probe) == 0? -1 : 0);\n  }\n  commit(my_vec);\n}\n";

/***/ }),

/***/ "./src/shaders/headers.js":
/*!********************************!*\
  !*** ./src/shaders/headers.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "#define HASH_LENGTH 243\n#define NUMBER_OF_ROUNDS 81\n#define INCREMENT_START HASH_LENGTH - 64\n#define STATE_LENGTH 3 * HASH_LENGTH\n#define HALF_LENGTH 364\n#define HIGH_BITS 0xFFFFFFFF\n#define LOW_BITS 0x00000000\n";

/***/ }),

/***/ "./src/shaders/increment.js":
/*!**********************************!*\
  !*** ./src/shaders/increment.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "\nvoid main() {\n  init();\n  ivec4 my_vec = read();\n  if(my_coord.x >= INCREMENT_START && my_coord.x < HASH_LENGTH ) {\n    my_vec.rg = get_sum_to_index(INCREMENT_START, HASH_LENGTH, 1, my_coord.y);\n  }\n  if(my_coord.x == STATE_LENGTH ) {\n    my_vec.rg = ivec2(0);\n  }\n  my_vec.ba = my_vec.rg;\n  commit(my_vec);\n}\n";

/***/ }),

/***/ "./src/shaders/index.js":
/*!******************************!*\
  !*** ./src/shaders/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var headers = __webpack_require__(/*! ./headers */ "./src/shaders/headers.js");
var finalize = __webpack_require__(/*! ./finalize */ "./src/shaders/finalize.js");
var barrier = __webpack_require__(/*! ./barrier */ "./src/shaders/barrier.js");
var twist = __webpack_require__(/*! ./transform */ "./src/shaders/transform.js");
var check = __webpack_require__(/*! ./check */ "./src/shaders/check.js");
var add = __webpack_require__(/*! ./add */ "./src/shaders/add.js");
var init = __webpack_require__(/*! ./init */ "./src/shaders/init.js");
var increment = __webpack_require__(/*! ./increment */ "./src/shaders/increment.js");

module.exports = {
  init: headers + add + init,
  increment: headers + add + increment,
  transform: headers + twist,
  col_check: headers + check.col,
  check: headers + check.do_check + check.k_check,
  finalize: headers + check.do_check + finalize
};

/***/ }),

/***/ "./src/shaders/init.js":
/*!*****************************!*\
  !*** ./src/shaders/init.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var k_init = "\nvoid main() {\n  init();\n  commit(offset());\n}\n";
var offset = "\nuniform int gr_offset;\nivec4 offset() {\n  if(my_coord.x >= HASH_LENGTH / 3 && my_coord.x < HASH_LENGTH / 3 * 2 ) {\n    ivec4 my_vec;\n    my_vec.rg = get_sum_to_index(HASH_LENGTH / 3, HASH_LENGTH / 3 * 2, my_coord.y + gr_offset, 0);\n    return my_vec;\n  } else {\n    return read_at(ivec2(my_coord.x,0));\n  }\n}\n";
module.exports = offset + k_init;

/***/ }),

/***/ "./src/shaders/transform.js":
/*!**********************************!*\
  !*** ./src/shaders/transform.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var twist = "\nivec2 twist() {\n  int alpha, beta, gamma, delta;\n  ivec4 v1, v2;\n  int j = my_coord.x;\n\n  v1 = read_at(ivec2(j == 0? 0:(((j - 1)%2)+1)*HALF_LENGTH - ((j-1)>>1), my_coord.y));\n  v2 = read_at(ivec2(((j%2)+1)*HALF_LENGTH - ((j)>>1), my_coord.y));\n  alpha = v1.b;\n  beta = v1.a;\n  gamma = v2.a;\n  delta = (alpha | (~gamma)) & (v2.b ^ beta);//v2.b === state_low[t2]\n\n  return ivec2(~delta, (alpha ^ gamma) | delta);\n}\n";
var twistMain = "\nvoid main() {\n  init();\n  ivec4 my_vec = read();\n  if(my_coord.x < STATE_LENGTH)\n    my_vec.ba = twist();\n  commit(my_vec);\n}\n";

var k_transform = "\nvoid transform() {\n  ivec2 scratchpad;\n  ivec4 state = read();\n  int round;\n  for(round = 0; round < NUMBER_OF_ROUNDS; round++) {\n    scratchpad = twist();\n    //barrier(ivec2(STATE_LENGTH,my_coord.y), 0);\n    state.b = scratchpad.s;//sp_low[i];\n    state.a = scratchpad.t;//sp_high[i];\n    commit(state);\n    //barrier(ivec2(STATE_LENGTH,my_coord.y), 0);\n  }\n}\n";

module.exports = twist + twistMain;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2Flcy5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvY2lwaGVyLWNvcmUuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2NvcmUuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2VuYy1iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2VuYy11dGYxNi5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvZXZwa2RmLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9mb3JtYXQtaGV4LmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9obWFjLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvbGliLXR5cGVkYXJyYXlzLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9tZDUuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL21vZGUtY2ZiLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9tb2RlLWN0ci1nbGFkbWFuLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9tb2RlLWN0ci5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvbW9kZS1lY2IuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL21vZGUtb2ZiLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9wYWQtYW5zaXg5MjMuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3BhZC1pc28xMDEyNi5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvcGFkLWlzbzk3OTcxLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9wYWQtbm9wYWRkaW5nLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9wYWQtemVyb3BhZGRpbmcuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3Bia2RmMi5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvcmFiYml0LWxlZ2FjeS5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvcmFiYml0LmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9yYzQuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3JpcGVtZDE2MC5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhMS5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhMjI0LmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGEyNTYuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3NoYTMuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3NoYTM4NC5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhNTEyLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy90cmlwbGVkZXMuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3g2NC1jb3JlLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2lvdGEuY3J5cHRvLmpzL2xpYi9jcnlwdG8vYnVuZGxlL2J1bmRsZS5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9pb3RhLmNyeXB0by5qcy9saWIvY3J5cHRvL2NvbnZlcnRlci9jb252ZXJ0ZXIuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvaW90YS5jcnlwdG8uanMvbGliL2NyeXB0by9jb252ZXJ0ZXIvd29yZHMuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvaW90YS5jcnlwdG8uanMvbGliL2NyeXB0by9jdXJsL2N1cmwuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvaW90YS5jcnlwdG8uanMvbGliL2NyeXB0by9oZWxwZXJzL2FkZGVyLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2lvdGEuY3J5cHRvLmpzL2xpYi9jcnlwdG8vaG1hYy9obWFjLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2lvdGEuY3J5cHRvLmpzL2xpYi9jcnlwdG8va2VybC9rZXJsLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2lvdGEuY3J5cHRvLmpzL2xpYi9jcnlwdG8vc2lnbmluZy9vbGRTaWduaW5nLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2lvdGEuY3J5cHRvLmpzL2xpYi9jcnlwdG8vc2lnbmluZy9zaWduaW5nLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2lvdGEuY3J5cHRvLmpzL2xpYi9lcnJvcnMvaW5wdXRFcnJvcnMuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvaW90YS5jcnlwdG8uanMvbGliL2lvdGEuY3J5cHRvLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2lvdGEuY3J5cHRvLmpzL2xpYi9tdWx0aXNpZy9hZGRyZXNzLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2lvdGEuY3J5cHRvLmpzL2xpYi9tdWx0aXNpZy9tdWx0aXNpZy5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9pb3RhLmNyeXB0by5qcy9saWIvdXRpbHMvYXNjaWlUb1RyeXRlcy5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL25vZGVfbW9kdWxlcy9pb3RhLmNyeXB0by5qcy9saWIvdXRpbHMvZXh0cmFjdEpzb24uanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9ub2RlX21vZHVsZXMvaW90YS5jcnlwdG8uanMvbGliL3V0aWxzL2lucHV0VmFsaWRhdG9yLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vbm9kZV9tb2R1bGVzL2lvdGEuY3J5cHRvLmpzL2xpYi91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL3NyYy9XZWJHTC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL3NyYy9XZWJHTC9pbml0R0wuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9zcmMvV2ViR0wvbmV3QnVmZmVyLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vc3JjL1dlYkdML3NoYWRlcmNvZGUuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9zcmMvV2ViR0wvdGV4dHVyZS5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9zcmMvY3VybC5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL3NyYy9jdXJsLmxpYi5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL3NyYy9wZWFybGRpdmVyLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vc3JjL3NlYXJjaEluaXQuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9zcmMvc2hhZGVycy9hZGQuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9zcmMvc2hhZGVycy9iYXJyaWVyLmpzIiwid2VicGFjazovL2N1cmwubGliLmpzLy4vc3JjL3NoYWRlcnMvY2hlY2suanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9zcmMvc2hhZGVycy9maW5hbGl6ZS5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL3NyYy9zaGFkZXJzL2hlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9zcmMvc2hhZGVycy9pbmNyZW1lbnQuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9zcmMvc2hhZGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9jdXJsLmxpYi5qcy8uL3NyYy9zaGFkZXJzL2luaXQuanMiLCJ3ZWJwYWNrOi8vY3VybC5saWIuanMvLi9zcmMvc2hhZGVycy90cmFuc2Zvcm0uanMiXSwibmFtZXMiOlsiaW5pdEdMIiwicmVxdWlyZSIsIm5ld0J1ZmZlciIsImNyZWF0ZVRleHR1cmUiLCJTaGFkZXJDb2RlIiwiX2ZyYW1lQnVmZmVyU2V0VGV4dHVyZSIsImdsIiwiZmJvIiwiblRleHR1cmUiLCJkaW0iLCJiaW5kRnJhbWVidWZmZXIiLCJGUkFNRUJVRkZFUiIsImZyYW1lYnVmZmVyVGV4dHVyZTJEIiwiQ09MT1JfQVRUQUNITUVOVDAiLCJURVhUVVJFXzJEIiwiZnJhbWVCdWZmZXJTdGF0dXMiLCJjaGVja0ZyYW1lYnVmZmVyU3RhdHVzIiwiRlJBTUVCVUZGRVJfQ09NUExFVEUiLCJFcnJvciIsIm1lc3NhZ2UiLCJhbGxvYyIsInN6IiwibnMiLCJNYXRoIiwicG93IiwiY2VpbCIsImxvZyIsImRhdGEiLCJJbnQzMkFycmF5IiwibGVuZ3RoIiwiX2JpbmRCdWZmZXJzIiwiYnVmZmVycyIsImF0dHJpYiIsImJpbmRCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJ0ZXh0dXJlIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiRkxPQVQiLCJwb3NpdGlvbiIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiaW5kZXgiLCJfY3JlYXRlVmVydGV4U2hhZGVyIiwidmVydGV4U2hhZGVyIiwiY3JlYXRlU2hhZGVyIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsInZlcnRleFNoYWRlckNvZGUiLCJjb21waWxlU2hhZGVyIiwiZ2V0U2hhZGVyUGFyYW1ldGVyIiwiQ09NUElMRV9TVEFUVVMiLCJnZXRTaGFkZXJJbmZvTG9nIiwiX2NyZWF0ZUZyYWdtZW50U2hhZGVyIiwiY29kZSIsImZyYWdtZW50U2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwic3RkbGliIiwiTE9DIiwic3BsaXQiLCJkYmdNc2ciLCJubCIsIl9maW5pc2hSdW4iLCJiaW5kVmVydGV4QXJyYXkiLCJiaW5kVGV4dHVyZSIsIldlYkdMV29ya2VyIiwibCIsInMiLCJ3b3JrZXIiLCJPYmplY3QiLCJ4IiwieSIsIk1BWElNQUdFU0laRSIsIk1BWF9URVhUVVJFX1NJWkUiLCJJTUFHRV9TSVpFIiwiZmxvb3IiLCJwcm9ncmFtcyIsIk1hcCIsImlwdCIsIlVpbnQxNkFycmF5IiwidmFvIiwiY3JlYXRlVmVydGV4QXJyYXkiLCJmcmFtZWJ1ZmZlciIsImNyZWF0ZUZyYW1lYnVmZmVyIiwidGV4dHVyZTAiLCJ0ZXh0dXJlMSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhZGRQcm9ncmFtIiwibmFtZSIsInVuaWZvcm1zIiwicHJvZ3JhbSIsImNyZWF0ZVByb2dyYW0iLCJhdHRhY2hTaGFkZXIiLCJiaW5kQXR0cmliTG9jYXRpb24iLCJsaW5rUHJvZ3JhbSIsInVfdmFycyIsInZhcmlhYmxlIiwic2V0IiwiZ2V0VW5pZm9ybUxvY2F0aW9uIiwiZ2V0IiwiY29uc29sZSIsInJ1biIsImNvdW50IiwiaW5mbyIsImdldFByb2dyYW1QYXJhbWV0ZXIiLCJMSU5LX1NUQVRVUyIsInVUZXh0dXJlIiwidXNlUHJvZ3JhbSIsImFjdGl2ZVRleHR1cmUiLCJURVhUVVJFMCIsInVuaWZvcm0xaSIsInZpZXdwb3J0IiwidV92IiwibiIsInYiLCJkcmF3RWxlbWVudHMiLCJUUklBTkdMRVMiLCJVTlNJR05FRF9TSE9SVCIsInRleDAiLCJyZWFkRGF0YSIsIk4iLCJNIiwicmVhZFBpeGVscyIsIlJHQkFfSU5URUdFUiIsIklOVCIsInN1YmFycmF5Iiwid3JpdGVEYXRhIiwidGV4SW1hZ2UyRCIsIlJHQkEzMkkiLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhdHRyIiwiYWxwaGEiLCJhbnRpYWxpYXMiLCJnZXRDb250ZXh0IiwiZiIsImUiLCJidWYiLCJjcmVhdGVCdWZmZXIiLCJidWZmZXJEYXRhIiwiRmxvYXQzMkFycmF5IiwiU1RBVElDX0RSQVciLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9XUkFQX1MiLCJDTEFNUF9UT19FREdFIiwiVEVYVFVSRV9XUkFQX1QiLCJURVhUVVJFX01JTl9GSUxURVIiLCJORUFSRVNUIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiSEFTSF9MRU5HVEgiLCJJTlRfTEVOR1RIIiwiTk9OQ0VfTEVOR1RIIiwiVElNRVNUQU1QX1NUQVJUIiwiVElNRVNUQU1QX0xPV0VSX0JPVU5EX1NUQVJUIiwiVElNRVNUQU1QX1VQUEVSX0JPVU5EX1NUQVJUIiwiTk9OQ0VfU1RBUlQiLCJTVEFURV9MRU5HVEgiLCJOVU1CRVJfT0ZfUk9VTkRTIiwiVFJBTlNBQ1RJT05fTEVOR1RIIiwiQ29uc3QiLCJDdXJsIiwic3RhdGUiLCJ0cnV0aFRhYmxlIiwiSW50OEFycmF5IiwiaW5pdGlhbGl6ZSIsInJlc2V0IiwicHJvdG90eXBlIiwiZmlsbCIsImFic29yYiIsInRyaXRzIiwib2Zmc2V0IiwiaSIsImxpbWl0IiwidHJhbnNmb3JtIiwic3F1ZWV6ZSIsInN0YXRlQ29weSIsInJvdW5kIiwic2xpY2UiLCJQZWFybERpdmVyIiwiQ29udmVydGVyIiwiY29udmVydGVyIiwiTk9OQ0VfVElNRVNUQU1QX0xPV0VSX0JPVU5EIiwiTk9OQ0VfVElNRVNUQU1QX1VQUEVSX0JPVU5EIiwiZnJvbVZhbHVlIiwiTUFYX1RJTUVTVEFNUF9WQUxVRSIsInBkSW5zdGFuY2UiLCJvcHRpb25zIiwic3VjY2VzcyIsImVycm9yIiwicHJlcGFyZSIsInRyeXRlcyIsIm9mZnNldFN0YXRlIiwicG93UHJvbWlzZSIsInNlYXJjaCIsIm1pbldlaWdodCIsInRoZW4iLCJjYXRjaCIsIlRBR19UUklOQVJZX1NUQVJUIiwiVEFHX1RSSU5BUllfU0laRSIsInNldFRpbWVzdGFtcCIsInRpbWVzdGFtcCIsInVwcGVyIiwiRGF0ZSIsIm5vdyIsIm1hcCIsIm92ZXJyaWRlQXR0YWNoVG9UYW5nbGUiLCJpb3RhIiwiYXBpIiwiYXR0YWNoVG9UYW5nbGUiLCJ0cnVua1RyYW5zYWN0aW9uIiwiYnJhbmNoVHJhbnNhY3Rpb24iLCJjYWxsYmFjayIsImNjdXJsSGFzaGluZyIsImlvdGFPYmoiLCJ2YWxpZCIsImlzSGFzaCIsImlzVmFsdWUiLCJmaW5hbEJ1bmRsZVRyeXRlcyIsInByZXZpb3VzVHhIYXNoIiwibG9vcFRyeXRlcyIsImdldEJ1bmRsZVRyeXRlcyIsInJldmVyc2UiLCJ0aGlzVHJ5dGVzIiwidHhPYmplY3QiLCJ1dGlscyIsInRyYW5zYWN0aW9uT2JqZWN0IiwidGFnIiwib2Jzb2xldGVUYWciLCJhdHRhY2htZW50VGltZXN0YW1wIiwiYXR0YWNobWVudFRpbWVzdGFtcExvd2VyQm91bmQiLCJhdHRhY2htZW50VGltZXN0YW1wVXBwZXJCb3VuZCIsImxhc3RJbmRleCIsImN1cnJlbnRJbmRleCIsIm5ld1RyeXRlcyIsInRyYW5zYWN0aW9uVHJ5dGVzIiwiY3VybCIsIm5vbmNlIiwicmV0dXJuZWRUcnl0ZXMiLCJzdWJzdHIiLCJjb25jYXQiLCJuZXdUeE9iamVjdCIsInR4SGFzaCIsImhhc2giLCJwdXNoIiwid2luZG93IiwiaW5pdCIsImluc3RhbmNlIiwic2V0T2Zmc2V0IiwibyIsImludGVycnVwdCIsInJlc3VtZSIsImRvTmV4dCIsInJlbW92ZSIsInF1ZXVlIiwidW5zaGlmdCIsIldlYkdMIiwiU2VhcmNoSW5pdCIsIktSTkwiLCJURVhFTFNJWkUiLCJQRFN0YXRlIiwiUkVBRFkiLCJTRUFSQ0hJTkciLCJJTlRFUlJVUFRFRCIsInBhY2siLCJyIiwiayIsInBlYXJsRGl2ZXJDYWxsYmFjayIsInJlcyIsInRyYW5zYWN0aW9uVHJpdHMiLCJtaW5XZWlnaHRNYWduaXR1ZGUiLCJtX3NlbGYiLCJzZWFyY2hPYmplY3QiLCJQZWFybERpdmVySW5zdGFuY2UiLCJjb250ZXh0IiwiaW5jcmVtZW50IiwiY2hlY2siLCJjb2xfY2hlY2siLCJmaW5hbGl6ZSIsInN0YXRlcyIsIlByb21pc2UiLCJyZWplY3QiLCJyZWoiLCJtd20iLCJjYWxsIiwibmV4dCIsInNoaWZ0IiwiX1dlYkdMRmluZE5vbmNlIiwiX3NhdmUiLCJyZWR1Y2UiLCJhIiwiYyIsImZvckVhY2giLCJfV2ViR0xXcml0ZUJ1ZmZlcnMiLCJsb3ciLCJoaWdoIiwiX1dlYkdMU2VhcmNoIiwic2V0VGltZW91dCIsInNlYXJjaFdpdGhDYWxsYmFjayIsImVyciIsInRvUGFpciIsIlRSWVRFX0xFTkdUSCIsIkxPV19CSVRTIiwiSElHSF9CSVRTIiwiTE9XXzAiLCJMT1dfMSIsIkxPV18yIiwiTE9XXzMiLCJISUdIXzAiLCJISUdIXzEiLCJISUdIXzIiLCJISUdIXzMiLCJ0cml0Iiwic2NyYXRjaHBhZEhpZ2giLCJzY3JhdGNocGFkTG93Iiwic2NyYXRjaHBhZEluZGV4Iiwic3RhdGVJbmRleCIsImJldGEiLCJnYW1tYSIsImRlbHRhIiwiZG9fY2hlY2siLCJrX2NoZWNrIiwiY29sIiwiaGVhZGVycyIsImJhcnJpZXIiLCJ0d2lzdCIsImFkZCIsImtfaW5pdCIsInR3aXN0TWFpbiIsImtfdHJhbnNmb3JtIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25FQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQU9BO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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Ozs7Ozs7OztBQzlJRCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQU9BO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSxDQUFDLEc7Ozs7Ozs7Ozs7O0FDakJELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBT0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QiwwQkFBMEI7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7O0FBR0Y7O0FBRUEsQ0FBQyxHOzs7Ozs7Ozs7OztBQzNFRCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQU9BO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsT0FBTztBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQSxpQkFBaUIsVUFBVTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7O0FBR0Y7O0FBRUEsQ0FBQyxHOzs7Ozs7Ozs7OztBQzNRRCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQU9BO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7O0FBR0Y7O0FBRUEsQ0FBQyxHOzs7Ozs7Ozs7OztBQzdFRCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQU9BO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLGVBQWU7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjs7QUFFQTtBQUNBLEVBQUU7Ozs7O0FBS0Y7O0FBRUEsQ0FBQyxHOzs7Ozs7Ozs7OztBQ25IRCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQU9BO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsZUFBZTtBQUMzQztBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOOztBQUVBO0FBQ0EsRUFBRTs7O0FBR0Y7O0FBRUEsQ0FBQyxHOzs7Ozs7Ozs7OztBQ3pERCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQU9BO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQSxFQUFFOzs7QUFHRjs7QUFFQSxDQUFDLEc7Ozs7Ozs7Ozs7O0FDdkNELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBT0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLGVBQWU7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjs7QUFFQTtBQUNBLEVBQUU7OztBQUdGOztBQUVBLENBQUMsRzs7Ozs7Ozs7Ozs7QUNyREQsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFPQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsQ0FBQyxHOzs7Ozs7Ozs7OztBQ2hERCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQU9BO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxDQUFDLEc7Ozs7Ozs7Ozs7O0FDM0NELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBT0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsQ0FBQyxHOzs7Ozs7Ozs7OztBQ3ZDRCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQU9BO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLENBQUMsRzs7Ozs7Ozs7Ozs7QUM3QkQsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFPQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsQ0FBQyxHOzs7Ozs7Ozs7OztBQzVDRCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQU9BO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5Qix1QkFBdUIsT0FBTztBQUM5Qix1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFFBQVE7QUFDcEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLE9BQU87QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07OztBQUdOO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQSxpQkFBaUIsVUFBVTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7O0FBRVY7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQSxpQkFBaUIsVUFBVTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQyxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0EsaUJBQWlCLFVBQVU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGOztBQUVBLENBQUMsRzs7Ozs7Ozs7Ozs7QUNsVUQsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFPQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLFFBQVE7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0MsY0FBYztBQUNoRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MsUUFBUTtBQUN4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxPQUFPO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MsWUFBWTtBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLE9BQU87QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjs7QUFFQTs7QUFFQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7O0FBRVY7O0FBRUE7O0FBRUE7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGOztBQUVBLENBQUMsRzs7Ozs7Ozs7Ozs7QUNqd0JELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBT0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekIsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixNQUFNO0FBQzFCLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7O0FBRVY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGFBQWE7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sRUFBRTs7O0FBR0Y7O0FBRUEsQ0FBQyxHOzs7Ozs7Ozs7OztBQy9TRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsNEJBQTRCOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLHNDQUFzQztBQUN6RDtBQUNBOztBQUVBLG1CQUFtQix3QkFBd0I7O0FBRTNDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIsd0JBQXdCOztBQUUzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQix3QkFBd0I7O0FBRTNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixPQUFPOztBQUUxQjtBQUNBLHVCQUF1QixRQUFROztBQUUvQjtBQUNBOztBQUVBOztBQUVBOztBQUVBLCtCQUErQixRQUFROztBQUV2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQSwrQkFBK0IsUUFBUTs7QUFFdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDaExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsV0FBVztBQUN4QixhQUFhLE1BQU07QUFDbkIsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLGtCQUFrQjs7QUFFN0M7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCx1QkFBdUIsa0JBQWtCOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixlQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0Isa0JBQWtCOztBQUV0QztBQUNBLHdCQUF3QiwyQkFBMkI7O0FBRW5EOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixlQUFlLElBQUk7QUFDbkI7QUFDQTs7QUFFQTs7QUFFQSwrQkFBK0IsU0FBUzs7QUFFeEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCLGVBQWUsTUFBTTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx3QkFBd0Isd0JBQXdCOztBQUVoRDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLFlBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQSxvQ0FBb0MsUUFBUTtBQUM1QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQixRQUFRO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcFNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUEsdUJBQXVCLGtCQUFrQjs7QUFFekM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHVCQUF1QixxQkFBcUI7O0FBRTVDOztBQUVBLHVCQUF1QixrQkFBa0I7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNsSEE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGdCQUFnQjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDBCQUEwQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUdBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOztBQUVMOzs7O0FBSUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsd0JBQXdCO0FBQzNDO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSztBQUNMOztBQUVBOzs7Ozs7Ozs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx1QkFBdUIsUUFBUTs7QUFFL0I7QUFDQSwyQkFBMkIsU0FBUzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLG1DQUFtQzs7QUFFdEQ7O0FBRUEsdUJBQXVCLFFBQVE7O0FBRS9COztBQUVBLDJCQUEyQixRQUFROztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixTQUFTOztBQUVwQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixTQUFTOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxtQkFBbUIsT0FBTztBQUMxQjs7QUFFQSxzREFBc0QsU0FBUzs7QUFFL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtQkFBbUIsUUFBUTs7QUFFM0I7O0FBRUEsdUJBQXVCLHNDQUFzQzs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLFNBQVM7O0FBRWhDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQiwrQkFBK0I7O0FBRWxEOztBQUVBLHVCQUF1QixTQUFTOztBQUVoQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsdUJBQXVCLFFBQVE7O0FBRS9CO0FBQ0EsMkJBQTJCLFNBQVM7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixtQ0FBbUM7O0FBRXREOztBQUVBLHVCQUF1QixRQUFROztBQUUvQjs7QUFFQSwyQkFBMkIsUUFBUTs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsU0FBUzs7QUFFcEM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsU0FBUzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsbUJBQW1CLE9BQU87QUFDMUI7O0FBRUEsc0RBQXNELFNBQVM7O0FBRS9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsbUJBQW1CLFFBQVE7O0FBRTNCOztBQUVBLHVCQUF1QixzQ0FBc0M7O0FBRTdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLFNBQVM7O0FBRWhDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQiwrQkFBK0I7O0FBRWxEOztBQUVBLHVCQUF1QixTQUFTOztBQUVoQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ROQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksYUFBYTtBQUN6QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxhQUFhO0FBQ3pCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixvQkFBb0I7O0FBRXJDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7Ozs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLElBQUk7QUFDaEIsWUFBWSxJQUFJO0FBQ2hCLGNBQWMsT0FBTztBQUNyQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWSxJQUFJO0FBQ2hCLFlBQVksSUFBSTtBQUNoQixjQUFjLE9BQU87QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWSxNQUFNO0FBQ2xCLGNBQWM7QUFDZDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQixZQUFZLFNBQVM7QUFDckIsY0FBYyxNQUFNO0FBQ3BCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjs7QUFFekM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLCtCQUErQix3QkFBd0I7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsd0JBQXdCO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUEsS0FBSzs7QUFFTDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixZQUFZLElBQUk7QUFDaEIsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQixZQUFZLFNBQVM7QUFDckIsY0FBYyxNQUFNO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDBCQUEwQjs7QUFFN0M7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQixPQUFPO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsK0JBQStCLGNBQWM7O0FBRTdDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLHdCQUF3QjtBQUMzQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsdUJBQXVCLHlCQUF5Qjs7QUFFaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDJCQUEyQiwwQkFBMEI7O0FBRXJEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLFFBQVE7QUFDcEIsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osY0FBYztBQUNkO0FBQ0E7O0FBRUEsdUJBQXVCLEtBQUssTUFBTSxLQUFLO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixjQUFjO0FBQ2Q7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsMkJBQTJCOztBQUU5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEMsS0FBSztBQUNuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxLQUFLO0FBQ2pCLGNBQWM7QUFDZDtBQUNBOztBQUVBOztBQUVBLG1CQUFtQix3QkFBd0I7O0FBRTNDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLEtBQUs7QUFDakIsY0FBYztBQUNkO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLHdCQUF3Qjs7QUFFM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCLGNBQWM7QUFDZDtBQUNBOztBQUVBOztBQUVBLG1CQUFtQix3QkFBd0I7O0FBRTNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE1BQU07QUFDbEIsY0FBYztBQUNkO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDJCQUEyQjs7QUFFbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCLGNBQWM7QUFDZDtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixtQkFBbUI7O0FBRXRDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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QUFhLG1CQUFBclUsQ0FBUyxtQ0FBVCxDQUFuQjtBQUNBLElBQU1xUCxPQUFhLG1CQUFBclAsQ0FBUyxxQ0FBVCxDQUFuQjtBQUNBLElBQU1rUixZQUFhLG1CQUFBbFIsQ0FBUywrQ0FBVCxDQUFuQjs7QUFFQW9GLE9BQU9DLE9BQVAsR0FBaUI7QUFDZmdLLFFBQVk2RSxVQUFVRyxHQUFWLEdBQWdCaEYsSUFEYjtBQUVmNkIsYUFBWWdELFVBQVVHLEdBQVYsR0FBZ0JuRCxTQUZiO0FBR2ZyRyxhQUFZcUosVUFBVUUsS0FIUDtBQUlmaEQsYUFBWThDLFVBQVUvQyxNQUFNOEMsR0FKYjtBQUtmOUMsU0FBWStDLFVBQVUvQyxNQUFNNEMsUUFBaEIsR0FBMkI1QyxNQUFNNkMsT0FMOUI7QUFNZjNDLFlBQVk2QyxVQUFVL0MsTUFBTTRDLFFBQWhCLEdBQTJCMUM7QUFOeEIsQ0FBakIsQzs7Ozs7Ozs7Ozs7Ozs7QUNUQSxJQUFJaUQsK0RBQUo7QUFNQSxJQUFJNUosNFVBQUo7QUFZQXRGLE9BQU9DLE9BQVAsR0FBaUJxRixTQUFTNEosTUFBMUIsQzs7Ozs7Ozs7Ozs7Ozs7QUNsQkEsSUFBSUYsdWJBQUo7QUFnQkEsSUFBS0cscUpBQUw7O0FBVUEsSUFBSUMseVlBQUo7O0FBZ0JBcFAsT0FBT0MsT0FBUCxHQUFpQitPLFFBQVFHLFNBQXpCLEMiLCJmaWxlIjoiY3VybC5saWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjdXJsLmxpYi5qc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjdXJsLmxpYi5qc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3RcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY3VybC5saWIuanNcIik7XG4iLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vZW5jLWJhc2U2NFwiKSwgcmVxdWlyZShcIi4vbWQ1XCIpLCByZXF1aXJlKFwiLi9ldnBrZGZcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2VuYy1iYXNlNjRcIiwgXCIuL21kNVwiLCBcIi4vZXZwa2RmXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEJsb2NrQ2lwaGVyID0gQ19saWIuQmxvY2tDaXBoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBMb29rdXAgdGFibGVzXG5cdCAgICB2YXIgU0JPWCA9IFtdO1xuXHQgICAgdmFyIElOVl9TQk9YID0gW107XG5cdCAgICB2YXIgU1VCX01JWF8wID0gW107XG5cdCAgICB2YXIgU1VCX01JWF8xID0gW107XG5cdCAgICB2YXIgU1VCX01JWF8yID0gW107XG5cdCAgICB2YXIgU1VCX01JWF8zID0gW107XG5cdCAgICB2YXIgSU5WX1NVQl9NSVhfMCA9IFtdO1xuXHQgICAgdmFyIElOVl9TVUJfTUlYXzEgPSBbXTtcblx0ICAgIHZhciBJTlZfU1VCX01JWF8yID0gW107XG5cdCAgICB2YXIgSU5WX1NVQl9NSVhfMyA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIGxvb2t1cCB0YWJsZXNcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgLy8gQ29tcHV0ZSBkb3VibGUgdGFibGVcblx0ICAgICAgICB2YXIgZCA9IFtdO1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcblx0ICAgICAgICAgICAgaWYgKGkgPCAxMjgpIHtcblx0ICAgICAgICAgICAgICAgIGRbaV0gPSBpIDw8IDE7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBkW2ldID0gKGkgPDwgMSkgXiAweDExYjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIFdhbGsgR0YoMl44KVxuXHQgICAgICAgIHZhciB4ID0gMDtcblx0ICAgICAgICB2YXIgeGkgPSAwO1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBzYm94XG5cdCAgICAgICAgICAgIHZhciBzeCA9IHhpIF4gKHhpIDw8IDEpIF4gKHhpIDw8IDIpIF4gKHhpIDw8IDMpIF4gKHhpIDw8IDQpO1xuXHQgICAgICAgICAgICBzeCA9IChzeCA+Pj4gOCkgXiAoc3ggJiAweGZmKSBeIDB4NjM7XG5cdCAgICAgICAgICAgIFNCT1hbeF0gPSBzeDtcblx0ICAgICAgICAgICAgSU5WX1NCT1hbc3hdID0geDtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIG11bHRpcGxpY2F0aW9uXG5cdCAgICAgICAgICAgIHZhciB4MiA9IGRbeF07XG5cdCAgICAgICAgICAgIHZhciB4NCA9IGRbeDJdO1xuXHQgICAgICAgICAgICB2YXIgeDggPSBkW3g0XTtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIHN1YiBieXRlcywgbWl4IGNvbHVtbnMgdGFibGVzXG5cdCAgICAgICAgICAgIHZhciB0ID0gKGRbc3hdICogMHgxMDEpIF4gKHN4ICogMHgxMDEwMTAwKTtcblx0ICAgICAgICAgICAgU1VCX01JWF8wW3hdID0gKHQgPDwgMjQpIHwgKHQgPj4+IDgpO1xuXHQgICAgICAgICAgICBTVUJfTUlYXzFbeF0gPSAodCA8PCAxNikgfCAodCA+Pj4gMTYpO1xuXHQgICAgICAgICAgICBTVUJfTUlYXzJbeF0gPSAodCA8PCA4KSAgfCAodCA+Pj4gMjQpO1xuXHQgICAgICAgICAgICBTVUJfTUlYXzNbeF0gPSB0O1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgaW52IHN1YiBieXRlcywgaW52IG1peCBjb2x1bW5zIHRhYmxlc1xuXHQgICAgICAgICAgICB2YXIgdCA9ICh4OCAqIDB4MTAxMDEwMSkgXiAoeDQgKiAweDEwMDAxKSBeICh4MiAqIDB4MTAxKSBeICh4ICogMHgxMDEwMTAwKTtcblx0ICAgICAgICAgICAgSU5WX1NVQl9NSVhfMFtzeF0gPSAodCA8PCAyNCkgfCAodCA+Pj4gOCk7XG5cdCAgICAgICAgICAgIElOVl9TVUJfTUlYXzFbc3hdID0gKHQgPDwgMTYpIHwgKHQgPj4+IDE2KTtcblx0ICAgICAgICAgICAgSU5WX1NVQl9NSVhfMltzeF0gPSAodCA8PCA4KSAgfCAodCA+Pj4gMjQpO1xuXHQgICAgICAgICAgICBJTlZfU1VCX01JWF8zW3N4XSA9IHQ7XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBuZXh0IGNvdW50ZXJcblx0ICAgICAgICAgICAgaWYgKCF4KSB7XG5cdCAgICAgICAgICAgICAgICB4ID0geGkgPSAxO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgeCA9IHgyIF4gZFtkW2RbeDggXiB4Ml1dXTtcblx0ICAgICAgICAgICAgICAgIHhpIF49IGRbZFt4aV1dO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLy8gUHJlY29tcHV0ZWQgUmNvbiBsb29rdXBcblx0ICAgIHZhciBSQ09OID0gWzB4MDAsIDB4MDEsIDB4MDIsIDB4MDQsIDB4MDgsIDB4MTAsIDB4MjAsIDB4NDAsIDB4ODAsIDB4MWIsIDB4MzZdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFFUyBibG9jayBjaXBoZXIgYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgQUVTID0gQ19hbGdvLkFFUyA9IEJsb2NrQ2lwaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2tpcCByZXNldCBvZiBuUm91bmRzIGhhcyBiZWVuIHNldCBiZWZvcmUgYW5kIGtleSBkaWQgbm90IGNoYW5nZVxuXHQgICAgICAgICAgICBpZiAodGhpcy5fblJvdW5kcyAmJiB0aGlzLl9rZXlQcmlvclJlc2V0ID09PSB0aGlzLl9rZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybjtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5fa2V5UHJpb3JSZXNldCA9IHRoaXMuX2tleTtcblx0ICAgICAgICAgICAgdmFyIGtleVdvcmRzID0ga2V5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIga2V5U2l6ZSA9IGtleS5zaWdCeXRlcyAvIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBudW1iZXIgb2Ygcm91bmRzXG5cdCAgICAgICAgICAgIHZhciBuUm91bmRzID0gdGhpcy5fblJvdW5kcyA9IGtleVNpemUgKyA2O1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgbnVtYmVyIG9mIGtleSBzY2hlZHVsZSByb3dzXG5cdCAgICAgICAgICAgIHZhciBrc1Jvd3MgPSAoblJvdW5kcyArIDEpICogNDtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIGtleSBzY2hlZHVsZVxuXHQgICAgICAgICAgICB2YXIga2V5U2NoZWR1bGUgPSB0aGlzLl9rZXlTY2hlZHVsZSA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBrc1JvdyA9IDA7IGtzUm93IDwga3NSb3dzOyBrc1JvdysrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoa3NSb3cgPCBrZXlTaXplKSB7XG5cdCAgICAgICAgICAgICAgICAgICAga2V5U2NoZWR1bGVba3NSb3ddID0ga2V5V29yZHNba3NSb3ddO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGtleVNjaGVkdWxlW2tzUm93IC0gMV07XG5cblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIShrc1JvdyAlIGtleVNpemUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJvdCB3b3JkXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHQgPSAodCA8PCA4KSB8ICh0ID4+PiAyNCk7XG5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3ViIHdvcmRcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdCA9IChTQk9YW3QgPj4+IDI0XSA8PCAyNCkgfCAoU0JPWFsodCA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHQgPj4+IDgpICYgMHhmZl0gPDwgOCkgfCBTQk9YW3QgJiAweGZmXTtcblxuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBNaXggUmNvblxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0IF49IFJDT05bKGtzUm93IC8ga2V5U2l6ZSkgfCAwXSA8PCAyNDtcblx0ICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGtleVNpemUgPiA2ICYmIGtzUm93ICUga2V5U2l6ZSA9PSA0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1YiB3b3JkXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHQgPSAoU0JPWFt0ID4+PiAyNF0gPDwgMjQpIHwgKFNCT1hbKHQgPj4+IDE2KSAmIDB4ZmZdIDw8IDE2KSB8IChTQk9YWyh0ID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFt0ICYgMHhmZl07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAgICAga2V5U2NoZWR1bGVba3NSb3ddID0ga2V5U2NoZWR1bGVba3NSb3cgLSBrZXlTaXplXSBeIHQ7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIGludiBrZXkgc2NoZWR1bGVcblx0ICAgICAgICAgICAgdmFyIGludktleVNjaGVkdWxlID0gdGhpcy5faW52S2V5U2NoZWR1bGUgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaW52S3NSb3cgPSAwOyBpbnZLc1JvdyA8IGtzUm93czsgaW52S3NSb3crKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGtzUm93ID0ga3NSb3dzIC0gaW52S3NSb3c7XG5cblx0ICAgICAgICAgICAgICAgIGlmIChpbnZLc1JvdyAlIDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGtleVNjaGVkdWxlW2tzUm93XTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBrZXlTY2hlZHVsZVtrc1JvdyAtIDRdO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBpZiAoaW52S3NSb3cgPCA0IHx8IGtzUm93IDw9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpbnZLZXlTY2hlZHVsZVtpbnZLc1Jvd10gPSB0O1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBpbnZLZXlTY2hlZHVsZVtpbnZLc1Jvd10gPSBJTlZfU1VCX01JWF8wW1NCT1hbdCA+Pj4gMjRdXSBeIElOVl9TVUJfTUlYXzFbU0JPWFsodCA+Pj4gMTYpICYgMHhmZl1dIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJTlZfU1VCX01JWF8yW1NCT1hbKHQgPj4+IDgpICYgMHhmZl1dIF4gSU5WX1NVQl9NSVhfM1tTQk9YW3QgJiAweGZmXV07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgZW5jcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2RvQ3J5cHRCbG9jayhNLCBvZmZzZXQsIHRoaXMuX2tleVNjaGVkdWxlLCBTVUJfTUlYXzAsIFNVQl9NSVhfMSwgU1VCX01JWF8yLCBTVUJfTUlYXzMsIFNCT1gpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBkZWNyeXB0QmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU3dhcCAybmQgYW5kIDR0aCByb3dzXG5cdCAgICAgICAgICAgIHZhciB0ID0gTVtvZmZzZXQgKyAxXTtcblx0ICAgICAgICAgICAgTVtvZmZzZXQgKyAxXSA9IE1bb2Zmc2V0ICsgM107XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgM10gPSB0O1xuXG5cdCAgICAgICAgICAgIHRoaXMuX2RvQ3J5cHRCbG9jayhNLCBvZmZzZXQsIHRoaXMuX2ludktleVNjaGVkdWxlLCBJTlZfU1VCX01JWF8wLCBJTlZfU1VCX01JWF8xLCBJTlZfU1VCX01JWF8yLCBJTlZfU1VCX01JWF8zLCBJTlZfU0JPWCk7XG5cblx0ICAgICAgICAgICAgLy8gSW52IHN3YXAgMm5kIGFuZCA0dGggcm93c1xuXHQgICAgICAgICAgICB2YXIgdCA9IE1bb2Zmc2V0ICsgMV07XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgMV0gPSBNW29mZnNldCArIDNdO1xuXHQgICAgICAgICAgICBNW29mZnNldCArIDNdID0gdDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvQ3J5cHRCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCwga2V5U2NoZWR1bGUsIFNVQl9NSVhfMCwgU1VCX01JWF8xLCBTVUJfTUlYXzIsIFNVQl9NSVhfMywgU0JPWCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgblJvdW5kcyA9IHRoaXMuX25Sb3VuZHM7XG5cblx0ICAgICAgICAgICAgLy8gR2V0IGlucHV0LCBhZGQgcm91bmQga2V5XG5cdCAgICAgICAgICAgIHZhciBzMCA9IE1bb2Zmc2V0XSAgICAgXiBrZXlTY2hlZHVsZVswXTtcblx0ICAgICAgICAgICAgdmFyIHMxID0gTVtvZmZzZXQgKyAxXSBeIGtleVNjaGVkdWxlWzFdO1xuXHQgICAgICAgICAgICB2YXIgczIgPSBNW29mZnNldCArIDJdIF4ga2V5U2NoZWR1bGVbMl07XG5cdCAgICAgICAgICAgIHZhciBzMyA9IE1bb2Zmc2V0ICsgM10gXiBrZXlTY2hlZHVsZVszXTtcblxuXHQgICAgICAgICAgICAvLyBLZXkgc2NoZWR1bGUgcm93IGNvdW50ZXJcblx0ICAgICAgICAgICAgdmFyIGtzUm93ID0gNDtcblxuXHQgICAgICAgICAgICAvLyBSb3VuZHNcblx0ICAgICAgICAgICAgZm9yICh2YXIgcm91bmQgPSAxOyByb3VuZCA8IG5Sb3VuZHM7IHJvdW5kKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNoaWZ0IHJvd3MsIHN1YiBieXRlcywgbWl4IGNvbHVtbnMsIGFkZCByb3VuZCBrZXlcblx0ICAgICAgICAgICAgICAgIHZhciB0MCA9IFNVQl9NSVhfMFtzMCA+Pj4gMjRdIF4gU1VCX01JWF8xWyhzMSA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYXzJbKHMyID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWF8zW3MzICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MSA9IFNVQl9NSVhfMFtzMSA+Pj4gMjRdIF4gU1VCX01JWF8xWyhzMiA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYXzJbKHMzID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWF8zW3MwICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MiA9IFNVQl9NSVhfMFtzMiA+Pj4gMjRdIF4gU1VCX01JWF8xWyhzMyA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYXzJbKHMwID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWF8zW3MxICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MyA9IFNVQl9NSVhfMFtzMyA+Pj4gMjRdIF4gU1VCX01JWF8xWyhzMCA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYXzJbKHMxID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWF8zW3MyICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHN0YXRlXG5cdCAgICAgICAgICAgICAgICBzMCA9IHQwO1xuXHQgICAgICAgICAgICAgICAgczEgPSB0MTtcblx0ICAgICAgICAgICAgICAgIHMyID0gdDI7XG5cdCAgICAgICAgICAgICAgICBzMyA9IHQzO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gU2hpZnQgcm93cywgc3ViIGJ5dGVzLCBhZGQgcm91bmQga2V5XG5cdCAgICAgICAgICAgIHZhciB0MCA9ICgoU0JPWFtzMCA+Pj4gMjRdIDw8IDI0KSB8IChTQk9YWyhzMSA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHMyID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFtzMyAmIDB4ZmZdKSBeIGtleVNjaGVkdWxlW2tzUm93KytdO1xuXHQgICAgICAgICAgICB2YXIgdDEgPSAoKFNCT1hbczEgPj4+IDI0XSA8PCAyNCkgfCAoU0JPWFsoczIgPj4+IDE2KSAmIDB4ZmZdIDw8IDE2KSB8IChTQk9YWyhzMyA+Pj4gOCkgJiAweGZmXSA8PCA4KSB8IFNCT1hbczAgJiAweGZmXSkgXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgdmFyIHQyID0gKChTQk9YW3MyID4+PiAyNF0gPDwgMjQpIHwgKFNCT1hbKHMzID4+PiAxNikgJiAweGZmXSA8PCAxNikgfCAoU0JPWFsoczAgPj4+IDgpICYgMHhmZl0gPDwgOCkgfCBTQk9YW3MxICYgMHhmZl0pIF4ga2V5U2NoZWR1bGVba3NSb3crK107XG5cdCAgICAgICAgICAgIHZhciB0MyA9ICgoU0JPWFtzMyA+Pj4gMjRdIDw8IDI0KSB8IChTQk9YWyhzMCA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHMxID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFtzMiAmIDB4ZmZdKSBeIGtleVNjaGVkdWxlW2tzUm93KytdO1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBvdXRwdXRcblx0ICAgICAgICAgICAgTVtvZmZzZXRdICAgICA9IHQwO1xuXHQgICAgICAgICAgICBNW29mZnNldCArIDFdID0gdDE7XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgMl0gPSB0Mjtcblx0ICAgICAgICAgICAgTVtvZmZzZXQgKyAzXSA9IHQzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBrZXlTaXplOiAyNTYvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9ucyB0byB0aGUgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgY2lwaGVydGV4dCA9IENyeXB0b0pTLkFFUy5lbmNyeXB0KG1lc3NhZ2UsIGtleSwgY2ZnKTtcblx0ICAgICAqICAgICB2YXIgcGxhaW50ZXh0ICA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KGNpcGhlcnRleHQsIGtleSwgY2ZnKTtcblx0ICAgICAqL1xuXHQgICAgQy5BRVMgPSBCbG9ja0NpcGhlci5fY3JlYXRlSGVscGVyKEFFUyk7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuQUVTO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2V2cGtkZlwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9ldnBrZGZcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdC8qKlxuXHQgKiBDaXBoZXIgY29yZSBjb21wb25lbnRzLlxuXHQgKi9cblx0Q3J5cHRvSlMubGliLkNpcGhlciB8fCAoZnVuY3Rpb24gKHVuZGVmaW5lZCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2U7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBDX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtO1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmM7XG5cdCAgICB2YXIgVXRmOCA9IENfZW5jLlV0Zjg7XG5cdCAgICB2YXIgQmFzZTY0ID0gQ19lbmMuQmFzZTY0O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblx0ICAgIHZhciBFdnBLREYgPSBDX2FsZ28uRXZwS0RGO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJhc2UgY2lwaGVyIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBrZXlTaXplIFRoaXMgY2lwaGVyJ3Mga2V5IHNpemUuIERlZmF1bHQ6IDQgKDEyOCBiaXRzKVxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGl2U2l6ZSBUaGlzIGNpcGhlcidzIElWIHNpemUuIERlZmF1bHQ6IDQgKDEyOCBiaXRzKVxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IF9FTkNfWEZPUk1fTU9ERSBBIGNvbnN0YW50IHJlcHJlc2VudGluZyBlbmNyeXB0aW9uIG1vZGUuXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gX0RFQ19YRk9STV9NT0RFIEEgY29uc3RhbnQgcmVwcmVzZW50aW5nIGRlY3J5cHRpb24gbW9kZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENpcGhlciA9IENfbGliLkNpcGhlciA9IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcHJvcGVydHkge1dvcmRBcnJheX0gaXYgVGhlIElWIHRvIHVzZSBmb3IgdGhpcyBvcGVyYXRpb24uXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCgpLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyB0aGlzIGNpcGhlciBpbiBlbmNyeXB0aW9uIG1vZGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0ga2V5IFRoZSBrZXkuXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0NpcGhlcn0gQSBjaXBoZXIgaW5zdGFuY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXIgPSBDcnlwdG9KUy5hbGdvLkFFUy5jcmVhdGVFbmNyeXB0b3Ioa2V5V29yZEFycmF5LCB7IGl2OiBpdldvcmRBcnJheSB9KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjcmVhdGVFbmNyeXB0b3I6IGZ1bmN0aW9uIChrZXksIGNmZykge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUodGhpcy5fRU5DX1hGT1JNX01PREUsIGtleSwgY2ZnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyB0aGlzIGNpcGhlciBpbiBkZWNyeXB0aW9uIG1vZGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0ga2V5IFRoZSBrZXkuXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0NpcGhlcn0gQSBjaXBoZXIgaW5zdGFuY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXIgPSBDcnlwdG9KUy5hbGdvLkFFUy5jcmVhdGVEZWNyeXB0b3Ioa2V5V29yZEFycmF5LCB7IGl2OiBpdldvcmRBcnJheSB9KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjcmVhdGVEZWNyeXB0b3I6IGZ1bmN0aW9uIChrZXksIGNmZykge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUodGhpcy5fREVDX1hGT1JNX01PREUsIGtleSwgY2ZnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIGNpcGhlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4Zm9ybU1vZGUgRWl0aGVyIHRoZSBlbmNyeXB0aW9uIG9yIGRlY3J5cHRpb24gdHJhbnNvcm1hdGlvbiBtb2RlIGNvbnN0YW50LlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSBrZXkgVGhlIGtleS5cblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVyID0gQ3J5cHRvSlMuYWxnby5BRVMuY3JlYXRlKENyeXB0b0pTLmFsZ28uQUVTLl9FTkNfWEZPUk1fTU9ERSwga2V5V29yZEFycmF5LCB7IGl2OiBpdldvcmRBcnJheSB9KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoeGZvcm1Nb2RlLCBrZXksIGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBTdG9yZSB0cmFuc2Zvcm0gbW9kZSBhbmQga2V5XG5cdCAgICAgICAgICAgIHRoaXMuX3hmb3JtTW9kZSA9IHhmb3JtTW9kZTtcblx0ICAgICAgICAgICAgdGhpcy5fa2V5ID0ga2V5O1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBpbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGNpcGhlciB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgY2lwaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gUmVzZXQgZGF0YSBidWZmZXJcblx0ICAgICAgICAgICAgQnVmZmVyZWRCbG9ja0FsZ29yaXRobS5yZXNldC5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtY2lwaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHRoaXMuX2RvUmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyBkYXRhIHRvIGJlIGVuY3J5cHRlZCBvciBkZWNyeXB0ZWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGRhdGFVcGRhdGUgVGhlIGRhdGEgdG8gZW5jcnlwdCBvciBkZWNyeXB0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGF0YSBhZnRlciBwcm9jZXNzaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgZW5jcnlwdGVkID0gY2lwaGVyLnByb2Nlc3MoJ2RhdGEnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGVuY3J5cHRlZCA9IGNpcGhlci5wcm9jZXNzKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcHJvY2VzczogZnVuY3Rpb24gKGRhdGFVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2FwcGVuZChkYXRhVXBkYXRlKTtcblxuXHQgICAgICAgICAgICAvLyBQcm9jZXNzIGF2YWlsYWJsZSBibG9ja3Ncblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3MoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBlbmNyeXB0aW9uIG9yIGRlY3J5cHRpb24gcHJvY2Vzcy5cblx0ICAgICAgICAgKiBOb3RlIHRoYXQgdGhlIGZpbmFsaXplIG9wZXJhdGlvbiBpcyBlZmZlY3RpdmVseSBhIGRlc3RydWN0aXZlLCByZWFkLW9uY2Ugb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBkYXRhVXBkYXRlIFRoZSBmaW5hbCBkYXRhIHRvIGVuY3J5cHQgb3IgZGVjcnlwdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGRhdGEgYWZ0ZXIgZmluYWwgcHJvY2Vzc2luZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGVuY3J5cHRlZCA9IGNpcGhlci5maW5hbGl6ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgZW5jcnlwdGVkID0gY2lwaGVyLmZpbmFsaXplKCdkYXRhJyk7XG5cdCAgICAgICAgICogICAgIHZhciBlbmNyeXB0ZWQgPSBjaXBoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKGRhdGFVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gRmluYWwgZGF0YSB1cGRhdGVcblx0ICAgICAgICAgICAgaWYgKGRhdGFVcGRhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZChkYXRhVXBkYXRlKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtY2lwaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHZhciBmaW5hbFByb2Nlc3NlZERhdGEgPSB0aGlzLl9kb0ZpbmFsaXplKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGZpbmFsUHJvY2Vzc2VkRGF0YTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAga2V5U2l6ZTogMTI4LzMyLFxuXG5cdCAgICAgICAgaXZTaXplOiAxMjgvMzIsXG5cblx0ICAgICAgICBfRU5DX1hGT1JNX01PREU6IDEsXG5cblx0ICAgICAgICBfREVDX1hGT1JNX01PREU6IDIsXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIHNob3J0Y3V0IGZ1bmN0aW9ucyB0byBhIGNpcGhlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlcn0gY2lwaGVyIFRoZSBjaXBoZXIgdG8gY3JlYXRlIGEgaGVscGVyIGZvci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggZW5jcnlwdCBhbmQgZGVjcnlwdCBzaG9ydGN1dCBmdW5jdGlvbnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBBRVMgPSBDcnlwdG9KUy5saWIuQ2lwaGVyLl9jcmVhdGVIZWxwZXIoQ3J5cHRvSlMuYWxnby5BRVMpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIZWxwZXI6IChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENpcGhlclN0cmF0ZWd5KGtleSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gUGFzc3dvcmRCYXNlZENpcGhlcjtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNlcmlhbGl6YWJsZUNpcGhlcjtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoY2lwaGVyKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICAgICAgICAgIGVuY3J5cHQ6IGZ1bmN0aW9uIChtZXNzYWdlLCBrZXksIGNmZykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0Q2lwaGVyU3RyYXRlZ3koa2V5KS5lbmNyeXB0KGNpcGhlciwgbWVzc2FnZSwga2V5LCBjZmcpO1xuXHQgICAgICAgICAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgICAgICAgICBkZWNyeXB0OiBmdW5jdGlvbiAoY2lwaGVydGV4dCwga2V5LCBjZmcpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdENpcGhlclN0cmF0ZWd5KGtleSkuZGVjcnlwdChjaXBoZXIsIGNpcGhlcnRleHQsIGtleSwgY2ZnKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH0oKSlcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJhc2Ugc3RyZWFtIGNpcGhlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgY2lwaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiAxICgzMiBiaXRzKVxuXHQgICAgICovXG5cdCAgICB2YXIgU3RyZWFtQ2lwaGVyID0gQ19saWIuU3RyZWFtQ2lwaGVyID0gQ2lwaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gUHJvY2VzcyBwYXJ0aWFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB2YXIgZmluYWxQcm9jZXNzZWRCbG9ja3MgPSB0aGlzLl9wcm9jZXNzKCEhJ2ZsdXNoJyk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGZpbmFsUHJvY2Vzc2VkQmxvY2tzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDFcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIE1vZGUgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19tb2RlID0gQy5tb2RlID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYmFzZSBibG9jayBjaXBoZXIgbW9kZSB0ZW1wbGF0ZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJsb2NrQ2lwaGVyTW9kZSA9IENfbGliLkJsb2NrQ2lwaGVyTW9kZSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIHRoaXMgbW9kZSBmb3IgZW5jcnlwdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyfSBjaXBoZXIgQSBibG9jayBjaXBoZXIgaW5zdGFuY2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gaXYgVGhlIElWIHdvcmRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgbW9kZSA9IENyeXB0b0pTLm1vZGUuQ0JDLmNyZWF0ZUVuY3J5cHRvcihjaXBoZXIsIGl2LndvcmRzKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjcmVhdGVFbmNyeXB0b3I6IGZ1bmN0aW9uIChjaXBoZXIsIGl2KSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLkVuY3J5cHRvci5jcmVhdGUoY2lwaGVyLCBpdik7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgdGhpcyBtb2RlIGZvciBkZWNyeXB0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJ9IGNpcGhlciBBIGJsb2NrIGNpcGhlciBpbnN0YW5jZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBpdiBUaGUgSVYgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBtb2RlID0gQ3J5cHRvSlMubW9kZS5DQkMuY3JlYXRlRGVjcnlwdG9yKGNpcGhlciwgaXYud29yZHMpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNyZWF0ZURlY3J5cHRvcjogZnVuY3Rpb24gKGNpcGhlciwgaXYpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuRGVjcnlwdG9yLmNyZWF0ZShjaXBoZXIsIGl2KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIG1vZGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlcn0gY2lwaGVyIEEgYmxvY2sgY2lwaGVyIGluc3RhbmNlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGl2IFRoZSBJViB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIG1vZGUgPSBDcnlwdG9KUy5tb2RlLkNCQy5FbmNyeXB0b3IuY3JlYXRlKGNpcGhlciwgaXYud29yZHMpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjaXBoZXIsIGl2KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2NpcGhlciA9IGNpcGhlcjtcblx0ICAgICAgICAgICAgdGhpcy5faXYgPSBpdjtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBDaXBoZXIgQmxvY2sgQ2hhaW5pbmcgbW9kZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENCQyA9IENfbW9kZS5DQkMgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEFic3RyYWN0IGJhc2UgQ0JDIG1vZGUuXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdmFyIENCQyA9IEJsb2NrQ2lwaGVyTW9kZS5leHRlbmQoKTtcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENCQyBlbmNyeXB0b3IuXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgQ0JDLkVuY3J5cHRvciA9IENCQy5leHRlbmQoe1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogUHJvY2Vzc2VzIHRoZSBkYXRhIGJsb2NrIGF0IG9mZnNldC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgVGhlIGRhdGEgd29yZHMgdG8gb3BlcmF0ZSBvbi5cblx0ICAgICAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBUaGUgb2Zmc2V0IHdoZXJlIHRoZSBibG9jayBzdGFydHMuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICBtb2RlLnByb2Nlc3NCbG9jayhkYXRhLndvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgcHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICB2YXIgY2lwaGVyID0gdGhpcy5fY2lwaGVyO1xuXHQgICAgICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IGNpcGhlci5ibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFhPUiBhbmQgZW5jcnlwdFxuXHQgICAgICAgICAgICAgICAgeG9yQmxvY2suY2FsbCh0aGlzLCB3b3Jkcywgb2Zmc2V0LCBibG9ja1NpemUpO1xuXHQgICAgICAgICAgICAgICAgY2lwaGVyLmVuY3J5cHRCbG9jayh3b3Jkcywgb2Zmc2V0KTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhpcyBibG9jayB0byB1c2Ugd2l0aCBuZXh0IGJsb2NrXG5cdCAgICAgICAgICAgICAgICB0aGlzLl9wcmV2QmxvY2sgPSB3b3Jkcy5zbGljZShvZmZzZXQsIG9mZnNldCArIGJsb2NrU2l6ZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9KTtcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENCQyBkZWNyeXB0b3IuXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgQ0JDLkRlY3J5cHRvciA9IENCQy5leHRlbmQoe1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogUHJvY2Vzc2VzIHRoZSBkYXRhIGJsb2NrIGF0IG9mZnNldC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgVGhlIGRhdGEgd29yZHMgdG8gb3BlcmF0ZSBvbi5cblx0ICAgICAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBUaGUgb2Zmc2V0IHdoZXJlIHRoZSBibG9jayBzdGFydHMuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICBtb2RlLnByb2Nlc3NCbG9jayhkYXRhLndvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgcHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICB2YXIgY2lwaGVyID0gdGhpcy5fY2lwaGVyO1xuXHQgICAgICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IGNpcGhlci5ibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoaXMgYmxvY2sgdG8gdXNlIHdpdGggbmV4dCBibG9ja1xuXHQgICAgICAgICAgICAgICAgdmFyIHRoaXNCbG9jayA9IHdvcmRzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgYmxvY2tTaXplKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gRGVjcnlwdCBhbmQgWE9SXG5cdCAgICAgICAgICAgICAgICBjaXBoZXIuZGVjcnlwdEJsb2NrKHdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgICAgICAgICAgeG9yQmxvY2suY2FsbCh0aGlzLCB3b3Jkcywgb2Zmc2V0LCBibG9ja1NpemUpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBUaGlzIGJsb2NrIGJlY29tZXMgdGhlIHByZXZpb3VzIGJsb2NrXG5cdCAgICAgICAgICAgICAgICB0aGlzLl9wcmV2QmxvY2sgPSB0aGlzQmxvY2s7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9KTtcblxuXHQgICAgICAgIGZ1bmN0aW9uIHhvckJsb2NrKHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaXYgPSB0aGlzLl9pdjtcblxuXHQgICAgICAgICAgICAvLyBDaG9vc2UgbWl4aW5nIGJsb2NrXG5cdCAgICAgICAgICAgIGlmIChpdikge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJsb2NrID0gaXY7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBJViBmb3Igc3Vic2VxdWVudCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIHRoaXMuX2l2ID0gdW5kZWZpbmVkO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJsb2NrID0gdGhpcy5fcHJldkJsb2NrO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gWE9SIGJsb2Nrc1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tvZmZzZXQgKyBpXSBePSBibG9ja1tpXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiBDQkM7XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFBhZGRpbmcgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19wYWQgPSBDLnBhZCA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFBLQ1MgIzUvNyBwYWRkaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgUGtjczcgPSBDX3BhZC5Qa2NzNyA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBQYWRzIGRhdGEgdXNpbmcgdGhlIGFsZ29yaXRobSBkZWZpbmVkIGluIFBLQ1MgIzUvNy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSBkYXRhIFRoZSBkYXRhIHRvIHBhZC5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYmxvY2tTaXplIFRoZSBtdWx0aXBsZSB0aGF0IHRoZSBkYXRhIHNob3VsZCBiZSBwYWRkZWQgdG8uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIENyeXB0b0pTLnBhZC5Qa2NzNy5wYWQod29yZEFycmF5LCA0KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYWQ6IGZ1bmN0aW9uIChkYXRhLCBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZUJ5dGVzID0gYmxvY2tTaXplICogNDtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBwYWRkaW5nIGJ5dGVzXG5cdCAgICAgICAgICAgIHZhciBuUGFkZGluZ0J5dGVzID0gYmxvY2tTaXplQnl0ZXMgLSBkYXRhLnNpZ0J5dGVzICUgYmxvY2tTaXplQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ3JlYXRlIHBhZGRpbmcgd29yZFxuXHQgICAgICAgICAgICB2YXIgcGFkZGluZ1dvcmQgPSAoblBhZGRpbmdCeXRlcyA8PCAyNCkgfCAoblBhZGRpbmdCeXRlcyA8PCAxNikgfCAoblBhZGRpbmdCeXRlcyA8PCA4KSB8IG5QYWRkaW5nQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ3JlYXRlIHBhZGRpbmdcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmdXb3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5QYWRkaW5nQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgcGFkZGluZ1dvcmRzLnB1c2gocGFkZGluZ1dvcmQpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBwYWRkaW5nID0gV29yZEFycmF5LmNyZWF0ZShwYWRkaW5nV29yZHMsIG5QYWRkaW5nQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGEuY29uY2F0KHBhZGRpbmcpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVbnBhZHMgZGF0YSB0aGF0IGhhZCBiZWVuIHBhZGRlZCB1c2luZyB0aGUgYWxnb3JpdGhtIGRlZmluZWQgaW4gUEtDUyAjNS83LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IGRhdGEgVGhlIGRhdGEgdG8gdW5wYWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIENyeXB0b0pTLnBhZC5Qa2NzNy51bnBhZCh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVucGFkOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgICAgICAgICAvLyBHZXQgbnVtYmVyIG9mIHBhZGRpbmcgYnl0ZXMgZnJvbSBsYXN0IGJ5dGVcblx0ICAgICAgICAgICAgdmFyIG5QYWRkaW5nQnl0ZXMgPSBkYXRhLndvcmRzWyhkYXRhLnNpZ0J5dGVzIC0gMSkgPj4+IDJdICYgMHhmZjtcblxuXHQgICAgICAgICAgICAvLyBSZW1vdmUgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5QYWRkaW5nQnl0ZXM7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBiYXNlIGJsb2NrIGNpcGhlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgY2lwaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiA0ICgxMjggYml0cylcblx0ICAgICAqL1xuXHQgICAgdmFyIEJsb2NrQ2lwaGVyID0gQ19saWIuQmxvY2tDaXBoZXIgPSBDaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcHJvcGVydHkge01vZGV9IG1vZGUgVGhlIGJsb2NrIG1vZGUgdG8gdXNlLiBEZWZhdWx0OiBDQkNcblx0ICAgICAgICAgKiBAcHJvcGVydHkge1BhZGRpbmd9IHBhZGRpbmcgVGhlIHBhZGRpbmcgc3RyYXRlZ3kgdG8gdXNlLiBEZWZhdWx0OiBQa2NzN1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQ2lwaGVyLmNmZy5leHRlbmQoe1xuXHQgICAgICAgICAgICBtb2RlOiBDQkMsXG5cdCAgICAgICAgICAgIHBhZGRpbmc6IFBrY3M3XG5cdCAgICAgICAgfSksXG5cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBjaXBoZXJcblx0ICAgICAgICAgICAgQ2lwaGVyLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBjZmcgPSB0aGlzLmNmZztcblx0ICAgICAgICAgICAgdmFyIGl2ID0gY2ZnLml2O1xuXHQgICAgICAgICAgICB2YXIgbW9kZSA9IGNmZy5tb2RlO1xuXG5cdCAgICAgICAgICAgIC8vIFJlc2V0IGJsb2NrIG1vZGVcblx0ICAgICAgICAgICAgaWYgKHRoaXMuX3hmb3JtTW9kZSA9PSB0aGlzLl9FTkNfWEZPUk1fTU9ERSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIG1vZGVDcmVhdG9yID0gbW9kZS5jcmVhdGVFbmNyeXB0b3I7XG5cdCAgICAgICAgICAgIH0gZWxzZSAvKiBpZiAodGhpcy5feGZvcm1Nb2RlID09IHRoaXMuX0RFQ19YRk9STV9NT0RFKSAqLyB7XG5cdCAgICAgICAgICAgICAgICB2YXIgbW9kZUNyZWF0b3IgPSBtb2RlLmNyZWF0ZURlY3J5cHRvcjtcblx0ICAgICAgICAgICAgICAgIC8vIEtlZXAgYXQgbGVhc3Qgb25lIGJsb2NrIGluIHRoZSBidWZmZXIgZm9yIHVucGFkZGluZ1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fbWluQnVmZmVyU2l6ZSA9IDE7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBpZiAodGhpcy5fbW9kZSAmJiB0aGlzLl9tb2RlLl9fY3JlYXRvciA9PSBtb2RlQ3JlYXRvcikge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fbW9kZS5pbml0KHRoaXMsIGl2ICYmIGl2LndvcmRzKTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX21vZGUgPSBtb2RlQ3JlYXRvci5jYWxsKG1vZGUsIHRoaXMsIGl2ICYmIGl2LndvcmRzKTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX21vZGUuX19jcmVhdG9yID0gbW9kZUNyZWF0b3I7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICB0aGlzLl9tb2RlLnByb2Nlc3NCbG9jayh3b3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmcgPSB0aGlzLmNmZy5wYWRkaW5nO1xuXG5cdCAgICAgICAgICAgIC8vIEZpbmFsaXplXG5cdCAgICAgICAgICAgIGlmICh0aGlzLl94Zm9ybU1vZGUgPT0gdGhpcy5fRU5DX1hGT1JNX01PREUpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFBhZCBkYXRhXG5cdCAgICAgICAgICAgICAgICBwYWRkaW5nLnBhZCh0aGlzLl9kYXRhLCB0aGlzLmJsb2NrU2l6ZSk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICB2YXIgZmluYWxQcm9jZXNzZWRCbG9ja3MgPSB0aGlzLl9wcm9jZXNzKCEhJ2ZsdXNoJyk7XG5cdCAgICAgICAgICAgIH0gZWxzZSAvKiBpZiAodGhpcy5feGZvcm1Nb2RlID09IHRoaXMuX0RFQ19YRk9STV9NT0RFKSAqLyB7XG5cdCAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgdmFyIGZpbmFsUHJvY2Vzc2VkQmxvY2tzID0gdGhpcy5fcHJvY2VzcyghISdmbHVzaCcpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBVbnBhZCBkYXRhXG5cdCAgICAgICAgICAgICAgICBwYWRkaW5nLnVucGFkKGZpbmFsUHJvY2Vzc2VkQmxvY2tzKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBmaW5hbFByb2Nlc3NlZEJsb2Nrcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgYmxvY2tTaXplOiAxMjgvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEEgY29sbGVjdGlvbiBvZiBjaXBoZXIgcGFyYW1ldGVycy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge1dvcmRBcnJheX0gY2lwaGVydGV4dCBUaGUgcmF3IGNpcGhlcnRleHQuXG5cdCAgICAgKiBAcHJvcGVydHkge1dvcmRBcnJheX0ga2V5IFRoZSBrZXkgdG8gdGhpcyBjaXBoZXJ0ZXh0LlxuXHQgICAgICogQHByb3BlcnR5IHtXb3JkQXJyYXl9IGl2IFRoZSBJViB1c2VkIGluIHRoZSBjaXBoZXJpbmcgb3BlcmF0aW9uLlxuXHQgICAgICogQHByb3BlcnR5IHtXb3JkQXJyYXl9IHNhbHQgVGhlIHNhbHQgdXNlZCB3aXRoIGEga2V5IGRlcml2YXRpb24gZnVuY3Rpb24uXG5cdCAgICAgKiBAcHJvcGVydHkge0NpcGhlcn0gYWxnb3JpdGhtIFRoZSBjaXBoZXIgYWxnb3JpdGhtLlxuXHQgICAgICogQHByb3BlcnR5IHtNb2RlfSBtb2RlIFRoZSBibG9jayBtb2RlIHVzZWQgaW4gdGhlIGNpcGhlcmluZyBvcGVyYXRpb24uXG5cdCAgICAgKiBAcHJvcGVydHkge1BhZGRpbmd9IHBhZGRpbmcgVGhlIHBhZGRpbmcgc2NoZW1lIHVzZWQgaW4gdGhlIGNpcGhlcmluZyBvcGVyYXRpb24uXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBibG9jayBzaXplIG9mIHRoZSBjaXBoZXIuXG5cdCAgICAgKiBAcHJvcGVydHkge0Zvcm1hdH0gZm9ybWF0dGVyIFRoZSBkZWZhdWx0IGZvcm1hdHRpbmcgc3RyYXRlZ3kgdG8gY29udmVydCB0aGlzIGNpcGhlciBwYXJhbXMgb2JqZWN0IHRvIGEgc3RyaW5nLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ2lwaGVyUGFyYW1zID0gQ19saWIuQ2lwaGVyUGFyYW1zID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBjaXBoZXIgcGFyYW1zIG9iamVjdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjaXBoZXJQYXJhbXMgQW4gb2JqZWN0IHdpdGggYW55IG9mIHRoZSBwb3NzaWJsZSBjaXBoZXIgcGFyYW1ldGVycy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlclBhcmFtcyA9IENyeXB0b0pTLmxpYi5DaXBoZXJQYXJhbXMuY3JlYXRlKHtcblx0ICAgICAgICAgKiAgICAgICAgIGNpcGhlcnRleHQ6IGNpcGhlcnRleHRXb3JkQXJyYXksXG5cdCAgICAgICAgICogICAgICAgICBrZXk6IGtleVdvcmRBcnJheSxcblx0ICAgICAgICAgKiAgICAgICAgIGl2OiBpdldvcmRBcnJheSxcblx0ICAgICAgICAgKiAgICAgICAgIHNhbHQ6IHNhbHRXb3JkQXJyYXksXG5cdCAgICAgICAgICogICAgICAgICBhbGdvcml0aG06IENyeXB0b0pTLmFsZ28uQUVTLFxuXHQgICAgICAgICAqICAgICAgICAgbW9kZTogQ3J5cHRvSlMubW9kZS5DQkMsXG5cdCAgICAgICAgICogICAgICAgICBwYWRkaW5nOiBDcnlwdG9KUy5wYWQuUEtDUzcsXG5cdCAgICAgICAgICogICAgICAgICBibG9ja1NpemU6IDQsXG5cdCAgICAgICAgICogICAgICAgICBmb3JtYXR0ZXI6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMXG5cdCAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjaXBoZXJQYXJhbXMpIHtcblx0ICAgICAgICAgICAgdGhpcy5taXhJbihjaXBoZXJQYXJhbXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIGNpcGhlciBwYXJhbXMgb2JqZWN0IHRvIGEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtGb3JtYXR9IGZvcm1hdHRlciAoT3B0aW9uYWwpIFRoZSBmb3JtYXR0aW5nIHN0cmF0ZWd5IHRvIHVzZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZ2lmaWVkIGNpcGhlciBwYXJhbXMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAdGhyb3dzIEVycm9yIElmIG5laXRoZXIgdGhlIGZvcm1hdHRlciBub3IgdGhlIGRlZmF1bHQgZm9ybWF0dGVyIGlzIHNldC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IGNpcGhlclBhcmFtcyArICcnO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gY2lwaGVyUGFyYW1zLnRvU3RyaW5nKCk7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSBjaXBoZXJQYXJhbXMudG9TdHJpbmcoQ3J5cHRvSlMuZm9ybWF0Lk9wZW5TU0wpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoZm9ybWF0dGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoZm9ybWF0dGVyIHx8IHRoaXMuZm9ybWF0dGVyKS5zdHJpbmdpZnkodGhpcyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogRm9ybWF0IG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfZm9ybWF0ID0gQy5mb3JtYXQgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBPcGVuU1NMIGZvcm1hdHRpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBPcGVuU1NMRm9ybWF0dGVyID0gQ19mb3JtYXQuT3BlblNTTCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIGNpcGhlciBwYXJhbXMgb2JqZWN0IHRvIGFuIE9wZW5TU0wtY29tcGF0aWJsZSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlclBhcmFtc30gY2lwaGVyUGFyYW1zIFRoZSBjaXBoZXIgcGFyYW1zIG9iamVjdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIE9wZW5TU0wtY29tcGF0aWJsZSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBvcGVuU1NMU3RyaW5nID0gQ3J5cHRvSlMuZm9ybWF0Lk9wZW5TU0wuc3RyaW5naWZ5KGNpcGhlclBhcmFtcyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAoY2lwaGVyUGFyYW1zKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgY2lwaGVydGV4dCA9IGNpcGhlclBhcmFtcy5jaXBoZXJ0ZXh0O1xuXHQgICAgICAgICAgICB2YXIgc2FsdCA9IGNpcGhlclBhcmFtcy5zYWx0O1xuXG5cdCAgICAgICAgICAgIC8vIEZvcm1hdFxuXHQgICAgICAgICAgICBpZiAoc2FsdCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHdvcmRBcnJheSA9IFdvcmRBcnJheS5jcmVhdGUoWzB4NTM2MTZjNzQsIDB4NjU2NDVmNWZdKS5jb25jYXQoc2FsdCkuY29uY2F0KGNpcGhlcnRleHQpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdmFyIHdvcmRBcnJheSA9IGNpcGhlcnRleHQ7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gd29yZEFycmF5LnRvU3RyaW5nKEJhc2U2NCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGFuIE9wZW5TU0wtY29tcGF0aWJsZSBzdHJpbmcgdG8gYSBjaXBoZXIgcGFyYW1zIG9iamVjdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcGVuU1NMU3RyIFRoZSBPcGVuU1NMLWNvbXBhdGlibGUgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyUGFyYW1zfSBUaGUgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJQYXJhbXMgPSBDcnlwdG9KUy5mb3JtYXQuT3BlblNTTC5wYXJzZShvcGVuU1NMU3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKG9wZW5TU0xTdHIpIHtcblx0ICAgICAgICAgICAgLy8gUGFyc2UgYmFzZTY0XG5cdCAgICAgICAgICAgIHZhciBjaXBoZXJ0ZXh0ID0gQmFzZTY0LnBhcnNlKG9wZW5TU0xTdHIpO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBjaXBoZXJ0ZXh0V29yZHMgPSBjaXBoZXJ0ZXh0LndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFRlc3QgZm9yIHNhbHRcblx0ICAgICAgICAgICAgaWYgKGNpcGhlcnRleHRXb3Jkc1swXSA9PSAweDUzNjE2Yzc0ICYmIGNpcGhlcnRleHRXb3Jkc1sxXSA9PSAweDY1NjQ1ZjVmKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IHNhbHRcblx0ICAgICAgICAgICAgICAgIHZhciBzYWx0ID0gV29yZEFycmF5LmNyZWF0ZShjaXBoZXJ0ZXh0V29yZHMuc2xpY2UoMiwgNCkpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgc2FsdCBmcm9tIGNpcGhlcnRleHRcblx0ICAgICAgICAgICAgICAgIGNpcGhlcnRleHRXb3Jkcy5zcGxpY2UoMCwgNCk7XG5cdCAgICAgICAgICAgICAgICBjaXBoZXJ0ZXh0LnNpZ0J5dGVzIC09IDE2O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIENpcGhlclBhcmFtcy5jcmVhdGUoeyBjaXBoZXJ0ZXh0OiBjaXBoZXJ0ZXh0LCBzYWx0OiBzYWx0IH0pO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogQSBjaXBoZXIgd3JhcHBlciB0aGF0IHJldHVybnMgY2lwaGVydGV4dCBhcyBhIHNlcmlhbGl6YWJsZSBjaXBoZXIgcGFyYW1zIG9iamVjdC5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNlcmlhbGl6YWJsZUNpcGhlciA9IENfbGliLlNlcmlhbGl6YWJsZUNpcGhlciA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcHJvcGVydHkge0Zvcm1hdHRlcn0gZm9ybWF0IFRoZSBmb3JtYXR0aW5nIHN0cmF0ZWd5IHRvIGNvbnZlcnQgY2lwaGVyIHBhcmFtIG9iamVjdHMgdG8gYW5kIGZyb20gYSBzdHJpbmcuIERlZmF1bHQ6IE9wZW5TU0xcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgZm9ybWF0OiBPcGVuU1NMRm9ybWF0dGVyXG5cdCAgICAgICAgfSksXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBFbmNyeXB0cyBhIG1lc3NhZ2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlcn0gY2lwaGVyIFRoZSBjaXBoZXIgYWxnb3JpdGhtIHRvIHVzZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZW5jcnlwdC5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0ga2V5IFRoZSBrZXkuXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0NpcGhlclBhcmFtc30gQSBjaXBoZXIgcGFyYW1zIG9iamVjdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlcnRleHRQYXJhbXMgPSBDcnlwdG9KUy5saWIuU2VyaWFsaXphYmxlQ2lwaGVyLmVuY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0UGFyYW1zID0gQ3J5cHRvSlMubGliLlNlcmlhbGl6YWJsZUNpcGhlci5lbmNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBtZXNzYWdlLCBrZXksIHsgaXY6IGl2IH0pO1xuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVydGV4dFBhcmFtcyA9IENyeXB0b0pTLmxpYi5TZXJpYWxpemFibGVDaXBoZXIuZW5jcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgbWVzc2FnZSwga2V5LCB7IGl2OiBpdiwgZm9ybWF0OiBDcnlwdG9KUy5mb3JtYXQuT3BlblNTTCB9KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBlbmNyeXB0OiBmdW5jdGlvbiAoY2lwaGVyLCBtZXNzYWdlLCBrZXksIGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gRW5jcnlwdFxuXHQgICAgICAgICAgICB2YXIgZW5jcnlwdG9yID0gY2lwaGVyLmNyZWF0ZUVuY3J5cHRvcihrZXksIGNmZyk7XG5cdCAgICAgICAgICAgIHZhciBjaXBoZXJ0ZXh0ID0gZW5jcnlwdG9yLmZpbmFsaXplKG1lc3NhZ2UpO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBjaXBoZXJDZmcgPSBlbmNyeXB0b3IuY2ZnO1xuXG5cdCAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgcmV0dXJuIHNlcmlhbGl6YWJsZSBjaXBoZXIgcGFyYW1zXG5cdCAgICAgICAgICAgIHJldHVybiBDaXBoZXJQYXJhbXMuY3JlYXRlKHtcblx0ICAgICAgICAgICAgICAgIGNpcGhlcnRleHQ6IGNpcGhlcnRleHQsXG5cdCAgICAgICAgICAgICAgICBrZXk6IGtleSxcblx0ICAgICAgICAgICAgICAgIGl2OiBjaXBoZXJDZmcuaXYsXG5cdCAgICAgICAgICAgICAgICBhbGdvcml0aG06IGNpcGhlcixcblx0ICAgICAgICAgICAgICAgIG1vZGU6IGNpcGhlckNmZy5tb2RlLFxuXHQgICAgICAgICAgICAgICAgcGFkZGluZzogY2lwaGVyQ2ZnLnBhZGRpbmcsXG5cdCAgICAgICAgICAgICAgICBibG9ja1NpemU6IGNpcGhlci5ibG9ja1NpemUsXG5cdCAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGNmZy5mb3JtYXRcblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIERlY3J5cHRzIHNlcmlhbGl6ZWQgY2lwaGVydGV4dC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyfSBjaXBoZXIgVGhlIGNpcGhlciBhbGdvcml0aG0gdG8gdXNlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyUGFyYW1zfHN0cmluZ30gY2lwaGVydGV4dCBUaGUgY2lwaGVydGV4dCB0byBkZWNyeXB0LlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSBrZXkgVGhlIGtleS5cblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcGxhaW50ZXh0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcGxhaW50ZXh0ID0gQ3J5cHRvSlMubGliLlNlcmlhbGl6YWJsZUNpcGhlci5kZWNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBmb3JtYXR0ZWRDaXBoZXJ0ZXh0LCBrZXksIHsgaXY6IGl2LCBmb3JtYXQ6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMIH0pO1xuXHQgICAgICAgICAqICAgICB2YXIgcGxhaW50ZXh0ID0gQ3J5cHRvSlMubGliLlNlcmlhbGl6YWJsZUNpcGhlci5kZWNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBjaXBoZXJ0ZXh0UGFyYW1zLCBrZXksIHsgaXY6IGl2LCBmb3JtYXQ6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGRlY3J5cHQ6IGZ1bmN0aW9uIChjaXBoZXIsIGNpcGhlcnRleHQsIGtleSwgY2ZnKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xuXHQgICAgICAgICAgICBjZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBDaXBoZXJQYXJhbXNcblx0ICAgICAgICAgICAgY2lwaGVydGV4dCA9IHRoaXMuX3BhcnNlKGNpcGhlcnRleHQsIGNmZy5mb3JtYXQpO1xuXG5cdCAgICAgICAgICAgIC8vIERlY3J5cHRcblx0ICAgICAgICAgICAgdmFyIHBsYWludGV4dCA9IGNpcGhlci5jcmVhdGVEZWNyeXB0b3Ioa2V5LCBjZmcpLmZpbmFsaXplKGNpcGhlcnRleHQuY2lwaGVydGV4dCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHBsYWludGV4dDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgc2VyaWFsaXplZCBjaXBoZXJ0ZXh0IHRvIENpcGhlclBhcmFtcyxcblx0ICAgICAgICAgKiBlbHNlIGFzc3VtZWQgQ2lwaGVyUGFyYW1zIGFscmVhZHkgYW5kIHJldHVybnMgY2lwaGVydGV4dCB1bmNoYW5nZWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlclBhcmFtc3xzdHJpbmd9IGNpcGhlcnRleHQgVGhlIGNpcGhlcnRleHQuXG5cdCAgICAgICAgICogQHBhcmFtIHtGb3JtYXR0ZXJ9IGZvcm1hdCBUaGUgZm9ybWF0dGluZyBzdHJhdGVneSB0byB1c2UgdG8gcGFyc2Ugc2VyaWFsaXplZCBjaXBoZXJ0ZXh0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyUGFyYW1zfSBUaGUgdW5zZXJpYWxpemVkIGNpcGhlcnRleHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0UGFyYW1zID0gQ3J5cHRvSlMubGliLlNlcmlhbGl6YWJsZUNpcGhlci5fcGFyc2UoY2lwaGVydGV4dFN0cmluZ09yUGFyYW1zLCBmb3JtYXQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9wYXJzZTogZnVuY3Rpb24gKGNpcGhlcnRleHQsIGZvcm1hdCkge1xuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGNpcGhlcnRleHQgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXQucGFyc2UoY2lwaGVydGV4dCwgdGhpcyk7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gY2lwaGVydGV4dDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEtleSBkZXJpdmF0aW9uIGZ1bmN0aW9uIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfa2RmID0gQy5rZGYgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBPcGVuU1NMIGtleSBkZXJpdmF0aW9uIGZ1bmN0aW9uLlxuXHQgICAgICovXG5cdCAgICB2YXIgT3BlblNTTEtkZiA9IENfa2RmLk9wZW5TU0wgPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRGVyaXZlcyBhIGtleSBhbmQgSVYgZnJvbSBhIHBhc3N3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZCB0byBkZXJpdmUgZnJvbS5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0ga2V5U2l6ZSBUaGUgc2l6ZSBpbiB3b3JkcyBvZiB0aGUga2V5IHRvIGdlbmVyYXRlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpdlNpemUgVGhlIHNpemUgaW4gd29yZHMgb2YgdGhlIElWIHRvIGdlbmVyYXRlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gc2FsdCAoT3B0aW9uYWwpIEEgNjQtYml0IHNhbHQgdG8gdXNlLiBJZiBvbWl0dGVkLCBhIHNhbHQgd2lsbCBiZSBnZW5lcmF0ZWQgcmFuZG9tbHkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDaXBoZXJQYXJhbXN9IEEgY2lwaGVyIHBhcmFtcyBvYmplY3Qgd2l0aCB0aGUga2V5LCBJViwgYW5kIHNhbHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBkZXJpdmVkUGFyYW1zID0gQ3J5cHRvSlMua2RmLk9wZW5TU0wuZXhlY3V0ZSgnUGFzc3dvcmQnLCAyNTYvMzIsIDEyOC8zMik7XG5cdCAgICAgICAgICogICAgIHZhciBkZXJpdmVkUGFyYW1zID0gQ3J5cHRvSlMua2RmLk9wZW5TU0wuZXhlY3V0ZSgnUGFzc3dvcmQnLCAyNTYvMzIsIDEyOC8zMiwgJ3NhbHRzYWx0Jyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKHBhc3N3b3JkLCBrZXlTaXplLCBpdlNpemUsIHNhbHQpIHtcblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIHNhbHRcblx0ICAgICAgICAgICAgaWYgKCFzYWx0KSB7XG5cdCAgICAgICAgICAgICAgICBzYWx0ID0gV29yZEFycmF5LnJhbmRvbSg2NC84KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIERlcml2ZSBrZXkgYW5kIElWXG5cdCAgICAgICAgICAgIHZhciBrZXkgPSBFdnBLREYuY3JlYXRlKHsga2V5U2l6ZToga2V5U2l6ZSArIGl2U2l6ZSB9KS5jb21wdXRlKHBhc3N3b3JkLCBzYWx0KTtcblxuXHQgICAgICAgICAgICAvLyBTZXBhcmF0ZSBrZXkgYW5kIElWXG5cdCAgICAgICAgICAgIHZhciBpdiA9IFdvcmRBcnJheS5jcmVhdGUoa2V5LndvcmRzLnNsaWNlKGtleVNpemUpLCBpdlNpemUgKiA0KTtcblx0ICAgICAgICAgICAga2V5LnNpZ0J5dGVzID0ga2V5U2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIHBhcmFtc1xuXHQgICAgICAgICAgICByZXR1cm4gQ2lwaGVyUGFyYW1zLmNyZWF0ZSh7IGtleToga2V5LCBpdjogaXYsIHNhbHQ6IHNhbHQgfSk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBIHNlcmlhbGl6YWJsZSBjaXBoZXIgd3JhcHBlciB0aGF0IGRlcml2ZXMgdGhlIGtleSBmcm9tIGEgcGFzc3dvcmQsXG5cdCAgICAgKiBhbmQgcmV0dXJucyBjaXBoZXJ0ZXh0IGFzIGEgc2VyaWFsaXphYmxlIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICovXG5cdCAgICB2YXIgUGFzc3dvcmRCYXNlZENpcGhlciA9IENfbGliLlBhc3N3b3JkQmFzZWRDaXBoZXIgPSBTZXJpYWxpemFibGVDaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcHJvcGVydHkge0tERn0ga2RmIFRoZSBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvbiB0byB1c2UgdG8gZ2VuZXJhdGUgYSBrZXkgYW5kIElWIGZyb20gYSBwYXNzd29yZC4gRGVmYXVsdDogT3BlblNTTFxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogU2VyaWFsaXphYmxlQ2lwaGVyLmNmZy5leHRlbmQoe1xuXHQgICAgICAgICAgICBrZGY6IE9wZW5TU0xLZGZcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEVuY3J5cHRzIGEgbWVzc2FnZSB1c2luZyBhIHBhc3N3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJ9IGNpcGhlciBUaGUgY2lwaGVyIGFsZ29yaXRobSB0byB1c2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGVuY3J5cHQuXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyUGFyYW1zfSBBIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVydGV4dFBhcmFtcyA9IENyeXB0b0pTLmxpYi5QYXNzd29yZEJhc2VkQ2lwaGVyLmVuY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIG1lc3NhZ2UsICdwYXNzd29yZCcpO1xuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVydGV4dFBhcmFtcyA9IENyeXB0b0pTLmxpYi5QYXNzd29yZEJhc2VkQ2lwaGVyLmVuY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIG1lc3NhZ2UsICdwYXNzd29yZCcsIHsgZm9ybWF0OiBDcnlwdG9KUy5mb3JtYXQuT3BlblNTTCB9KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBlbmNyeXB0OiBmdW5jdGlvbiAoY2lwaGVyLCBtZXNzYWdlLCBwYXNzd29yZCwgY2ZnKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xuXHQgICAgICAgICAgICBjZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBEZXJpdmUga2V5IGFuZCBvdGhlciBwYXJhbXNcblx0ICAgICAgICAgICAgdmFyIGRlcml2ZWRQYXJhbXMgPSBjZmcua2RmLmV4ZWN1dGUocGFzc3dvcmQsIGNpcGhlci5rZXlTaXplLCBjaXBoZXIuaXZTaXplKTtcblxuXHQgICAgICAgICAgICAvLyBBZGQgSVYgdG8gY29uZmlnXG5cdCAgICAgICAgICAgIGNmZy5pdiA9IGRlcml2ZWRQYXJhbXMuaXY7XG5cblx0ICAgICAgICAgICAgLy8gRW5jcnlwdFxuXHQgICAgICAgICAgICB2YXIgY2lwaGVydGV4dCA9IFNlcmlhbGl6YWJsZUNpcGhlci5lbmNyeXB0LmNhbGwodGhpcywgY2lwaGVyLCBtZXNzYWdlLCBkZXJpdmVkUGFyYW1zLmtleSwgY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBNaXggaW4gZGVyaXZlZCBwYXJhbXNcblx0ICAgICAgICAgICAgY2lwaGVydGV4dC5taXhJbihkZXJpdmVkUGFyYW1zKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2lwaGVydGV4dDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRGVjcnlwdHMgc2VyaWFsaXplZCBjaXBoZXJ0ZXh0IHVzaW5nIGEgcGFzc3dvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlcn0gY2lwaGVyIFRoZSBjaXBoZXIgYWxnb3JpdGhtIHRvIHVzZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlclBhcmFtc3xzdHJpbmd9IGNpcGhlcnRleHQgVGhlIGNpcGhlcnRleHQgdG8gZGVjcnlwdC5cblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmQgVGhlIHBhc3N3b3JkLlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBwbGFpbnRleHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwbGFpbnRleHQgPSBDcnlwdG9KUy5saWIuUGFzc3dvcmRCYXNlZENpcGhlci5kZWNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBmb3JtYXR0ZWRDaXBoZXJ0ZXh0LCAncGFzc3dvcmQnLCB7IGZvcm1hdDogQ3J5cHRvSlMuZm9ybWF0Lk9wZW5TU0wgfSk7XG5cdCAgICAgICAgICogICAgIHZhciBwbGFpbnRleHQgPSBDcnlwdG9KUy5saWIuUGFzc3dvcmRCYXNlZENpcGhlci5kZWNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBjaXBoZXJ0ZXh0UGFyYW1zLCAncGFzc3dvcmQnLCB7IGZvcm1hdDogQ3J5cHRvSlMuZm9ybWF0Lk9wZW5TU0wgfSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgZGVjcnlwdDogZnVuY3Rpb24gKGNpcGhlciwgY2lwaGVydGV4dCwgcGFzc3dvcmQsIGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gQ2lwaGVyUGFyYW1zXG5cdCAgICAgICAgICAgIGNpcGhlcnRleHQgPSB0aGlzLl9wYXJzZShjaXBoZXJ0ZXh0LCBjZmcuZm9ybWF0KTtcblxuXHQgICAgICAgICAgICAvLyBEZXJpdmUga2V5IGFuZCBvdGhlciBwYXJhbXNcblx0ICAgICAgICAgICAgdmFyIGRlcml2ZWRQYXJhbXMgPSBjZmcua2RmLmV4ZWN1dGUocGFzc3dvcmQsIGNpcGhlci5rZXlTaXplLCBjaXBoZXIuaXZTaXplLCBjaXBoZXJ0ZXh0LnNhbHQpO1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBJViB0byBjb25maWdcblx0ICAgICAgICAgICAgY2ZnLml2ID0gZGVyaXZlZFBhcmFtcy5pdjtcblxuXHQgICAgICAgICAgICAvLyBEZWNyeXB0XG5cdCAgICAgICAgICAgIHZhciBwbGFpbnRleHQgPSBTZXJpYWxpemFibGVDaXBoZXIuZGVjcnlwdC5jYWxsKHRoaXMsIGNpcGhlciwgY2lwaGVydGV4dCwgZGVyaXZlZFBhcmFtcy5rZXksIGNmZyk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHBsYWludGV4dDtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblx0fSgpKTtcblxuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdHJvb3QuQ3J5cHRvSlMgPSBmYWN0b3J5KCk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXG5cdC8qKlxuXHQgKiBDcnlwdG9KUyBjb3JlIGNvbXBvbmVudHMuXG5cdCAqL1xuXHR2YXIgQ3J5cHRvSlMgPSBDcnlwdG9KUyB8fCAoZnVuY3Rpb24gKE1hdGgsIHVuZGVmaW5lZCkge1xuXHQgICAgLypcblx0ICAgICAqIExvY2FsIHBvbHlmaWwgb2YgT2JqZWN0LmNyZWF0ZVxuXHQgICAgICovXG5cdCAgICB2YXIgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIEYoKSB7fTtcblxuXHQgICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG5cdCAgICAgICAgICAgIHZhciBzdWJ0eXBlO1xuXG5cdCAgICAgICAgICAgIEYucHJvdG90eXBlID0gb2JqO1xuXG5cdCAgICAgICAgICAgIHN1YnR5cGUgPSBuZXcgRigpO1xuXG5cdCAgICAgICAgICAgIEYucHJvdG90eXBlID0gbnVsbDtcblxuXHQgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICB9O1xuXHQgICAgfSgpKVxuXG5cdCAgICAvKipcblx0ICAgICAqIENyeXB0b0pTIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBMaWJyYXJ5IG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfbGliID0gQy5saWIgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBCYXNlIG9iamVjdCBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlID0gKGZ1bmN0aW9uICgpIHtcblxuXG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG92ZXJyaWRlcyBQcm9wZXJ0aWVzIHRvIGNvcHkgaW50byB0aGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZScsXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICAgICAgbWV0aG9kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBleHRlbmQ6IGZ1bmN0aW9uIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNwYXduXG5cdCAgICAgICAgICAgICAgICB2YXIgc3VidHlwZSA9IGNyZWF0ZSh0aGlzKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gQXVnbWVudFxuXHQgICAgICAgICAgICAgICAgaWYgKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUubWl4SW4ob3ZlcnJpZGVzKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGRlZmF1bHQgaW5pdGlhbGl6ZXJcblx0ICAgICAgICAgICAgICAgIGlmICghc3VidHlwZS5oYXNPd25Qcm9wZXJ0eSgnaW5pdCcpIHx8IHRoaXMuaW5pdCA9PT0gc3VidHlwZS5pbml0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlci5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZXIncyBwcm90b3R5cGUgaXMgdGhlIHN1YnR5cGUgb2JqZWN0XG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQucHJvdG90eXBlID0gc3VidHlwZTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVmZXJlbmNlIHN1cGVydHlwZVxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIgPSB0aGlzO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogRXh0ZW5kcyB0aGlzIG9iamVjdCBhbmQgcnVucyB0aGUgaW5pdCBtZXRob2QuXG5cdCAgICAgICAgICAgICAqIEFyZ3VtZW50cyB0byBjcmVhdGUoKSB3aWxsIGJlIHBhc3NlZCB0byBpbml0KCkuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBpbnN0YW5jZSA9IE15VHlwZS5jcmVhdGUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gdGhpcy5leHRlbmQoKTtcblx0ICAgICAgICAgICAgICAgIGluc3RhbmNlLmluaXQuYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIG9iamVjdC5cblx0ICAgICAgICAgICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gYWRkIHNvbWUgbG9naWMgd2hlbiB5b3VyIG9iamVjdHMgYXJlIGNyZWF0ZWQuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgICAgIC8vIC4uLlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDb3BpZXMgcHJvcGVydGllcyBpbnRvIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllcyBUaGUgcHJvcGVydGllcyB0byBtaXggaW4uXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICBNeVR5cGUubWl4SW4oe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnXG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIG1peEluOiBmdW5jdGlvbiAocHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIElFIHdvbid0IGNvcHkgdG9TdHJpbmcgdXNpbmcgdGhlIGxvb3AgYWJvdmVcblx0ICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCd0b1N0cmluZycpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50b1N0cmluZyA9IHByb3BlcnRpZXMudG9TdHJpbmc7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGluc3RhbmNlLmNsb25lKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdC5wcm90b3R5cGUuZXh0ZW5kKHRoaXMpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHdvcmRzIFRoZSBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2lnQnl0ZXMgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgKi9cblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXkgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyAoT3B0aW9uYWwpIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10pO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddLCA2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAod29yZHMsIHNpZ0J5dGVzKSB7XG5cdCAgICAgICAgICAgIHdvcmRzID0gdGhpcy53b3JkcyA9IHdvcmRzIHx8IFtdO1xuXG5cdCAgICAgICAgICAgIGlmIChzaWdCeXRlcyAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSBzaWdCeXRlcztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSB3b3Jkcy5sZW5ndGggKiA0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgd29yZCBhcnJheSB0byBhIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlciAoT3B0aW9uYWwpIFRoZSBlbmNvZGluZyBzdHJhdGVneSB0byB1c2UuIERlZmF1bHQ6IENyeXB0b0pTLmVuYy5IZXhcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZ2lmaWVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkgKyAnJztcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZygpO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKGVuY29kZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIChlbmNvZGVyIHx8IEhleCkuc3RyaW5naWZ5KHRoaXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25jYXRlbmF0ZXMgYSB3b3JkIGFycmF5IHRvIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheTEuY29uY2F0KHdvcmRBcnJheTIpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNvbmNhdDogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHRoaXNXb3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0V29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGlzU2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wIGV4Y2VzcyBiaXRzXG5cdCAgICAgICAgICAgIHRoaXMuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb25jYXRcblx0ICAgICAgICAgICAgaWYgKHRoaXNTaWdCeXRlcyAlIDQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgb25lIGJ5dGUgYXQgYSB0aW1lXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoYXRTaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXRCeXRlID0gKHRoYXRXb3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpc1dvcmRzWyh0aGlzU2lnQnl0ZXMgKyBpKSA+Pj4gMl0gfD0gdGhhdEJ5dGUgPDwgKDI0IC0gKCh0aGlzU2lnQnl0ZXMgKyBpKSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSB3b3JkIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0U2lnQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaSkgPj4+IDJdID0gdGhhdFdvcmRzW2kgPj4+IDJdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgKz0gdGhhdFNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVtb3ZlcyBpbnNpZ25pZmljYW50IGJpdHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheS5jbGFtcCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsYW1wOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wXG5cdCAgICAgICAgICAgIHdvcmRzW3NpZ0J5dGVzID4+PiAyXSAmPSAweGZmZmZmZmZmIDw8ICgzMiAtIChzaWdCeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIHdvcmRzLmxlbmd0aCA9IE1hdGguY2VpbChzaWdCeXRlcyAvIDQpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gd29yZEFycmF5LmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS53b3JkcyA9IHRoaXMud29yZHMuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgd29yZCBhcnJheSBmaWxsZWQgd2l0aCByYW5kb20gYnl0ZXMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbkJ5dGVzIFRoZSBudW1iZXIgb2YgcmFuZG9tIGJ5dGVzIHRvIGdlbmVyYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcmFuZG9tIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LnJhbmRvbSgxNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmFuZG9tOiBmdW5jdGlvbiAobkJ5dGVzKSB7XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXG5cdCAgICAgICAgICAgIHZhciByID0gKGZ1bmN0aW9uIChtX3cpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBtX3cgPSBtX3c7XG5cdCAgICAgICAgICAgICAgICB2YXIgbV96ID0gMHgzYWRlNjhiMTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYXNrID0gMHhmZmZmZmZmZjtcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICBtX3ogPSAoMHg5MDY5ICogKG1feiAmIDB4RkZGRikgKyAobV96ID4+IDB4MTApKSAmIG1hc2s7XG5cdCAgICAgICAgICAgICAgICAgICAgbV93ID0gKDB4NDY1MCAqIChtX3cgJiAweEZGRkYpICsgKG1fdyA+PiAweDEwKSkgJiBtYXNrO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSAoKG1feiA8PCAweDEwKSArIG1fdykgJiBtYXNrO1xuXHQgICAgICAgICAgICAgICAgICAgIHJlc3VsdCAvPSAweDEwMDAwMDAwMDtcblx0ICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gMC41O1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgKiAoTWF0aC5yYW5kb20oKSA+IC41ID8gMSA6IC0xKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHJjYWNoZTsgaSA8IG5CeXRlczsgaSArPSA0KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgX3IgPSByKChyY2FjaGUgfHwgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwMDAwMCk7XG5cblx0ICAgICAgICAgICAgICAgIHJjYWNoZSA9IF9yKCkgKiAweDNhZGU2N2I3O1xuXHQgICAgICAgICAgICAgICAgd29yZHMucHVzaCgoX3IoKSAqIDB4MTAwMDAwMDAwKSB8IDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbkJ5dGVzKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBFbmNvZGVyIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBIZXggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBIZXggPSBDX2VuYy5IZXggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGV4U3RyaW5nID0gQ3J5cHRvSlMuZW5jLkhleC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGhleENoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdGUgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgJiAweDBmKS50b1N0cmluZygxNikpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhleENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIGhleCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGhleFN0ciBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuSGV4LnBhcnNlKGhleFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChoZXhTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhleFN0ckxlbmd0aCA9IGhleFN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZXhTdHJMZW5ndGg7IGkgKz0gMikge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gM10gfD0gcGFyc2VJbnQoaGV4U3RyLnN1YnN0cihpLCAyKSwgMTYpIDw8ICgyNCAtIChpICUgOCkgKiA0KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIGhleFN0ckxlbmd0aCAvIDIpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGF0aW4xIGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgTGF0aW4xID0gQ19lbmMuTGF0aW4xID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGxhdGluMVN0cmluZyA9IENyeXB0b0pTLmVuYy5MYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBsYXRpbjFDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGxhdGluMUNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiaXRlKSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbGF0aW4xQ2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgTGF0aW4xIHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF0aW4xU3RyIFRoZSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5MYXRpbjEucGFyc2UobGF0aW4xU3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGxhdGluMVN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xU3RyTGVuZ3RoID0gbGF0aW4xU3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhdGluMVN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAyXSB8PSAobGF0aW4xU3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKSA8PCAoMjQgLSAoaSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBsYXRpbjFTdHJMZW5ndGgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogVVRGLTggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmOCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgdXRmOFN0cmluZyA9IENyeXB0b0pTLmVuYy5VdGY4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpKSk7XG5cdCAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIFVURi04IGRhdGEnKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIFVURi04IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXRmOFN0ciBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHV0ZjhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodXRmOFN0cikge1xuXHQgICAgICAgICAgICByZXR1cm4gTGF0aW4xLnBhcnNlKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudCh1dGY4U3RyKSkpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYnVmZmVyZWQgYmxvY2sgYWxnb3JpdGhtIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIFRoZSBwcm9wZXJ0eSBibG9ja1NpemUgbXVzdCBiZSBpbXBsZW1lbnRlZCBpbiBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IF9taW5CdWZmZXJTaXplIFRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgc2hvdWxkIGJlIGtlcHQgdW5wcm9jZXNzZWQgaW4gdGhlIGJ1ZmZlci4gRGVmYXVsdDogMFxuXHQgICAgICovXG5cdCAgICB2YXIgQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IENfbGliLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgZGF0YSBidWZmZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLl9kYXRhID0gbmV3IFdvcmRBcnJheS5pbml0KCk7XG5cdCAgICAgICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgPSAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIG5ldyBkYXRhIHRvIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgYnVmZmVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGFwcGVuZC4gU3RyaW5ncyBhcmUgY29udmVydGVkIHRvIGEgV29yZEFycmF5IHVzaW5nIFVURi04LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQoJ2RhdGEnKTtcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2FwcGVuZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gV29yZEFycmF5LCBlbHNlIGFzc3VtZSBXb3JkQXJyYXkgYWxyZWFkeVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIGRhdGEgPSBVdGY4LnBhcnNlKGRhdGEpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2RhdGEuY29uY2F0KGRhdGEpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzICs9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFByb2Nlc3NlcyBhdmFpbGFibGUgZGF0YSBibG9ja3MuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBUaGlzIG1ldGhvZCBpbnZva2VzIF9kb1Byb2Nlc3NCbG9jayhvZmZzZXQpLCB3aGljaCBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IGEgY29uY3JldGUgc3VidHlwZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZG9GbHVzaCBXaGV0aGVyIGFsbCBibG9ja3MgYW5kIHBhcnRpYWwgYmxvY2tzIHNob3VsZCBiZSBwcm9jZXNzZWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBwcm9jZXNzZWQgZGF0YS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCk7XG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcyghISdmbHVzaCcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9wcm9jZXNzOiBmdW5jdGlvbiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGRhdGFTaWdCeXRlcyA9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSB0aGlzLmJsb2NrU2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZUJ5dGVzID0gYmxvY2tTaXplICogNDtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBibG9ja3MgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CbG9ja3NSZWFkeSA9IGRhdGFTaWdCeXRlcyAvIGJsb2NrU2l6ZUJ5dGVzO1xuXHQgICAgICAgICAgICBpZiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgdXAgdG8gaW5jbHVkZSBwYXJ0aWFsIGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5jZWlsKG5CbG9ja3NSZWFkeSk7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBSb3VuZCBkb3duIHRvIGluY2x1ZGUgb25seSBmdWxsIGJsb2Nrcyxcblx0ICAgICAgICAgICAgICAgIC8vIGxlc3MgdGhlIG51bWJlciBvZiBibG9ja3MgdGhhdCBtdXN0IHJlbWFpbiBpbiB0aGUgYnVmZmVyXG5cdCAgICAgICAgICAgICAgICBuQmxvY2tzUmVhZHkgPSBNYXRoLm1heCgobkJsb2Nrc1JlYWR5IHwgMCkgLSB0aGlzLl9taW5CdWZmZXJTaXplLCAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIENvdW50IHdvcmRzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuV29yZHNSZWFkeSA9IG5CbG9ja3NSZWFkeSAqIGJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBieXRlcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbkJ5dGVzUmVhZHkgPSBNYXRoLm1pbihuV29yZHNSZWFkeSAqIDQsIGRhdGFTaWdCeXRlcyk7XG5cblx0ICAgICAgICAgICAgLy8gUHJvY2VzcyBibG9ja3Ncblx0ICAgICAgICAgICAgaWYgKG5Xb3Jkc1JlYWR5KSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBuV29yZHNSZWFkeTsgb2Zmc2V0ICs9IGJsb2NrU2l6ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtYWxnb3JpdGhtIGxvZ2ljXG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG9Qcm9jZXNzQmxvY2soZGF0YVdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc2VkV29yZHMgPSBkYXRhV29yZHMuc3BsaWNlKDAsIG5Xb3Jkc1JlYWR5KTtcblx0ICAgICAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgLT0gbkJ5dGVzUmVhZHk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQocHJvY2Vzc2VkV29yZHMsIG5CeXRlc1JlYWR5KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2RhdGEgPSB0aGlzLl9kYXRhLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWluQnVmZmVyU2l6ZTogMFxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgaGFzaGVyIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIG51bWJlciBvZiAzMi1iaXQgd29yZHMgdGhpcyBoYXNoZXIgb3BlcmF0ZXMgb24uIERlZmF1bHQ6IDE2ICg1MTIgYml0cylcblx0ICAgICAqL1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlciA9IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCgpLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaGVyID0gQ3J5cHRvSlMuYWxnby5TSEEyNTYuY3JlYXRlKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBoYXNoZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFJlc2V0IGRhdGEgYnVmZmVyXG5cdCAgICAgICAgICAgIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xuXHQgICAgICAgICAgICB0aGlzLl9kb1Jlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVwZGF0ZXMgdGhpcyBoYXNoZXIgd2l0aCBhIG1lc3NhZ2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgVGhlIG1lc3NhZ2UgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7SGFzaGVyfSBUaGlzIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICBoYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaGFzaFxuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIGhhc2ggY29tcHV0YXRpb24uXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSAoT3B0aW9uYWwpIEEgZmluYWwgbWVzc2FnZSB1cGRhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBGaW5hbCBtZXNzYWdlIHVwZGF0ZVxuXHQgICAgICAgICAgICBpZiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9kb0ZpbmFsaXplKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogNTEyLzMyLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIGEgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byBjcmVhdGUgYSBoZWxwZXIgZm9yLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIFNIQTI1NiA9IENyeXB0b0pTLmxpYi5IYXNoZXIuX2NyZWF0ZUhlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGNmZykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBoYXNoZXIuaW5pdChjZmcpLmZpbmFsaXplKG1lc3NhZ2UpO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgc2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIHVzZSBpbiB0aGlzIEhNQUMgaGVscGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIEhtYWNTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKENyeXB0b0pTLmFsZ28uU0hBMjU2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSG1hY0hlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDX2FsZ28uSE1BQy5pbml0KGhhc2hlciwga2V5KS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbGdvcml0aG0gbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvID0ge307XG5cblx0ICAgIHJldHVybiBDO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEJhc2U2NCBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJhc2U2NCA9IENfZW5jLkJhc2U2NCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBCYXNlNjQgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIEJhc2U2NCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBiYXNlNjRTdHJpbmcgPSBDcnlwdG9KUy5lbmMuQmFzZTY0LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciBtYXAgPSB0aGlzLl9tYXA7XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcblx0ICAgICAgICAgICAgd29yZEFycmF5LmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgYmFzZTY0Q2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSArPSAzKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYnl0ZTEgPSAod29yZHNbaSA+Pj4gMl0gICAgICAgPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgICAgICAgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgdmFyIGJ5dGUyID0gKHdvcmRzWyhpICsgMSkgPj4+IDJdID4+PiAoMjQgLSAoKGkgKyAxKSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIHZhciBieXRlMyA9ICh3b3Jkc1soaSArIDIpID4+PiAyXSA+Pj4gKDI0IC0gKChpICsgMikgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cblx0ICAgICAgICAgICAgICAgIHZhciB0cmlwbGV0ID0gKGJ5dGUxIDw8IDE2KSB8IChieXRlMiA8PCA4KSB8IGJ5dGUzO1xuXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgKGogPCA0KSAmJiAoaSArIGogKiAwLjc1IDwgc2lnQnl0ZXMpOyBqKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBiYXNlNjRDaGFycy5wdXNoKG1hcC5jaGFyQXQoKHRyaXBsZXQgPj4+ICg2ICogKDMgLSBqKSkpICYgMHgzZikpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmdDaGFyID0gbWFwLmNoYXJBdCg2NCk7XG5cdCAgICAgICAgICAgIGlmIChwYWRkaW5nQ2hhcikge1xuXHQgICAgICAgICAgICAgICAgd2hpbGUgKGJhc2U2NENoYXJzLmxlbmd0aCAlIDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBiYXNlNjRDaGFycy5wdXNoKHBhZGRpbmdDaGFyKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBiYXNlNjRDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBCYXNlNjQgc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlNjRTdHIgVGhlIEJhc2U2NCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkJhc2U2NC5wYXJzZShiYXNlNjRTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoYmFzZTY0U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgYmFzZTY0U3RyTGVuZ3RoID0gYmFzZTY0U3RyLmxlbmd0aDtcblx0ICAgICAgICAgICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcblx0ICAgICAgICAgICAgdmFyIHJldmVyc2VNYXAgPSB0aGlzLl9yZXZlcnNlTWFwO1xuXG5cdCAgICAgICAgICAgIGlmICghcmV2ZXJzZU1hcCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldmVyc2VNYXAgPSB0aGlzLl9yZXZlcnNlTWFwID0gW107XG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBtYXAubGVuZ3RoOyBqKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZU1hcFttYXAuY2hhckNvZGVBdChqKV0gPSBqO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIElnbm9yZSBwYWRkaW5nXG5cdCAgICAgICAgICAgIHZhciBwYWRkaW5nQ2hhciA9IG1hcC5jaGFyQXQoNjQpO1xuXHQgICAgICAgICAgICBpZiAocGFkZGluZ0NoYXIpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBwYWRkaW5nSW5kZXggPSBiYXNlNjRTdHIuaW5kZXhPZihwYWRkaW5nQ2hhcik7XG5cdCAgICAgICAgICAgICAgICBpZiAocGFkZGluZ0luZGV4ICE9PSAtMSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NFN0ckxlbmd0aCA9IHBhZGRpbmdJbmRleDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgcmV0dXJuIHBhcnNlTG9vcChiYXNlNjRTdHIsIGJhc2U2NFN0ckxlbmd0aCwgcmV2ZXJzZU1hcCk7XG5cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21hcDogJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89J1xuXHQgICAgfTtcblxuXHQgICAgZnVuY3Rpb24gcGFyc2VMb29wKGJhc2U2NFN0ciwgYmFzZTY0U3RyTGVuZ3RoLCByZXZlcnNlTWFwKSB7XG5cdCAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICB2YXIgbkJ5dGVzID0gMDtcblx0ICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiYXNlNjRTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgaWYgKGkgJSA0KSB7XG5cdCAgICAgICAgICAgICAgdmFyIGJpdHMxID0gcmV2ZXJzZU1hcFtiYXNlNjRTdHIuY2hhckNvZGVBdChpIC0gMSldIDw8ICgoaSAlIDQpICogMik7XG5cdCAgICAgICAgICAgICAgdmFyIGJpdHMyID0gcmV2ZXJzZU1hcFtiYXNlNjRTdHIuY2hhckNvZGVBdChpKV0gPj4+ICg2IC0gKGkgJSA0KSAqIDIpO1xuXHQgICAgICAgICAgICAgIHdvcmRzW25CeXRlcyA+Pj4gMl0gfD0gKGJpdHMxIHwgYml0czIpIDw8ICgyNCAtIChuQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgIG5CeXRlcysrO1xuXHQgICAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICAgIHJldHVybiBXb3JkQXJyYXkuY3JlYXRlKHdvcmRzLCBuQnl0ZXMpO1xuXHQgICAgfVxuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLmVuYy5CYXNlNjQ7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblxuXHQgICAgLyoqXG5cdCAgICAgKiBVVEYtMTYgQkUgZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBVdGYxNkJFID0gQ19lbmMuVXRmMTYgPSBDX2VuYy5VdGYxNkJFID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIFVURi0xNiBCRSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgVVRGLTE2IEJFIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjE2U3RyaW5nID0gQ3J5cHRvSlMuZW5jLlV0ZjE2LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgdXRmMTZDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBjb2RlUG9pbnQgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgxNiAtIChpICUgNCkgKiA4KSkgJiAweGZmZmY7XG5cdCAgICAgICAgICAgICAgICB1dGYxNkNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiB1dGYxNkNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIFVURi0xNiBCRSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjE2U3RyIFRoZSBVVEYtMTYgQkUgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5VdGYxNi5wYXJzZSh1dGYxNlN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uICh1dGYxNlN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgdXRmMTZTdHJMZW5ndGggPSB1dGYxNlN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1dGYxNlN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAxXSB8PSB1dGYxNlN0ci5jaGFyQ29kZUF0KGkpIDw8ICgxNiAtIChpICUgMikgKiAxNik7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gV29yZEFycmF5LmNyZWF0ZSh3b3JkcywgdXRmMTZTdHJMZW5ndGggKiAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi0xNiBMRSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgQ19lbmMuVXRmMTZMRSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBVVEYtMTYgTEUgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi0xNiBMRSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB1dGYxNlN0ciA9IENyeXB0b0pTLmVuYy5VdGYxNkxFLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgdXRmMTZDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBjb2RlUG9pbnQgPSBzd2FwRW5kaWFuKCh3b3Jkc1tpID4+PiAyXSA+Pj4gKDE2IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmZmZik7XG5cdCAgICAgICAgICAgICAgICB1dGYxNkNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiB1dGYxNkNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIFVURi0xNiBMRSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjE2U3RyIFRoZSBVVEYtMTYgTEUgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5VdGYxNkxFLnBhcnNlKHV0ZjE2U3RyKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjE2U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciB1dGYxNlN0ckxlbmd0aCA9IHV0ZjE2U3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHV0ZjE2U3RyTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDFdIHw9IHN3YXBFbmRpYW4odXRmMTZTdHIuY2hhckNvZGVBdChpKSA8PCAoMTYgLSAoaSAlIDIpICogMTYpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBXb3JkQXJyYXkuY3JlYXRlKHdvcmRzLCB1dGYxNlN0ckxlbmd0aCAqIDIpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIGZ1bmN0aW9uIHN3YXBFbmRpYW4od29yZCkge1xuXHQgICAgICAgIHJldHVybiAoKHdvcmQgPDwgOCkgJiAweGZmMDBmZjAwKSB8ICgod29yZCA+Pj4gOCkgJiAweDAwZmYwMGZmKTtcblx0ICAgIH1cblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5lbmMuVXRmMTY7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vc2hhMVwiKSwgcmVxdWlyZShcIi4vaG1hY1wiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9zaGExXCIsIFwiLi9obWFjXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2U7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblx0ICAgIHZhciBNRDUgPSBDX2FsZ28uTUQ1O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFRoaXMga2V5IGRlcml2YXRpb24gZnVuY3Rpb24gaXMgbWVhbnQgdG8gY29uZm9ybSB3aXRoIEVWUF9CeXRlc1RvS2V5LlxuXHQgICAgICogd3d3Lm9wZW5zc2wub3JnL2RvY3MvY3J5cHRvL0VWUF9CeXRlc1RvS2V5Lmh0bWxcblx0ICAgICAqL1xuXHQgICAgdmFyIEV2cEtERiA9IENfYWxnby5FdnBLREYgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGtleVNpemUgVGhlIGtleSBzaXplIGluIHdvcmRzIHRvIGdlbmVyYXRlLiBEZWZhdWx0OiA0ICgxMjggYml0cylcblx0ICAgICAgICAgKiBAcHJvcGVydHkge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoIGFsZ29yaXRobSB0byB1c2UuIERlZmF1bHQ6IE1ENVxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpdGVyYXRpb25zIFRoZSBudW1iZXIgb2YgaXRlcmF0aW9ucyB0byBwZXJmb3JtLiBEZWZhdWx0OiAxXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgIGtleVNpemU6IDEyOC8zMixcblx0ICAgICAgICAgICAgaGFzaGVyOiBNRDUsXG5cdCAgICAgICAgICAgIGl0ZXJhdGlvbnM6IDFcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhlIGRlcml2YXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLkV2cEtERi5jcmVhdGUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGtkZiA9IENyeXB0b0pTLmFsZ28uRXZwS0RGLmNyZWF0ZSh7IGtleVNpemU6IDggfSk7XG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLkV2cEtERi5jcmVhdGUoeyBrZXlTaXplOiA4LCBpdGVyYXRpb25zOiAxMDAwIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRGVyaXZlcyBhIGtleSBmcm9tIGEgcGFzc3dvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHNhbHQgQSBzYWx0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGVyaXZlZCBrZXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBrZXkgPSBrZGYuY29tcHV0ZShwYXNzd29yZCwgc2FsdCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY29tcHV0ZTogZnVuY3Rpb24gKHBhc3N3b3JkLCBzYWx0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBjZmcgPSB0aGlzLmNmZztcblxuXHQgICAgICAgICAgICAvLyBJbml0IGhhc2hlclxuXHQgICAgICAgICAgICB2YXIgaGFzaGVyID0gY2ZnLmhhc2hlci5jcmVhdGUoKTtcblxuXHQgICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB2YXIgZGVyaXZlZEtleSA9IFdvcmRBcnJheS5jcmVhdGUoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRlcml2ZWRLZXlXb3JkcyA9IGRlcml2ZWRLZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBrZXlTaXplID0gY2ZnLmtleVNpemU7XG5cdCAgICAgICAgICAgIHZhciBpdGVyYXRpb25zID0gY2ZnLml0ZXJhdGlvbnM7XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUga2V5XG5cdCAgICAgICAgICAgIHdoaWxlIChkZXJpdmVkS2V5V29yZHMubGVuZ3RoIDwga2V5U2l6ZSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKGJsb2NrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaGFzaGVyLnVwZGF0ZShibG9jayk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB2YXIgYmxvY2sgPSBoYXNoZXIudXBkYXRlKHBhc3N3b3JkKS5maW5hbGl6ZShzYWx0KTtcblx0ICAgICAgICAgICAgICAgIGhhc2hlci5yZXNldCgpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBJdGVyYXRpb25zXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGl0ZXJhdGlvbnM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGJsb2NrID0gaGFzaGVyLmZpbmFsaXplKGJsb2NrKTtcblx0ICAgICAgICAgICAgICAgICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgZGVyaXZlZEtleS5jb25jYXQoYmxvY2spO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGRlcml2ZWRLZXkuc2lnQnl0ZXMgPSBrZXlTaXplICogNDtcblxuXHQgICAgICAgICAgICByZXR1cm4gZGVyaXZlZEtleTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBEZXJpdmVzIGEga2V5IGZyb20gYSBwYXNzd29yZC5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gc2FsdCBBIHNhbHQuXG5cdCAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgY29tcHV0YXRpb24uXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGVyaXZlZCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBrZXkgPSBDcnlwdG9KUy5FdnBLREYocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgICogICAgIHZhciBrZXkgPSBDcnlwdG9KUy5FdnBLREYocGFzc3dvcmQsIHNhbHQsIHsga2V5U2l6ZTogOCB9KTtcblx0ICAgICAqICAgICB2YXIga2V5ID0gQ3J5cHRvSlMuRXZwS0RGKHBhc3N3b3JkLCBzYWx0LCB7IGtleVNpemU6IDgsIGl0ZXJhdGlvbnM6IDEwMDAgfSk7XG5cdCAgICAgKi9cblx0ICAgIEMuRXZwS0RGID0gZnVuY3Rpb24gKHBhc3N3b3JkLCBzYWx0LCBjZmcpIHtcblx0ICAgICAgICByZXR1cm4gRXZwS0RGLmNyZWF0ZShjZmcpLmNvbXB1dGUocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgfTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5FdnBLREY7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAodW5kZWZpbmVkKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBDaXBoZXJQYXJhbXMgPSBDX2xpYi5DaXBoZXJQYXJhbXM7XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblx0ICAgIHZhciBIZXggPSBDX2VuYy5IZXg7XG5cdCAgICB2YXIgQ19mb3JtYXQgPSBDLmZvcm1hdDtcblxuXHQgICAgdmFyIEhleEZvcm1hdHRlciA9IENfZm9ybWF0LkhleCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGUgY2lwaGVydGV4dCBvZiBhIGNpcGhlciBwYXJhbXMgb2JqZWN0IHRvIGEgaGV4YWRlY2ltYWxseSBlbmNvZGVkIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyUGFyYW1zfSBjaXBoZXJQYXJhbXMgVGhlIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4YWRlY2ltYWxseSBlbmNvZGVkIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmZvcm1hdC5IZXguc3RyaW5naWZ5KGNpcGhlclBhcmFtcyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAoY2lwaGVyUGFyYW1zKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBjaXBoZXJQYXJhbXMuY2lwaGVydGV4dC50b1N0cmluZyhIZXgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIGhleGFkZWNpbWFsbHkgZW5jb2RlZCBjaXBoZXJ0ZXh0IHN0cmluZyB0byBhIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0IFRoZSBoZXhhZGVjaW1hbGx5IGVuY29kZWQgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyUGFyYW1zfSBUaGUgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJQYXJhbXMgPSBDcnlwdG9KUy5mb3JtYXQuSGV4LnBhcnNlKGhleFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChpbnB1dCkge1xuXHQgICAgICAgICAgICB2YXIgY2lwaGVydGV4dCA9IEhleC5wYXJzZShpbnB1dCk7XG5cdCAgICAgICAgICAgIHJldHVybiBDaXBoZXJQYXJhbXMuY3JlYXRlKHsgY2lwaGVydGV4dDogY2lwaGVydGV4dCB9KTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLmZvcm1hdC5IZXg7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZTtcblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jO1xuXHQgICAgdmFyIFV0ZjggPSBDX2VuYy5VdGY4O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLyoqXG5cdCAgICAgKiBITUFDIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEhNQUMgPSBDX2FsZ28uSE1BQyA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgSE1BQy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2ggYWxnb3JpdGhtIHRvIHVzZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWNIYXNoZXIgPSBDcnlwdG9KUy5hbGdvLkhNQUMuY3JlYXRlKENyeXB0b0pTLmFsZ28uU0hBMjU2LCBrZXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChoYXNoZXIsIGtleSkge1xuXHQgICAgICAgICAgICAvLyBJbml0IGhhc2hlclxuXHQgICAgICAgICAgICBoYXNoZXIgPSB0aGlzLl9oYXNoZXIgPSBuZXcgaGFzaGVyLmluaXQoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBXb3JkQXJyYXksIGVsc2UgYXNzdW1lIFdvcmRBcnJheSBhbHJlYWR5XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBrZXkgPSBVdGY4LnBhcnNlKGtleSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGhhc2hlckJsb2NrU2l6ZSA9IGhhc2hlci5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBoYXNoZXJCbG9ja1NpemVCeXRlcyA9IGhhc2hlckJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQWxsb3cgYXJiaXRyYXJ5IGxlbmd0aCBrZXlzXG5cdCAgICAgICAgICAgIGlmIChrZXkuc2lnQnl0ZXMgPiBoYXNoZXJCbG9ja1NpemVCeXRlcykge1xuXHQgICAgICAgICAgICAgICAga2V5ID0gaGFzaGVyLmZpbmFsaXplKGtleSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICBrZXkuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDbG9uZSBrZXkgZm9yIGlubmVyIGFuZCBvdXRlciBwYWRzXG5cdCAgICAgICAgICAgIHZhciBvS2V5ID0gdGhpcy5fb0tleSA9IGtleS5jbG9uZSgpO1xuXHQgICAgICAgICAgICB2YXIgaUtleSA9IHRoaXMuX2lLZXkgPSBrZXkuY2xvbmUoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIG9LZXlXb3JkcyA9IG9LZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBpS2V5V29yZHMgPSBpS2V5LndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFhPUiBrZXlzIHdpdGggcGFkIGNvbnN0YW50c1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhc2hlckJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBvS2V5V29yZHNbaV0gXj0gMHg1YzVjNWM1Yztcblx0ICAgICAgICAgICAgICAgIGlLZXlXb3Jkc1tpXSBePSAweDM2MzYzNjM2O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG9LZXkuc2lnQnl0ZXMgPSBpS2V5LnNpZ0J5dGVzID0gaGFzaGVyQmxvY2tTaXplQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgSE1BQyB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaG1hY0hhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoYXNoZXIgPSB0aGlzLl9oYXNoZXI7XG5cblx0ICAgICAgICAgICAgLy8gUmVzZXRcblx0ICAgICAgICAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICAgIGhhc2hlci51cGRhdGUodGhpcy5faUtleSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVwZGF0ZXMgdGhpcyBITUFDIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hNQUN9IFRoaXMgSE1BQyBpbnN0YW5jZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaG1hY0hhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaG1hY0hhc2hlci51cGRhdGUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2hlci51cGRhdGUobWVzc2FnZVVwZGF0ZSk7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIEhNQUMgY29tcHV0YXRpb24uXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSAoT3B0aW9uYWwpIEEgZmluYWwgbWVzc2FnZSB1cGRhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaG1hYyA9IGhtYWNIYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWMgPSBobWFjSGFzaGVyLmZpbmFsaXplKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIHZhciBobWFjID0gaG1hY0hhc2hlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaGFzaGVyID0gdGhpcy5faGFzaGVyO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgSE1BQ1xuXHQgICAgICAgICAgICB2YXIgaW5uZXJIYXNoID0gaGFzaGVyLmZpbmFsaXplKG1lc3NhZ2VVcGRhdGUpO1xuXHQgICAgICAgICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgICAgdmFyIGhtYWMgPSBoYXNoZXIuZmluYWxpemUodGhpcy5fb0tleS5jbG9uZSgpLmNvbmNhdChpbm5lckhhc2gpKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gaG1hYztcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblx0fSgpKTtcblxuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3g2NC1jb3JlXCIpLCByZXF1aXJlKFwiLi9saWItdHlwZWRhcnJheXNcIiksIHJlcXVpcmUoXCIuL2VuYy11dGYxNlwiKSwgcmVxdWlyZShcIi4vZW5jLWJhc2U2NFwiKSwgcmVxdWlyZShcIi4vbWQ1XCIpLCByZXF1aXJlKFwiLi9zaGExXCIpLCByZXF1aXJlKFwiLi9zaGEyNTZcIiksIHJlcXVpcmUoXCIuL3NoYTIyNFwiKSwgcmVxdWlyZShcIi4vc2hhNTEyXCIpLCByZXF1aXJlKFwiLi9zaGEzODRcIiksIHJlcXVpcmUoXCIuL3NoYTNcIiksIHJlcXVpcmUoXCIuL3JpcGVtZDE2MFwiKSwgcmVxdWlyZShcIi4vaG1hY1wiKSwgcmVxdWlyZShcIi4vcGJrZGYyXCIpLCByZXF1aXJlKFwiLi9ldnBrZGZcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpLCByZXF1aXJlKFwiLi9tb2RlLWNmYlwiKSwgcmVxdWlyZShcIi4vbW9kZS1jdHJcIiksIHJlcXVpcmUoXCIuL21vZGUtY3RyLWdsYWRtYW5cIiksIHJlcXVpcmUoXCIuL21vZGUtb2ZiXCIpLCByZXF1aXJlKFwiLi9tb2RlLWVjYlwiKSwgcmVxdWlyZShcIi4vcGFkLWFuc2l4OTIzXCIpLCByZXF1aXJlKFwiLi9wYWQtaXNvMTAxMjZcIiksIHJlcXVpcmUoXCIuL3BhZC1pc285Nzk3MVwiKSwgcmVxdWlyZShcIi4vcGFkLXplcm9wYWRkaW5nXCIpLCByZXF1aXJlKFwiLi9wYWQtbm9wYWRkaW5nXCIpLCByZXF1aXJlKFwiLi9mb3JtYXQtaGV4XCIpLCByZXF1aXJlKFwiLi9hZXNcIiksIHJlcXVpcmUoXCIuL3RyaXBsZWRlc1wiKSwgcmVxdWlyZShcIi4vcmM0XCIpLCByZXF1aXJlKFwiLi9yYWJiaXRcIiksIHJlcXVpcmUoXCIuL3JhYmJpdC1sZWdhY3lcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4veDY0LWNvcmVcIiwgXCIuL2xpYi10eXBlZGFycmF5c1wiLCBcIi4vZW5jLXV0ZjE2XCIsIFwiLi9lbmMtYmFzZTY0XCIsIFwiLi9tZDVcIiwgXCIuL3NoYTFcIiwgXCIuL3NoYTI1NlwiLCBcIi4vc2hhMjI0XCIsIFwiLi9zaGE1MTJcIiwgXCIuL3NoYTM4NFwiLCBcIi4vc2hhM1wiLCBcIi4vcmlwZW1kMTYwXCIsIFwiLi9obWFjXCIsIFwiLi9wYmtkZjJcIiwgXCIuL2V2cGtkZlwiLCBcIi4vY2lwaGVyLWNvcmVcIiwgXCIuL21vZGUtY2ZiXCIsIFwiLi9tb2RlLWN0clwiLCBcIi4vbW9kZS1jdHItZ2xhZG1hblwiLCBcIi4vbW9kZS1vZmJcIiwgXCIuL21vZGUtZWNiXCIsIFwiLi9wYWQtYW5zaXg5MjNcIiwgXCIuL3BhZC1pc28xMDEyNlwiLCBcIi4vcGFkLWlzbzk3OTcxXCIsIFwiLi9wYWQtemVyb3BhZGRpbmdcIiwgXCIuL3BhZC1ub3BhZGRpbmdcIiwgXCIuL2Zvcm1hdC1oZXhcIiwgXCIuL2Flc1wiLCBcIi4vdHJpcGxlZGVzXCIsIFwiLi9yYzRcIiwgXCIuL3JhYmJpdFwiLCBcIi4vcmFiYml0LWxlZ2FjeVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdHJvb3QuQ3J5cHRvSlMgPSBmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdHJldHVybiBDcnlwdG9KUztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIENoZWNrIGlmIHR5cGVkIGFycmF5cyBhcmUgc3VwcG9ydGVkXG5cdCAgICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICB9XG5cblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblxuXHQgICAgLy8gUmVmZXJlbmNlIG9yaWdpbmFsIGluaXRcblx0ICAgIHZhciBzdXBlckluaXQgPSBXb3JkQXJyYXkuaW5pdDtcblxuXHQgICAgLy8gQXVnbWVudCBXb3JkQXJyYXkuaW5pdCB0byBoYW5kbGUgdHlwZWQgYXJyYXlzXG5cdCAgICB2YXIgc3ViSW5pdCA9IFdvcmRBcnJheS5pbml0ID0gZnVuY3Rpb24gKHR5cGVkQXJyYXkpIHtcblx0ICAgICAgICAvLyBDb252ZXJ0IGJ1ZmZlcnMgdG8gdWludDhcblx0ICAgICAgICBpZiAodHlwZWRBcnJheSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG5cdCAgICAgICAgICAgIHR5cGVkQXJyYXkgPSBuZXcgVWludDhBcnJheSh0eXBlZEFycmF5KTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBDb252ZXJ0IG90aGVyIGFycmF5IHZpZXdzIHRvIHVpbnQ4XG5cdCAgICAgICAgaWYgKFxuXHQgICAgICAgICAgICB0eXBlZEFycmF5IGluc3RhbmNlb2YgSW50OEFycmF5IHx8XG5cdCAgICAgICAgICAgICh0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZWRBcnJheSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5KSB8fFxuXHQgICAgICAgICAgICB0eXBlZEFycmF5IGluc3RhbmNlb2YgSW50MTZBcnJheSB8fFxuXHQgICAgICAgICAgICB0eXBlZEFycmF5IGluc3RhbmNlb2YgVWludDE2QXJyYXkgfHxcblx0ICAgICAgICAgICAgdHlwZWRBcnJheSBpbnN0YW5jZW9mIEludDMyQXJyYXkgfHxcblx0ICAgICAgICAgICAgdHlwZWRBcnJheSBpbnN0YW5jZW9mIFVpbnQzMkFycmF5IHx8XG5cdCAgICAgICAgICAgIHR5cGVkQXJyYXkgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkgfHxcblx0ICAgICAgICAgICAgdHlwZWRBcnJheSBpbnN0YW5jZW9mIEZsb2F0NjRBcnJheVxuXHQgICAgICAgICkge1xuXHQgICAgICAgICAgICB0eXBlZEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodHlwZWRBcnJheS5idWZmZXIsIHR5cGVkQXJyYXkuYnl0ZU9mZnNldCwgdHlwZWRBcnJheS5ieXRlTGVuZ3RoKTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBIYW5kbGUgVWludDhBcnJheVxuXHQgICAgICAgIGlmICh0eXBlZEFycmF5IGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgdHlwZWRBcnJheUJ5dGVMZW5ndGggPSB0eXBlZEFycmF5LmJ5dGVMZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gRXh0cmFjdCBieXRlc1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlZEFycmF5Qnl0ZUxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAyXSB8PSB0eXBlZEFycmF5W2ldIDw8ICgyNCAtIChpICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhpcyB3b3JkIGFycmF5XG5cdCAgICAgICAgICAgIHN1cGVySW5pdC5jYWxsKHRoaXMsIHdvcmRzLCB0eXBlZEFycmF5Qnl0ZUxlbmd0aCk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgLy8gRWxzZSBjYWxsIG5vcm1hbCBpbml0XG5cdCAgICAgICAgICAgIHN1cGVySW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIHN1YkluaXQucHJvdG90eXBlID0gV29yZEFycmF5O1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLmxpYi5Xb3JkQXJyYXk7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoTWF0aCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIENvbnN0YW50cyB0YWJsZVxuXHQgICAgdmFyIFQgPSBbXTtcblxuXHQgICAgLy8gQ29tcHV0ZSBjb25zdGFudHNcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG5cdCAgICAgICAgICAgIFRbaV0gPSAoTWF0aC5hYnMoTWF0aC5zaW4oaSArIDEpKSAqIDB4MTAwMDAwMDAwKSB8IDA7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBNRDUgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBNRDUgPSBDX2FsZ28uTUQ1ID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICAweDY3NDUyMzAxLCAweGVmY2RhYjg5LFxuXHQgICAgICAgICAgICAgICAgMHg5OGJhZGNmZSwgMHgxMDMyNTQ3NlxuXHQgICAgICAgICAgICBdKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0X2kgPSBvZmZzZXQgKyBpO1xuXHQgICAgICAgICAgICAgICAgdmFyIE1fb2Zmc2V0X2kgPSBNW29mZnNldF9pXTtcblxuXHQgICAgICAgICAgICAgICAgTVtvZmZzZXRfaV0gPSAoXG5cdCAgICAgICAgICAgICAgICAgICAgKCgoTV9vZmZzZXRfaSA8PCA4KSAgfCAoTV9vZmZzZXRfaSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAoKChNX29mZnNldF9pIDw8IDI0KSB8IChNX29mZnNldF9pID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8wICA9IE1bb2Zmc2V0ICsgMF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xICA9IE1bb2Zmc2V0ICsgMV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8yICA9IE1bb2Zmc2V0ICsgMl07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8zICA9IE1bb2Zmc2V0ICsgM107XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF80ICA9IE1bb2Zmc2V0ICsgNF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF81ICA9IE1bb2Zmc2V0ICsgNV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF82ICA9IE1bb2Zmc2V0ICsgNl07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF83ICA9IE1bb2Zmc2V0ICsgN107XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF84ICA9IE1bb2Zmc2V0ICsgOF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF85ICA9IE1bb2Zmc2V0ICsgOV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMCA9IE1bb2Zmc2V0ICsgMTBdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTEgPSBNW29mZnNldCArIDExXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEyID0gTVtvZmZzZXQgKyAxMl07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMyA9IE1bb2Zmc2V0ICsgMTNdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTQgPSBNW29mZnNldCArIDE0XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzE1ID0gTVtvZmZzZXQgKyAxNV07XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWxiZXNcblx0ICAgICAgICAgICAgdmFyIGEgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgYiA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBjID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIGQgPSBIWzNdO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGF0aW9uXG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF8wLCAgNywgIFRbMF0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfMSwgIDEyLCBUWzFdKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzIsICAxNywgVFsyXSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF8zLCAgMjIsIFRbM10pO1xuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfNCwgIDcsICBUWzRdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzUsICAxMiwgVFs1XSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF82LCAgMTcsIFRbNl0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfNywgIDIyLCBUWzddKTtcblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzgsICA3LCAgVFs4XSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF85LCAgMTIsIFRbOV0pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTAsIDE3LCBUWzEwXSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF8xMSwgMjIsIFRbMTFdKTtcblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEyLCA3LCAgVFsxMl0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTMsIDEyLCBUWzEzXSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF8xNCwgMTcsIFRbMTRdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzE1LCAyMiwgVFsxNV0pO1xuXG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF8xLCAgNSwgIFRbMTZdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzYsICA5LCAgVFsxN10pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfMTEsIDE0LCBUWzE4XSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF8wLCAgMjAsIFRbMTldKTtcblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzUsICA1LCAgVFsyMF0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfMTAsIDksICBUWzIxXSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF8xNSwgMTQsIFRbMjJdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzQsICAyMCwgVFsyM10pO1xuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfOSwgIDUsICBUWzI0XSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF8xNCwgOSwgIFRbMjVdKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzMsICAxNCwgVFsyNl0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfOCwgIDIwLCBUWzI3XSk7XG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF8xMywgNSwgIFRbMjhdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzIsICA5LCAgVFsyOV0pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfNywgIDE0LCBUWzMwXSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF8xMiwgMjAsIFRbMzFdKTtcblxuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfNSwgIDQsICBUWzMyXSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF84LCAgMTEsIFRbMzNdKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzExLCAxNiwgVFszNF0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTQsIDIzLCBUWzM1XSk7XG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF8xLCAgNCwgIFRbMzZdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzQsICAxMSwgVFszN10pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfNywgIDE2LCBUWzM4XSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF8xMCwgMjMsIFRbMzldKTtcblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEzLCA0LCAgVFs0MF0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfMCwgIDExLCBUWzQxXSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF8zLCAgMTYsIFRbNDJdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzYsICAyMywgVFs0M10pO1xuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfOSwgIDQsICBUWzQ0XSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF8xMiwgMTEsIFRbNDVdKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE1LCAxNiwgVFs0Nl0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfMiwgIDIzLCBUWzQ3XSk7XG5cblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzAsICA2LCAgVFs0OF0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfNywgIDEwLCBUWzQ5XSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF8xNCwgMTUsIFRbNTBdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzUsICAyMSwgVFs1MV0pO1xuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfMTIsIDYsICBUWzUyXSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF8zLCAgMTAsIFRbNTNdKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzEwLCAxNSwgVFs1NF0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfMSwgIDIxLCBUWzU1XSk7XG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF84LCAgNiwgIFRbNTZdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzE1LCAxMCwgVFs1N10pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfNiwgIDE1LCBUWzU4XSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF8xMywgMjEsIFRbNTldKTtcblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzQsICA2LCAgVFs2MF0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTEsIDEwLCBUWzYxXSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF8yLCAgMTUsIFRbNjJdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzksICAyMSwgVFs2M10pO1xuXG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIEhbMF0gPSAoSFswXSArIGEpIHwgMDtcblx0ICAgICAgICAgICAgSFsxXSA9IChIWzFdICsgYikgfCAwO1xuXHQgICAgICAgICAgICBIWzJdID0gKEhbMl0gKyBjKSB8IDA7XG5cdCAgICAgICAgICAgIEhbM10gPSAoSFszXSArIGQpIHwgMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsSCA9IE1hdGguZmxvb3IobkJpdHNUb3RhbCAvIDB4MTAwMDAwMDAwKTtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWxMID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNV0gPSAoXG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsSCA8PCA4KSAgfCAobkJpdHNUb3RhbEggPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsSCA8PCAyNCkgfCAobkJpdHNUb3RhbEggPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IChcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxMIDw8IDgpICB8IChuQml0c1RvdGFsTCA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxMIDw8IDI0KSB8IChuQml0c1RvdGFsTCA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICk7XG5cblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IChkYXRhV29yZHMubGVuZ3RoICsgMSkgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9oYXNoO1xuXHQgICAgICAgICAgICB2YXIgSCA9IGhhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICB2YXIgSF9pID0gSFtpXTtcblxuXHQgICAgICAgICAgICAgICAgSFtpXSA9ICgoKEhfaSA8PCA4KSAgfCAoSF9pID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICAgICgoKEhfaSA8PCAyNCkgfCAoSF9pID4+PiA4KSkgICYgMHhmZjAwZmYwMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgZnVuY3Rpb24gRkYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArICgoYiAmIGMpIHwgKH5iICYgZCkpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gR0coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArICgoYiAmIGQpIHwgKGMgJiB+ZCkpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gSEgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArIChiIF4gYyBeIGQpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gSUkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArIChjIF4gKGIgfCB+ZCkpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLk1ENSgnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuTUQ1KHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuTUQ1ID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoTUQ1KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNNRDUobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjTUQ1ID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKE1ENSk7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLk1ENTtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0LyoqXG5cdCAqIENpcGhlciBGZWVkYmFjayBibG9jayBtb2RlLlxuXHQgKi9cblx0Q3J5cHRvSlMubW9kZS5DRkIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIENGQiA9IENyeXB0b0pTLmxpYi5CbG9ja0NpcGhlck1vZGUuZXh0ZW5kKCk7XG5cblx0ICAgIENGQi5FbmNyeXB0b3IgPSBDRkIuZXh0ZW5kKHtcblx0ICAgICAgICBwcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgY2lwaGVyID0gdGhpcy5fY2lwaGVyO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICBnZW5lcmF0ZUtleXN0cmVhbUFuZEVuY3J5cHQuY2FsbCh0aGlzLCB3b3Jkcywgb2Zmc2V0LCBibG9ja1NpemUsIGNpcGhlcik7XG5cblx0ICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhpcyBibG9jayB0byB1c2Ugd2l0aCBuZXh0IGJsb2NrXG5cdCAgICAgICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHdvcmRzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgYmxvY2tTaXplKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgQ0ZCLkRlY3J5cHRvciA9IENGQi5leHRlbmQoe1xuXHQgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXI7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSBjaXBoZXIuYmxvY2tTaXplO1xuXG5cdCAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoaXMgYmxvY2sgdG8gdXNlIHdpdGggbmV4dCBibG9ja1xuXHQgICAgICAgICAgICB2YXIgdGhpc0Jsb2NrID0gd29yZHMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBibG9ja1NpemUpO1xuXG5cdCAgICAgICAgICAgIGdlbmVyYXRlS2V5c3RyZWFtQW5kRW5jcnlwdC5jYWxsKHRoaXMsIHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSwgY2lwaGVyKTtcblxuXHQgICAgICAgICAgICAvLyBUaGlzIGJsb2NrIGJlY29tZXMgdGhlIHByZXZpb3VzIGJsb2NrXG5cdCAgICAgICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHRoaXNCbG9jaztcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgZnVuY3Rpb24gZ2VuZXJhdGVLZXlzdHJlYW1BbmRFbmNyeXB0KHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSwgY2lwaGVyKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICB2YXIgaXYgPSB0aGlzLl9pdjtcblxuXHQgICAgICAgIC8vIEdlbmVyYXRlIGtleXN0cmVhbVxuXHQgICAgICAgIGlmIChpdikge1xuXHQgICAgICAgICAgICB2YXIga2V5c3RyZWFtID0gaXYuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgLy8gUmVtb3ZlIElWIGZvciBzdWJzZXF1ZW50IGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9pdiA9IHVuZGVmaW5lZDtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB2YXIga2V5c3RyZWFtID0gdGhpcy5fcHJldkJsb2NrO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBjaXBoZXIuZW5jcnlwdEJsb2NrKGtleXN0cmVhbSwgMCk7XG5cblx0ICAgICAgICAvLyBFbmNyeXB0XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBibG9ja1NpemU7IGkrKykge1xuXHQgICAgICAgICAgICB3b3Jkc1tvZmZzZXQgKyBpXSBePSBrZXlzdHJlYW1baV07XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gQ0ZCO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLm1vZGUuQ0ZCO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKiogQHByZXNlcnZlXG5cdCAqIENvdW50ZXIgYmxvY2sgbW9kZSBjb21wYXRpYmxlIHdpdGggIERyIEJyaWFuIEdsYWRtYW4gZmlsZWVuYy5jXG5cdCAqIGRlcml2ZWQgZnJvbSBDcnlwdG9KUy5tb2RlLkNUUlxuXHQgKiBKYW4gSHJ1YnkgamhydWJ5LndlYkBnbWFpbC5jb21cblx0ICovXG5cdENyeXB0b0pTLm1vZGUuQ1RSR2xhZG1hbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgQ1RSR2xhZG1hbiA9IENyeXB0b0pTLmxpYi5CbG9ja0NpcGhlck1vZGUuZXh0ZW5kKCk7XG5cblx0XHRmdW5jdGlvbiBpbmNXb3JkKHdvcmQpXG5cdFx0e1xuXHRcdFx0aWYgKCgod29yZCA+PiAyNCkgJiAweGZmKSA9PT0gMHhmZikgeyAvL292ZXJmbG93XG5cdFx0XHR2YXIgYjEgPSAod29yZCA+PiAxNikmMHhmZjtcblx0XHRcdHZhciBiMiA9ICh3b3JkID4+IDgpJjB4ZmY7XG5cdFx0XHR2YXIgYjMgPSB3b3JkICYgMHhmZjtcblxuXHRcdFx0aWYgKGIxID09PSAweGZmKSAvLyBvdmVyZmxvdyBiMVxuXHRcdFx0e1xuXHRcdFx0YjEgPSAwO1xuXHRcdFx0aWYgKGIyID09PSAweGZmKVxuXHRcdFx0e1xuXHRcdFx0XHRiMiA9IDA7XG5cdFx0XHRcdGlmIChiMyA9PT0gMHhmZilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGIzID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQrK2IzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdCsrYjI7XG5cdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHQrK2IxO1xuXHRcdFx0fVxuXG5cdFx0XHR3b3JkID0gMDtcblx0XHRcdHdvcmQgKz0gKGIxIDw8IDE2KTtcblx0XHRcdHdvcmQgKz0gKGIyIDw8IDgpO1xuXHRcdFx0d29yZCArPSBiMztcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdHdvcmQgKz0gKDB4MDEgPDwgMjQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHdvcmQ7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gaW5jQ291bnRlcihjb3VudGVyKVxuXHRcdHtcblx0XHRcdGlmICgoY291bnRlclswXSA9IGluY1dvcmQoY291bnRlclswXSkpID09PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBlbmNyX2RhdGEgaW4gZmlsZWVuYy5jIGZyb20gIERyIEJyaWFuIEdsYWRtYW4ncyBjb3VudHMgb25seSB3aXRoIERXT1JEIGogPCA4XG5cdFx0XHRcdGNvdW50ZXJbMV0gPSBpbmNXb3JkKGNvdW50ZXJbMV0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNvdW50ZXI7XG5cdFx0fVxuXG5cdCAgICB2YXIgRW5jcnlwdG9yID0gQ1RSR2xhZG1hbi5FbmNyeXB0b3IgPSBDVFJHbGFkbWFuLmV4dGVuZCh7XG5cdCAgICAgICAgcHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGNpcGhlciA9IHRoaXMuX2NpcGhlclxuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGl2ID0gdGhpcy5faXY7XG5cdCAgICAgICAgICAgIHZhciBjb3VudGVyID0gdGhpcy5fY291bnRlcjtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBrZXlzdHJlYW1cblx0ICAgICAgICAgICAgaWYgKGl2KSB7XG5cdCAgICAgICAgICAgICAgICBjb3VudGVyID0gdGhpcy5fY291bnRlciA9IGl2LnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgSVYgZm9yIHN1YnNlcXVlbnQgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICB0aGlzLl9pdiA9IHVuZGVmaW5lZDtcblx0ICAgICAgICAgICAgfVxuXG5cdFx0XHRcdGluY0NvdW50ZXIoY291bnRlcik7XG5cblx0XHRcdFx0dmFyIGtleXN0cmVhbSA9IGNvdW50ZXIuc2xpY2UoMCk7XG5cdCAgICAgICAgICAgIGNpcGhlci5lbmNyeXB0QmxvY2soa2V5c3RyZWFtLCAwKTtcblxuXHQgICAgICAgICAgICAvLyBFbmNyeXB0XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tTaXplOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW29mZnNldCArIGldIF49IGtleXN0cmVhbVtpXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBDVFJHbGFkbWFuLkRlY3J5cHRvciA9IEVuY3J5cHRvcjtcblxuXHQgICAgcmV0dXJuIENUUkdsYWRtYW47XG5cdH0oKSk7XG5cblxuXG5cblx0cmV0dXJuIENyeXB0b0pTLm1vZGUuQ1RSR2xhZG1hbjtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0LyoqXG5cdCAqIENvdW50ZXIgYmxvY2sgbW9kZS5cblx0ICovXG5cdENyeXB0b0pTLm1vZGUuQ1RSID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBDVFIgPSBDcnlwdG9KUy5saWIuQmxvY2tDaXBoZXJNb2RlLmV4dGVuZCgpO1xuXG5cdCAgICB2YXIgRW5jcnlwdG9yID0gQ1RSLkVuY3J5cHRvciA9IENUUi5leHRlbmQoe1xuXHQgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXJcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IGNpcGhlci5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBpdiA9IHRoaXMuX2l2O1xuXHQgICAgICAgICAgICB2YXIgY291bnRlciA9IHRoaXMuX2NvdW50ZXI7XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUga2V5c3RyZWFtXG5cdCAgICAgICAgICAgIGlmIChpdikge1xuXHQgICAgICAgICAgICAgICAgY291bnRlciA9IHRoaXMuX2NvdW50ZXIgPSBpdi5zbGljZSgwKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIElWIGZvciBzdWJzZXF1ZW50IGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgdGhpcy5faXYgPSB1bmRlZmluZWQ7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIGtleXN0cmVhbSA9IGNvdW50ZXIuc2xpY2UoMCk7XG5cdCAgICAgICAgICAgIGNpcGhlci5lbmNyeXB0QmxvY2soa2V5c3RyZWFtLCAwKTtcblxuXHQgICAgICAgICAgICAvLyBJbmNyZW1lbnQgY291bnRlclxuXHQgICAgICAgICAgICBjb3VudGVyW2Jsb2NrU2l6ZSAtIDFdID0gKGNvdW50ZXJbYmxvY2tTaXplIC0gMV0gKyAxKSB8IDBcblxuXHQgICAgICAgICAgICAvLyBFbmNyeXB0XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tTaXplOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW29mZnNldCArIGldIF49IGtleXN0cmVhbVtpXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBDVFIuRGVjcnlwdG9yID0gRW5jcnlwdG9yO1xuXG5cdCAgICByZXR1cm4gQ1RSO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLm1vZGUuQ1RSO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKipcblx0ICogRWxlY3Ryb25pYyBDb2RlYm9vayBibG9jayBtb2RlLlxuXHQgKi9cblx0Q3J5cHRvSlMubW9kZS5FQ0IgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIEVDQiA9IENyeXB0b0pTLmxpYi5CbG9ja0NpcGhlck1vZGUuZXh0ZW5kKCk7XG5cblx0ICAgIEVDQi5FbmNyeXB0b3IgPSBFQ0IuZXh0ZW5kKHtcblx0ICAgICAgICBwcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2NpcGhlci5lbmNyeXB0QmxvY2sod29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIEVDQi5EZWNyeXB0b3IgPSBFQ0IuZXh0ZW5kKHtcblx0ICAgICAgICBwcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2NpcGhlci5kZWNyeXB0QmxvY2sod29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIHJldHVybiBFQ0I7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMubW9kZS5FQ0I7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdC8qKlxuXHQgKiBPdXRwdXQgRmVlZGJhY2sgYmxvY2sgbW9kZS5cblx0ICovXG5cdENyeXB0b0pTLm1vZGUuT0ZCID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBPRkIgPSBDcnlwdG9KUy5saWIuQmxvY2tDaXBoZXJNb2RlLmV4dGVuZCgpO1xuXG5cdCAgICB2YXIgRW5jcnlwdG9yID0gT0ZCLkVuY3J5cHRvciA9IE9GQi5leHRlbmQoe1xuXHQgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXJcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IGNpcGhlci5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBpdiA9IHRoaXMuX2l2O1xuXHQgICAgICAgICAgICB2YXIga2V5c3RyZWFtID0gdGhpcy5fa2V5c3RyZWFtO1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGtleXN0cmVhbVxuXHQgICAgICAgICAgICBpZiAoaXYpIHtcblx0ICAgICAgICAgICAgICAgIGtleXN0cmVhbSA9IHRoaXMuX2tleXN0cmVhbSA9IGl2LnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgSVYgZm9yIHN1YnNlcXVlbnQgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICB0aGlzLl9pdiA9IHVuZGVmaW5lZDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBjaXBoZXIuZW5jcnlwdEJsb2NrKGtleXN0cmVhbSwgMCk7XG5cblx0ICAgICAgICAgICAgLy8gRW5jcnlwdFxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tvZmZzZXQgKyBpXSBePSBrZXlzdHJlYW1baV07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgT0ZCLkRlY3J5cHRvciA9IEVuY3J5cHRvcjtcblxuXHQgICAgcmV0dXJuIE9GQjtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5tb2RlLk9GQjtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0LyoqXG5cdCAqIEFOU0kgWC45MjMgcGFkZGluZyBzdHJhdGVneS5cblx0ICovXG5cdENyeXB0b0pTLnBhZC5BbnNpWDkyMyA9IHtcblx0ICAgIHBhZDogZnVuY3Rpb24gKGRhdGEsIGJsb2NrU2l6ZSkge1xuXHQgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAvLyBDb3VudCBwYWRkaW5nIGJ5dGVzXG5cdCAgICAgICAgdmFyIG5QYWRkaW5nQnl0ZXMgPSBibG9ja1NpemVCeXRlcyAtIGRhdGFTaWdCeXRlcyAlIGJsb2NrU2l6ZUJ5dGVzO1xuXG5cdCAgICAgICAgLy8gQ29tcHV0ZSBsYXN0IGJ5dGUgcG9zaXRpb25cblx0ICAgICAgICB2YXIgbGFzdEJ5dGVQb3MgPSBkYXRhU2lnQnl0ZXMgKyBuUGFkZGluZ0J5dGVzIC0gMTtcblxuXHQgICAgICAgIC8vIFBhZFxuXHQgICAgICAgIGRhdGEuY2xhbXAoKTtcblx0ICAgICAgICBkYXRhLndvcmRzW2xhc3RCeXRlUG9zID4+PiAyXSB8PSBuUGFkZGluZ0J5dGVzIDw8ICgyNCAtIChsYXN0Qnl0ZVBvcyAlIDQpICogOCk7XG5cdCAgICAgICAgZGF0YS5zaWdCeXRlcyArPSBuUGFkZGluZ0J5dGVzO1xuXHQgICAgfSxcblxuXHQgICAgdW5wYWQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgLy8gR2V0IG51bWJlciBvZiBwYWRkaW5nIGJ5dGVzIGZyb20gbGFzdCBieXRlXG5cdCAgICAgICAgdmFyIG5QYWRkaW5nQnl0ZXMgPSBkYXRhLndvcmRzWyhkYXRhLnNpZ0J5dGVzIC0gMSkgPj4+IDJdICYgMHhmZjtcblxuXHQgICAgICAgIC8vIFJlbW92ZSBwYWRkaW5nXG5cdCAgICAgICAgZGF0YS5zaWdCeXRlcyAtPSBuUGFkZGluZ0J5dGVzO1xuXHQgICAgfVxuXHR9O1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLnBhZC5BbnNpeDkyMztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0LyoqXG5cdCAqIElTTyAxMDEyNiBwYWRkaW5nIHN0cmF0ZWd5LlxuXHQgKi9cblx0Q3J5cHRvSlMucGFkLklzbzEwMTI2ID0ge1xuXHQgICAgcGFkOiBmdW5jdGlvbiAoZGF0YSwgYmxvY2tTaXplKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICB2YXIgYmxvY2tTaXplQnl0ZXMgPSBibG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgLy8gQ291bnQgcGFkZGluZyBieXRlc1xuXHQgICAgICAgIHZhciBuUGFkZGluZ0J5dGVzID0gYmxvY2tTaXplQnl0ZXMgLSBkYXRhLnNpZ0J5dGVzICUgYmxvY2tTaXplQnl0ZXM7XG5cblx0ICAgICAgICAvLyBQYWRcblx0ICAgICAgICBkYXRhLmNvbmNhdChDcnlwdG9KUy5saWIuV29yZEFycmF5LnJhbmRvbShuUGFkZGluZ0J5dGVzIC0gMSkpLlxuXHQgICAgICAgICAgICAgY29uY2F0KENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFtuUGFkZGluZ0J5dGVzIDw8IDI0XSwgMSkpO1xuXHQgICAgfSxcblxuXHQgICAgdW5wYWQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgLy8gR2V0IG51bWJlciBvZiBwYWRkaW5nIGJ5dGVzIGZyb20gbGFzdCBieXRlXG5cdCAgICAgICAgdmFyIG5QYWRkaW5nQnl0ZXMgPSBkYXRhLndvcmRzWyhkYXRhLnNpZ0J5dGVzIC0gMSkgPj4+IDJdICYgMHhmZjtcblxuXHQgICAgICAgIC8vIFJlbW92ZSBwYWRkaW5nXG5cdCAgICAgICAgZGF0YS5zaWdCeXRlcyAtPSBuUGFkZGluZ0J5dGVzO1xuXHQgICAgfVxuXHR9O1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLnBhZC5Jc28xMDEyNjtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0LyoqXG5cdCAqIElTTy9JRUMgOTc5Ny0xIFBhZGRpbmcgTWV0aG9kIDIuXG5cdCAqL1xuXHRDcnlwdG9KUy5wYWQuSXNvOTc5NzEgPSB7XG5cdCAgICBwYWQ6IGZ1bmN0aW9uIChkYXRhLCBibG9ja1NpemUpIHtcblx0ICAgICAgICAvLyBBZGQgMHg4MCBieXRlXG5cdCAgICAgICAgZGF0YS5jb25jYXQoQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4ODAwMDAwMDBdLCAxKSk7XG5cblx0ICAgICAgICAvLyBaZXJvIHBhZCB0aGUgcmVzdFxuXHQgICAgICAgIENyeXB0b0pTLnBhZC5aZXJvUGFkZGluZy5wYWQoZGF0YSwgYmxvY2tTaXplKTtcblx0ICAgIH0sXG5cblx0ICAgIHVucGFkOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgICAgIC8vIFJlbW92ZSB6ZXJvIHBhZGRpbmdcblx0ICAgICAgICBDcnlwdG9KUy5wYWQuWmVyb1BhZGRpbmcudW5wYWQoZGF0YSk7XG5cblx0ICAgICAgICAvLyBSZW1vdmUgb25lIG1vcmUgYnl0ZSAtLSB0aGUgMHg4MCBieXRlXG5cdCAgICAgICAgZGF0YS5zaWdCeXRlcy0tO1xuXHQgICAgfVxuXHR9O1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLnBhZC5Jc285Nzk3MTtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0LyoqXG5cdCAqIEEgbm9vcCBwYWRkaW5nIHN0cmF0ZWd5LlxuXHQgKi9cblx0Q3J5cHRvSlMucGFkLk5vUGFkZGluZyA9IHtcblx0ICAgIHBhZDogZnVuY3Rpb24gKCkge1xuXHQgICAgfSxcblxuXHQgICAgdW5wYWQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIH1cblx0fTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5wYWQuTm9QYWRkaW5nO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKipcblx0ICogWmVybyBwYWRkaW5nIHN0cmF0ZWd5LlxuXHQgKi9cblx0Q3J5cHRvSlMucGFkLlplcm9QYWRkaW5nID0ge1xuXHQgICAgcGFkOiBmdW5jdGlvbiAoZGF0YSwgYmxvY2tTaXplKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICB2YXIgYmxvY2tTaXplQnl0ZXMgPSBibG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgLy8gUGFkXG5cdCAgICAgICAgZGF0YS5jbGFtcCgpO1xuXHQgICAgICAgIGRhdGEuc2lnQnl0ZXMgKz0gYmxvY2tTaXplQnl0ZXMgLSAoKGRhdGEuc2lnQnl0ZXMgJSBibG9ja1NpemVCeXRlcykgfHwgYmxvY2tTaXplQnl0ZXMpO1xuXHQgICAgfSxcblxuXHQgICAgdW5wYWQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgIC8vIFVucGFkXG5cdCAgICAgICAgdmFyIGkgPSBkYXRhLnNpZ0J5dGVzIC0gMTtcblx0ICAgICAgICB3aGlsZSAoISgoZGF0YVdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZikpIHtcblx0ICAgICAgICAgICAgaS0tO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBkYXRhLnNpZ0J5dGVzID0gaSArIDE7XG5cdCAgICB9XG5cdH07XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMucGFkLlplcm9QYWRkaW5nO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3NoYTFcIiksIHJlcXVpcmUoXCIuL2htYWNcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vc2hhMVwiLCBcIi4vaG1hY1wiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cdCAgICB2YXIgU0hBMSA9IENfYWxnby5TSEExO1xuXHQgICAgdmFyIEhNQUMgPSBDX2FsZ28uSE1BQztcblxuXHQgICAgLyoqXG5cdCAgICAgKiBQYXNzd29yZC1CYXNlZCBLZXkgRGVyaXZhdGlvbiBGdW5jdGlvbiAyIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFBCS0RGMiA9IENfYWxnby5QQktERjIgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGtleVNpemUgVGhlIGtleSBzaXplIGluIHdvcmRzIHRvIGdlbmVyYXRlLiBEZWZhdWx0OiA0ICgxMjggYml0cylcblx0ICAgICAgICAgKiBAcHJvcGVydHkge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gdXNlLiBEZWZhdWx0OiBTSEExXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGl0ZXJhdGlvbnMgVGhlIG51bWJlciBvZiBpdGVyYXRpb25zIHRvIHBlcmZvcm0uIERlZmF1bHQ6IDFcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAga2V5U2l6ZTogMTI4LzMyLFxuXHQgICAgICAgICAgICBoYXNoZXI6IFNIQTEsXG5cdCAgICAgICAgICAgIGl0ZXJhdGlvbnM6IDFcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhlIGRlcml2YXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLlBCS0RGMi5jcmVhdGUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGtkZiA9IENyeXB0b0pTLmFsZ28uUEJLREYyLmNyZWF0ZSh7IGtleVNpemU6IDggfSk7XG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLlBCS0RGMi5jcmVhdGUoeyBrZXlTaXplOiA4LCBpdGVyYXRpb25zOiAxMDAwIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29tcHV0ZXMgdGhlIFBhc3N3b3JkLUJhc2VkIEtleSBEZXJpdmF0aW9uIEZ1bmN0aW9uIDIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHNhbHQgQSBzYWx0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGVyaXZlZCBrZXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBrZXkgPSBrZGYuY29tcHV0ZShwYXNzd29yZCwgc2FsdCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY29tcHV0ZTogZnVuY3Rpb24gKHBhc3N3b3JkLCBzYWx0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBjZmcgPSB0aGlzLmNmZztcblxuXHQgICAgICAgICAgICAvLyBJbml0IEhNQUNcblx0ICAgICAgICAgICAgdmFyIGhtYWMgPSBITUFDLmNyZWF0ZShjZmcuaGFzaGVyLCBwYXNzd29yZCk7XG5cblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdmFyIGRlcml2ZWRLZXkgPSBXb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICAgIHZhciBibG9ja0luZGV4ID0gV29yZEFycmF5LmNyZWF0ZShbMHgwMDAwMDAwMV0pO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGVyaXZlZEtleVdvcmRzID0gZGVyaXZlZEtleS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGJsb2NrSW5kZXhXb3JkcyA9IGJsb2NrSW5kZXgud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBrZXlTaXplID0gY2ZnLmtleVNpemU7XG5cdCAgICAgICAgICAgIHZhciBpdGVyYXRpb25zID0gY2ZnLml0ZXJhdGlvbnM7XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUga2V5XG5cdCAgICAgICAgICAgIHdoaWxlIChkZXJpdmVkS2V5V29yZHMubGVuZ3RoIDwga2V5U2l6ZSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJsb2NrID0gaG1hYy51cGRhdGUoc2FsdCkuZmluYWxpemUoYmxvY2tJbmRleCk7XG5cdCAgICAgICAgICAgICAgICBobWFjLnJlc2V0KCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIGJsb2NrV29yZHMgPSBibG9jay53b3Jkcztcblx0ICAgICAgICAgICAgICAgIHZhciBibG9ja1dvcmRzTGVuZ3RoID0gYmxvY2tXb3Jkcy5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGlvbnNcblx0ICAgICAgICAgICAgICAgIHZhciBpbnRlcm1lZGlhdGUgPSBibG9jaztcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgaXRlcmF0aW9uczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaW50ZXJtZWRpYXRlID0gaG1hYy5maW5hbGl6ZShpbnRlcm1lZGlhdGUpO1xuXHQgICAgICAgICAgICAgICAgICAgIGhtYWMucmVzZXQoKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGludGVybWVkaWF0ZVdvcmRzID0gaW50ZXJtZWRpYXRlLndvcmRzO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gWE9SIGludGVybWVkaWF0ZSB3aXRoIGJsb2NrXG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBibG9ja1dvcmRzTGVuZ3RoOyBqKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tXb3Jkc1tqXSBePSBpbnRlcm1lZGlhdGVXb3Jkc1tqXTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIGRlcml2ZWRLZXkuY29uY2F0KGJsb2NrKTtcblx0ICAgICAgICAgICAgICAgIGJsb2NrSW5kZXhXb3Jkc1swXSsrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGRlcml2ZWRLZXkuc2lnQnl0ZXMgPSBrZXlTaXplICogNDtcblxuXHQgICAgICAgICAgICByZXR1cm4gZGVyaXZlZEtleTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBDb21wdXRlcyB0aGUgUGFzc3dvcmQtQmFzZWQgS2V5IERlcml2YXRpb24gRnVuY3Rpb24gMi5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gc2FsdCBBIHNhbHQuXG5cdCAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgY29tcHV0YXRpb24uXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGVyaXZlZCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBrZXkgPSBDcnlwdG9KUy5QQktERjIocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgICogICAgIHZhciBrZXkgPSBDcnlwdG9KUy5QQktERjIocGFzc3dvcmQsIHNhbHQsIHsga2V5U2l6ZTogOCB9KTtcblx0ICAgICAqICAgICB2YXIga2V5ID0gQ3J5cHRvSlMuUEJLREYyKHBhc3N3b3JkLCBzYWx0LCB7IGtleVNpemU6IDgsIGl0ZXJhdGlvbnM6IDEwMDAgfSk7XG5cdCAgICAgKi9cblx0ICAgIEMuUEJLREYyID0gZnVuY3Rpb24gKHBhc3N3b3JkLCBzYWx0LCBjZmcpIHtcblx0ICAgICAgICByZXR1cm4gUEJLREYyLmNyZWF0ZShjZmcpLmNvbXB1dGUocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgfTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5QQktERjI7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vZW5jLWJhc2U2NFwiKSwgcmVxdWlyZShcIi4vbWQ1XCIpLCByZXF1aXJlKFwiLi9ldnBrZGZcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2VuYy1iYXNlNjRcIiwgXCIuL21kNVwiLCBcIi4vZXZwa2RmXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFN0cmVhbUNpcGhlciA9IENfbGliLlN0cmVhbUNpcGhlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdHNcblx0ICAgIHZhciBTICA9IFtdO1xuXHQgICAgdmFyIENfID0gW107XG5cdCAgICB2YXIgRyAgPSBbXTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBSYWJiaXQgc3RyZWFtIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKlxuXHQgICAgICogVGhpcyBpcyBhIGxlZ2FjeSB2ZXJzaW9uIHRoYXQgbmVnbGVjdGVkIHRvIGNvbnZlcnQgdGhlIGtleSB0byBsaXR0bGUtZW5kaWFuLlxuXHQgICAgICogVGhpcyBlcnJvciBkb2Vzbid0IGFmZmVjdCB0aGUgY2lwaGVyJ3Mgc2VjdXJpdHksXG5cdCAgICAgKiBidXQgaXQgZG9lcyBhZmZlY3QgaXRzIGNvbXBhdGliaWxpdHkgd2l0aCBvdGhlciBpbXBsZW1lbnRhdGlvbnMuXG5cdCAgICAgKi9cblx0ICAgIHZhciBSYWJiaXRMZWdhY3kgPSBDX2FsZ28uUmFiYml0TGVnYWN5ID0gU3RyZWFtQ2lwaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBLID0gdGhpcy5fa2V5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgaXYgPSB0aGlzLmNmZy5pdjtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBpbml0aWFsIHN0YXRlIHZhbHVlc1xuXHQgICAgICAgICAgICB2YXIgWCA9IHRoaXMuX1ggPSBbXG5cdCAgICAgICAgICAgICAgICBLWzBdLCAoS1szXSA8PCAxNikgfCAoS1syXSA+Pj4gMTYpLFxuXHQgICAgICAgICAgICAgICAgS1sxXSwgKEtbMF0gPDwgMTYpIHwgKEtbM10gPj4+IDE2KSxcblx0ICAgICAgICAgICAgICAgIEtbMl0sIChLWzFdIDw8IDE2KSB8IChLWzBdID4+PiAxNiksXG5cdCAgICAgICAgICAgICAgICBLWzNdLCAoS1syXSA8PCAxNikgfCAoS1sxXSA+Pj4gMTYpXG5cdCAgICAgICAgICAgIF07XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUgaW5pdGlhbCBjb3VudGVyIHZhbHVlc1xuXHQgICAgICAgICAgICB2YXIgQyA9IHRoaXMuX0MgPSBbXG5cdCAgICAgICAgICAgICAgICAoS1syXSA8PCAxNikgfCAoS1syXSA+Pj4gMTYpLCAoS1swXSAmIDB4ZmZmZjAwMDApIHwgKEtbMV0gJiAweDAwMDBmZmZmKSxcblx0ICAgICAgICAgICAgICAgIChLWzNdIDw8IDE2KSB8IChLWzNdID4+PiAxNiksIChLWzFdICYgMHhmZmZmMDAwMCkgfCAoS1syXSAmIDB4MDAwMGZmZmYpLFxuXHQgICAgICAgICAgICAgICAgKEtbMF0gPDwgMTYpIHwgKEtbMF0gPj4+IDE2KSwgKEtbMl0gJiAweGZmZmYwMDAwKSB8IChLWzNdICYgMHgwMDAwZmZmZiksXG5cdCAgICAgICAgICAgICAgICAoS1sxXSA8PCAxNikgfCAoS1sxXSA+Pj4gMTYpLCAoS1szXSAmIDB4ZmZmZjAwMDApIHwgKEtbMF0gJiAweDAwMDBmZmZmKVxuXHQgICAgICAgICAgICBdO1xuXG5cdCAgICAgICAgICAgIC8vIENhcnJ5IGJpdFxuXHQgICAgICAgICAgICB0aGlzLl9iID0gMDtcblxuXHQgICAgICAgICAgICAvLyBJdGVyYXRlIHRoZSBzeXN0ZW0gZm91ciB0aW1lc1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgbmV4dFN0YXRlLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBNb2RpZnkgdGhlIGNvdW50ZXJzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBDW2ldIF49IFhbKGkgKyA0KSAmIDddO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSVYgc2V0dXBcblx0ICAgICAgICAgICAgaWYgKGl2KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBJViA9IGl2LndvcmRzO1xuXHQgICAgICAgICAgICAgICAgdmFyIElWXzAgPSBJVlswXTtcblx0ICAgICAgICAgICAgICAgIHZhciBJVl8xID0gSVZbMV07XG5cblx0ICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIGZvdXIgc3VidmVjdG9yc1xuXHQgICAgICAgICAgICAgICAgdmFyIGkwID0gKCgoSVZfMCA8PCA4KSB8IChJVl8wID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfCAoKChJVl8wIDw8IDI0KSB8IChJVl8wID4+PiA4KSkgJiAweGZmMDBmZjAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciBpMiA9ICgoKElWXzEgPDwgOCkgfCAoSVZfMSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHwgKCgoSVZfMSA8PCAyNCkgfCAoSVZfMSA+Pj4gOCkpICYgMHhmZjAwZmYwMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgaTEgPSAoaTAgPj4+IDE2KSB8IChpMiAmIDB4ZmZmZjAwMDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIGkzID0gKGkyIDw8IDE2KSAgfCAoaTAgJiAweDAwMDBmZmZmKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gTW9kaWZ5IGNvdW50ZXIgdmFsdWVzXG5cdCAgICAgICAgICAgICAgICBDWzBdIF49IGkwO1xuXHQgICAgICAgICAgICAgICAgQ1sxXSBePSBpMTtcblx0ICAgICAgICAgICAgICAgIENbMl0gXj0gaTI7XG5cdCAgICAgICAgICAgICAgICBDWzNdIF49IGkzO1xuXHQgICAgICAgICAgICAgICAgQ1s0XSBePSBpMDtcblx0ICAgICAgICAgICAgICAgIENbNV0gXj0gaTE7XG5cdCAgICAgICAgICAgICAgICBDWzZdIF49IGkyO1xuXHQgICAgICAgICAgICAgICAgQ1s3XSBePSBpMztcblxuXHQgICAgICAgICAgICAgICAgLy8gSXRlcmF0ZSB0aGUgc3lzdGVtIGZvdXIgdGltZXNcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXRlLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBYID0gdGhpcy5fWDtcblxuXHQgICAgICAgICAgICAvLyBJdGVyYXRlIHRoZSBzeXN0ZW1cblx0ICAgICAgICAgICAgbmV4dFN0YXRlLmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUgZm91ciBrZXlzdHJlYW0gd29yZHNcblx0ICAgICAgICAgICAgU1swXSA9IFhbMF0gXiAoWFs1XSA+Pj4gMTYpIF4gKFhbM10gPDwgMTYpO1xuXHQgICAgICAgICAgICBTWzFdID0gWFsyXSBeIChYWzddID4+PiAxNikgXiAoWFs1XSA8PCAxNik7XG5cdCAgICAgICAgICAgIFNbMl0gPSBYWzRdIF4gKFhbMV0gPj4+IDE2KSBeIChYWzddIDw8IDE2KTtcblx0ICAgICAgICAgICAgU1szXSA9IFhbNl0gXiAoWFszXSA+Pj4gMTYpIF4gKFhbMV0gPDwgMTYpO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICAgICAgU1tpXSA9ICgoKFNbaV0gPDwgOCkgIHwgKFNbaV0gPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgKCgoU1tpXSA8PCAyNCkgfCAoU1tpXSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBFbmNyeXB0XG5cdCAgICAgICAgICAgICAgICBNW29mZnNldCArIGldIF49IFNbaV07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgYmxvY2tTaXplOiAxMjgvMzIsXG5cblx0ICAgICAgICBpdlNpemU6IDY0LzMyXG5cdCAgICB9KTtcblxuXHQgICAgZnVuY3Rpb24gbmV4dFN0YXRlKCkge1xuXHQgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgIHZhciBYID0gdGhpcy5fWDtcblx0ICAgICAgICB2YXIgQyA9IHRoaXMuX0M7XG5cblx0ICAgICAgICAvLyBTYXZlIG9sZCBjb3VudGVyIHZhbHVlc1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG5cdCAgICAgICAgICAgIENfW2ldID0gQ1tpXTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBDYWxjdWxhdGUgbmV3IGNvdW50ZXIgdmFsdWVzXG5cdCAgICAgICAgQ1swXSA9IChDWzBdICsgMHg0ZDM0ZDM0ZCArIHRoaXMuX2IpIHwgMDtcblx0ICAgICAgICBDWzFdID0gKENbMV0gKyAweGQzNGQzNGQzICsgKChDWzBdID4+PiAwKSA8IChDX1swXSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICBDWzJdID0gKENbMl0gKyAweDM0ZDM0ZDM0ICsgKChDWzFdID4+PiAwKSA8IChDX1sxXSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICBDWzNdID0gKENbM10gKyAweDRkMzRkMzRkICsgKChDWzJdID4+PiAwKSA8IChDX1syXSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICBDWzRdID0gKENbNF0gKyAweGQzNGQzNGQzICsgKChDWzNdID4+PiAwKSA8IChDX1szXSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICBDWzVdID0gKENbNV0gKyAweDM0ZDM0ZDM0ICsgKChDWzRdID4+PiAwKSA8IChDX1s0XSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICBDWzZdID0gKENbNl0gKyAweDRkMzRkMzRkICsgKChDWzVdID4+PiAwKSA8IChDX1s1XSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICBDWzddID0gKENbN10gKyAweGQzNGQzNGQzICsgKChDWzZdID4+PiAwKSA8IChDX1s2XSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICB0aGlzLl9iID0gKENbN10gPj4+IDApIDwgKENfWzddID4+PiAwKSA/IDEgOiAwO1xuXG5cdCAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBnLXZhbHVlc1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG5cdCAgICAgICAgICAgIHZhciBneCA9IFhbaV0gKyBDW2ldO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnN0cnVjdCBoaWdoIGFuZCBsb3cgYXJndW1lbnQgZm9yIHNxdWFyaW5nXG5cdCAgICAgICAgICAgIHZhciBnYSA9IGd4ICYgMHhmZmZmO1xuXHQgICAgICAgICAgICB2YXIgZ2IgPSBneCA+Pj4gMTY7XG5cblx0ICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIGhpZ2ggYW5kIGxvdyByZXN1bHQgb2Ygc3F1YXJpbmdcblx0ICAgICAgICAgICAgdmFyIGdoID0gKCgoKGdhICogZ2EpID4+PiAxNykgKyBnYSAqIGdiKSA+Pj4gMTUpICsgZ2IgKiBnYjtcblx0ICAgICAgICAgICAgdmFyIGdsID0gKCgoZ3ggJiAweGZmZmYwMDAwKSAqIGd4KSB8IDApICsgKCgoZ3ggJiAweDAwMDBmZmZmKSAqIGd4KSB8IDApO1xuXG5cdCAgICAgICAgICAgIC8vIEhpZ2ggWE9SIGxvd1xuXHQgICAgICAgICAgICBHW2ldID0gZ2ggXiBnbDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBDYWxjdWxhdGUgbmV3IHN0YXRlIHZhbHVlc1xuXHQgICAgICAgIFhbMF0gPSAoR1swXSArICgoR1s3XSA8PCAxNikgfCAoR1s3XSA+Pj4gMTYpKSArICgoR1s2XSA8PCAxNikgfCAoR1s2XSA+Pj4gMTYpKSkgfCAwO1xuXHQgICAgICAgIFhbMV0gPSAoR1sxXSArICgoR1swXSA8PCA4KSAgfCAoR1swXSA+Pj4gMjQpKSArIEdbN10pIHwgMDtcblx0ICAgICAgICBYWzJdID0gKEdbMl0gKyAoKEdbMV0gPDwgMTYpIHwgKEdbMV0gPj4+IDE2KSkgKyAoKEdbMF0gPDwgMTYpIHwgKEdbMF0gPj4+IDE2KSkpIHwgMDtcblx0ICAgICAgICBYWzNdID0gKEdbM10gKyAoKEdbMl0gPDwgOCkgIHwgKEdbMl0gPj4+IDI0KSkgKyBHWzFdKSB8IDA7XG5cdCAgICAgICAgWFs0XSA9IChHWzRdICsgKChHWzNdIDw8IDE2KSB8IChHWzNdID4+PiAxNikpICsgKChHWzJdIDw8IDE2KSB8IChHWzJdID4+PiAxNikpKSB8IDA7XG5cdCAgICAgICAgWFs1XSA9IChHWzVdICsgKChHWzRdIDw8IDgpICB8IChHWzRdID4+PiAyNCkpICsgR1szXSkgfCAwO1xuXHQgICAgICAgIFhbNl0gPSAoR1s2XSArICgoR1s1XSA8PCAxNikgfCAoR1s1XSA+Pj4gMTYpKSArICgoR1s0XSA8PCAxNikgfCAoR1s0XSA+Pj4gMTYpKSkgfCAwO1xuXHQgICAgICAgIFhbN10gPSAoR1s3XSArICgoR1s2XSA8PCA4KSAgfCAoR1s2XSA+Pj4gMjQpKSArIEdbNV0pIHwgMDtcblx0ICAgIH1cblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbnMgdG8gdGhlIGNpcGhlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGNpcGhlcnRleHQgPSBDcnlwdG9KUy5SYWJiaXRMZWdhY3kuZW5jcnlwdChtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgKiAgICAgdmFyIHBsYWludGV4dCAgPSBDcnlwdG9KUy5SYWJiaXRMZWdhY3kuZGVjcnlwdChjaXBoZXJ0ZXh0LCBrZXksIGNmZyk7XG5cdCAgICAgKi9cblx0ICAgIEMuUmFiYml0TGVnYWN5ID0gU3RyZWFtQ2lwaGVyLl9jcmVhdGVIZWxwZXIoUmFiYml0TGVnYWN5KTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5SYWJiaXRMZWdhY3k7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vZW5jLWJhc2U2NFwiKSwgcmVxdWlyZShcIi4vbWQ1XCIpLCByZXF1aXJlKFwiLi9ldnBrZGZcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2VuYy1iYXNlNjRcIiwgXCIuL21kNVwiLCBcIi4vZXZwa2RmXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFN0cmVhbUNpcGhlciA9IENfbGliLlN0cmVhbUNpcGhlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdHNcblx0ICAgIHZhciBTICA9IFtdO1xuXHQgICAgdmFyIENfID0gW107XG5cdCAgICB2YXIgRyAgPSBbXTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBSYWJiaXQgc3RyZWFtIGNpcGhlciBhbGdvcml0aG1cblx0ICAgICAqL1xuXHQgICAgdmFyIFJhYmJpdCA9IENfYWxnby5SYWJiaXQgPSBTdHJlYW1DaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIEsgPSB0aGlzLl9rZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBpdiA9IHRoaXMuY2ZnLml2O1xuXG5cdCAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBLW2ldID0gKCgoS1tpXSA8PCA4KSAgfCAoS1tpXSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAoKChLW2ldIDw8IDI0KSB8IChLW2ldID4+PiA4KSkgICYgMHhmZjAwZmYwMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBpbml0aWFsIHN0YXRlIHZhbHVlc1xuXHQgICAgICAgICAgICB2YXIgWCA9IHRoaXMuX1ggPSBbXG5cdCAgICAgICAgICAgICAgICBLWzBdLCAoS1szXSA8PCAxNikgfCAoS1syXSA+Pj4gMTYpLFxuXHQgICAgICAgICAgICAgICAgS1sxXSwgKEtbMF0gPDwgMTYpIHwgKEtbM10gPj4+IDE2KSxcblx0ICAgICAgICAgICAgICAgIEtbMl0sIChLWzFdIDw8IDE2KSB8IChLWzBdID4+PiAxNiksXG5cdCAgICAgICAgICAgICAgICBLWzNdLCAoS1syXSA8PCAxNikgfCAoS1sxXSA+Pj4gMTYpXG5cdCAgICAgICAgICAgIF07XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUgaW5pdGlhbCBjb3VudGVyIHZhbHVlc1xuXHQgICAgICAgICAgICB2YXIgQyA9IHRoaXMuX0MgPSBbXG5cdCAgICAgICAgICAgICAgICAoS1syXSA8PCAxNikgfCAoS1syXSA+Pj4gMTYpLCAoS1swXSAmIDB4ZmZmZjAwMDApIHwgKEtbMV0gJiAweDAwMDBmZmZmKSxcblx0ICAgICAgICAgICAgICAgIChLWzNdIDw8IDE2KSB8IChLWzNdID4+PiAxNiksIChLWzFdICYgMHhmZmZmMDAwMCkgfCAoS1syXSAmIDB4MDAwMGZmZmYpLFxuXHQgICAgICAgICAgICAgICAgKEtbMF0gPDwgMTYpIHwgKEtbMF0gPj4+IDE2KSwgKEtbMl0gJiAweGZmZmYwMDAwKSB8IChLWzNdICYgMHgwMDAwZmZmZiksXG5cdCAgICAgICAgICAgICAgICAoS1sxXSA8PCAxNikgfCAoS1sxXSA+Pj4gMTYpLCAoS1szXSAmIDB4ZmZmZjAwMDApIHwgKEtbMF0gJiAweDAwMDBmZmZmKVxuXHQgICAgICAgICAgICBdO1xuXG5cdCAgICAgICAgICAgIC8vIENhcnJ5IGJpdFxuXHQgICAgICAgICAgICB0aGlzLl9iID0gMDtcblxuXHQgICAgICAgICAgICAvLyBJdGVyYXRlIHRoZSBzeXN0ZW0gZm91ciB0aW1lc1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgbmV4dFN0YXRlLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBNb2RpZnkgdGhlIGNvdW50ZXJzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBDW2ldIF49IFhbKGkgKyA0KSAmIDddO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSVYgc2V0dXBcblx0ICAgICAgICAgICAgaWYgKGl2KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBJViA9IGl2LndvcmRzO1xuXHQgICAgICAgICAgICAgICAgdmFyIElWXzAgPSBJVlswXTtcblx0ICAgICAgICAgICAgICAgIHZhciBJVl8xID0gSVZbMV07XG5cblx0ICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIGZvdXIgc3VidmVjdG9yc1xuXHQgICAgICAgICAgICAgICAgdmFyIGkwID0gKCgoSVZfMCA8PCA4KSB8IChJVl8wID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfCAoKChJVl8wIDw8IDI0KSB8IChJVl8wID4+PiA4KSkgJiAweGZmMDBmZjAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciBpMiA9ICgoKElWXzEgPDwgOCkgfCAoSVZfMSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHwgKCgoSVZfMSA8PCAyNCkgfCAoSVZfMSA+Pj4gOCkpICYgMHhmZjAwZmYwMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgaTEgPSAoaTAgPj4+IDE2KSB8IChpMiAmIDB4ZmZmZjAwMDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIGkzID0gKGkyIDw8IDE2KSAgfCAoaTAgJiAweDAwMDBmZmZmKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gTW9kaWZ5IGNvdW50ZXIgdmFsdWVzXG5cdCAgICAgICAgICAgICAgICBDWzBdIF49IGkwO1xuXHQgICAgICAgICAgICAgICAgQ1sxXSBePSBpMTtcblx0ICAgICAgICAgICAgICAgIENbMl0gXj0gaTI7XG5cdCAgICAgICAgICAgICAgICBDWzNdIF49IGkzO1xuXHQgICAgICAgICAgICAgICAgQ1s0XSBePSBpMDtcblx0ICAgICAgICAgICAgICAgIENbNV0gXj0gaTE7XG5cdCAgICAgICAgICAgICAgICBDWzZdIF49IGkyO1xuXHQgICAgICAgICAgICAgICAgQ1s3XSBePSBpMztcblxuXHQgICAgICAgICAgICAgICAgLy8gSXRlcmF0ZSB0aGUgc3lzdGVtIGZvdXIgdGltZXNcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXRlLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBYID0gdGhpcy5fWDtcblxuXHQgICAgICAgICAgICAvLyBJdGVyYXRlIHRoZSBzeXN0ZW1cblx0ICAgICAgICAgICAgbmV4dFN0YXRlLmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUgZm91ciBrZXlzdHJlYW0gd29yZHNcblx0ICAgICAgICAgICAgU1swXSA9IFhbMF0gXiAoWFs1XSA+Pj4gMTYpIF4gKFhbM10gPDwgMTYpO1xuXHQgICAgICAgICAgICBTWzFdID0gWFsyXSBeIChYWzddID4+PiAxNikgXiAoWFs1XSA8PCAxNik7XG5cdCAgICAgICAgICAgIFNbMl0gPSBYWzRdIF4gKFhbMV0gPj4+IDE2KSBeIChYWzddIDw8IDE2KTtcblx0ICAgICAgICAgICAgU1szXSA9IFhbNl0gXiAoWFszXSA+Pj4gMTYpIF4gKFhbMV0gPDwgMTYpO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICAgICAgU1tpXSA9ICgoKFNbaV0gPDwgOCkgIHwgKFNbaV0gPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgKCgoU1tpXSA8PCAyNCkgfCAoU1tpXSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBFbmNyeXB0XG5cdCAgICAgICAgICAgICAgICBNW29mZnNldCArIGldIF49IFNbaV07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgYmxvY2tTaXplOiAxMjgvMzIsXG5cblx0ICAgICAgICBpdlNpemU6IDY0LzMyXG5cdCAgICB9KTtcblxuXHQgICAgZnVuY3Rpb24gbmV4dFN0YXRlKCkge1xuXHQgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgIHZhciBYID0gdGhpcy5fWDtcblx0ICAgICAgICB2YXIgQyA9IHRoaXMuX0M7XG5cblx0ICAgICAgICAvLyBTYXZlIG9sZCBjb3VudGVyIHZhbHVlc1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG5cdCAgICAgICAgICAgIENfW2ldID0gQ1tpXTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBDYWxjdWxhdGUgbmV3IGNvdW50ZXIgdmFsdWVzXG5cdCAgICAgICAgQ1swXSA9IChDWzBdICsgMHg0ZDM0ZDM0ZCArIHRoaXMuX2IpIHwgMDtcblx0ICAgICAgICBDWzFdID0gKENbMV0gKyAweGQzNGQzNGQzICsgKChDWzBdID4+PiAwKSA8IChDX1swXSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICBDWzJdID0gKENbMl0gKyAweDM0ZDM0ZDM0ICsgKChDWzFdID4+PiAwKSA8IChDX1sxXSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICBDWzNdID0gKENbM10gKyAweDRkMzRkMzRkICsgKChDWzJdID4+PiAwKSA8IChDX1syXSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICBDWzRdID0gKENbNF0gKyAweGQzNGQzNGQzICsgKChDWzNdID4+PiAwKSA8IChDX1szXSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICBDWzVdID0gKENbNV0gKyAweDM0ZDM0ZDM0ICsgKChDWzRdID4+PiAwKSA8IChDX1s0XSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICBDWzZdID0gKENbNl0gKyAweDRkMzRkMzRkICsgKChDWzVdID4+PiAwKSA8IChDX1s1XSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICBDWzddID0gKENbN10gKyAweGQzNGQzNGQzICsgKChDWzZdID4+PiAwKSA8IChDX1s2XSA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICB0aGlzLl9iID0gKENbN10gPj4+IDApIDwgKENfWzddID4+PiAwKSA/IDEgOiAwO1xuXG5cdCAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBnLXZhbHVlc1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG5cdCAgICAgICAgICAgIHZhciBneCA9IFhbaV0gKyBDW2ldO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnN0cnVjdCBoaWdoIGFuZCBsb3cgYXJndW1lbnQgZm9yIHNxdWFyaW5nXG5cdCAgICAgICAgICAgIHZhciBnYSA9IGd4ICYgMHhmZmZmO1xuXHQgICAgICAgICAgICB2YXIgZ2IgPSBneCA+Pj4gMTY7XG5cblx0ICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIGhpZ2ggYW5kIGxvdyByZXN1bHQgb2Ygc3F1YXJpbmdcblx0ICAgICAgICAgICAgdmFyIGdoID0gKCgoKGdhICogZ2EpID4+PiAxNykgKyBnYSAqIGdiKSA+Pj4gMTUpICsgZ2IgKiBnYjtcblx0ICAgICAgICAgICAgdmFyIGdsID0gKCgoZ3ggJiAweGZmZmYwMDAwKSAqIGd4KSB8IDApICsgKCgoZ3ggJiAweDAwMDBmZmZmKSAqIGd4KSB8IDApO1xuXG5cdCAgICAgICAgICAgIC8vIEhpZ2ggWE9SIGxvd1xuXHQgICAgICAgICAgICBHW2ldID0gZ2ggXiBnbDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBDYWxjdWxhdGUgbmV3IHN0YXRlIHZhbHVlc1xuXHQgICAgICAgIFhbMF0gPSAoR1swXSArICgoR1s3XSA8PCAxNikgfCAoR1s3XSA+Pj4gMTYpKSArICgoR1s2XSA8PCAxNikgfCAoR1s2XSA+Pj4gMTYpKSkgfCAwO1xuXHQgICAgICAgIFhbMV0gPSAoR1sxXSArICgoR1swXSA8PCA4KSAgfCAoR1swXSA+Pj4gMjQpKSArIEdbN10pIHwgMDtcblx0ICAgICAgICBYWzJdID0gKEdbMl0gKyAoKEdbMV0gPDwgMTYpIHwgKEdbMV0gPj4+IDE2KSkgKyAoKEdbMF0gPDwgMTYpIHwgKEdbMF0gPj4+IDE2KSkpIHwgMDtcblx0ICAgICAgICBYWzNdID0gKEdbM10gKyAoKEdbMl0gPDwgOCkgIHwgKEdbMl0gPj4+IDI0KSkgKyBHWzFdKSB8IDA7XG5cdCAgICAgICAgWFs0XSA9IChHWzRdICsgKChHWzNdIDw8IDE2KSB8IChHWzNdID4+PiAxNikpICsgKChHWzJdIDw8IDE2KSB8IChHWzJdID4+PiAxNikpKSB8IDA7XG5cdCAgICAgICAgWFs1XSA9IChHWzVdICsgKChHWzRdIDw8IDgpICB8IChHWzRdID4+PiAyNCkpICsgR1szXSkgfCAwO1xuXHQgICAgICAgIFhbNl0gPSAoR1s2XSArICgoR1s1XSA8PCAxNikgfCAoR1s1XSA+Pj4gMTYpKSArICgoR1s0XSA8PCAxNikgfCAoR1s0XSA+Pj4gMTYpKSkgfCAwO1xuXHQgICAgICAgIFhbN10gPSAoR1s3XSArICgoR1s2XSA8PCA4KSAgfCAoR1s2XSA+Pj4gMjQpKSArIEdbNV0pIHwgMDtcblx0ICAgIH1cblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbnMgdG8gdGhlIGNpcGhlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGNpcGhlcnRleHQgPSBDcnlwdG9KUy5SYWJiaXQuZW5jcnlwdChtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgKiAgICAgdmFyIHBsYWludGV4dCAgPSBDcnlwdG9KUy5SYWJiaXQuZGVjcnlwdChjaXBoZXJ0ZXh0LCBrZXksIGNmZyk7XG5cdCAgICAgKi9cblx0ICAgIEMuUmFiYml0ID0gU3RyZWFtQ2lwaGVyLl9jcmVhdGVIZWxwZXIoUmFiYml0KTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5SYWJiaXQ7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vZW5jLWJhc2U2NFwiKSwgcmVxdWlyZShcIi4vbWQ1XCIpLCByZXF1aXJlKFwiLi9ldnBrZGZcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2VuYy1iYXNlNjRcIiwgXCIuL21kNVwiLCBcIi4vZXZwa2RmXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFN0cmVhbUNpcGhlciA9IENfbGliLlN0cmVhbUNpcGhlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8qKlxuXHQgICAgICogUkM0IHN0cmVhbSBjaXBoZXIgYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgUkM0ID0gQ19hbGdvLlJDNCA9IFN0cmVhbUNpcGhlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5fa2V5O1xuXHQgICAgICAgICAgICB2YXIga2V5V29yZHMgPSBrZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBrZXlTaWdCeXRlcyA9IGtleS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBJbml0IHNib3hcblx0ICAgICAgICAgICAgdmFyIFMgPSB0aGlzLl9TID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIFNbaV0gPSBpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gS2V5IHNldHVwXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gMDsgaSA8IDI1NjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIga2V5Qnl0ZUluZGV4ID0gaSAlIGtleVNpZ0J5dGVzO1xuXHQgICAgICAgICAgICAgICAgdmFyIGtleUJ5dGUgPSAoa2V5V29yZHNba2V5Qnl0ZUluZGV4ID4+PiAyXSA+Pj4gKDI0IC0gKGtleUJ5dGVJbmRleCAlIDQpICogOCkpICYgMHhmZjtcblxuXHQgICAgICAgICAgICAgICAgaiA9IChqICsgU1tpXSArIGtleUJ5dGUpICUgMjU2O1xuXG5cdCAgICAgICAgICAgICAgICAvLyBTd2FwXG5cdCAgICAgICAgICAgICAgICB2YXIgdCA9IFNbaV07XG5cdCAgICAgICAgICAgICAgICBTW2ldID0gU1tqXTtcblx0ICAgICAgICAgICAgICAgIFNbal0gPSB0O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ291bnRlcnNcblx0ICAgICAgICAgICAgdGhpcy5faSA9IHRoaXMuX2ogPSAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgTVtvZmZzZXRdIF49IGdlbmVyYXRlS2V5c3RyZWFtV29yZC5jYWxsKHRoaXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBrZXlTaXplOiAyNTYvMzIsXG5cblx0ICAgICAgICBpdlNpemU6IDBcblx0ICAgIH0pO1xuXG5cdCAgICBmdW5jdGlvbiBnZW5lcmF0ZUtleXN0cmVhbVdvcmQoKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgdmFyIFMgPSB0aGlzLl9TO1xuXHQgICAgICAgIHZhciBpID0gdGhpcy5faTtcblx0ICAgICAgICB2YXIgaiA9IHRoaXMuX2o7XG5cblx0ICAgICAgICAvLyBHZW5lcmF0ZSBrZXlzdHJlYW0gd29yZFxuXHQgICAgICAgIHZhciBrZXlzdHJlYW1Xb3JkID0gMDtcblx0ICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IDQ7IG4rKykge1xuXHQgICAgICAgICAgICBpID0gKGkgKyAxKSAlIDI1Njtcblx0ICAgICAgICAgICAgaiA9IChqICsgU1tpXSkgJSAyNTY7XG5cblx0ICAgICAgICAgICAgLy8gU3dhcFxuXHQgICAgICAgICAgICB2YXIgdCA9IFNbaV07XG5cdCAgICAgICAgICAgIFNbaV0gPSBTW2pdO1xuXHQgICAgICAgICAgICBTW2pdID0gdDtcblxuXHQgICAgICAgICAgICBrZXlzdHJlYW1Xb3JkIHw9IFNbKFNbaV0gKyBTW2pdKSAlIDI1Nl0gPDwgKDI0IC0gbiAqIDgpO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIFVwZGF0ZSBjb3VudGVyc1xuXHQgICAgICAgIHRoaXMuX2kgPSBpO1xuXHQgICAgICAgIHRoaXMuX2ogPSBqO1xuXG5cdCAgICAgICAgcmV0dXJuIGtleXN0cmVhbVdvcmQ7XG5cdCAgICB9XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb25zIHRvIHRoZSBjaXBoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0ID0gQ3J5cHRvSlMuUkM0LmVuY3J5cHQobWVzc2FnZSwga2V5LCBjZmcpO1xuXHQgICAgICogICAgIHZhciBwbGFpbnRleHQgID0gQ3J5cHRvSlMuUkM0LmRlY3J5cHQoY2lwaGVydGV4dCwga2V5LCBjZmcpO1xuXHQgICAgICovXG5cdCAgICBDLlJDNCA9IFN0cmVhbUNpcGhlci5fY3JlYXRlSGVscGVyKFJDNCk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogTW9kaWZpZWQgUkM0IHN0cmVhbSBjaXBoZXIgYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgUkM0RHJvcCA9IENfYWxnby5SQzREcm9wID0gUkM0LmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGRyb3AgVGhlIG51bWJlciBvZiBrZXlzdHJlYW0gd29yZHMgdG8gZHJvcC4gRGVmYXVsdCAxOTJcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IFJDNC5jZmcuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgZHJvcDogMTkyXG5cdCAgICAgICAgfSksXG5cblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICBSQzQuX2RvUmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBEcm9wXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmNmZy5kcm9wOyBpID4gMDsgaS0tKSB7XG5cdCAgICAgICAgICAgICAgICBnZW5lcmF0ZUtleXN0cmVhbVdvcmQuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9ucyB0byB0aGUgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgY2lwaGVydGV4dCA9IENyeXB0b0pTLlJDNERyb3AuZW5jcnlwdChtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgKiAgICAgdmFyIHBsYWludGV4dCAgPSBDcnlwdG9KUy5SQzREcm9wLmRlY3J5cHQoY2lwaGVydGV4dCwga2V5LCBjZmcpO1xuXHQgICAgICovXG5cdCAgICBDLlJDNERyb3AgPSBTdHJlYW1DaXBoZXIuX2NyZWF0ZUhlbHBlcihSQzREcm9wKTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5SQzQ7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdC8qKiBAcHJlc2VydmVcblx0KGMpIDIwMTIgYnkgQ8OpZHJpYyBNZXNuaWwuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblx0UmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG5cdCAgICAtIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cblx0ICAgIC0gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5cdFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cblx0Ki9cblxuXHQoZnVuY3Rpb24gKE1hdGgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBDb25zdGFudHMgdGFibGVcblx0ICAgIHZhciBfemwgPSBXb3JkQXJyYXkuY3JlYXRlKFtcblx0ICAgICAgICAwLCAgMSwgIDIsICAzLCAgNCwgIDUsICA2LCAgNywgIDgsICA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LFxuXHQgICAgICAgIDcsICA0LCAxMywgIDEsIDEwLCAgNiwgMTUsICAzLCAxMiwgIDAsICA5LCAgNSwgIDIsIDE0LCAxMSwgIDgsXG5cdCAgICAgICAgMywgMTAsIDE0LCAgNCwgIDksIDE1LCAgOCwgIDEsICAyLCAgNywgIDAsICA2LCAxMywgMTEsICA1LCAxMixcblx0ICAgICAgICAxLCAgOSwgMTEsIDEwLCAgMCwgIDgsIDEyLCAgNCwgMTMsICAzLCAgNywgMTUsIDE0LCAgNSwgIDYsICAyLFxuXHQgICAgICAgIDQsICAwLCAgNSwgIDksICA3LCAxMiwgIDIsIDEwLCAxNCwgIDEsICAzLCAgOCwgMTEsICA2LCAxNSwgMTNdKTtcblx0ICAgIHZhciBfenIgPSBXb3JkQXJyYXkuY3JlYXRlKFtcblx0ICAgICAgICA1LCAxNCwgIDcsICAwLCAgOSwgIDIsIDExLCAgNCwgMTMsICA2LCAxNSwgIDgsICAxLCAxMCwgIDMsIDEyLFxuXHQgICAgICAgIDYsIDExLCAgMywgIDcsICAwLCAxMywgIDUsIDEwLCAxNCwgMTUsICA4LCAxMiwgIDQsICA5LCAgMSwgIDIsXG5cdCAgICAgICAgMTUsICA1LCAgMSwgIDMsICA3LCAxNCwgIDYsICA5LCAxMSwgIDgsIDEyLCAgMiwgMTAsICAwLCAgNCwgMTMsXG5cdCAgICAgICAgOCwgIDYsICA0LCAgMSwgIDMsIDExLCAxNSwgIDAsICA1LCAxMiwgIDIsIDEzLCAgOSwgIDcsIDEwLCAxNCxcblx0ICAgICAgICAxMiwgMTUsIDEwLCAgNCwgIDEsICA1LCAgOCwgIDcsICA2LCAgMiwgMTMsIDE0LCAgMCwgIDMsICA5LCAxMV0pO1xuXHQgICAgdmFyIF9zbCA9IFdvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgICAxMSwgMTQsIDE1LCAxMiwgIDUsICA4LCAgNywgIDksIDExLCAxMywgMTQsIDE1LCAgNiwgIDcsICA5LCAgOCxcblx0ICAgICAgICA3LCA2LCAgIDgsIDEzLCAxMSwgIDksICA3LCAxNSwgIDcsIDEyLCAxNSwgIDksIDExLCAgNywgMTMsIDEyLFxuXHQgICAgICAgIDExLCAxMywgIDYsICA3LCAxNCwgIDksIDEzLCAxNSwgMTQsICA4LCAxMywgIDYsICA1LCAxMiwgIDcsICA1LFxuXHQgICAgICAgICAgMTEsIDEyLCAxNCwgMTUsIDE0LCAxNSwgIDksICA4LCAgOSwgMTQsICA1LCAgNiwgIDgsICA2LCAgNSwgMTIsXG5cdCAgICAgICAgOSwgMTUsICA1LCAxMSwgIDYsICA4LCAxMywgMTIsICA1LCAxMiwgMTMsIDE0LCAxMSwgIDgsICA1LCAgNiBdKTtcblx0ICAgIHZhciBfc3IgPSBXb3JkQXJyYXkuY3JlYXRlKFtcblx0ICAgICAgICA4LCAgOSwgIDksIDExLCAxMywgMTUsIDE1LCAgNSwgIDcsICA3LCAgOCwgMTEsIDE0LCAxNCwgMTIsICA2LFxuXHQgICAgICAgIDksIDEzLCAxNSwgIDcsIDEyLCAgOCwgIDksIDExLCAgNywgIDcsIDEyLCAgNywgIDYsIDE1LCAxMywgMTEsXG5cdCAgICAgICAgOSwgIDcsIDE1LCAxMSwgIDgsICA2LCAgNiwgMTQsIDEyLCAxMywgIDUsIDE0LCAxMywgMTMsICA3LCAgNSxcblx0ICAgICAgICAxNSwgIDUsICA4LCAxMSwgMTQsIDE0LCAgNiwgMTQsICA2LCAgOSwgMTIsICA5LCAxMiwgIDUsIDE1LCAgOCxcblx0ICAgICAgICA4LCAgNSwgMTIsICA5LCAxMiwgIDUsIDE0LCAgNiwgIDgsIDEzLCAgNiwgIDUsIDE1LCAxMywgMTEsIDExIF0pO1xuXG5cdCAgICB2YXIgX2hsID0gIFdvcmRBcnJheS5jcmVhdGUoWyAweDAwMDAwMDAwLCAweDVBODI3OTk5LCAweDZFRDlFQkExLCAweDhGMUJCQ0RDLCAweEE5NTNGRDRFXSk7XG5cdCAgICB2YXIgX2hyID0gIFdvcmRBcnJheS5jcmVhdGUoWyAweDUwQTI4QkU2LCAweDVDNEREMTI0LCAweDZENzAzRUYzLCAweDdBNkQ3NkU5LCAweDAwMDAwMDAwXSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogUklQRU1EMTYwIGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgUklQRU1EMTYwID0gQ19hbGdvLlJJUEVNRDE2MCA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggID0gV29yZEFycmF5LmNyZWF0ZShbMHg2NzQ1MjMwMSwgMHhFRkNEQUI4OSwgMHg5OEJBRENGRSwgMHgxMDMyNTQ3NiwgMHhDM0QyRTFGMF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblxuXHQgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIG9mZnNldF9pID0gb2Zmc2V0ICsgaTtcblx0ICAgICAgICAgICAgICAgIHZhciBNX29mZnNldF9pID0gTVtvZmZzZXRfaV07XG5cblx0ICAgICAgICAgICAgICAgIC8vIFN3YXBcblx0ICAgICAgICAgICAgICAgIE1bb2Zmc2V0X2ldID0gKFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE1fb2Zmc2V0X2kgPDwgOCkgIHwgKE1fb2Zmc2V0X2kgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgKCgoTV9vZmZzZXRfaSA8PCAyNCkgfCAoTV9vZmZzZXRfaSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBIICA9IHRoaXMuX2hhc2gud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBobCA9IF9obC53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGhyID0gX2hyLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgemwgPSBfemwud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB6ciA9IF96ci53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNsID0gX3NsLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc3IgPSBfc3Iud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgdmFyIGFsLCBibCwgY2wsIGRsLCBlbDtcblx0ICAgICAgICAgICAgdmFyIGFyLCBiciwgY3IsIGRyLCBlcjtcblxuXHQgICAgICAgICAgICBhciA9IGFsID0gSFswXTtcblx0ICAgICAgICAgICAgYnIgPSBibCA9IEhbMV07XG5cdCAgICAgICAgICAgIGNyID0gY2wgPSBIWzJdO1xuXHQgICAgICAgICAgICBkciA9IGRsID0gSFszXTtcblx0ICAgICAgICAgICAgZXIgPSBlbCA9IEhbNF07XG5cdCAgICAgICAgICAgIC8vIENvbXB1dGF0aW9uXG5cdCAgICAgICAgICAgIHZhciB0O1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDgwOyBpICs9IDEpIHtcblx0ICAgICAgICAgICAgICAgIHQgPSAoYWwgKyAgTVtvZmZzZXQremxbaV1dKXwwO1xuXHQgICAgICAgICAgICAgICAgaWYgKGk8MTYpe1xuXHRcdCAgICAgICAgICAgIHQgKz0gIGYxKGJsLGNsLGRsKSArIGhsWzBdO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpPDMyKSB7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjIoYmwsY2wsZGwpICsgaGxbMV07XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGk8NDgpIHtcblx0XHQgICAgICAgICAgICB0ICs9ICBmMyhibCxjbCxkbCkgKyBobFsyXTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaTw2NCkge1xuXHRcdCAgICAgICAgICAgIHQgKz0gIGY0KGJsLGNsLGRsKSArIGhsWzNdO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHsvLyBpZiAoaTw4MCkge1xuXHRcdCAgICAgICAgICAgIHQgKz0gIGY1KGJsLGNsLGRsKSArIGhsWzRdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdCA9IHR8MDtcblx0ICAgICAgICAgICAgICAgIHQgPSAgcm90bCh0LHNsW2ldKTtcblx0ICAgICAgICAgICAgICAgIHQgPSAodCtlbCl8MDtcblx0ICAgICAgICAgICAgICAgIGFsID0gZWw7XG5cdCAgICAgICAgICAgICAgICBlbCA9IGRsO1xuXHQgICAgICAgICAgICAgICAgZGwgPSByb3RsKGNsLCAxMCk7XG5cdCAgICAgICAgICAgICAgICBjbCA9IGJsO1xuXHQgICAgICAgICAgICAgICAgYmwgPSB0O1xuXG5cdCAgICAgICAgICAgICAgICB0ID0gKGFyICsgTVtvZmZzZXQrenJbaV1dKXwwO1xuXHQgICAgICAgICAgICAgICAgaWYgKGk8MTYpe1xuXHRcdCAgICAgICAgICAgIHQgKz0gIGY1KGJyLGNyLGRyKSArIGhyWzBdO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpPDMyKSB7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjQoYnIsY3IsZHIpICsgaHJbMV07XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGk8NDgpIHtcblx0XHQgICAgICAgICAgICB0ICs9ICBmMyhicixjcixkcikgKyBoclsyXTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaTw2NCkge1xuXHRcdCAgICAgICAgICAgIHQgKz0gIGYyKGJyLGNyLGRyKSArIGhyWzNdO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHsvLyBpZiAoaTw4MCkge1xuXHRcdCAgICAgICAgICAgIHQgKz0gIGYxKGJyLGNyLGRyKSArIGhyWzRdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdCA9IHR8MDtcblx0ICAgICAgICAgICAgICAgIHQgPSAgcm90bCh0LHNyW2ldKSA7XG5cdCAgICAgICAgICAgICAgICB0ID0gKHQrZXIpfDA7XG5cdCAgICAgICAgICAgICAgICBhciA9IGVyO1xuXHQgICAgICAgICAgICAgICAgZXIgPSBkcjtcblx0ICAgICAgICAgICAgICAgIGRyID0gcm90bChjciwgMTApO1xuXHQgICAgICAgICAgICAgICAgY3IgPSBicjtcblx0ICAgICAgICAgICAgICAgIGJyID0gdDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICB0ICAgID0gKEhbMV0gKyBjbCArIGRyKXwwO1xuXHQgICAgICAgICAgICBIWzFdID0gKEhbMl0gKyBkbCArIGVyKXwwO1xuXHQgICAgICAgICAgICBIWzJdID0gKEhbM10gKyBlbCArIGFyKXwwO1xuXHQgICAgICAgICAgICBIWzNdID0gKEhbNF0gKyBhbCArIGJyKXwwO1xuXHQgICAgICAgICAgICBIWzRdID0gKEhbMF0gKyBibCArIGNyKXwwO1xuXHQgICAgICAgICAgICBIWzBdID0gIHQ7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbbkJpdHNMZWZ0ID4+PiA1XSB8PSAweDgwIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSAoXG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsIDw8IDgpICB8IChuQml0c1RvdGFsID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbCA8PCAyNCkgfCAobkJpdHNUb3RhbCA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSAoZGF0YVdvcmRzLmxlbmd0aCArIDEpICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5faGFzaDtcblx0ICAgICAgICAgICAgdmFyIEggPSBoYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICAgICAgdmFyIEhfaSA9IEhbaV07XG5cblx0ICAgICAgICAgICAgICAgIC8vIFN3YXBcblx0ICAgICAgICAgICAgICAgIEhbaV0gPSAoKChIX2kgPDwgOCkgIHwgKEhfaSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAoKChIX2kgPDwgMjQpIHwgKEhfaSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5faGFzaCA9IHRoaXMuX2hhc2guY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblxuXHQgICAgZnVuY3Rpb24gZjEoeCwgeSwgeikge1xuXHQgICAgICAgIHJldHVybiAoKHgpIF4gKHkpIF4gKHopKTtcblxuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBmMih4LCB5LCB6KSB7XG5cdCAgICAgICAgcmV0dXJuICgoKHgpJih5KSkgfCAoKH54KSYoeikpKTtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gZjMoeCwgeSwgeikge1xuXHQgICAgICAgIHJldHVybiAoKCh4KSB8ICh+KHkpKSkgXiAoeikpO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBmNCh4LCB5LCB6KSB7XG5cdCAgICAgICAgcmV0dXJuICgoKHgpICYgKHopKSB8ICgoeSkmKH4oeikpKSk7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIGY1KHgsIHksIHopIHtcblx0ICAgICAgICByZXR1cm4gKCh4KSBeICgoeSkgfCh+KHopKSkpO1xuXG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIHJvdGwoeCxuKSB7XG5cdCAgICAgICAgcmV0dXJuICh4PDxuKSB8ICh4Pj4+KDMyLW4pKTtcblx0ICAgIH1cblxuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuUklQRU1EMTYwKCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5SSVBFTUQxNjAod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5SSVBFTUQxNjAgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihSSVBFTUQxNjApO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1JJUEVNRDE2MChtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNSSVBFTUQxNjAgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoUklQRU1EMTYwKTtcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuUklQRU1EMTYwO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdFxuXHQgICAgdmFyIFcgPSBbXTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMSBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTEgPSBDX2FsZ28uU0hBMSA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgV29yZEFycmF5LmluaXQoW1xuXHQgICAgICAgICAgICAgICAgMHg2NzQ1MjMwMSwgMHhlZmNkYWI4OSxcblx0ICAgICAgICAgICAgICAgIDB4OThiYWRjZmUsIDB4MTAzMjU0NzYsXG5cdCAgICAgICAgICAgICAgICAweGMzZDJlMWYwXG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgIHZhciBhID0gSFswXTtcblx0ICAgICAgICAgICAgdmFyIGIgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgYyA9IEhbMl07XG5cdCAgICAgICAgICAgIHZhciBkID0gSFszXTtcblx0ICAgICAgICAgICAgdmFyIGUgPSBIWzRdO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGF0aW9uXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAxNikge1xuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBNW29mZnNldCArIGldIHwgMDtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSBXW2kgLSAzXSBeIFdbaSAtIDhdIF4gV1tpIC0gMTRdIF4gV1tpIC0gMTZdO1xuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSAobiA8PCAxKSB8IChuID4+PiAzMSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIHZhciB0ID0gKChhIDw8IDUpIHwgKGEgPj4+IDI3KSkgKyBlICsgV1tpXTtcblx0ICAgICAgICAgICAgICAgIGlmIChpIDwgMjApIHtcblx0ICAgICAgICAgICAgICAgICAgICB0ICs9ICgoYiAmIGMpIHwgKH5iICYgZCkpICsgMHg1YTgyNzk5OTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDQwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdCArPSAoYiBeIGMgXiBkKSArIDB4NmVkOWViYTE7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPCA2MCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHQgKz0gKChiICYgYykgfCAoYiAmIGQpIHwgKGMgJiBkKSkgLSAweDcwZTQ0MzI0O1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIC8qIGlmIChpIDwgODApICovIHtcblx0ICAgICAgICAgICAgICAgICAgICB0ICs9IChiIF4gYyBeIGQpIC0gMHgzNTlkM2UyYTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgZSA9IGQ7XG5cdCAgICAgICAgICAgICAgICBkID0gYztcblx0ICAgICAgICAgICAgICAgIGMgPSAoYiA8PCAzMCkgfCAoYiA+Pj4gMik7XG5cdCAgICAgICAgICAgICAgICBiID0gYTtcblx0ICAgICAgICAgICAgICAgIGEgPSB0O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSFswXSA9IChIWzBdICsgYSkgfCAwO1xuXHQgICAgICAgICAgICBIWzFdID0gKEhbMV0gKyBiKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMl0gPSAoSFsyXSArIGMpIHwgMDtcblx0ICAgICAgICAgICAgSFszXSA9IChIWzNdICsgZCkgfCAwO1xuXHQgICAgICAgICAgICBIWzRdID0gKEhbNF0gKyBlKSB8IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbbkJpdHNMZWZ0ID4+PiA1XSB8PSAweDgwIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTVdID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IGRhdGFXb3Jkcy5sZW5ndGggKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTEoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTEod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEExID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoU0hBMSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMShtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEExID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTEpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlNIQTE7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vc2hhMjU2XCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3NoYTI1NlwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cdCAgICB2YXIgU0hBMjU2ID0gQ19hbGdvLlNIQTI1NjtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMjI0IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMjI0ID0gQ19hbGdvLlNIQTIyNCA9IFNIQTI1Ni5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgV29yZEFycmF5LmluaXQoW1xuXHQgICAgICAgICAgICAgICAgMHhjMTA1OWVkOCwgMHgzNjdjZDUwNywgMHgzMDcwZGQxNywgMHhmNzBlNTkzOSxcblx0ICAgICAgICAgICAgICAgIDB4ZmZjMDBiMzEsIDB4Njg1ODE1MTEsIDB4NjRmOThmYTcsIDB4YmVmYTRmYTRcblx0ICAgICAgICAgICAgXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gU0hBMjU2Ll9kb0ZpbmFsaXplLmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgaGFzaC5zaWdCeXRlcyAtPSA0O1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMjI0KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyMjQod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEEyMjQgPSBTSEEyNTYuX2NyZWF0ZUhlbHBlcihTSEEyMjQpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTIyNChtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEEyMjQgPSBTSEEyNTYuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMjI0KTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEEyMjQ7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoTWF0aCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIEluaXRpYWxpemF0aW9uIGFuZCByb3VuZCBjb25zdGFudHMgdGFibGVzXG5cdCAgICB2YXIgSCA9IFtdO1xuXHQgICAgdmFyIEsgPSBbXTtcblxuXHQgICAgLy8gQ29tcHV0ZSBjb25zdGFudHNcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gaXNQcmltZShuKSB7XG5cdCAgICAgICAgICAgIHZhciBzcXJ0TiA9IE1hdGguc3FydChuKTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgZmFjdG9yID0gMjsgZmFjdG9yIDw9IHNxcnROOyBmYWN0b3IrKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKCEobiAlIGZhY3RvcikpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBmdW5jdGlvbiBnZXRGcmFjdGlvbmFsQml0cyhuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoKG4gLSAobiB8IDApKSAqIDB4MTAwMDAwMDAwKSB8IDA7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdmFyIG4gPSAyO1xuXHQgICAgICAgIHZhciBuUHJpbWUgPSAwO1xuXHQgICAgICAgIHdoaWxlIChuUHJpbWUgPCA2NCkge1xuXHQgICAgICAgICAgICBpZiAoaXNQcmltZShuKSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKG5QcmltZSA8IDgpIHtcblx0ICAgICAgICAgICAgICAgICAgICBIW25QcmltZV0gPSBnZXRGcmFjdGlvbmFsQml0cyhNYXRoLnBvdyhuLCAxIC8gMikpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgS1tuUHJpbWVdID0gZ2V0RnJhY3Rpb25hbEJpdHMoTWF0aC5wb3cobiwgMSAvIDMpKTtcblxuXHQgICAgICAgICAgICAgICAgblByaW1lKys7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBuKys7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0XG5cdCAgICB2YXIgVyA9IFtdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS0yNTYgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEEyNTYgPSBDX2FsZ28uU0hBMjU2ID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBXb3JkQXJyYXkuaW5pdChILnNsaWNlKDApKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBIID0gdGhpcy5faGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuXHQgICAgICAgICAgICB2YXIgYSA9IEhbMF07XG5cdCAgICAgICAgICAgIHZhciBiID0gSFsxXTtcblx0ICAgICAgICAgICAgdmFyIGMgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgZCA9IEhbM107XG5cdCAgICAgICAgICAgIHZhciBlID0gSFs0XTtcblx0ICAgICAgICAgICAgdmFyIGYgPSBIWzVdO1xuXHQgICAgICAgICAgICB2YXIgZyA9IEhbNl07XG5cdCAgICAgICAgICAgIHZhciBoID0gSFs3XTtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRhdGlvblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmIChpIDwgMTYpIHtcblx0ICAgICAgICAgICAgICAgICAgICBXW2ldID0gTVtvZmZzZXQgKyBpXSB8IDA7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4ID0gV1tpIC0gMTVdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTAgID0gKChnYW1tYTB4IDw8IDI1KSB8IChnYW1tYTB4ID4+PiA3KSkgIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2FtbWEweCA8PCAxNCkgfCAoZ2FtbWEweCA+Pj4gMTgpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbW1hMHggPj4+IDMpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXggPSBXW2kgLSAyXTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExICA9ICgoZ2FtbWExeCA8PCAxNSkgfCAoZ2FtbWExeCA+Pj4gMTcpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGdhbW1hMXggPDwgMTMpIHwgKGdhbW1hMXggPj4+IDE5KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChnYW1tYTF4ID4+PiAxMCk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBXW2ldID0gZ2FtbWEwICsgV1tpIC0gN10gKyBnYW1tYTEgKyBXW2kgLSAxNl07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIHZhciBjaCAgPSAoZSAmIGYpIF4gKH5lICYgZyk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFqID0gKGEgJiBiKSBeIChhICYgYykgXiAoYiAmIGMpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWEwID0gKChhIDw8IDMwKSB8IChhID4+PiAyKSkgXiAoKGEgPDwgMTkpIHwgKGEgPj4+IDEzKSkgXiAoKGEgPDwgMTApIHwgKGEgPj4+IDIyKSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWExID0gKChlIDw8IDI2KSB8IChlID4+PiA2KSkgXiAoKGUgPDwgMjEpIHwgKGUgPj4+IDExKSkgXiAoKGUgPDwgNykgIHwgKGUgPj4+IDI1KSk7XG5cblx0ICAgICAgICAgICAgICAgIHZhciB0MSA9IGggKyBzaWdtYTEgKyBjaCArIEtbaV0gKyBXW2ldO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQyID0gc2lnbWEwICsgbWFqO1xuXG5cdCAgICAgICAgICAgICAgICBoID0gZztcblx0ICAgICAgICAgICAgICAgIGcgPSBmO1xuXHQgICAgICAgICAgICAgICAgZiA9IGU7XG5cdCAgICAgICAgICAgICAgICBlID0gKGQgKyB0MSkgfCAwO1xuXHQgICAgICAgICAgICAgICAgZCA9IGM7XG5cdCAgICAgICAgICAgICAgICBjID0gYjtcblx0ICAgICAgICAgICAgICAgIGIgPSBhO1xuXHQgICAgICAgICAgICAgICAgYSA9ICh0MSArIHQyKSB8IDA7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIWzBdID0gKEhbMF0gKyBhKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMV0gPSAoSFsxXSArIGIpIHwgMDtcblx0ICAgICAgICAgICAgSFsyXSA9IChIWzJdICsgYykgfCAwO1xuXHQgICAgICAgICAgICBIWzNdID0gKEhbM10gKyBkKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNF0gPSAoSFs0XSArIGUpIHwgMDtcblx0ICAgICAgICAgICAgSFs1XSA9IChIWzVdICsgZikgfCAwO1xuXHQgICAgICAgICAgICBIWzZdID0gKEhbNl0gKyBnKSB8IDA7XG5cdCAgICAgICAgICAgIEhbN10gPSAoSFs3XSArIGgpIHwgMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IE1hdGguZmxvb3IobkJpdHNUb3RhbCAvIDB4MTAwMDAwMDAwKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNV0gPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gZGF0YVdvcmRzLmxlbmd0aCAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMjU2KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyNTYod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEEyNTYgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEEyNTYpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTI1NihtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEEyNTYgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMjU2KTtcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuU0hBMjU2O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3g2NC1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3g2NC1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKE1hdGgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ194NjQgPSBDLng2NDtcblx0ICAgIHZhciBYNjRXb3JkID0gQ194NjQuV29yZDtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIENvbnN0YW50cyB0YWJsZXNcblx0ICAgIHZhciBSSE9fT0ZGU0VUUyA9IFtdO1xuXHQgICAgdmFyIFBJX0lOREVYRVMgID0gW107XG5cdCAgICB2YXIgUk9VTkRfQ09OU1RBTlRTID0gW107XG5cblx0ICAgIC8vIENvbXB1dGUgQ29uc3RhbnRzXG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIC8vIENvbXB1dGUgcmhvIG9mZnNldCBjb25zdGFudHNcblx0ICAgICAgICB2YXIgeCA9IDEsIHkgPSAwO1xuXHQgICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgMjQ7IHQrKykge1xuXHQgICAgICAgICAgICBSSE9fT0ZGU0VUU1t4ICsgNSAqIHldID0gKCh0ICsgMSkgKiAodCArIDIpIC8gMikgJSA2NDtcblxuXHQgICAgICAgICAgICB2YXIgbmV3WCA9IHkgJSA1O1xuXHQgICAgICAgICAgICB2YXIgbmV3WSA9ICgyICogeCArIDMgKiB5KSAlIDU7XG5cdCAgICAgICAgICAgIHggPSBuZXdYO1xuXHQgICAgICAgICAgICB5ID0gbmV3WTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBDb21wdXRlIHBpIGluZGV4IGNvbnN0YW50c1xuXHQgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgNTsgeCsrKSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgNTsgeSsrKSB7XG5cdCAgICAgICAgICAgICAgICBQSV9JTkRFWEVTW3ggKyA1ICogeV0gPSB5ICsgKCgyICogeCArIDMgKiB5KSAlIDUpICogNTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIENvbXB1dGUgcm91bmQgY29uc3RhbnRzXG5cdCAgICAgICAgdmFyIExGU1IgPSAweDAxO1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuXHQgICAgICAgICAgICB2YXIgcm91bmRDb25zdGFudE1zdyA9IDA7XG5cdCAgICAgICAgICAgIHZhciByb3VuZENvbnN0YW50THN3ID0gMDtcblxuXHQgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDc7IGorKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKExGU1IgJiAweDAxKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGJpdFBvc2l0aW9uID0gKDEgPDwgaikgLSAxO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChiaXRQb3NpdGlvbiA8IDMyKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kQ29uc3RhbnRMc3cgXj0gMSA8PCBiaXRQb3NpdGlvbjtcblx0ICAgICAgICAgICAgICAgICAgICB9IGVsc2UgLyogaWYgKGJpdFBvc2l0aW9uID49IDMyKSAqLyB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kQ29uc3RhbnRNc3cgXj0gMSA8PCAoYml0UG9zaXRpb24gLSAzMik7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBDb21wdXRlIG5leHQgTEZTUlxuXHQgICAgICAgICAgICAgICAgaWYgKExGU1IgJiAweDgwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gUHJpbWl0aXZlIHBvbHlub21pYWwgb3ZlciBHRigyKTogeF44ICsgeF42ICsgeF41ICsgeF40ICsgMVxuXHQgICAgICAgICAgICAgICAgICAgIExGU1IgPSAoTEZTUiA8PCAxKSBeIDB4NzE7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIExGU1IgPDw9IDE7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBST1VORF9DT05TVEFOVFNbaV0gPSBYNjRXb3JkLmNyZWF0ZShyb3VuZENvbnN0YW50TXN3LCByb3VuZENvbnN0YW50THN3KTtcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvLyBSZXVzYWJsZSBvYmplY3RzIGZvciB0ZW1wb3JhcnkgdmFsdWVzXG5cdCAgICB2YXIgVCA9IFtdO1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1OyBpKyspIHtcblx0ICAgICAgICAgICAgVFtpXSA9IFg2NFdvcmQuY3JlYXRlKCk7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMyBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTMgPSBDX2FsZ28uU0hBMyA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBvdXRwdXRMZW5ndGhcblx0ICAgICAgICAgKiAgIFRoZSBkZXNpcmVkIG51bWJlciBvZiBiaXRzIGluIHRoZSBvdXRwdXQgaGFzaC5cblx0ICAgICAgICAgKiAgIE9ubHkgdmFsdWVzIHBlcm1pdHRlZCBhcmU6IDIyNCwgMjU2LCAzODQsIDUxMi5cblx0ICAgICAgICAgKiAgIERlZmF1bHQ6IDUxMlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogSGFzaGVyLmNmZy5leHRlbmQoe1xuXHQgICAgICAgICAgICBvdXRwdXRMZW5ndGg6IDUxMlxuXHQgICAgICAgIH0pLFxuXG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5fc3RhdGUgPSBbXVxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHN0YXRlW2ldID0gbmV3IFg2NFdvcmQuaW5pdCgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgdGhpcy5ibG9ja1NpemUgPSAoMTYwMCAtIDIgKiB0aGlzLmNmZy5vdXRwdXRMZW5ndGgpIC8gMzI7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5fc3RhdGU7XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tTaXplTGFuZXMgPSB0aGlzLmJsb2NrU2l6ZSAvIDI7XG5cblx0ICAgICAgICAgICAgLy8gQWJzb3JiXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbkJsb2NrU2l6ZUxhbmVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIE0yaSAgPSBNW29mZnNldCArIDIgKiBpXTtcblx0ICAgICAgICAgICAgICAgIHZhciBNMmkxID0gTVtvZmZzZXQgKyAyICogaSArIDFdO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICAgICAgTTJpID0gKFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE0yaSA8PCA4KSAgfCAoTTJpID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE0yaSA8PCAyNCkgfCAoTTJpID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgICAgICBNMmkxID0gKFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE0yaTEgPDwgOCkgIHwgKE0yaTEgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgKCgoTTJpMSA8PCAyNCkgfCAoTTJpMSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICAgICApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBBYnNvcmIgbWVzc2FnZSBpbnRvIHN0YXRlXG5cdCAgICAgICAgICAgICAgICB2YXIgbGFuZSA9IHN0YXRlW2ldO1xuXHQgICAgICAgICAgICAgICAgbGFuZS5oaWdoIF49IE0yaTE7XG5cdCAgICAgICAgICAgICAgICBsYW5lLmxvdyAgXj0gTTJpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUm91bmRzXG5cdCAgICAgICAgICAgIGZvciAodmFyIHJvdW5kID0gMDsgcm91bmQgPCAyNDsgcm91bmQrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gVGhldGFcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgNTsgeCsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gTWl4IGNvbHVtbiBsYW5lc1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0TXN3ID0gMCwgdExzdyA9IDA7XG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCA1OyB5KyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmUgPSBzdGF0ZVt4ICsgNSAqIHldO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0TXN3IF49IGxhbmUuaGlnaDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdExzdyBePSBsYW5lLmxvdztcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBUZW1wb3JhcnkgdmFsdWVzXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFR4ID0gVFt4XTtcblx0ICAgICAgICAgICAgICAgICAgICBUeC5oaWdoID0gdE1zdztcblx0ICAgICAgICAgICAgICAgICAgICBUeC5sb3cgID0gdExzdztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgNTsgeCsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFR4NCA9IFRbKHggKyA0KSAlIDVdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBUeDEgPSBUWyh4ICsgMSkgJSA1XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgVHgxTXN3ID0gVHgxLmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFR4MUxzdyA9IFR4MS5sb3c7XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBNaXggc3Vycm91bmRpbmcgY29sdW1uc1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0TXN3ID0gVHg0LmhpZ2ggXiAoKFR4MU1zdyA8PCAxKSB8IChUeDFMc3cgPj4+IDMxKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHRMc3cgPSBUeDQubG93ICBeICgoVHgxTHN3IDw8IDEpIHwgKFR4MU1zdyA+Pj4gMzEpKTtcblx0ICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IDU7IHkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFuZSA9IHN0YXRlW3ggKyA1ICogeV07XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGxhbmUuaGlnaCBePSB0TXN3O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBsYW5lLmxvdyAgXj0gdExzdztcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJobyBQaVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgbGFuZUluZGV4ID0gMTsgbGFuZUluZGV4IDwgMjU7IGxhbmVJbmRleCsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmUgPSBzdGF0ZVtsYW5lSW5kZXhdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBsYW5lTXN3ID0gbGFuZS5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBsYW5lTHN3ID0gbGFuZS5sb3c7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHJob09mZnNldCA9IFJIT19PRkZTRVRTW2xhbmVJbmRleF07XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBSb3RhdGUgbGFuZXNcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocmhvT2Zmc2V0IDwgMzIpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRNc3cgPSAobGFuZU1zdyA8PCByaG9PZmZzZXQpIHwgKGxhbmVMc3cgPj4+ICgzMiAtIHJob09mZnNldCkpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdExzdyA9IChsYW5lTHN3IDw8IHJob09mZnNldCkgfCAobGFuZU1zdyA+Pj4gKDMyIC0gcmhvT2Zmc2V0KSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIC8qIGlmIChyaG9PZmZzZXQgPj0gMzIpICovIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRNc3cgPSAobGFuZUxzdyA8PCAocmhvT2Zmc2V0IC0gMzIpKSB8IChsYW5lTXN3ID4+PiAoNjQgLSByaG9PZmZzZXQpKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRMc3cgPSAobGFuZU1zdyA8PCAocmhvT2Zmc2V0IC0gMzIpKSB8IChsYW5lTHN3ID4+PiAoNjQgLSByaG9PZmZzZXQpKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBUcmFuc3Bvc2UgbGFuZXNcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgVFBpTGFuZSA9IFRbUElfSU5ERVhFU1tsYW5lSW5kZXhdXTtcblx0ICAgICAgICAgICAgICAgICAgICBUUGlMYW5lLmhpZ2ggPSB0TXN3O1xuXHQgICAgICAgICAgICAgICAgICAgIFRQaUxhbmUubG93ICA9IHRMc3c7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJobyBwaSBhdCB4ID0geSA9IDBcblx0ICAgICAgICAgICAgICAgIHZhciBUMCA9IFRbMF07XG5cdCAgICAgICAgICAgICAgICB2YXIgc3RhdGUwID0gc3RhdGVbMF07XG5cdCAgICAgICAgICAgICAgICBUMC5oaWdoID0gc3RhdGUwLmhpZ2g7XG5cdCAgICAgICAgICAgICAgICBUMC5sb3cgID0gc3RhdGUwLmxvdztcblxuXHQgICAgICAgICAgICAgICAgLy8gQ2hpXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDU7IHgrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgNTsgeSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFuZUluZGV4ID0geCArIDUgKiB5O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFuZSA9IHN0YXRlW2xhbmVJbmRleF07XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBUTGFuZSA9IFRbbGFuZUluZGV4XTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFR4MUxhbmUgPSBUWygoeCArIDEpICUgNSkgKyA1ICogeV07XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBUeDJMYW5lID0gVFsoKHggKyAyKSAlIDUpICsgNSAqIHldO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1peCByb3dzXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGxhbmUuaGlnaCA9IFRMYW5lLmhpZ2ggXiAoflR4MUxhbmUuaGlnaCAmIFR4MkxhbmUuaGlnaCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGxhbmUubG93ICA9IFRMYW5lLmxvdyAgXiAoflR4MUxhbmUubG93ICAmIFR4MkxhbmUubG93KTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIElvdGFcblx0ICAgICAgICAgICAgICAgIHZhciBsYW5lID0gc3RhdGVbMF07XG5cdCAgICAgICAgICAgICAgICB2YXIgcm91bmRDb25zdGFudCA9IFJPVU5EX0NPTlNUQU5UU1tyb3VuZF07XG5cdCAgICAgICAgICAgICAgICBsYW5lLmhpZ2ggXj0gcm91bmRDb25zdGFudC5oaWdoO1xuXHQgICAgICAgICAgICAgICAgbGFuZS5sb3cgIF49IHJvdW5kQ29uc3RhbnQubG93Oztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplQml0cyA9IHRoaXMuYmxvY2tTaXplICogMzI7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHgxIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoTWF0aC5jZWlsKChuQml0c0xlZnQgKyAxKSAvIGJsb2NrU2l6ZUJpdHMpICogYmxvY2tTaXplQml0cykgPj4+IDUpIC0gMV0gfD0gMHg4MDtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IGRhdGFXb3Jkcy5sZW5ndGggKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5fc3RhdGU7XG5cdCAgICAgICAgICAgIHZhciBvdXRwdXRMZW5ndGhCeXRlcyA9IHRoaXMuY2ZnLm91dHB1dExlbmd0aCAvIDg7XG5cdCAgICAgICAgICAgIHZhciBvdXRwdXRMZW5ndGhMYW5lcyA9IG91dHB1dExlbmd0aEJ5dGVzIC8gODtcblxuXHQgICAgICAgICAgICAvLyBTcXVlZXplXG5cdCAgICAgICAgICAgIHZhciBoYXNoV29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvdXRwdXRMZW5ndGhMYW5lczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBsYW5lID0gc3RhdGVbaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgbGFuZU1zdyA9IGxhbmUuaGlnaDtcblx0ICAgICAgICAgICAgICAgIHZhciBsYW5lTHN3ID0gbGFuZS5sb3c7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgICAgICBsYW5lTXN3ID0gKFxuXHQgICAgICAgICAgICAgICAgICAgICgoKGxhbmVNc3cgPDwgOCkgIHwgKGxhbmVNc3cgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgKCgobGFuZU1zdyA8PCAyNCkgfCAobGFuZU1zdyA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICAgICAgbGFuZUxzdyA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChsYW5lTHN3IDw8IDgpICB8IChsYW5lTHN3ID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKGxhbmVMc3cgPDwgMjQpIHwgKGxhbmVMc3cgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICAgICAgKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gU3F1ZWV6ZSBzdGF0ZSB0byByZXRyaWV2ZSBoYXNoXG5cdCAgICAgICAgICAgICAgICBoYXNoV29yZHMucHVzaChsYW5lTHN3KTtcblx0ICAgICAgICAgICAgICAgIGhhc2hXb3Jkcy5wdXNoKGxhbmVNc3cpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdChoYXNoV29yZHMsIG91dHB1dExlbmd0aEJ5dGVzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgdmFyIHN0YXRlID0gY2xvbmUuX3N0YXRlID0gdGhpcy5fc3RhdGUuc2xpY2UoMCk7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgc3RhdGVbaV0gPSBzdGF0ZVtpXS5jbG9uZSgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMygnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMyh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTMgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEEzKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEEzKG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTMgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMyk7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlNIQTM7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4veDY0LWNvcmVcIiksIHJlcXVpcmUoXCIuL3NoYTUxMlwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi94NjQtY29yZVwiLCBcIi4vc2hhNTEyXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfeDY0ID0gQy54NjQ7XG5cdCAgICB2YXIgWDY0V29yZCA9IENfeDY0LldvcmQ7XG5cdCAgICB2YXIgWDY0V29yZEFycmF5ID0gQ194NjQuV29yZEFycmF5O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblx0ICAgIHZhciBTSEE1MTIgPSBDX2FsZ28uU0hBNTEyO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS0zODQgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEEzODQgPSBDX2FsZ28uU0hBMzg0ID0gU0hBNTEyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBYNjRXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4Y2JiYjlkNWQsIDB4YzEwNTllZDgpLCBuZXcgWDY0V29yZC5pbml0KDB4NjI5YTI5MmEsIDB4MzY3Y2Q1MDcpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDkxNTkwMTVhLCAweDMwNzBkZDE3KSwgbmV3IFg2NFdvcmQuaW5pdCgweDE1MmZlY2Q4LCAweGY3MGU1OTM5KSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg2NzMzMjY2NywgMHhmZmMwMGIzMSksIG5ldyBYNjRXb3JkLmluaXQoMHg4ZWI0NGE4NywgMHg2ODU4MTUxMSksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4ZGIwYzJlMGQsIDB4NjRmOThmYTcpLCBuZXcgWDY0V29yZC5pbml0KDB4NDdiNTQ4MWQsIDB4YmVmYTRmYTQpXG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IFNIQTUxMi5fZG9GaW5hbGl6ZS5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIGhhc2guc2lnQnl0ZXMgLT0gMTY7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEzODQoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTM4NCh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTM4NCA9IFNIQTUxMi5fY3JlYXRlSGVscGVyKFNIQTM4NCk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMzg0KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTM4NCA9IFNIQTUxMi5fY3JlYXRlSG1hY0hlbHBlcihTSEEzODQpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlNIQTM4NDtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi94NjQtY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi94NjQtY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX3g2NCA9IEMueDY0O1xuXHQgICAgdmFyIFg2NFdvcmQgPSBDX3g2NC5Xb3JkO1xuXHQgICAgdmFyIFg2NFdvcmRBcnJheSA9IENfeDY0LldvcmRBcnJheTtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIGZ1bmN0aW9uIFg2NFdvcmRfY3JlYXRlKCkge1xuXHQgICAgICAgIHJldHVybiBYNjRXb3JkLmNyZWF0ZS5hcHBseShYNjRXb3JkLCBhcmd1bWVudHMpO1xuXHQgICAgfVxuXG5cdCAgICAvLyBDb25zdGFudHNcblx0ICAgIHZhciBLID0gW1xuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NDI4YTJmOTgsIDB4ZDcyOGFlMjIpLCBYNjRXb3JkX2NyZWF0ZSgweDcxMzc0NDkxLCAweDIzZWY2NWNkKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGI1YzBmYmNmLCAweGVjNGQzYjJmKSwgWDY0V29yZF9jcmVhdGUoMHhlOWI1ZGJhNSwgMHg4MTg5ZGJiYyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgzOTU2YzI1YiwgMHhmMzQ4YjUzOCksIFg2NFdvcmRfY3JlYXRlKDB4NTlmMTExZjEsIDB4YjYwNWQwMTkpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4OTIzZjgyYTQsIDB4YWYxOTRmOWIpLCBYNjRXb3JkX2NyZWF0ZSgweGFiMWM1ZWQ1LCAweGRhNmQ4MTE4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGQ4MDdhYTk4LCAweGEzMDMwMjQyKSwgWDY0V29yZF9jcmVhdGUoMHgxMjgzNWIwMSwgMHg0NTcwNmZiZSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyNDMxODViZSwgMHg0ZWU0YjI4YyksIFg2NFdvcmRfY3JlYXRlKDB4NTUwYzdkYzMsIDB4ZDVmZmI0ZTIpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NzJiZTVkNzQsIDB4ZjI3Yjg5NmYpLCBYNjRXb3JkX2NyZWF0ZSgweDgwZGViMWZlLCAweDNiMTY5NmIxKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDliZGMwNmE3LCAweDI1YzcxMjM1KSwgWDY0V29yZF9jcmVhdGUoMHhjMTliZjE3NCwgMHhjZjY5MjY5NCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhlNDliNjljMSwgMHg5ZWYxNGFkMiksIFg2NFdvcmRfY3JlYXRlKDB4ZWZiZTQ3ODYsIDB4Mzg0ZjI1ZTMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MGZjMTlkYzYsIDB4OGI4Y2Q1YjUpLCBYNjRXb3JkX2NyZWF0ZSgweDI0MGNhMWNjLCAweDc3YWM5YzY1KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDJkZTkyYzZmLCAweDU5MmIwMjc1KSwgWDY0V29yZF9jcmVhdGUoMHg0YTc0ODRhYSwgMHg2ZWE2ZTQ4MyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg1Y2IwYTlkYywgMHhiZDQxZmJkNCksIFg2NFdvcmRfY3JlYXRlKDB4NzZmOTg4ZGEsIDB4ODMxMTUzYjUpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4OTgzZTUxNTIsIDB4ZWU2NmRmYWIpLCBYNjRXb3JkX2NyZWF0ZSgweGE4MzFjNjZkLCAweDJkYjQzMjEwKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGIwMDMyN2M4LCAweDk4ZmIyMTNmKSwgWDY0V29yZF9jcmVhdGUoMHhiZjU5N2ZjNywgMHhiZWVmMGVlNCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhjNmUwMGJmMywgMHgzZGE4OGZjMiksIFg2NFdvcmRfY3JlYXRlKDB4ZDVhNzkxNDcsIDB4OTMwYWE3MjUpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MDZjYTYzNTEsIDB4ZTAwMzgyNmYpLCBYNjRXb3JkX2NyZWF0ZSgweDE0MjkyOTY3LCAweDBhMGU2ZTcwKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDI3YjcwYTg1LCAweDQ2ZDIyZmZjKSwgWDY0V29yZF9jcmVhdGUoMHgyZTFiMjEzOCwgMHg1YzI2YzkyNiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg0ZDJjNmRmYywgMHg1YWM0MmFlZCksIFg2NFdvcmRfY3JlYXRlKDB4NTMzODBkMTMsIDB4OWQ5NWIzZGYpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NjUwYTczNTQsIDB4OGJhZjYzZGUpLCBYNjRXb3JkX2NyZWF0ZSgweDc2NmEwYWJiLCAweDNjNzdiMmE4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDgxYzJjOTJlLCAweDQ3ZWRhZWU2KSwgWDY0V29yZF9jcmVhdGUoMHg5MjcyMmM4NSwgMHgxNDgyMzUzYiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhhMmJmZThhMSwgMHg0Y2YxMDM2NCksIFg2NFdvcmRfY3JlYXRlKDB4YTgxYTY2NGIsIDB4YmM0MjMwMDEpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YzI0YjhiNzAsIDB4ZDBmODk3OTEpLCBYNjRXb3JkX2NyZWF0ZSgweGM3NmM1MWEzLCAweDA2NTRiZTMwKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGQxOTJlODE5LCAweGQ2ZWY1MjE4KSwgWDY0V29yZF9jcmVhdGUoMHhkNjk5MDYyNCwgMHg1NTY1YTkxMCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhmNDBlMzU4NSwgMHg1NzcxMjAyYSksIFg2NFdvcmRfY3JlYXRlKDB4MTA2YWEwNzAsIDB4MzJiYmQxYjgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MTlhNGMxMTYsIDB4YjhkMmQwYzgpLCBYNjRXb3JkX2NyZWF0ZSgweDFlMzc2YzA4LCAweDUxNDFhYjUzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDI3NDg3NzRjLCAweGRmOGVlYjk5KSwgWDY0V29yZF9jcmVhdGUoMHgzNGIwYmNiNSwgMHhlMTliNDhhOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgzOTFjMGNiMywgMHhjNWM5NWE2MyksIFg2NFdvcmRfY3JlYXRlKDB4NGVkOGFhNGEsIDB4ZTM0MThhY2IpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NWI5Y2NhNGYsIDB4Nzc2M2UzNzMpLCBYNjRXb3JkX2NyZWF0ZSgweDY4MmU2ZmYzLCAweGQ2YjJiOGEzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDc0OGY4MmVlLCAweDVkZWZiMmZjKSwgWDY0V29yZF9jcmVhdGUoMHg3OGE1NjM2ZiwgMHg0MzE3MmY2MCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg4NGM4NzgxNCwgMHhhMWYwYWI3MiksIFg2NFdvcmRfY3JlYXRlKDB4OGNjNzAyMDgsIDB4MWE2NDM5ZWMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4OTBiZWZmZmEsIDB4MjM2MzFlMjgpLCBYNjRXb3JkX2NyZWF0ZSgweGE0NTA2Y2ViLCAweGRlODJiZGU5KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGJlZjlhM2Y3LCAweGIyYzY3OTE1KSwgWDY0V29yZF9jcmVhdGUoMHhjNjcxNzhmMiwgMHhlMzcyNTMyYiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhjYTI3M2VjZSwgMHhlYTI2NjE5YyksIFg2NFdvcmRfY3JlYXRlKDB4ZDE4NmI4YzcsIDB4MjFjMGMyMDcpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZWFkYTdkZDYsIDB4Y2RlMGViMWUpLCBYNjRXb3JkX2NyZWF0ZSgweGY1N2Q0ZjdmLCAweGVlNmVkMTc4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDA2ZjA2N2FhLCAweDcyMTc2ZmJhKSwgWDY0V29yZF9jcmVhdGUoMHgwYTYzN2RjNSwgMHhhMmM4OThhNiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgxMTNmOTgwNCwgMHhiZWY5MGRhZSksIFg2NFdvcmRfY3JlYXRlKDB4MWI3MTBiMzUsIDB4MTMxYzQ3MWIpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MjhkYjc3ZjUsIDB4MjMwNDdkODQpLCBYNjRXb3JkX2NyZWF0ZSgweDMyY2FhYjdiLCAweDQwYzcyNDkzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDNjOWViZTBhLCAweDE1YzliZWJjKSwgWDY0V29yZF9jcmVhdGUoMHg0MzFkNjdjNCwgMHg5YzEwMGQ0YyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg0Y2M1ZDRiZSwgMHhjYjNlNDJiNiksIFg2NFdvcmRfY3JlYXRlKDB4NTk3ZjI5OWMsIDB4ZmM2NTdlMmEpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NWZjYjZmYWIsIDB4M2FkNmZhZWMpLCBYNjRXb3JkX2NyZWF0ZSgweDZjNDQxOThjLCAweDRhNDc1ODE3KVxuXHQgICAgXTtcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0c1xuXHQgICAgdmFyIFcgPSBbXTtcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4MDsgaSsrKSB7XG5cdCAgICAgICAgICAgIFdbaV0gPSBYNjRXb3JkX2NyZWF0ZSgpO1xuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTUxMiBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTUxMiA9IENfYWxnby5TSEE1MTIgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFg2NFdvcmRBcnJheS5pbml0KFtcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg2YTA5ZTY2NywgMHhmM2JjYzkwOCksIG5ldyBYNjRXb3JkLmluaXQoMHhiYjY3YWU4NSwgMHg4NGNhYTczYiksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4M2M2ZWYzNzIsIDB4ZmU5NGY4MmIpLCBuZXcgWDY0V29yZC5pbml0KDB4YTU0ZmY1M2EsIDB4NWYxZDM2ZjEpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDUxMGU1MjdmLCAweGFkZTY4MmQxKSwgbmV3IFg2NFdvcmQuaW5pdCgweDliMDU2ODhjLCAweDJiM2U2YzFmKSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHgxZjgzZDlhYiwgMHhmYjQxYmQ2YiksIG5ldyBYNjRXb3JkLmluaXQoMHg1YmUwY2QxOSwgMHgxMzdlMjE3OSlcblx0ICAgICAgICAgICAgXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBIMCA9IEhbMF07XG5cdCAgICAgICAgICAgIHZhciBIMSA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBIMiA9IEhbMl07XG5cdCAgICAgICAgICAgIHZhciBIMyA9IEhbM107XG5cdCAgICAgICAgICAgIHZhciBINCA9IEhbNF07XG5cdCAgICAgICAgICAgIHZhciBINSA9IEhbNV07XG5cdCAgICAgICAgICAgIHZhciBINiA9IEhbNl07XG5cdCAgICAgICAgICAgIHZhciBINyA9IEhbN107XG5cblx0ICAgICAgICAgICAgdmFyIEgwaCA9IEgwLmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIMGwgPSBIMC5sb3c7XG5cdCAgICAgICAgICAgIHZhciBIMWggPSBIMS5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDFsID0gSDEubG93O1xuXHQgICAgICAgICAgICB2YXIgSDJoID0gSDIuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEgybCA9IEgyLmxvdztcblx0ICAgICAgICAgICAgdmFyIEgzaCA9IEgzLmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIM2wgPSBIMy5sb3c7XG5cdCAgICAgICAgICAgIHZhciBINGggPSBINC5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDRsID0gSDQubG93O1xuXHQgICAgICAgICAgICB2YXIgSDVoID0gSDUuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg1bCA9IEg1Lmxvdztcblx0ICAgICAgICAgICAgdmFyIEg2aCA9IEg2LmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBINmwgPSBINi5sb3c7XG5cdCAgICAgICAgICAgIHZhciBIN2ggPSBINy5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDdsID0gSDcubG93O1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgIHZhciBhaCA9IEgwaDtcblx0ICAgICAgICAgICAgdmFyIGFsID0gSDBsO1xuXHQgICAgICAgICAgICB2YXIgYmggPSBIMWg7XG5cdCAgICAgICAgICAgIHZhciBibCA9IEgxbDtcblx0ICAgICAgICAgICAgdmFyIGNoID0gSDJoO1xuXHQgICAgICAgICAgICB2YXIgY2wgPSBIMmw7XG5cdCAgICAgICAgICAgIHZhciBkaCA9IEgzaDtcblx0ICAgICAgICAgICAgdmFyIGRsID0gSDNsO1xuXHQgICAgICAgICAgICB2YXIgZWggPSBINGg7XG5cdCAgICAgICAgICAgIHZhciBlbCA9IEg0bDtcblx0ICAgICAgICAgICAgdmFyIGZoID0gSDVoO1xuXHQgICAgICAgICAgICB2YXIgZmwgPSBINWw7XG5cdCAgICAgICAgICAgIHZhciBnaCA9IEg2aDtcblx0ICAgICAgICAgICAgdmFyIGdsID0gSDZsO1xuXHQgICAgICAgICAgICB2YXIgaGggPSBIN2g7XG5cdCAgICAgICAgICAgIHZhciBobCA9IEg3bDtcblxuXHQgICAgICAgICAgICAvLyBSb3VuZHNcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4MDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICAgICAgdmFyIFdpID0gV1tpXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gRXh0ZW5kIG1lc3NhZ2Vcblx0ICAgICAgICAgICAgICAgIGlmIChpIDwgMTYpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2loID0gV2kuaGlnaCA9IE1bb2Zmc2V0ICsgaSAqIDJdICAgICB8IDA7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpbCA9IFdpLmxvdyAgPSBNW29mZnNldCArIGkgKiAyICsgMV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBHYW1tYTBcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweCAgPSBXW2kgLSAxNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHhoID0gZ2FtbWEweC5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4bCA9IGdhbW1hMHgubG93O1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTBoICA9ICgoZ2FtbWEweGggPj4+IDEpIHwgKGdhbW1hMHhsIDw8IDMxKSkgXiAoKGdhbW1hMHhoID4+PiA4KSB8IChnYW1tYTB4bCA8PCAyNCkpIF4gKGdhbW1hMHhoID4+PiA3KTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwbCAgPSAoKGdhbW1hMHhsID4+PiAxKSB8IChnYW1tYTB4aCA8PCAzMSkpIF4gKChnYW1tYTB4bCA+Pj4gOCkgfCAoZ2FtbWEweGggPDwgMjQpKSBeICgoZ2FtbWEweGwgPj4+IDcpIHwgKGdhbW1hMHhoIDw8IDI1KSk7XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBHYW1tYTFcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeCAgPSBXW2kgLSAyXTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeGggPSBnYW1tYTF4LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXhsID0gZ2FtbWExeC5sb3c7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMWggID0gKChnYW1tYTF4aCA+Pj4gMTkpIHwgKGdhbW1hMXhsIDw8IDEzKSkgXiAoKGdhbW1hMXhoIDw8IDMpIHwgKGdhbW1hMXhsID4+PiAyOSkpIF4gKGdhbW1hMXhoID4+PiA2KTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExbCAgPSAoKGdhbW1hMXhsID4+PiAxOSkgfCAoZ2FtbWExeGggPDwgMTMpKSBeICgoZ2FtbWExeGwgPDwgMykgfCAoZ2FtbWExeGggPj4+IDI5KSkgXiAoKGdhbW1hMXhsID4+PiA2KSB8IChnYW1tYTF4aCA8PCAyNikpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gV1tpXSA9IGdhbW1hMCArIFdbaSAtIDddICsgZ2FtbWExICsgV1tpIC0gMTZdXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpNyAgPSBXW2kgLSA3XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2k3aCA9IFdpNy5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTdsID0gV2k3LmxvdztcblxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTE2ICA9IFdbaSAtIDE2XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2kxNmggPSBXaTE2LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpMTZsID0gV2kxNi5sb3c7XG5cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2lsID0gZ2FtbWEwbCArIFdpN2w7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpaCA9IGdhbW1hMGggKyBXaTdoICsgKChXaWwgPj4+IDApIDwgKGdhbW1hMGwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaWwgPSBXaWwgKyBnYW1tYTFsO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaWggPSBXaWggKyBnYW1tYTFoICsgKChXaWwgPj4+IDApIDwgKGdhbW1hMWwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaWwgPSBXaWwgKyBXaTE2bDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2loID0gV2loICsgV2kxNmggKyAoKFdpbCA+Pj4gMCkgPCAoV2kxNmwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgV2kuaGlnaCA9IFdpaDtcblx0ICAgICAgICAgICAgICAgICAgICBXaS5sb3cgID0gV2lsO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICB2YXIgY2hoICA9IChlaCAmIGZoKSBeICh+ZWggJiBnaCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgY2hsICA9IChlbCAmIGZsKSBeICh+ZWwgJiBnbCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFqaCA9IChhaCAmIGJoKSBeIChhaCAmIGNoKSBeIChiaCAmIGNoKTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYWpsID0gKGFsICYgYmwpIF4gKGFsICYgY2wpIF4gKGJsICYgY2wpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWEwaCA9ICgoYWggPj4+IDI4KSB8IChhbCA8PCA0KSkgIF4gKChhaCA8PCAzMCkgIHwgKGFsID4+PiAyKSkgXiAoKGFoIDw8IDI1KSB8IChhbCA+Pj4gNykpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMGwgPSAoKGFsID4+PiAyOCkgfCAoYWggPDwgNCkpICBeICgoYWwgPDwgMzApICB8IChhaCA+Pj4gMikpIF4gKChhbCA8PCAyNSkgfCAoYWggPj4+IDcpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTFoID0gKChlaCA+Pj4gMTQpIHwgKGVsIDw8IDE4KSkgXiAoKGVoID4+PiAxOCkgfCAoZWwgPDwgMTQpKSBeICgoZWggPDwgMjMpIHwgKGVsID4+PiA5KSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWExbCA9ICgoZWwgPj4+IDE0KSB8IChlaCA8PCAxOCkpIF4gKChlbCA+Pj4gMTgpIHwgKGVoIDw8IDE0KSkgXiAoKGVsIDw8IDIzKSB8IChlaCA+Pj4gOSkpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyB0MSA9IGggKyBzaWdtYTEgKyBjaCArIEtbaV0gKyBXW2ldXG5cdCAgICAgICAgICAgICAgICB2YXIgS2kgID0gS1tpXTtcblx0ICAgICAgICAgICAgICAgIHZhciBLaWggPSBLaS5oaWdoO1xuXHQgICAgICAgICAgICAgICAgdmFyIEtpbCA9IEtpLmxvdztcblxuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IGhsICsgc2lnbWExbDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSBoaCArIHNpZ21hMWggKyAoKHQxbCA+Pj4gMCkgPCAoaGwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IHQxbCArIGNobDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSB0MWggKyBjaGggKyAoKHQxbCA+Pj4gMCkgPCAoY2hsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWwgPSB0MWwgKyBLaWw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFoID0gdDFoICsgS2loICsgKCh0MWwgPj4+IDApIDwgKEtpbCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFsID0gdDFsICsgV2lsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxaCA9IHQxaCArIFdpaCArICgodDFsID4+PiAwKSA8IChXaWwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyB0MiA9IHNpZ21hMCArIG1halxuXHQgICAgICAgICAgICAgICAgdmFyIHQybCA9IHNpZ21hMGwgKyBtYWpsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQyaCA9IHNpZ21hMGggKyBtYWpoICsgKCh0MmwgPj4+IDApIDwgKHNpZ21hMGwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBVcGRhdGUgd29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgICAgIGhoID0gZ2g7XG5cdCAgICAgICAgICAgICAgICBobCA9IGdsO1xuXHQgICAgICAgICAgICAgICAgZ2ggPSBmaDtcblx0ICAgICAgICAgICAgICAgIGdsID0gZmw7XG5cdCAgICAgICAgICAgICAgICBmaCA9IGVoO1xuXHQgICAgICAgICAgICAgICAgZmwgPSBlbDtcblx0ICAgICAgICAgICAgICAgIGVsID0gKGRsICsgdDFsKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBlaCA9IChkaCArIHQxaCArICgoZWwgPj4+IDApIDwgKGRsID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgICAgICAgICAgZGggPSBjaDtcblx0ICAgICAgICAgICAgICAgIGRsID0gY2w7XG5cdCAgICAgICAgICAgICAgICBjaCA9IGJoO1xuXHQgICAgICAgICAgICAgICAgY2wgPSBibDtcblx0ICAgICAgICAgICAgICAgIGJoID0gYWg7XG5cdCAgICAgICAgICAgICAgICBibCA9IGFsO1xuXHQgICAgICAgICAgICAgICAgYWwgPSAodDFsICsgdDJsKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBhaCA9ICh0MWggKyB0MmggKyAoKGFsID4+PiAwKSA8ICh0MWwgPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIMGwgPSBIMC5sb3cgID0gKEgwbCArIGFsKTtcblx0ICAgICAgICAgICAgSDAuaGlnaCA9IChIMGggKyBhaCArICgoSDBsID4+PiAwKSA8IChhbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIMWwgPSBIMS5sb3cgID0gKEgxbCArIGJsKTtcblx0ICAgICAgICAgICAgSDEuaGlnaCA9IChIMWggKyBiaCArICgoSDFsID4+PiAwKSA8IChibCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIMmwgPSBIMi5sb3cgID0gKEgybCArIGNsKTtcblx0ICAgICAgICAgICAgSDIuaGlnaCA9IChIMmggKyBjaCArICgoSDJsID4+PiAwKSA8IChjbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIM2wgPSBIMy5sb3cgID0gKEgzbCArIGRsKTtcblx0ICAgICAgICAgICAgSDMuaGlnaCA9IChIM2ggKyBkaCArICgoSDNsID4+PiAwKSA8IChkbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINGwgPSBINC5sb3cgID0gKEg0bCArIGVsKTtcblx0ICAgICAgICAgICAgSDQuaGlnaCA9IChINGggKyBlaCArICgoSDRsID4+PiAwKSA8IChlbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINWwgPSBINS5sb3cgID0gKEg1bCArIGZsKTtcblx0ICAgICAgICAgICAgSDUuaGlnaCA9IChINWggKyBmaCArICgoSDVsID4+PiAwKSA8IChmbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINmwgPSBINi5sb3cgID0gKEg2bCArIGdsKTtcblx0ICAgICAgICAgICAgSDYuaGlnaCA9IChINmggKyBnaCArICgoSDZsID4+PiAwKSA8IChnbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIN2wgPSBINy5sb3cgID0gKEg3bCArIGhsKTtcblx0ICAgICAgICAgICAgSDcuaGlnaCA9IChIN2ggKyBoaCArICgoSDdsID4+PiAwKSA8IChobCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyAxMjgpID4+PiAxMCkgPDwgNSkgKyAzMF0gPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyAxMjgpID4+PiAxMCkgPDwgNSkgKyAzMV0gPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gZGF0YVdvcmRzLmxlbmd0aCAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgaGFzaCB0byAzMi1iaXQgd29yZCBhcnJheSBiZWZvcmUgcmV0dXJuaW5nXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5faGFzaC50b1gzMigpO1xuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDEwMjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBNTEyKCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEE1MTIod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEE1MTIgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEE1MTIpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTUxMihtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEE1MTIgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBNTEyKTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEE1MTI7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vZW5jLWJhc2U2NFwiKSwgcmVxdWlyZShcIi4vbWQ1XCIpLCByZXF1aXJlKFwiLi9ldnBrZGZcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2VuYy1iYXNlNjRcIiwgXCIuL21kNVwiLCBcIi4vZXZwa2RmXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBCbG9ja0NpcGhlciA9IENfbGliLkJsb2NrQ2lwaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gUGVybXV0ZWQgQ2hvaWNlIDEgY29uc3RhbnRzXG5cdCAgICB2YXIgUEMxID0gW1xuXHQgICAgICAgIDU3LCA0OSwgNDEsIDMzLCAyNSwgMTcsIDksICAxLFxuXHQgICAgICAgIDU4LCA1MCwgNDIsIDM0LCAyNiwgMTgsIDEwLCAyLFxuXHQgICAgICAgIDU5LCA1MSwgNDMsIDM1LCAyNywgMTksIDExLCAzLFxuXHQgICAgICAgIDYwLCA1MiwgNDQsIDM2LCA2MywgNTUsIDQ3LCAzOSxcblx0ICAgICAgICAzMSwgMjMsIDE1LCA3LCAgNjIsIDU0LCA0NiwgMzgsXG5cdCAgICAgICAgMzAsIDIyLCAxNCwgNiwgIDYxLCA1MywgNDUsIDM3LFxuXHQgICAgICAgIDI5LCAyMSwgMTMsIDUsICAyOCwgMjAsIDEyLCA0XG5cdCAgICBdO1xuXG5cdCAgICAvLyBQZXJtdXRlZCBDaG9pY2UgMiBjb25zdGFudHNcblx0ICAgIHZhciBQQzIgPSBbXG5cdCAgICAgICAgMTQsIDE3LCAxMSwgMjQsIDEsICA1LFxuXHQgICAgICAgIDMsICAyOCwgMTUsIDYsICAyMSwgMTAsXG5cdCAgICAgICAgMjMsIDE5LCAxMiwgNCwgIDI2LCA4LFxuXHQgICAgICAgIDE2LCA3LCAgMjcsIDIwLCAxMywgMixcblx0ICAgICAgICA0MSwgNTIsIDMxLCAzNywgNDcsIDU1LFxuXHQgICAgICAgIDMwLCA0MCwgNTEsIDQ1LCAzMywgNDgsXG5cdCAgICAgICAgNDQsIDQ5LCAzOSwgNTYsIDM0LCA1Myxcblx0ICAgICAgICA0NiwgNDIsIDUwLCAzNiwgMjksIDMyXG5cdCAgICBdO1xuXG5cdCAgICAvLyBDdW11bGF0aXZlIGJpdCBzaGlmdCBjb25zdGFudHNcblx0ICAgIHZhciBCSVRfU0hJRlRTID0gWzEsICAyLCAgNCwgIDYsICA4LCAgMTAsIDEyLCAxNCwgMTUsIDE3LCAxOSwgMjEsIDIzLCAyNSwgMjcsIDI4XTtcblxuXHQgICAgLy8gU0JPWGVzIGFuZCByb3VuZCBwZXJtdXRhdGlvbiBjb25zdGFudHNcblx0ICAgIHZhciBTQk9YX1AgPSBbXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4ODA4MjAwLFxuXHQgICAgICAgICAgICAweDEwMDAwMDAwOiAweDgwMDAsXG5cdCAgICAgICAgICAgIDB4MjAwMDAwMDA6IDB4ODA4MDAyLFxuXHQgICAgICAgICAgICAweDMwMDAwMDAwOiAweDIsXG5cdCAgICAgICAgICAgIDB4NDAwMDAwMDA6IDB4MjAwLFxuXHQgICAgICAgICAgICAweDUwMDAwMDAwOiAweDgwODIwMixcblx0ICAgICAgICAgICAgMHg2MDAwMDAwMDogMHg4MDAyMDIsXG5cdCAgICAgICAgICAgIDB4NzAwMDAwMDA6IDB4ODAwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDAwOiAweDIwMixcblx0ICAgICAgICAgICAgMHg5MDAwMDAwMDogMHg4MDAyMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDAwMDA6IDB4ODIwMCxcblx0ICAgICAgICAgICAgMHhiMDAwMDAwMDogMHg4MDgwMDAsXG5cdCAgICAgICAgICAgIDB4YzAwMDAwMDA6IDB4ODAwMixcblx0ICAgICAgICAgICAgMHhkMDAwMDAwMDogMHg4MDAwMDIsXG5cdCAgICAgICAgICAgIDB4ZTAwMDAwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHhmMDAwMDAwMDogMHg4MjAyLFxuXHQgICAgICAgICAgICAweDgwMDAwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxODAwMDAwMDogMHg4MDgyMDIsXG5cdCAgICAgICAgICAgIDB4MjgwMDAwMDA6IDB4ODIwMixcblx0ICAgICAgICAgICAgMHgzODAwMDAwMDogMHg4MDAwLFxuXHQgICAgICAgICAgICAweDQ4MDAwMDAwOiAweDgwODIwMCxcblx0ICAgICAgICAgICAgMHg1ODAwMDAwMDogMHgyMDAsXG5cdCAgICAgICAgICAgIDB4NjgwMDAwMDA6IDB4ODA4MDAyLFxuXHQgICAgICAgICAgICAweDc4MDAwMDAwOiAweDIsXG5cdCAgICAgICAgICAgIDB4ODgwMDAwMDA6IDB4ODAwMjAwLFxuXHQgICAgICAgICAgICAweDk4MDAwMDAwOiAweDgyMDAsXG5cdCAgICAgICAgICAgIDB4YTgwMDAwMDA6IDB4ODA4MDAwLFxuXHQgICAgICAgICAgICAweGI4MDAwMDAwOiAweDgwMDIwMixcblx0ICAgICAgICAgICAgMHhjODAwMDAwMDogMHg4MDAwMDIsXG5cdCAgICAgICAgICAgIDB4ZDgwMDAwMDA6IDB4ODAwMixcblx0ICAgICAgICAgICAgMHhlODAwMDAwMDogMHgyMDIsXG5cdCAgICAgICAgICAgIDB4ZjgwMDAwMDA6IDB4ODAwMDAwLFxuXHQgICAgICAgICAgICAweDE6IDB4ODAwMCxcblx0ICAgICAgICAgICAgMHgxMDAwMDAwMTogMHgyLFxuXHQgICAgICAgICAgICAweDIwMDAwMDAxOiAweDgwODIwMCxcblx0ICAgICAgICAgICAgMHgzMDAwMDAwMTogMHg4MDAwMDAsXG5cdCAgICAgICAgICAgIDB4NDAwMDAwMDE6IDB4ODA4MDAyLFxuXHQgICAgICAgICAgICAweDUwMDAwMDAxOiAweDgyMDAsXG5cdCAgICAgICAgICAgIDB4NjAwMDAwMDE6IDB4MjAwLFxuXHQgICAgICAgICAgICAweDcwMDAwMDAxOiAweDgwMDIwMixcblx0ICAgICAgICAgICAgMHg4MDAwMDAwMTogMHg4MDgyMDIsXG5cdCAgICAgICAgICAgIDB4OTAwMDAwMDE6IDB4ODA4MDAwLFxuXHQgICAgICAgICAgICAweGEwMDAwMDAxOiAweDgwMDAwMixcblx0ICAgICAgICAgICAgMHhiMDAwMDAwMTogMHg4MjAyLFxuXHQgICAgICAgICAgICAweGMwMDAwMDAxOiAweDIwMixcblx0ICAgICAgICAgICAgMHhkMDAwMDAwMTogMHg4MDAyMDAsXG5cdCAgICAgICAgICAgIDB4ZTAwMDAwMDE6IDB4ODAwMixcblx0ICAgICAgICAgICAgMHhmMDAwMDAwMTogMHgwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDE6IDB4ODA4MjAyLFxuXHQgICAgICAgICAgICAweDE4MDAwMDAxOiAweDgwODAwMCxcblx0ICAgICAgICAgICAgMHgyODAwMDAwMTogMHg4MDAwMDAsXG5cdCAgICAgICAgICAgIDB4MzgwMDAwMDE6IDB4MjAwLFxuXHQgICAgICAgICAgICAweDQ4MDAwMDAxOiAweDgwMDAsXG5cdCAgICAgICAgICAgIDB4NTgwMDAwMDE6IDB4ODAwMDAyLFxuXHQgICAgICAgICAgICAweDY4MDAwMDAxOiAweDIsXG5cdCAgICAgICAgICAgIDB4NzgwMDAwMDE6IDB4ODIwMixcblx0ICAgICAgICAgICAgMHg4ODAwMDAwMTogMHg4MDAyLFxuXHQgICAgICAgICAgICAweDk4MDAwMDAxOiAweDgwMDIwMixcblx0ICAgICAgICAgICAgMHhhODAwMDAwMTogMHgyMDIsXG5cdCAgICAgICAgICAgIDB4YjgwMDAwMDE6IDB4ODA4MjAwLFxuXHQgICAgICAgICAgICAweGM4MDAwMDAxOiAweDgwMDIwMCxcblx0ICAgICAgICAgICAgMHhkODAwMDAwMTogMHgwLFxuXHQgICAgICAgICAgICAweGU4MDAwMDAxOiAweDgyMDAsXG5cdCAgICAgICAgICAgIDB4ZjgwMDAwMDE6IDB4ODA4MDAyXG5cdCAgICAgICAgfSxcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIDB4MDogMHg0MDA4NDAxMCxcblx0ICAgICAgICAgICAgMHgxMDAwMDAwOiAweDQwMDAsXG5cdCAgICAgICAgICAgIDB4MjAwMDAwMDogMHg4MDAwMCxcblx0ICAgICAgICAgICAgMHgzMDAwMDAwOiAweDQwMDgwMDEwLFxuXHQgICAgICAgICAgICAweDQwMDAwMDA6IDB4NDAwMDAwMTAsXG5cdCAgICAgICAgICAgIDB4NTAwMDAwMDogMHg0MDA4NDAwMCxcblx0ICAgICAgICAgICAgMHg2MDAwMDAwOiAweDQwMDA0MDAwLFxuXHQgICAgICAgICAgICAweDcwMDAwMDA6IDB4MTAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDogMHg4NDAwMCxcblx0ICAgICAgICAgICAgMHg5MDAwMDAwOiAweDQwMDA0MDEwLFxuXHQgICAgICAgICAgICAweGEwMDAwMDA6IDB4NDAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4YjAwMDAwMDogMHg4NDAxMCxcblx0ICAgICAgICAgICAgMHhjMDAwMDAwOiAweDgwMDEwLFxuXHQgICAgICAgICAgICAweGQwMDAwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHhlMDAwMDAwOiAweDQwMTAsXG5cdCAgICAgICAgICAgIDB4ZjAwMDAwMDogMHg0MDA4MDAwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDA6IDB4NDAwMDQwMDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwMDogMHg4NDAxMCxcblx0ICAgICAgICAgICAgMHgyODAwMDAwOiAweDEwLFxuXHQgICAgICAgICAgICAweDM4MDAwMDA6IDB4NDAwMDQwMTAsXG5cdCAgICAgICAgICAgIDB4NDgwMDAwMDogMHg0MDA4NDAxMCxcblx0ICAgICAgICAgICAgMHg1ODAwMDAwOiAweDQwMDAwMDAwLFxuXHQgICAgICAgICAgICAweDY4MDAwMDA6IDB4ODAwMDAsXG5cdCAgICAgICAgICAgIDB4NzgwMDAwMDogMHg0MDA4MDAxMCxcblx0ICAgICAgICAgICAgMHg4ODAwMDAwOiAweDgwMDEwLFxuXHQgICAgICAgICAgICAweDk4MDAwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHhhODAwMDAwOiAweDQwMDAsXG5cdCAgICAgICAgICAgIDB4YjgwMDAwMDogMHg0MDA4MDAwMCxcblx0ICAgICAgICAgICAgMHhjODAwMDAwOiAweDQwMDAwMDEwLFxuXHQgICAgICAgICAgICAweGQ4MDAwMDA6IDB4ODQwMDAsXG5cdCAgICAgICAgICAgIDB4ZTgwMDAwMDogMHg0MDA4NDAwMCxcblx0ICAgICAgICAgICAgMHhmODAwMDAwOiAweDQwMTAsXG5cdCAgICAgICAgICAgIDB4MTAwMDAwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxMTAwMDAwMDogMHg0MDA4MDAxMCxcblx0ICAgICAgICAgICAgMHgxMjAwMDAwMDogMHg0MDAwNDAxMCxcblx0ICAgICAgICAgICAgMHgxMzAwMDAwMDogMHg0MDA4NDAwMCxcblx0ICAgICAgICAgICAgMHgxNDAwMDAwMDogMHg0MDA4MDAwMCxcblx0ICAgICAgICAgICAgMHgxNTAwMDAwMDogMHgxMCxcblx0ICAgICAgICAgICAgMHgxNjAwMDAwMDogMHg4NDAxMCxcblx0ICAgICAgICAgICAgMHgxNzAwMDAwMDogMHg0MDAwLFxuXHQgICAgICAgICAgICAweDE4MDAwMDAwOiAweDQwMTAsXG5cdCAgICAgICAgICAgIDB4MTkwMDAwMDA6IDB4ODAwMDAsXG5cdCAgICAgICAgICAgIDB4MWEwMDAwMDA6IDB4ODAwMTAsXG5cdCAgICAgICAgICAgIDB4MWIwMDAwMDA6IDB4NDAwMDAwMTAsXG5cdCAgICAgICAgICAgIDB4MWMwMDAwMDA6IDB4ODQwMDAsXG5cdCAgICAgICAgICAgIDB4MWQwMDAwMDA6IDB4NDAwMDQwMDAsXG5cdCAgICAgICAgICAgIDB4MWUwMDAwMDA6IDB4NDAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWYwMDAwMDA6IDB4NDAwODQwMTAsXG5cdCAgICAgICAgICAgIDB4MTA4MDAwMDA6IDB4ODQwMTAsXG5cdCAgICAgICAgICAgIDB4MTE4MDAwMDA6IDB4ODAwMDAsXG5cdCAgICAgICAgICAgIDB4MTI4MDAwMDA6IDB4NDAwODAwMDAsXG5cdCAgICAgICAgICAgIDB4MTM4MDAwMDA6IDB4NDAwMCxcblx0ICAgICAgICAgICAgMHgxNDgwMDAwMDogMHg0MDAwNDAwMCxcblx0ICAgICAgICAgICAgMHgxNTgwMDAwMDogMHg0MDA4NDAxMCxcblx0ICAgICAgICAgICAgMHgxNjgwMDAwMDogMHgxMCxcblx0ICAgICAgICAgICAgMHgxNzgwMDAwMDogMHg0MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxODgwMDAwMDogMHg0MDA4NDAwMCxcblx0ICAgICAgICAgICAgMHgxOTgwMDAwMDogMHg0MDAwMDAxMCxcblx0ICAgICAgICAgICAgMHgxYTgwMDAwMDogMHg0MDAwNDAxMCxcblx0ICAgICAgICAgICAgMHgxYjgwMDAwMDogMHg4MDAxMCxcblx0ICAgICAgICAgICAgMHgxYzgwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDFkODAwMDAwOiAweDQwMTAsXG5cdCAgICAgICAgICAgIDB4MWU4MDAwMDA6IDB4NDAwODAwMTAsXG5cdCAgICAgICAgICAgIDB4MWY4MDAwMDA6IDB4ODQwMDBcblx0ICAgICAgICB9LFxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgMHgwOiAweDEwNCxcblx0ICAgICAgICAgICAgMHgxMDAwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgyMDAwMDA6IDB4NDAwMDEwMCxcblx0ICAgICAgICAgICAgMHgzMDAwMDA6IDB4MTAxMDQsXG5cdCAgICAgICAgICAgIDB4NDAwMDAwOiAweDEwMDA0LFxuXHQgICAgICAgICAgICAweDUwMDAwMDogMHg0MDAwMDA0LFxuXHQgICAgICAgICAgICAweDYwMDAwMDogMHg0MDEwMTA0LFxuXHQgICAgICAgICAgICAweDcwMDAwMDogMHg0MDEwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDogMHg0MDAwMDAwLFxuXHQgICAgICAgICAgICAweDkwMDAwMDogMHg0MDEwMTAwLFxuXHQgICAgICAgICAgICAweGEwMDAwMDogMHgxMDEwMCxcblx0ICAgICAgICAgICAgMHhiMDAwMDA6IDB4NDAxMDAwNCxcblx0ICAgICAgICAgICAgMHhjMDAwMDA6IDB4NDAwMDEwNCxcblx0ICAgICAgICAgICAgMHhkMDAwMDA6IDB4MTAwMDAsXG5cdCAgICAgICAgICAgIDB4ZTAwMDAwOiAweDQsXG5cdCAgICAgICAgICAgIDB4ZjAwMDAwOiAweDEwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDogMHg0MDEwMTAwLFxuXHQgICAgICAgICAgICAweDE4MDAwMDogMHg0MDEwMDA0LFxuXHQgICAgICAgICAgICAweDI4MDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDM4MDAwMDogMHg0MDAwMTAwLFxuXHQgICAgICAgICAgICAweDQ4MDAwMDogMHg0MDAwMDA0LFxuXHQgICAgICAgICAgICAweDU4MDAwMDogMHgxMDAwMCxcblx0ICAgICAgICAgICAgMHg2ODAwMDA6IDB4MTAwMDQsXG5cdCAgICAgICAgICAgIDB4NzgwMDAwOiAweDEwNCxcblx0ICAgICAgICAgICAgMHg4ODAwMDA6IDB4NCxcblx0ICAgICAgICAgICAgMHg5ODAwMDA6IDB4MTAwLFxuXHQgICAgICAgICAgICAweGE4MDAwMDogMHg0MDEwMDAwLFxuXHQgICAgICAgICAgICAweGI4MDAwMDogMHgxMDEwNCxcblx0ICAgICAgICAgICAgMHhjODAwMDA6IDB4MTAxMDAsXG5cdCAgICAgICAgICAgIDB4ZDgwMDAwOiAweDQwMDAxMDQsXG5cdCAgICAgICAgICAgIDB4ZTgwMDAwOiAweDQwMTAxMDQsXG5cdCAgICAgICAgICAgIDB4ZjgwMDAwOiAweDQwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTAwMDAwMDogMHg0MDEwMTAwLFxuXHQgICAgICAgICAgICAweDExMDAwMDA6IDB4MTAwMDQsXG5cdCAgICAgICAgICAgIDB4MTIwMDAwMDogMHgxMDAwMCxcblx0ICAgICAgICAgICAgMHgxMzAwMDAwOiAweDQwMDAxMDAsXG5cdCAgICAgICAgICAgIDB4MTQwMDAwMDogMHgxMDAsXG5cdCAgICAgICAgICAgIDB4MTUwMDAwMDogMHg0MDEwMTA0LFxuXHQgICAgICAgICAgICAweDE2MDAwMDA6IDB4NDAwMDAwNCxcblx0ICAgICAgICAgICAgMHgxNzAwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwMDogMHg0MDAwMTA0LFxuXHQgICAgICAgICAgICAweDE5MDAwMDA6IDB4NDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxYTAwMDAwOiAweDQsXG5cdCAgICAgICAgICAgIDB4MWIwMDAwMDogMHgxMDEwMCxcblx0ICAgICAgICAgICAgMHgxYzAwMDAwOiAweDQwMTAwMDAsXG5cdCAgICAgICAgICAgIDB4MWQwMDAwMDogMHgxMDQsXG5cdCAgICAgICAgICAgIDB4MWUwMDAwMDogMHgxMDEwNCxcblx0ICAgICAgICAgICAgMHgxZjAwMDAwOiAweDQwMTAwMDQsXG5cdCAgICAgICAgICAgIDB4MTA4MDAwMDogMHg0MDAwMDAwLFxuXHQgICAgICAgICAgICAweDExODAwMDA6IDB4MTA0LFxuXHQgICAgICAgICAgICAweDEyODAwMDA6IDB4NDAxMDEwMCxcblx0ICAgICAgICAgICAgMHgxMzgwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MTQ4MDAwMDogMHgxMDAwNCxcblx0ICAgICAgICAgICAgMHgxNTgwMDAwOiAweDQwMDAxMDAsXG5cdCAgICAgICAgICAgIDB4MTY4MDAwMDogMHgxMDAsXG5cdCAgICAgICAgICAgIDB4MTc4MDAwMDogMHg0MDEwMDA0LFxuXHQgICAgICAgICAgICAweDE4ODAwMDA6IDB4MTAwMDAsXG5cdCAgICAgICAgICAgIDB4MTk4MDAwMDogMHg0MDEwMTA0LFxuXHQgICAgICAgICAgICAweDFhODAwMDA6IDB4MTAxMDQsXG5cdCAgICAgICAgICAgIDB4MWI4MDAwMDogMHg0MDAwMDA0LFxuXHQgICAgICAgICAgICAweDFjODAwMDA6IDB4NDAwMDEwNCxcblx0ICAgICAgICAgICAgMHgxZDgwMDAwOiAweDQwMTAwMDAsXG5cdCAgICAgICAgICAgIDB4MWU4MDAwMDogMHg0LFxuXHQgICAgICAgICAgICAweDFmODAwMDA6IDB4MTAxMDBcblx0ICAgICAgICB9LFxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgMHgwOiAweDgwNDAxMDAwLFxuXHQgICAgICAgICAgICAweDEwMDAwOiAweDgwMDAxMDQwLFxuXHQgICAgICAgICAgICAweDIwMDAwOiAweDQwMTA0MCxcblx0ICAgICAgICAgICAgMHgzMDAwMDogMHg4MDQwMDAwMCxcblx0ICAgICAgICAgICAgMHg0MDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDUwMDAwOiAweDQwMTAwMCxcblx0ICAgICAgICAgICAgMHg2MDAwMDogMHg4MDAwMDA0MCxcblx0ICAgICAgICAgICAgMHg3MDAwMDogMHg0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDA6IDB4ODAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4OTAwMDA6IDB4NDAwMDAwLFxuXHQgICAgICAgICAgICAweGEwMDAwOiAweDQwLFxuXHQgICAgICAgICAgICAweGIwMDAwOiAweDgwMDAxMDAwLFxuXHQgICAgICAgICAgICAweGMwMDAwOiAweDgwNDAwMDQwLFxuXHQgICAgICAgICAgICAweGQwMDAwOiAweDEwNDAsXG5cdCAgICAgICAgICAgIDB4ZTAwMDA6IDB4MTAwMCxcblx0ICAgICAgICAgICAgMHhmMDAwMDogMHg4MDQwMTA0MCxcblx0ICAgICAgICAgICAgMHg4MDAwOiAweDgwMDAxMDQwLFxuXHQgICAgICAgICAgICAweDE4MDAwOiAweDQwLFxuXHQgICAgICAgICAgICAweDI4MDAwOiAweDgwNDAwMDQwLFxuXHQgICAgICAgICAgICAweDM4MDAwOiAweDgwMDAxMDAwLFxuXHQgICAgICAgICAgICAweDQ4MDAwOiAweDQwMTAwMCxcblx0ICAgICAgICAgICAgMHg1ODAwMDogMHg4MDQwMTA0MCxcblx0ICAgICAgICAgICAgMHg2ODAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDc4MDAwOiAweDgwNDAwMDAwLFxuXHQgICAgICAgICAgICAweDg4MDAwOiAweDEwMDAsXG5cdCAgICAgICAgICAgIDB4OTgwMDA6IDB4ODA0MDEwMDAsXG5cdCAgICAgICAgICAgIDB4YTgwMDA6IDB4NDAwMDAwLFxuXHQgICAgICAgICAgICAweGI4MDAwOiAweDEwNDAsXG5cdCAgICAgICAgICAgIDB4YzgwMDA6IDB4ODAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ZDgwMDA6IDB4NDAwMDQwLFxuXHQgICAgICAgICAgICAweGU4MDAwOiAweDQwMTA0MCxcblx0ICAgICAgICAgICAgMHhmODAwMDogMHg4MDAwMDA0MCxcblx0ICAgICAgICAgICAgMHgxMDAwMDA6IDB4NDAwMDQwLFxuXHQgICAgICAgICAgICAweDExMDAwMDogMHg0MDEwMDAsXG5cdCAgICAgICAgICAgIDB4MTIwMDAwOiAweDgwMDAwMDQwLFxuXHQgICAgICAgICAgICAweDEzMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDE0MDAwMDogMHgxMDQwLFxuXHQgICAgICAgICAgICAweDE1MDAwMDogMHg4MDQwMDA0MCxcblx0ICAgICAgICAgICAgMHgxNjAwMDA6IDB4ODA0MDEwMDAsXG5cdCAgICAgICAgICAgIDB4MTcwMDAwOiAweDgwMDAxMDQwLFxuXHQgICAgICAgICAgICAweDE4MDAwMDogMHg4MDQwMTA0MCxcblx0ICAgICAgICAgICAgMHgxOTAwMDA6IDB4ODAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWEwMDAwOiAweDgwNDAwMDAwLFxuXHQgICAgICAgICAgICAweDFiMDAwMDogMHg0MDEwNDAsXG5cdCAgICAgICAgICAgIDB4MWMwMDAwOiAweDgwMDAxMDAwLFxuXHQgICAgICAgICAgICAweDFkMDAwMDogMHg0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWUwMDAwOiAweDQwLFxuXHQgICAgICAgICAgICAweDFmMDAwMDogMHgxMDAwLFxuXHQgICAgICAgICAgICAweDEwODAwMDogMHg4MDQwMDAwMCxcblx0ICAgICAgICAgICAgMHgxMTgwMDA6IDB4ODA0MDEwNDAsXG5cdCAgICAgICAgICAgIDB4MTI4MDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MTM4MDAwOiAweDQwMTAwMCxcblx0ICAgICAgICAgICAgMHgxNDgwMDA6IDB4NDAwMDQwLFxuXHQgICAgICAgICAgICAweDE1ODAwMDogMHg4MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxNjgwMDA6IDB4ODAwMDEwNDAsXG5cdCAgICAgICAgICAgIDB4MTc4MDAwOiAweDQwLFxuXHQgICAgICAgICAgICAweDE4ODAwMDogMHg4MDAwMDA0MCxcblx0ICAgICAgICAgICAgMHgxOTgwMDA6IDB4MTAwMCxcblx0ICAgICAgICAgICAgMHgxYTgwMDA6IDB4ODAwMDEwMDAsXG5cdCAgICAgICAgICAgIDB4MWI4MDAwOiAweDgwNDAwMDQwLFxuXHQgICAgICAgICAgICAweDFjODAwMDogMHgxMDQwLFxuXHQgICAgICAgICAgICAweDFkODAwMDogMHg4MDQwMTAwMCxcblx0ICAgICAgICAgICAgMHgxZTgwMDA6IDB4NDAwMDAwLFxuXHQgICAgICAgICAgICAweDFmODAwMDogMHg0MDEwNDBcblx0ICAgICAgICB9LFxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgMHgwOiAweDgwLFxuXHQgICAgICAgICAgICAweDEwMDA6IDB4MTA0MDAwMCxcblx0ICAgICAgICAgICAgMHgyMDAwOiAweDQwMDAwLFxuXHQgICAgICAgICAgICAweDMwMDA6IDB4MjAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4NDAwMDogMHgyMDA0MDA4MCxcblx0ICAgICAgICAgICAgMHg1MDAwOiAweDEwMDAwODAsXG5cdCAgICAgICAgICAgIDB4NjAwMDogMHgyMTAwMDA4MCxcblx0ICAgICAgICAgICAgMHg3MDAwOiAweDQwMDgwLFxuXHQgICAgICAgICAgICAweDgwMDA6IDB4MTAwMDAwMCxcblx0ICAgICAgICAgICAgMHg5MDAwOiAweDIwMDQwMDAwLFxuXHQgICAgICAgICAgICAweGEwMDA6IDB4MjAwMDAwODAsXG5cdCAgICAgICAgICAgIDB4YjAwMDogMHgyMTA0MDA4MCxcblx0ICAgICAgICAgICAgMHhjMDAwOiAweDIxMDQwMDAwLFxuXHQgICAgICAgICAgICAweGQwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHhlMDAwOiAweDEwNDAwODAsXG5cdCAgICAgICAgICAgIDB4ZjAwMDogMHgyMTAwMDAwMCxcblx0ICAgICAgICAgICAgMHg4MDA6IDB4MTA0MDA4MCxcblx0ICAgICAgICAgICAgMHgxODAwOiAweDIxMDAwMDgwLFxuXHQgICAgICAgICAgICAweDI4MDA6IDB4ODAsXG5cdCAgICAgICAgICAgIDB4MzgwMDogMHgxMDQwMDAwLFxuXHQgICAgICAgICAgICAweDQ4MDA6IDB4NDAwMDAsXG5cdCAgICAgICAgICAgIDB4NTgwMDogMHgyMDA0MDA4MCxcblx0ICAgICAgICAgICAgMHg2ODAwOiAweDIxMDQwMDAwLFxuXHQgICAgICAgICAgICAweDc4MDA6IDB4MjAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODgwMDogMHgyMDA0MDAwMCxcblx0ICAgICAgICAgICAgMHg5ODAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4YTgwMDogMHgyMTA0MDA4MCxcblx0ICAgICAgICAgICAgMHhiODAwOiAweDEwMDAwODAsXG5cdCAgICAgICAgICAgIDB4YzgwMDogMHgyMDAwMDA4MCxcblx0ICAgICAgICAgICAgMHhkODAwOiAweDIxMDAwMDAwLFxuXHQgICAgICAgICAgICAweGU4MDA6IDB4MTAwMDAwMCxcblx0ICAgICAgICAgICAgMHhmODAwOiAweDQwMDgwLFxuXHQgICAgICAgICAgICAweDEwMDAwOiAweDQwMDAwLFxuXHQgICAgICAgICAgICAweDExMDAwOiAweDgwLFxuXHQgICAgICAgICAgICAweDEyMDAwOiAweDIwMDAwMDAwLFxuXHQgICAgICAgICAgICAweDEzMDAwOiAweDIxMDAwMDgwLFxuXHQgICAgICAgICAgICAweDE0MDAwOiAweDEwMDAwODAsXG5cdCAgICAgICAgICAgIDB4MTUwMDA6IDB4MjEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTYwMDA6IDB4MjAwNDAwODAsXG5cdCAgICAgICAgICAgIDB4MTcwMDA6IDB4MTAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxODAwMDogMHgyMTA0MDA4MCxcblx0ICAgICAgICAgICAgMHgxOTAwMDogMHgyMTAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxYTAwMDogMHgxMDQwMDAwLFxuXHQgICAgICAgICAgICAweDFiMDAwOiAweDIwMDQwMDAwLFxuXHQgICAgICAgICAgICAweDFjMDAwOiAweDQwMDgwLFxuXHQgICAgICAgICAgICAweDFkMDAwOiAweDIwMDAwMDgwLFxuXHQgICAgICAgICAgICAweDFlMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWYwMDA6IDB4MTA0MDA4MCxcblx0ICAgICAgICAgICAgMHgxMDgwMDogMHgyMTAwMDA4MCxcblx0ICAgICAgICAgICAgMHgxMTgwMDogMHgxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDEyODAwOiAweDEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTM4MDA6IDB4MjAwNDAwODAsXG5cdCAgICAgICAgICAgIDB4MTQ4MDA6IDB4MjAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTU4MDA6IDB4MTA0MDA4MCxcblx0ICAgICAgICAgICAgMHgxNjgwMDogMHg4MCxcblx0ICAgICAgICAgICAgMHgxNzgwMDogMHgyMTA0MDAwMCxcblx0ICAgICAgICAgICAgMHgxODgwMDogMHg0MDA4MCxcblx0ICAgICAgICAgICAgMHgxOTgwMDogMHgyMTA0MDA4MCxcblx0ICAgICAgICAgICAgMHgxYTgwMDogMHgwLFxuXHQgICAgICAgICAgICAweDFiODAwOiAweDIxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDFjODAwOiAweDEwMDAwODAsXG5cdCAgICAgICAgICAgIDB4MWQ4MDA6IDB4NDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWU4MDA6IDB4MjAwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWY4MDA6IDB4MjAwMDAwODBcblx0ICAgICAgICB9LFxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgMHgwOiAweDEwMDAwMDA4LFxuXHQgICAgICAgICAgICAweDEwMDogMHgyMDAwLFxuXHQgICAgICAgICAgICAweDIwMDogMHgxMDIwMDAwMCxcblx0ICAgICAgICAgICAgMHgzMDA6IDB4MTAyMDIwMDgsXG5cdCAgICAgICAgICAgIDB4NDAwOiAweDEwMDAyMDAwLFxuXHQgICAgICAgICAgICAweDUwMDogMHgyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4NjAwOiAweDIwMDAwOCxcblx0ICAgICAgICAgICAgMHg3MDA6IDB4MTAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4OTAwOiAweDEwMDAyMDA4LFxuXHQgICAgICAgICAgICAweGEwMDogMHgyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4YjAwOiAweDgsXG5cdCAgICAgICAgICAgIDB4YzAwOiAweDEwMjAwMDA4LFxuXHQgICAgICAgICAgICAweGQwMDogMHgyMDIwMDgsXG5cdCAgICAgICAgICAgIDB4ZTAwOiAweDIwMDgsXG5cdCAgICAgICAgICAgIDB4ZjAwOiAweDEwMjAyMDAwLFxuXHQgICAgICAgICAgICAweDgwOiAweDEwMjAwMDAwLFxuXHQgICAgICAgICAgICAweDE4MDogMHgxMDIwMjAwOCxcblx0ICAgICAgICAgICAgMHgyODA6IDB4OCxcblx0ICAgICAgICAgICAgMHgzODA6IDB4MjAwMDAwLFxuXHQgICAgICAgICAgICAweDQ4MDogMHgyMDIwMDgsXG5cdCAgICAgICAgICAgIDB4NTgwOiAweDEwMDAwMDA4LFxuXHQgICAgICAgICAgICAweDY4MDogMHgxMDAwMjAwMCxcblx0ICAgICAgICAgICAgMHg3ODA6IDB4MjAwOCxcblx0ICAgICAgICAgICAgMHg4ODA6IDB4MjAwMDA4LFxuXHQgICAgICAgICAgICAweDk4MDogMHgyMDAwLFxuXHQgICAgICAgICAgICAweGE4MDogMHgxMDAwMjAwOCxcblx0ICAgICAgICAgICAgMHhiODA6IDB4MTAyMDAwMDgsXG5cdCAgICAgICAgICAgIDB4YzgwOiAweDAsXG5cdCAgICAgICAgICAgIDB4ZDgwOiAweDEwMjAyMDAwLFxuXHQgICAgICAgICAgICAweGU4MDogMHgyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4ZjgwOiAweDEwMDAwMDAwLFxuXHQgICAgICAgICAgICAweDEwMDA6IDB4MTAwMDIwMDAsXG5cdCAgICAgICAgICAgIDB4MTEwMDogMHgxMDIwMDAwOCxcblx0ICAgICAgICAgICAgMHgxMjAwOiAweDEwMjAyMDA4LFxuXHQgICAgICAgICAgICAweDEzMDA6IDB4MjAwOCxcblx0ICAgICAgICAgICAgMHgxNDAwOiAweDIwMDAwMCxcblx0ICAgICAgICAgICAgMHgxNTAwOiAweDEwMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE2MDA6IDB4MTAwMDAwMDgsXG5cdCAgICAgICAgICAgIDB4MTcwMDogMHgyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDogMHgyMDIwMDgsXG5cdCAgICAgICAgICAgIDB4MTkwMDogMHgwLFxuXHQgICAgICAgICAgICAweDFhMDA6IDB4OCxcblx0ICAgICAgICAgICAgMHgxYjAwOiAweDEwMjAwMDAwLFxuXHQgICAgICAgICAgICAweDFjMDA6IDB4MjAwMCxcblx0ICAgICAgICAgICAgMHgxZDAwOiAweDEwMDAyMDA4LFxuXHQgICAgICAgICAgICAweDFlMDA6IDB4MTAyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4MWYwMDogMHgyMDAwMDgsXG5cdCAgICAgICAgICAgIDB4MTA4MDogMHg4LFxuXHQgICAgICAgICAgICAweDExODA6IDB4MjAyMDAwLFxuXHQgICAgICAgICAgICAweDEyODA6IDB4MjAwMDAwLFxuXHQgICAgICAgICAgICAweDEzODA6IDB4MTAwMDAwMDgsXG5cdCAgICAgICAgICAgIDB4MTQ4MDogMHgxMDAwMjAwMCxcblx0ICAgICAgICAgICAgMHgxNTgwOiAweDIwMDgsXG5cdCAgICAgICAgICAgIDB4MTY4MDogMHgxMDIwMjAwOCxcblx0ICAgICAgICAgICAgMHgxNzgwOiAweDEwMjAwMDAwLFxuXHQgICAgICAgICAgICAweDE4ODA6IDB4MTAyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4MTk4MDogMHgxMDIwMDAwOCxcblx0ICAgICAgICAgICAgMHgxYTgwOiAweDIwMDAsXG5cdCAgICAgICAgICAgIDB4MWI4MDogMHgyMDIwMDgsXG5cdCAgICAgICAgICAgIDB4MWM4MDogMHgyMDAwMDgsXG5cdCAgICAgICAgICAgIDB4MWQ4MDogMHgwLFxuXHQgICAgICAgICAgICAweDFlODA6IDB4MTAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWY4MDogMHgxMDAwMjAwOFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4MTAwMDAwLFxuXHQgICAgICAgICAgICAweDEwOiAweDIwMDA0MDEsXG5cdCAgICAgICAgICAgIDB4MjA6IDB4NDAwLFxuXHQgICAgICAgICAgICAweDMwOiAweDEwMDQwMSxcblx0ICAgICAgICAgICAgMHg0MDogMHgyMTAwNDAxLFxuXHQgICAgICAgICAgICAweDUwOiAweDAsXG5cdCAgICAgICAgICAgIDB4NjA6IDB4MSxcblx0ICAgICAgICAgICAgMHg3MDogMHgyMTAwMDAxLFxuXHQgICAgICAgICAgICAweDgwOiAweDIwMDA0MDAsXG5cdCAgICAgICAgICAgIDB4OTA6IDB4MTAwMDAxLFxuXHQgICAgICAgICAgICAweGEwOiAweDIwMDAwMDEsXG5cdCAgICAgICAgICAgIDB4YjA6IDB4MjEwMDQwMCxcblx0ICAgICAgICAgICAgMHhjMDogMHgyMTAwMDAwLFxuXHQgICAgICAgICAgICAweGQwOiAweDQwMSxcblx0ICAgICAgICAgICAgMHhlMDogMHgxMDA0MDAsXG5cdCAgICAgICAgICAgIDB4ZjA6IDB4MjAwMDAwMCxcblx0ICAgICAgICAgICAgMHg4OiAweDIxMDAwMDEsXG5cdCAgICAgICAgICAgIDB4MTg6IDB4MCxcblx0ICAgICAgICAgICAgMHgyODogMHgyMDAwNDAxLFxuXHQgICAgICAgICAgICAweDM4OiAweDIxMDA0MDAsXG5cdCAgICAgICAgICAgIDB4NDg6IDB4MTAwMDAwLFxuXHQgICAgICAgICAgICAweDU4OiAweDIwMDAwMDEsXG5cdCAgICAgICAgICAgIDB4Njg6IDB4MjAwMDAwMCxcblx0ICAgICAgICAgICAgMHg3ODogMHg0MDEsXG5cdCAgICAgICAgICAgIDB4ODg6IDB4MTAwNDAxLFxuXHQgICAgICAgICAgICAweDk4OiAweDIwMDA0MDAsXG5cdCAgICAgICAgICAgIDB4YTg6IDB4MjEwMDAwMCxcblx0ICAgICAgICAgICAgMHhiODogMHgxMDAwMDEsXG5cdCAgICAgICAgICAgIDB4Yzg6IDB4NDAwLFxuXHQgICAgICAgICAgICAweGQ4OiAweDIxMDA0MDEsXG5cdCAgICAgICAgICAgIDB4ZTg6IDB4MSxcblx0ICAgICAgICAgICAgMHhmODogMHgxMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MTAwOiAweDIwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTEwOiAweDEwMDAwMCxcblx0ICAgICAgICAgICAgMHgxMjA6IDB4MjAwMDQwMSxcblx0ICAgICAgICAgICAgMHgxMzA6IDB4MjEwMDAwMSxcblx0ICAgICAgICAgICAgMHgxNDA6IDB4MTAwMDAxLFxuXHQgICAgICAgICAgICAweDE1MDogMHgyMDAwNDAwLFxuXHQgICAgICAgICAgICAweDE2MDogMHgyMTAwNDAwLFxuXHQgICAgICAgICAgICAweDE3MDogMHgxMDA0MDEsXG5cdCAgICAgICAgICAgIDB4MTgwOiAweDQwMSxcblx0ICAgICAgICAgICAgMHgxOTA6IDB4MjEwMDQwMSxcblx0ICAgICAgICAgICAgMHgxYTA6IDB4MTAwNDAwLFxuXHQgICAgICAgICAgICAweDFiMDogMHgxLFxuXHQgICAgICAgICAgICAweDFjMDogMHgwLFxuXHQgICAgICAgICAgICAweDFkMDogMHgyMTAwMDAwLFxuXHQgICAgICAgICAgICAweDFlMDogMHgyMDAwMDAxLFxuXHQgICAgICAgICAgICAweDFmMDogMHg0MDAsXG5cdCAgICAgICAgICAgIDB4MTA4OiAweDEwMDQwMCxcblx0ICAgICAgICAgICAgMHgxMTg6IDB4MjAwMDQwMSxcblx0ICAgICAgICAgICAgMHgxMjg6IDB4MjEwMDAwMSxcblx0ICAgICAgICAgICAgMHgxMzg6IDB4MSxcblx0ICAgICAgICAgICAgMHgxNDg6IDB4MjAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxNTg6IDB4MTAwMDAwLFxuXHQgICAgICAgICAgICAweDE2ODogMHg0MDEsXG5cdCAgICAgICAgICAgIDB4MTc4OiAweDIxMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MTg4OiAweDIwMDAwMDEsXG5cdCAgICAgICAgICAgIDB4MTk4OiAweDIxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWE4OiAweDAsXG5cdCAgICAgICAgICAgIDB4MWI4OiAweDIxMDA0MDEsXG5cdCAgICAgICAgICAgIDB4MWM4OiAweDEwMDQwMSxcblx0ICAgICAgICAgICAgMHgxZDg6IDB4NDAwLFxuXHQgICAgICAgICAgICAweDFlODogMHgyMDAwNDAwLFxuXHQgICAgICAgICAgICAweDFmODogMHgxMDAwMDFcblx0ICAgICAgICB9LFxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgMHgwOiAweDgwMDA4MjAsXG5cdCAgICAgICAgICAgIDB4MTogMHgyMDAwMCxcblx0ICAgICAgICAgICAgMHgyOiAweDgwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MzogMHgyMCxcblx0ICAgICAgICAgICAgMHg0OiAweDIwMDIwLFxuXHQgICAgICAgICAgICAweDU6IDB4ODAyMDgyMCxcblx0ICAgICAgICAgICAgMHg2OiAweDgwMjA4MDAsXG5cdCAgICAgICAgICAgIDB4NzogMHg4MDAsXG5cdCAgICAgICAgICAgIDB4ODogMHg4MDIwMDAwLFxuXHQgICAgICAgICAgICAweDk6IDB4ODAwMDgwMCxcblx0ICAgICAgICAgICAgMHhhOiAweDIwODAwLFxuXHQgICAgICAgICAgICAweGI6IDB4ODAyMDAyMCxcblx0ICAgICAgICAgICAgMHhjOiAweDgyMCxcblx0ICAgICAgICAgICAgMHhkOiAweDAsXG5cdCAgICAgICAgICAgIDB4ZTogMHg4MDAwMDIwLFxuXHQgICAgICAgICAgICAweGY6IDB4MjA4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDA6IDB4ODAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDAxOiAweDgwMjA4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDI6IDB4ODAwMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwMzogMHg4MDAwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDA0OiAweDgwMjAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDU6IDB4MjA4MDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDY6IDB4MjA4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDc6IDB4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDg6IDB4ODAwMDAyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwOTogMHg4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMGE6IDB4MjAwMjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMGI6IDB4ODAyMDgwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwYzogMHgwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDBkOiAweDgwMjAwMjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMGU6IDB4ODAwMDgwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwZjogMHgyMDAwMCxcblx0ICAgICAgICAgICAgMHgxMDogMHgyMDgyMCxcblx0ICAgICAgICAgICAgMHgxMTogMHg4MDIwODAwLFxuXHQgICAgICAgICAgICAweDEyOiAweDIwLFxuXHQgICAgICAgICAgICAweDEzOiAweDgwMCxcblx0ICAgICAgICAgICAgMHgxNDogMHg4MDAwODAwLFxuXHQgICAgICAgICAgICAweDE1OiAweDgwMDAwMjAsXG5cdCAgICAgICAgICAgIDB4MTY6IDB4ODAyMDAyMCxcblx0ICAgICAgICAgICAgMHgxNzogMHgyMDAwMCxcblx0ICAgICAgICAgICAgMHgxODogMHgwLFxuXHQgICAgICAgICAgICAweDE5OiAweDIwMDIwLFxuXHQgICAgICAgICAgICAweDFhOiAweDgwMjAwMDAsXG5cdCAgICAgICAgICAgIDB4MWI6IDB4ODAwMDgyMCxcblx0ICAgICAgICAgICAgMHgxYzogMHg4MDIwODIwLFxuXHQgICAgICAgICAgICAweDFkOiAweDIwODAwLFxuXHQgICAgICAgICAgICAweDFlOiAweDgyMCxcblx0ICAgICAgICAgICAgMHgxZjogMHg4MDAwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDEwOiAweDIwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDExOiAweDgwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxMjogMHg4MDIwMDIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDEzOiAweDIwODIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDE0OiAweDIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDE1OiAweDgwMjAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTY6IDB4ODAwMDAwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxNzogMHg4MDAwODIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDE4OiAweDgwMjA4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTk6IDB4ODAwMDAyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxYTogMHg4MDAwODAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDFiOiAweDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMWM6IDB4MjA4MDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMWQ6IDB4ODIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDFlOiAweDIwMDIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDFmOiAweDgwMjA4MDBcblx0ICAgICAgICB9XG5cdCAgICBdO1xuXG5cdCAgICAvLyBNYXNrcyB0aGF0IHNlbGVjdCB0aGUgU0JPWCBpbnB1dFxuXHQgICAgdmFyIFNCT1hfTUFTSyA9IFtcblx0ICAgICAgICAweGY4MDAwMDAxLCAweDFmODAwMDAwLCAweDAxZjgwMDAwLCAweDAwMWY4MDAwLFxuXHQgICAgICAgIDB4MDAwMWY4MDAsIDB4MDAwMDFmODAsIDB4MDAwMDAxZjgsIDB4ODAwMDAwMWZcblx0ICAgIF07XG5cblx0ICAgIC8qKlxuXHQgICAgICogREVTIGJsb2NrIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBERVMgPSBDX2FsZ28uREVTID0gQmxvY2tDaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGtleSA9IHRoaXMuX2tleTtcblx0ICAgICAgICAgICAgdmFyIGtleVdvcmRzID0ga2V5LndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFNlbGVjdCA1NiBiaXRzIGFjY29yZGluZyB0byBQQzFcblx0ICAgICAgICAgICAgdmFyIGtleUJpdHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1NjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIga2V5Qml0UG9zID0gUEMxW2ldIC0gMTtcblx0ICAgICAgICAgICAgICAgIGtleUJpdHNbaV0gPSAoa2V5V29yZHNba2V5Qml0UG9zID4+PiA1XSA+Pj4gKDMxIC0ga2V5Qml0UG9zICUgMzIpKSAmIDE7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBBc3NlbWJsZSAxNiBzdWJrZXlzXG5cdCAgICAgICAgICAgIHZhciBzdWJLZXlzID0gdGhpcy5fc3ViS2V5cyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBuU3ViS2V5ID0gMDsgblN1YktleSA8IDE2OyBuU3ViS2V5KyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBzdWJrZXlcblx0ICAgICAgICAgICAgICAgIHZhciBzdWJLZXkgPSBzdWJLZXlzW25TdWJLZXldID0gW107XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0U2hpZnQgPSBCSVRfU0hJRlRTW25TdWJLZXldO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBTZWxlY3QgNDggYml0cyBhY2NvcmRpbmcgdG8gUEMyXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBTZWxlY3QgZnJvbSB0aGUgbGVmdCAyOCBrZXkgYml0c1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YktleVsoaSAvIDYpIHwgMF0gfD0ga2V5Qml0c1soKFBDMltpXSAtIDEpICsgYml0U2hpZnQpICUgMjhdIDw8ICgzMSAtIGkgJSA2KTtcblxuXHQgICAgICAgICAgICAgICAgICAgIC8vIFNlbGVjdCBmcm9tIHRoZSByaWdodCAyOCBrZXkgYml0c1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YktleVs0ICsgKChpIC8gNikgfCAwKV0gfD0ga2V5Qml0c1syOCArICgoKFBDMltpICsgMjRdIC0gMSkgKyBiaXRTaGlmdCkgJSAyOCldIDw8ICgzMSAtIGkgJSA2KTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gU2luY2UgZWFjaCBzdWJrZXkgaXMgYXBwbGllZCB0byBhbiBleHBhbmRlZCAzMi1iaXQgaW5wdXQsXG5cdCAgICAgICAgICAgICAgICAvLyB0aGUgc3Via2V5IGNhbiBiZSBicm9rZW4gaW50byA4IHZhbHVlcyBzY2FsZWQgdG8gMzItYml0cyxcblx0ICAgICAgICAgICAgICAgIC8vIHdoaWNoIGFsbG93cyB0aGUga2V5IHRvIGJlIHVzZWQgd2l0aG91dCBleHBhbnNpb25cblx0ICAgICAgICAgICAgICAgIHN1YktleVswXSA9IChzdWJLZXlbMF0gPDwgMSkgfCAoc3ViS2V5WzBdID4+PiAzMSk7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDc7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YktleVtpXSA9IHN1YktleVtpXSA+Pj4gKChpIC0gMSkgKiA0ICsgMyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBzdWJLZXlbN10gPSAoc3ViS2V5WzddIDw8IDUpIHwgKHN1YktleVs3XSA+Pj4gMjcpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBpbnZlcnNlIHN1YmtleXNcblx0ICAgICAgICAgICAgdmFyIGludlN1YktleXMgPSB0aGlzLl9pbnZTdWJLZXlzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgaW52U3ViS2V5c1tpXSA9IHN1YktleXNbMTUgLSBpXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBlbmNyeXB0QmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgdGhpcy5fZG9DcnlwdEJsb2NrKE0sIG9mZnNldCwgdGhpcy5fc3ViS2V5cyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGRlY3J5cHRCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICB0aGlzLl9kb0NyeXB0QmxvY2soTSwgb2Zmc2V0LCB0aGlzLl9pbnZTdWJLZXlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvQ3J5cHRCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCwgc3ViS2V5cykge1xuXHQgICAgICAgICAgICAvLyBHZXQgaW5wdXRcblx0ICAgICAgICAgICAgdGhpcy5fbEJsb2NrID0gTVtvZmZzZXRdO1xuXHQgICAgICAgICAgICB0aGlzLl9yQmxvY2sgPSBNW29mZnNldCArIDFdO1xuXG5cdCAgICAgICAgICAgIC8vIEluaXRpYWwgcGVybXV0YXRpb25cblx0ICAgICAgICAgICAgZXhjaGFuZ2VMUi5jYWxsKHRoaXMsIDQsICAweDBmMGYwZjBmKTtcblx0ICAgICAgICAgICAgZXhjaGFuZ2VMUi5jYWxsKHRoaXMsIDE2LCAweDAwMDBmZmZmKTtcblx0ICAgICAgICAgICAgZXhjaGFuZ2VSTC5jYWxsKHRoaXMsIDIsICAweDMzMzMzMzMzKTtcblx0ICAgICAgICAgICAgZXhjaGFuZ2VSTC5jYWxsKHRoaXMsIDgsICAweDAwZmYwMGZmKTtcblx0ICAgICAgICAgICAgZXhjaGFuZ2VMUi5jYWxsKHRoaXMsIDEsICAweDU1NTU1NTU1KTtcblxuXHQgICAgICAgICAgICAvLyBSb3VuZHNcblx0ICAgICAgICAgICAgZm9yICh2YXIgcm91bmQgPSAwOyByb3VuZCA8IDE2OyByb3VuZCsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBzdWJLZXkgPSBzdWJLZXlzW3JvdW5kXTtcblx0ICAgICAgICAgICAgICAgIHZhciBsQmxvY2sgPSB0aGlzLl9sQmxvY2s7XG5cdCAgICAgICAgICAgICAgICB2YXIgckJsb2NrID0gdGhpcy5fckJsb2NrO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBGZWlzdGVsIGZ1bmN0aW9uXG5cdCAgICAgICAgICAgICAgICB2YXIgZiA9IDA7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGYgfD0gU0JPWF9QW2ldWygockJsb2NrIF4gc3ViS2V5W2ldKSAmIFNCT1hfTUFTS1tpXSkgPj4+IDBdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdGhpcy5fbEJsb2NrID0gckJsb2NrO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fckJsb2NrID0gbEJsb2NrIF4gZjtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFVuZG8gc3dhcCBmcm9tIGxhc3Qgcm91bmRcblx0ICAgICAgICAgICAgdmFyIHQgPSB0aGlzLl9sQmxvY2s7XG5cdCAgICAgICAgICAgIHRoaXMuX2xCbG9jayA9IHRoaXMuX3JCbG9jaztcblx0ICAgICAgICAgICAgdGhpcy5fckJsb2NrID0gdDtcblxuXHQgICAgICAgICAgICAvLyBGaW5hbCBwZXJtdXRhdGlvblxuXHQgICAgICAgICAgICBleGNoYW5nZUxSLmNhbGwodGhpcywgMSwgIDB4NTU1NTU1NTUpO1xuXHQgICAgICAgICAgICBleGNoYW5nZVJMLmNhbGwodGhpcywgOCwgIDB4MDBmZjAwZmYpO1xuXHQgICAgICAgICAgICBleGNoYW5nZVJMLmNhbGwodGhpcywgMiwgIDB4MzMzMzMzMzMpO1xuXHQgICAgICAgICAgICBleGNoYW5nZUxSLmNhbGwodGhpcywgMTYsIDB4MDAwMGZmZmYpO1xuXHQgICAgICAgICAgICBleGNoYW5nZUxSLmNhbGwodGhpcywgNCwgIDB4MGYwZjBmMGYpO1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBvdXRwdXRcblx0ICAgICAgICAgICAgTVtvZmZzZXRdID0gdGhpcy5fbEJsb2NrO1xuXHQgICAgICAgICAgICBNW29mZnNldCArIDFdID0gdGhpcy5fckJsb2NrO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBrZXlTaXplOiA2NC8zMixcblxuXHQgICAgICAgIGl2U2l6ZTogNjQvMzIsXG5cblx0ICAgICAgICBibG9ja1NpemU6IDY0LzMyXG5cdCAgICB9KTtcblxuXHQgICAgLy8gU3dhcCBiaXRzIGFjcm9zcyB0aGUgbGVmdCBhbmQgcmlnaHQgd29yZHNcblx0ICAgIGZ1bmN0aW9uIGV4Y2hhbmdlTFIob2Zmc2V0LCBtYXNrKSB7XG5cdCAgICAgICAgdmFyIHQgPSAoKHRoaXMuX2xCbG9jayA+Pj4gb2Zmc2V0KSBeIHRoaXMuX3JCbG9jaykgJiBtYXNrO1xuXHQgICAgICAgIHRoaXMuX3JCbG9jayBePSB0O1xuXHQgICAgICAgIHRoaXMuX2xCbG9jayBePSB0IDw8IG9mZnNldDtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gZXhjaGFuZ2VSTChvZmZzZXQsIG1hc2spIHtcblx0ICAgICAgICB2YXIgdCA9ICgodGhpcy5fckJsb2NrID4+PiBvZmZzZXQpIF4gdGhpcy5fbEJsb2NrKSAmIG1hc2s7XG5cdCAgICAgICAgdGhpcy5fbEJsb2NrIF49IHQ7XG5cdCAgICAgICAgdGhpcy5fckJsb2NrIF49IHQgPDwgb2Zmc2V0O1xuXHQgICAgfVxuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9ucyB0byB0aGUgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgY2lwaGVydGV4dCA9IENyeXB0b0pTLkRFUy5lbmNyeXB0KG1lc3NhZ2UsIGtleSwgY2ZnKTtcblx0ICAgICAqICAgICB2YXIgcGxhaW50ZXh0ICA9IENyeXB0b0pTLkRFUy5kZWNyeXB0KGNpcGhlcnRleHQsIGtleSwgY2ZnKTtcblx0ICAgICAqL1xuXHQgICAgQy5ERVMgPSBCbG9ja0NpcGhlci5fY3JlYXRlSGVscGVyKERFUyk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogVHJpcGxlLURFUyBibG9jayBjaXBoZXIgYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgVHJpcGxlREVTID0gQ19hbGdvLlRyaXBsZURFUyA9IEJsb2NrQ2lwaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBrZXkgPSB0aGlzLl9rZXk7XG5cdCAgICAgICAgICAgIHZhciBrZXlXb3JkcyA9IGtleS53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBDcmVhdGUgREVTIGluc3RhbmNlc1xuXHQgICAgICAgICAgICB0aGlzLl9kZXMxID0gREVTLmNyZWF0ZUVuY3J5cHRvcihXb3JkQXJyYXkuY3JlYXRlKGtleVdvcmRzLnNsaWNlKDAsIDIpKSk7XG5cdCAgICAgICAgICAgIHRoaXMuX2RlczIgPSBERVMuY3JlYXRlRW5jcnlwdG9yKFdvcmRBcnJheS5jcmVhdGUoa2V5V29yZHMuc2xpY2UoMiwgNCkpKTtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMyA9IERFUy5jcmVhdGVFbmNyeXB0b3IoV29yZEFycmF5LmNyZWF0ZShrZXlXb3Jkcy5zbGljZSg0LCA2KSkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBlbmNyeXB0QmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMS5lbmNyeXB0QmxvY2soTSwgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMi5kZWNyeXB0QmxvY2soTSwgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMy5lbmNyeXB0QmxvY2soTSwgb2Zmc2V0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgZGVjcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2RlczMuZGVjcnlwdEJsb2NrKE0sIG9mZnNldCk7XG5cdCAgICAgICAgICAgIHRoaXMuX2RlczIuZW5jcnlwdEJsb2NrKE0sIG9mZnNldCk7XG5cdCAgICAgICAgICAgIHRoaXMuX2RlczEuZGVjcnlwdEJsb2NrKE0sIG9mZnNldCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGtleVNpemU6IDE5Mi8zMixcblxuXHQgICAgICAgIGl2U2l6ZTogNjQvMzIsXG5cblx0ICAgICAgICBibG9ja1NpemU6IDY0LzMyXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbnMgdG8gdGhlIGNpcGhlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGNpcGhlcnRleHQgPSBDcnlwdG9KUy5UcmlwbGVERVMuZW5jcnlwdChtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgKiAgICAgdmFyIHBsYWludGV4dCAgPSBDcnlwdG9KUy5UcmlwbGVERVMuZGVjcnlwdChjaXBoZXJ0ZXh0LCBrZXksIGNmZyk7XG5cdCAgICAgKi9cblx0ICAgIEMuVHJpcGxlREVTID0gQmxvY2tDaXBoZXIuX2NyZWF0ZUhlbHBlcihUcmlwbGVERVMpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlRyaXBsZURFUztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICh1bmRlZmluZWQpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlO1xuXHQgICAgdmFyIFgzMldvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiB4NjQgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ194NjQgPSBDLng2NCA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEEgNjQtYml0IHdvcmQuXG5cdCAgICAgKi9cblx0ICAgIHZhciBYNjRXb3JkID0gQ194NjQuV29yZCA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgNjQtYml0IHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaGlnaCBUaGUgaGlnaCAzMiBiaXRzLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsb3cgVGhlIGxvdyAzMiBiaXRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgeDY0V29yZCA9IENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDAwMDEwMjAzLCAweDA0MDUwNjA3KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoaGlnaCwgbG93KSB7XG5cdCAgICAgICAgICAgIHRoaXMuaGlnaCA9IGhpZ2g7XG5cdCAgICAgICAgICAgIHRoaXMubG93ID0gbG93O1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEJpdHdpc2UgTk9UcyB0aGlzIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgbmVnYXRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBuZWdhdGVkID0geDY0V29yZC5ub3QoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBub3Q6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB+dGhpcy5oaWdoO1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gfnRoaXMubG93O1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIEFORHMgdGhpcyB3b3JkIHdpdGggdGhlIHBhc3NlZCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtYNjRXb3JkfSB3b3JkIFRoZSB4NjQtV29yZCB0byBBTkQgd2l0aCB0aGlzIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgQU5EaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgYW5kZWQgPSB4NjRXb3JkLmFuZChhbm90aGVyWDY0V29yZCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gYW5kOiBmdW5jdGlvbiAod29yZCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMuaGlnaCAmIHdvcmQuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMubG93ICYgd29yZC5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEJpdHdpc2UgT1JzIHRoaXMgd29yZCB3aXRoIHRoZSBwYXNzZWQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7WDY0V29yZH0gd29yZCBUaGUgeDY0LVdvcmQgdG8gT1Igd2l0aCB0aGlzIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgT1JpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBvcmVkID0geDY0V29yZC5vcihhbm90aGVyWDY0V29yZCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gb3I6IGZ1bmN0aW9uICh3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5oaWdoIHwgd29yZC5oaWdoO1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgfCB3b3JkLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQml0d2lzZSBYT1JzIHRoaXMgd29yZCB3aXRoIHRoZSBwYXNzZWQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7WDY0V29yZH0gd29yZCBUaGUgeDY0LVdvcmQgdG8gWE9SIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIFhPUmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHhvcmVkID0geDY0V29yZC54b3IoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHhvcjogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggXiB3b3JkLmhpZ2g7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmxvdyBeIHdvcmQubG93O1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBTaGlmdHMgdGhpcyB3b3JkIG4gYml0cyB0byB0aGUgbGVmdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byBzaGlmdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBzaGlmdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHNoaWZ0ZWQgPSB4NjRXb3JkLnNoaWZ0TCgyNSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gc2hpZnRMOiBmdW5jdGlvbiAobikge1xuXHQgICAgICAgICAgICAvLyBpZiAobiA8IDMyKSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgaGlnaCA9ICh0aGlzLmhpZ2ggPDwgbikgfCAodGhpcy5sb3cgPj4+ICgzMiAtIG4pKTtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmxvdyA8PCBuO1xuXHQgICAgICAgICAgICAvLyB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmxvdyA8PCAobiAtIDMyKTtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBsb3cgPSAwO1xuXHQgICAgICAgICAgICAvLyB9XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFNoaWZ0cyB0aGlzIHdvcmQgbiBiaXRzIHRvIHRoZSByaWdodC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byBzaGlmdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBzaGlmdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHNoaWZ0ZWQgPSB4NjRXb3JkLnNoaWZ0Uig3KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBzaGlmdFI6IGZ1bmN0aW9uIChuKSB7XG5cdCAgICAgICAgICAgIC8vIGlmIChuIDwgMzIpIHtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBsb3cgPSAodGhpcy5sb3cgPj4+IG4pIHwgKHRoaXMuaGlnaCA8PCAoMzIgLSBuKSk7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMuaGlnaCA+Pj4gbjtcblx0ICAgICAgICAgICAgLy8gfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmhpZ2ggPj4+IChuIC0gMzIpO1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSAwO1xuXHQgICAgICAgICAgICAvLyB9XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJvdGF0ZXMgdGhpcyB3b3JkIG4gYml0cyB0byB0aGUgbGVmdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByb3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgcm90YXRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciByb3RhdGVkID0geDY0V29yZC5yb3RMKDI1KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyByb3RMOiBmdW5jdGlvbiAobikge1xuXHQgICAgICAgICAgICAvLyByZXR1cm4gdGhpcy5zaGlmdEwobikub3IodGhpcy5zaGlmdFIoNjQgLSBuKSk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJvdGF0ZXMgdGhpcyB3b3JkIG4gYml0cyB0byB0aGUgcmlnaHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gcm90YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIHJvdGF0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcm90YXRlZCA9IHg2NFdvcmQucm90Uig3KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyByb3RSOiBmdW5jdGlvbiAobikge1xuXHQgICAgICAgICAgICAvLyByZXR1cm4gdGhpcy5zaGlmdFIobikub3IodGhpcy5zaGlmdEwoNjQgLSBuKSk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEFkZHMgdGhpcyB3b3JkIHdpdGggdGhlIHBhc3NlZCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtYNjRXb3JkfSB3b3JkIFRoZSB4NjQtV29yZCB0byBhZGQgd2l0aCB0aGlzIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgYWRkaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgYWRkZWQgPSB4NjRXb3JkLmFkZChhbm90aGVyWDY0V29yZCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gYWRkOiBmdW5jdGlvbiAod29yZCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gKHRoaXMubG93ICsgd29yZC5sb3cpIHwgMDtcblx0ICAgICAgICAgICAgLy8gdmFyIGNhcnJ5ID0gKGxvdyA+Pj4gMCkgPCAodGhpcy5sb3cgPj4+IDApID8gMSA6IDA7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gKHRoaXMuaGlnaCArIHdvcmQuaGlnaCArIGNhcnJ5KSB8IDA7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQW4gYXJyYXkgb2YgNjQtYml0IHdvcmRzLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHdvcmRzIFRoZSBhcnJheSBvZiBDcnlwdG9KUy54NjQuV29yZCBvYmplY3RzLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpZ0J5dGVzIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICovXG5cdCAgICB2YXIgWDY0V29yZEFycmF5ID0gQ194NjQuV29yZEFycmF5ID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgKE9wdGlvbmFsKSBBbiBhcnJheSBvZiBDcnlwdG9KUy54NjQuV29yZCBvYmplY3RzLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaWdCeXRlcyAoT3B0aW9uYWwpIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhlIHdvcmRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMueDY0LldvcmRBcnJheS5jcmVhdGUoKTtcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMueDY0LldvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgICAqICAgICAgICAgQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MDAwMTAyMDMsIDB4MDQwNTA2MDcpLFxuXHQgICAgICAgICAqICAgICAgICAgQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MTgxOTFhMWIsIDB4MWMxZDFlMWYpXG5cdCAgICAgICAgICogICAgIF0pO1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy54NjQuV29yZEFycmF5LmNyZWF0ZShbXG5cdCAgICAgICAgICogICAgICAgICBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgwMDAxMDIwMywgMHgwNDA1MDYwNyksXG5cdCAgICAgICAgICogICAgICAgICBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgxODE5MWExYiwgMHgxYzFkMWUxZilcblx0ICAgICAgICAgKiAgICAgXSwgMTApO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3b3Jkcywgc2lnQnl0ZXMpIHtcblx0ICAgICAgICAgICAgd29yZHMgPSB0aGlzLndvcmRzID0gd29yZHMgfHwgW107XG5cblx0ICAgICAgICAgICAgaWYgKHNpZ0J5dGVzICE9IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHdvcmRzLmxlbmd0aCAqIDg7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgdGhpcyA2NC1iaXQgd29yZCBhcnJheSB0byBhIDMyLWJpdCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q3J5cHRvSlMubGliLldvcmRBcnJheX0gVGhpcyB3b3JkIGFycmF5J3MgZGF0YSBhcyBhIDMyLWJpdCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgeDMyV29yZEFycmF5ID0geDY0V29yZEFycmF5LnRvWDMyKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9YMzI6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB4NjRXb3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB4NjRXb3Jkc0xlbmd0aCA9IHg2NFdvcmRzLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB4MzJXb3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHg2NFdvcmRzTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciB4NjRXb3JkID0geDY0V29yZHNbaV07XG5cdCAgICAgICAgICAgICAgICB4MzJXb3Jkcy5wdXNoKHg2NFdvcmQuaGlnaCk7XG5cdCAgICAgICAgICAgICAgICB4MzJXb3Jkcy5wdXNoKHg2NFdvcmQubG93KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBYMzJXb3JkQXJyYXkuY3JlYXRlKHgzMldvcmRzLCB0aGlzLnNpZ0J5dGVzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZEFycmF5fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IHg2NFdvcmRBcnJheS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBDbG9uZSBcIndvcmRzXCIgYXJyYXlcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gY2xvbmUud29yZHMgPSB0aGlzLndvcmRzLnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgIC8vIENsb25lIGVhY2ggWDY0V29yZCBvYmplY3Rcblx0ICAgICAgICAgICAgdmFyIHdvcmRzTGVuZ3RoID0gd29yZHMubGVuZ3RoO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmRzTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2ldID0gd29yZHNbaV0uY2xvbmUoKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUztcblxufSkpOyIsInZhciBDdXJsID0gcmVxdWlyZShcIi4uL2N1cmwvY3VybFwiKTtcbnZhciBLZXJsID0gcmVxdWlyZShcIi4uL2tlcmwva2VybFwiKTtcbnZhciBDb252ZXJ0ZXIgPSByZXF1aXJlKFwiLi4vY29udmVydGVyL2NvbnZlcnRlclwiKTtcbnZhciB0cml0QWRkID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvYWRkZXJcIik7XG5cbi8qKlxuKlxuKiAgIEBjb25zdHJ1Y3RvciBidW5kbGVcbioqL1xuZnVuY3Rpb24gQnVuZGxlKCkge1xuXG4gICAgLy8gRGVjbGFyZSBlbXB0eSBidW5kbGVcbiAgICB0aGlzLmJ1bmRsZSA9IFtdO1xufVxuXG4vKipcbipcbipcbioqL1xuXG5CdW5kbGUucHJvdG90eXBlLmFkZEVudHJ5ID0gZnVuY3Rpb24oc2lnbmF0dXJlTWVzc2FnZUxlbmd0aCwgYWRkcmVzcywgdmFsdWUsIHRhZywgdGltZXN0YW1wLCBpbmRleCkge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWduYXR1cmVNZXNzYWdlTGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgdHJhbnNhY3Rpb25PYmplY3QgPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgIHRyYW5zYWN0aW9uT2JqZWN0LmFkZHJlc3MgPSBhZGRyZXNzO1xuICAgICAgICB0cmFuc2FjdGlvbk9iamVjdC52YWx1ZSA9IGkgPT0gMCA/IHZhbHVlIDogMDtcbiAgICAgICAgdHJhbnNhY3Rpb25PYmplY3Qub2Jzb2xldGVUYWcgPSB0YWc7XG4gICAgICAgIHRyYW5zYWN0aW9uT2JqZWN0LnRhZyA9IHRhZztcbiAgICAgICAgdHJhbnNhY3Rpb25PYmplY3QudGltZXN0YW1wID0gdGltZXN0YW1wO1xuXG4gICAgICAgIHRoaXMuYnVuZGxlW3RoaXMuYnVuZGxlLmxlbmd0aF0gPSB0cmFuc2FjdGlvbk9iamVjdDtcbiAgICB9XG59XG5cbi8qKlxuKlxuKlxuKiovXG5CdW5kbGUucHJvdG90eXBlLmFkZFRyeXRlcyA9IGZ1bmN0aW9uKHNpZ25hdHVyZUZyYWdtZW50cykge1xuXG4gICAgdmFyIGVtcHR5U2lnbmF0dXJlRnJhZ21lbnQgPSAnJztcbiAgICB2YXIgZW1wdHlIYXNoID0gJzk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OSc7XG4gICAgdmFyIGVtcHR5VGFnID0gJzknLnJlcGVhdCgyNyk7XG4gICAgdmFyIGVtcHR5VGltZXN0YW1wID0gJzknLnJlcGVhdCg5KTtcblxuICAgIGZvciAodmFyIGogPSAwOyBlbXB0eVNpZ25hdHVyZUZyYWdtZW50Lmxlbmd0aCA8IDIxODc7IGorKykge1xuICAgICAgICBlbXB0eVNpZ25hdHVyZUZyYWdtZW50ICs9ICc5JztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnVuZGxlLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgLy8gRmlsbCBlbXB0eSBzaWduYXR1cmVNZXNzYWdlRnJhZ21lbnRcbiAgICAgICAgdGhpcy5idW5kbGVbaV0uc2lnbmF0dXJlTWVzc2FnZUZyYWdtZW50ID0gc2lnbmF0dXJlRnJhZ21lbnRzW2ldID8gc2lnbmF0dXJlRnJhZ21lbnRzW2ldIDogZW1wdHlTaWduYXR1cmVGcmFnbWVudDtcblxuICAgICAgICAvLyBGaWxsIGVtcHR5IHRydW5rVHJhbnNhY3Rpb25cbiAgICAgICAgdGhpcy5idW5kbGVbaV0udHJ1bmtUcmFuc2FjdGlvbiA9IGVtcHR5SGFzaDtcblxuICAgICAgICAvLyBGaWxsIGVtcHR5IGJyYW5jaFRyYW5zYWN0aW9uXG4gICAgICAgIHRoaXMuYnVuZGxlW2ldLmJyYW5jaFRyYW5zYWN0aW9uID0gZW1wdHlIYXNoO1xuXG4gICAgICAgIHRoaXMuYnVuZGxlW2ldLmF0dGFjaG1lbnRUaW1lc3RhbXAgPSBlbXB0eVRpbWVzdGFtcDtcbiAgICAgICAgdGhpcy5idW5kbGVbaV0uYXR0YWNobWVudFRpbWVzdGFtcExvd2VyQm91bmQgPSBlbXB0eVRpbWVzdGFtcDtcbiAgICAgICAgdGhpcy5idW5kbGVbaV0uYXR0YWNobWVudFRpbWVzdGFtcFVwcGVyQm91bmQgPSBlbXB0eVRpbWVzdGFtcDtcbiAgICAgICAgLy8gRmlsbCBlbXB0eSBub25jZVxuICAgICAgICB0aGlzLmJ1bmRsZVtpXS5ub25jZSA9IGVtcHR5VGFnO1xuICAgIH1cbn1cblxuXG4vKipcbipcbipcbioqL1xuQnVuZGxlLnByb3RvdHlwZS5maW5hbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB2YWxpZEJ1bmRsZSA9IGZhbHNlO1xuXG4gIHdoaWxlKCF2YWxpZEJ1bmRsZSkge1xuXG4gICAgdmFyIGtlcmwgPSBuZXcgS2VybCgpO1xuICAgIGtlcmwuaW5pdGlhbGl6ZSgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmJ1bmRsZS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciB2YWx1ZVRyaXRzID0gQ29udmVydGVyLnRyaXRzKHRoaXMuYnVuZGxlW2ldLnZhbHVlKTtcbiAgICAgICAgd2hpbGUgKHZhbHVlVHJpdHMubGVuZ3RoIDwgODEpIHtcbiAgICAgICAgICAgIHZhbHVlVHJpdHNbdmFsdWVUcml0cy5sZW5ndGhdID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0aW1lc3RhbXBUcml0cyA9IENvbnZlcnRlci50cml0cyh0aGlzLmJ1bmRsZVtpXS50aW1lc3RhbXApO1xuICAgICAgICB3aGlsZSAodGltZXN0YW1wVHJpdHMubGVuZ3RoIDwgMjcpIHtcbiAgICAgICAgICAgIHRpbWVzdGFtcFRyaXRzW3RpbWVzdGFtcFRyaXRzLmxlbmd0aF0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleFRyaXRzID0gQ29udmVydGVyLnRyaXRzKHRoaXMuYnVuZGxlW2ldLmN1cnJlbnRJbmRleCA9IGkpO1xuICAgICAgICB3aGlsZSAoY3VycmVudEluZGV4VHJpdHMubGVuZ3RoIDwgMjcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleFRyaXRzW2N1cnJlbnRJbmRleFRyaXRzLmxlbmd0aF0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxhc3RJbmRleFRyaXRzID0gQ29udmVydGVyLnRyaXRzKHRoaXMuYnVuZGxlW2ldLmxhc3RJbmRleCA9IHRoaXMuYnVuZGxlLmxlbmd0aCAtIDEpO1xuICAgICAgICB3aGlsZSAobGFzdEluZGV4VHJpdHMubGVuZ3RoIDwgMjcpIHtcbiAgICAgICAgICAgIGxhc3RJbmRleFRyaXRzW2xhc3RJbmRleFRyaXRzLmxlbmd0aF0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJ1bmRsZUVzc2VuY2UgPSBDb252ZXJ0ZXIudHJpdHModGhpcy5idW5kbGVbaV0uYWRkcmVzcyArIENvbnZlcnRlci50cnl0ZXModmFsdWVUcml0cykgKyB0aGlzLmJ1bmRsZVtpXS5vYnNvbGV0ZVRhZyArIENvbnZlcnRlci50cnl0ZXModGltZXN0YW1wVHJpdHMpICsgQ29udmVydGVyLnRyeXRlcyhjdXJyZW50SW5kZXhUcml0cykgKyBDb252ZXJ0ZXIudHJ5dGVzKGxhc3RJbmRleFRyaXRzKSk7XG4gICAgICAgIGtlcmwuYWJzb3JiKGJ1bmRsZUVzc2VuY2UsIDAsIGJ1bmRsZUVzc2VuY2UubGVuZ3RoKTtcbiAgICB9XG5cbiAgICB2YXIgaGFzaCA9IFtdO1xuICAgIGtlcmwuc3F1ZWV6ZShoYXNoLCAwLCBDdXJsLkhBU0hfTEVOR1RIKTtcbiAgICBoYXNoID0gQ29udmVydGVyLnRyeXRlcyhoYXNoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5idW5kbGUubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB0aGlzLmJ1bmRsZVtpXS5idW5kbGUgPSBoYXNoO1xuICAgIH1cblxuICAgIHZhciBub3JtYWxpemVkSGFzaCA9IHRoaXMubm9ybWFsaXplZEJ1bmRsZShoYXNoKTtcbiAgICBpZihub3JtYWxpemVkSGFzaC5pbmRleE9mKDEzIC8qID0gTSAqLykgIT0gLTEpIHtcbiAgICAgIC8vIEluc2VjdXJlIGJ1bmRsZS4gSW5jcmVtZW50IFRhZyBhbmQgcmVjb21wdXRlIGJ1bmRsZSBoYXNoLlxuICAgICAgdmFyIGluY3JlYXNlZFRhZyA9IHRyaXRBZGQoQ29udmVydGVyLnRyaXRzKHRoaXMuYnVuZGxlWzBdLm9ic29sZXRlVGFnKSwgWzFdKTtcbiAgICAgIHRoaXMuYnVuZGxlWzBdLm9ic29sZXRlVGFnID0gQ29udmVydGVyLnRyeXRlcyhpbmNyZWFzZWRUYWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWxpZEJ1bmRsZSA9IHRydWU7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuKiAgIE5vcm1hbGl6ZXMgdGhlIGJ1bmRsZSBoYXNoXG4qXG4qKi9cbkJ1bmRsZS5wcm90b3R5cGUubm9ybWFsaXplZEJ1bmRsZSA9IGZ1bmN0aW9uKGJ1bmRsZUhhc2gpIHtcblxuICAgIHZhciBub3JtYWxpemVkQnVuZGxlID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXG4gICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDI3OyBqKyspIHtcblxuICAgICAgICAgICAgc3VtICs9IChub3JtYWxpemVkQnVuZGxlW2kgKiAyNyArIGpdID0gQ29udmVydGVyLnZhbHVlKENvbnZlcnRlci50cml0cyhidW5kbGVIYXNoLmNoYXJBdChpICogMjcgKyBqKSkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdW0gPj0gMCkge1xuXG4gICAgICAgICAgICB3aGlsZSAoc3VtLS0gPiAwKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDI3OyBqKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZEJ1bmRsZVtpICogMjcgKyBqXSA+IC0xMykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkQnVuZGxlW2kgKiAyNyArIGpdLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgd2hpbGUgKHN1bSsrIDwgMCkge1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAyNzsgaisrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRCdW5kbGVbaSAqIDI3ICsgal0gPCAxMykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkQnVuZGxlW2kgKiAyNyArIGpdKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub3JtYWxpemVkQnVuZGxlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1bmRsZTtcbiIsIi8qKlxuICpcbiAqICAgQ29udmVyc2lvbiBmdW5jdGlvbnNcbiAqXG4gKiovXG5cbnZhciBSQURJWCA9IDM7XG52YXIgUkFESVhfQllURVMgPSAyNTY7XG52YXIgTUFYX1RSSVRfVkFMVUUgPSAxO1xudmFyIE1JTl9UUklUX1ZBTFVFID0gLTE7XG52YXIgQllURV9IQVNIX0xFTkdUSCA9IDQ4O1xuXG4vLyBBbGwgcG9zc2libGUgdHJ5dGUgdmFsdWVzXG52YXIgdHJ5dGVzQWxwaGFiZXQgPSBcIjlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiXG5cbi8vIG1hcCBvZiBhbGwgdHJpdHMgcmVwcmVzZW50YXRpb25zXG52YXIgdHJ5dGVzVHJpdHMgPSBbXG4gICAgWyAwLCAgMCwgIDBdLFxuICAgIFsgMSwgIDAsICAwXSxcbiAgICBbLTEsICAxLCAgMF0sXG4gICAgWyAwLCAgMSwgIDBdLFxuICAgIFsgMSwgIDEsICAwXSxcbiAgICBbLTEsIC0xLCAgMV0sXG4gICAgWyAwLCAtMSwgIDFdLFxuICAgIFsgMSwgLTEsICAxXSxcbiAgICBbLTEsICAwLCAgMV0sXG4gICAgWyAwLCAgMCwgIDFdLFxuICAgIFsgMSwgIDAsICAxXSxcbiAgICBbLTEsICAxLCAgMV0sXG4gICAgWyAwLCAgMSwgIDFdLFxuICAgIFsgMSwgIDEsICAxXSxcbiAgICBbLTEsIC0xLCAtMV0sXG4gICAgWyAwLCAtMSwgLTFdLFxuICAgIFsgMSwgLTEsIC0xXSxcbiAgICBbLTEsICAwLCAtMV0sXG4gICAgWyAwLCAgMCwgLTFdLFxuICAgIFsgMSwgIDAsIC0xXSxcbiAgICBbLTEsICAxLCAtMV0sXG4gICAgWyAwLCAgMSwgLTFdLFxuICAgIFsgMSwgIDEsIC0xXSxcbiAgICBbLTEsIC0xLCAgMF0sXG4gICAgWyAwLCAtMSwgIDBdLFxuICAgIFsgMSwgLTEsICAwXSxcbiAgICBbLTEsICAwLCAgMF1cbl07XG5cbi8qKlxuICogICBDb252ZXJ0cyB0cnl0ZXMgaW50byB0cml0c1xuICpcbiAqICAgQG1ldGhvZCB0cml0c1xuICogICBAcGFyYW0ge1N0cmluZ3xJbnR9IGlucHV0IFRyeXRlIHZhbHVlIHRvIGJlIGNvbnZlcnRlZC4gQ2FuIGVpdGhlciBiZSBzdHJpbmcgb3IgaW50XG4gKiAgIEBwYXJhbSB7QXJyYXl9IHN0YXRlIChvcHRpb25hbCkgc3RhdGUgdG8gYmUgbW9kaWZpZWRcbiAqICAgQHJldHVybnMge0FycmF5fSB0cml0c1xuICoqL1xudmFyIHRyaXRzID0gZnVuY3Rpb24oIGlucHV0LCBzdGF0ZSApIHtcblxuICAgIHZhciB0cml0cyA9IHN0YXRlIHx8IFtdO1xuXG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoaW5wdXQpKSB7XG5cbiAgICAgICAgdmFyIGFic29sdXRlVmFsdWUgPSBpbnB1dCA8IDAgPyAtaW5wdXQgOiBpbnB1dDtcblxuICAgICAgICB3aGlsZSAoYWJzb2x1dGVWYWx1ZSA+IDApIHtcblxuICAgICAgICAgICAgdmFyIHJlbWFpbmRlciA9IGFic29sdXRlVmFsdWUgJSAzO1xuICAgICAgICAgICAgYWJzb2x1dGVWYWx1ZSA9IE1hdGguZmxvb3IoYWJzb2x1dGVWYWx1ZSAvIDMpO1xuXG4gICAgICAgICAgICBpZiAocmVtYWluZGVyID4gMSkge1xuICAgICAgICAgICAgICAgIHJlbWFpbmRlciA9IC0xO1xuICAgICAgICAgICAgICAgIGFic29sdXRlVmFsdWUrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJpdHNbdHJpdHMubGVuZ3RoXSA9IHJlbWFpbmRlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXQgPCAwKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJpdHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHRyaXRzW2ldID0gLXRyaXRzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRyeXRlc0FscGhhYmV0LmluZGV4T2YoaW5wdXQuY2hhckF0KGkpKTtcbiAgICAgICAgICAgIHRyaXRzW2kgKiAzXSA9IHRyeXRlc1RyaXRzW2luZGV4XVswXTtcbiAgICAgICAgICAgIHRyaXRzW2kgKiAzICsgMV0gPSB0cnl0ZXNUcml0c1tpbmRleF1bMV07XG4gICAgICAgICAgICB0cml0c1tpICogMyArIDJdID0gdHJ5dGVzVHJpdHNbaW5kZXhdWzJdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyaXRzO1xufVxuXG4vKipcbiAqICAgQ29udmVydHMgdHJpdHMgaW50byB0cnl0ZXNcbiAqXG4gKiAgIEBtZXRob2QgdHJ5dGVzXG4gKiAgIEBwYXJhbSB7QXJyYXl9IHRyaXRzXG4gKiAgIEByZXR1cm5zIHtTdHJpbmd9IHRyeXRlc1xuICoqL1xudmFyIHRyeXRlcyA9IGZ1bmN0aW9uKHRyaXRzKSB7XG5cbiAgICB2YXIgdHJ5dGVzID0gXCJcIjtcblxuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHRyaXRzLmxlbmd0aDsgaSArPSAzICkge1xuXG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBhbGwgcG9zc2libGUgdHJ5dGUgdmFsdWVzIHRvIGZpbmQgY29ycmVjdCB0cml0IHJlcHJlc2VudGF0aW9uXG4gICAgICAgIGZvciAoIHZhciBqID0gMDsgaiA8IHRyeXRlc0FscGhhYmV0Lmxlbmd0aDsgaisrICkge1xuXG4gICAgICAgICAgICBpZiAoIHRyeXRlc1RyaXRzWyBqIF1bIDAgXSA9PT0gdHJpdHNbIGkgXSAmJiB0cnl0ZXNUcml0c1sgaiBdWyAxIF0gPT09IHRyaXRzWyBpICsgMSBdICYmIHRyeXRlc1RyaXRzWyBqIF1bIDIgXSA9PT0gdHJpdHNbIGkgKyAyIF0gKSB7XG5cbiAgICAgICAgICAgICAgICB0cnl0ZXMgKz0gdHJ5dGVzQWxwaGFiZXQuY2hhckF0KCBqICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ5dGVzO1xufVxuXG4vKipcbiAqICAgQ29udmVydHMgdHJpdHMgaW50byBhbiBpbnRlZ2VyIHZhbHVlXG4gKlxuICogICBAbWV0aG9kIHZhbHVlXG4gKiAgIEBwYXJhbSB7QXJyYXl9IHRyaXRzXG4gKiAgIEByZXR1cm5zIHtpbnR9IHZhbHVlXG4gKiovXG52YXIgdmFsdWUgPSBmdW5jdGlvbih0cml0cykge1xuXG4gICAgdmFyIHJldHVyblZhbHVlID0gMDtcblxuICAgIGZvciAoIHZhciBpID0gdHJpdHMubGVuZ3RoOyBpLS0gPiAwOyApIHtcblxuICAgICAgICByZXR1cm5WYWx1ZSA9IHJldHVyblZhbHVlICogMyArIHRyaXRzWyBpIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xufVxuXG4vKipcbiAqICAgQ29udmVydHMgYW4gaW50ZWdlciB2YWx1ZSB0byB0cml0c1xuICpcbiAqICAgQG1ldGhvZCB2YWx1ZVxuICogICBAcGFyYW0ge0ludH0gdmFsdWVcbiAqICAgQHJldHVybnMge0FycmF5fSB0cml0c1xuICoqL1xudmFyIGZyb21WYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cbiAgICB2YXIgZGVzdGluYXRpb24gPSBbXTtcbiAgICB2YXIgYWJzb2x1dGVWYWx1ZSA9IHZhbHVlIDwgMCA/IC12YWx1ZSA6IHZhbHVlO1xuICAgIHZhciBpID0gMDtcblxuICAgIHdoaWxlKCBhYnNvbHV0ZVZhbHVlID4gMCApIHtcblxuICAgICAgICB2YXIgcmVtYWluZGVyID0gKCBhYnNvbHV0ZVZhbHVlICUgUkFESVggKTtcbiAgICAgICAgYWJzb2x1dGVWYWx1ZSA9IE1hdGguZmxvb3IoIGFic29sdXRlVmFsdWUgLyBSQURJWCApO1xuXG4gICAgICAgIGlmICggcmVtYWluZGVyID4gTUFYX1RSSVRfVkFMVUUgKSB7XG5cbiAgICAgICAgICAgIHJlbWFpbmRlciA9IE1JTl9UUklUX1ZBTFVFO1xuICAgICAgICAgICAgYWJzb2x1dGVWYWx1ZSsrO1xuXG4gICAgICAgIH1cblxuICAgICAgICBkZXN0aW5hdGlvblsgaSBdID0gcmVtYWluZGVyO1xuICAgICAgICBpKys7XG5cbiAgICB9XG5cbiAgICBpZiAoIHZhbHVlIDwgMCApIHtcblxuICAgICAgICBmb3IgKCB2YXIgaiA9IDA7IGogPCBkZXN0aW5hdGlvbi5sZW5ndGg7IGorKyApIHtcblxuICAgICAgICAgICAgLy8gc3dpdGNoIHZhbHVlc1xuICAgICAgICAgICAgZGVzdGluYXRpb25bIGogXSA9IGRlc3RpbmF0aW9uWyBqIF0gPT09IDAgPyAwOiAtZGVzdGluYXRpb25bIGogXTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gZGVzdGluYXRpb247XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHRyaXRzICAgICAgICAgICA6IHRyaXRzLFxuICAgIHRyeXRlcyAgICAgICAgICA6IHRyeXRlcyxcbiAgICB2YWx1ZSAgICAgICAgICAgOiB2YWx1ZSxcbiAgICBmcm9tVmFsdWUgICAgICAgOiBmcm9tVmFsdWVcbn07XG4iLCJ2YXIgSU5UX0xFTkdUSCA9IDEyO1xudmFyIEJZVEVfTEVOR1RIID0gNDg7XG52YXIgUkFESVggPSAzO1xuLy8vIGhleCByZXByZXNlbnRhdGlvbiBvZiAoM14yNDIpLzJcbnZhciBIQUxGXzMgPSBuZXcgVWludDMyQXJyYXkoW1xuICAgIDB4YTVjZTg5NjQsXG4gICAgMHg5ZjAwNzY2OSxcbiAgICAweDE0ODQ1MDRmLFxuICAgIDB4M2FkZTAwZDksXG4gICAgMHgwYzI0NDg2ZSxcbiAgICAweDUwOTc5ZDU3LFxuICAgIDB4NzlhNGM3MDIsXG4gICAgMHg0OGJiYWUzNixcbiAgICAweGE5ZjY4MDhiLFxuICAgIDB4YWEwNmE4MDUsXG4gICAgMHhhODdmYWJkZixcbiAgICAweDVlNjllYmVmXG5dKTtcblxudmFyIGNsb25lX3VpbnQzMkFycmF5ID0gZnVuY3Rpb24oc291cmNlQXJyYXkpIHtcbiAgdmFyIGRlc3RpbmF0aW9uID0gbmV3IEFycmF5QnVmZmVyKHNvdXJjZUFycmF5LmJ5dGVMZW5ndGgpO1xuICBuZXcgVWludDMyQXJyYXkoZGVzdGluYXRpb24pLnNldChuZXcgVWludDMyQXJyYXkoc291cmNlQXJyYXkpKTtcblxuICByZXR1cm4gZGVzdGluYXRpb247XG59O1xuXG52YXIgdGFfc2xpY2UgPSBmdW5jdGlvbihhcnJheSkge1xuICBpZiAoYXJyYXkuc2xpY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGFycmF5LnNsaWNlKCk7XG4gIH1cblxuICByZXR1cm4gY2xvbmVfdWludDMyQXJyYXkoYXJyYXkpO1xufTtcblxudmFyIHRhX3JldmVyc2UgPSBmdW5jdGlvbihhcnJheSkge1xuICBpZiAoYXJyYXkucmV2ZXJzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkucmV2ZXJzZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBpID0gMCxcbiAgICBuID0gYXJyYXkubGVuZ3RoLFxuICAgIG1pZGRsZSA9IE1hdGguZmxvb3IobiAvIDIpLFxuICAgIHRlbXAgPSBudWxsO1xuXG4gIGZvciAoOyBpIDwgbWlkZGxlOyBpICs9IDEpIHtcbiAgICB0ZW1wID0gYXJyYXlbaV07XG4gICAgYXJyYXlbaV0gPSBhcnJheVtuIC0gMSAtIGldO1xuICAgIGFycmF5W24gLSAxIC0gaV0gPSB0ZW1wO1xuICB9XG59O1xuXG4vLy8gbmVnYXRlcyB0aGUgKHVuc2lnbmVkKSBpbnB1dCBhcnJheVxudmFyIGJpZ2ludF9ub3QgPSBmdW5jdGlvbihhcnIpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBhcnJbaV0gPSAofmFycltpXSkgPj4+IDA7XG4gICAgfVxufTtcblxuLy8vIHJzaGlmdCB0aGF0IHdvcmtzIHdpdGggdXAgdG8gNTNcbi8vLyBKUydzIHNoaWZ0IG9wZXJhdG9ycyBvbmx5IHdvcmsgb24gMzIgYml0IGludGVnZXJzXG4vLy8gb3VycyBpcyB1cCB0byAzMyBvciAzNCBiaXRzIHRob3VnaCwgc29cbi8vLyB3ZSBuZWVkIHRvIGltcGxlbWVudCBzaGlmdGluZyBtYW51YWxseVxudmFyIHJzaGlmdCA9IGZ1bmN0aW9uKG51bWJlciwgc2hpZnQpIHtcbiAgICByZXR1cm4gKG51bWJlciAvIE1hdGgucG93KDIsIHNoaWZ0KSkgPj4+IDA7XG59O1xuXG4vLy8gc3dhcHMgZW5kaWFubmVzc1xudmFyIHN3YXAzMiA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiAoKHZhbCAmIDB4RkYpIDw8IDI0KSB8XG4gICAgICAgICgodmFsICYgMHhGRjAwKSA8PCA4KSB8XG4gICAgICAgICgodmFsID4+IDgpICYgMHhGRjAwKSB8XG4gICAgICAgICgodmFsID4+IDI0KSAmIDB4RkYpO1xufVxuXG4vLy8gYWRkIHdpdGggY2FycnlcbnZhciBmdWxsX2FkZCA9IGZ1bmN0aW9uKGxoLCByaCwgY2FycnkpIHtcbiAgICB2YXIgdiA9IGxoICsgcmg7XG4gICAgdmFyIGwgPSAocnNoaWZ0KHYsIDMyKSkgJiAweEZGRkZGRkZGO1xuICAgIHZhciByID0gKHYgJiAweEZGRkZGRkZGKSA+Pj4gMDtcbiAgICB2YXIgY2FycnkxID0gbCAhPSAwO1xuXG4gICAgaWYgKGNhcnJ5KSB7XG4gICAgICAgIHYgPSByICsgMTtcbiAgICB9XG4gICAgbCA9IChyc2hpZnQodiwgMzIpKSAmIDB4RkZGRkZGRkY7XG4gICAgciA9ICh2ICYgMHhGRkZGRkZGRikgPj4+IDA7XG4gICAgdmFyIGNhcnJ5MiA9IGwgIT0gMDtcblxuICAgIHJldHVybiBbciwgY2FycnkxIHx8IGNhcnJ5Ml07XG59O1xuXG4vLy8gc3VidHJhY3RzIHJoIGZyb20gYmFzZVxudmFyIGJpZ2ludF9zdWIgPSBmdW5jdGlvbihiYXNlLCByaCkge1xuICAgIHZhciBub2JvcnJvdyA9IHRydWU7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHZjID0gZnVsbF9hZGQoYmFzZVtpXSwgKH5yaFtpXSA+Pj4gMCksIG5vYm9ycm93KTtcbiAgICAgICAgYmFzZVtpXSA9IHZjWzBdO1xuICAgICAgICBub2JvcnJvdyA9IHZjWzFdO1xuICAgIH1cblxuICAgIGlmICghbm9ib3Jyb3cpIHtcbiAgICAgICAgdGhyb3cgXCJub2JvcnJvd1wiO1xuICAgIH1cbn07XG5cbi8vLyBjb21wYXJlcyB0d28gKHVuc2lnbmVkKSBiaWcgaW50ZWdlcnNcbnZhciBiaWdpbnRfY21wID0gZnVuY3Rpb24obGgsIHJoKSB7XG4gICAgZm9yICh2YXIgaSA9IGxoLmxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgICAgdmFyIGEgPSBsaFtpXSA+Pj4gMDtcbiAgICAgICAgdmFyIGIgPSByaFtpXSA+Pj4gMDtcbiAgICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoYSA+IGIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xufTtcblxuLy8vIGFkZHMgcmggdG8gYmFzZSBpbiBwbGFjZVxudmFyIGJpZ2ludF9hZGQgPSBmdW5jdGlvbihiYXNlLCByaCkge1xuICAgIHZhciBjYXJyeSA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFzZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdmMgPSBmdWxsX2FkZChiYXNlW2ldLCByaFtpXSwgY2FycnkpO1xuICAgICAgICBiYXNlW2ldID0gdmNbMF07XG4gICAgICAgIGNhcnJ5ID0gdmNbMV07XG4gICAgfVxufTtcblxuLy8vIGFkZHMgYSBzbWFsbCAoaS5lLiA8MzJiaXQpIG51bWJlciB0byBiYXNlXG52YXIgYmlnaW50X2FkZF9zbWFsbCA9IGZ1bmN0aW9uKGJhc2UsIG90aGVyKSB7XG4gICAgdmFyIHZjID0gZnVsbF9hZGQoYmFzZVswXSwgb3RoZXIsIGZhbHNlKTtcbiAgICBiYXNlWzBdID0gdmNbMF07XG4gICAgdmFyIGNhcnJ5ID0gdmNbMV07XG5cbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGNhcnJ5ICYmIGkgPCBiYXNlLmxlbmd0aCkge1xuICAgICAgICB2YXIgdmMgPSBmdWxsX2FkZChiYXNlW2ldLCAwLCBjYXJyeSk7XG4gICAgICAgIGJhc2VbaV0gPSB2Y1swXTtcbiAgICAgICAgY2FycnkgPSB2Y1sxXTtcbiAgICAgICAgaSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBpO1xufTtcblxuLy8vIGNvbnZlcnRzIHRoZSBnaXZlbiBieXRlIGFycmF5IHRvIHRyaXRzXG52YXIgd29yZHNfdG9fdHJpdHMgPSBmdW5jdGlvbih3b3Jkcykge1xuICAgIGlmICh3b3Jkcy5sZW5ndGggIT0gSU5UX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBcIkludmFsaWQgd29yZHMgbGVuZ3RoXCI7XG4gICAgfVxuXG4gICAgdmFyIHRyaXRzID0gbmV3IEludDhBcnJheSgyNDMpO1xuICAgIHZhciBiYXNlID0gbmV3IFVpbnQzMkFycmF5KHdvcmRzKTtcblxuICAgIHRhX3JldmVyc2UoYmFzZSk7XG5cbiAgICB2YXIgZmxpcF90cml0cyA9IGZhbHNlO1xuICAgIGlmIChiYXNlW0lOVF9MRU5HVEggLSAxXSA+PiAzMSA9PSAwKSB7XG4gICAgICAgIC8vIHBvc2l0aXZlIHR3bydzIGNvbXBsZW1lbnQgbnVtYmVyLlxuICAgICAgICAvLyBhZGQgSEFMRl8zIHRvIG1vdmUgaXQgdG8gdGhlIHJpZ2h0IHBsYWNlLlxuICAgICAgICBiaWdpbnRfYWRkKGJhc2UsIEhBTEZfMyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbmVnYXRpdmUgbnVtYmVyLlxuICAgICAgICBiaWdpbnRfbm90KGJhc2UpO1xuICAgICAgICBpZiAoYmlnaW50X2NtcChiYXNlLCBIQUxGXzMpID4gMCkge1xuICAgICAgICAgICAgYmlnaW50X3N1YihiYXNlLCBIQUxGXzMpO1xuICAgICAgICAgICAgZmxpcF90cml0cyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLy8gYmlnaW50IGlzIGJldHdlZW4gKHVuc2lnbmVkKSBIQUxGXzMgYW5kICgyKiozODQgLSAzKioyNDIvMikuXG4gICAgICAgICAgICBiaWdpbnRfYWRkX3NtYWxsKGJhc2UsIDEpO1xuICAgICAgICAgICAgdmFyIHRtcCA9IHRhX3NsaWNlKEhBTEZfMyk7XG4gICAgICAgICAgICBiaWdpbnRfc3ViKHRtcCwgYmFzZSk7XG4gICAgICAgICAgICBiYXNlID0gdG1wO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICB2YXIgcmVtID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjQyOyBpKyspIHtcbiAgICAgICAgcmVtID0gMDtcbiAgICAgICAgZm9yICh2YXIgaiA9IElOVF9MRU5HVEggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgdmFyIGxocyA9IChyZW0gIT0gMCA/IHJlbSAqIDB4RkZGRkZGRkYgKyByZW0gOiAwKSArIGJhc2Vbal07XG4gICAgICAgICAgICB2YXIgcmhzID0gUkFESVg7XG5cbiAgICAgICAgICAgIHZhciBxID0gKGxocyAvIHJocykgPj4+IDA7XG4gICAgICAgICAgICB2YXIgciA9IChsaHMgJSByaHMpID4+PiAwO1xuXG4gICAgICAgICAgICBiYXNlW2pdID0gcTtcbiAgICAgICAgICAgIHJlbSA9IHI7XG4gICAgICAgIH1cblxuICAgICAgICB0cml0c1tpXSA9IHJlbSAtIDE7XG4gICAgfVxuXG4gICAgaWYgKGZsaXBfdHJpdHMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cml0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHJpdHNbaV0gPSAtdHJpdHNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJpdHM7XG59XG5cbnZhciBpc19udWxsID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFycltpXSAhPSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxudmFyIHRyaXRzX3RvX3dvcmRzID0gZnVuY3Rpb24odHJpdHMpIHtcbiAgICBpZiAodHJpdHMubGVuZ3RoICE9IDI0Mykge1xuICAgICAgICB0aHJvdyBcIkludmFsaWQgdHJpdHMgbGVuZ3RoXCI7XG4gICAgfVxuXG4gICAgdmFyIGJhc2UgPSBuZXcgVWludDMyQXJyYXkoSU5UX0xFTkdUSCk7XG5cbiAgICBpZiAodHJpdHMuc2xpY2UoMCwgMjQyKS5ldmVyeShmdW5jdGlvbihhKSB7XG4gICAgICAgICAgICBhID09IC0xXG4gICAgICAgIH0pKSB7XG4gICAgICAgIGJhc2UgPSB0YV9zbGljZShIQUxGXzMpO1xuICAgICAgICBiaWdpbnRfbm90KGJhc2UpO1xuICAgICAgICBiaWdpbnRfYWRkX3NtYWxsKGJhc2UsIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzaXplID0gMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRyaXRzLmxlbmd0aCAtIDE7IGktLSA+IDA7KSB7XG4gICAgICAgICAgICB2YXIgdHJpdCA9IHRyaXRzW2ldICsgMTtcblxuICAgICAgICAgICAgLy9tdWx0aXBseSBieSByYWRpeFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBzeiA9IHNpemU7XG4gICAgICAgICAgICAgICAgdmFyIGNhcnJ5ID0gMDtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3o7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IGJhc2Vbal0gKiBSQURJWCArIGNhcnJ5O1xuICAgICAgICAgICAgICAgICAgICBjYXJyeSA9IHJzaGlmdCh2LCAzMik7XG4gICAgICAgICAgICAgICAgICAgIGJhc2Vbal0gPSAodiAmIDB4RkZGRkZGRkYpID4+PiAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjYXJyeSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZVtzel0gPSBjYXJyeTtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9hZGRpdGlvblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBzeiA9IGJpZ2ludF9hZGRfc21hbGwoYmFzZSwgdHJpdCk7XG4gICAgICAgICAgICAgICAgaWYgKHN6ID4gc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBzaXplID0gc3o7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc19udWxsKGJhc2UpKSB7XG4gICAgICAgICAgICBpZiAoYmlnaW50X2NtcChIQUxGXzMsIGJhc2UpIDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBiYXNlID49IEhBTEZfM1xuICAgICAgICAgICAgICAgIC8vIGp1c3QgZG8gYmFzZSAtIEhBTEZfM1xuICAgICAgICAgICAgICAgIGJpZ2ludF9zdWIoYmFzZSwgSEFMRl8zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYmFzZSA8IEhBTEZfM1xuICAgICAgICAgICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gdHJhbnNmb3JtIGl0IHRvIGEgdHdvJ3MgY29tcGxlbWVudCByZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgICAgIC8vIG9mIChiYXNlIC0gSEFMRl8zKS5cbiAgICAgICAgICAgICAgICAvLyBhcyB3ZSBkb24ndCBoYXZlIGEgd3JhcHBpbmcgKC0pLCB3ZSBuZWVkIHRvIHVzZSBzb21lIGJpdCBtYWdpY1xuICAgICAgICAgICAgICAgIHZhciB0bXAgPSB0YV9zbGljZShIQUxGXzMpO1xuICAgICAgICAgICAgICAgIGJpZ2ludF9zdWIodG1wLCBiYXNlKTtcbiAgICAgICAgICAgICAgICBiaWdpbnRfbm90KHRtcCk7XG4gICAgICAgICAgICAgICAgYmlnaW50X2FkZF9zbWFsbCh0bXAsIDEpO1xuICAgICAgICAgICAgICAgIGJhc2UgPSB0bXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0YV9yZXZlcnNlKGJhc2UpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiYXNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJhc2VbaV0gPSBzd2FwMzIoYmFzZVtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB0cml0c190b193b3JkczogdHJpdHNfdG9fd29yZHMsXG4gICAgd29yZHNfdG9fdHJpdHM6IHdvcmRzX3RvX3RyaXRzXG59O1xuIiwidmFyIENvbnZlcnRlciA9IHJlcXVpcmUoXCIuLi9jb252ZXJ0ZXIvY29udmVydGVyXCIpO1xuXG4vKipcbioqICAgICAgQ3J5cHRvZ3JhcGhpYyByZWxhdGVkIGZ1bmN0aW9ucyB0byBJT1RBJ3MgQ3VybCAoc3BvbmdlIGZ1bmN0aW9uKVxuKiovXG5cbnZhciBOVU1CRVJfT0ZfUk9VTkRTID0gODE7XG52YXIgSEFTSF9MRU5HVEggPSAyNDM7XG52YXIgU1RBVEVfTEVOR1RIID0gMyAqIEhBU0hfTEVOR1RIO1xuXG5mdW5jdGlvbiBDdXJsKHJvdW5kcykge1xuICAgIGlmIChyb3VuZHMpIHtcbiAgICAgIHRoaXMucm91bmRzID0gcm91bmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJvdW5kcyA9IE5VTUJFUl9PRl9ST1VORFM7XG4gICAgfVxuICAgIC8vIHRydXRoIHRhYmxlXG4gICAgdGhpcy50cnV0aFRhYmxlID0gWzEsIDAsIC0xLCAyLCAxLCAtMSwgMCwgMiwgLTEsIDEsIDBdO1xufVxuXG5DdXJsLkhBU0hfTEVOR1RIID0gSEFTSF9MRU5HVEg7XG5cbi8qKlxuKiAgIEluaXRpYWxpemVzIHRoZSBzdGF0ZSB3aXRoIFNUQVRFX0xFTkdUSCB0cml0c1xuKlxuKiAgIEBtZXRob2QgaW5pdGlhbGl6ZVxuKiovXG5DdXJsLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24oc3RhdGUsIGxlbmd0aCkge1xuXG4gICAgaWYgKHN0YXRlKSB7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICB0aGlzLnN0YXRlID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBTVEFURV9MRU5HVEg7IGkrKykge1xuXG4gICAgICAgICAgICB0aGlzLnN0YXRlW2ldID0gMDtcblxuICAgICAgICB9XG4gICAgfVxufVxuXG5DdXJsLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmluaXRpYWxpemUoKTtcbn1cblxuLyoqXG4qICAgU3BvbmdlIGFic29yYiBmdW5jdGlvblxuKlxuKiAgIEBtZXRob2QgYWJzb3JiXG4qKi9cbkN1cmwucHJvdG90eXBlLmFic29yYiA9IGZ1bmN0aW9uKHRyaXRzLCBvZmZzZXQsIGxlbmd0aCkge1xuXG4gICAgZG8ge1xuXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIGxpbWl0ID0gKGxlbmd0aCA8IEhBU0hfTEVOR1RIID8gbGVuZ3RoIDogSEFTSF9MRU5HVEgpO1xuXG4gICAgICAgIHdoaWxlIChpIDwgbGltaXQpIHtcblxuICAgICAgICAgICAgdGhpcy5zdGF0ZVtpKytdID0gdHJpdHNbb2Zmc2V0KytdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFuc2Zvcm0oKTtcblxuICAgIH0gd2hpbGUgKCggbGVuZ3RoIC09IEhBU0hfTEVOR1RIICkgPiAwKVxuXG59XG5cbi8qKlxuKiAgIFNwb25nZSBzcXVlZXplIGZ1bmN0aW9uXG4qXG4qICAgQG1ldGhvZCBzcXVlZXplXG4qKi9cbkN1cmwucHJvdG90eXBlLnNxdWVlemUgPSBmdW5jdGlvbih0cml0cywgb2Zmc2V0LCBsZW5ndGgpIHtcblxuICAgIGRvIHtcblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBsaW1pdCA9IChsZW5ndGggPCBIQVNIX0xFTkdUSCA/IGxlbmd0aCA6IEhBU0hfTEVOR1RIKTtcblxuICAgICAgICB3aGlsZSAoaSA8IGxpbWl0KSB7XG5cbiAgICAgICAgICAgIHRyaXRzW29mZnNldCsrXSA9IHRoaXMuc3RhdGVbaSsrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJhbnNmb3JtKCk7XG5cbiAgICB9IHdoaWxlICgoIGxlbmd0aCAtPSBIQVNIX0xFTkdUSCApID4gMClcbn1cblxuLyoqXG4qICAgU3BvbmdlIHRyYW5zZm9ybSBmdW5jdGlvblxuKlxuKiAgIEBtZXRob2QgdHJhbnNmb3JtXG4qKi9cbkN1cmwucHJvdG90eXBlLnRyYW5zZm9ybSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlQ29weSA9IFtdLCBpbmRleCA9IDA7XG5cbiAgICBmb3IgKHZhciByb3VuZCA9IDA7IHJvdW5kIDwgdGhpcy5yb3VuZHM7IHJvdW5kKyspIHtcblxuICAgICAgICBzdGF0ZUNvcHkgPSB0aGlzLnN0YXRlLnNsaWNlKCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBTVEFURV9MRU5HVEg7IGkrKykge1xuXG4gICAgICAgICAgICB0aGlzLnN0YXRlW2ldID0gdGhpcy50cnV0aFRhYmxlW3N0YXRlQ29weVtpbmRleF0gKyAoc3RhdGVDb3B5W2luZGV4ICs9IChpbmRleCA8IDM2NSA/IDM2NCA6IC0zNjUpXSA8PCAyKSArIDVdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEN1cmxcbiIsIi8qIGNvcHlyaWdodCBQYXVsIEhhbmR5LCAyMDE3ICovXG5cbmZ1bmN0aW9uIHN1bSggYSwgYiApIHtcblxuICAgIHZhciBzID0gYSArIGI7XG5cbiAgICBzd2l0Y2goIHMgKSB7XG5cbiAgICAgICAgY2FzZSAyOiByZXR1cm4gLTE7XG4gICAgICAgIGNhc2UgLTI6IHJldHVybiAxO1xuICAgICAgICBkZWZhdWx0OiByZXR1cm4gcztcblxuICAgIH1cbn1cblxuZnVuY3Rpb24gY29ucyggYSwgYiApIHtcblxuICAgIGlmKCBhID09PSBiICkge1xuXG4gICAgICAgIHJldHVybiBhO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIGFueSggYSwgYiApIHtcblxuICAgIHZhciBzID0gYSArIGI7XG5cbiAgICBpZiAoIHMgPiAwICkge1xuXG4gICAgICAgIHJldHVybiAxO1xuXG4gICAgfSBlbHNlIGlmICggcyA8IDAgKSB7XG5cbiAgICAgICAgcmV0dXJuIC0xO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIGZ1bGxfYWRkKCBhLCBiLCBjICkge1xuXG4gICAgdmFyIHNfYSAgICAgPSAgIHN1bSggYSwgYiApO1xuICAgIHZhciBjX2EgICAgID0gICBjb25zKCBhLCBiICk7XG4gICAgdmFyIGNfYiAgICAgPSAgIGNvbnMoIHNfYSwgYyApO1xuICAgIHZhciBjX291dCAgID0gICBhbnkoIGNfYSwgY19iICk7XG4gICAgdmFyIHNfb3V0ICAgPSAgIHN1bSggc19hLCBjICk7XG5cbiAgICByZXR1cm4gWyBzX291dCwgY19vdXQgXTtcblxufVxuXG5mdW5jdGlvbiBhZGQoIGEsIGIgKSB7XG5cbiAgICB2YXIgb3V0ID0gbmV3IEFycmF5KCBNYXRoLm1heCggYS5sZW5ndGgsIGIubGVuZ3RoICkgKTtcbiAgICB2YXIgY2FycnkgPSAwO1xuICAgIHZhciBhX2ksIGJfaTtcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgb3V0Lmxlbmd0aDsgaSsrICkge1xuXG4gICAgICAgIGFfaSA9IGkgPCBhLmxlbmd0aCA/IGFbIGkgXSA6IDA7XG4gICAgICAgIGJfaSA9IGkgPCBiLmxlbmd0aCA/IGJbIGkgXSA6IDA7XG4gICAgICAgIHZhciBmX2EgPSBmdWxsX2FkZCggYV9pLCBiX2ksIGNhcnJ5ICk7XG4gICAgICAgIG91dFsgaSBdID0gZl9hWyAwIF07XG4gICAgICAgIGNhcnJ5ID0gZl9hWyAxIF07XG5cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkO1xuIiwidmFyIEN1cmwgPSByZXF1aXJlKFwiLi4vY3VybC9jdXJsXCIpO1xudmFyIENvbnZlcnRlciA9IHJlcXVpcmUoXCIuLi9jb252ZXJ0ZXIvY29udmVydGVyXCIpO1xudmFyIEhNQUNfUk9VTkRTID0gMjc7XG5cbmZ1bmN0aW9uIGhtYWMoa2V5KSB7XG4gICAgdGhpcy5fa2V5ID0gQ29udmVydGVyLnRyaXRzKGtleSk7XG59XG5cbmhtYWMucHJvdG90eXBlLmFkZEhNQUMgPSBmdW5jdGlvbihidW5kbGUpIHtcbiAgICB2YXIgY3VybCA9IG5ldyBDdXJsKEhNQUNfUk9VTkRTKTtcbiAgICB2YXIga2V5ID0gdGhpcy5fa2V5O1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBidW5kbGUuYnVuZGxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChidW5kbGUuYnVuZGxlW2ldLnZhbHVlID4gMCkge1xuICAgICAgICAgICAgdmFyIGJ1bmRsZUhhc2hUcml0cyA9IENvbnZlcnRlci50cml0cyhidW5kbGUuYnVuZGxlW2ldLmJ1bmRsZSk7XG4gICAgICAgICAgICB2YXIgaG1hYyA9IG5ldyBJbnQ4QXJyYXkoMjQzKTtcbiAgICAgICAgICAgIGN1cmwuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgY3VybC5hYnNvcmIoa2V5KTtcbiAgICAgICAgICAgIGN1cmwuYWJzb3JiKGJ1bmRsZUhhc2hUcml0cyk7XG4gICAgICAgICAgICBjdXJsLnNxdWVlemUoaG1hYyk7XG4gICAgICAgICAgICB2YXIgaG1hY1RyeXRlcyA9IENvbnZlcnRlci50cnl0ZXMoaG1hYyk7XG4gICAgICAgICAgICBidW5kbGUuYnVuZGxlW2ldLnNpZ25hdHVyZU1lc3NhZ2VGcmFnbWVudCA9IGhtYWNUcnl0ZXMgKyBidW5kbGUuYnVuZGxlW2ldLnNpZ25hdHVyZU1lc3NhZ2VGcmFnbWVudC5zdWJzdHJpbmcoODEsIDIxODcpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhtYWM7XG4iLCJ2YXIgQ3J5cHRvSlMgPSByZXF1aXJlKFwiY3J5cHRvLWpzXCIpO1xudmFyIENvbnZlcnRlciA9IHJlcXVpcmUoXCIuLi9jb252ZXJ0ZXIvY29udmVydGVyXCIpO1xudmFyIEN1cmwgPSByZXF1aXJlKFwiLi4vY3VybC9jdXJsXCIpO1xudmFyIFdDb252ZXJ0ZXIgPSByZXF1aXJlKFwiLi4vY29udmVydGVyL3dvcmRzXCIpO1xuXG52YXIgQklUX0hBU0hfTEVOR1RIID0gMzg0O1xuXG5mdW5jdGlvbiBLZXJsKCkge1xuXG5cbiAgICB0aGlzLmsgPSBDcnlwdG9KUy5hbGdvLlNIQTMuY3JlYXRlKCk7XG4gICAgdGhpcy5rLmluaXQoe1xuICAgICAgICBvdXRwdXRMZW5ndGg6IEJJVF9IQVNIX0xFTkdUSFxuICAgIH0pO1xufVxuXG5LZXJsLkJJVF9IQVNIX0xFTkdUSCA9IEJJVF9IQVNIX0xFTkdUSDtcbktlcmwuSEFTSF9MRU5HVEggPSBDdXJsLkhBU0hfTEVOR1RIO1xuXG5LZXJsLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24oc3RhdGUpIHt9XG5cbktlcmwucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmsucmVzZXQoKTtcblxufVxuXG5LZXJsLnByb3RvdHlwZS5hYnNvcmIgPSBmdW5jdGlvbih0cml0cywgb2Zmc2V0LCBsZW5ndGgpIHtcblxuXG4gICAgaWYgKGxlbmd0aCAmJiAoKGxlbmd0aCAlIDI0MykgIT09IDApKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsIGxlbmd0aCBwcm92aWRlZCcpO1xuXG4gICAgfVxuXG4gICAgZG8ge1xuICAgICAgICB2YXIgbGltaXQgPSAobGVuZ3RoIDwgQ3VybC5IQVNIX0xFTkdUSCA/IGxlbmd0aCA6IEN1cmwuSEFTSF9MRU5HVEgpO1xuXG4gICAgICAgIHZhciB0cml0X3N0YXRlID0gdHJpdHMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBsaW1pdCk7XG4gICAgICAgIG9mZnNldCArPSBsaW1pdDtcblxuICAgICAgICAvLyBjb252ZXJ0IHRyaXQgc3RhdGUgdG8gd29yZHNcbiAgICAgICAgdmFyIHdvcmRzVG9BYnNvcmIgPSBXQ29udmVydGVyLnRyaXRzX3RvX3dvcmRzKHRyaXRfc3RhdGUpO1xuXG4gICAgICAgIC8vIGFic29yYiB0aGUgdHJpdCBzdGF0IGFzIHdvcmRhcnJheVxuICAgICAgICB0aGlzLmsudXBkYXRlKFxuICAgICAgICAgICAgQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUod29yZHNUb0Fic29yYikpO1xuXG4gICAgfSB3aGlsZSAoKGxlbmd0aCAtPSBDdXJsLkhBU0hfTEVOR1RIKSA+IDApO1xuXG59XG5cblxuXG5LZXJsLnByb3RvdHlwZS5zcXVlZXplID0gZnVuY3Rpb24odHJpdHMsIG9mZnNldCwgbGVuZ3RoKSB7XG5cbiAgICBpZiAobGVuZ3RoICYmICgobGVuZ3RoICUgMjQzKSAhPT0gMCkpIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgbGVuZ3RoIHByb3ZpZGVkJyk7XG5cbiAgICB9XG4gICAgZG8ge1xuXG4gICAgICAgIC8vIGdldCB0aGUgaGFzaCBkaWdlc3RcbiAgICAgICAgdmFyIGtDb3B5ID0gdGhpcy5rLmNsb25lKCk7XG4gICAgICAgIHZhciBmaW5hbCA9IGtDb3B5LmZpbmFsaXplKCk7XG5cbiAgICAgICAgLy8gQ29udmVydCB3b3JkcyB0byB0cml0cyBhbmQgdGhlbiBtYXAgaXQgaW50byB0aGUgaW50ZXJuYWwgc3RhdGVcbiAgICAgICAgdmFyIHRyaXRfc3RhdGUgPSBXQ29udmVydGVyLndvcmRzX3RvX3RyaXRzKGZpbmFsLndvcmRzKTtcblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBsaW1pdCA9IChsZW5ndGggPCBDdXJsLkhBU0hfTEVOR1RIID8gbGVuZ3RoIDogQ3VybC5IQVNIX0xFTkdUSCk7XG5cbiAgICAgICAgd2hpbGUgKGkgPCBsaW1pdCkge1xuICAgICAgICAgICAgdHJpdHNbb2Zmc2V0KytdID0gdHJpdF9zdGF0ZVtpKytdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXNldCgpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBmaW5hbC53b3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZmluYWwud29yZHNbaV0gPSBmaW5hbC53b3Jkc1tpXSBeIDB4RkZGRkZGRkY7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmsudXBkYXRlKGZpbmFsKTtcblxuICAgIH0gd2hpbGUgKChsZW5ndGggLT0gQ3VybC5IQVNIX0xFTkdUSCkgPiAwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBLZXJsO1xuIiwidmFyIEN1cmwgPSByZXF1aXJlKFwiLi4vY3VybC9jdXJsXCIpO1xudmFyIENvbnZlcnRlciA9IHJlcXVpcmUoXCIuLi9jb252ZXJ0ZXIvY29udmVydGVyXCIpO1xudmFyIEJ1bmRsZSA9IHJlcXVpcmUoXCIuLi9idW5kbGUvYnVuZGxlXCIpO1xudmFyIGFkZCA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL2FkZGVyXCIpO1xuXG4vKipcbiogICAgICAgICAgIFNpZ25pbmcgcmVsYXRlZCBmdW5jdGlvbnNcbipcbioqL1xudmFyIGtleSA9IGZ1bmN0aW9uKHNlZWQsIGluZGV4LCBsZW5ndGgpIHtcblxuICAgIHdoaWxlICgoc2VlZC5sZW5ndGggJSAyNDMpICE9PSAwKSB7XG4gICAgICBzZWVkLnB1c2goMCk7XG4gICAgfVxuXG4gICAgdmFyIGluZGV4VHJpdHMgPSBDb252ZXJ0ZXIuZnJvbVZhbHVlKCBpbmRleCApO1xuICAgIHZhciBzdWJzZWVkID0gYWRkKCBzZWVkLnNsaWNlKCApLCBpbmRleFRyaXRzICk7XG5cbiAgICB2YXIgY3VybCA9IG5ldyBDdXJsKCApO1xuXG4gICAgY3VybC5pbml0aWFsaXplKCApO1xuICAgIGN1cmwuYWJzb3JiKHN1YnNlZWQsIDAsIHN1YnNlZWQubGVuZ3RoKTtcbiAgICBjdXJsLnNxdWVlemUoc3Vic2VlZCwgMCwgc3Vic2VlZC5sZW5ndGgpO1xuXG4gICAgY3VybC5pbml0aWFsaXplKCApO1xuICAgIGN1cmwuYWJzb3JiKHN1YnNlZWQsIDAsIHN1YnNlZWQubGVuZ3RoKTtcblxuICAgIHZhciBrZXkgPSBbXSwgb2Zmc2V0ID0gMCwgYnVmZmVyID0gW107XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0gPiAwKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNzsgaSsrKSB7XG5cbiAgICAgICAgICAgIGN1cmwuc3F1ZWV6ZShidWZmZXIsIDAsIHN1YnNlZWQubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMjQzOyBqKyspIHtcblxuICAgICAgICAgICAgICAgIGtleVtvZmZzZXQrK10gPSBidWZmZXJbal07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbn1cblxuLyoqXG4qXG4qXG4qKi9cbnZhciBkaWdlc3RzID0gZnVuY3Rpb24oa2V5KSB7XG5cbiAgICB2YXIgZGlnZXN0cyA9IFtdLCBidWZmZXIgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTWF0aC5mbG9vcihrZXkubGVuZ3RoIC8gNjU2MSk7IGkrKykge1xuXG4gICAgICAgIHZhciBrZXlGcmFnbWVudCA9IGtleS5zbGljZShpICogNjU2MSwgKGkgKyAxKSAqIDY1NjEpO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMjc7IGorKykge1xuXG4gICAgICAgICAgICBidWZmZXIgPSBrZXlGcmFnbWVudC5zbGljZShqICogMjQzLCAoaiArIDEpICogMjQzKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCAyNjsgaysrKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIga0N1cmwgPSBuZXcgQ3VybCgpO1xuICAgICAgICAgICAgICAgIGtDdXJsLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICAgICBrQ3VybC5hYnNvcmIoYnVmZmVyLCAwLCBidWZmZXIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBrQ3VybC5zcXVlZXplKGJ1ZmZlciwgMCwgQ3VybC5IQVNIX0xFTkdUSCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgMjQzOyBrKyspIHtcblxuICAgICAgICAgICAgICAgIGtleUZyYWdtZW50W2ogKiAyNDMgKyBrXSA9IGJ1ZmZlcltrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjdXJsID0gbmV3IEN1cmwoKVxuXG4gICAgICAgIGN1cmwuaW5pdGlhbGl6ZSgpO1xuICAgICAgICBjdXJsLmFic29yYihrZXlGcmFnbWVudCwgMCwga2V5RnJhZ21lbnQubGVuZ3RoKTtcbiAgICAgICAgY3VybC5zcXVlZXplKGJ1ZmZlciwgMCwgQ3VybC5IQVNIX0xFTkdUSCk7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAyNDM7IGorKykge1xuXG4gICAgICAgICAgICBkaWdlc3RzW2kgKiAyNDMgKyBqXSA9IGJ1ZmZlcltqXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGlnZXN0cztcbn1cblxuLyoqXG4qXG4qXG4qKi9cbnZhciBhZGRyZXNzID0gZnVuY3Rpb24oZGlnZXN0cykge1xuXG4gICAgdmFyIGFkZHJlc3NUcml0cyA9IFtdO1xuXG4gICAgdmFyIGN1cmwgPSBuZXcgQ3VybCgpO1xuXG4gICAgY3VybC5pbml0aWFsaXplKCk7XG4gICAgY3VybC5hYnNvcmIoZGlnZXN0cywgMCwgZGlnZXN0cy5sZW5ndGgpO1xuICAgIGN1cmwuc3F1ZWV6ZShhZGRyZXNzVHJpdHMsIDAsIEN1cmwuSEFTSF9MRU5HVEgpO1xuXG4gICAgcmV0dXJuIGFkZHJlc3NUcml0cztcbn1cblxuLyoqXG4qXG4qXG4qKi9cbnZhciBkaWdlc3QgPSBmdW5jdGlvbihub3JtYWxpemVkQnVuZGxlRnJhZ21lbnQsIHNpZ25hdHVyZUZyYWdtZW50KSB7XG5cbiAgICB2YXIgYnVmZmVyID0gW11cblxuICAgIHZhciBjdXJsID0gbmV3IEN1cmwoKTtcblxuICAgIGN1cmwuaW5pdGlhbGl6ZSgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGk8IDI3OyBpKyspIHtcbiAgICAgICAgYnVmZmVyID0gc2lnbmF0dXJlRnJhZ21lbnQuc2xpY2UoaSAqIDI0MywgKGkgKyAxKSAqIDI0Myk7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IG5vcm1hbGl6ZWRCdW5kbGVGcmFnbWVudFtpXSArIDEzOyBqLS0gPiAwOyApIHtcblxuICAgICAgICAgICAgdmFyIGpDdXJsID0gbmV3IEN1cmwoKTtcblxuICAgICAgICAgICAgakN1cmwuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgakN1cmwuYWJzb3JiKGJ1ZmZlciwgMCwgYnVmZmVyLmxlbmd0aCk7XG4gICAgICAgICAgICBqQ3VybC5zcXVlZXplKGJ1ZmZlciwgMCwgQ3VybC5IQVNIX0xFTkdUSCk7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJsLmFic29yYihidWZmZXIsIDAsIGJ1ZmZlci5sZW5ndGgpO1xuICAgIH1cblxuICAgIGN1cmwuc3F1ZWV6ZShidWZmZXIsIDAsIEN1cmwuSEFTSF9MRU5HVEgpO1xuICAgIHJldHVybiBidWZmZXI7XG59XG5cbi8qKlxuKlxuKlxuKiovXG52YXIgc2lnbmF0dXJlRnJhZ21lbnQgPSBmdW5jdGlvbihub3JtYWxpemVkQnVuZGxlRnJhZ21lbnQsIGtleUZyYWdtZW50KSB7XG5cbiAgICB2YXIgc2lnbmF0dXJlRnJhZ21lbnQgPSBrZXlGcmFnbWVudC5zbGljZSgpLCBoYXNoID0gW107XG5cbiAgICB2YXIgY3VybCA9IG5ldyBDdXJsKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI3OyBpKyspIHtcblxuICAgICAgICBoYXNoID0gc2lnbmF0dXJlRnJhZ21lbnQuc2xpY2UoaSAqIDI0MywgKGkgKyAxKSAqIDI0Myk7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAxMyAtIG5vcm1hbGl6ZWRCdW5kbGVGcmFnbWVudFtpXTsgaisrKSB7XG5cbiAgICAgICAgICAgIGN1cmwuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgY3VybC5hYnNvcmIoaGFzaCwgMCwgaGFzaC5sZW5ndGgpO1xuICAgICAgICAgICAgY3VybC5zcXVlZXplKGhhc2gsIDAsIEN1cmwuSEFTSF9MRU5HVEgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAyNDM7IGorKykge1xuXG4gICAgICAgICAgICBzaWduYXR1cmVGcmFnbWVudFtpICogMjQzICsgal0gPSBoYXNoW2pdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNpZ25hdHVyZUZyYWdtZW50O1xufVxuXG4vKipcbipcbipcbioqL1xudmFyIHZhbGlkYXRlU2lnbmF0dXJlcyA9IGZ1bmN0aW9uKGV4cGVjdGVkQWRkcmVzcywgc2lnbmF0dXJlRnJhZ21lbnRzLCBidW5kbGVIYXNoKSB7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1bmRsZSA9IG5ldyBCdW5kbGUoKTtcblxuICAgIHZhciBub3JtYWxpemVkQnVuZGxlRnJhZ21lbnRzID0gW107XG4gICAgdmFyIG5vcm1hbGl6ZWRCdW5kbGVIYXNoID0gYnVuZGxlLm5vcm1hbGl6ZWRCdW5kbGUoYnVuZGxlSGFzaCk7XG5cbiAgICAvLyBTcGxpdCBoYXNoIGludG8gMyBmcmFnbWVudHNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBub3JtYWxpemVkQnVuZGxlRnJhZ21lbnRzW2ldID0gbm9ybWFsaXplZEJ1bmRsZUhhc2guc2xpY2UoaSAqIDI3LCAoaSArIDEpICogMjcpO1xuICAgIH1cblxuICAgIC8vIEdldCBkaWdlc3RzXG4gICAgdmFyIGRpZ2VzdHMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnbmF0dXJlRnJhZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIGRpZ2VzdEJ1ZmZlciA9IGRpZ2VzdChub3JtYWxpemVkQnVuZGxlRnJhZ21lbnRzW2kgJSAzXSwgQ29udmVydGVyLnRyaXRzKHNpZ25hdHVyZUZyYWdtZW50c1tpXSkpO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMjQzOyBqKyspIHtcblxuICAgICAgICAgICAgZGlnZXN0c1tpICogMjQzICsgal0gPSBkaWdlc3RCdWZmZXJbal1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhZGRyZXNzID0gQ29udmVydGVyLnRyeXRlcyhzZWxmLmFkZHJlc3MoZGlnZXN0cykpO1xuXG4gICAgcmV0dXJuIChleHBlY3RlZEFkZHJlc3MgPT09IGFkZHJlc3MpO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGtleSAgICAgICAgICAgICAgICAgOiBrZXksXG4gICAgZGlnZXN0cyAgICAgICAgICAgICA6IGRpZ2VzdHMsXG4gICAgYWRkcmVzcyAgICAgICAgICAgICA6IGFkZHJlc3MsXG4gICAgZGlnZXN0ICAgICAgICAgICAgICA6IGRpZ2VzdCxcbiAgICBzaWduYXR1cmVGcmFnbWVudCAgIDogc2lnbmF0dXJlRnJhZ21lbnQsXG4gICAgdmFsaWRhdGVTaWduYXR1cmVzICA6IHZhbGlkYXRlU2lnbmF0dXJlc1xufVxuIiwidmFyIEN1cmwgPSByZXF1aXJlKFwiLi4vY3VybC9jdXJsXCIpO1xudmFyIEtlcmwgPSByZXF1aXJlKFwiLi4va2VybC9rZXJsXCIpO1xudmFyIENvbnZlcnRlciA9IHJlcXVpcmUoXCIuLi9jb252ZXJ0ZXIvY29udmVydGVyXCIpO1xudmFyIEJ1bmRsZSA9IHJlcXVpcmUoXCIuLi9idW5kbGUvYnVuZGxlXCIpO1xudmFyIGFkZCA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL2FkZGVyXCIpO1xudmFyIG9sZFNpZ25pbmcgPSByZXF1aXJlKFwiLi9vbGRTaWduaW5nXCIpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoXCIuLi8uLi9lcnJvcnMvaW5wdXRFcnJvcnNcIik7XG5cbi8qKlxuKiAgICAgICAgICAgU2lnbmluZyByZWxhdGVkIGZ1bmN0aW9uc1xuKlxuKiovXG52YXIga2V5ID0gZnVuY3Rpb24oc2VlZCwgaW5kZXgsIGxlbmd0aCkge1xuXG4gICAgd2hpbGUgKChzZWVkLmxlbmd0aCAlIDI0MykgIT09IDApIHtcbiAgICAgIHNlZWQucHVzaCgwKTtcbiAgICB9XG5cbiAgICB2YXIgaW5kZXhUcml0cyA9IENvbnZlcnRlci5mcm9tVmFsdWUoIGluZGV4ICk7XG4gICAgdmFyIHN1YnNlZWQgPSBhZGQoIHNlZWQuc2xpY2UoICksIGluZGV4VHJpdHMgKTtcblxuICAgIHZhciBrZXJsID0gbmV3IEtlcmwoICk7XG5cbiAgICBrZXJsLmluaXRpYWxpemUoICk7XG4gICAga2VybC5hYnNvcmIoc3Vic2VlZCwgMCwgc3Vic2VlZC5sZW5ndGgpO1xuICAgIGtlcmwuc3F1ZWV6ZShzdWJzZWVkLCAwLCBzdWJzZWVkLmxlbmd0aCk7XG5cbiAgICBrZXJsLnJlc2V0KCApO1xuICAgIGtlcmwuYWJzb3JiKHN1YnNlZWQsIDAsIHN1YnNlZWQubGVuZ3RoKTtcblxuICAgIHZhciBrZXkgPSBbXSwgb2Zmc2V0ID0gMCwgYnVmZmVyID0gW107XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0gPiAwKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNzsgaSsrKSB7XG5cbiAgICAgICAgICAgIGtlcmwuc3F1ZWV6ZShidWZmZXIsIDAsIHN1YnNlZWQubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMjQzOyBqKyspIHtcblxuICAgICAgICAgICAgICAgIGtleVtvZmZzZXQrK10gPSBidWZmZXJbal07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbn1cblxuLyoqXG4qXG4qXG4qKi9cbnZhciBkaWdlc3RzID0gZnVuY3Rpb24oa2V5KSB7XG5cbiAgICB2YXIgZGlnZXN0cyA9IFtdLCBidWZmZXIgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTWF0aC5mbG9vcihrZXkubGVuZ3RoIC8gNjU2MSk7IGkrKykge1xuXG4gICAgICAgIHZhciBrZXlGcmFnbWVudCA9IGtleS5zbGljZShpICogNjU2MSwgKGkgKyAxKSAqIDY1NjEpO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMjc7IGorKykge1xuXG4gICAgICAgICAgICBidWZmZXIgPSBrZXlGcmFnbWVudC5zbGljZShqICogMjQzLCAoaiArIDEpICogMjQzKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCAyNjsgaysrKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIga0tlcmwgPSBuZXcgS2VybCgpO1xuICAgICAgICAgICAgICAgIGtLZXJsLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICAgICBrS2VybC5hYnNvcmIoYnVmZmVyLCAwLCBidWZmZXIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBrS2VybC5zcXVlZXplKGJ1ZmZlciwgMCwgQ3VybC5IQVNIX0xFTkdUSCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgMjQzOyBrKyspIHtcblxuICAgICAgICAgICAgICAgIGtleUZyYWdtZW50W2ogKiAyNDMgKyBrXSA9IGJ1ZmZlcltrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBrZXJsID0gbmV3IEtlcmwoKVxuXG4gICAgICAgIGtlcmwuaW5pdGlhbGl6ZSgpO1xuICAgICAgICBrZXJsLmFic29yYihrZXlGcmFnbWVudCwgMCwga2V5RnJhZ21lbnQubGVuZ3RoKTtcbiAgICAgICAga2VybC5zcXVlZXplKGJ1ZmZlciwgMCwgQ3VybC5IQVNIX0xFTkdUSCk7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAyNDM7IGorKykge1xuXG4gICAgICAgICAgICBkaWdlc3RzW2kgKiAyNDMgKyBqXSA9IGJ1ZmZlcltqXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGlnZXN0cztcbn1cblxuLyoqXG4qXG4qXG4qKi9cbnZhciBhZGRyZXNzID0gZnVuY3Rpb24oZGlnZXN0cykge1xuXG4gICAgdmFyIGFkZHJlc3NUcml0cyA9IFtdO1xuXG4gICAgdmFyIGtlcmwgPSBuZXcgS2VybCgpO1xuXG4gICAga2VybC5pbml0aWFsaXplKCk7XG4gICAga2VybC5hYnNvcmIoZGlnZXN0cywgMCwgZGlnZXN0cy5sZW5ndGgpO1xuICAgIGtlcmwuc3F1ZWV6ZShhZGRyZXNzVHJpdHMsIDAsIEN1cmwuSEFTSF9MRU5HVEgpO1xuXG4gICAgcmV0dXJuIGFkZHJlc3NUcml0cztcbn1cblxuLyoqXG4qXG4qXG4qKi9cbnZhciBkaWdlc3QgPSBmdW5jdGlvbihub3JtYWxpemVkQnVuZGxlRnJhZ21lbnQsIHNpZ25hdHVyZUZyYWdtZW50KSB7XG5cbiAgICB2YXIgYnVmZmVyID0gW11cblxuICAgIHZhciBrZXJsID0gbmV3IEtlcmwoKTtcblxuICAgIGtlcmwuaW5pdGlhbGl6ZSgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGk8IDI3OyBpKyspIHtcbiAgICAgICAgYnVmZmVyID0gc2lnbmF0dXJlRnJhZ21lbnQuc2xpY2UoaSAqIDI0MywgKGkgKyAxKSAqIDI0Myk7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IG5vcm1hbGl6ZWRCdW5kbGVGcmFnbWVudFtpXSArIDEzOyBqLS0gPiAwOyApIHtcblxuICAgICAgICAgICAgdmFyIGpLZXJsID0gbmV3IEtlcmwoKTtcblxuICAgICAgICAgICAgaktlcmwuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgaktlcmwuYWJzb3JiKGJ1ZmZlciwgMCwgYnVmZmVyLmxlbmd0aCk7XG4gICAgICAgICAgICBqS2VybC5zcXVlZXplKGJ1ZmZlciwgMCwgQ3VybC5IQVNIX0xFTkdUSCk7XG4gICAgICAgIH1cblxuICAgICAgICBrZXJsLmFic29yYihidWZmZXIsIDAsIGJ1ZmZlci5sZW5ndGgpO1xuICAgIH1cblxuICAgIGtlcmwuc3F1ZWV6ZShidWZmZXIsIDAsIEN1cmwuSEFTSF9MRU5HVEgpO1xuICAgIHJldHVybiBidWZmZXI7XG59XG5cbi8qKlxuKlxuKlxuKiovXG52YXIgc2lnbmF0dXJlRnJhZ21lbnQgPSBmdW5jdGlvbihub3JtYWxpemVkQnVuZGxlRnJhZ21lbnQsIGtleUZyYWdtZW50KSB7XG5cbiAgICB2YXIgc2lnbmF0dXJlRnJhZ21lbnQgPSBrZXlGcmFnbWVudC5zbGljZSgpLCBoYXNoID0gW107XG5cbiAgICB2YXIga2VybCA9IG5ldyBLZXJsKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI3OyBpKyspIHtcblxuICAgICAgICBoYXNoID0gc2lnbmF0dXJlRnJhZ21lbnQuc2xpY2UoaSAqIDI0MywgKGkgKyAxKSAqIDI0Myk7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAxMyAtIG5vcm1hbGl6ZWRCdW5kbGVGcmFnbWVudFtpXTsgaisrKSB7XG5cbiAgICAgICAgICAgIGtlcmwuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAga2VybC5yZXNldCgpO1xuICAgICAgICAgICAga2VybC5hYnNvcmIoaGFzaCwgMCwgaGFzaC5sZW5ndGgpO1xuICAgICAgICAgICAga2VybC5zcXVlZXplKGhhc2gsIDAsIEN1cmwuSEFTSF9MRU5HVEgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAyNDM7IGorKykge1xuXG4gICAgICAgICAgICBzaWduYXR1cmVGcmFnbWVudFtpICogMjQzICsgal0gPSBoYXNoW2pdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNpZ25hdHVyZUZyYWdtZW50O1xufVxuXG4vKipcbipcbipcbioqL1xudmFyIHZhbGlkYXRlU2lnbmF0dXJlcyA9IGZ1bmN0aW9uKGV4cGVjdGVkQWRkcmVzcywgc2lnbmF0dXJlRnJhZ21lbnRzLCBidW5kbGVIYXNoKSB7XG4gICAgaWYgKCFidW5kbGVIYXNoKSB7XG4gICAgICAgIHRocm93IGVycm9ycy5pbnZhbGlkQnVuZGxlSGFzaCgpO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgYnVuZGxlID0gbmV3IEJ1bmRsZSgpO1xuXG4gICAgdmFyIG5vcm1hbGl6ZWRCdW5kbGVGcmFnbWVudHMgPSBbXTtcbiAgICB2YXIgbm9ybWFsaXplZEJ1bmRsZUhhc2ggPSBidW5kbGUubm9ybWFsaXplZEJ1bmRsZShidW5kbGVIYXNoKTtcblxuICAgIC8vIFNwbGl0IGhhc2ggaW50byAzIGZyYWdtZW50c1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIG5vcm1hbGl6ZWRCdW5kbGVGcmFnbWVudHNbaV0gPSBub3JtYWxpemVkQnVuZGxlSGFzaC5zbGljZShpICogMjcsIChpICsgMSkgKiAyNyk7XG4gICAgfVxuXG4gICAgLy8gR2V0IGRpZ2VzdHNcbiAgICB2YXIgZGlnZXN0cyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWduYXR1cmVGcmFnbWVudHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgZGlnZXN0QnVmZmVyID0gZGlnZXN0KG5vcm1hbGl6ZWRCdW5kbGVGcmFnbWVudHNbaSAlIDNdLCBDb252ZXJ0ZXIudHJpdHMoc2lnbmF0dXJlRnJhZ21lbnRzW2ldKSk7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAyNDM7IGorKykge1xuXG4gICAgICAgICAgICBkaWdlc3RzW2kgKiAyNDMgKyBqXSA9IGRpZ2VzdEJ1ZmZlcltqXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFkZHJlc3MgPSBDb252ZXJ0ZXIudHJ5dGVzKHNlbGYuYWRkcmVzcyhkaWdlc3RzKSk7XG5cbiAgICByZXR1cm4gKGV4cGVjdGVkQWRkcmVzcyA9PT0gYWRkcmVzcyk7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAga2V5ICAgICAgICAgICAgICAgICA6IGtleSxcbiAgICBkaWdlc3RzICAgICAgICAgICAgIDogZGlnZXN0cyxcbiAgICBhZGRyZXNzICAgICAgICAgICAgIDogYWRkcmVzcyxcbiAgICBkaWdlc3QgICAgICAgICAgICAgIDogZGlnZXN0LFxuICAgIHNpZ25hdHVyZUZyYWdtZW50ICAgOiBzaWduYXR1cmVGcmFnbWVudCxcbiAgICB2YWxpZGF0ZVNpZ25hdHVyZXMgIDogdmFsaWRhdGVTaWduYXR1cmVzXG59XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgaW52YWxpZFRyeXRlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJJbnZhbGlkIFRyeXRlcyBwcm92aWRlZFwiKTtcbiAgICB9LFxuICAgIGludmFsaWRTZWVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIkludmFsaWQgU2VlZCBwcm92aWRlZFwiKTtcbiAgICB9LFxuICAgIGludmFsaWRJbmRleDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJJbnZhbGlkIEluZGV4IG9wdGlvbiBwcm92aWRlZFwiKTtcbiAgICB9LCBcbiAgICBpbnZhbGlkU2VjdXJpdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiSW52YWxpZCBTZWN1cml0eSBvcHRpb24gcHJvdmlkZWRcIik7XG4gICAgfSxcbiAgICBpbnZhbGlkQ2hlY2tzdW06IGZ1bmN0aW9uKGFkZHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIkludmFsaWQgQ2hlY2tzdW0gc3VwcGxpZWQgZm9yIGFkZHJlc3M6IFwiICsgYWRkcmVzcylcbiAgICB9LFxuICAgIGludmFsaWRBdHRhY2hlZFRyeXRlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJJbnZhbGlkIGF0dGFjaGVkIFRyeXRlcyBwcm92aWRlZFwiKTtcbiAgICB9LFxuICAgIGludmFsaWRUcmFuc2ZlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiSW52YWxpZCB0cmFuc2ZlcnMgb2JqZWN0XCIpO1xuICAgIH0sXG4gICAgaW52YWxpZEtleTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJZb3UgaGF2ZSBwcm92aWRlZCBhbiBpbnZhbGlkIGtleSB2YWx1ZVwiKTtcbiAgICB9LFxuICAgIGludmFsaWRUcnVua09yQnJhbmNoOiBmdW5jdGlvbihoYXNoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJZb3UgaGF2ZSBwcm92aWRlZCBhbiBpbnZhbGlkIGhhc2ggYXMgYSB0cnVuay9icmFuY2g6IFwiICsgaGFzaCk7XG4gICAgfSxcbiAgICBpbnZhbGlkVXJpOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIllvdSBoYXZlIHByb3ZpZGVkIGFuIGludmFsaWQgVVJJIGZvciB5b3VyIE5laWdoYm9yOiBcIiArIHVyaSlcbiAgICB9LFxuICAgIG5vdEludDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJPbmUgb2YgeW91ciBpbnB1dHMgaXMgbm90IGFuIGludGVnZXJcIik7XG4gICAgfSxcbiAgICBpbnZhbGlkSW5wdXRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIkludmFsaWQgaW5wdXRzIHByb3ZpZGVkXCIpO1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBjdXJsOiByZXF1aXJlKCcuL2NyeXB0by9jdXJsL2N1cmwnKSxcbiAga2VybDogcmVxdWlyZSgnLi9jcnlwdG8va2VybC9rZXJsJyksXG4gIGJ1bmRsZTogcmVxdWlyZSgnLi9jcnlwdG8vYnVuZGxlL2J1bmRsZScpLFxuICBjb252ZXJ0ZXI6IHJlcXVpcmUoJy4vY3J5cHRvL2NvbnZlcnRlci9jb252ZXJ0ZXInKSxcbiAgc2lnbmluZzogcmVxdWlyZSgnLi9jcnlwdG8vc2lnbmluZy9zaWduaW5nJyksXG4gIG9sZFNpZ25pbmc6IHJlcXVpcmUoJy4vY3J5cHRvL3NpZ25pbmcvb2xkU2lnbmluZycpLFxuICBobWFjOiByZXF1aXJlKCcuL2NyeXB0by9obWFjL2htYWMnKSxcbiAgbXVsdGlzaWc6IHJlcXVpcmUoJy4vbXVsdGlzaWcvbXVsdGlzaWcnKSxcbiAgdXRpbHM6IHJlcXVpcmUoXCIuL3V0aWxzL3V0aWxzXCIpLFxuICB2YWxpZDogcmVxdWlyZShcIi4vZXJyb3JzL2lucHV0RXJyb3JzXCIpLFxuICBhZGQ6IHJlcXVpcmUoXCIuL2NyeXB0by9oZWxwZXJzL2FkZGVyXCIpXG59XG4iLCJ2YXIgQ29udmVydGVyICAgICAgPSAgcmVxdWlyZSgnLi4vY3J5cHRvL2NvbnZlcnRlci9jb252ZXJ0ZXInKTtcbnZhciBDdXJsICAgICAgICAgICA9ICByZXF1aXJlKCcuLi9jcnlwdG8vY3VybC9jdXJsJyk7XG52YXIgS2VybCAgICAgICAgICAgPSAgcmVxdWlyZSgnLi4vY3J5cHRvL2tlcmwva2VybCcpO1xudmFyIFNpZ25pbmcgICAgICAgID0gIHJlcXVpcmUoJy4uL2NyeXB0by9zaWduaW5nL3NpZ25pbmcnKTtcbnZhciBVdGlscyAgICAgICAgICA9ICByZXF1aXJlKCcuLi91dGlscy91dGlscycpO1xudmFyIGlucHV0VmFsaWRhdG9yID0gIHJlcXVpcmUoJy4uL3V0aWxzL2lucHV0VmFsaWRhdG9yJyk7XG5cblxuLyoqXG4qICAgSW5pdGlhbGl6ZXMgYSBuZXcgbXVsdGlzaWcgYWRkcmVzc1xuKlxuKiAgIEBtZXRob2QgYWRkRGlnZXN0XG4qICAgQHBhcmFtIHtzdHJpbmd8YXJyYXl9IGRpZ2VzdCBkaWdlc3QgdHJ5dGVzXG4qICAgQHJldHVybiB7b2JqZWN0fSBhZGRyZXNzIGluc3RhbmNlXG4qXG4qKi9cbmZ1bmN0aW9uIEFkZHJlc3MoZGlnZXN0cykge1xuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBBZGRyZXNzKSkge1xuICAgIHJldHVybiBuZXcgQWRkcmVzcyhkaWdlc3RzKTtcbiAgfVxuXG4gIC8vIEluaXRpYWxpemUga2VybCBpbnN0YW5jZVxuICB0aGlzLl9rZXJsID0gbmV3IEtlcmwoKTtcbiAgdGhpcy5fa2VybC5pbml0aWFsaXplKCk7XG5cblxuICAvLyBBZGQgZGlnZXN0cyBpZiBhbnlcbiAgaWYgKGRpZ2VzdHMpIHtcblxuICAgIHRoaXMuYWJzb3JiKGRpZ2VzdHMpO1xuICB9XG59XG5cbi8qKlxuKiAgIEFic29yYnMga2V5IGRpZ2VzdHNcbipcbiogICBAbWV0aG9kIGFic29yYlxuKiAgIEBwYXJhbSB7c3RyaW5nfGFycmF5fSBkaWdlc3QgZGlnZXN0IHRyeXRlc1xuKiAgIEByZXR1cm4ge29iamVjdH0gYWRkcmVzcyBpbnN0YW5jZVxuKlxuKiovXG5BZGRyZXNzLnByb3RvdHlwZS5hYnNvcmIgPSBmdW5jdGlvbiAoZGlnZXN0KSB7XG5cbiAgLy8gQ29uc3RydWN0IGFycmF5XG4gIHZhciBkaWdlc3RzID0gQXJyYXkuaXNBcnJheShkaWdlc3QpID8gZGlnZXN0IDogW2RpZ2VzdF07XG5cbiAgLy8gQWRkIGRpZ2VzdHNcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaWdlc3RzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAvLyBHZXQgdHJpdHMgb2YgZGlnZXN0XG4gICAgdmFyIGRpZ2VzdFRyaXRzID0gQ29udmVydGVyLnRyaXRzKGRpZ2VzdHNbaV0pO1xuXG4gICAgLy8gQWJzb3JiIGRpZ2VzdFxuICAgIHRoaXMuX2tlcmwuYWJzb3JiKGRpZ2VzdFRyaXRzLCAwLCBkaWdlc3RUcml0cy5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuKiAgIEZpbmFsaXplcyBhbmQgcmV0dXJucyB0aGUgbXVsdGlzaWcgYWRkcmVzcyBpbiB0cnl0ZXNcbipcbiogICBAbWV0aG9kIGZpbmFsaXplXG4qICAgQHBhcmFtIHtzdHJpbmd9IGRpZ2VzdCBkaWdlc3QgdHJ5dGVzLCBvcHRpb25hbFxuKiAgIEByZXR1cm4ge3N0cmluZ30gYWRkcmVzcyB0cnl0ZXNcbipcbioqL1xuQWRkcmVzcy5wcm90b3R5cGUuZmluYWxpemUgPSBmdW5jdGlvbiAoZGlnZXN0KSB7XG5cbiAgICAvLyBBYnNvcmIgbGFzdCBkaWdlc3QgaWYgcHJvdmlkZWRcbiAgICBpZiAoZGlnZXN0KSB7XG4gICAgICB0aGlzLmFic29yYihkaWdlc3QpO1xuICAgIH1cblxuICAgIC8vIFNxdWVlemUgdGhlIGFkZHJlc3MgdHJpdHNcbiAgICB2YXIgYWRkcmVzc1RyaXRzID0gW107XG4gICAgdGhpcy5fa2VybC5zcXVlZXplKGFkZHJlc3NUcml0cywgMCwgQ3VybC5IQVNIX0xFTkdUSCk7XG5cbiAgICAvLyBDb252ZXJ0IHRyaXRzIGludG8gdHJ5dGVzIGFuZCByZXR1cm4gdGhlIGFkZHJlc3NcbiAgICByZXR1cm4gQ29udmVydGVyLnRyeXRlcyhhZGRyZXNzVHJpdHMpO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQWRkcmVzcztcbiIsInZhciBTaWduaW5nICAgICAgICAgPSAgcmVxdWlyZSgnLi4vY3J5cHRvL3NpZ25pbmcvc2lnbmluZycpO1xudmFyIENvbnZlcnRlciAgICAgICA9ICByZXF1aXJlKCcuLi9jcnlwdG8vY29udmVydGVyL2NvbnZlcnRlcicpO1xudmFyIEtlcmwgICAgICAgICAgICA9ICByZXF1aXJlKCcuLi9jcnlwdG8va2VybC9rZXJsJyk7XG52YXIgQ3VybCAgICAgICAgICAgID0gIHJlcXVpcmUoJy4uL2NyeXB0by9jdXJsL2N1cmwnKTtcbnZhciBCdW5kbGUgICAgICAgICAgPSAgcmVxdWlyZSgnLi4vY3J5cHRvL2J1bmRsZS9idW5kbGUnKTtcbnZhciBVdGlscyAgICAgICAgICAgPSAgcmVxdWlyZSgnLi4vdXRpbHMvdXRpbHMnKTtcbnZhciBpbnB1dFZhbGlkYXRvciAgPSAgcmVxdWlyZSgnLi4vdXRpbHMvaW5wdXRWYWxpZGF0b3InKTtcbnZhciBlcnJvcnMgICAgICAgICAgPSAgcmVxdWlyZSgnLi4vZXJyb3JzL2lucHV0RXJyb3JzJyk7XG52YXIgQWRkcmVzcyAgICAgICAgID0gIHJlcXVpcmUoJy4vYWRkcmVzcycpO1xuXG5mdW5jdGlvbiBNdWx0aXNpZyhwcm92aWRlcikge1xuXG4gICAgdGhpcy5fbWFrZVJlcXVlc3QgPSBwcm92aWRlcjtcbn1cblxuXG4vKipcbiogICBHZXRzIHRoZSBrZXkgdmFsdWUgb2YgYSBzZWVkXG4qXG4qICAgQG1ldGhvZCBnZXRLZXlcbiogICBAcGFyYW0ge3N0cmluZ30gc2VlZFxuKiAgIEBwYXJhbSB7aW50fSBpbmRleFxuKiAgIEBwYXJhbSB7aW50fSBzZWN1cml0eSBTZWN1cml0eSBsZXZlbCB0byBiZSB1c2VkIGZvciB0aGUgcHJpdmF0ZSBrZXkgLyBhZGRyZXNzLiBDYW4gYmUgMSwgMiBvciAzXG4qICAgQHJldHVybnMge3N0cmluZ30gZGlnZXN0IHRyeXRlc1xuKiovXG5NdWx0aXNpZy5nZXRLZXkgPSBmdW5jdGlvbihzZWVkLCBpbmRleCwgc2VjdXJpdHkpIHtcblxuICAgIHJldHVybiBDb252ZXJ0ZXIudHJ5dGVzKFNpZ25pbmcua2V5KENvbnZlcnRlci50cml0cyhzZWVkKSwgaW5kZXgsIHNlY3VyaXR5KSk7XG59XG5cbi8qKlxuKiAgIEdldHMgdGhlIGRpZ2VzdCB2YWx1ZSBvZiBhIHNlZWRcbipcbiogICBAbWV0aG9kIGdldERpZ2VzdFxuKiAgIEBwYXJhbSB7c3RyaW5nfSBzZWVkXG4qICAgQHBhcmFtIHtpbnR9IGluZGV4XG4qICAgQHBhcmFtIHtpbnR9IHNlY3VyaXR5IFNlY3VyaXR5IGxldmVsIHRvIGJlIHVzZWQgZm9yIHRoZSBwcml2YXRlIGtleSAvIGFkZHJlc3MuIENhbiBiZSAxLCAyIG9yIDNcbiogICBAcmV0dXJucyB7c3RyaW5nfSBkaWdlc3QgdHJ5dGVzXG4qKi9cbk11bHRpc2lnLmdldERpZ2VzdCA9IGZ1bmN0aW9uKHNlZWQsIGluZGV4LCBzZWN1cml0eSkge1xuXG4gICAgdmFyIGtleSA9IFNpZ25pbmcua2V5KENvbnZlcnRlci50cml0cyhzZWVkKSwgaW5kZXgsIHNlY3VyaXR5KTtcbiAgICByZXR1cm4gQ29udmVydGVyLnRyeXRlcyhTaWduaW5nLmRpZ2VzdHMoa2V5KSk7XG59XG5cbi8qKlxuKiAgIE11bHRpc2lnIGFkZHJlc3MgY29uc3RydWN0b3JcbiovXG5NdWx0aXNpZy5hZGRyZXNzID0gQWRkcmVzcztcblxuLyoqXG4qICAgVmFsaWRhdGVzICBhIGdlbmVyYXRlZCBtdWx0aXNpZyBhZGRyZXNzXG4qXG4qICAgQG1ldGhvZCB2YWxpZGF0ZUFkZHJlc3NcbiogICBAcGFyYW0ge3N0cmluZ30gbXVsdGlzaWdBZGRyZXNzXG4qICAgQHBhcmFtIHthcnJheX0gZGlnZXN0c1xuKiAgIEByZXR1cm5zIHtib29sfVxuKiovXG5NdWx0aXNpZy52YWxpZGF0ZUFkZHJlc3MgPSBmdW5jdGlvbihtdWx0aXNpZ0FkZHJlc3MsIGRpZ2VzdHMpIHtcblxuICAgIHZhciBrZXJsID0gbmV3IEtlcmwoKTtcblxuICAgIC8vIGluaXRpYWxpemUgS2VybCB3aXRoIHRoZSBwcm92aWRlZCBzdGF0ZVxuICAgIGtlcmwuaW5pdGlhbGl6ZSgpO1xuXG4gICAgLy8gQWJzb3JiIGFsbCBrZXkgZGlnZXN0c1xuICAgIGRpZ2VzdHMuZm9yRWFjaChmdW5jdGlvbihrZXlEaWdlc3QpIHtcbiAgICAgICAgdmFyIHRyaXRzID0gQ29udmVydGVyLnRyaXRzKGtleURpZ2VzdCk7XG4gICAgICAgIGtlcmwuYWJzb3JiKENvbnZlcnRlci50cml0cyhrZXlEaWdlc3QpLCAwLCB0cml0cy5sZW5ndGgpO1xuICAgIH0pXG5cbiAgICAvLyBTcXVlZXplIGFkZHJlc3MgdHJpdHNcbiAgICB2YXIgYWRkcmVzc1RyaXRzID0gW107XG4gICAga2VybC5zcXVlZXplKGFkZHJlc3NUcml0cywgMCwgQ3VybC5IQVNIX0xFTkdUSCk7XG5cbiAgICAvLyBDb252ZXJ0IHRyaXRzIGludG8gdHJ5dGVzIGFuZCByZXR1cm4gdGhlIGFkZHJlc3NcbiAgICByZXR1cm4gQ29udmVydGVyLnRyeXRlcyhhZGRyZXNzVHJpdHMpID09PSBtdWx0aXNpZ0FkZHJlc3M7XG59XG5cblxuLyoqXG4qICAgUHJlcGFyZXMgdHJhbnNmZXIgYnkgZ2VuZXJhdGluZyB0aGUgYnVuZGxlIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgY29zaWduZXIgdHJhbnNhY3Rpb25zXG4qICAgRG9lcyBub3QgY29udGFpbiBzaWduYXR1cmVzXG4qXG4qICAgQG1ldGhvZCBpbml0aWF0ZVRyYW5zZmVyXG4qICAgQHBhcmFtIHtvYmplY3R9IGlucHV0IHRoZSBpbnB1dCBhZGRyZXNzZXMgYXMgd2VsbCBhcyB0aGUgc2VjdXJpdHlTdW0sIGFuZCBiYWxhbmNlXG4qICAgICAgICAgICAgICAgICAgIHdoZXJlIGBhZGRyZXNzYCBpcyB0aGUgaW5wdXQgbXVsdGlzaWcgYWRkcmVzc1xuKiAgICAgICAgICAgICAgICAgICBhbmQgYHNlY3VyaXR5U3VtYCBpcyB0aGUgc3VtIG9mIHNlY3VyaXR5IGxldmVscyB1c2VkIGJ5IGFsbCBjby1zaWduZXJzXG4qICAgICAgICAgICAgICAgICAgIGFuZCBgYmFsYW5jZWAgaXMgdGhlIGV4cGVjdGVkIGJhbGFuY2UsIGlmIHlvdSB3aXNoIHRvIG92ZXJyaWRlIGdldEJhbGFuY2VzXG4qICAgQHBhcmFtIHtzdHJpbmd9IHJlbWFpbmRlckFkZHJlc3MgSGFzIHRvIGJlIGdlbmVyYXRlZCBieSB0aGUgY29zaWduZXJzIGJlZm9yZSBpbml0aWF0aW5nIHRoZSB0cmFuc2ZlciwgY2FuIGJlIG51bGwgaWYgZnVsbHkgc3BlbnRcbiogICBAcGFyYW0ge29iamVjdH0gdHJhbnNmZXJzXG4qICAgQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiogICBAcmV0dXJucyB7YXJyYXl9IEFycmF5IG9mIHRyYW5zYWN0aW9uIG9iamVjdHNcbioqL1xuTXVsdGlzaWcuaW5pdGlhdGVUcmFuc2ZlciA9IGZ1bmN0aW9uKGlucHV0LCByZW1haW5kZXJBZGRyZXNzLCB0cmFuc2ZlcnMsIGNhbGxiYWNrKSB7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBJZiBtZXNzYWdlIG9yIHRhZyBpcyBub3Qgc3VwcGxpZWQsIHByb3ZpZGUgaXRcbiAgICAvLyBBbHNvIHJlbW92ZSB0aGUgY2hlY2tzdW0gb2YgdGhlIGFkZHJlc3MgaWYgaXQncyB0aGVyZVxuICAgIHRyYW5zZmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRoaXNUcmFuc2Zlcikge1xuICAgICAgICB0aGlzVHJhbnNmZXIubWVzc2FnZSA9IHRoaXNUcmFuc2Zlci5tZXNzYWdlID8gdGhpc1RyYW5zZmVyLm1lc3NhZ2UgOiAnJztcbiAgICAgICAgdGhpc1RyYW5zZmVyLnRhZyA9IHRoaXNUcmFuc2Zlci50YWcgPyB0aGlzVHJhbnNmZXIudGFnIDogJyc7XG4gICAgICAgIHRoaXNUcmFuc2Zlci5vYnNvbGV0ZVRhZyA9IHRoaXNUcmFuc2Zlci5vYnNvbGV0ZVRhZyA/IHRoaXNUcmFuc2Zlci5vYnNvbGV0ZVRhZyA6ICcnOyAgICAgICAgXG4gICAgICAgIHRoaXNUcmFuc2Zlci5hZGRyZXNzID0gVXRpbHMubm9DaGVja3N1bSh0aGlzVHJhbnNmZXIuYWRkcmVzcyk7XG4gICAgfSlcblxuICAgIC8vIElucHV0IHZhbGlkYXRpb24gb2YgdHJhbnNmZXJzIG9iamVjdFxuICAgIGlmICghaW5wdXRWYWxpZGF0b3IuaXNUcmFuc2ZlcnNBcnJheSh0cmFuc2ZlcnMpKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvcnMuaW52YWxpZFRyYW5zZmVycygpKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiBpbnRcbiAgICBpZiAoIWlucHV0VmFsaWRhdG9yLmlzVmFsdWUoaW5wdXQuc2VjdXJpdHlTdW0pKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvcnMuaW52YWxpZElucHV0cygpKTtcbiAgICB9XG5cbiAgICAvLyB2YWxpZGF0ZSBpbnB1dCBhZGRyZXNzXG4gICAgaWYgKCFpbnB1dFZhbGlkYXRvci5pc0FkZHJlc3MoaW5wdXQuYWRkcmVzcykpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9ycy5pbnZhbGlkVHJ5dGVzKCkpO1xuICAgIH1cblxuICAgIC8vIHZhbGlkYXRlIHJlbWFpbmRlciBhZGRyZXNzXG4gICAgaWYgKHJlbWFpbmRlckFkZHJlc3MgJiYgIWlucHV0VmFsaWRhdG9yLmlzQWRkcmVzcyhyZW1haW5kZXJBZGRyZXNzKSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3JzLmludmFsaWRUcnl0ZXMoKSk7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGJ1bmRsZVxuICAgIHZhciBidW5kbGUgPSBuZXcgQnVuZGxlKCk7XG5cbiAgICB2YXIgdG90YWxWYWx1ZSA9IDA7XG4gICAgdmFyIHNpZ25hdHVyZUZyYWdtZW50cyA9IFtdO1xuICAgIHZhciB0YWc7XG5cbiAgICAvL1xuICAgIC8vICBJdGVyYXRlIG92ZXIgYWxsIHRyYW5zZmVycywgZ2V0IHRvdGFsVmFsdWVcbiAgICAvLyAgYW5kIHByZXBhcmUgdGhlIHNpZ25hdHVyZUZyYWdtZW50cywgbWVzc2FnZSBhbmQgdGFnXG4gICAgLy9cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYW5zZmVycy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBzaWduYXR1cmVNZXNzYWdlTGVuZ3RoID0gMTtcblxuICAgICAgICAvLyBJZiBtZXNzYWdlIGxvbmdlciB0aGFuIDIxODcgdHJ5dGVzLCBpbmNyZWFzZSBzaWduYXR1cmVNZXNzYWdlTGVuZ3RoIChhZGQgbXVsdGlwbGUgdHJhbnNhY3Rpb25zKVxuICAgICAgICBpZiAodHJhbnNmZXJzW2ldLm1lc3NhZ2UubGVuZ3RoID4gMjE4Nykge1xuXG4gICAgICAgICAgICAvLyBHZXQgdG90YWwgbGVuZ3RoLCBtZXNzYWdlIC8gbWF4TGVuZ3RoICgyMTg3IHRyeXRlcylcbiAgICAgICAgICAgIHNpZ25hdHVyZU1lc3NhZ2VMZW5ndGggKz0gTWF0aC5mbG9vcih0cmFuc2ZlcnNbaV0ubWVzc2FnZS5sZW5ndGggLyAyMTg3KTtcblxuICAgICAgICAgICAgdmFyIG1zZ0NvcHkgPSB0cmFuc2ZlcnNbaV0ubWVzc2FnZTtcblxuICAgICAgICAgICAgLy8gV2hpbGUgdGhlcmUgaXMgc3RpbGwgYSBtZXNzYWdlLCBjb3B5IGl0XG4gICAgICAgICAgICB3aGlsZSAobXNnQ29weSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGZyYWdtZW50ID0gbXNnQ29weS5zbGljZSgwLCAyMTg3KTtcbiAgICAgICAgICAgICAgICBtc2dDb3B5ID0gbXNnQ29weS5zbGljZSgyMTg3LCBtc2dDb3B5Lmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICAvLyBQYWQgcmVtYWluZGVyIG9mIGZyYWdtZW50XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGZyYWdtZW50Lmxlbmd0aCA8IDIxODc7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudCArPSAnOSc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2lnbmF0dXJlRnJhZ21lbnRzLnB1c2goZnJhZ21lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBFbHNlLCBnZXQgc2luZ2xlIGZyYWdtZW50IHdpdGggMjE4NyBvZiA5J3MgdHJ5dGVzXG4gICAgICAgICAgICB2YXIgZnJhZ21lbnQgPSAnJztcblxuICAgICAgICAgICAgaWYgKHRyYW5zZmVyc1tpXS5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSB0cmFuc2ZlcnNbaV0ubWVzc2FnZS5zbGljZSgwLCAyMTg3KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgZnJhZ21lbnQubGVuZ3RoIDwgMjE4NzsgaisrKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgKz0gJzknO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzaWduYXR1cmVGcmFnbWVudHMucHVzaChmcmFnbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgY3VycmVudCB0aW1lc3RhbXAgaW4gc2Vjb25kc1xuICAgICAgICB2YXIgdGltZXN0YW1wID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG5cbiAgICAgICAgLy8gSWYgbm8gdGFnIGRlZmluZWQsIGdldCAyNyB0cnl0ZSB0YWcuXG4gICAgICAgIHRhZyA9IHRyYW5zZmVyc1tpXS50YWcgPyB0cmFuc2ZlcnNbaV0udGFnIDogJzk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OSc7XG5cbiAgICAgICAgLy8gUGFkIGZvciByZXF1aXJlZCAyNyB0cnl0ZSBsZW5ndGhcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IHRhZy5sZW5ndGggPCAyNzsgaisrKSB7XG4gICAgICAgICAgICB0YWcgKz0gJzknO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGZpcnN0IGVudHJpZXMgdG8gdGhlIGJ1bmRsZVxuICAgICAgICAvLyBTbGljZSB0aGUgYWRkcmVzcyBpbiBjYXNlIHRoZSB1c2VyIHByb3ZpZGVkIGEgY2hlY2tzdW1tZWQgb25lXG4gICAgICAgIGJ1bmRsZS5hZGRFbnRyeShzaWduYXR1cmVNZXNzYWdlTGVuZ3RoLCB0cmFuc2ZlcnNbaV0uYWRkcmVzcy5zbGljZSgwLCA4MSksIHRyYW5zZmVyc1tpXS52YWx1ZSwgdGFnLCB0aW1lc3RhbXApO1xuXG4gICAgICAgIC8vIFN1bSB1cCB0b3RhbCB2YWx1ZVxuICAgICAgICB0b3RhbFZhbHVlICs9IHBhcnNlSW50KHRyYW5zZmVyc1tpXS52YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gR2V0IGlucHV0cyBpZiB3ZSBhcmUgc2VuZGluZyB0b2tlbnNcbiAgICBpZiAodG90YWxWYWx1ZSkge1xuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUJ1bmRsZSh0b3RhbEJhbGFuY2UsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAodG90YWxCYWxhbmNlID4gMCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHRvU3VidHJhY3QgPSAwIC0gdG90YWxCYWxhbmNlO1xuICAgICAgICAgICAgICAgIHZhciB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBpbnB1dCBhcyBidW5kbGUgZW50cnlcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGEgc2luZ2xlIGVudHJ5LCBzaWduYXR1cmVzIHdpbGwgYmUgYWRkZWQgbGF0ZXJcbiAgICAgICAgICAgICAgICBidW5kbGUuYWRkRW50cnkoaW5wdXQuc2VjdXJpdHlTdW0sIGlucHV0LmFkZHJlc3MsIHRvU3VidHJhY3QsIHRhZywgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRvdGFsVmFsdWUgPiB0b3RhbEJhbGFuY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiTm90IGVub3VnaCBiYWxhbmNlLlwiKSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSByZW1haW5kZXIgdmFsdWVcbiAgICAgICAgICAgIC8vIEFkZCBleHRyYSBvdXRwdXQgdG8gc2VuZCByZW1haW5pbmcgZnVuZHMgdG9cbiAgICAgICAgICAgIGlmICh0b3RhbEJhbGFuY2UgPiB0b3RhbFZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVtYWluZGVyID0gdG90YWxCYWxhbmNlIC0gdG90YWxWYWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIFJlbWFpbmRlciBidW5kbGUgZW50cnkgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICAgICAgaWYgKCFyZW1haW5kZXJBZGRyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJObyByZW1haW5kZXIgYWRkcmVzcyBkZWZpbmVkXCIpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBidW5kbGUuYWRkRW50cnkoMSwgcmVtYWluZGVyQWRkcmVzcywgcmVtYWluZGVyLCB0YWcsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJ1bmRsZS5maW5hbGl6ZSgpO1xuICAgICAgICAgICAgYnVuZGxlLmFkZFRyeXRlcyhzaWduYXR1cmVGcmFnbWVudHMpO1xuXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgYnVuZGxlLmJ1bmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGlucHV0LmJhbGFuY2UpIHtcbiAgICAgICAgICBjcmVhdGVCdW5kbGUoaW5wdXQuYmFsYW5jZSwgY2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBjb21tYW5kID0ge1xuICAgICAgICAgICAgICAnY29tbWFuZCc6ICdnZXRCYWxhbmNlcycsXG4gICAgICAgICAgICAgICdhZGRyZXNzZXMnOiBuZXcgQXJyYXkoaW5wdXQuYWRkcmVzcyksXG4gICAgICAgICAgICAgICd0aHJlc2hvbGQnOiAxMDBcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VsZi5fbWFrZVJlcXVlc3Quc2VuZChjb21tYW5kLCBmdW5jdGlvbihlLCBiYWxhbmNlcykge1xuICAgICAgICAgICAgICBpZiAoZSkgcmV0dXJuIGNhbGxiYWNrKGUpO1xuICAgICAgICAgICAgICBjcmVhdGVCdW5kbGUocGFyc2VJbnQoYmFsYW5jZXMuYmFsYW5jZXNbMF0pLCBjYWxsYmFjayk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgdHJhbnNmZXI6IHRoZSB0cmFuc2ZlciBkb2VzIG5vdCByZXF1aXJlIGEgc2lnbmF0dXJlLlwiKSk7XG4gICAgfVxuXG59XG5cblxuLyoqXG4qICAgQWRkcyB0aGUgY29zaWduZXIgc2lnbmF0dXJlcyB0byB0aGUgY29ycmVzcG9uZGluZyBidW5kbGUgdHJhbnNhY3Rpb25cbipcbiogICBAbWV0aG9kIGFkZFNpZ25hdHVyZVxuKiAgIEBwYXJhbSB7YXJyYXl9IGJ1bmRsZVRvU2lnblxuKiAgIEBwYXJhbSB7aW50fSBjb3NpZ25lckluZGV4XG4qICAgQHBhcmFtIHtzdHJpbmd9IGlucHV0QWRkcmVzc1xuKiAgIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiogICBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuKiAgIEByZXR1cm5zIHthcnJheX0gdHJ5dGVzIFJldHVybnMgYnVuZGxlIHRyeXRlc1xuKiovXG5NdWx0aXNpZy5hZGRTaWduYXR1cmUgPSBmdW5jdGlvbihidW5kbGVUb1NpZ24sIGlucHV0QWRkcmVzcywga2V5LCBjYWxsYmFjaykge1xuXG4gICAgdmFyIGJ1bmRsZSA9IG5ldyBCdW5kbGUoKTtcbiAgICBidW5kbGUuYnVuZGxlID0gYnVuZGxlVG9TaWduO1xuXG4gICAgLy8gR2V0IHRoZSBzZWN1cml0eSB1c2VkIGZvciB0aGUgcHJpdmF0ZSBrZXlcbiAgICAvLyAxIHNlY3VyaXR5IGxldmVsID0gMjE4NyB0cnl0ZXNcbiAgICB2YXIgc2VjdXJpdHkgPSAoa2V5Lmxlbmd0aCAvIDIxODcpO1xuXG4gICAgLy8gY29udmVydCBwcml2YXRlIGtleSB0cnl0ZXMgaW50byB0cml0c1xuICAgIHZhciBrZXkgPSBDb252ZXJ0ZXIudHJpdHMoa2V5KTtcblxuXG4gICAgLy8gRmlyc3QgZ2V0IHRoZSB0b3RhbCBudW1iZXIgb2YgYWxyZWFkeSBzaWduZWQgdHJhbnNhY3Rpb25zXG4gICAgLy8gdXNlIHRoYXQgZm9yIHRoZSBidW5kbGUgaGFzaCBjYWxjdWxhdGlvbiBhcyB3ZWxsIGFzIGtub3dpbmdcbiAgICAvLyB3aGVyZSB0byBhZGQgdGhlIHNpZ25hdHVyZVxuICAgIHZhciBudW1TaWduZWRUeHMgPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidW5kbGUuYnVuZGxlLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgaWYgKGJ1bmRsZS5idW5kbGVbaV0uYWRkcmVzcyA9PT0gaW5wdXRBZGRyZXNzKSB7XG5cbiAgICAgICAgICAgIC8vIElmIHRyYW5zYWN0aW9uIGlzIGFscmVhZHkgc2lnbmVkLCBpbmNyZWFzZSBjb3VudGVyXG4gICAgICAgICAgICBpZiAoIWlucHV0VmFsaWRhdG9yLmlzTmluZXNUcnl0ZXMoYnVuZGxlLmJ1bmRsZVtpXS5zaWduYXR1cmVNZXNzYWdlRnJhZ21lbnQpKSB7XG5cbiAgICAgICAgICAgICAgICBudW1TaWduZWRUeHMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEVsc2Ugc2lnbiB0aGUgdHJhbnNhY3Rpb25zZVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgYnVuZGxlSGFzaCA9IGJ1bmRsZS5idW5kbGVbaV0uYnVuZGxlO1xuXG4gICAgICAgICAgICAgICAgLy8gIEZpcnN0IDY1NjEgdHJpdHMgZm9yIHRoZSBmaXJzdEZyYWdtZW50XG4gICAgICAgICAgICAgICAgdmFyIGZpcnN0RnJhZ21lbnQgPSBrZXkuc2xpY2UoMCwgNjU2MSk7XG5cbiAgICAgICAgICAgICAgICAvLyAgR2V0IHRoZSBub3JtYWxpemVkIGJ1bmRsZSBoYXNoXG4gICAgICAgICAgICAgICAgdmFyIG5vcm1hbGl6ZWRCdW5kbGVIYXNoID0gYnVuZGxlLm5vcm1hbGl6ZWRCdW5kbGUoYnVuZGxlSGFzaCk7XG4gICAgICAgICAgICAgICAgdmFyIG5vcm1hbGl6ZWRCdW5kbGVGcmFnbWVudHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIC8vIFNwbGl0IGhhc2ggaW50byAzIGZyYWdtZW50c1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgMzsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRCdW5kbGVGcmFnbWVudHNba10gPSBub3JtYWxpemVkQnVuZGxlSGFzaC5zbGljZShrICogMjcsIChrICsgMSkgKiAyNyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gIEZpcnN0IGJ1bmRsZSBmcmFnbWVudCB1c2VzIDI3IHRyeXRlc1xuICAgICAgICAgICAgICAgIHZhciBmaXJzdEJ1bmRsZUZyYWdtZW50ID0gbm9ybWFsaXplZEJ1bmRsZUZyYWdtZW50c1tudW1TaWduZWRUeHMgJSAzXTtcblxuICAgICAgICAgICAgICAgIC8vICBDYWxjdWxhdGUgdGhlIG5ldyBzaWduYXR1cmVGcmFnbWVudCB3aXRoIHRoZSBmaXJzdCBidW5kbGUgZnJhZ21lbnRcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RTaWduZWRGcmFnbWVudCA9IFNpZ25pbmcuc2lnbmF0dXJlRnJhZ21lbnQoZmlyc3RCdW5kbGVGcmFnbWVudCwgZmlyc3RGcmFnbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyAgQ29udmVydCBzaWduYXR1cmUgdG8gdHJ5dGVzIGFuZCBhc3NpZ24gdGhlIG5ldyBzaWduYXR1cmVGcmFnbWVudFxuICAgICAgICAgICAgICAgIGJ1bmRsZS5idW5kbGVbaV0uc2lnbmF0dXJlTWVzc2FnZUZyYWdtZW50ID0gQ29udmVydGVyLnRyeXRlcyhmaXJzdFNpZ25lZEZyYWdtZW50KTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgc2VjdXJpdHk7IGorKykge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vICBOZXh0IDY1NjEgdHJpdHMgZm9yIHRoZSBmaXJzdEZyYWdtZW50XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0RnJhZ21lbnQgPSBrZXkuc2xpY2UoNjU2MSAqIGosIChqICsgMSkgKiA2NTYxKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyAgVXNlIHRoZSBuZXh0IDI3IHRyeXRlc1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dEJ1bmRsZUZyYWdtZW50ID0gbm9ybWFsaXplZEJ1bmRsZUZyYWdtZW50c1sobnVtU2lnbmVkVHhzICsgaikgJSAzXTtcblxuICAgICAgICAgICAgICAgICAgICAvLyAgQ2FsY3VsYXRlIHRoZSBuZXcgc2lnbmF0dXJlRnJhZ21lbnQgd2l0aCB0aGUgZmlyc3QgYnVuZGxlIGZyYWdtZW50XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0U2lnbmVkRnJhZ21lbnQgPSBTaWduaW5nLnNpZ25hdHVyZUZyYWdtZW50KG5leHRCdW5kbGVGcmFnbWVudCwgbmV4dEZyYWdtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyAgQ29udmVydCBzaWduYXR1cmUgdG8gdHJ5dGVzIGFuZCBhZGQgbmV3IGJ1bmRsZSBlbnRyeSBhdCBpICsgaiBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICAvLyBBc3NpZ24gdGhlIHNpZ25hdHVyZSBmcmFnbWVudFxuICAgICAgICAgICAgICAgICAgICBidW5kbGUuYnVuZGxlW2kgKyBqXS5zaWduYXR1cmVNZXNzYWdlRnJhZ21lbnQgPSBDb252ZXJ0ZXIudHJ5dGVzKG5leHRTaWduZWRGcmFnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgYnVuZGxlLmJ1bmRsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTXVsdGlzaWc7XG4iLCIvL1xuLy8gIENvbnZlcnNpb24gb2YgYXNjaWkgZW5jb2RlZCBieXRlcyB0byB0cnl0ZXMuXG4vLyAgSW5wdXQgaXMgYSBzdHJpbmcgKGNhbiBiZSBzdHJpbmdpZmllZCBKU09OIG9iamVjdCksIHJldHVybiB2YWx1ZSBpcyBUcnl0ZXNcbi8vXG4vLyAgSG93IHRoZSBjb252ZXJzaW9uIHdvcmtzOlxuLy8gICAgMiBUcnl0ZXMgPT09IDEgQnl0ZVxuLy8gICAgVGhlcmUgYXJlIGEgdG90YWwgb2YgMjcgZGlmZmVyZW50IHRyeXRlIHZhbHVlczogOUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXG4vL1xuLy8gICAgMS4gV2UgZ2V0IHRoZSBkZWNpbWFsIHZhbHVlIG9mIGFuIGluZGl2aWR1YWwgQVNDSUkgY2hhcmFjdGVyXG4vLyAgICAyLiBGcm9tIHRoZSBkZWNpbWFsIHZhbHVlLCB3ZSB0aGVuIGRlcml2ZSB0aGUgdHdvIHRyeXRlIHZhbHVlcyBieSBiYXNpY2FsbHkgY2FsY3VsYXRpbmcgdGhlIHRyeXRlIGVxdWl2YWxlbnQgKGUuZy4gMTAwID09PSAxOSArIDMgKiAyNylcbi8vICAgICAgYS4gVGhlIGZpcnN0IHRyeXRlIHZhbHVlIGlzIHRoZSBkZWNpbWFsIHZhbHVlIG1vZHVsbyAyNyAoMjcgdHJ5dGVzKVxuLy8gICAgICBiLiBUaGUgc2Vjb25kIHZhbHVlIGlzIHRoZSByZW1haW5kZXIgKGRlY2ltYWwgdmFsdWUgLSBmaXJzdCB2YWx1ZSksIGRpdmlkZWQgYnkgMjdcbi8vICAgIDMuIFRoZSB0d28gdmFsdWVzIHJldHVybmVkIGZyb20gU3RlcCAyLiBhcmUgdGhlbiBpbnB1dCBhcyBpbmRpY2VzIGludG8gdGhlIGF2YWlsYWJsZSB2YWx1ZXMgbGlzdCAoJzlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWicpIHRvIGdldCB0aGUgY29ycmVjdCB0cnl0ZSB2YWx1ZVxuLy9cbi8vICAgRVhBTVBMRVNcbi8vICAgICAgTGV0cyBzYXkgd2Ugd2FudCB0byBjb252ZXJ0IHRoZSBBU0NJSSBjaGFyYWN0ZXIgXCJaXCIuXG4vLyAgICAgICAgMS4gJ1onIGhhcyBhIGRlY2ltYWwgdmFsdWUgb2YgOTAuXG4vLyAgICAgICAgMi4gOTAgY2FuIGJlIHJlcHJlc2VudGVkIGFzIDkgKyAzICogMjcuIFRvIG1ha2UgaXQgc2ltcGxlcjpcbi8vICAgICAgICAgICBhLiBGaXJzdCB2YWx1ZTogOTAgbW9kdWxvIDI3IGlzIDkuIFRoaXMgaXMgbm93IG91ciBmaXJzdCB2YWx1ZVxuLy8gICAgICAgICAgIGIuIFNlY29uZCB2YWx1ZTogKDkwIC0gOSkgLyAyNyBpcyAzLiBUaGlzIGlzIG91ciBzZWNvbmQgdmFsdWUuXG4vLyAgICAgICAgMy4gT3VyIHR3byB2YWx1ZXMgYXJlIG5vdyA5IGFuZCAzLiBUbyBnZXQgdGhlIHRyeXRlIHZhbHVlIG5vdyB3ZSBzaW1wbHkgaW5zZXJ0IGl0IGFzIGluZGljZXMgaW50byAnOUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJ1xuLy8gICAgICAgICAgIGEuIFRoZSBmaXJzdCB0cnl0ZSB2YWx1ZSBpcyAnOUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJ1s5XSA9PT0gXCJJXCJcbi8vICAgICAgICAgICBiLiBUaGUgc2Vjb25kIHRyeXRlIHZhbHVlIGlzICc5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonWzNdID09PSBcIkNcIlxuLy8gICAgICAgIE91ciB0cnl0ZSBwYWlyIGlzIFwiSUNcIlxuLy9cbi8vICAgICAgUkVTVUxUOlxuLy8gICAgICAgIFRoZSBBU0NJSSBjaGFyIFwiWlwiIGlzIHJlcHJlc2VudGVkIGFzIFwiSUNcIiBpbiB0cnl0ZXMuXG4vL1xuZnVuY3Rpb24gdG9Ucnl0ZXMoaW5wdXQpIHtcblxuICAgIC8vIElmIGlucHV0IGlzIG5vdCBhIHN0cmluZywgcmV0dXJuIG51bGxcbiAgICBpZiAoIHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycgKSByZXR1cm4gbnVsbFxuXG4gICAgdmFyIFRSWVRFX1ZBTFVFUyA9IFwiOUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XG4gICAgdmFyIHRyeXRlcyA9IFwiXCI7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGFyID0gaW5wdXRbaV07XG4gICAgICAgIHZhciBhc2NpaVZhbHVlID0gY2hhci5jaGFyQ29kZUF0KDApO1xuXG4gICAgICAgIC8vIElmIG5vdCByZWNvZ25pemFibGUgQVNDSUkgY2hhcmFjdGVyLCByZXR1cm4gbnVsbFxuICAgICAgICBpZiAoYXNjaWlWYWx1ZSA+IDI1NSkge1xuICAgICAgICAgICAgLy9hc2NpaVZhbHVlID0gMzJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpcnN0VmFsdWUgPSBhc2NpaVZhbHVlICUgMjc7XG4gICAgICAgIHZhciBzZWNvbmRWYWx1ZSA9IChhc2NpaVZhbHVlIC0gZmlyc3RWYWx1ZSkgLyAyNztcblxuICAgICAgICB2YXIgdHJ5dGVzVmFsdWUgPSBUUllURV9WQUxVRVNbZmlyc3RWYWx1ZV0gKyBUUllURV9WQUxVRVNbc2Vjb25kVmFsdWVdO1xuXG4gICAgICAgIHRyeXRlcyArPSB0cnl0ZXNWYWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ5dGVzO1xufVxuXG5cbi8vXG4vLyAgVHJ5dGVzIHRvIGJ5dGVzXG4vLyAgUmV2ZXJzZSBvcGVyYXRpb24gZnJvbSB0aGUgYnl0ZVRvVHJ5dGVzIGZ1bmN0aW9uIGluIHNlbmQuanNcbi8vICAyIFRyeXRlcyA9PSAxIEJ5dGVcbi8vICBXZSBhc3N1bWUgdGhhdCB0aGUgdHJ5dGVzIGFyZSBhIEpTT04gZW5jb2RlZCBvYmplY3QgdGh1cyBmb3Igb3VyIGVuY29kaW5nOlxuLy8gICAgRmlyc3QgY2hhcmFjdGVyID0ge1xuLy8gICAgTGFzdCBjaGFyYWN0ZXIgPSB9XG4vLyAgICBFdmVyeXRoaW5nIGFmdGVyIHRoYXQgaXMgOSdzIHBhZGRpbmdcbi8vXG5mdW5jdGlvbiBmcm9tVHJ5dGVzKGlucHV0VHJ5dGVzKSB7XG5cbiAgICAvLyBJZiBpbnB1dCBpcyBub3QgYSBzdHJpbmcsIHJldHVybiBudWxsXG4gICAgaWYgKCB0eXBlb2YgaW5wdXRUcnl0ZXMgIT09ICdzdHJpbmcnICkgcmV0dXJuIG51bGxcblxuICAgIC8vIElmIGlucHV0IGxlbmd0aCBpcyBvZGQsIHJldHVybiBudWxsXG4gICAgaWYgKCBpbnB1dFRyeXRlcy5sZW5ndGggJSAyICkgcmV0dXJuIG51bGxcblxuICAgIHZhciBUUllURV9WQUxVRVMgPSBcIjlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiO1xuICAgIHZhciBvdXRwdXRTdHJpbmcgPSBcIlwiO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dFRyeXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAvLyBnZXQgYSB0cnl0ZXMgcGFpclxuICAgICAgICB2YXIgdHJ5dGVzID0gaW5wdXRUcnl0ZXNbaV0gKyBpbnB1dFRyeXRlc1tpICsgMV07XG5cbiAgICAgICAgdmFyIGZpcnN0VmFsdWUgPSBUUllURV9WQUxVRVMuaW5kZXhPZih0cnl0ZXNbMF0pO1xuICAgICAgICB2YXIgc2Vjb25kVmFsdWUgPSBUUllURV9WQUxVRVMuaW5kZXhPZih0cnl0ZXNbMV0pO1xuXG4gICAgICAgIHZhciBkZWNpbWFsVmFsdWUgPSBmaXJzdFZhbHVlICsgc2Vjb25kVmFsdWUgKiAyNztcblxuICAgICAgICB2YXIgY2hhcmFjdGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShkZWNpbWFsVmFsdWUpO1xuXG4gICAgICAgIG91dHB1dFN0cmluZyArPSBjaGFyYWN0ZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdG9Ucnl0ZXM6IHRvVHJ5dGVzLFxuICAgIGZyb21Ucnl0ZXM6IGZyb21Ucnl0ZXNcbn1cbiIsInZhciBhc2NpaSA9IHJlcXVpcmUoXCIuL2FzY2lpVG9Ucnl0ZXNcIik7XG52YXIgaW5wdXRWYWxpZGF0b3IgPSByZXF1aXJlKFwiLi9pbnB1dFZhbGlkYXRvclwiKTtcblxuLyoqXG4qICAgZXh0cmFjdEpzb24gdGFrZXMgYSBidW5kbGUgYXMgaW5wdXQgYW5kIGZyb20gdGhlIHNpZ25hdHVyZU1lc3NhZ2VGcmFnbWVudHMgZXh0cmFjdHMgdGhlIGNvcnJlY3QgSlNPTlxuKiAgIGRhdGEgd2hpY2ggd2FzIGVuY29kZWQgYW5kIHNlbnQgd2l0aCB0aGUgdHJhbnNhY3Rpb24uXG4qXG4qICAgQG1ldGhvZCBleHRyYWN0SnNvblxuKiAgIEBwYXJhbSB7YXJyYXl9IGJ1bmRsZVxuKiAgIEByZXR1cm5zIHtPYmplY3R9XG4qKi9cbmZ1bmN0aW9uIGV4dHJhY3RKc29uKGJ1bmRsZSkge1xuXG4gICAgLy8gaWYgd3JvbmcgaW5wdXQgcmV0dXJuIG51bGxcbiAgICBpZiAoICFpbnB1dFZhbGlkYXRvci5pc0FycmF5KGJ1bmRsZSkgfHwgYnVuZGxlWzBdID09PSB1bmRlZmluZWQgKSByZXR1cm4gbnVsbDtcblxuXG4gICAgLy8gU2FuaXR5IGNoZWNrOiBpZiB0aGUgZmlyc3QgdHJ5dGUgcGFpciBpcyBub3Qgb3BlbmluZyBicmFja2V0LCBpdCdzIG5vdCBhIG1lc3NhZ2VcbiAgICB2YXIgZmlyc3RUcnl0ZVBhaXIgPSBidW5kbGVbMF0uc2lnbmF0dXJlTWVzc2FnZUZyYWdtZW50WzBdICsgYnVuZGxlWzBdLnNpZ25hdHVyZU1lc3NhZ2VGcmFnbWVudFsxXTtcblxuICAgIGlmIChmaXJzdFRyeXRlUGFpciAhPT0gXCJPRFwiKSByZXR1cm4gbnVsbDtcblxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIG5vdEVuZGVkID0gdHJ1ZTtcbiAgICB2YXIgdHJ5dGVzQ2h1bmsgPSAnJztcbiAgICB2YXIgdHJ5dGVzQ2hlY2tlZCA9IDA7XG4gICAgdmFyIHByZWxpbWluYXJ5U3RvcCA9IGZhbHNlO1xuICAgIHZhciBmaW5hbEpzb24gPSAnJztcblxuICAgIHdoaWxlIChpbmRleCA8IGJ1bmRsZS5sZW5ndGggJiYgbm90RW5kZWQpIHtcblxuICAgICAgICB2YXIgbWVzc2FnZUNodW5rID0gYnVuZGxlW2luZGV4XS5zaWduYXR1cmVNZXNzYWdlRnJhZ21lbnQ7XG5cbiAgICAgICAgLy8gV2UgaXRlcmF0ZSBvdmVyIHRoZSBtZXNzYWdlIGNodW5rLCByZWFkaW5nIDkgdHJ5dGVzIGF0IGEgdGltZVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2VDaHVuay5sZW5ndGg7IGkgKz0gOSkge1xuXG4gICAgICAgICAgICAvLyBnZXQgOSB0cnl0ZXNcbiAgICAgICAgICAgIHZhciB0cnl0ZXMgPSBtZXNzYWdlQ2h1bmsuc2xpY2UoaSwgaSArIDkpO1xuICAgICAgICAgICAgdHJ5dGVzQ2h1bmsgKz0gdHJ5dGVzO1xuXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHVwcGVyIGxpbWl0IG9mIHRoZSB0eXRlcyB0aGF0IG5lZWQgdG8gYmUgY2hlY2tlZFxuICAgICAgICAgICAgLy8gYmVjYXVzZSB3ZSBvbmx5IGNoZWNrIDIgdHJ5dGVzIGF0IGEgdGltZSwgdGhlcmUgaXMgc29tZXRpbWVzIGEgbGVmdG92ZXJcbiAgICAgICAgICAgIHZhciB1cHBlckxpbWl0ID0gdHJ5dGVzQ2h1bmsubGVuZ3RoIC0gdHJ5dGVzQ2h1bmsubGVuZ3RoICUgMjtcblxuICAgICAgICAgICAgdmFyIHRyeXRlc1RvQ2hlY2sgPSB0cnl0ZXNDaHVuay5zbGljZSh0cnl0ZXNDaGVja2VkLCB1cHBlckxpbWl0KTtcblxuICAgICAgICAgICAgLy8gV2UgcmVhZCAyIHRyeXRlcyBhdCBhIHRpbWUgYW5kIGNoZWNrIGlmIGl0IGVxdWFscyB0aGUgY2xvc2luZyBicmFja2V0IGNoYXJhY3RlclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0cnl0ZXNUb0NoZWNrLmxlbmd0aDsgaiArPSAyKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdHJ5dGVQYWlyID0gdHJ5dGVzVG9DaGVja1tqXSArIHRyeXRlc1RvQ2hlY2tbaiArIDFdO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgY2xvc2luZyBicmFja2V0IGNoYXIgd2FzIGZvdW5kLCBhbmQgdGhlcmUgYXJlIG9ubHkgdHJhaWxpbmcgOSdzXG4gICAgICAgICAgICAgICAgLy8gd2UgcXVpdCBhbmQgcmVtb3ZlIHRoZSA5J3MgZnJvbSB0aGUgdHJ5dGVzQ2h1bmsuXG4gICAgICAgICAgICAgICAgaWYgKCBwcmVsaW1pbmFyeVN0b3AgJiYgdHJ5dGVQYWlyID09PSAnOTknICkge1xuXG4gICAgICAgICAgICAgICAgICAgIG5vdEVuZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGUgdHJhaWxpbmcgOSdzIGZyb20gdHJ5dGVzQ2h1bmtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgY2xvc2luZ0JyYWNrZXQgPSB0cnl0ZXNUb0NoZWNrLmluZGV4T2YoJ1FEJykgKyAxO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vdHJ5dGVzQ2h1bmsgPSB0cnl0ZXNDaHVuay5zbGljZSggMCwgKCB0cnl0ZXNDaHVuay5sZW5ndGggLSB0cnl0ZXNUb0NoZWNrLmxlbmd0aCApICsgKCBjbG9zaW5nQnJhY2tldCAlIDIgPT09IDAgPyBjbG9zaW5nQnJhY2tldCA6IGNsb3NpbmdCcmFja2V0ICsgMSApICk7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZmluYWxKc29uICs9IGFzY2lpLmZyb21Ucnl0ZXModHJ5dGVQYWlyKTtcblxuICAgICAgICAgICAgICAgIC8vIElmIHRyeXRlIHBhaXIgZXF1YWxzIGNsb3NpbmcgYnJhY2tldCBjaGFyLCB3ZSBzZXQgYSBwcmVsaW1pbmFyeSBzdG9wXG4gICAgICAgICAgICAgICAgLy8gdGhlIHByZWxpbWluYXJ5U3RvcCBpcyB1c2VmdWwgd2hlbiB3ZSBoYXZlIGEgbmVzdGVkIEpTT04gb2JqZWN0XG4gICAgICAgICAgICAgICAgaWYgKHRyeXRlUGFpciA9PT0gXCJRRFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWxpbWluYXJ5U3RvcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIW5vdEVuZGVkKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB0cnl0ZXNDaGVja2VkICs9IHRyeXRlc1RvQ2hlY2subGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBub3QgcmVhY2hlZCB0aGUgZW5kIG9mIHRoZSBtZXNzYWdlIHlldCwgd2UgY29udGludWUgd2l0aCB0aGUgbmV4dFxuICAgICAgICAvLyB0cmFuc2FjdGlvbiBpbiB0aGUgYnVuZGxlXG4gICAgICAgIGluZGV4ICs9IDE7XG5cbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBkaWQgbm90IGZpbmQgYW55IEpTT04sIHJldHVybiBudWxsXG4gICAgaWYgKG5vdEVuZGVkKSB7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHJldHVybiBmaW5hbEpzb247XG5cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0cmFjdEpzb247XG4iLCIvKipcbiogICBjaGVja3MgaWYgaW5wdXQgaXMgY29ycmVjdCBhZGRyZXNzXG4qXG4qICAgQG1ldGhvZCBpc0FkZHJlc3NcbiogICBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuKiAgIEByZXR1cm5zIHtib29sZWFufVxuKiovXG52YXIgaXNBZGRyZXNzID0gZnVuY3Rpb24oYWRkcmVzcykge1xuICAgIC8vIFRPRE86IEluIHRoZSBmdXR1cmUgY2hlY2sgY2hlY2tzdW1cblxuICAgIC8vIENoZWNrIGlmIGFkZHJlc3Mgd2l0aCBjaGVja3N1bVxuICAgIGlmIChhZGRyZXNzLmxlbmd0aCA9PT0gOTApIHtcblxuICAgICAgICBpZiAoIWlzVHJ5dGVzKGFkZHJlc3MsIDkwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcblxuICAgICAgICBpZiAoIWlzVHJ5dGVzKGFkZHJlc3MsIDgxKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuKiAgIGNoZWNrcyBpZiBpbnB1dCBpcyBjb3JyZWN0IHRyeXRlcyBjb25zaXN0aW5nIG9mIEEtWjlcbiogICBvcHRpb25hbGx5IHZhbGlkYXRlIGxlbmd0aFxuKlxuKiAgIEBtZXRob2QgaXNUcnl0ZXNcbiogICBAcGFyYW0ge3N0cmluZ30gdHJ5dGVzXG4qICAgQHBhcmFtIHtpbnRlZ2VyfSBsZW5ndGggb3B0aW9uYWxcbiogICBAcmV0dXJucyB7Ym9vbGVhbn1cbioqL1xudmFyIGlzVHJ5dGVzID0gZnVuY3Rpb24odHJ5dGVzLCBsZW5ndGgpIHtcblxuICAgIC8vIElmIG5vIGxlbmd0aCBzcGVjaWZpZWQsIGp1c3QgdmFsaWRhdGUgdGhlIHRyeXRlc1xuICAgIGlmICghbGVuZ3RoKSBsZW5ndGggPSBcIjAsXCJcblxuICAgIHZhciByZWdleFRyeXRlcyA9IG5ldyBSZWdFeHAoXCJeWzlBLVpde1wiICsgbGVuZ3RoICtcIn0kXCIpO1xuICAgIHJldHVybiByZWdleFRyeXRlcy50ZXN0KHRyeXRlcykgJiYgaXNTdHJpbmcodHJ5dGVzKTtcbn1cblxuLyoqXG4qICAgY2hlY2tzIGlmIGlucHV0IGlzIGNvcnJlY3QgdHJ5dGVzIGNvbnNpc3Rpbmcgb2YgQS1aOVxuKiAgIG9wdGlvbmFsbHkgdmFsaWRhdGUgbGVuZ3RoXG4qXG4qICAgQG1ldGhvZCBpc05pbmVzVHJ5dGVzXG4qICAgQHBhcmFtIHtzdHJpbmd9IHRyeXRlc1xuKiAgIEByZXR1cm5zIHtib29sZWFufVxuKiovXG52YXIgaXNOaW5lc1RyeXRlcyA9IGZ1bmN0aW9uKHRyeXRlcykge1xuXG4gICAgcmV0dXJuIC9eWzldKyQvLnRlc3QodHJ5dGVzKSAmJiBpc1N0cmluZyh0cnl0ZXMpO1xufVxuXG4vKipcbiogICBjaGVja3MgaWYgaW50ZWdlciB2YWx1ZVxuKlxuKiAgIEBtZXRob2QgaXNWYWx1ZVxuKiAgIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuKiAgIEByZXR1cm5zIHtib29sZWFufVxuKiovXG52YXIgaXNWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cbiAgICAvLyBjaGVjayBpZiBjb3JyZWN0IG51bWJlclxuICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKVxufVxuXG4vKipcbiogICBjaGVja3Mgd2hldGhlciBpbnB1dCBpcyBhIHZhbHVlIG9yIG5vdC4gQ2FuIGJlIGEgc3RyaW5nLCBmbG9hdCBvciBpbnRlZ2VyXG4qXG4qICAgQG1ldGhvZCBpc051bVxuKiAgIEBwYXJhbSB7aW50fVxuKiAgIEByZXR1cm5zIHtib29sZWFufVxuKiovXG52YXIgaXNOdW0gPSBmdW5jdGlvbihpbnB1dCkge1xuXG4gICAgcmV0dXJuIC9eKFxcZCtcXC4/XFxkezAsMTV9fFxcLlxcZHswLDE1fSkkLy50ZXN0KGlucHV0KTtcbn1cblxuLyoqXG4qICAgY2hlY2tzIGlmIGlucHV0IGlzIGNvcnJlY3QgaGFzaFxuKlxuKiAgIEBtZXRob2QgaXNIYXNoXG4qICAgQHBhcmFtIHtzdHJpbmd9IGhhc2hcbiogICBAcmV0dXJucyB7Ym9vbGVhbn1cbioqL1xudmFyIGlzSGFzaCA9IGZ1bmN0aW9uKGhhc2gpIHtcblxuICAgIC8vIENoZWNrIGlmIHZhbGlkLCA4MSB0cnl0ZXNcbiAgICBpZiAoIWlzVHJ5dGVzKGhhc2gsIDgxKSkge1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4qICAgY2hlY2tzIHdoZXRoZXIgaW5wdXQgaXMgYSBzdHJpbmcgb3Igbm90XG4qXG4qICAgQG1ldGhvZCBpc1N0cmluZ1xuKiAgIEBwYXJhbSB7c3RyaW5nfVxuKiAgIEByZXR1cm5zIHtib29sZWFufVxuKiovXG52YXIgaXNTdHJpbmcgPSBmdW5jdGlvbihzdHJpbmcpIHtcblxuICAgIHJldHVybiB0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJztcbn1cblxuXG4vKipcbiogICBjaGVja3Mgd2hldGhlciBpbnB1dCBpcyBhbiBhcnJheSBvciBub3RcbipcbiogICBAbWV0aG9kIGlzQXJyYXlcbiogICBAcGFyYW0ge29iamVjdH1cbiogICBAcmV0dXJucyB7Ym9vbGVhbn1cbioqL1xudmFyIGlzQXJyYXkgPSBmdW5jdGlvbihhcnJheSkge1xuXG4gICAgcmV0dXJuIGFycmF5IGluc3RhbmNlb2YgQXJyYXk7XG59XG5cblxuLyoqXG4qICAgY2hlY2tzIHdoZXRoZXIgaW5wdXQgaXMgb2JqZWN0IG9yIG5vdFxuKlxuKiAgIEBtZXRob2QgaXNPYmplY3RcbiogICBAcGFyYW0ge29iamVjdH1cbiogICBAcmV0dXJucyB7Ym9vbGVhbn1cbioqL1xudmFyIGlzT2JqZWN0ID0gZnVuY3Rpb24ob2JqZWN0KSB7XG5cbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCc7XG59XG5cblxuXG4vKipcbiogICBjaGVja3MgaWYgaW5wdXQgaXMgY29ycmVjdCBoYXNoXG4qXG4qICAgQG1ldGhvZCBpc1RyYW5zZmVyc0FycmF5XG4qICAgQHBhcmFtIHthcnJheX0gaGFzaFxuKiAgIEByZXR1cm5zIHtib29sZWFufVxuKiovXG52YXIgaXNUcmFuc2ZlcnNBcnJheSA9IGZ1bmN0aW9uKHRyYW5zZmVyc0FycmF5KSB7XG5cbiAgICBpZiAoIWlzQXJyYXkodHJhbnNmZXJzQXJyYXkpKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYW5zZmVyc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHRyYW5zZmVyID0gdHJhbnNmZXJzQXJyYXlbaV07XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdmFsaWQgYWRkcmVzc1xuICAgICAgICB2YXIgYWRkcmVzcyA9IHRyYW5zZmVyLmFkZHJlc3M7XG4gICAgICAgIGlmICghaXNBZGRyZXNzKGFkZHJlc3MpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBWYWxpZGl0eSBjaGVjayBmb3IgdmFsdWVcbiAgICAgICAgdmFyIHZhbHVlID0gdHJhbnNmZXIudmFsdWU7XG4gICAgICAgIGlmICghaXNWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIG1lc3NhZ2UgaXMgY29ycmVjdCB0cnl0ZXMgb2YgYW55IGxlbmd0aFxuICAgICAgICB2YXIgbWVzc2FnZSA9IHRyYW5zZmVyLm1lc3NhZ2U7XG4gICAgICAgIGlmICghaXNUcnl0ZXMobWVzc2FnZSwgXCIwLFwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGFnIGlzIGNvcnJlY3QgdHJ5dGVzIG9mIHswLDI3fSB0cnl0ZXNcbiAgICAgICAgdmFyIHRhZyA9IHRyYW5zZmVyLnRhZyB8fCB0cmFuc2Zlci5vYnNvbGV0ZVRhZztcbiAgICAgICAgaWYgKCFpc1RyeXRlcyh0YWcsIFwiMCwyN1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4qICAgY2hlY2tzIGlmIGlucHV0IGlzIGxpc3Qgb2YgY29ycmVjdCB0cnl0ZXNcbipcbiogICBAbWV0aG9kIGlzQXJyYXlPZkhhc2hlc1xuKiAgIEBwYXJhbSB7bGlzdH0gaGFzaGVzQXJyYXlcbiogICBAcmV0dXJucyB7Ym9vbGVhbn1cbioqL1xudmFyIGlzQXJyYXlPZkhhc2hlcyA9IGZ1bmN0aW9uKGhhc2hlc0FycmF5KSB7XG5cbiAgICBpZiAoIWlzQXJyYXkoaGFzaGVzQXJyYXkpKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhc2hlc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIGhhc2ggPSBoYXNoZXNBcnJheVtpXTtcblxuICAgICAgICAvLyBDaGVjayBpZiBhZGRyZXNzIHdpdGggY2hlY2tzdW1cbiAgICAgICAgaWYgKGhhc2gubGVuZ3RoID09PSA5MCkge1xuXG4gICAgICAgICAgICBpZiAoIWlzVHJ5dGVzKGhhc2gsIDkwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKCFpc1RyeXRlcyhoYXNoLCA4MSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4qICAgY2hlY2tzIGlmIGlucHV0IGlzIGxpc3Qgb2YgY29ycmVjdCB0cnl0ZXNcbipcbiogICBAbWV0aG9kIGlzQXJyYXlPZlRyeXRlc1xuKiAgIEBwYXJhbSB7bGlzdH0gdHJ5dGVzQXJyYXlcbiogICBAcmV0dXJucyB7Ym9vbGVhbn1cbioqL1xudmFyIGlzQXJyYXlPZlRyeXRlcyA9IGZ1bmN0aW9uKHRyeXRlc0FycmF5KSB7XG5cbiAgICBpZiAoIWlzQXJyYXkodHJ5dGVzQXJyYXkpKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyeXRlc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHRyeXRlVmFsdWUgPSB0cnl0ZXNBcnJheVtpXTtcblxuICAgICAgICAvLyBDaGVjayBpZiBjb3JyZWN0IDI2NzMgdHJ5dGVzXG4gICAgICAgIGlmICghaXNUcnl0ZXModHJ5dGVWYWx1ZSwgMjY3MykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiogICBjaGVja3MgaWYgYXR0YWNoZWQgdHJ5dGVzIGlmIGxhc3QgMjQxIHRyeXRlcyBhcmUgbm9uLXplcm9cbipcbiogICBAbWV0aG9kIGlzQXJyYXlPZkF0dGFjaGVkVHJ5dGVzXG4qICAgQHBhcmFtIHthcnJheX0gdHJ5dGVzQXJyYXlcbiogICBAcmV0dXJucyB7Ym9vbGVhbn1cbioqL1xudmFyIGlzQXJyYXlPZkF0dGFjaGVkVHJ5dGVzID0gZnVuY3Rpb24odHJ5dGVzQXJyYXkpIHtcblxuICAgIGlmICghaXNBcnJheSh0cnl0ZXNBcnJheSkpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJ5dGVzQXJyYXkubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgdHJ5dGVWYWx1ZSA9IHRyeXRlc0FycmF5W2ldO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGNvcnJlY3QgMjY3MyB0cnl0ZXNcbiAgICAgICAgaWYgKCFpc1RyeXRlcyh0cnl0ZVZhbHVlLCAyNjczKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxhc3RUcnl0ZXMgPSB0cnl0ZVZhbHVlLnNsaWNlKDI2NzMgLSAoMyAqIDgxKSk7XG5cbiAgICAgICAgaWYgKC9eWzldKyQvLnRlc3QobGFzdFRyeXRlcykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiogICBjaGVja3MgaWYgY29ycmVjdCBidW5kbGUgd2l0aCB0cmFuc2FjdGlvbiBvYmplY3RcbipcbiogICBAbWV0aG9kIGlzQXJyYXlPZlR4T2JqZWN0c1xuKiAgIEBwYXJhbSB7YXJyYXl9IGJ1bmRsZVxuKiAgIEByZXR1cm5zIHtib29sZWFufVxuKiovXG52YXIgaXNBcnJheU9mVHhPYmplY3RzID0gZnVuY3Rpb24oYnVuZGxlKSB7XG5cbiAgICBpZiAoIWlzQXJyYXkoYnVuZGxlKSB8fCBidW5kbGUubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgdmFsaWRBcnJheSA9IHRydWU7XG5cbiAgICBidW5kbGUuZm9yRWFjaChmdW5jdGlvbih0eE9iamVjdCkge1xuXG4gICAgICAgIHZhciBrZXlzVG9WYWxpZGF0ZSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdoYXNoJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGlzSGFzaCxcbiAgICAgICAgICAgICAgICBhcmdzOiBudWxsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnc2lnbmF0dXJlTWVzc2FnZUZyYWdtZW50JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGlzVHJ5dGVzLFxuICAgICAgICAgICAgICAgIGFyZ3M6IDIxODdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGlzSGFzaCxcbiAgICAgICAgICAgICAgICBhcmdzOiBudWxsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAndmFsdWUnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogaXNWYWx1ZSxcbiAgICAgICAgICAgICAgICBhcmdzOiBudWxsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnb2Jzb2xldGVUYWcnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogaXNUcnl0ZXMsXG4gICAgICAgICAgICAgICAgYXJnczogMjdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0aW1lc3RhbXAnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogaXNWYWx1ZSxcbiAgICAgICAgICAgICAgICBhcmdzOiBudWxsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnY3VycmVudEluZGV4JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGlzVmFsdWUsXG4gICAgICAgICAgICAgICAgYXJnczogbnVsbFxuICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAga2V5OiAnbGFzdEluZGV4JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGlzVmFsdWUsXG4gICAgICAgICAgICAgICAgYXJnczogbnVsbFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ2J1bmRsZScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBpc0hhc2gsXG4gICAgICAgICAgICAgICAgYXJnczogbnVsbFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3RydW5rVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogaXNIYXNoLFxuICAgICAgICAgICAgICAgIGFyZ3M6IG51bGxcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdicmFuY2hUcmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBpc0hhc2gsXG4gICAgICAgICAgICAgICAgYXJnczogbnVsbFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3RhZycsXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBpc1RyeXRlcyxcbiAgICAgICAgICAgICAgICBhcmdzOiAyN1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ2F0dGFjaG1lbnRUaW1lc3RhbXAnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogaXNWYWx1ZSxcbiAgICAgICAgICAgICAgICBhcmdzOiBudWxsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnYXR0YWNobWVudFRpbWVzdGFtcExvd2VyQm91bmQnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogaXNWYWx1ZSxcbiAgICAgICAgICAgICAgICBhcmdzOiBudWxsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnYXR0YWNobWVudFRpbWVzdGFtcFVwcGVyQm91bmQnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogaXNWYWx1ZSxcbiAgICAgICAgICAgICAgICBhcmdzOiBudWxsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnbm9uY2UnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogaXNUcnl0ZXMsXG4gICAgICAgICAgICAgICAgYXJnczogMjdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c1RvVmFsaWRhdGUubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNUb1ZhbGlkYXRlW2ldLmtleTtcbiAgICAgICAgICAgIHZhciB2YWxpZGF0b3IgPSBrZXlzVG9WYWxpZGF0ZVtpXS52YWxpZGF0b3I7XG4gICAgICAgICAgICB2YXIgYXJncyA9IGtleXNUb1ZhbGlkYXRlW2ldLmFyZ3NcblxuICAgICAgICAgICAgLy8gSWYgaW5wdXQgZG9lcyBub3QgaGF2ZSBrZXlJbmRleCBhbmQgYWRkcmVzcywgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBpZiAoIXR4T2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB2YWxpZEFycmF5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIGlucHV0IHZhbGlkYXRvciBmdW5jdGlvbiBkb2VzIG5vdCByZXR1cm4gdHJ1ZSwgZXhpdFxuICAgICAgICAgICAgaWYgKCF2YWxpZGF0b3IodHhPYmplY3Rba2V5XSwgYXJncykpIHtcbiAgICAgICAgICAgICAgICB2YWxpZEFycmF5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHZhbGlkQXJyYXk7XG59XG5cbi8qKlxuKiAgIGNoZWNrcyBpZiBjb3JyZWN0IGlucHV0cyBsaXN0XG4qXG4qICAgQG1ldGhvZCBpc0lucHV0c1xuKiAgIEBwYXJhbSB7YXJyYXl9IGlucHV0c1xuKiAgIEByZXR1cm5zIHtib29sZWFufVxuKiovXG52YXIgaXNJbnB1dHMgPSBmdW5jdGlvbihpbnB1dHMpIHtcblxuICAgIGlmICghaXNBcnJheShpbnB1dHMpKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBpbnB1dCA9IGlucHV0c1tpXTtcblxuICAgICAgICAvLyBJZiBpbnB1dCBkb2VzIG5vdCBoYXZlIGtleUluZGV4IGFuZCBhZGRyZXNzLCByZXR1cm4gZmFsc2VcbiAgICAgICAgaWYgKCFpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnc2VjdXJpdHknKSB8fCAhaW5wdXQuaGFzT3duUHJvcGVydHkoJ2tleUluZGV4JykgfHwgIWlucHV0Lmhhc093blByb3BlcnR5KCdhZGRyZXNzJykpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoIWlzQWRkcmVzcyhpbnB1dC5hZGRyZXNzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1ZhbHVlKGlucHV0LnNlY3VyaXR5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1ZhbHVlKGlucHV0LmtleUluZGV4KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuKiAgIENoZWNrcyB0aGF0IGEgZ2l2ZW4gdXJpIGlzIHZhbGlkXG4qXG4qICAgVmFsaWQgRXhhbXBsZXM6XG4qICAgdWRwOi8vWzIwMDE6ZGI4OmEwYjoxMmYwOjoxXToxNDI2NVxuKiAgIHVkcDovL1syMDAxOmRiODphMGI6MTJmMDo6MV1cbiogICB1ZHA6Ly84LjguOC44OjE0MjY1XG4qICAgdWRwOi8vZG9tYWluLmNvbVxuKiAgIHVkcDovL2RvbWFpbjIuY29tOjE0MjY1XG4qXG4qICAgQG1ldGhvZCBpc1VyaVxuKiAgIEBwYXJhbSB7c3RyaW5nfSBub2RlXG4qICAgQHJldHVybnMge2Jvb2x9IHZhbGlkXG4qKi9cbnZhciBpc1VyaSA9IGZ1bmN0aW9uKG5vZGUpIHtcblxuICAgIHZhciBnZXRJbnNpZGUgPSAvXih1ZHB8dGNwKTpcXC9cXC8oW1xcW11bXlxcXVxcLl0qW1xcXV18W15cXFtcXF06XSopWzpdezAsMX0oWzAtOV17MSx9JHwkKS9pO1xuXG4gICAgdmFyIHN0cmlwQnJhY2tldHMgPSAvW1xcW117MCwxfShbXlxcW1xcXV0qKVtcXF1dezAsMX0vO1xuXG4gICAgdmFyIHVyaVRlc3QgPSAvKCheXFxzKigoKFswLTldfFsxLTldWzAtOV18MVswLTldezJ9fDJbMC00XVswLTldfDI1WzAtNV0pXFwuKXszfShbMC05XXxbMS05XVswLTldfDFbMC05XXsyfXwyWzAtNF1bMC05XXwyNVswLTVdKSlcXHMqJCl8KF5cXHMqKCgoWzAtOUEtRmEtZl17MSw0fTopezd9KFswLTlBLUZhLWZdezEsNH18OikpfCgoWzAtOUEtRmEtZl17MSw0fTopezZ9KDpbMC05QS1GYS1mXXsxLDR9fCgoMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKFxcLigyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KXw6KSl8KChbMC05QS1GYS1mXXsxLDR9Oil7NX0oKCg6WzAtOUEtRmEtZl17MSw0fSl7MSwyfSl8OigoMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKFxcLigyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KXw6KSl8KChbMC05QS1GYS1mXXsxLDR9Oil7NH0oKCg6WzAtOUEtRmEtZl17MSw0fSl7MSwzfSl8KCg6WzAtOUEtRmEtZl17MSw0fSk/OigoMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKFxcLigyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KSl8OikpfCgoWzAtOUEtRmEtZl17MSw0fTopezN9KCgoOlswLTlBLUZhLWZdezEsNH0pezEsNH0pfCgoOlswLTlBLUZhLWZdezEsNH0pezAsMn06KCgyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkoXFwuKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKSl7M30pKXw6KSl8KChbMC05QS1GYS1mXXsxLDR9Oil7Mn0oKCg6WzAtOUEtRmEtZl17MSw0fSl7MSw1fSl8KCg6WzAtOUEtRmEtZl17MSw0fSl7MCwzfTooKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKShcXC4oMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKXszfSkpfDopKXwoKFswLTlBLUZhLWZdezEsNH06KXsxfSgoKDpbMC05QS1GYS1mXXsxLDR9KXsxLDZ9KXwoKDpbMC05QS1GYS1mXXsxLDR9KXswLDR9OigoMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKFxcLigyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KSl8OikpfCg6KCgoOlswLTlBLUZhLWZdezEsNH0pezEsN30pfCgoOlswLTlBLUZhLWZdezEsNH0pezAsNX06KCgyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkoXFwuKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKSl7M30pKXw6KSkpKCUuKyk/XFxzKiQpKXwoXlxccyooKD89LnsxLDI1NX0kKSg/PS4qW0EtWmEtel0uKilbMC05QS1aYS16XSg/Oig/OlswLTlBLVphLXpdfFxcYi0pezAsNjF9WzAtOUEtWmEtel0pPyg/OlxcLlswLTlBLVphLXpdKD86KD86WzAtOUEtWmEtel18XFxiLSl7MCw2MX1bMC05QS1aYS16XSk/KSopXFxzKiQpLztcblxuICAgIGlmKCFnZXRJbnNpZGUudGVzdChub2RlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVyaVRlc3QudGVzdChzdHJpcEJyYWNrZXRzLmV4ZWMoZ2V0SW5zaWRlLmV4ZWMobm9kZSlbMV0pWzFdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaXNBZGRyZXNzOiBpc0FkZHJlc3MsXG4gICAgaXNUcnl0ZXM6IGlzVHJ5dGVzLFxuICAgIGlzTmluZXNUcnl0ZXM6IGlzTmluZXNUcnl0ZXMsXG4gICAgaXNWYWx1ZTogaXNWYWx1ZSxcbiAgICBpc0hhc2g6IGlzSGFzaCxcbiAgICBpc1RyYW5zZmVyc0FycmF5OiBpc1RyYW5zZmVyc0FycmF5LFxuICAgIGlzQXJyYXlPZkhhc2hlczogaXNBcnJheU9mSGFzaGVzLFxuICAgIGlzQXJyYXlPZlRyeXRlczogaXNBcnJheU9mVHJ5dGVzLFxuICAgIGlzQXJyYXlPZkF0dGFjaGVkVHJ5dGVzOiBpc0FycmF5T2ZBdHRhY2hlZFRyeXRlcyxcbiAgICBpc0FycmF5T2ZUeE9iamVjdHM6IGlzQXJyYXlPZlR4T2JqZWN0cyxcbiAgICBpc0lucHV0czogaXNJbnB1dHMsXG4gICAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICAgIGlzTnVtOiBpc051bSxcbiAgICBpc0FycmF5OiBpc0FycmF5LFxuICAgIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgICBpc1VyaTogaXNVcmlcbn1cbiIsInZhciBpbnB1dFZhbGlkYXRvciAgPSAgIHJlcXVpcmUoXCIuL2lucHV0VmFsaWRhdG9yXCIpO1xudmFyIEN1cmwgICAgICAgICAgICA9ICAgcmVxdWlyZShcIi4uL2NyeXB0by9jdXJsL2N1cmxcIik7XG52YXIgS2VybCAgICAgICAgICAgID0gICByZXF1aXJlKFwiLi4vY3J5cHRvL2tlcmwva2VybFwiKTtcbnZhciBDb252ZXJ0ZXIgICAgICAgPSAgIHJlcXVpcmUoXCIuLi9jcnlwdG8vY29udmVydGVyL2NvbnZlcnRlclwiKTtcbnZhciBTaWduaW5nICAgICAgICAgPSAgIHJlcXVpcmUoXCIuLi9jcnlwdG8vc2lnbmluZy9zaWduaW5nXCIpO1xudmFyIENyeXB0b0pTICAgICAgICA9ICAgcmVxdWlyZShcImNyeXB0by1qc1wiKTtcbnZhciBhc2NpaSAgICAgICAgICAgPSAgIHJlcXVpcmUoXCIuL2FzY2lpVG9Ucnl0ZXNcIik7XG52YXIgZXh0cmFjdEpzb24gICAgID0gICByZXF1aXJlKFwiLi9leHRyYWN0SnNvblwiKTtcblxuXG4vKipcbiogICBUYWJsZSBvZiBJT1RBIFVuaXRzIGJhc2VkIG9mZiBvZiB0aGUgc3RhbmRhcmQgU3lzdGVtIG9mIFVuaXRzXG4qKi9cbnZhciB1bml0TWFwID0ge1xuICAgICdpJyAgIDogICAxLFxuICAgICdLaScgIDogICAxMDAwLFxuICAgICdNaScgIDogICAxMDAwMDAwLFxuICAgICdHaScgIDogICAxMDAwMDAwMDAwLFxuICAgICdUaScgIDogICAxMDAwMDAwMDAwMDAwLFxuICAgICdQaScgIDogICAxMDAwMDAwMDAwMDAwMDAwICAvLyBGb3IgdGhlIHZlcnksIHZlcnkgcmljaFxufVxuXG4vKipcbiogICBjb252ZXJ0cyBJT1RBIHVuaXRzXG4qXG4qICAgQG1ldGhvZCBjb252ZXJ0VW5pdHNcbiogICBAcGFyYW0ge3N0cmluZyB8fCBpbnQgfHwgZmxvYXR9IHZhbHVlXG4qICAgQHBhcmFtIHtzdHJpbmd9IGZyb21Vbml0XG4qICAgQHBhcmFtIHtzdHJpbmd9IHRvVW5pdFxuKiAgIEByZXR1cm5zIHtpbnRlZ2VyfSBjb252ZXJ0ZWRcbioqL1xudmFyIGNvbnZlcnRVbml0cyA9IGZ1bmN0aW9uKHZhbHVlLCBmcm9tVW5pdCwgdG9Vbml0KSB7XG5cbiAgICAvLyBDaGVjayBpZiB3cm9uZyB1bml0IHByb3ZpZGVkXG4gICAgaWYgKHVuaXRNYXBbZnJvbVVuaXRdID09PSB1bmRlZmluZWQgfHwgdW5pdE1hcFt0b1VuaXRdID09PSB1bmRlZmluZWQpIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHVuaXQgcHJvdmlkZWRcIik7XG4gICAgfVxuXG4gICAgdmFyIGFmdGVyQ29tbWEgPSBTdHJpbmcodmFsdWUpLm1hdGNoKC9cXC4oW1xcZF0rKSQvKTtcblxuICAgIGlmIChhZnRlckNvbW1hICYmIGFmdGVyQ29tbWFbMV0ubGVuZ3RoID4gU3RyaW5nKHVuaXRNYXBbZnJvbVVuaXRdKS5sZW5ndGggLSAxKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVG9vIG1hbnkgZGlnaXRzIGFmdGVyIGNvbW1hXCIpO1xuICAgIH1cblxuICAgIC8vIElmIG5vdCB2YWxpZCB2YWx1ZSwgdGhyb3cgZXJyb3JcbiAgICBpZiAoIWlucHV0VmFsaWRhdG9yLmlzTnVtKHZhbHVlKSkge1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWVcIik7XG4gICAgfVxuXG5cbiAgICB2YXIgZmxvYXRWYWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuXG4gICAgdmFyIGNvbnZlcnRlZCA9IChmbG9hdFZhbHVlICogdW5pdE1hcFtmcm9tVW5pdF0pIC8gdW5pdE1hcFt0b1VuaXRdO1xuXG4gICAgcmV0dXJuIGNvbnZlcnRlZDtcbn1cblxuLyoqXG4qICAgR2VuZXJhdGVzIHRoZSA5LXRyeXRlIGNoZWNrc3VtIG9mIGFuIGFkZHJlc3NcbipcbiogICBAbWV0aG9kIGFkZENoZWNrc3VtXG4qICAgQHBhcmFtIHtzdHJpbmcgfCBsaXN0fSBpbnB1dFZhbHVlXG4qICAgQHBhcmFtIHtpbnR9IGNoZWNrc3VtTGVuZ3RoXG5AICAgQHBhcmFtIHtib29sfSBpc0FkZHJlc3MgZGVmYXVsdCBpcyB0cnVlXG4qICAgQHJldHVybnMge3N0cmluZyB8IGxpc3R9IGFkZHJlc3MgKHdpdGggY2hlY2tzdW0pXG4qKi9cbnZhciBhZGRDaGVja3N1bSA9IGZ1bmN0aW9uKGlucHV0VmFsdWUsIGNoZWNrc3VtTGVuZ3RoLCBpc0FkZHJlc3MpIHtcblxuICAgIC8vIGNoZWNrc3VtIGxlbmd0aCBpcyBlaXRoZXIgdXNlciBkZWZpbmVkLCBvciA5IHRyeXRlc1xuICAgIHZhciBjaGVja3N1bUxlbmd0aCA9IGNoZWNrc3VtTGVuZ3RoIHx8IDk7XG4gICAgdmFyIGlzQWRkcmVzcyA9IChpc0FkZHJlc3MgIT09IGZhbHNlKTtcblxuICAgIC8vIHRoZSBsZW5ndGggb2YgdGhlIHRyeXRlcyB0byBiZSB2YWxpZGF0ZWRcbiAgICB2YXIgdmFsaWRhdGlvbkxlbmd0aCA9IGlzQWRkcmVzcyA/IDgxIDogbnVsbDtcblxuICAgIHZhciBpc1NpbmdsZUlucHV0ID0gaW5wdXRWYWxpZGF0b3IuaXNTdHJpbmcoIGlucHV0VmFsdWUgKTtcblxuICAgIC8vIElmIG9ubHkgc2luZ2xlIGFkZHJlc3MsIHR1cm4gaXQgaW50byBhbiBhcnJheVxuICAgIGlmICggaXNTaW5nbGVJbnB1dCApIGlucHV0VmFsdWUgPSBuZXcgQXJyYXkoIGlucHV0VmFsdWUgKTtcblxuICAgIHZhciBpbnB1dHNXaXRoQ2hlY2tzdW0gPSBbXTtcblxuICAgIGlucHV0VmFsdWUuZm9yRWFjaChmdW5jdGlvbih0aGlzVmFsdWUpIHtcblxuICAgICAgICAvLyBjaGVjayBpZiBjb3JyZWN0IHRyeXRlc1xuICAgICAgICBpZiAoIWlucHV0VmFsaWRhdG9yLmlzVHJ5dGVzKHRoaXNWYWx1ZSwgdmFsaWRhdGlvbkxlbmd0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW5wdXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2VybCA9IG5ldyBLZXJsKCk7XG4gICAgICAgIGtlcmwuaW5pdGlhbGl6ZSgpO1xuXG4gICAgICAgIC8vIEFkZHJlc3MgdHJpdHNcbiAgICAgICAgdmFyIGFkZHJlc3NUcml0cyA9IENvbnZlcnRlci50cml0cyh0aGlzVmFsdWUpO1xuXG4gICAgICAgIC8vIENoZWNrc3VtIHRyaXRzXG4gICAgICAgIHZhciBjaGVja3N1bVRyaXRzID0gW107XG5cbiAgICAgICAgLy8gQWJzb3JiIGFkZHJlc3MgdHJpdHNcbiAgICAgICAga2VybC5hYnNvcmIoYWRkcmVzc1RyaXRzLCAwLCBhZGRyZXNzVHJpdHMubGVuZ3RoKTtcblxuICAgICAgICAvLyBTcXVlZXplIGNoZWNrc3VtIHRyaXRzXG4gICAgICAgIGtlcmwuc3F1ZWV6ZShjaGVja3N1bVRyaXRzLCAwLCBDdXJsLkhBU0hfTEVOR1RIKTtcblxuICAgICAgICAvLyBGaXJzdCA5IHRyeXRlcyBhcyBjaGVja3N1bVxuICAgICAgICB2YXIgY2hlY2tzdW0gPSBDb252ZXJ0ZXIudHJ5dGVzKCBjaGVja3N1bVRyaXRzICkuc3Vic3RyaW5nKCA4MSAtIGNoZWNrc3VtTGVuZ3RoLCA4MSApO1xuICAgICAgICBpbnB1dHNXaXRoQ2hlY2tzdW0ucHVzaCggdGhpc1ZhbHVlICsgY2hlY2tzdW0gKTtcbiAgICB9KTtcblxuICAgIGlmIChpc1NpbmdsZUlucHV0KSB7XG5cbiAgICAgICAgcmV0dXJuIGlucHV0c1dpdGhDaGVja3N1bVsgMCBdO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXR1cm4gaW5wdXRzV2l0aENoZWNrc3VtO1xuXG4gICAgfVxufVxuXG4vKipcbiogICBSZW1vdmVzIHRoZSA5LXRyeXRlIGNoZWNrc3VtIG9mIGFuIGFkZHJlc3NcbipcbiogICBAbWV0aG9kIG5vQ2hlY2tzdW1cbiogICBAcGFyYW0ge3N0cmluZyB8IGxpc3R9IGFkZHJlc3NcbiogICBAcmV0dXJucyB7c3RyaW5nIHwgbGlzdH0gYWRkcmVzcyAod2l0aG91dCBjaGVja3N1bSlcbioqL1xudmFyIG5vQ2hlY2tzdW0gPSBmdW5jdGlvbihhZGRyZXNzKSB7XG5cbiAgICB2YXIgaXNTaW5nbGVBZGRyZXNzID0gaW5wdXRWYWxpZGF0b3IuaXNTdHJpbmcoYWRkcmVzcylcblxuICAgIC8vIElmIG9ubHkgc2luZ2xlIGFkZHJlc3MsIHR1cm4gaXQgaW50byBhbiBhcnJheVxuICAgIGlmIChpc1NpbmdsZUFkZHJlc3MpIGFkZHJlc3MgPSBuZXcgQXJyYXkoYWRkcmVzcyk7XG5cbiAgICB2YXIgYWRkcmVzc2VzV2l0aENoZWNrc3VtID0gW107XG5cbiAgICBhZGRyZXNzLmZvckVhY2goZnVuY3Rpb24odGhpc0FkZHJlc3MpIHtcbiAgICAgICAgYWRkcmVzc2VzV2l0aENoZWNrc3VtLnB1c2godGhpc0FkZHJlc3Muc2xpY2UoMCwgODEpKVxuICAgIH0pXG5cbiAgICAvLyByZXR1cm4gZWl0aGVyIHN0cmluZyBvciB0aGUgbGlzdFxuICAgIGlmIChpc1NpbmdsZUFkZHJlc3MpIHtcblxuICAgICAgICByZXR1cm4gYWRkcmVzc2VzV2l0aENoZWNrc3VtWzBdO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXR1cm4gYWRkcmVzc2VzV2l0aENoZWNrc3VtO1xuXG4gICAgfVxufVxuXG4vKipcbiogICBWYWxpZGF0ZXMgdGhlIGNoZWNrc3VtIG9mIGFuIGFkZHJlc3NcbipcbiogICBAbWV0aG9kIGlzVmFsaWRDaGVja3N1bVxuKiAgIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzV2l0aENoZWNrc3VtXG4qICAgQHJldHVybnMge2Jvb2x9XG4qKi9cbnZhciBpc1ZhbGlkQ2hlY2tzdW0gPSBmdW5jdGlvbihhZGRyZXNzV2l0aENoZWNrc3VtKSB7XG5cbiAgICB2YXIgYWRkcmVzc1dpdGhvdXRDaGVja3N1bSA9IG5vQ2hlY2tzdW0oYWRkcmVzc1dpdGhDaGVja3N1bSk7XG5cbiAgICB2YXIgbmV3Q2hlY2tzdW0gPSBhZGRDaGVja3N1bShhZGRyZXNzV2l0aG91dENoZWNrc3VtKTtcblxuICAgIHJldHVybiBuZXdDaGVja3N1bSA9PT0gYWRkcmVzc1dpdGhDaGVja3N1bTtcbn1cblxuLyoqXG4qICAgQ29udmVydHMgdHJhbnNhY3Rpb24gdHJ5dGVzIG9mIDI2NzMgdHJ5dGVzIGludG8gYSB0cmFuc2FjdGlvbiBvYmplY3RcbipcbiogICBAbWV0aG9kIHRyYW5zYWN0aW9uT2JqZWN0XG4qICAgQHBhcmFtIHtzdHJpbmd9IHRyeXRlc1xuKiAgIEByZXR1cm5zIHtTdHJpbmd9IHRyYW5zYWN0aW9uT2JqZWN0XG4qKi9cbnZhciB0cmFuc2FjdGlvbk9iamVjdCA9IGZ1bmN0aW9uKHRyeXRlcykge1xuXG4gICAgaWYgKCF0cnl0ZXMpIHJldHVybjtcblxuICAgIC8vIHZhbGlkaXR5IGNoZWNrXG4gICAgZm9yICh2YXIgaSA9IDIyNzk7IGkgPCAyMjk1OyBpKyspIHtcblxuICAgICAgICBpZiAodHJ5dGVzLmNoYXJBdChpKSAhPT0gXCI5XCIpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB0aGlzVHJhbnNhY3Rpb24gPSB7fTtcbiAgICB2YXIgdHJhbnNhY3Rpb25Ucml0cyA9IENvbnZlcnRlci50cml0cyh0cnl0ZXMpO1xuICAgIHZhciBoYXNoID0gW107XG5cbiAgICB2YXIgY3VybCA9IG5ldyBDdXJsKCk7XG5cbiAgICAvLyBnZW5lcmF0ZSB0aGUgY29ycmVjdCB0cmFuc2FjdGlvbiBoYXNoXG4gICAgY3VybC5pbml0aWFsaXplKCk7XG4gICAgY3VybC5hYnNvcmIodHJhbnNhY3Rpb25Ucml0cywgMCwgdHJhbnNhY3Rpb25Ucml0cy5sZW5ndGgpO1xuICAgIGN1cmwuc3F1ZWV6ZShoYXNoLCAwLCAyNDMpO1xuXG4gICAgdGhpc1RyYW5zYWN0aW9uLmhhc2ggPSBDb252ZXJ0ZXIudHJ5dGVzKGhhc2gpO1xuICAgIHRoaXNUcmFuc2FjdGlvbi5zaWduYXR1cmVNZXNzYWdlRnJhZ21lbnQgPSB0cnl0ZXMuc2xpY2UoMCwgMjE4Nyk7XG4gICAgdGhpc1RyYW5zYWN0aW9uLmFkZHJlc3MgPSB0cnl0ZXMuc2xpY2UoMjE4NywgMjI2OCk7XG4gICAgdGhpc1RyYW5zYWN0aW9uLnZhbHVlID0gQ29udmVydGVyLnZhbHVlKHRyYW5zYWN0aW9uVHJpdHMuc2xpY2UoNjgwNCwgNjgzNykpO1xuICAgIHRoaXNUcmFuc2FjdGlvbi5vYnNvbGV0ZVRhZyA9IHRyeXRlcy5zbGljZSgyMjk1LCAyMzIyKTtcbiAgICB0aGlzVHJhbnNhY3Rpb24udGltZXN0YW1wID0gQ29udmVydGVyLnZhbHVlKHRyYW5zYWN0aW9uVHJpdHMuc2xpY2UoNjk2NiwgNjk5MykpO1xuICAgIHRoaXNUcmFuc2FjdGlvbi5jdXJyZW50SW5kZXggPSBDb252ZXJ0ZXIudmFsdWUodHJhbnNhY3Rpb25Ucml0cy5zbGljZSg2OTkzLCA3MDIwKSk7XG4gICAgdGhpc1RyYW5zYWN0aW9uLmxhc3RJbmRleCA9IENvbnZlcnRlci52YWx1ZSh0cmFuc2FjdGlvblRyaXRzLnNsaWNlKDcwMjAsIDcwNDcpKTtcbiAgICB0aGlzVHJhbnNhY3Rpb24uYnVuZGxlID0gdHJ5dGVzLnNsaWNlKDIzNDksIDI0MzApO1xuICAgIHRoaXNUcmFuc2FjdGlvbi50cnVua1RyYW5zYWN0aW9uID0gdHJ5dGVzLnNsaWNlKDI0MzAsIDI1MTEpO1xuICAgIHRoaXNUcmFuc2FjdGlvbi5icmFuY2hUcmFuc2FjdGlvbiA9IHRyeXRlcy5zbGljZSgyNTExLCAyNTkyKTtcblxuICAgIHRoaXNUcmFuc2FjdGlvbi50YWcgPSB0cnl0ZXMuc2xpY2UoMjU5MiwgMjYxOSk7XG4gICAgdGhpc1RyYW5zYWN0aW9uLmF0dGFjaG1lbnRUaW1lc3RhbXAgPSBDb252ZXJ0ZXIudmFsdWUodHJhbnNhY3Rpb25Ucml0cy5zbGljZSg3ODU3LCA3ODg0KSk7XG4gICAgdGhpc1RyYW5zYWN0aW9uLmF0dGFjaG1lbnRUaW1lc3RhbXBMb3dlckJvdW5kID0gQ29udmVydGVyLnZhbHVlKHRyYW5zYWN0aW9uVHJpdHMuc2xpY2UoNzg4NCwgNzkxMSkpO1xuICAgIHRoaXNUcmFuc2FjdGlvbi5hdHRhY2htZW50VGltZXN0YW1wVXBwZXJCb3VuZCA9IENvbnZlcnRlci52YWx1ZSh0cmFuc2FjdGlvblRyaXRzLnNsaWNlKDc5MTEsIDc5MzgpKTtcbiAgICB0aGlzVHJhbnNhY3Rpb24ubm9uY2UgPSB0cnl0ZXMuc2xpY2UoMjY0NiwgMjY3Myk7XG5cbiAgICByZXR1cm4gdGhpc1RyYW5zYWN0aW9uO1xufVxuXG4vKipcbiogICBDb252ZXJ0cyBhIHRyYW5zYWN0aW9uIG9iamVjdCBpbnRvIHRyeXRlc1xuKlxuKiAgIEBtZXRob2QgdHJhbnNhY3Rpb25Ucnl0ZXNcbiogICBAcGFyYW0ge29iamVjdH0gdHJhbnNhY3Rpb25Ucnl0ZXNcbiogICBAcmV0dXJucyB7U3RyaW5nfSB0cnl0ZXNcbioqL1xudmFyIHRyYW5zYWN0aW9uVHJ5dGVzID0gZnVuY3Rpb24odHJhbnNhY3Rpb24pIHtcblxuICAgIHZhciB2YWx1ZVRyaXRzID0gQ29udmVydGVyLnRyaXRzKHRyYW5zYWN0aW9uLnZhbHVlKTtcbiAgICB3aGlsZSAodmFsdWVUcml0cy5sZW5ndGggPCA4MSkge1xuICAgICAgICB2YWx1ZVRyaXRzW3ZhbHVlVHJpdHMubGVuZ3RoXSA9IDA7XG4gICAgfVxuXG4gICAgdmFyIHRpbWVzdGFtcFRyaXRzID0gQ29udmVydGVyLnRyaXRzKHRyYW5zYWN0aW9uLnRpbWVzdGFtcCk7XG4gICAgd2hpbGUgKHRpbWVzdGFtcFRyaXRzLmxlbmd0aCA8IDI3KSB7XG4gICAgICAgIHRpbWVzdGFtcFRyaXRzW3RpbWVzdGFtcFRyaXRzLmxlbmd0aF0gPSAwO1xuICAgIH1cblxuICAgIHZhciBjdXJyZW50SW5kZXhUcml0cyA9IENvbnZlcnRlci50cml0cyh0cmFuc2FjdGlvbi5jdXJyZW50SW5kZXgpO1xuICAgIHdoaWxlIChjdXJyZW50SW5kZXhUcml0cy5sZW5ndGggPCAyNykge1xuICAgICAgICBjdXJyZW50SW5kZXhUcml0c1tjdXJyZW50SW5kZXhUcml0cy5sZW5ndGhdID0gMDtcbiAgICB9XG5cbiAgICB2YXIgbGFzdEluZGV4VHJpdHMgPSBDb252ZXJ0ZXIudHJpdHModHJhbnNhY3Rpb24ubGFzdEluZGV4KTtcbiAgICB3aGlsZSAobGFzdEluZGV4VHJpdHMubGVuZ3RoIDwgMjcpIHtcbiAgICAgICAgbGFzdEluZGV4VHJpdHNbbGFzdEluZGV4VHJpdHMubGVuZ3RoXSA9IDA7XG4gICAgfVxuXG4gICAgdmFyIGF0dGFjaG1lbnRUaW1lc3RhbXBUcml0cyA9IENvbnZlcnRlci50cml0cyh0cmFuc2FjdGlvbi5hdHRhY2htZW50VGltZXN0YW1wIHx8IDApO1xuICAgIHdoaWxlIChhdHRhY2htZW50VGltZXN0YW1wVHJpdHMubGVuZ3RoIDwgMjcpIHtcbiAgICAgICAgYXR0YWNobWVudFRpbWVzdGFtcFRyaXRzW2F0dGFjaG1lbnRUaW1lc3RhbXBUcml0cy5sZW5ndGhdID0gMDtcbiAgICB9XG5cbiAgICB2YXIgYXR0YWNobWVudFRpbWVzdGFtcExvd2VyQm91bmRUcml0cyA9IENvbnZlcnRlci50cml0cyh0cmFuc2FjdGlvbi5hdHRhY2htZW50VGltZXN0YW1wTG93ZXJCb3VuZCB8fCAwKTtcbiAgICB3aGlsZSAoYXR0YWNobWVudFRpbWVzdGFtcExvd2VyQm91bmRUcml0cy5sZW5ndGggPCAyNykge1xuICAgICAgICBhdHRhY2htZW50VGltZXN0YW1wTG93ZXJCb3VuZFRyaXRzW2F0dGFjaG1lbnRUaW1lc3RhbXBMb3dlckJvdW5kVHJpdHMubGVuZ3RoXSA9IDA7XG4gICAgfVxuXG4gICAgdmFyIGF0dGFjaG1lbnRUaW1lc3RhbXBVcHBlckJvdW5kVHJpdHMgPSBDb252ZXJ0ZXIudHJpdHModHJhbnNhY3Rpb24uYXR0YWNobWVudFRpbWVzdGFtcFVwcGVyQm91bmQgfHwgMCk7XG4gICAgd2hpbGUgKGF0dGFjaG1lbnRUaW1lc3RhbXBVcHBlckJvdW5kVHJpdHMubGVuZ3RoIDwgMjcpIHtcbiAgICAgICAgYXR0YWNobWVudFRpbWVzdGFtcFVwcGVyQm91bmRUcml0c1thdHRhY2htZW50VGltZXN0YW1wVXBwZXJCb3VuZFRyaXRzLmxlbmd0aF0gPSAwO1xuICAgIH1cblxuICAgIHRyYW5zYWN0aW9uLnRhZyA9IHRyYW5zYWN0aW9uLnRhZyB8fCB0cmFuc2FjdGlvbi5vYnNvbGV0ZVRhZztcblxuICAgIHJldHVybiB0cmFuc2FjdGlvbi5zaWduYXR1cmVNZXNzYWdlRnJhZ21lbnRcbiAgICArIHRyYW5zYWN0aW9uLmFkZHJlc3NcbiAgICArIENvbnZlcnRlci50cnl0ZXModmFsdWVUcml0cylcbiAgICArIHRyYW5zYWN0aW9uLm9ic29sZXRlVGFnXG4gICAgKyBDb252ZXJ0ZXIudHJ5dGVzKHRpbWVzdGFtcFRyaXRzKVxuICAgICsgQ29udmVydGVyLnRyeXRlcyhjdXJyZW50SW5kZXhUcml0cylcbiAgICArIENvbnZlcnRlci50cnl0ZXMobGFzdEluZGV4VHJpdHMpXG4gICAgKyB0cmFuc2FjdGlvbi5idW5kbGVcbiAgICArIHRyYW5zYWN0aW9uLnRydW5rVHJhbnNhY3Rpb25cbiAgICArIHRyYW5zYWN0aW9uLmJyYW5jaFRyYW5zYWN0aW9uXG4gICAgKyB0cmFuc2FjdGlvbi50YWdcbiAgICArIENvbnZlcnRlci50cnl0ZXMoYXR0YWNobWVudFRpbWVzdGFtcFRyaXRzKVxuICAgICsgQ29udmVydGVyLnRyeXRlcyhhdHRhY2htZW50VGltZXN0YW1wTG93ZXJCb3VuZFRyaXRzKVxuICAgICsgQ29udmVydGVyLnRyeXRlcyhhdHRhY2htZW50VGltZXN0YW1wVXBwZXJCb3VuZFRyaXRzKVxuICAgICsgdHJhbnNhY3Rpb24ubm9uY2U7XG59XG5cbi8qKlxuKiAgIENhdGVnb3JpemVzIGEgbGlzdCBvZiB0cmFuc2ZlcnMgYmV0d2VlbiBzZW50IGFuZCByZWNlaXZlZFxuKlxuKiAgIEBtZXRob2QgY2F0ZWdvcml6ZVRyYW5zZmVyc1xuKiAgIEBwYXJhbSB7b2JqZWN0fSB0cmFuc2ZlcnMgVHJhbnNmZXJzIChidW5kbGVzKVxuKiAgIEBwYXJhbSB7bGlzdH0gYWRkcmVzc2VzIExpc3Qgb2YgYWRkcmVzc2VzIHRoYXQgYmVsb25nIHRvIHRoZSB1c2VyXG4qICAgQHJldHVybnMge1N0cmluZ30gdHJ5dGVzXG4qKi9cbnZhciBjYXRlZ29yaXplVHJhbnNmZXJzID0gZnVuY3Rpb24odHJhbnNmZXJzLCBhZGRyZXNzZXMpIHtcblxuICAgIHZhciBjYXRlZ29yaXplZCA9IHtcbiAgICAgICAgJ3NlbnQnICAgICAgOiBbXSxcbiAgICAgICAgJ3JlY2VpdmVkJyAgOiBbXVxuICAgIH1cblxuICAgIC8vIEl0ZXJhdGUgb3ZlciBhbGwgYnVuZGxlcyBhbmQgc29ydCB0aGVtIGJldHdlZW4gaW5jb21pbmcgYW5kIG91dGdvaW5nIHRyYW5zZmVyc1xuICAgIHRyYW5zZmVycy5mb3JFYWNoKGZ1bmN0aW9uKGJ1bmRsZSkge1xuXG4gICAgICAgIHZhciBzcGVudEFscmVhZHlBZGRlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBldmVyeSBidW5kbGUgZW50cnlcbiAgICAgICAgYnVuZGxlLmZvckVhY2goZnVuY3Rpb24oYnVuZGxlRW50cnksIGJ1bmRsZUluZGV4KSB7XG5cbiAgICAgICAgICAgIC8vIElmIGJ1bmRsZSBhZGRyZXNzIGluIHRoZSBsaXN0IG9mIGFkZHJlc3NlcyBhc3NvY2lhdGVkIHdpdGggdGhlIHNlZWRcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgYnVuZGxlIHRvIHRoZVxuICAgICAgICAgICAgaWYgKGFkZHJlc3Nlcy5pbmRleE9mKGJ1bmRsZUVudHJ5LmFkZHJlc3MpID4gLTEpIHtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGl0J3MgYSByZW1haW5kZXIgYWRkcmVzc1xuICAgICAgICAgICAgICAgIHZhciBpc1JlbWFpbmRlciA9IChidW5kbGVFbnRyeS5jdXJyZW50SW5kZXggPT09IGJ1bmRsZUVudHJ5Lmxhc3RJbmRleCkgJiYgYnVuZGxlRW50cnkubGFzdEluZGV4ICE9PSAwO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgc2VudCB0cmFuc2FjdGlvblxuICAgICAgICAgICAgICAgIGlmIChidW5kbGVFbnRyeS52YWx1ZSA8IDAgJiYgIXNwZW50QWxyZWFkeUFkZGVkICYmICFpc1JlbWFpbmRlcikge1xuXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpemVkLnNlbnQucHVzaChidW5kbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvbyBtYWtlIHN1cmUgd2UgZG8gbm90IGFkZCB0cmFuc2FjdGlvbnMgdHdpY2VcbiAgICAgICAgICAgICAgICAgICAgc3BlbnRBbHJlYWR5QWRkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiByZWNlaXZlZCB0cmFuc2FjdGlvbiwgb3IgMCB2YWx1ZSAobWVzc2FnZSlcbiAgICAgICAgICAgICAgICAvLyBhbHNvIG1ha2Ugc3VyZSB0aGF0IHRoaXMgaXMgbm90IGEgMm5kIHR4IGZvciBzcGVudCBpbnB1dHNcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChidW5kbGVFbnRyeS52YWx1ZSA+PSAwICYmICFzcGVudEFscmVhZHlBZGRlZCAmJiAhaXNSZW1haW5kZXIpIHtcblxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaXplZC5yZWNlaXZlZC5wdXNoKGJ1bmRsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICByZXR1cm4gY2F0ZWdvcml6ZWQ7XG59XG5cblxuLyoqXG4qICAgVmFsaWRhdGVzIHRoZSBzaWduYXR1cmVzXG4qXG4qICAgQG1ldGhvZCB2YWxpZGF0ZVNpZ25hdHVyZXNcbiogICBAcGFyYW0ge2FycmF5fSBzaWduZWRCdW5kbGVcbiogICBAcGFyYW0ge3N0cmluZ30gaW5wdXRBZGRyZXNzXG4qICAgQHJldHVybnMge2Jvb2x9XG4qKi9cbnZhciB2YWxpZGF0ZVNpZ25hdHVyZXMgPSBmdW5jdGlvbihzaWduZWRCdW5kbGUsIGlucHV0QWRkcmVzcykge1xuXG5cbiAgICB2YXIgYnVuZGxlSGFzaDtcbiAgICB2YXIgc2lnbmF0dXJlRnJhZ21lbnRzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ25lZEJ1bmRsZS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGlmIChzaWduZWRCdW5kbGVbaV0uYWRkcmVzcyA9PT0gaW5wdXRBZGRyZXNzKSB7XG5cbiAgICAgICAgICAgIGJ1bmRsZUhhc2ggPSBzaWduZWRCdW5kbGVbaV0uYnVuZGxlO1xuXG4gICAgICAgICAgICAvLyBpZiB3ZSByZWFjaGVkIHJlbWFpbmRlciBidW5kbGVcbiAgICAgICAgICAgIGlmIChpbnB1dFZhbGlkYXRvci5pc05pbmVzVHJ5dGVzKHNpZ25lZEJ1bmRsZVtpXS5zaWduYXR1cmVNZXNzYWdlRnJhZ21lbnQpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNpZ25hdHVyZUZyYWdtZW50cy5wdXNoKHNpZ25lZEJ1bmRsZVtpXS5zaWduYXR1cmVNZXNzYWdlRnJhZ21lbnQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWJ1bmRsZUhhc2gpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBTaWduaW5nLnZhbGlkYXRlU2lnbmF0dXJlcyhpbnB1dEFkZHJlc3MsIHNpZ25hdHVyZUZyYWdtZW50cywgYnVuZGxlSGFzaCk7XG59XG5cblxuLyoqXG4qICAgQ2hlY2tzIGlzIGEgQnVuZGxlIGlzIHZhbGlkLiBWYWxpZGF0ZXMgc2lnbmF0dXJlcyBhbmQgb3ZlcmFsbCBzdHJ1Y3R1cmUuIEhhcyB0byBiZSB0YWlsIHR4IGZpcnN0LlxuKlxuKiAgIEBtZXRob2QgaXNWYWxpZEJ1bmRsZVxuKiAgIEBwYXJhbSB7YXJyYXl9IGJ1bmRsZVxuKiAgIEByZXR1cm5zIHtib29sfSB2YWxpZFxuKiovXG52YXIgaXNCdW5kbGUgPSBmdW5jdGlvbihidW5kbGUpIHtcblxuICAgIC8vIElmIG5vdCBjb3JyZWN0IGJ1bmRsZVxuICAgIGlmICghaW5wdXRWYWxpZGF0b3IuaXNBcnJheU9mVHhPYmplY3RzKGJ1bmRsZSkpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciB0b3RhbFN1bSA9IDAsIGxhc3RJbmRleCwgYnVuZGxlSGFzaCA9IGJ1bmRsZVswXS5idW5kbGU7XG5cbiAgICAvLyBQcmVwYXJlIHRvIGFic29yYiB0eHMgYW5kIGdldCBidW5kbGVIYXNoXG4gICAgdmFyIGJ1bmRsZUZyb21UeHMgPSBbXTtcblxuICAgIHZhciBrZXJsID0gbmV3IEtlcmwoKTtcbiAgICBrZXJsLmluaXRpYWxpemUoKTtcblxuICAgIC8vIFByZXBhcmUgZm9yIHNpZ25hdHVyZSB2YWxpZGF0aW9uXG4gICAgdmFyIHNpZ25hdHVyZXNUb1ZhbGlkYXRlID0gW107XG5cbiAgICBidW5kbGUuZm9yRWFjaChmdW5jdGlvbihidW5kbGVUeCwgaW5kZXgpIHtcblxuICAgICAgICB0b3RhbFN1bSArPSBidW5kbGVUeC52YWx1ZTtcblxuICAgICAgICAvLyBjdXJyZW50SW5kZXggaGFzIHRvIGJlIGVxdWFsIHRvIHRoZSBpbmRleCBpbiB0aGUgYXJyYXlcbiAgICAgICAgaWYgKGJ1bmRsZVR4LmN1cnJlbnRJbmRleCAhPT0gaW5kZXgpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvLyBHZXQgdGhlIHRyYW5zYWN0aW9uIHRyeXRlc1xuICAgICAgICB2YXIgdGhpc1R4VHJ5dGVzID0gdHJhbnNhY3Rpb25Ucnl0ZXMoYnVuZGxlVHgpO1xuXG4gICAgICAgIC8vIEFic29yYiBidW5kbGUgaGFzaCArIHZhbHVlICsgdGltZXN0YW1wICsgbGFzdEluZGV4ICsgY3VycmVudEluZGV4IHRyeXRlcy5cbiAgICAgICAgdmFyIHRoaXNUeFRyaXRzID0gQ29udmVydGVyLnRyaXRzKHRoaXNUeFRyeXRlcy5zbGljZSgyMTg3LCAyMTg3ICsgMTYyKSk7XG4gICAgICAgIGtlcmwuYWJzb3JiKHRoaXNUeFRyaXRzLCAwLCB0aGlzVHhUcml0cy5sZW5ndGgpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGlucHV0IHRyYW5zYWN0aW9uXG4gICAgICAgIGlmIChidW5kbGVUeC52YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHZhciB0aGlzQWRkcmVzcyA9IGJ1bmRsZVR4LmFkZHJlc3M7XG5cbiAgICAgICAgICAgIHZhciBuZXdTaWduYXR1cmVUb1ZhbGlkYXRlID0ge1xuICAgICAgICAgICAgICAgICdhZGRyZXNzJzogdGhpc0FkZHJlc3MsXG4gICAgICAgICAgICAgICAgJ3NpZ25hdHVyZUZyYWdtZW50cyc6IEFycmF5KGJ1bmRsZVR4LnNpZ25hdHVyZU1lc3NhZ2VGcmFnbWVudClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRmluZCB0aGUgc3Vic2VxdWVudCB0eHMgd2l0aCB0aGUgcmVtYWluaW5nIHNpZ25hdHVyZSBmcmFnbWVudFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGluZGV4OyBpIDwgYnVuZGxlLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBuZXdCdW5kbGVUeCA9IGJ1bmRsZVtpICsgMV07XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBuZXcgdHggaXMgcGFydCBvZiB0aGUgc2lnbmF0dXJlIGZyYWdtZW50XG4gICAgICAgICAgICAgICAgaWYgKG5ld0J1bmRsZVR4LmFkZHJlc3MgPT09IHRoaXNBZGRyZXNzICYmIG5ld0J1bmRsZVR4LnZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1NpZ25hdHVyZVRvVmFsaWRhdGUuc2lnbmF0dXJlRnJhZ21lbnRzLnB1c2gobmV3QnVuZGxlVHguc2lnbmF0dXJlTWVzc2FnZUZyYWdtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNpZ25hdHVyZXNUb1ZhbGlkYXRlLnB1c2gobmV3U2lnbmF0dXJlVG9WYWxpZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENoZWNrIGZvciB0b3RhbCBzdW0sIGlmIG5vdCBlcXVhbCAwIHJldHVybiBlcnJvclxuICAgIGlmICh0b3RhbFN1bSAhPT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gZ2V0IHRoZSBidW5kbGUgaGFzaCBmcm9tIHRoZSBidW5kbGUgdHJhbnNhY3Rpb25zXG4gICAga2VybC5zcXVlZXplKGJ1bmRsZUZyb21UeHMsIDAsIEN1cmwuSEFTSF9MRU5HVEgpO1xuICAgIHZhciBidW5kbGVGcm9tVHhzID0gQ29udmVydGVyLnRyeXRlcyhidW5kbGVGcm9tVHhzKTtcblxuICAgIC8vIENoZWNrIGlmIGJ1bmRsZSBoYXNoIGlzIHRoZSBzYW1lIGFzIHJldHVybmVkIGJ5IHR4IG9iamVjdFxuICAgIGlmIChidW5kbGVGcm9tVHhzICE9PSBidW5kbGVIYXNoKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBMYXN0IHR4IGluIHRoZSBidW5kbGUgc2hvdWxkIGhhdmUgY3VycmVudEluZGV4ID09PSBsYXN0SW5kZXhcbiAgICBpZiAoYnVuZGxlW2J1bmRsZS5sZW5ndGggLSAxXS5jdXJyZW50SW5kZXggIT09IGJ1bmRsZVtidW5kbGUubGVuZ3RoIC0gMV0ubGFzdEluZGV4KSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBWYWxpZGF0ZSB0aGUgc2lnbmF0dXJlc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnbmF0dXJlc1RvVmFsaWRhdGUubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgaXNWYWxpZFNpZ25hdHVyZSA9IFNpZ25pbmcudmFsaWRhdGVTaWduYXR1cmVzKHNpZ25hdHVyZXNUb1ZhbGlkYXRlW2ldLmFkZHJlc3MsIHNpZ25hdHVyZXNUb1ZhbGlkYXRlW2ldLnNpZ25hdHVyZUZyYWdtZW50cywgYnVuZGxlSGFzaCk7XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkU2lnbmF0dXJlKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGlucHV0VmFsaWRhdG9yICAgICAgOiBpbnB1dFZhbGlkYXRvciwgICAgXG4gICAgY29udmVydFVuaXRzICAgICAgICA6IGNvbnZlcnRVbml0cyxcbiAgICBhZGRDaGVja3N1bSAgICAgICAgIDogYWRkQ2hlY2tzdW0sXG4gICAgbm9DaGVja3N1bSAgICAgICAgICA6IG5vQ2hlY2tzdW0sXG4gICAgaXNWYWxpZENoZWNrc3VtICAgICA6IGlzVmFsaWRDaGVja3N1bSxcbiAgICB0cmFuc2FjdGlvbk9iamVjdCAgIDogdHJhbnNhY3Rpb25PYmplY3QsXG4gICAgdHJhbnNhY3Rpb25Ucnl0ZXMgICA6IHRyYW5zYWN0aW9uVHJ5dGVzLFxuICAgIGNhdGVnb3JpemVUcmFuc2ZlcnMgOiBjYXRlZ29yaXplVHJhbnNmZXJzLFxuICAgIHRvVHJ5dGVzICAgICAgICAgICAgOiBhc2NpaS50b1RyeXRlcyxcbiAgICBmcm9tVHJ5dGVzICAgICAgICAgIDogYXNjaWkuZnJvbVRyeXRlcyxcbiAgICBleHRyYWN0SnNvbiAgICAgICAgIDogZXh0cmFjdEpzb24sXG4gICAgdmFsaWRhdGVTaWduYXR1cmVzICA6IHZhbGlkYXRlU2lnbmF0dXJlcyxcbiAgICBpc0J1bmRsZSAgICAgICAgICAgIDogaXNCdW5kbGVcbn1cbiIsImNvbnN0IGluaXRHTCA9IHJlcXVpcmUoJy4vaW5pdEdMJyk7XG5jb25zdCBuZXdCdWZmZXIgPSByZXF1aXJlKCcuL25ld0J1ZmZlcicpO1xuY29uc3QgY3JlYXRlVGV4dHVyZSA9IHJlcXVpcmUoJy4vdGV4dHVyZScpO1xuY29uc3QgU2hhZGVyQ29kZSA9IHJlcXVpcmUoJy4vc2hhZGVyY29kZScpO1xuXG5mdW5jdGlvbiBfZnJhbWVCdWZmZXJTZXRUZXh0dXJlIChnbCwgZmJvLCBuVGV4dHVyZSwgZGltKSB7XG4gIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgZmJvKTtcbiAgLy8gVHlwZXMgYXJyYXlzIHNwZWVkIHRoaXMgdXAgdHJlbWVuZG91c2x5LlxuICAvL3ZhciBuVGV4dHVyZSA9IGNyZWF0ZVRleHR1cmUoZ2wsIG5ldyBJbnQzMkFycmF5KGxlbmd0aCksIGRpbSk7XG5cbiAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGdsLkNPTE9SX0FUVEFDSE1FTlQwLCBnbC5URVhUVVJFXzJELCBuVGV4dHVyZSwgMCk7XG5cbiAgLy8gVGVzdCBmb3IgbW9iaWxlIGJ1ZyBNRE4tPldlYkdMX2Jlc3RfcHJhY3RpY2VzLCBidWxsZXQgN1xuICB2YXIgZnJhbWVCdWZmZXJTdGF0dXMgPSAoZ2wuY2hlY2tGcmFtZWJ1ZmZlclN0YXR1cyhnbC5GUkFNRUJVRkZFUikgPT0gZ2wuRlJBTUVCVUZGRVJfQ09NUExFVEUpO1xuXG4gIGlmICghZnJhbWVCdWZmZXJTdGF0dXMpXG4gICAgdGhyb3cgbmV3IEVycm9yKCd0dXJib2pzOiBFcnJvciBhdHRhY2hpbmcgZmxvYXQgdGV4dHVyZSB0byBmcmFtZWJ1ZmZlci4gWW91ciBkZXZpY2UgaXMgcHJvYmFibHkgaW5jb21wYXRpYmxlLiBFcnJvciBpbmZvOiAnICsgZnJhbWVCdWZmZXJTdGF0dXMubWVzc2FnZSk7XG59XG5mdW5jdGlvbiBhbGxvYyAoc3opIHtcbiAgLy8gQSBzYW5lIGxpbWl0IGZvciBtb3N0IEdQVXMgb3V0IHRoZXJlLlxuICAvLyBKUyBmYWxscyBhcGFydCBiZWZvcmUgR0xTTCBsaW1pdHMgY291bGQgZXZlciBiZSByZWFjaGVkLlxuXG4gIHZhciBucyA9IE1hdGgucG93KE1hdGgucG93KDIsIE1hdGguY2VpbChNYXRoLmxvZyhzeikgLyAxLjM4NikgLSAxKSwgMik7XG4gIHJldHVybiB7XG4gICAgLy9kYXRhIDogbmV3IEludDMyQXJyYXkobnMgKiAxNiksXG4gICAgZGF0YSA6IG5ldyBJbnQzMkFycmF5KHN6KSxcbiAgICBsZW5ndGggOiBzelxuICB9O1xufVxuY29uc3QgX2JpbmRCdWZmZXJzID0gKGdsLCBidWZmZXJzLCBhdHRyaWIpID0+IHtcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcnMudGV4dHVyZSk7XG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHJpYi50ZXh0dXJlKTtcbiAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihhdHRyaWIudGV4dHVyZSwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcnMucG9zaXRpb24pO1xuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyaWIucG9zaXRpb24pO1xuICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHJpYi5wb3NpdGlvbiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgYnVmZmVycy5pbmRleCk7XG59XG5jb25zdCBfY3JlYXRlVmVydGV4U2hhZGVyID0gKGdsKSA9PiB7XG4gIHZhciB2ZXJ0ZXhTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gIGdsLnNoYWRlclNvdXJjZSh2ZXJ0ZXhTaGFkZXIsIFNoYWRlckNvZGUudmVydGV4U2hhZGVyQ29kZSk7XG4gIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcblxuICAvLyBUaGlzIHNob3VsZCBub3QgZmFpbC5cbiAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodmVydGV4U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJcXG50dXJib2pzOiBDb3VsZCBub3QgYnVpbGQgaW50ZXJuYWwgdmVydGV4IHNoYWRlciAoZmF0YWwpLlxcblwiICsgXCJcXG5cIiArXG4gICAgICBcIklORk86ID5SRVBPUlQ8IFRISVMuIFRoYXQncyBvdXIgZmF1bHQhXFxuXCIgKyBcIlxcblwiICtcbiAgICAgIFwiLS0tIENPREUgRFVNUCAtLS1cXG5cIiArIFNoYWRlckNvZGUudmVydGV4U2hhZGVyQ29kZSArIFwiXFxuXFxuXCIgK1xuICAgICAgXCItLS0gRVJST1IgTE9HIC0tLVxcblwiICsgZ2wuZ2V0U2hhZGVySW5mb0xvZyh2ZXJ0ZXhTaGFkZXIpXG4gICAgKTtcbiAgcmV0dXJuIHZlcnRleFNoYWRlcjtcbn1cbmNvbnN0IF9jcmVhdGVGcmFnbWVudFNoYWRlciA9IChnbCwgY29kZSkgPT4ge1xuICB2YXIgZnJhZ21lbnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcblxuICBnbC5zaGFkZXJTb3VyY2UoZnJhZ21lbnRTaGFkZXIsIFNoYWRlckNvZGUuc3RkbGliICsgY29kZSk7XG5cbiAgZ2wuY29tcGlsZVNoYWRlcihmcmFnbWVudFNoYWRlcik7XG4gIC8vIFVzZSB0aGlzIG91dHB1dCB0byBkZWJ1ZyB0aGUgc2hhZGVyXG4gIC8vIEtlZXAgaW4gbWluZCB0aGF0IFdlYkdMIEdMU0wgaXMgKiptdWNoKiogc3RyaWN0ZXIgdGhhbiBlLmcuIE9wZW5HTCBHTFNMXG4gIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZyYWdtZW50U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICB2YXIgTE9DID0gY29kZS5zcGxpdCgnXFxuJyk7XG4gICAgdmFyIGRiZ01zZyA9IFwiRVJST1I6IENvdWxkIG5vdCBidWlsZCBzaGFkZXIgKGZhdGFsKS5cXG5cXG4tLS0tLS0tLS0tLS0tLS0tLS0gS0VSTkVMIENPREUgRFVNUCAtLS0tLS0tLS0tLS0tLS0tLS1cXG5cIlxuXG4gICAgZm9yICh2YXIgbmwgPSAwOyBubCA8IExPQy5sZW5ndGg7IG5sKyspXG4gICAgICBkYmdNc2cgKz0gKFNoYWRlckNvZGUuc3RkbGliLnNwbGl0KCdcXG4nKS5sZW5ndGggKyBubCkgKyBcIj4gXCIgKyBMT0NbbmxdICsgXCJcXG5cIjtcblxuICAgIGRiZ01zZyArPSBcIlxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFUlJPUiAgTE9HIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblwiICsgZ2wuZ2V0U2hhZGVySW5mb0xvZyhmcmFnbWVudFNoYWRlcilcblxuICAgIHRocm93IG5ldyBFcnJvcihkYmdNc2cpO1xuICB9XG4gIHJldHVybiBmcmFnbWVudFNoYWRlcjtcbn1cbmNvbnN0IF9maW5pc2hSdW4gID0gKGdsKSA9PiB7XG4gIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcbiAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG4gIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbCk7XG59XG5jb25zdCBXZWJHTFdvcmtlciA9IChsLCBzKSA9PiB7XG5cbiAgbGV0IHdvcmtlciA9IG5ldyBPYmplY3QoKTtcbiAgd29ya2VyLmdsID0gaW5pdEdMKCk7XG4gIGxldCBnbCA9IHdvcmtlci5nbDtcblxuICB3b3JrZXIuZGltID0ge1xuICAgIHg6IGwsXG4gICAgeTogMFxuICB9O1xuICBjb25zdCBNQVhJTUFHRVNJWkUgPSBNYXRoLnBvdyhnbC5NQVhfVEVYVFVSRV9TSVpFLCAyKSAqIDAuNTA7XG4gIGNvbnN0IElNQUdFX1NJWkU9IE1hdGguZmxvb3IoTUFYSU1BR0VTSVpFIC8gd29ya2VyLmRpbS54IC8gcyApICogd29ya2VyLmRpbS54ICogcztcbiAgd29ya2VyLmRpbS55ID0gSU1BR0VfU0laRSAvIHdvcmtlci5kaW0ueCAvIHMgO1xuICBsZXQgbGVuZ3RoID0gSU1BR0VfU0laRTtcblxuXG4gIHdvcmtlci5wcm9ncmFtcyA9IG5ldyBNYXAoKTtcbiAgd29ya2VyLmlwdCA9IGFsbG9jKGxlbmd0aCk7XG5cbiAgLy8gR1BVIHRleHR1cmUgYnVmZmVyID0gZnJvbSBKUyB0eXBlZCBhcnJheVxuICB3b3JrZXIuYnVmZmVycyA9IHtcbiAgICBwb3NpdGlvbiA6IG5ld0J1ZmZlcihnbCwgWyAtMSwgLTEsIDEsIC0xLCAxLCAxLCAtMSwgMSBdKSxcbiAgICB0ZXh0dXJlICA6IG5ld0J1ZmZlcihnbCwgWyAgMCwgIDAsIDEsICAwLCAxLCAxLCAgMCwgMSBdKSxcbiAgICBpbmRleCAgICA6IG5ld0J1ZmZlcihnbCwgWyAgMSwgIDIsIDAsICAzLCAwLCAyIF0sIFVpbnQxNkFycmF5LCBnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUilcbiAgfTtcblxuICB3b3JrZXIuYXR0cmliID0ge1xuICAgIHBvc2l0aW9uOiAwLFxuICAgIHRleHR1cmU6IDFcbiAgfTtcblxuICB3b3JrZXIudmFvID0gZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcbiAgZ2wuYmluZFZlcnRleEFycmF5KHdvcmtlci52YW8pO1xuICBfYmluZEJ1ZmZlcnMoZ2wsIHdvcmtlci5idWZmZXJzLCB3b3JrZXIuYXR0cmliKTtcbiAgZ2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xuICB3b3JrZXIudmVydGV4U2hhZGVyID0gX2NyZWF0ZVZlcnRleFNoYWRlcihnbCk7XG4gIHdvcmtlci5mcmFtZWJ1ZmZlciA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG4gIHdvcmtlci50ZXh0dXJlMCA9IGNyZWF0ZVRleHR1cmUoZ2wsIHdvcmtlci5pcHQuZGF0YSwgd29ya2VyLmRpbSk7XG4gIHdvcmtlci50ZXh0dXJlMSA9IGNyZWF0ZVRleHR1cmUoZ2wsIG5ldyBJbnQzMkFycmF5KGxlbmd0aCksIHdvcmtlci5kaW0pO1xuICByZXR1cm4gd29ya2VyO1xufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHdvcmtlcjogV2ViR0xXb3JrZXIsXG4gIGFkZFByb2dyYW06ICh3b3JrZXIsIG5hbWUsIGNvZGUsIC4uLnVuaWZvcm1zKSA9PiB7XG4gICAgbGV0IGdsID0gd29ya2VyLmdsO1xuICAgIGxldCB2ZXJ0ZXhTaGFkZXIgPSB3b3JrZXIudmVydGV4U2hhZGVyO1xuXG4gICAgdmFyIGZyYWdtZW50U2hhZGVyID0gX2NyZWF0ZUZyYWdtZW50U2hhZGVyKHdvcmtlci5nbCwgY29kZSk7XG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG5cbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgIGdsLmJpbmRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCB3b3JrZXIuYXR0cmliLnBvc2l0aW9uLCAncG9zaXRpb24nKTtcbiAgICBnbC5iaW5kQXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgd29ya2VyLmF0dHJpYi50ZXh0dXJlLCAndGV4dHVyZScpO1xuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuICAgIHZhciB1X3ZhcnMgPSBuZXcgTWFwKCk7XG4gICAgZm9yKHZhciB2YXJpYWJsZSBvZiB1bmlmb3Jtcykge1xuICAgICAgdV92YXJzLnNldCh2YXJpYWJsZSwgZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIHZhcmlhYmxlKSk7XG4gICAgfVxuICAgIGlmKCEhd29ya2VyLnByb2dyYW1zLmdldChuYW1lKSkge1xuICAgICAgY29uc29sZS5sb2coXCJwcm9ncmFtIGV4aXN0c1wiKTtcbiAgICB9XG4gICAgd29ya2VyLnByb2dyYW1zLnNldChuYW1lLCB7cHJvZ3JhbSwgdV92YXJzfSk7XG4gIH0sXG4gICAgLypcbiAgICB1c2U6IChuYW1lKSA9PiB7XG4gIH0sXG4gICovXG4gIHJ1bjogKHdvcmtlciwgbmFtZSwgY291bnQsIC4uLnVuaWZvcm1zKSA9PiB7XG4gICAgbGV0IGdsID0gd29ya2VyLmdsO1xuICAgIGxldCBpbmZvID0gd29ya2VyLnByb2dyYW1zLmdldChuYW1lKTtcbiAgICBsZXQgcHJvZ3JhbSA9IGluZm8ucHJvZ3JhbTtcbiAgICBsZXQgdV92YXJzID0gaW5mby51X3ZhcnM7XG4gICAgaWYocHJvZ3JhbSA9PT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIFN1Y2ggUHJvZ3JhbSFcIik7XG5cbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0dXJib2pzOiBGYWlsZWQgdG8gbGluayBHTFNMIHByb2dyYW0gY29kZS4nKTtcblxuICAgIHZhciB1VGV4dHVyZSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndV90ZXh0dXJlJyk7XG4gICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcblxuICAgIGNvdW50ID0gY291bnQgfHwgMTtcbiAgICB3aGlsZShjb3VudC0tID4gMCkge1xuICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgd29ya2VyLnRleHR1cmUwKTtcbiAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgICAgZ2wudW5pZm9ybTFpKHVUZXh0dXJlLCAwKTtcblxuICAgICAgZ2wudmlld3BvcnQoMCwgMCwgd29ya2VyLmRpbS54LCB3b3JrZXIuZGltLnkpO1xuICAgICAgX2ZyYW1lQnVmZmVyU2V0VGV4dHVyZShnbCwgd29ya2VyLmZyYW1lYnVmZmVyLCB3b3JrZXIudGV4dHVyZTEsIHdvcmtlci5kaW0pOyAvL25ld1xuICAgICAgZ2wuYmluZFZlcnRleEFycmF5KHdvcmtlci52YW8pO1xuICAgICAgZm9yKHZhciB1X3Ygb2YgdW5pZm9ybXMpIHtcbiAgICAgICAgZ2wudW5pZm9ybTFpKHVfdmFycy5nZXQodV92Lm4pLCB1X3Yudik7XG4gICAgICB9XG4gICAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVTLCA2LCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XG4gICAgICBsZXQgdGV4MCA9IHdvcmtlci50ZXh0dXJlMDtcbiAgICAgIHdvcmtlci50ZXh0dXJlMCA9IHdvcmtlci50ZXh0dXJlMTtcbiAgICAgIHdvcmtlci50ZXh0dXJlMSA9IHRleDA7XG4gICAgfVxuXG4gICAgX2ZpbmlzaFJ1bihnbCk7XG4gIH0sXG4gIHJlYWREYXRhOiAod29ya2VyLCB4LHksTixNKSA9PiB7XG4gICAgbGV0IGdsID0gd29ya2VyLmdsO1xuICAgIHggPSB4IHx8IDA7XG4gICAgeSA9IHkgfHwgMDtcbiAgICBOID0gTiB8fCB3b3JrZXIuZGltLng7XG4gICAgTSA9IE0gfHwgd29ya2VyLmRpbS55O1xuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgd29ya2VyLmZyYW1lYnVmZmVyKTtcbiAgICBnbC5yZWFkUGl4ZWxzKHgsIHksIE4sIE0sIGdsLlJHQkFfSU5URUdFUiwgZ2wuSU5ULCB3b3JrZXIuaXB0LmRhdGEpO1xuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbCk7XG4gICAgcmV0dXJuIHdvcmtlci5pcHQuZGF0YS5zdWJhcnJheSgwLCB3b3JrZXIuaXB0Lmxlbmd0aCk7XG4gIH0sXG4gIHdyaXRlRGF0YTogKHdvcmtlciwgZGF0YSkgPT4ge1xuICAgIGxldCBnbCA9IHdvcmtlci5nbDtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB3b3JrZXIudGV4dHVyZTApO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQTMySSx3b3JrZXIuZGltLngsd29ya2VyLmRpbS55LCAwLCBnbC5SR0JBX0lOVEVHRVIsIGdsLklOVCwgZGF0YSk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIC8vdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjJyk7XG4gIHZhciBnbCA9IG51bGw7XG4gIHZhciBhdHRyID0ge2FscGhhIDogZmFsc2UsIGFudGlhbGlhcyA6IGZhbHNlfTtcblxuICAvLyBUcnkgdG8gZ3JhYiB0aGUgc3RhbmRhcmQgY29udGV4dC4gSWYgaXQgZmFpbHMsIGZhbGxiYWNrIHRvIGV4cGVyaW1lbnRhbC5cbiAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsMlwiLCBhdHRyKSB8fCBjYW52YXMuZ2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbDJcIiwgYXR0cik7XG5cbiAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhIEdMIGNvbnRleHQsIGdpdmUgdXAgbm93XG4gaWYgKCFnbCkgeyAvLyBnbCBpbnN0YW5jZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gaW5pdGlhbGl6ZSBXZWJHTC4gWW91ciBicm93c2VyIG1heSBub3Qgc3VwcG9ydCBpdC5cIik7XG4gfVxuXG4gIHJldHVybiBnbDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGdsLCBkYXRhLCBmLCBlKSB7XG4gIHZhciBidWYgPSBnbC5jcmVhdGVCdWZmZXIoKTtcblxuICBnbC5iaW5kQnVmZmVyKChlIHx8IGdsLkFSUkFZX0JVRkZFUiksIGJ1Zik7XG4gIGdsLmJ1ZmZlckRhdGEoKGUgfHwgZ2wuQVJSQVlfQlVGRkVSKSwgbmV3IChmIHx8IEZsb2F0MzJBcnJheSkoZGF0YSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICByZXR1cm4gYnVmO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gdmVydGV4U2hhZGVyQ29kZTpcbiAgYCN2ZXJzaW9uIDMwMCBlc1xubGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjMiBwb3NpdGlvbjtcbmxheW91dChsb2NhdGlvbiA9IDEpIGluIHZlYzIgdGV4dHVyZTtcbm91dCB2ZWMyIHBvcztcblxudm9pZCBtYWluKHZvaWQpIHtcbiAgcG9zID0gdGV4dHVyZTtcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLnh5LCAwLjAsIDEuMCk7XG59YCxcbiAgc3RkbGliOlxuICBgI3ZlcnNpb24gMzAwIGVzXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG5wcmVjaXNpb24gaGlnaHAgaW50O1xucHJlY2lzaW9uIGhpZ2hwIGlzYW1wbGVyMkQ7XG51bmlmb3JtIGlzYW1wbGVyMkQgdV90ZXh0dXJlO1xuaW4gdmVjMiBwb3M7XG5vdXQgaXZlYzQgY29sb3I7XG4vL291dCBpbnQgaXNGaW5pc2hlZDtcblxudmVjMiBzaXplO1xuaXZlYzIgbXlfY29vcmQ7XG5cbnZvaWQgaW5pdCh2b2lkKSB7XG4gIC8vc2l6ZSA9IHZlYzIodGV4dHVyZVNpemUodV90ZXh0dXJlLCAwKSAtIDEpO1xuICBzaXplID0gdmVjMih0ZXh0dXJlU2l6ZSh1X3RleHR1cmUsIDApKTtcbiAgbXlfY29vcmQgPSBpdmVjMihwb3MgKiBzaXplKTtcbn1cblxuaXZlYzQgcmVhZCh2b2lkKSB7XG4gIHJldHVybiB0ZXh0dXJlKHVfdGV4dHVyZSwgcG9zKTtcbn1cblxuaXZlYzQgcmVhZF9hdChpdmVjMiBjb29yZCkge1xuICByZXR1cm4gdGV4ZWxGZXRjaCh1X3RleHR1cmUsIGNvb3JkLCAwKTtcbn1cblxudm9pZCBjb21taXQoaXZlYzQgdmFsKSB7XG4gIGNvbG9yID0gdmFsO1xufVxuYH1cblxuIiwiLy8gVHJhbnNmZXIgZGF0YSBvbnRvIGNsYW1wZWQgdGV4dHVyZSBhbmQgdHVybiBvZmYgYW55IGZpbHRlcmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVUZXh0dXJlKGdsLCBkYXRhLCBkaW0pIHtcbiAgdmFyIHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG5cbiAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQTMySSwgZGltLngsIGRpbS55LCAwLCBnbC5SR0JBX0lOVEVHRVIsIGdsLklOVCwgZGF0YSk7XG4gIC8vZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBMzJGLCBzaXplLCBzaXplLCAwLCBnbC5SR0JBLCBnbC5GTE9BVCwgZGF0YSk7XG4gIC8vZ2wudGV4U3RvcmFnZTJEKGdsLlRFWFRVUkVfMkQsIDEsIGdsLlJHQkEzMkYsIHNpemUsIHNpemUpO1xuICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcblxuICByZXR1cm4gdGV4dHVyZTtcbn1cbiIsImNvbnN0IEhBU0hfTEVOR1RIID0gMjQzO1xuY29uc3QgSU5UX0xFTkdUSCA9IDI3O1xuY29uc3QgTk9OQ0VfTEVOR1RIID0gSEFTSF9MRU5HVEggLyAzO1xuY29uc3QgVElNRVNUQU1QX1NUQVJUID0gTk9OQ0VfTEVOR1RIO1xuY29uc3QgVElNRVNUQU1QX0xPV0VSX0JPVU5EX1NUQVJUPSBUSU1FU1RBTVBfU1RBUlQgKyBJTlRfTEVOR1RIO1xuY29uc3QgVElNRVNUQU1QX1VQUEVSX0JPVU5EX1NUQVJUID0gVElNRVNUQU1QX0xPV0VSX0JPVU5EX1NUQVJUICsgSU5UX0xFTkdUSDtcbmNvbnN0IE5PTkNFX1NUQVJUID0gSEFTSF9MRU5HVEggLSBOT05DRV9MRU5HVEg7IFxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSEFTSF9MRU5HVEgsXG4gIFNUQVRFX0xFTkdUSDogSEFTSF9MRU5HVEggKiAzLFxuICBUSU1FU1RBTVBfU1RBUlQsXG4gIFRJTUVTVEFNUF9MT1dFUl9CT1VORF9TVEFSVCxcbiAgVElNRVNUQU1QX1VQUEVSX0JPVU5EX1NUQVJULFxuICBOT05DRV9TVEFSVCxcbiAgTk9OQ0VfTEVOR1RILFxuICBJTlRfTEVOR1RILFxuICBOVU1CRVJfT0ZfUk9VTkRTOiA4MSxcbiAgVFJBTlNBQ1RJT05fTEVOR1RIOiBIQVNIX0xFTkdUSCAqIDMzXG59O1xuIiwiY29uc3QgQ29uc3QgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG4vKipcbiAqKiAgICAgIENyeXB0b2dyYXBoaWMgcmVsYXRlZCBmdW5jdGlvbnMgdG8gSU9UQSdzIEN1cmwgKHNwb25nZSBmdW5jdGlvbilcbiAqKi9cblxuZnVuY3Rpb24gQ3VybChzdGF0ZSkge1xuICAvLyB0cnV0aCB0YWJsZVxuICB0aGlzLnRydXRoVGFibGUgPSBuZXcgSW50OEFycmF5KFsxLCAwLCAtMSwgMiwgMSwgLTEsIDAsIDIsIC0xLCAxLCAwXSk7XG4gIHRoaXMuSEFTSF9MRU5HVEggPSBDb25zdC5IQVNIX0xFTkdUSDtcbiAgdGhpcy5pbml0aWFsaXplKHN0YXRlKTtcbiAgdGhpcy5yZXNldCgpO1xufVxuXG4vKipcbiAqICAgSW5pdGlhbGl6ZXMgdGhlIHN0YXRlIHdpdGggNzI5IHRyaXRzXG4gKlxuICogICBAbWV0aG9kIGluaXRpYWxpemVcbiAqKi9cbkN1cmwucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbihzdGF0ZSwgbGVuZ3RoKSB7XG5cbiAgaWYgKHN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhdGUgPSBuZXcgSW50OEFycmF5KENvbnN0LlNUQVRFX0xFTkdUSCk7XG4gIH1cbn1cblxuQ3VybC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zdGF0ZS5maWxsKDApO1xufVxuXG4vKipcbiAqICAgU3BvbmdlIGFic29yYiBmdW5jdGlvblxuICpcbiAqICAgQG1ldGhvZCBhYnNvcmJcbiAqKi9cbkN1cmwucHJvdG90eXBlLmFic29yYiA9IGZ1bmN0aW9uKHRyaXRzLCBvZmZzZXQsIGxlbmd0aCkge1xuXG4gIGRvIHtcblxuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbGltaXQgPSAobGVuZ3RoIDwgQ29uc3QuSEFTSF9MRU5HVEggPyBsZW5ndGggOiBDb25zdC5IQVNIX0xFTkdUSCk7XG5cbiAgICB3aGlsZSAoaSA8IGxpbWl0KSB7XG5cbiAgICAgIHRoaXMuc3RhdGVbaSsrXSA9IHRyaXRzW29mZnNldCsrXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyYW5zZm9ybSgpO1xuXG4gIH0gd2hpbGUgKCggbGVuZ3RoIC09IENvbnN0LkhBU0hfTEVOR1RIICkgPiAwKVxuXG59XG5cbi8qKlxuICogICBTcG9uZ2Ugc3F1ZWV6ZSBmdW5jdGlvblxuICpcbiAqICAgQG1ldGhvZCBzcXVlZXplXG4gKiovXG5DdXJsLnByb3RvdHlwZS5zcXVlZXplID0gZnVuY3Rpb24odHJpdHMsIG9mZnNldCwgbGVuZ3RoKSB7XG5cbiAgZG8ge1xuXG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsaW1pdCA9IChsZW5ndGggPCBDb25zdC5IQVNIX0xFTkdUSCA/IGxlbmd0aCA6IENvbnN0LkhBU0hfTEVOR1RIKTtcblxuICAgIHdoaWxlIChpIDwgbGltaXQpIHtcblxuICAgICAgdHJpdHNbb2Zmc2V0KytdID0gdGhpcy5zdGF0ZVtpKytdO1xuICAgIH1cblxuICAgIHRoaXMudHJhbnNmb3JtKCk7XG5cbiAgfSB3aGlsZSAoKCBsZW5ndGggLT0gQ29uc3QuSEFTSF9MRU5HVEggKSA+IDApXG59XG5cbi8qKlxuICogICBTcG9uZ2UgdHJhbnNmb3JtIGZ1bmN0aW9uXG4gKlxuICogICBAbWV0aG9kIHRyYW5zZm9ybVxuICoqL1xuQ3VybC5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHN0YXRlQ29weSA9IFtdLCBpbmRleCA9IDA7XG5cbiAgZm9yICh2YXIgcm91bmQgPSAwOyByb3VuZCA8IENvbnN0Lk5VTUJFUl9PRl9ST1VORFM7IHJvdW5kKyspIHtcblxuICAgIHN0YXRlQ29weSA9IHRoaXMuc3RhdGUuc2xpY2UoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQ29uc3QuU1RBVEVfTEVOR1RIOyBpKyspIHtcblxuICAgICAgdGhpcy5zdGF0ZVtpXSA9IHRoaXMudHJ1dGhUYWJsZVtzdGF0ZUNvcHlbaW5kZXhdICsgKHN0YXRlQ29weVtpbmRleCArPSAoaW5kZXggPCAzNjUgPyAzNjQgOiAtMzY1KV0gPDwyKSArIDVdO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEN1cmw7XG4iLCJjb25zdCBQZWFybERpdmVyID0gcmVxdWlyZSgnLi9wZWFybGRpdmVyJyk7XG5jb25zdCBDdXJsID0gcmVxdWlyZShcIi4vY3VybFwiKTtcbmNvbnN0IENvbnN0ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbmNvbnN0IENvbnZlcnRlciA9IHJlcXVpcmUoJ2lvdGEuY3J5cHRvLmpzJykuY29udmVydGVyO1xuY29uc3QgTk9OQ0VfVElNRVNUQU1QX0xPV0VSX0JPVU5EID0gMDtcbmNvbnN0IE5PTkNFX1RJTUVTVEFNUF9VUFBFUl9CT1VORCA9IENvbnZlcnRlci5mcm9tVmFsdWUoMHhmZmZmZmZmZmZmZmZmZmZmKTtcbmNvbnN0IE1BWF9USU1FU1RBTVBfVkFMVUUgPSAoTWF0aC5wb3coMywyNykgLSAxKSAvIDIgXG5cbmxldCBwZEluc3RhbmNlO1xuXG5jb25zdCBwb3cgPSAob3B0aW9ucywgc3VjY2VzcywgZXJyb3IpID0+IHsgIFxuICBsZXQgc3RhdGU7XG5cbiAgaWYgKCd0cnl0ZXMnIGluIG9wdGlvbnMpIHtcbiAgICBzdGF0ZSA9IFBlYXJsRGl2ZXIucHJlcGFyZShvcHRpb25zLnRyeXRlcyk7XG4gIH0gZWxzZSBpZiAoJ3N0YXRlJyBpbiBvcHRpb25zKSB7XG4gICAgc3RhdGUgPSBQZWFybERpdmVyLm9mZnNldFN0YXRlKG9wdGlvbnMuc3RhdGUpO1xuICB9IGVsc2Uge1xuICAgIGVycm9yKFwiRXJyb3I6IG5vIHRyeXRlcyBvciBzdGF0ZSBtYXRyaXggcHJvdmlkZWRcIik7XG4gIH1cbiAgbGV0IHBvd1Byb21pc2UgPSBQZWFybERpdmVyLnNlYXJjaChwZEluc3RhbmNlLCBzdGF0ZSwgb3B0aW9ucy5taW5XZWlnaHQpXG4gIGlmKHR5cGVvZiBzdWNjZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcG93UHJvbWlzZS50aGVuKHN1Y2Nlc3MpLmNhdGNoKGVycm9yKVxuICB9XG4gIHJldHVybiBwb3dQcm9taXNlO1xufTtcblxuY29uc3QgVEFHX1RSSU5BUllfU1RBUlQgPSAyMjk1O1xuY29uc3QgVEFHX1RSSU5BUllfU0laRSA9IDI3O1xuXG5jb25zdCBzZXRUaW1lc3RhbXAgPSAoc3RhdGUpID0+IHtcbiAgY29uc3QgdGltZXN0YW1wID0gc3RhdGUuc3ViYXJyYXkoQ29uc3QuVElNRVNUQU1QX1NUQVJULCBDb25zdC5USU1FU1RBTVBfTE9XRVJfQk9VTkRfU1RBUlQpO1xuICBjb25zdCB1cHBlciA9IHN0YXRlLnN1YmFycmF5KENvbnN0LlRJTUVTVEFNUF9VUFBFUl9CT1VORF9TVEFSVCwgQ29uc3QuTk9OQ0VfU1RBUlQpO1xuICB0aW1lc3RhbXAuZmlsbCgwKTtcbiAgQ29udmVydGVyLmZyb21WYWx1ZShEYXRlLm5vdygpKS5tYXAoKHYsIGkpID0+IHRpbWVzdGFtcFtpXSA9IHYpO1xuICBzdGF0ZS5zdWJhcnJheShDb25zdC5USU1FU1RBTVBfTE9XRVJfQk9VTkRfU1RBUlQsIENvbnN0LlRJTUVTVEFNUF9VUFBFUl9CT1VORF9TVEFSVCkuZmlsbCgwKTtcbiAgdXBwZXIuZmlsbCgwKTtcbiAgTk9OQ0VfVElNRVNUQU1QX1VQUEVSX0JPVU5ELm1hcCgodixpKSA9PiB1cHBlcltpXSA9IHYpO1xufVxuXG5jb25zdCBvdmVycmlkZUF0dGFjaFRvVGFuZ2xlID0gaW90YSA9PiB7XG4gIGlvdGEuYXBpLmF0dGFjaFRvVGFuZ2xlID0gKFxuICAgIHRydW5rVHJhbnNhY3Rpb24sXG4gICAgYnJhbmNoVHJhbnNhY3Rpb24sXG4gICAgbWluV2VpZ2h0LFxuICAgIHRyeXRlcyxcbiAgICBjYWxsYmFja1xuICApID0+IHtcbiAgY29uc3QgY2N1cmxIYXNoaW5nID0gZnVuY3Rpb24odHJ1bmtUcmFuc2FjdGlvbiwgYnJhbmNoVHJhbnNhY3Rpb24sIG1pbldlaWdodCwgdHJ5dGVzLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGlvdGFPYmogPSBpb3RhXG5cbiAgICAvLyBpbnB1dFZhbGlkYXRvcjogQ2hlY2sgaWYgY29ycmVjdCBoYXNoXG4gICAgaWYgKCFpb3RhT2JqLnZhbGlkLmlzSGFzaCh0cnVua1RyYW5zYWN0aW9uKSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIkludmFsaWQgdHJ1bmtUcmFuc2FjdGlvblwiKSlcbiAgICB9XG5cbiAgICAvLyBpbnB1dFZhbGlkYXRvcjogQ2hlY2sgaWYgY29ycmVjdCBoYXNoXG4gICAgaWYgKCFpb3RhT2JqLnZhbGlkLmlzSGFzaChicmFuY2hUcmFuc2FjdGlvbikpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJJbnZhbGlkIGJyYW5jaFRyYW5zYWN0aW9uXCIpKVxuICAgIH1cblxuICAgIC8vIGlucHV0VmFsaWRhdG9yOiBDaGVjayBpZiBpbnRcbiAgICBpZiAoIWlvdGFPYmoudmFsaWQuaXNWYWx1ZShtaW5XZWlnaHQpKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiSW52YWxpZCBtaW5XZWlnaHRNYWduaXR1ZGVcIikpXG4gICAgfVxuXG4gICAgdmFyIGZpbmFsQnVuZGxlVHJ5dGVzID0gW11cbiAgICB2YXIgcHJldmlvdXNUeEhhc2hcbiAgICB2YXIgaSA9IDBcblxuICAgIGZ1bmN0aW9uIGxvb3BUcnl0ZXMoKSB7XG4gICAgICBnZXRCdW5kbGVUcnl0ZXModHJ5dGVzW2ldLCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaSsrXG4gICAgICAgICAgaWYgKGkgPCB0cnl0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsb29wVHJ5dGVzKClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcmV2ZXJzZSB0aGUgb3JkZXIgc28gdGhhdCBpdCdzIGFzY2VuZGluZyBmcm9tIGN1cnJlbnRJbmRleFxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIGZpbmFsQnVuZGxlVHJ5dGVzLnJldmVyc2UoKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QnVuZGxlVHJ5dGVzKHRoaXNUcnl0ZXMsIGNhbGxiYWNrKSB7XG4gICAgICAvLyBQUk9DRVNTIExPR0lDOlxuICAgICAgLy8gU3RhcnQgd2l0aCBsYXN0IGluZGV4IHRyYW5zYWN0aW9uXG4gICAgICAvLyBBc3NpZ24gaXQgdGhlIHRydW5rIC8gYnJhbmNoIHdoaWNoIHRoZSB1c2VyIGhhcyBzdXBwbGllZFxuICAgICAgLy8gSUYgdGhlcmUgaXMgYSBidW5kbGUsIGNoYWluICB0aGUgYnVuZGxlIHRyYW5zYWN0aW9ucyB2aWFcbiAgICAgIC8vIHRydW5rVHJhbnNhY3Rpb24gdG9nZXRoZXJcblxuICAgICAgdmFyIHR4T2JqZWN0ID0gaW90YU9iai51dGlscy50cmFuc2FjdGlvbk9iamVjdCh0aGlzVHJ5dGVzKVxuICAgICAgdHhPYmplY3QudGFnID0gdHhPYmplY3QudGFnIHx8IHR4T2JqZWN0Lm9ic29sZXRlVGFnXG4gICAgICB0eE9iamVjdC5hdHRhY2htZW50VGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICAgICAgdHhPYmplY3QuYXR0YWNobWVudFRpbWVzdGFtcExvd2VyQm91bmQgPSAwXG4gICAgICB0eE9iamVjdC5hdHRhY2htZW50VGltZXN0YW1wVXBwZXJCb3VuZCA9IE1BWF9USU1FU1RBTVBfVkFMVUVcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGZpcnN0IHRyYW5zYWN0aW9uLCB0byBiZSBwcm9jZXNzZWRcbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IGl0J3MgdGhlIGxhc3QgaW4gdGhlIGJ1bmRsZSBhbmQgdGhlblxuICAgICAgLy8gYXNzaWduIGl0IHRoZSBzdXBwbGllZCB0cnVuayBhbmQgYnJhbmNoIHRyYW5zYWN0aW9uc1xuICAgICAgaWYgKCFwcmV2aW91c1R4SGFzaCkge1xuICAgICAgICAvLyBDaGVjayBpZiBsYXN0IHRyYW5zYWN0aW9uIGluIHRoZSBidW5kbGVcbiAgICAgICAgaWYgKHR4T2JqZWN0Lmxhc3RJbmRleCAhPT0gdHhPYmplY3QuY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKFxuICAgICAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBcIldyb25nIGJ1bmRsZSBvcmRlci4gVGhlIGJ1bmRsZSBzaG91bGQgYmUgb3JkZXJlZCBpbiBkZXNjZW5kaW5nIG9yZGVyIGZyb20gY3VycmVudEluZGV4XCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICB0eE9iamVjdC50cnVua1RyYW5zYWN0aW9uID0gdHJ1bmtUcmFuc2FjdGlvblxuICAgICAgICB0eE9iamVjdC5icmFuY2hUcmFuc2FjdGlvbiA9IGJyYW5jaFRyYW5zYWN0aW9uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDaGFpbiB0aGUgYnVuZGxlIHRvZ2V0aGVyIHZpYSB0aGUgdHJ1bmtUcmFuc2FjdGlvbiAocHJldmlvdXMgdHggaW4gdGhlIGJ1bmRsZSlcbiAgICAgICAgLy8gQXNzaWduIHRoZSBzdXBwbGllZCB0cnVua1RyYW5zYWNpdG9uIGFzIGJyYW5jaFRyYW5zYWN0aW9uXG4gICAgICAgIHR4T2JqZWN0LnRydW5rVHJhbnNhY3Rpb24gPSBwcmV2aW91c1R4SGFzaFxuICAgICAgICB0eE9iamVjdC5icmFuY2hUcmFuc2FjdGlvbiA9IHRydW5rVHJhbnNhY3Rpb25cbiAgICAgIH1cblxuICAgICAgdmFyIG5ld1RyeXRlcyA9IGlvdGFPYmoudXRpbHMudHJhbnNhY3Rpb25Ucnl0ZXModHhPYmplY3QpXG5cbiAgICAgIGN1cmxcbiAgICAgICAgLnBvdyh7IHRyeXRlczogbmV3VHJ5dGVzLCBtaW5XZWlnaHQ6IG1pbldlaWdodCB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbihub25jZSkge1xuICAgICAgICAgIHZhciByZXR1cm5lZFRyeXRlcyA9IG5ld1RyeXRlcy5zdWJzdHIoMCwgMjY3MyAtIDgxKS5jb25jYXQobm9uY2UpXG4gICAgICAgICAgdmFyIG5ld1R4T2JqZWN0ID0gaW90YU9iai51dGlscy50cmFuc2FjdGlvbk9iamVjdChyZXR1cm5lZFRyeXRlcylcblxuICAgICAgICAgIC8vIEFzc2lnbiB0aGUgcHJldmlvdXNUeEhhc2ggdG8gdGhpcyB0eFxuICAgICAgICAgIHZhciB0eEhhc2ggPSBuZXdUeE9iamVjdC5oYXNoXG4gICAgICAgICAgcHJldmlvdXNUeEhhc2ggPSB0eEhhc2hcblxuICAgICAgICAgIGZpbmFsQnVuZGxlVHJ5dGVzLnB1c2gocmV0dXJuZWRUcnl0ZXMpXG4gICAgICAgICAgY2FsbGJhY2sobnVsbClcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGNhbGxiYWNrKVxuICAgIH1cbiAgICBsb29wVHJ5dGVzKClcbiAgfVxuICBjY3VybEhhc2hpbmcodHJ1bmtUcmFuc2FjdGlvbiwgYnJhbmNoVHJhbnNhY3Rpb24sIG1pbldlaWdodCwgdHJ5dGVzLCBmdW5jdGlvbihlcnJvciwgc3VjY2Vzcykge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coc3VjY2Vzcyk7XG4gICAgfVxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IsIHN1Y2Nlc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgIH1cbiAgfSlcbiAgfVxufVxuXG53aW5kb3cuY3VybCA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0OiAoKSA9PiB7IFxuICAgIHBkSW5zdGFuY2UgPSBQZWFybERpdmVyLmluc3RhbmNlKCk7IFxuICAgIGlmKHBkSW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgcG93LFxuICBwcmVwYXJlOiBQZWFybERpdmVyLnByZXBhcmUsXG4gIHNldE9mZnNldDogKG8pID0+IHtwZEluc3RhbmNlLm9mZnNldCA9IG99LFxuICBpbnRlcnJ1cHQ6ICgpID0+IGludGVycnVwdChwZEluc3RhbmNlKSxcbiAgcmVzdW1lOiAoKSA9PiBQZWFybERpdmVyLmRvTmV4dChwZEluc3RhbmNlKSxcbiAgcmVtb3ZlOiAoKSA9PiBwZEluc3RhbmNlLnF1ZXVlLnVuc2hpZnQoKSxcbiAgLy9nZXRIYXNoUm93czogKGMpID0+IGMoUGVhcmxEaXZlci5nZXRIYXNoQ291bnQoKSksXG4gIG92ZXJyaWRlQXR0YWNoVG9UYW5nbGVcbn1cbiIsImNvbnN0IENvbnZlcnRlciA9IHJlcXVpcmUoJ2lvdGEuY3J5cHRvLmpzJykuY29udmVydGVyO1xuY29uc3QgQ3VybCA9IHJlcXVpcmUoXCIuL2N1cmxcIik7XG5jb25zdCBXZWJHTCA9IHJlcXVpcmUoJy4vV2ViR0wnKTtcbmNvbnN0IFNlYXJjaEluaXQgPSByZXF1aXJlKCcuL3NlYXJjaEluaXQnKTtcbmNvbnN0IEtSTkwgPSByZXF1aXJlKCcuL3NoYWRlcnMnKTtcbmNvbnN0IENvbnN0ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuY29uc3QgVEVYRUxTSVpFID0gNDtcblxuY29uc3QgUERTdGF0ZSA9IHtcbiAgUkVBRFk6IDAsXG4gIFNFQVJDSElORzogMSxcbiAgSU5URVJSVVBURUQ6IC0xLFxufTtcblxuY29uc3QgcGFjayA9IChsKSA9PiAocixrLGkpID0+IChpJWwgPT09MCA/IHIucHVzaChba10pOiByW3IubGVuZ3RoLTFdLnB1c2goaykpICYmIHI7XG5cbmNvbnN0IHBlYXJsRGl2ZXJDYWxsYmFjayA9IChyZXMsIHRyYW5zYWN0aW9uVHJpdHMsIG1pbldlaWdodE1hZ25pdHVkZSwgbV9zZWxmKSA9PiBcbntcbiAgcmV0dXJuIChub25jZSwgc2VhcmNoT2JqZWN0KSA9PiB7XG4gICAgcmVzKENvbnZlcnRlci50cnl0ZXMobm9uY2UpKTtcbiAgfVxufVxuXG5jb25zdCBQZWFybERpdmVySW5zdGFuY2UgPSAob2Zmc2V0KSA9PiB7XG4gIGlmKFdlYkdMKSB7XG4gICAgbGV0IGluc3RhbmNlID0gbmV3IE9iamVjdCgpO1xuICAgIGluc3RhbmNlLmNvbnRleHQgPSBXZWJHTC53b3JrZXIoQ29uc3QuU1RBVEVfTEVOR1RIKzEsIFRFWEVMU0laRSk7XG4gICAgaW5zdGFuY2Uub2Zmc2V0ID0gaW5zdGFuY2UuY29udGV4dC5kaW0ueSAqIChvZmZzZXQgfHwgMCk7XG4gICAgaW5zdGFuY2UuYnVmID0gaW5zdGFuY2UuY29udGV4dC5pcHQuZGF0YTtcbiAgICBXZWJHTC5hZGRQcm9ncmFtKGluc3RhbmNlLmNvbnRleHQsIFwiaW5pdFwiLCBLUk5MLmluaXQsIFwiZ3Jfb2Zmc2V0XCIpO1xuICAgIFdlYkdMLmFkZFByb2dyYW0oaW5zdGFuY2UuY29udGV4dCwgXCJpbmNyZW1lbnRcIiwgS1JOTC5pbmNyZW1lbnQpO1xuICAgIFdlYkdMLmFkZFByb2dyYW0oaW5zdGFuY2UuY29udGV4dCwgXCJ0d2lzdFwiLCBLUk5MLnRyYW5zZm9ybSk7XG4gICAgV2ViR0wuYWRkUHJvZ3JhbShpbnN0YW5jZS5jb250ZXh0LCBcImNoZWNrXCIsIEtSTkwuY2hlY2ssIFwibWluV2VpZ2h0TWFnbml0dWRlXCIpO1xuICAgIFdlYkdMLmFkZFByb2dyYW0oaW5zdGFuY2UuY29udGV4dCwgXCJjb2xfY2hlY2tcIiwgS1JOTC5jb2xfY2hlY2spO1xuICAgIFdlYkdMLmFkZFByb2dyYW0oaW5zdGFuY2UuY29udGV4dCwgXCJmaW5hbGl6ZVwiLCBLUk5MLmZpbmFsaXplKTtcbiAgICBpbnN0YW5jZS5zdGF0ZSA9IFBEU3RhdGUuUkVBRFk7XG4gICAgaW5zdGFuY2UucXVldWUgPSBbXTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cbn1cblxuY29uc3Qgc2VhcmNoID0gKGluc3RhbmNlLCBzdGF0ZXMsIG1pbldlaWdodCkgPT57XG4gIGlmKCFpbnN0YW5jZS5jb250ZXh0KSB7XG4gICAgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiV2ViZ2wyIElzIG5vdCBBdmFpbGFibGVcIikpO1xuICB9IGVsc2UgaWYgKG1pbldlaWdodCA+PSBDb25zdC5IQVNIX0xFTkdUSCB8fCBtaW5XZWlnaHQgPD0gMCkge1xuICAgIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkJhZCBNaW4tV2VpZ2h0IE1hZ25pdHVkZVwiKSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgIGluc3RhbmNlLnF1ZXVlLnB1c2goe1xuICAgICAgc3RhdGVzOiBzdGF0ZXMsIFxuICAgICAgbXdtOiBtaW5XZWlnaHQsIFxuICAgICAgY2FsbDogcGVhcmxEaXZlckNhbGxiYWNrKHJlcywgc3RhdGVzLCBtaW5XZWlnaHQsIGluc3RhbmNlKVxuICAgIH0pO1xuICAgIGlmKGluc3RhbmNlLnN0YXRlID09IFBEU3RhdGUuUkVBRFkpIGRvTmV4dChpbnN0YW5jZSk7XG4gIH0pO1xufVxuXG5jb25zdCBpbnRlcnJ1cHQgPSAoaW5zdGFuY2UpID0+IHtcbiAgaWYoaW5zdGFuY2Uuc3RhdGUgPT0gUERTdGF0ZS5TRUFSQ0hJTkcpIGluc3RhbmNlLnN0YXRlID0gUERTdGF0ZS5JTlRFUlJVUFRFRDtcbn1cblxuY29uc3QgZG9OZXh0ID0gKGluc3RhbmNlKSA9PiB7XG4gIHZhciBuZXh0ID0gaW5zdGFuY2UucXVldWUuc2hpZnQoKTtcbiAgaWYoaW5zdGFuY2Uuc3RhdGUgIT0gUERTdGF0ZS5TRUFSQ0hJTkcpIHtcbiAgICBpZihuZXh0ICE9IG51bGwpIHtcbiAgICAgIGluc3RhbmNlLnN0YXRlID0gUERTdGF0ZS5TRUFSQ0hJTkc7XG4gICAgICBfV2ViR0xGaW5kTm9uY2UoaW5zdGFuY2UsIG5leHQpO1xuICAgIH0gXG4gIH0gZWxzZSB7XG4gICAgaW5zdGFuY2Uuc3RhdGUgPSBQRFN0YXRlLlJFQURZO1xuICB9XG59XG5cbmNvbnN0IF9zYXZlID0gKGluc3RhbmNlLCBzZWFyY2hPYmplY3QpID0+IHtcbiAgaW5zdGFuY2UuYnVmLnJlZHVjZShwYWNrKDQpLCBbXSkuc2xpY2UoMCxDb25zdC5TVEFURV9MRU5HVEgpXG4gICAgLnJlZHVjZSgoYSx2KT0+IGEubWFwKChjLGkpID0+IGMucHVzaCh2W2ldKSkmJiBhLCBbW10sW11dKVxuICAgIC5yZWR1Y2UoKGEsdixpKSA9PiAoaSUyID8gYS5zZXQoXCJoaWdoXCIsIHYpIDogYS5zZXQoXCJsb3dcIiwgdikpICYmIGEsIG5ldyBNYXAoKSlcbiAgICAuZm9yRWFjaCgodixrKSA9PiBzZWFyY2hPYmplY3Quc3RhdGVzW2tdID0gdik7XG4gIGluc3RhbmNlLnF1ZXVlLnVuc2hpZnQoc2VhcmNoT2JqZWN0KTtcbn1cblxuY29uc3QgX1dlYkdMV3JpdGVCdWZmZXJzID0gKGluc3RhbmNlLCBzdGF0ZXMpID0+IHtcbiAgZm9yKHZhciBpID0gMDsgaSA8IENvbnN0LlNUQVRFX0xFTkdUSDsgaSsrKSB7XG4gICAgaW5zdGFuY2UuYnVmW2kgKiBURVhFTFNJWkVdID0gc3RhdGVzLmxvd1tpXTtcbiAgICBpbnN0YW5jZS5idWZbaSAqIFRFWEVMU0laRSArIDFdID0gc3RhdGVzLmhpZ2hbaV07XG4gICAgaW5zdGFuY2UuYnVmW2kgKiBURVhFTFNJWkUgKyAyXSA9IHN0YXRlcy5sb3dbaV07XG4gICAgaW5zdGFuY2UuYnVmW2kgKiBURVhFTFNJWkUgKyAzXSA9IHN0YXRlcy5oaWdoW2ldO1xuICB9XG59XG5cblxuY29uc3QgX1dlYkdMU2VhcmNoID0gKGluc3RhbmNlLCBzZWFyY2hPYmplY3QpID0+IHtcbiAgV2ViR0wucnVuKGluc3RhbmNlLmNvbnRleHQsIFwiaW5jcmVtZW50XCIpO1xuICBXZWJHTC5ydW4oaW5zdGFuY2UuY29udGV4dCwgXCJ0d2lzdFwiLCBDb25zdC5OVU1CRVJfT0ZfUk9VTkRTKTtcbiAgV2ViR0wucnVuKGluc3RhbmNlLmNvbnRleHQsIFwiY2hlY2tcIiwgMSwge246XCJtaW5XZWlnaHRNYWduaXR1ZGVcIiwgdjogc2VhcmNoT2JqZWN0Lm13bX0pO1xuICBXZWJHTC5ydW4oaW5zdGFuY2UuY29udGV4dCwgXCJjb2xfY2hlY2tcIik7XG5cbiAgaWYoV2ViR0wucmVhZERhdGEoaW5zdGFuY2UuY29udGV4dCwgQ29uc3QuU1RBVEVfTEVOR1RILDAsIDEsIDEpWzJdID09PSAtMSApIHtcbiAgICBpZihpbnN0YW5jZS5zdGF0ZSA9PSBQRFN0YXRlLklOVEVSUlVQVEVEKSByZXR1cm4gaW5zdGFuY2UuX3NhdmUoc2VhcmNoT2JqZWN0KTtcbiAgICAvL3JlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBpbnN0YW5jZS5fV2ViR0xTZWFyY2goc2VhcmNoT2JqZWN0KSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBfV2ViR0xTZWFyY2goaW5zdGFuY2UsIHNlYXJjaE9iamVjdCksIDEpO1xuICB9IGVsc2Uge1xuICAgIFdlYkdMLnJ1bihpbnN0YW5jZS5jb250ZXh0LCBcImZpbmFsaXplXCIpO1xuICAgIHNlYXJjaE9iamVjdC5jYWxsKFxuICAgICAgV2ViR0wucmVhZERhdGEoaW5zdGFuY2UuY29udGV4dCwgMCwwLGluc3RhbmNlLmNvbnRleHQuZGltLngsMSlcbiAgICAgIC5yZWR1Y2UocGFjayg0KSwgW10pXG4gICAgICAuc2xpY2UoMCwgQ29uc3QuSEFTSF9MRU5HVEgpXG4gICAgICAubWFwKHggPT4geFszXSksIFxuICAgICAgc2VhcmNoT2JqZWN0KTtcbiAgICBkb05leHQoaW5zdGFuY2UpO1xuICB9XG59XG5cbmNvbnN0IF9XZWJHTEZpbmROb25jZSA9IChpbnN0YW5jZSwgc2VhcmNoT2JqZWN0KSA9PiB7XG4gIF9XZWJHTFdyaXRlQnVmZmVycyhpbnN0YW5jZSwgc2VhcmNoT2JqZWN0LnN0YXRlcyk7XG4gIFdlYkdMLndyaXRlRGF0YShpbnN0YW5jZS5jb250ZXh0LCBpbnN0YW5jZS5idWYpO1xuICBXZWJHTC5ydW4oaW5zdGFuY2UuY29udGV4dCwgXCJpbml0XCIsIDEsIHtuOiBcImdyX29mZnNldFwiLCB2OiBpbnN0YW5jZS5vZmZzZXR9KTtcbiAgLy9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gaW5zdGFuY2UuX1dlYkdMU2VhcmNoKHNlYXJjaE9iamVjdCkpO1xuICBzZXRUaW1lb3V0KCgpID0+IF9XZWJHTFNlYXJjaChpbnN0YW5jZSwgc2VhcmNoT2JqZWN0KSwgMSk7XG59XG5jb25zdCBzZWFyY2hXaXRoQ2FsbGJhY2sgPSAoaW5zdGFuY2UsIHRyYW5zYWN0aW9uVHJ5dGVzLCBtaW5XZWlnaHRNYWduaXR1ZGUsIGNhbGxiYWNrLCBlcnIpID0+IHtcbiAgaWYgKHRyYW5zYWN0aW9uVHJpdHMubGVuZ3RoIDwgQ29uc3QuVFJBTlNBQ1RJT05fTEVOR1RIIC0gQ29uc3QuSEFTSF9MRU5HVEgpIHJldHVybiBudWxsO1xuICB2YXIgY3VybCA9IG5ldyBDdXJsKCk7XG4gIGxldCB0cmFuc2FjdGlvblRyaXRzID0gQ29udmVydGVyLnRyaXRzKHRyYW5zYWN0aW9uVHJ5dGVzKTtcbiAgY3VybC5hYnNvcmIodHJhbnNhY3Rpb25Ucml0cywgMCwgQ29uc3QuVFJBTlNBQ1RJT05fTEVOR1RIIC0gQ29uc3QuSEFTSF9MRU5HVEgpO1xuICBjb25zdCBzdGF0ZXMgPSBTZWFyY2hJbml0LnRvUGFpcihjdXJsLnN0YXRlLCBtaW5XZWlnaHRNYWduaXR1ZGUpO1xuICBzZWFyY2goaW5zdGFuY2UsIHN0YXRlcywgbWluV2VpZ2h0TWFnbml0dWRlKS50aGVuKGNhbGxiYWNrKS5jYXRjaChlcnIpO1xufVxuY29uc3Qgb2Zmc2V0U3RhdGUgPSAoc3RhdGUpID0+IHtcbiAgICByZXR1cm4gU2VhcmNoSW5pdC50b1BhaXIoQ29udmVydGVyLnRyaXRzKHN0YXRlKSk7XG59XG5jb25zdCBwcmVwYXJlID0gKHRyYW5zYWN0aW9uVHJ5dGVzLCBtaW5XZWlnaHRNYWduaXR1ZGUpID0+IHtcbiAgdmFyIGN1cmwgPSBuZXcgQ3VybCgpO1xuICBsZXQgdHJhbnNhY3Rpb25Ucml0cyA9IENvbnZlcnRlci50cml0cyh0cmFuc2FjdGlvblRyeXRlcyk7XG4gIGN1cmwuYWJzb3JiKHRyYW5zYWN0aW9uVHJpdHMsIDAsIENvbnN0LlRSQU5TQUNUSU9OX0xFTkdUSCAtIENvbnN0LkhBU0hfTEVOR1RIKTtcbiAgdHJhbnNhY3Rpb25Ucml0cy5zbGljZShDb25zdC5UUkFOU0FDVElPTl9MRU5HVEggLSBDb25zdC5IQVNIX0xFTkdUSCwgQ29uc3QuVFJBTlNBQ1RJT05fTEVOR1RIKS5mb3JFYWNoKCh2LGkpID0+IHsgY3VybC5zdGF0ZVtpXSA9IHY7IH0pO1xuICBjb25zdCBzdGF0ZXMgPSBTZWFyY2hJbml0LnRvUGFpcihjdXJsLnN0YXRlKTtcbiAgcmV0dXJuIHN0YXRlcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluc3RhbmNlOiBQZWFybERpdmVySW5zdGFuY2UsXG4gIG9mZnNldFN0YXRlLFxuICBwcmVwYXJlLFxuICBzZWFyY2gsXG4gIGRvTmV4dCxcbn07XG4iLCJjb25zdCBDb25zdCA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJylcbmxldCBcbiAgVFJZVEVfTEVOR1RIID0gMjY3MyxcbiAgVFJBTlNBQ1RJT05fTEVOR1RIPSBUUllURV9MRU5HVEggKiAzLFxuICBMT1dfQklUUz0gMCwvLzAwMDAwMDAwLFxuICBISUdIX0JJVFM9IC0xLC8vMHhGRkZGRkZGRiwvL0ZGRkZGRkZGLDQyOTQ5NjcyOTUsIFxuICBMT1dfMD0gMHhEQjZEQjZEQiwvLzZEQjZEQjZELFxuICBMT1dfMT0gMHhGMUY4RkM3RSwvLzNGMUY4RkM3LFxuICBMT1dfMj0gMHg3RkZGRTAwRiwvL0ZGRkMwMUZGLFxuICBMT1dfMz0gMHhGRkMwMDAwMCwvLzA3RkZGRkZGLFxuICBISUdIXzA9IDB4QjZEQjZEQjYsLy9EQjZEQjZEQixcbiAgSElHSF8xPSAweDhGQzdFM0YxLC8vRjhGQzdFM0YsXG4gIEhJR0hfMj0gMHhGRkMwMUZGRiwvL0Y4MDNGRkZGLFxuICBISUdIXzM9IDB4MDAzRkZGRkY7IC8vRkZGRkZGRkYsXG4vKlxuICBISUdIX0JJVFM9IDB4RkZGRkZGRkZGRkZGRkZGRixcbiAgTE9XX0JJVFM9IDB4MDAwMDAwMDAwMDAwMDAwMCxcbiAgTE9XXzA9IDB4REI2REI2REI2REI2REI2RCxcbiAgSElHSF8wPSAweEI2REI2REI2REI2REI2REIsXG4gIExPV18xPSAweEYxRjhGQzdFM0YxRjhGQzcsXG4gIEhJR0hfMT0gMHg4RkM3RTNGMUY4RkM3RTNGLFxuICBMT1dfMj0gMHg3RkZGRTAwRkZGRkMwMUZGLFxuICBISUdIXzI9IDB4RkZDMDFGRkZGODAzRkZGRixcbiAgTE9XXzM9IDB4RkZDMDAwMDAwN0ZGRkZGRixcbiAgSElHSF8zPSAweDAwM0ZGRkZGRkZGRkZGRkY7XG4gICovXG5cblxuZnVuY3Rpb24gb2Zmc2V0KHN0YXRlcywgb2Zmc2V0KSB7XG4gIHN0YXRlcy5sb3cgW29mZnNldCArIDBdID0gTE9XXzA7XG4gIHN0YXRlcy5sb3cgW29mZnNldCArIDFdID0gTE9XXzE7XG4gIHN0YXRlcy5sb3cgW29mZnNldCArIDJdID0gTE9XXzI7XG4gIHN0YXRlcy5sb3cgW29mZnNldCArIDNdID0gTE9XXzM7XG4gIHN0YXRlcy5oaWdoW29mZnNldCArIDBdID0gSElHSF8wO1xuICBzdGF0ZXMuaGlnaFtvZmZzZXQgKyAxXSA9IEhJR0hfMTtcbiAgc3RhdGVzLmhpZ2hbb2Zmc2V0ICsgMl0gPSBISUdIXzI7XG4gIHN0YXRlcy5oaWdoW29mZnNldCArIDNdID0gSElHSF8zO1xufVxuXG5mdW5jdGlvbiB0b1BhaXIoc3RhdGUpIHtcbiAgY29uc3Qgc3RhdGVzID0ge1xuICAgIGxvdyA6IG5ldyBJbnQzMkFycmF5KENvbnN0LlNUQVRFX0xFTkdUSCksXG4gICAgaGlnaCA6IG5ldyBJbnQzMkFycmF5KENvbnN0LlNUQVRFX0xFTkdUSClcbiAgfVxuICBzdGF0ZS5mb3JFYWNoKCh0cml0LCBpKSA9PiB7XG4gICAgc3dpdGNoICh0cml0KSB7XG4gICAgICBjYXNlIDA6IHtcbiAgICAgICAgc3RhdGVzLmxvd1tpXSA9IEhJR0hfQklUUztcbiAgICAgICAgc3RhdGVzLmhpZ2hbaV0gPSBISUdIX0JJVFM7XG4gICAgICB9IGJyZWFrO1xuICAgICAgY2FzZSAxOiB7XG4gICAgICAgIHN0YXRlcy5sb3dbaV0gPSBMT1dfQklUUztcbiAgICAgICAgc3RhdGVzLmhpZ2hbaV0gPSBISUdIX0JJVFM7XG4gICAgICB9IGJyZWFrO1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBzdGF0ZXMubG93W2ldID0gSElHSF9CSVRTO1xuICAgICAgICBzdGF0ZXMuaGlnaFtpXSA9IExPV19CSVRTO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIG9mZnNldChzdGF0ZXMsIENvbnN0Lk5PTkNFX1NUQVJUKTtcbiAgcmV0dXJuIHN0YXRlcztcbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtKHN0YXRlcykge1xuICB2YXIgc2NyYXRjaHBhZEhpZ2gsIHNjcmF0Y2hwYWRMb3dcbiAgdmFyIHNjcmF0Y2hwYWRJbmRleCA9IDAsIHJvdW5kLCBzdGF0ZUluZGV4O1xuICB2YXIgYWxwaGEsIGJldGEsIGdhbW1hLCBkZWx0YTtcblxuICBmb3IgKHJvdW5kID0gQ29uc3QuTlVNQkVSX09GX1JPVU5EUzsgcm91bmQtLSA+IDA7ICkge1xuICAgIHNjcmF0Y2hwYWRMb3cgPSBzdGF0ZXMubG93LnNsaWNlKCk7XG4gICAgc2NyYXRjaHBhZEhpZ2ggPSBzdGF0ZXMuaGlnaC5zbGljZSgpO1xuXG4gICAgZm9yIChzdGF0ZUluZGV4ID0gMDsgc3RhdGVJbmRleCA8IENvbnN0LlNUQVRFX0xFTkdUSDsgc3RhdGVJbmRleCsrKSB7XG4gICAgICBhbHBoYSA9IHNjcmF0Y2hwYWRMb3dbc2NyYXRjaHBhZEluZGV4XTtcbiAgICAgIGJldGEgPSBzY3JhdGNocGFkSGlnaFtzY3JhdGNocGFkSW5kZXhdO1xuICAgICAgZ2FtbWEgPSBzY3JhdGNocGFkSGlnaFtzY3JhdGNocGFkSW5kZXggKz0gKHNjcmF0Y2hwYWRJbmRleCA8IDM2NSA/IDM2NCA6IC0zNjUpXTtcbiAgICAgIGRlbHRhID0gKGFscGhhIHwgKH5nYW1tYSkpICYgKHNjcmF0Y2hwYWRMb3dbc2NyYXRjaHBhZEluZGV4XSBeIGJldGEpO1xuXG4gICAgICBzdGF0ZXMubG93W3N0YXRlSW5kZXhdID0gfmRlbHRhO1xuICAgICAgc3RhdGVzLmhpZ2hbc3RhdGVJbmRleF0gPSAoYWxwaGEgXiBnYW1tYSkgfCBkZWx0YTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IHRvUGFpciwgdHJhbnNmb3JtIH07XG4vKlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlcywgdHJhbnNhY3Rpb25Ucml0cykge1xuICB2YXIgaSwgb2Zmc2V0ID0gMDtcbiAgdmFyIGo7XG4gIC8vZm9yIChpID0gSEFTSF9MRU5HVEg7IGkgPCBTVEFURV9MRU5HVEg7IGkrKykge1xuICBmb3IgKGkgPSAwOyBpIDwgQ29uc3QuU1RBVEVfTEVOR1RIOyBpKyspIHtcbiAgICBpZiAoaSA+PSBDb25zdC5IQVNIX0xFTkdUSCAmJiBpIDwgQ29uc3QuU1RBVEVfTEVOR1RIKSB7XG4gICAgICBzdGF0ZXMubG93W2ldID0gSElHSF9CSVRTO1xuICAgICAgc3RhdGVzLmhpZ2hbaV0gPSBISUdIX0JJVFM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlcy5sb3dbaV0gPSAwO1xuICAgICAgc3RhdGVzLmhpZ2hbaV0gPSAwO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IChDb25zdC5UUkFOU0FDVElPTl9MRU5HVEggLSBDb25zdC5IQVNIX0xFTkdUSCkgLyBDb25zdC5IQVNIX0xFTkdUSDsgaS0tID4gMDsgKSB7XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgQ29uc3QuSEFTSF9MRU5HVEg7IGorKykge1xuICAgICAgc3dpdGNoICh0cmFuc2FjdGlvblRyaXRzW29mZnNldCsrXSkge1xuICAgICAgICBjYXNlIDA6IHtcbiAgICAgICAgICBzdGF0ZXMubG93W2pdID0gSElHSF9CSVRTO1xuICAgICAgICAgIHN0YXRlcy5oaWdoW2pdID0gSElHSF9CSVRTO1xuICAgICAgICB9IGJyZWFrO1xuICAgICAgICBjYXNlIDE6IHtcbiAgICAgICAgICBzdGF0ZXMubG93W2pdID0gTE9XX0JJVFM7XG4gICAgICAgICAgc3RhdGVzLmhpZ2hbal0gPSBISUdIX0JJVFM7XG4gICAgICAgIH0gYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBzdGF0ZXMubG93W2pdID0gSElHSF9CSVRTO1xuICAgICAgICAgIHN0YXRlcy5oaWdoW2pdID0gTE9XX0JJVFM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdHJhbnNmb3JtKHN0YXRlcyk7XG4gIH1cbiAgc3RhdGVzLmxvd1swXSA9IExPV18wOyAgIC8vMGIxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxTDsgXG4gIHN0YXRlcy5oaWdoWzBdID0gSElHSF8wOyAvLzBiMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMTAxMUw7XG4gIHN0YXRlcy5sb3dbMV0gPSBMT1dfMTsgICAvLzBiMTExMTAwMDExMTExMTAwMDExMTExMTAwMDExMTExMTAwMDExMTExMTAwMDExMTExMTAwMDExMTExMTAwMDExMUw7IFxuICBzdGF0ZXMuaGlnaFsxXSA9IEhJR0hfMTsgLy8wYjEwMDAxMTExMTEwMDAxMTExMTEwMDAxMTExMTEwMDAxMTExMTEwMDAxMTExMTEwMDAxMTExMTEwMDAxMTExMTFMO1xuICBzdGF0ZXMubG93WzJdID0gTE9XXzI7ICAgLy8wYjAxMTExMTExMTExMTExMTExMTEwMDAwMDAwMDAxMTExMTExMTExMTExMTExMTEwMDAwMDAwMDAxMTExMTExMTFMOyBcbiAgc3RhdGVzLmhpZ2hbMl0gPSBISUdIXzI7IC8vMGIxMTExMTExMTExMDAwMDAwMDAwMTExMTExMTExMTExMTExMTExMDAwMDAwMDAwMTExMTExMTExMTExMTExMTExTDtcbiAgc3RhdGVzLmxvd1szXSA9IExPV18zOyAgIC8vMGIxMTExMTExMTExMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTExMTExMTExMTExMTExMTExMTExMTExTDsgXG4gIHN0YXRlcy5oaWdoWzNdID0gSElHSF8zOyAvLzBiMDAwMDAwMDAwMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMUw7XG59XG4qL1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgXG5pbnQgc3VtIChpbnQgYSwgaW50IGIpIHtcbiAgaW50IG15X3N1bSA9IGEgKyBiO1xuICByZXR1cm4gbXlfc3VtID09IDIgPyAtMSA6IChteV9zdW0gPT0gLTIpID8gMSA6IG15X3N1bTtcbn1cbmludCBjb25zIChpbnQgYSwgaW50IGIpIHtcbiAgcmV0dXJuIChhID09IDEgJiYgYiA9PSAxKT8gMSA6IChhID09IC0xICYmIGIgPT0gLTEpID8gLTEgOiAwO1xufVxuaW50IGFueV90IChpbnQgYSwgaW50IGIpIHtcbiAgaW50IG15X2FueSA9IGEgKyBiO1xuICByZXR1cm4gbXlfYW55ID09IDAgPyAwIDogKG15X2FueSA+IDApID8gMSA6IC0xO1xufVxuaXZlYzIgZnVsbF9hZGRlcihpbnQgYSwgaW50IGIsIGludCBjKSB7XG4gIGludCBjX2EsIGNfYiwgc3VtX2FiLCBjX3M7XG5cbiAgY19hICAgID0gY29ucyhhLGIpO1xuICBzdW1fYWIgPSBzdW0oYSxiKTtcbiAgY19iICAgID0gY29ucyhzdW1fYWIsYyk7XG4gIGNfcyAgICA9IGFueV90KGNfYSwgY19iKTtcblxuICByZXR1cm4gaXZlYzIoc3VtKHN1bV9hYiwgYyksIGNfcyk7XG59XG5pdmVjMiBnZXRfc3VtX3RvX2luZGV4KGludCBmcm9tLCBpbnQgdG8sIGludCBudW1iZXJfdG9fYWRkLCBpbnQgcm93KSB7XG4gIGludCB0cml0X3RvX2FkZCwgdHJpdF9hdF9pbmRleCwgcG93LCBjYXJyeSwgbnVtX2NhcnJ5O1xuICBpdmVjMiByZWFkX2luLCBzdW1fb3V0LCBvdXRfdHJpdDtcbiAgcG93ID0gMTtcbiAgY2FycnkgPSAwO1xuICBudW1fY2FycnkgPSAwO1xuXG4gIGZvcihpbnQgaSA9IGZyb207IGkgPCB0bzsgaSsrKSB7XG4gICAgLy9pZih0cml0X3RvX2FkZCA9PSAwICYmIHN1bV9vdXQudCA9PSAwKSBjb250aW51ZTtcblxuICAgIHJlYWRfaW4gPSByZWFkX2F0ICggaXZlYzIgKGksIHJvdykpLnJnO1xuXG4gICAgdHJpdF90b19hZGQgPSAoKG51bWJlcl90b19hZGQgLyBwb3cpICUgMykgKyBudW1fY2Fycnk7XG4gICAgbnVtX2NhcnJ5ID0gdHJpdF90b19hZGQgPiAxID8gMSA6IDA7XG4gICAgdHJpdF90b19hZGQgPSAodHJpdF90b19hZGQgPT0gMiA/IC0xIDogKHRyaXRfdG9fYWRkID09IDMgPyAwIDogdHJpdF90b19hZGQpKTtcblxuICAgIHN1bV9vdXQgPSBmdWxsX2FkZGVyKFxuICAgICAgKHJlYWRfaW4ucyA9PSBMT1dfQklUUyA/IDEgOiByZWFkX2luLnQgPT0gTE9XX0JJVFM/IC0xIDogMCksIFxuICAgICAgdHJpdF90b19hZGQsIFxuICAgICAgY2FycnlcbiAgICApO1xuXG4gICAgaWYobXlfY29vcmQueCA9PSBpKSBicmVhaztcbiAgICBjYXJyeSA9IHN1bV9vdXQudDtcbiAgICBwb3cgKj0zO1xuICB9XG4gIGlmKHN1bV9vdXQucyA9PSAwKSB7XG4gICAgcmV0dXJuIGl2ZWMyKEhJR0hfQklUUyk7XG4gIH0gZWxzZSBpZiAoc3VtX291dC5zID09IDEpIHtcbiAgICByZXR1cm4gaXZlYzIoTE9XX0JJVFMsIEhJR0hfQklUUyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGl2ZWMyKEhJR0hfQklUUywgTE9XX0JJVFMpO1xuICB9XG59XG5gXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGBcbi8vIENob29zZSBoaWdoICE9IDAgaWYgeW91IHdhbnQgdG8gYmFycmllciByZyB2YWx1ZXMsIDAgaWYgeW91IHdhbnQgdG8gYmFycmllciBiYVxuI2RlZmluZSBXQUlUTlVNIDJcbnZvaWQgYmFycmllcihpdmVjMiB3YXRjaF9jb29yZHMsIGludCBoaWdoKSB7XG4gIGl2ZWM0IG15X3ZlYyA9IHJlYWQoKTtcbiAgaWYod2F0Y2hfY29vcmRzID09IG15X2Nvb3JkKSB7XG4gICAgaW50IGhvbGRfaW5kZXggPSAwO1xuICAgIGl2ZWM0IGhvbGRfdGV4ZWw7XG4gICAgbXlfdmVjLmcgPSBteV92ZWMuYSArIDE7XG4gICAgbXlfdmVjLmIgPSBteV92ZWMuZyArIDE7XG4gICAgY29tbWl0KG15X3ZlYyk7XG4gICAgd2hpbGUoaG9sZF9pbmRleCA8IFNUQVRFX0xFTkdUSCkge1xuICAgICAgaG9sZF90ZXhlbCA9IHJlYWRfYXQoaXZlYzIoaG9sZF9pbmRleCwgbXlfY29vcmQueSkpO1xuICAgICAgaWYoKGhpZ2ggPT0gMCAmJiBob2xkX3RleGVsLnIgPT0gV0FJVE5VTSkgfHwoaGlnaCAhPSAwICYmIGhvbGRfdGV4ZWwuYSA9PSBXQUlUTlVNKSlcbiAgICAgICAgaG9sZF9pbmRleCsrO1xuICAgIH1cbiAgICBteV92ZWMuYSA9IG15X3ZlYy5nO1xuICAgIC8vbXlfdmVjLmEgPSAxMjM7XG4gIH0gZWxzZSB7XG4gICAgaXZlYzQgd2F0Y2ggPSByZWFkX2F0KHdhdGNoX2Nvb3Jkcyk7IC8vIHI6IHZhbCB0byB3YXRjaCwgZzogZXhwZWN0ZWQgdmFsLCBiOiBuZXh0IHZhbCAoc2hvdWxkIGJlIDErIGV4cGVjdGVkIHZhbClcbiAgICBpbnQgaG9sZCA9IGhpZ2ggPT0gMCA/IG15X3ZlYy5yIDogbXlfdmVjLmE7XG4gICAgaWYoaGlnaCA9PSAwKVxuICAgICAgbXlfdmVjLnIgPSBXQUlUTlVNO1xuICAgIGVsc2VcbiAgICAgIG15X3ZlYy5hID0gV0FJVE5VTTtcbiAgICBjb21taXQobXlfdmVjKTtcbiAgICB3aGlsZSh3YXRjaC5nID09IHdhdGNoLmIgfHwgd2F0Y2guYSAhPSB3YXRjaC5nKSB7XG4gICAgICAvL3doaWxlKHdhdGNoLmcgPT0gd2F0Y2guYiB8fCB3YXRjaC5hICE9IDEyMykge1xuICAgICAgd2F0Y2ggPSByZWFkX2F0KHdhdGNoX2Nvb3Jkcyk7XG4gICAgfVxuICB9XG4gIGNvbW1pdChteV92ZWMpO1xufVxuYFxuIiwibW9kdWxlLmV4cG9ydHMgPSB7IGRvX2NoZWNrOiBgXG5pbnQgY2hlY2soaW50IHJvdywgaW50IG1pbl93ZWlnaHRfbWFnbml0dWRlKSB7XG4gIGludCBub25jZV9wcm9iZSwgaTtcbiAgaXZlYzIgcl90ZXhlbDtcbiAgbm9uY2VfcHJvYmUgPSBISUdIX0JJVFM7XG4gIGZvcihpID0gbWluX3dlaWdodF9tYWduaXR1ZGU7IGktLSA+IDA7ICkge1xuICAgIHJfdGV4ZWwgPSByZWFkX2F0KGl2ZWMyKEhBU0hfTEVOR1RIIC0gMSAtIGksIHJvdykpLmJhO1xuICAgIG5vbmNlX3Byb2JlICY9IH4ocl90ZXhlbC5zIF4gcl90ZXhlbC50KTtcbiAgICBpZihub25jZV9wcm9iZSA9PSAwKSBicmVhaztcbiAgfVxuICByZXR1cm4gbm9uY2VfcHJvYmU7XG59XG5gLCBrX2NoZWNrOiBgXG51bmlmb3JtIGludCBtaW5XZWlnaHRNYWduaXR1ZGU7XG52b2lkIG1haW4oKSB7XG4gIGluaXQoKTtcbiAgaXZlYzQgbXlfdmVjID0gcmVhZCgpO1xuICBpZihteV9jb29yZC54ID09IFNUQVRFX0xFTkdUSCkge1xuICAgIG15X3ZlYy5yID0gbWluV2VpZ2h0TWFnbml0dWRlO1xuICAgIG15X3ZlYy5hID0gY2hlY2sobXlfY29vcmQueSwgbWluV2VpZ2h0TWFnbml0dWRlKTtcbiAgfVxuICBjb21taXQobXlfdmVjKTtcbn1cbmAsIGNvbDogYFxudm9pZCBtYWluKCkge1xuICBpbml0KCk7XG4gIGl2ZWM0IG15X3ZlYyA9IHJlYWQoKTtcbiAgaW50IGk7XG4gIGlmKG15X2Nvb3JkLnggPT0gU1RBVEVfTEVOR1RIICYmIG15X2Nvb3JkLnkgPT0gMCkge1xuICAgIG15X3ZlYy5iID0gMDtcbiAgICBpZihteV92ZWMuYSA9PSAwKSB7XG4gICAgICBpdmVjNCByZWFkX3ZlYztcbiAgICAgIG15X3ZlYy5iID0gLTE7XG4gICAgICBmb3IoaSA9IDE7IGkgPCBpbnQoc2l6ZS55KTsgaSsrKSB7XG4gICAgICAgIHJlYWRfdmVjID0gcmVhZF9hdCggaXZlYzIoIFNUQVRFX0xFTkdUSCwgaSkpO1xuICAgICAgICBpZihyZWFkX3ZlYy5hICE9IDApIHtcbiAgICAgICAgICBteV92ZWMuYSA9IHJlYWRfdmVjLmE7XG4gICAgICAgICAgbXlfdmVjLmIgPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbW1pdChteV92ZWMpO1xufVxuYFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBgXG52b2lkIG1haW4oKSB7XG4gIGluaXQoKTtcbiAgaXZlYzQgbXlfdmVjID0gcmVhZCgpO1xuICBpZihteV9jb29yZC55ID09IDAgJiYgbXlfY29vcmQueCA9PSBTVEFURV9MRU5HVEgpIHtcbiAgICBteV92ZWMuZyA9IGNoZWNrKG15X3ZlYy5iLCBteV92ZWMucik7XG4gIH1cbiAgaWYobXlfY29vcmQueSA9PSAwICYmIG15X2Nvb3JkLnggPCBIQVNIX0xFTkdUSCkge1xuICAgIGl2ZWM0IGluZm9fdmVjID0gcmVhZF9hdChpdmVjMihTVEFURV9MRU5HVEgsIDApKTtcbiAgICBpbnQgbm9uY2VfcHJvYmUgPSBpbmZvX3ZlYy5hO1xuICAgIGludCByb3cgPSBpbmZvX3ZlYy5iO1xuICAgIGl2ZWM0IGhhc2hfdmVjID0gcmVhZF9hdChpdmVjMihteV9jb29yZC54LCByb3cpKTtcbiAgICBteV92ZWMuYSA9IChoYXNoX3ZlYy5yICYgbm9uY2VfcHJvYmUpID09IDA/IDEgOiAoKGhhc2hfdmVjLmcgJiBub25jZV9wcm9iZSkgPT0gMD8gLTEgOiAwKTtcbiAgfVxuICBjb21taXQobXlfdmVjKTtcbn1cbmBcbiIsIm1vZHVsZS5leHBvcnRzID0gXG5gI2RlZmluZSBIQVNIX0xFTkdUSCAyNDNcbiNkZWZpbmUgTlVNQkVSX09GX1JPVU5EUyA4MVxuI2RlZmluZSBJTkNSRU1FTlRfU1RBUlQgSEFTSF9MRU5HVEggLSA2NFxuI2RlZmluZSBTVEFURV9MRU5HVEggMyAqIEhBU0hfTEVOR1RIXG4jZGVmaW5lIEhBTEZfTEVOR1RIIDM2NFxuI2RlZmluZSBISUdIX0JJVFMgMHhGRkZGRkZGRlxuI2RlZmluZSBMT1dfQklUUyAweDAwMDAwMDAwXG5gXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGBcbnZvaWQgbWFpbigpIHtcbiAgaW5pdCgpO1xuICBpdmVjNCBteV92ZWMgPSByZWFkKCk7XG4gIGlmKG15X2Nvb3JkLnggPj0gSU5DUkVNRU5UX1NUQVJUICYmIG15X2Nvb3JkLnggPCBIQVNIX0xFTkdUSCApIHtcbiAgICBteV92ZWMucmcgPSBnZXRfc3VtX3RvX2luZGV4KElOQ1JFTUVOVF9TVEFSVCwgSEFTSF9MRU5HVEgsIDEsIG15X2Nvb3JkLnkpO1xuICB9XG4gIGlmKG15X2Nvb3JkLnggPT0gU1RBVEVfTEVOR1RIICkge1xuICAgIG15X3ZlYy5yZyA9IGl2ZWMyKDApO1xuICB9XG4gIG15X3ZlYy5iYSA9IG15X3ZlYy5yZztcbiAgY29tbWl0KG15X3ZlYyk7XG59XG5gXG4iLCJjb25zdCBoZWFkZXJzICAgID0gcmVxdWlyZSggJy4vaGVhZGVycycpO1xuY29uc3QgZmluYWxpemUgICA9IHJlcXVpcmUoICcuL2ZpbmFsaXplJyk7XG5jb25zdCBiYXJyaWVyICAgID0gcmVxdWlyZSggJy4vYmFycmllcicpO1xuY29uc3QgdHdpc3QgICAgICA9IHJlcXVpcmUoICcuL3RyYW5zZm9ybScpO1xuY29uc3QgY2hlY2sgICAgICA9IHJlcXVpcmUoICcuL2NoZWNrJyk7XG5jb25zdCBhZGQgICAgICAgID0gcmVxdWlyZSggJy4vYWRkJyk7XG5jb25zdCBpbml0ICAgICAgID0gcmVxdWlyZSggJy4vaW5pdCcpO1xuY29uc3QgaW5jcmVtZW50ICA9IHJlcXVpcmUoICcuL2luY3JlbWVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCAgICAgIDogaGVhZGVycyArIGFkZCArIGluaXQsXG4gIGluY3JlbWVudCA6IGhlYWRlcnMgKyBhZGQgKyBpbmNyZW1lbnQsXG4gIHRyYW5zZm9ybSA6IGhlYWRlcnMgKyB0d2lzdCxcbiAgY29sX2NoZWNrIDogaGVhZGVycyArIGNoZWNrLmNvbCxcbiAgY2hlY2sgICAgIDogaGVhZGVycyArIGNoZWNrLmRvX2NoZWNrICsgY2hlY2sua19jaGVjayxcbiAgZmluYWxpemUgIDogaGVhZGVycyArIGNoZWNrLmRvX2NoZWNrICsgZmluYWxpemUsXG59XG4iLCJsZXQga19pbml0ID0gYFxudm9pZCBtYWluKCkge1xuICBpbml0KCk7XG4gIGNvbW1pdChvZmZzZXQoKSk7XG59XG5gXG5sZXQgb2Zmc2V0ID0gYFxudW5pZm9ybSBpbnQgZ3Jfb2Zmc2V0O1xuaXZlYzQgb2Zmc2V0KCkge1xuICBpZihteV9jb29yZC54ID49IEhBU0hfTEVOR1RIIC8gMyAmJiBteV9jb29yZC54IDwgSEFTSF9MRU5HVEggLyAzICogMiApIHtcbiAgICBpdmVjNCBteV92ZWM7XG4gICAgbXlfdmVjLnJnID0gZ2V0X3N1bV90b19pbmRleChIQVNIX0xFTkdUSCAvIDMsIEhBU0hfTEVOR1RIIC8gMyAqIDIsIG15X2Nvb3JkLnkgKyBncl9vZmZzZXQsIDApO1xuICAgIHJldHVybiBteV92ZWM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlYWRfYXQoaXZlYzIobXlfY29vcmQueCwwKSk7XG4gIH1cbn1cbmBcbm1vZHVsZS5leHBvcnRzID0gb2Zmc2V0ICsga19pbml0XG4iLCJsZXQgdHdpc3QgPSBgXG5pdmVjMiB0d2lzdCgpIHtcbiAgaW50IGFscGhhLCBiZXRhLCBnYW1tYSwgZGVsdGE7XG4gIGl2ZWM0IHYxLCB2MjtcbiAgaW50IGogPSBteV9jb29yZC54O1xuXG4gIHYxID0gcmVhZF9hdChpdmVjMihqID09IDA/IDA6KCgoaiAtIDEpJTIpKzEpKkhBTEZfTEVOR1RIIC0gKChqLTEpPj4xKSwgbXlfY29vcmQueSkpO1xuICB2MiA9IHJlYWRfYXQoaXZlYzIoKChqJTIpKzEpKkhBTEZfTEVOR1RIIC0gKChqKT4+MSksIG15X2Nvb3JkLnkpKTtcbiAgYWxwaGEgPSB2MS5iO1xuICBiZXRhID0gdjEuYTtcbiAgZ2FtbWEgPSB2Mi5hO1xuICBkZWx0YSA9IChhbHBoYSB8ICh+Z2FtbWEpKSAmICh2Mi5iIF4gYmV0YSk7Ly92Mi5iID09PSBzdGF0ZV9sb3dbdDJdXG5cbiAgcmV0dXJuIGl2ZWMyKH5kZWx0YSwgKGFscGhhIF4gZ2FtbWEpIHwgZGVsdGEpO1xufVxuYFxubGV0ICB0d2lzdE1haW4gPSBgXG52b2lkIG1haW4oKSB7XG4gIGluaXQoKTtcbiAgaXZlYzQgbXlfdmVjID0gcmVhZCgpO1xuICBpZihteV9jb29yZC54IDwgU1RBVEVfTEVOR1RIKVxuICAgIG15X3ZlYy5iYSA9IHR3aXN0KCk7XG4gIGNvbW1pdChteV92ZWMpO1xufVxuYFxuXG5sZXQga190cmFuc2Zvcm0gPSBgXG52b2lkIHRyYW5zZm9ybSgpIHtcbiAgaXZlYzIgc2NyYXRjaHBhZDtcbiAgaXZlYzQgc3RhdGUgPSByZWFkKCk7XG4gIGludCByb3VuZDtcbiAgZm9yKHJvdW5kID0gMDsgcm91bmQgPCBOVU1CRVJfT0ZfUk9VTkRTOyByb3VuZCsrKSB7XG4gICAgc2NyYXRjaHBhZCA9IHR3aXN0KCk7XG4gICAgLy9iYXJyaWVyKGl2ZWMyKFNUQVRFX0xFTkdUSCxteV9jb29yZC55KSwgMCk7XG4gICAgc3RhdGUuYiA9IHNjcmF0Y2hwYWQuczsvL3NwX2xvd1tpXTtcbiAgICBzdGF0ZS5hID0gc2NyYXRjaHBhZC50Oy8vc3BfaGlnaFtpXTtcbiAgICBjb21taXQoc3RhdGUpO1xuICAgIC8vYmFycmllcihpdmVjMihTVEFURV9MRU5HVEgsbXlfY29vcmQueSksIDApO1xuICB9XG59XG5gXG5cbm1vZHVsZS5leHBvcnRzID0gdHdpc3QgKyB0d2lzdE1haW5cbiJdLCJzb3VyY2VSb290IjoiIn0=