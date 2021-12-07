import { CRC16, LogLevel } from "../../types";
import { dec2hex, printBufferToConsole } from "../../utilities/print";

export abstract class AbstractCRC {
  protected poly: number = 0;
  protected init: number = 0;
  protected reverseIn: boolean = false;
  protected reverseOut: boolean = false;
  protected xorOut: number = 0;
  protected lookupTable: number[] = [];
  protected bitLength: number = 8;

  constructor(private logLevel: LogLevel = LogLevel.NONE) {}

  public calculate(
    buffer: Uint8Array | Buffer,
    startIndex: number = 0,
    length: number,
    logLevel: LogLevel = LogLevel.NONE
  ): CRC16 {
    this.logLevel = logLevel;
    this.logLevel > LogLevel.NONE && console.log("\n--- Calculate Checksum Started ---\n");

    let mask = (((1 << (this.bitLength - 1)) - 1) << 1) | 1;
    let highBit = 1 << (this.bitLength - 1);

    let crc = this.init;

    for (let i = startIndex; i < startIndex + length; ++i) {
      let character = buffer[i];

      this.logLevel > LogLevel.NONE &&
        console.log(
          `[${i.toString().padStart(5, "0")}]: ${dec2hex(character)} - (msb = ${crc & (mask / 0x100) & 0xff}, lsb = ${
            crc & mask % 0x100
          }, cs = ${crc & mask})`
        );

      if (this.reverseIn) {
        character = this.binaryReverse(character, 8);
      }

      for (let j = 0x80; j; j >>= 1) {
        let bit = crc & highBit;
        crc <<= 1;

        if (character & j) {
          bit ^= highBit;
        }

        if (bit) {
          crc ^= this.poly;
        }
      }
    }

    if (this.reverseOut) {
      crc = this.binaryReverse(crc, this.bitLength);
    }

    crc ^= this.xorOut;

    const CS = crc & mask;

    const msb = CS % 0x100;
    const lsb = (CS / 0x100) & 0xff; // Have to do the AND 0xff because consts arent 8 bit!

    this.logLevel > LogLevel.NONE &&
      console.log(`
      \r - Calculated: [${dec2hex(lsb)}, ${dec2hex(msb)}] (lsb, msb)
      \r - Start Index: ${startIndex}
      \r - Message Length: ${length}
      \r - Buffer: ${printBufferToConsole(buffer, startIndex, startIndex + length, 0)}
    `);
    this.logLevel > LogLevel.NONE && console.log("--- Calculate Checksum Ended ---");

    return { msb, lsb };
  }

  protected binaryReverse(input: number, bitlen: number): number {
    let cloneBits = input;
    let binaryInput = 0;
    let count = 0;

    while (count < bitlen) {
      ++count;
      binaryInput <<= 1;
      binaryInput |= cloneBits & 0x1;
      cloneBits >>= 1;
    }

    return binaryInput;
  }

  protected generateTable(polynomial: number): number[] {
    let tableSize = 256;

    let mask = (((1 << (this.bitLength - 1)) - 1) << 1) | 1;
    let highBit = 1 << (this.bitLength - 1);

    let crctab: number[] = [];

    for (let i = 0; i < tableSize; ++i) {
      let crc = i;
      if (this.reverseIn) {
        crc = this.binaryReverse(crc, 8);
      }

      crc <<= this.bitLength - 8;

      for (let j = 0; j < 8; ++j) {
        let bit = crc & highBit;
        crc <<= 1;
        if (bit) {
          crc ^= polynomial;
        }
      }

      if (this.reverseOut) {
        crc = this.binaryReverse(crc, this.bitLength);
      }
      crc &= mask;
      crctab.push(crc);
    }

    return crctab;
  }
}
