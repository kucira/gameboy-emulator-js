import { REGISTERS } from '../constant/Constants'
import BitUtils from '../lib/BitUtils'

export default class Registers {
  registers: any
  isIME: boolean = false
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

  reset(): void {
    this.registers = REGISTERS
  }
}
