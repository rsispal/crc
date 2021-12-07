import { AbstractCRC } from "../abstract";

export class CRC16_IBM3740 extends AbstractCRC {
  constructor() {
    super();
    this.bitLength = 16;

    this.poly = 0x1021;
    this.init = 0xffff;

    this.reverseIn = false;
    this.reverseOut = false;
    this.xorOut = 0x0000;

    this.lookupTable = this.generateTable(this.poly);
  }
}
