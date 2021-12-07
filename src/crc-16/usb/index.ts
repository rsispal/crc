import { AbstractCRC } from "../abstract";

export class CRC16_USB extends AbstractCRC {
  constructor() {
    super();
    this.poly = 0x8005;
    this.init = 0xffff;

    this.reverseIn = true;
    this.reverseOut = true;
    this.xorOut = 0xffff;

    this.lookupTable = this.generateTable(this.poly);
  }
}
