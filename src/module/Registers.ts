import { REGISTERS } from '../constant/Constants'

export default class Registers {
  registers: any
  isIME: boolean = false
  constructor() {
    this.registers = REGISTERS
    this.isIME = true
  }

  getPC(): any {
    return this.registers.pc
  }

  setPC(value: any): any {
    this.registers.pc = value
  }

  reset(): void {
    this.registers = REGISTERS
  }
}
