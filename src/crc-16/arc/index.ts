import { AbstractCRC } from "../abstract";

export class CRC16_ARC extends AbstractCRC {
  constructor() {
    super();
    this.bitLength = 16;

    this.poly = 0x8005;
    this.init = 0x0000;
    this.reverseIn = true;
    this.reverseOut = true;
    this.xorOut = 0x0000;

    this.lookupTable = this.generateTable(this.poly);
  }
}
