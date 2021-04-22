import { START_ADDRESS } from '../constant/Constants'
import Registers from './Registers'

export default class CPU {
  registers
  isPause = false
  startAddress = START_ADDRESS
  constructor(registers: Registers) {
    this.registers = registers
    this.isPause = false
    this.startAddress = START_ADDRESS
  }

  private handleInterrupt(): boolean {
    return false
  }

  reset(): void {
    this.registers.reset()
  }

  runCommand(): Number {
    this.handleInterrupt()
    return 0
  }
}
