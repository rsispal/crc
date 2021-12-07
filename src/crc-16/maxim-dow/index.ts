import { AbstractCRC } from "../abstract";

export class CRC16_MAXIM_DOW extends AbstractCRC {
  constructor() {
    super();
    this.bitLength = 16;

    this.poly = 0x31;
    this.init = 0x00;

    this.reverseIn = true;
    this.reverseOut = true;
    this.xorOut = 0x00;

    this.lookupTable = this.generateTable(this.poly);
  }
}
