import Instructions from './Instructions'
import BitUtils from '../lib/BitUtils'

export default class Opcode {
  opcodes: Array<Instructions>
  constructor() {
    // initial array opcodes with 0x100 length or 256 length
    this.opcodes = new Array(0x100)

    /** register command */
    this.registerCommand(0x06, 8, 1, 'LD B,n', (r: any, m: any, a: any) => {
      r.setB(a[0])
    })
    this.registerCommand(0x0e, 8, 1, 'LD C,n', (r: any, m: any, a: any) => {
      r.setC(a[0])
    })
    this.registerCommand(0x16, 8, 1, 'LD D,n', (r: any, m: any, a: any) => {
      r.setD(a[0])
    })
    this.registerCommand(0x1e, 8, 1, 'LD E,n', (r: any, m: any, a: any) => {
      r.setE(a[0])
    })
    this.registerCommand(0x26, 8, 1, 'LD H,n', (r: any, m: any, a: any) => {
      r.setH(a[0])
    })
    this.registerCommand(0x2e, 8, 1, 'LD L,n', (r: any, m: any, a: any) => {
      r.setL(a[0])
    })

    // ---------------------
    this.registerCommand(0x01, 12, 2, 'LD BC, nn', (r: any, m: any, a: any) =>
      r.setBC(BitUtils.toWord(a)),
    )
    this.registerCommand(0x11, 12, 2, 'LD DE, nn', (r: any, m: any, a: any) =>
      r.setDE(BitUtils.toWord(a)),
    )
    this.registerCommand(0x21, 12, 2, 'LD HL, nn', (r: any, m: any, a: any) =>
      r.setHL(BitUtils.toWord(a)),
    )
    this.registerCommand(0x31, 12, 2, 'LD SP, nn', (r: any, m: any, a: any) =>
      r.setSP(BitUtils.toWord(a)),
    )
  }

  /** register command function to index of instruction command address */
  registerCommand(
    opcode: any,
    cycles: any,
    argsLength: any,
    label: string,
    commandOperation: Function,
  ): void {
    this.opcodes[opcode] = new Instructions(
      opcode,
      cycles,
      argsLength,
      label,
      commandOperation,
    )
  }

  get(opcode: any): any {
    return this.opcodes[opcode]
  }
}
