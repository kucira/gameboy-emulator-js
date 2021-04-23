import { COMPLETE_MEMORY_ADDR, CPU_INTERRUPTS } from '../constant/Constants'
import Registers from './Registers'
import MemoryManagementUnit from './MemoryManagementUnit'

export default class CPU {
  mmu: MemoryManagementUnit
  isPause: boolean = false
  startAddress = COMPLETE_MEMORY_ADDR
  registers: Registers
  constructor(mmu: MemoryManagementUnit) {
    this.mmu = mmu
    this.isPause = false
    this.startAddress = COMPLETE_MEMORY_ADDR
    this.registers = new Registers()
  }

  /** handle interrupt CPU */
  private handleInterrupt(): boolean {
    console.log(this.registers.isIME, 'IME')
    if (!this.registers.isIME) {
      return false
    }

    /** interrupts flag address 0xff0f */
    const interruptFlag = this.mmu.readByte(0xff0f)

    /** interrupts enable address 0xff0f */
    const interruptEnable = this.mmu.readByte(0xffff)

    /** handle handling of cpu interrupts */
    let handler = 0
    if ((interruptEnable & interruptFlag & (1 << 0)) != 0) {
      handler = CPU_INTERRUPTS.VBLANK // V-Blank
    }
    if ((interruptEnable & interruptFlag & (1 << 1)) != 0) {
      handler = CPU_INTERRUPTS.LCDSTATUS // LCDC Status
    }
    if ((interruptEnable & interruptFlag & (1 << 2)) != 0) {
      handler = CPU_INTERRUPTS.TIMER_OVERFLOW // Timer Overflow
    }
    if ((interruptEnable & interruptFlag & (1 << 3)) != 0) {
      handler = CPU_INTERRUPTS.SERIAL_TRANSFER // Serial Transfer
    }
    if ((interruptEnable & interruptFlag & (1 << 4)) != 0) {
      handler = CPU_INTERRUPTS.HILO // Hi-Lo of P10-P13
    }

    if (handler > 0) {
      console.log(`setup the memory address ${handler}`)
      this.registers.isIME = false
      this.mmu.writeByte(0xff0f, 0)
      this.registers.setPC(handler)
      return true
    } else {
      return false
    }
  }

  /** cpu next instruction defined in Program Counter (PC)
   * The PC, or Program Counter, registerpoints to the
   * next instruction to be executed in theGame Boy memory
   */
  nextInstruction() {
    //get pc instruction
    let pc = this.registers.getPC()

    // next instruction in PC
    // read the byte
    // get the opcode
    pc = pc + 1
    let opcode = this.mmu.readByte(pc)

    if (opcode == 0xcb) {
      opcode = this.mmu.readByte(pc++)
      //cmd = Opcodes.EXT_COMMANDS.get(opcode);
    } else {
      //cmd = Opcodes.COMMANDS.get(opcode);
    }

    this.registers.setPC(pc)

    console.log(`opcode ${opcode} PC : ${pc}`)
  }

  reset(): void {
    this.registers.reset()
  }

  /** run command of CPU */
  runCommand(): Number {
    const handleInterrupt = this.handleInterrupt()
    console.log(handleInterrupt)
    this.nextInstruction()

    return 0
  }
}
