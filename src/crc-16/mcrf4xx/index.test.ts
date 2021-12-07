import { CRC16_MCRF4XX } from ".";
import { CRC16 } from "../../types";

describe("CRC16 :: CRC16_MCRF4XX", () => {
  let instance: CRC16_MCRF4XX;
  beforeEach(() => {
    instance = new CRC16_MCRF4XX();
  });

  describe("CRC16 :: CRC16_MCRF4XX - calculate", () => {
    const cases: [Uint8Array, number, number, CRC16][] = [
      [new Uint8Array([]), 0, 0, { msb: 255, lsb: 255 }],
      [new Uint8Array([0]), 0, 1, { msb: 135, lsb: 15 }],
      [new Uint8Array([255]), 0, 1, { msb: 255, lsb: 0 }],
      [new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), 0, 10, { msb: 29, lsb: 208 }],
      [new Uint8Array([255, 255, 255, 255]), 0, 4, { msb: 184, lsb: 240 }],
      [
        new Uint8Array([
          0x00, 0x06, 0xf9, 0x0f, 0x00, 0x14, 0x06, 0x0f, 0x67, 0xea, 0x11, 0x02, 0x1e, 0x1d, 0x00, 0x06, 0x2f, 0x35, 0x57, 0x00,
          0x03, 0x80, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x41, 0xa4, 0x00,
        ]),
        1,
        26,
        { lsb: 65, msb: 164 },
      ],
      [new Uint8Array([0x00, 0x01, 0x9e, 0x0f, 0x00, 0x05, 0x30, 0x00]), 1, 4, { lsb: 5, msb: 48 }],
      [
        new Uint8Array([
          0x00, 0x06, 0xf9, 0x0f, 0x00, 0x14, 0x06, 0x0f, 0x69, 0xea, 0x11, 0x02, 0x1e, 0x1d, 0x00, 0x06, 0x2f, 0x35, 0x57, 0x00,
          0x03, 0x80, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x88, 0x2d, 0x00,
        ]),
        1,
        26,
        { lsb: 136, msb: 45 },
      ],
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
