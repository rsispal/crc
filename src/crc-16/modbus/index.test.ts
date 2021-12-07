import { CRC16_MODBUS } from ".";
import { CRC16 } from "../../types";

describe("CRC16 :: CRC16_MODBUS", () => {
  let instance: CRC16_MODBUS;
  beforeEach(() => {
    instance = new CRC16_MODBUS();
  });

  describe("CRC16 :: CRC16_MODBUS - calculate", () => {
    const cases: [Uint8Array, number, number, CRC16][] = [
      [new Uint8Array([]), 0, 0, { msb: 255, lsb: 255 }],
      [new Uint8Array([0]), 0, 1, { msb: 191, lsb: 64 }],
      [new Uint8Array([255]), 0, 1, { msb: 255, lsb: 0 }],
      [new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), 0, 10, { msb: 116, lsb: 69 }],
      [new Uint8Array([255, 255, 255, 255]), 0, 4, { msb: 1, lsb: 176 }],
      [
        new Uint8Array([0x00, 0x2c, 0x01, 0x00, 0x00, 0xe6, 0x1d, 0x00, 0x00, 0x65, 0x02, 0xec, 0x57, 0x00]),
        1,
        10,
        { lsb: 87, msb: 236 },
      ],
      [
        new Uint8Array([
          0x00, 0x2d, 0x01, 0x00, 0x01, 0x06, 0x04, 0x00, 0xc9, 0x00, 0xd1, 0x07, 0x01, 0x00, 0x2b, 0x04, 0x57, 0x00, 0x0a, 0x29,
          0x7e, 0x04, 0x05, 0x00, 0x0c, 0x79, 0xd8, 0x06, 0x00, 0x4d, 0x58, 0x35, 0x30, 0x30, 0x30, 0x2d, 0x30, 0x35, 0x33, 0x2d,
          0x34, 0x37, 0x20, 0x20, 0x20, 0x02, 0x00, 0x00, 0x00, 0x01, 0x00, 0x11, 0x00, 0x01, 0x04, 0x00, 0x0c, 0x00, 0x00, 0x00,
          0x35, 0x00, 0x2f, 0x00, 0xf4, 0x01, 0x07, 0xa9, 0x00,
        ]),
        1,
        65,
        { lsb: 169, msb: 7 },
      ],
      [new Uint8Array([0x00, 0x59, 0x01, 0x00, 0xa0, 0x43, 0x00]), 1, 3, { lsb: 67, msb: 160 }],
    ];
    test.each(cases)(
      "Given Uint8Array %p, startIndex %p and length %p as argument, calculate should return CRC16 %p",
      (input: Uint8Array, startIndex: number, length: number, expectedResult: CRC16) => {
        const result = instance.calculate(input, startIndex, length);
        expect(result).toEqual(expectedResult);
      }
    );
  });
});
