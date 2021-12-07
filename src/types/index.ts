export type CRC8 = number;

export type CRC16 = {
  msb: number;
  lsb: number;
};

export type CRC32 = {
  msb: number;
  lsb: number;
};

export enum LogLevel {
  NONE,
  DEBUG,
  WARN,
  ERROR,
  FULL,
}
