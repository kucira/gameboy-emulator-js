import { COMPLETE_MEMORY_ADDR, CPU_INTERRUPTS } from '../constant/Constants'
import Registers from './Registers'
import MemoryManagementUnit from './MemoryManagementUnit'
import Opcodes from './Opcodes'

export default class CPU {
  mmu: MemoryManagementUnit
  isPause: boolean = false
  startAddress = COMPLETE_MEMORY_ADDR
  registers: Registers
  opcodes: Opcodes
  constructor(mmu: MemoryManagementUnit) {
    this.mmu = mmu
    this.isPause = false
    this.startAddress = COMPLETE_MEMORY_ADDR
    this.registers = new Registers()
    this.opcodes = new Opcodes()
  }

  /** handle interrupt CPU */
  private handleInterrupt(): boolean {
    console.log(this.registers.isIME, 'IME')
    if (!this.registers.isIME) {
      return false
    }

    /** interrupts flag address 0xff0f */
    const interruptFlag = this.mmu.readByte(0xff0f)

    /** interrupts enable address 0xffff */
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
    // Fetch Opcode
    // Decode Opcode
    // Execute Opcode
    //get pc instruction
    let cmd = null
    let pc = this.registers.getPC()

    // next instruction in PC
    // read the byte
    // get the opcode
    let opcode = this.mmu.readByte(pc++)

    if (opcode === 0xcb) {
      opcode = this.mmu.readByte(pc++)
      cmd = this.opcodes.getExt(opcode)
      // console.log('get command ext', this.opcodes.getExt(opcode), opcode, pc)
    } else {
      cmd = this.opcodes.get(opcode)
      // console.log('get command', cmd, opcode, pc)
    }

    if (!cmd) {
      if (opcode) {
        console.warn(
          `cmd ${cmd},  Invalid instruction opcode : ${opcode.toString(
            16,
          )} @pc : ${pc}`,
        )
      }
      return 0
    }

    /** this the args from cpu instruction ex : LDBn : n is the args */
    const args = new Array(cmd.args)
    for (let i = 0; i < args.length; i++) {
      args[i] = this.mmu.readByte(pc++)
      console.log(
        `args of n[${pc}] in args : ${this.mmu.readByte(pc).toString(16)}`,
      )
    }

    this.registers.setPC(pc)
    cmd.commandOperation(this.registers, this.mmu, args)
    console.log(`cmd : ${cmd.label} -- args of n : ${args}`)
    console.log(`Registers ${this.registers.toString()}`)

    return cmd.cycles
  }

  reset(): void {
    this.registers.reset()
  }

  /** run command of CPU */
  runCommand(): Number {
    const handleInterrupt = this.handleInterrupt()
    console.log(handleInterrupt, 'inter')
    this.nextInstruction()

    return 0
  }
}
