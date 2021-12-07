export const dec2hex = (dec: number) => dec.toString(16).padStart(getPadLength(dec), "0").toUpperCase();

export const bufferToHexString = (buffer: Buffer | Uint8Array | number[], prepend?: string, separator?: string) => {
  let str = "";
  for (let i = 0; i < buffer.length; i++) {
    if (prepend) {
      str += prepend;
    }
    str += dec2hex(buffer[i]);
    if (i <= buffer.length - 2) {
      if (separator) {
        str += separator;
      } else {
        str += " ";
      }
    }
  }
  return str;
};

/**
 * @function
 * @description Return a formatted string of a buffer in a specific format.
 *
 * @param {Buffer} buffer - Data buffer to calculate the CRC from
 * @param {number} startIndex - The start index of the input buffer
 * @param {number} maxLength - The length of the input buffer
 * @param {number} printMode - 0=hex, 1=ascii, 2=char, 3=decimal
 * @returns {(string|null)} Formatted string or null
 */

export const printBufferToConsole = (buffer: number[] | Buffer | Uint8Array, startIndex: number, maxLength: number, printMode: number): string => {
  switch (printMode) {
    case 0: {
      // HEX
      let str = "";
      for (let i = startIndex; i < maxLength; i++) {
        str += dec2hex(buffer[i]);
        if (i + 1 < maxLength) {
          str += " ";
        }
      }
      return str;
    }
    case 1:
    case 2: {
      // ASCII, CHAR
      let str = "";
      for (let i = startIndex; i < maxLength; i++) {
        str += decimalToChar(buffer[i]);
      }
      return str;
    }
    case 3: {
      // DECIMAL
      let str = "";
      for (let i = startIndex; i < maxLength; i++) {
        str += paddedDecimal(buffer[i]);
        if (i + 1 < maxLength) {
          str += " ";
        }
      }
      return str;
    }
  }
  return "";
};

const is8Bit = (test: number) => test >= 0 && test < 256;
const is16Bit = (test: number) => test >= 256 && test < 65536;
const is24Bit = (test: number) => test >= 65536 && test < 16777216;
const is32Bit = (test: number) => test >= 16777216 && test < 4294967296;

const getPadLength = (test: number) => {
  if (is8Bit(test)) {
    return 2;
  }
  if (is16Bit(test)) {
    return 4;
  }
  if (is24Bit(test)) {
    return 6;
  }
  if (is32Bit(test)) {
    return 8;
  }
  return 16;
};

/** @private
 * @function
 * @description Decimal to hexadecimal string
 *
 * @param {number} dec value - Data buffer to calculate the CRC from
 * @returns {string} Hex representation
 */
export const decimalToHex = (dec: number): string => dec.toString(16).padStart(getPadLength(dec), "0").toUpperCase();

/** @private
 * @function
 * @description Pad a decimal number to form a double
 *
 * @param {number} dec - Data buffer to calculate the CRC from
=      * @returns {string} formatted string
 */
export const paddedDecimal = (dec: number): string => dec.toString().padStart(2, "0").toUpperCase();

/** @private
 * @function
 * @description Convert a decimal value to char representation
 *
 * @param {number} dec - Data buffer to calculate the CRC from
 * @returns {string} character string
 */
export const decimalToChar = (dec: number): string => String.fromCharCode(dec);

/** @private
 * @function
 * @description Convert a decimal value to ascii representation
 *
 * @param {number} dec - Data buffer to calculate the CRC from
 * @returns {string} ascii string
 */
export const decimalToAscii = (dec: number): string => decimalToChar(dec);
