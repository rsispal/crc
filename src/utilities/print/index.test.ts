import { dec2hex, bufferToHexString, printBufferToConsole, decimalToHex, paddedDecimal, decimalToChar, decimalToAscii } from "./";

describe("Utilities :: dec2Hex", () => {
  const cases: [number, string][] = [
    [0, "00"],
    [1, "01"],
    [2, "02"],
    [3, "03"],
    [10, "0A"],
    [11, "0B"],
    [12, "0C"],
    [16, "10"],
    [17, "11"],
    [18, "12"],
    [28, "1C"],
    [29, "1D"],
    [30, "1E"],
    [32, "20"],
    [33, "21"],
    [64, "40"],
    [65, "41"],
    [66, "42"],
    [100, "64"],
    [150, "96"],
    [200, "C8"],
    [220, "DC"],
    [240, "F0"],
    [250, "FA"],
    [255, "FF"],
    [300, "012C"],
  ];

  test.each(cases)("Given decimal %p as argument, dec2Hex should return %p", (input, expectedResult) => {
    const result = dec2hex(input);
    expect(result).toEqual(expectedResult);
  });
});
describe("Utilities :: bufferToHexString", () => {
  describe("Utilities :: bufferToHexString - no parameters", () => {
    const cases0: [number[], string][] = [
      [[], ""],
      [[255], "FF"],
      [[0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16], "00 01 02 03 04 05 06 07 08 0E 0F 10"],
      [[255, 256, 512], "FF 0100 0200"],
    ];
    const cases1: [Buffer, string][] = [
      [Buffer.from([]), ""],
      [Buffer.from([255]), "FF"],
      [Buffer.from([255, 256, 512]), "FF 00 00"],
      [Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16]), "00 01 02 03 04 05 06 07 08 0E 0F 10"],
    ];
    const cases2: [Uint8Array, string][] = [
      [new Uint8Array([]), ""],
      [new Uint8Array([255]), "FF"],
      [new Uint8Array([255, 256, 512]), "FF 00 00"],
      [new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16]), "00 01 02 03 04 05 06 07 08 0E 0F 10"],
    ];
    test.each(cases0)("Given number array %p as argument, bufferToHexString should return %p", (input, expectedResult) => {
      const result = bufferToHexString(input);
      expect(result).toEqual(expectedResult);
    });

    test.each(cases1)("Given Buffer %p as argument, bufferToHexString should return %p", (input, expectedResult) => {
      const result = bufferToHexString(input);
      expect(result).toEqual(expectedResult);
    });

    test.each(cases2)("Given Uint8Array %p as argument, bufferToHexString should return %p", (input, expectedResult) => {
      const result = bufferToHexString(input);
      expect(result).toEqual(expectedResult);
    });
  });
  describe("Utilities :: bufferToHexString - prepend parameter", () => {
    const cases0: [number[], string][] = [
      [[], ""],
      [[255], "0xFF"],
      [[0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16], "0x00 0x01 0x02 0x03 0x04 0x05 0x06 0x07 0x08 0x0E 0x0F 0x10"],
      [[255, 256, 512], "0xFF 0x0100 0x0200"],
    ];
    const cases1: [Buffer, string][] = [
      [Buffer.from([]), ""],
      [Buffer.from([255]), "0xFF"],
      [Buffer.from([255, 256, 512]), "0xFF 0x00 0x00"],
      [Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16]), "0x00 0x01 0x02 0x03 0x04 0x05 0x06 0x07 0x08 0x0E 0x0F 0x10"],
    ];
    const cases2: [Uint8Array, string][] = [
      [new Uint8Array([]), ""],
      [new Uint8Array([255]), "0xFF"],
      [new Uint8Array([255, 256, 512]), "0xFF 0x00 0x00"],
      [new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16]), "0x00 0x01 0x02 0x03 0x04 0x05 0x06 0x07 0x08 0x0E 0x0F 0x10"],
    ];
    test.each(cases0)("Given number array %p as argument, bufferToHexString should return %p", (input, expectedResult) => {
      const result = bufferToHexString(input, "0x");
      expect(result).toEqual(expectedResult);
    });

    test.each(cases1)("Given Buffer %p as argument, bufferToHexString should return %p", (input, expectedResult) => {
      const result = bufferToHexString(input, "0x");
      expect(result).toEqual(expectedResult);
    });

    test.each(cases2)("Given Uint8Array %p as argument, bufferToHexString should return %p", (input, expectedResult) => {
      const result = bufferToHexString(input, "0x");
      expect(result).toEqual(expectedResult);
    });
  });
  describe("Utilities :: bufferToHexString - separator parameter", () => {
    const cases0: [number[], string][] = [
      [[], ""],
      [[255], "FF"],
      [[0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16], "00,01,02,03,04,05,06,07,08,0E,0F,10"],
      [[255, 256, 512], "FF,0100,0200"],
    ];
    const cases1: [Buffer, string][] = [
      [Buffer.from([]), ""],
      [Buffer.from([255]), "FF"],
      [Buffer.from([255, 256, 512]), "FF,00,00"],
      [Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16]), "00,01,02,03,04,05,06,07,08,0E,0F,10"],
    ];
    const cases2: [Uint8Array, string][] = [
      [new Uint8Array([]), ""],
      [new Uint8Array([255]), "FF"],
      [new Uint8Array([255, 256, 512]), "FF,00,00"],
      [new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16]), "00,01,02,03,04,05,06,07,08,0E,0F,10"],
    ];
    test.each(cases0)("Given number array %p as argument, bufferToHexString should return %p", (input, expectedResult) => {
      const result = bufferToHexString(input, undefined, ",");
      expect(result).toEqual(expectedResult);
    });

    test.each(cases1)("Given Buffer %p as argument, bufferToHexString should return %p", (input, expectedResult) => {
      const result = bufferToHexString(input, undefined, ",");
      expect(result).toEqual(expectedResult);
    });

    test.each(cases2)("Given Uint8Array %p as argument, bufferToHexString should return %p", (input, expectedResult) => {
      const result = bufferToHexString(input, undefined, ",");
      expect(result).toEqual(expectedResult);
    });
  });
});
describe("Utilities :: printBufferToConsole", () => {
  describe("Utilities :: printBufferToConsole - hex output", () => {
    const cases0: [number[], number, number, string][] = [
      [[], 0, 0, ""],
      [[255], 0, 1, "FF"],
      [[0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16], 0, 12, "00 01 02 03 04 05 06 07 08 0E 0F 10"],
      [[255, 256, 512], 0, 3, "FF 0100 0200"],
    ];
    test.each(cases0)("Given number array %p, startIndex %p, endIndex %p as arguments, bufferToHexString should return %p", (input, startIndex, endIndex, expectedResult) => {
      const result = printBufferToConsole(input, startIndex, endIndex, 0);
      expect(result).toEqual(expectedResult);
    });
  });
  describe("Utilities :: printBufferToConsole - decimal output", () => {
    const cases0: [number[], number, number, string][] = [
      [[], 0, 0, ""],
      [[255], 0, 1, "255"],
      [[0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16], 0, 12, "00 01 02 03 04 05 06 07 08 14 15 16"],
      [[255, 256, 512], 0, 3, "255 256 512"],
    ];
    test.each(cases0)("Given number array %p, startIndex %p, endIndex %p as arguments, bufferToHexString should return %p", (input, startIndex, endIndex, expectedResult) => {
      const result = printBufferToConsole(input, startIndex, endIndex, 3);
      expect(result).toEqual(expectedResult);
    });
  });
});
describe("Utilities :: decimalToHex", () => {
  const cases: [number, string][] = [
    [0, "00"],
    [1, "01"],
    [2, "02"],
    [3, "03"],
    [10, "0A"],
    [11, "0B"],
    [12, "0C"],
    [16, "10"],
    [17, "11"],
    [18, "12"],
    [28, "1C"],
    [29, "1D"],
    [30, "1E"],
    [32, "20"],
    [33, "21"],
    [64, "40"],
    [65, "41"],
    [66, "42"],
    [100, "64"],
    [150, "96"],
    [200, "C8"],
    [220, "DC"],
    [240, "F0"],
    [250, "FA"],
    [255, "FF"],
    [300, "012C"],
  ];

  test.each(cases)("Given decimal %p as argument, dec2Hex should return %p", (input, expectedResult) => {
    const result = decimalToHex(input);
    expect(result).toEqual(expectedResult);
  });
});
describe("Utilities :: paddedDecimal", () => {
  const cases: [number, string][] = [
    [0, "00"],
    [1, "01"],
    [2, "02"],
    [3, "03"],
    [10, "10"],
    [11, "11"],
    [12, "12"],
    [16, "16"],
    [17, "17"],
    [18, "18"],
    [28, "28"],
    [29, "29"],
    [30, "30"],
    [32, "32"],
    [33, "33"],
    [64, "64"],
    [65, "65"],
    [66, "66"],
    [100, "100"],
    [150, "150"],
    [200, "200"],
    [220, "220"],
    [240, "240"],
    [250, "250"],
    [255, "255"],
    [300, "300"],
  ];

  test.each(cases)("Given decimal %p as argument, paddedDecimal should return %p", (input, expectedResult) => {
    const result = paddedDecimal(input);
    expect(result).toEqual(expectedResult);
  });
});
describe("Utilities :: decimalToChar", () => {
  const cases: [number, string][] = [
    [0, String.fromCharCode(0)],
    [1, String.fromCharCode(1)],
    [2, String.fromCharCode(2)],
    [3, String.fromCharCode(3)],
    [10, String.fromCharCode(10)],
    [11, String.fromCharCode(11)],
    [12, String.fromCharCode(12)],
    [16, String.fromCharCode(16)],
    [17, String.fromCharCode(17)],
    [18, String.fromCharCode(18)],
    [28, String.fromCharCode(28)],
    [29, String.fromCharCode(29)],
    [30, String.fromCharCode(30)],
    [32, String.fromCharCode(32)],
    [33, String.fromCharCode(33)],
    [64, String.fromCharCode(64)],
    [65, String.fromCharCode(65)],
    [66, String.fromCharCode(66)],
    [100, String.fromCharCode(100)],
    [150, String.fromCharCode(150)],
    [200, String.fromCharCode(200)],
    [220, String.fromCharCode(220)],
    [240, String.fromCharCode(240)],
    [250, String.fromCharCode(250)],
    [255, String.fromCharCode(255)],
    [300, String.fromCharCode(300)],
  ];

  test.each(cases)("Given decimal %p as argument, decimalToChar should return %p", (input, expectedResult) => {
    const result = decimalToChar(input);
    expect(result).toEqual(expectedResult);
  });
});
describe("Utilities :: decimalToAscii", () => {
  const cases: [number, string][] = [
    [0, String.fromCharCode(0)],
    [1, String.fromCharCode(1)],
    [2, String.fromCharCode(2)],
    [3, String.fromCharCode(3)],
    [10, String.fromCharCode(10)],
    [11, String.fromCharCode(11)],
    [12, String.fromCharCode(12)],
    [16, String.fromCharCode(16)],
    [17, String.fromCharCode(17)],
    [18, String.fromCharCode(18)],
    [28, String.fromCharCode(28)],
    [29, String.fromCharCode(29)],
    [30, String.fromCharCode(30)],
    [32, String.fromCharCode(32)],
    [33, String.fromCharCode(33)],
    [64, String.fromCharCode(64)],
    [65, String.fromCharCode(65)],
    [66, String.fromCharCode(66)],
    [100, String.fromCharCode(100)],
    [150, String.fromCharCode(150)],
    [200, String.fromCharCode(200)],
    [220, String.fromCharCode(220)],
    [240, String.fromCharCode(240)],
    [250, String.fromCharCode(250)],
    [255, String.fromCharCode(255)],
    [300, String.fromCharCode(300)],
  ];

  test.each(cases)("Given decimal %p as argument, decimalToAscii should return %p", (input, expectedResult) => {
    const result = decimalToAscii(input);
    expect(result).toEqual(expectedResult);
  });
});
