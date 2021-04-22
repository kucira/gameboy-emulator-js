import { REGISTERS } from '../constant/Constants'

export default class Registers {
  registers: Object
  constructor() {
    this.registers = REGISTERS
  }

  reset(): void {
    this.registers = REGISTERS
  }

  setRegister(registers: Object): void {
    this.registers = registers
  }
}
