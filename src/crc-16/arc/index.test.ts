import { CRC16_ARC } from ".";
import { CRC16 } from "../../types";

describe("CRC16 :: CRC16_ARC", () => {
  let instance: CRC16_ARC;
  beforeEach(() => {
    instance = new CRC16_ARC();
  });

  describe("CRC16 :: CRC16_ARC - calculate", () => {
    const cases: [Uint8Array, number, number, CRC16][] = [
      [new Uint8Array([]), 0, 0, { msb: 0, lsb: 0 }],
      [new Uint8Array([0]), 0, 1, { msb: 0, lsb: 0 }],
      [new Uint8Array([255]), 0, 1, { msb: 64, lsb: 64 }],
      [new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), 0, 10, { msb: 4, lsb: 66 }],
      [new Uint8Array([255, 255, 255, 255]), 0, 4, { msb: 1, lsb: 148 }],
      [new Uint8Array([0x02, 0x01, 0x00, 0xa0, 0x50]), 0, 5, { msb: 0, lsb: 0 }],
      [
        new Uint8Array([0x0b, 0x01, 0xcc, 0x01, 0x01, 0xfa, 0x01, 0x00, 0x00, 0x00, 0x05, 0x02, 0x31, 0x37]),
        0,
        12,
        { msb: 49, lsb: 55 },
      ],
      [
        new Uint8Array([0x0b, 0x66, 0xcc, 0xfa, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x05, 0x02, 0x29, 0x75]),
        0,
        12,
        { msb: 41, lsb: 117 },
      ],
      [
        new Uint8Array([0x0b, 0x69, 0xcc, 0x00, 0x00, 0x01, 0x01, 0x13, 0x00, 0x00, 0x0c, 0x10, 0x60, 0x5b]),
        0,
        12,
        { msb: 96, lsb: 91 },
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
