import { REGISTERS } from '../constant/Constants'
import BitUtils from '../lib/BitUtils'

export default class Registers {
  registers: any
  isIME: boolean = false
  static Z_POS = 7

  static N_POS = 6

  static H_POS = 5

  static C_POS = 4

  constructor() {
    this.registers = REGISTERS
    this.isIME = true
  }

  getRegister(): any {
    return this.registers
  }

  getPC(): any {
    return this.registers.pc
  }

  getFlags(): any {
    return this.registers.flags
  }

  getA(): any {
    return this.registers.a
  }

  getB(): any {
    return this.registers.b
  }

  getC(): any {
    return this.registers.c
  }

  getD(): any {
    return this.registers.d
  }

  getE(): any {
    return this.registers.e
  }

  getH(): any {
    return this.registers.h
  }

  getL(): any {
    return this.registers.l
  }

  getAF(): any {
    return (this.registers.a << 8) | this.registers.f
  }

  getHL(): any {
    return (this.registers.h << 8) | this.registers.l
  }

  getBC(): any {
    return (this.registers.b << 8) | this.registers.c
  }

  getDE(): any {
    return (this.registers.d << 8) | this.registers.e
  }

  getSP(): any {
    return this.registers.sp
  }

  setA(value: any): void {
    this.registers.a = value
  }

  setB(value: any): void {
    this.registers.b = value
  }
  setC(value: any): void {
    this.registers.c = value
  }
  setD(value: any): void {
    this.registers.d = value
  }
  setE(value: any): void {
    this.registers.e = value
  }
  setH(value: any): void {
    this.registers.h = value
  }
  setL(value: any): void {
    this.registers.l = value
  }

  setPC(value: any): void {
    this.registers.pc = value
  }

  setBC(bc: any): void {
    this.registers.b = BitUtils.getMSB(bc)
    this.registers.c = BitUtils.getLSB(bc)
  }

  setDE(de: any): void {
    this.registers.d = BitUtils.getMSB(de)
    this.registers.e = BitUtils.getLSB(de)
  }

  setHL(hl: any): void {
    this.registers.h = BitUtils.getMSB(hl)
    this.registers.l = BitUtils.getLSB(hl)
  }

  setSP(sp: any): void {
    this.registers.sp = sp
  }

  addToPC(signedByte: any): void {
    // checkByteArgument("signedByte", signedByte);
    if (BitUtils.isNegative(signedByte)) {
      this.registers.pc =
        (this.registers.pc - BitUtils.abs(signedByte)) & 0xffff
    } else {
      this.registers.pc =
        (this.registers.pc + BitUtils.abs(signedByte)) & 0xffff
    }
  }

  decrementHL(): void {
    const oldHL = this.getHL()
    this.setHL((oldHL - 1) % 0xffff)
    return oldHL
  }

  decrementSP(): void {
    this.registers.sp = (this.registers.sp - 1) % 0xffff
  }

  incrementSP() {
    this.registers.sp = (this.registers.sp + 1) % 0xffff
  }

  incrementHL(): void {
    const oldHL = this.getHL()
    this.setHL((oldHL + 1) % 0xffff)
    return oldHL
  }

  reset(): void {
    this.registers = REGISTERS
  }

  setZFlag(z: any) {
    this.registers.flags.z = BitUtils.setBit(
      this.registers.flags.z,
      Registers.Z_POS,
      z,
    )
  }

  setCFlag(c: any) {
    this.registers.flags.c = BitUtils.setBit(
      this.registers.flags.z,
      Registers.C_POS,
      c,
    )
  }

  setHFlag(h: any) {
    this.registers.flags.h = BitUtils.setBit(
      this.registers.flags.h,
      Registers.H_POS,
      h,
    )
  }

  setNFlag(n: any) {
    this.registers.flags.n = BitUtils.setBit(
      this.registers.flags.n,
      Registers.N_POS,
      n,
    )
  }

  isZ(): boolean {
    return BitUtils.getBit(this.registers.flags.z, Registers.Z_POS)
  }

  isC(): boolean {
    return BitUtils.getBit(this.registers.flags.c, Registers.C_POS)
  }

  isH(): boolean {
    return BitUtils.getBit(this.registers.flags.h, Registers.H_POS)
  }

  isN(): boolean {
    return BitUtils.getBit(this.registers.flags.n, Registers.N_POS)
  }

  toString(): String {
    return JSON.stringify(this.registers)
  }
}
