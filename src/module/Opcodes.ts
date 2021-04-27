import Instructions from './Instructions'
import BitUtils from '../lib/BitUtils'

export default class Opcode {
  opcodes: Array<Instructions>
  opcodesExt: Array<Instructions>
  constructor() {
    // initial array opcodes with 0x100 length or 256 length
    this.opcodes = new Array(0x100)
    this.opcodesExt = new Array(0x100)

    /** register command */
    /** the args taken from n, n -> 1 and it taken from the next pc location at memory */
    /** for example current location are pc = 1 and get the instruction LDBn
     * then the args is taken from the memory address on the next instruction
     * pc 2 */

    // this is the 8 bit Loading Data Transfer
    // LD B, n it mean Load Data Transfer to register B from n or the next pc counter
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

    this.registerCommand(0x7f, 4, 0, 'LD A, A', (r: any, m: any, a: any) =>
      r.setA(r.getA()),
    )
    this.registerCommand(0x78, 4, 0, 'LD A, B', (r: any, m: any, a: any) =>
      r.setA(r.getB()),
    )
    this.registerCommand(0x79, 4, 0, 'LD A, C', (r: any, m: any, a: any) =>
      r.setA(r.getC()),
    )
    this.registerCommand(0x7a, 4, 0, 'LD A, D', (r: any, m: any, a: any) =>
      r.setA(r.getD()),
    )
    this.registerCommand(0x7b, 4, 0, 'LD A, E', (r: any, m: any, a: any) =>
      r.setA(r.getE()),
    )
    this.registerCommand(0x7c, 4, 0, 'LD A, H', (r: any, m: any, a: any) =>
      r.setA(r.getH()),
    )
    this.registerCommand(0x7d, 4, 0, 'LD A, L', (r: any, m: any, a: any) =>
      r.setA(r.getL()),
    )
    this.registerCommand(0x7e, 8, 0, 'LD A, (HL)', (r: any, m: any, a: any) =>
      r.setA(m.readByte(r.getHL())),
    )

    // ---------------------//
    /** the args taken from nn, nn -> 2, n->1 it taken from the next pc */
    /** for example pc = 1 get the instruction LDBCnn
     * then the args is taken from the memory address on the next instruction
     * pc 2 and pc 3 */

    // LD BC, nn it meas Load Data Transfer to register BC from nn or the next pc counter
    // this is 16 bit Loading Data Transfer
    // to get 16 bit value we need bitwise operation on left and the right value

    this.registerCommand(0xf2, 8, 0, 'LD A, (C)', (r: any, m: any, a: any) =>
      r.setA(m.readByte(0xff00 + r.getC())),
    )
    this.registerCommand(0xe2, 8, 0, 'LD (C), A', (r: any, m: any, a: any) =>
      m.writeByte(0xff00 + r.getC(), r.getA()),
    )

    this.registerCommand(0x3a, 8, 0, 'LD A, (HLD)', (r: any, m: any, a: any) =>
      r.setA(m.getByte(r.decrementHL())),
    )
    this.registerCommand(0x32, 8, 0, 'LD (HLD), A', (r: any, m: any, a: any) =>
      m.writeByte(r.decrementHL(), r.getA()),
    )

    this.registerCommand(0x2a, 8, 0, 'LD A, (HLI)', (r: any, m: any, a: any) =>
      r.setA(m.readByte(r.incrementHL())),
    )
    this.registerCommand(0x22, 8, 0, 'LD (HLI), A', (r: any, m: any, a: any) =>
      m.writeByte(r.incrementHL(), r.getA()),
    )

    this.registerCommand(0xe0, 12, 1, 'LDH (n), A', (r: any, m: any, a: any) =>
      m.writeByte(0xff00 + a[0], r.getA()),
    )
    this.registerCommand(0xf0, 12, 1, 'LDH A, (n)', (r: any, m: any, a: any) =>
      r.setA(m.readByte(0xff00 + a[0])),
    )

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

    this.registerCommand(0xf9, 8, 2, 'LD SP, HL', (r: any, m: any, a: any) =>
      r.setSP(r.getHL()),
    )

    this.registerCommand(0xf8, 12, 1, 'LDHL SP, n', (r: any, m: any, a: any) =>
      r.setHL(this.addSignedByteToWord(r.getFlags(), r.getSP(), a[0])),
    )

    this.registerCommand(
      0x08,
      20,
      2,
      'LD (nn), SP',
      (r: any, m: any, a: any) => {
        m.setByte(BitUtils.toWord(a), BitUtils.getLSB(r.getSP()))
        m.setByte((BitUtils.toWord(a) + 1) & 0xffff, BitUtils.getMSB(r.getSP()))
      },
    )

    //----NOP, HALT, STOP, DI, EI ------//

    this.registerCommand(0x00, 4, 0, 'NOP', (r: any, m: any, a: any) => {})
    this.registerCommand(0x76, 4, 0, 'HALT', (r: any, m: any, a: any) => {
      /* TODO */
    })
    this.registerCommand(0x10, 4, 1, 'STOP', (r: any, m: any, a: any) => {
      /* TODO */
    })
    this.registerCommand(0xf3, 4, 0, 'DI', (r: any, m: any, a: any) => {
      /* TODO */
    })
    this.registerCommand(0xfb, 4, 0, 'EI', (r: any, m: any, a: any) => {
      /* TODO */
    })

    // subBytes
    this.registerCommand(0xfe, 8, 1, 'CP A, #', (r: any, m: any, a: any) =>
      this.subBytes(r.getFlags(), r.getA(), a[0]),
    )

    // XOR
    this.registerCommand(0xaf, 4, 0, 'XOR A, A', (r: any, m: any, a: any) =>
      r.setA(this.xor(r.getFlags(), r.getA(), r.getA())),
    )

    // ------ //
    this.registerCommand(0x32, 8, 0, 'LD (HLD), A', (r: any, m: any, a: any) =>
      m.writeByte(r.decrementHL(), r.getA()),
    )

    //-----//
    this.registerCommand(0x20, 8, 1, 'JR NZ, n', (r: any, m: any, a: any) => {
      if (!r.isZ()) r.addToPC(a[0])
    })
    this.registerCommand(0x28, 8, 1, 'JR Z, n', (r: any, m: any, a: any) => {
      if (r.isZ()) r.addToPC(a[0])
    })
    this.registerCommand(0x30, 8, 1, 'JR NC, n', (r: any, m: any, a: any) => {
      if (!r.isC()) r.addToPC(a[0])
    })
    this.registerCommand(0x38, 8, 1, 'JR C, n', (r: any, m: any, a: any) => {
      if (r.isC()) r.addToPC(a[0])
    })

    /** Ext Commands */
    this.registerCommandExt(0x07, 8, 0, 'RLC A', (r: any, m: any, a: any) =>
      r.setA(this.rotateLeft(r.getFlags(), r.getA())),
    )
    this.registerCommandExt(0x00, 8, 0, 'RLC B', (r: any, m: any, a: any) =>
      r.setB(this.rotateLeft(r.getFlags(), r.getB())),
    )
    this.registerCommandExt(0x01, 8, 0, 'RLC C', (r: any, m: any, a: any) =>
      r.setC(this.rotateLeft(r.getFlags(), r.getC())),
    )
    this.registerCommandExt(0x02, 8, 0, 'RLC D', (r: any, m: any, a: any) =>
      r.setD(this.rotateLeft(r.getFlags(), r.getD())),
    )
    this.registerCommandExt(0x03, 8, 0, 'RLC E', (r: any, m: any, a: any) =>
      r.setE(this.rotateLeft(r.getFlags(), r.getE())),
    )
    this.registerCommandExt(0x04, 8, 0, 'RLC H', (r: any, m: any, a: any) =>
      r.setH(this.rotateLeft(r.getFlags(), r.getH())),
    )
    this.registerCommandExt(0x05, 8, 0, 'RLC L', (r: any, m: any, a: any) =>
      r.setL(this.rotateLeft(r.getFlags(), r.getL())),
    )
    this.registerCommandExt(0x06, 16, 0, 'RLC (HL)', (r: any, m: any, a: any) =>
      m.writeByte(
        r.getHL(),
        this.rotateLeft(r.getFlags(), m.readByte(r.getHL())),
      ),
    )

    //----------------------//

    this.registerCommandExt(0x37, 8, 0, 'SWAP A', (r: any, m: any, a: any) =>
      r.setA(this.swap(r.getFlags(), r.getA())),
    )
    this.registerCommandExt(0x30, 8, 0, 'SWAP B', (r: any, m: any, a: any) =>
      r.setB(this.swap(r.getFlags(), r.getB())),
    )
    this.registerCommandExt(0x31, 8, 0, 'SWAP C', (r: any, m: any, a: any) =>
      r.setC(this.swap(r.getFlags(), r.getC())),
    )
    this.registerCommandExt(0x32, 8, 0, 'SWAP D', (r: any, m: any, a: any) =>
      r.setD(this.swap(r.getFlags(), r.getD())),
    )
    this.registerCommandExt(0x33, 8, 0, 'SWAP E', (r: any, m: any, a: any) =>
      r.setE(this.swap(r.getFlags(), r.getE())),
    )
    this.registerCommandExt(0x34, 8, 0, 'SWAP H', (r: any, m: any, a: any) =>
      r.setH(this.swap(r.getFlags(), r.getH())),
    )
    this.registerCommandExt(0x35, 8, 0, 'SWAP L', (r: any, m: any, a: any) =>
      r.setL(this.swap(r.getFlags(), r.getL())),
    )
    this.registerCommandExt(
      0x36,
      16,
      0,
      'SWAP (HL)',
      (r: any, m: any, a: any) =>
        m.writeByte(r.getHL(), this.swap(r.getFlags(), m.readByte(r.getHL()))),
    )

    // --------------- //
    this.registerCommandExt(0x27, 8, 0, 'SLA A', (r: any, m: any, a: any) =>
      r.setA(this.shiftLeft(r.getFlags(), r.getA())),
    )
    this.registerCommandExt(0x20, 8, 0, 'SLA B', (r: any, m: any, a: any) =>
      r.setB(this.shiftLeft(r.getFlags(), r.getB())),
    )
    this.registerCommandExt(0x21, 8, 0, 'SLA C', (r: any, m: any, a: any) =>
      r.setC(this.shiftLeft(r.getFlags(), r.getC())),
    )
    this.registerCommandExt(0x22, 8, 0, 'SLA D', (r: any, m: any, a: any) =>
      r.setD(this.shiftLeft(r.getFlags(), r.getD())),
    )
    this.registerCommandExt(0x23, 8, 0, 'SLA E', (r: any, m: any, a: any) =>
      r.setE(this.shiftLeft(r.getFlags(), r.getE())),
    )
    this.registerCommandExt(0x24, 8, 0, 'SLA H', (r: any, m: any, a: any) =>
      r.setH(this.shiftLeft(r.getFlags(), r.getH())),
    )
    this.registerCommandExt(0x25, 8, 0, 'SLA L', (r: any, m: any, a: any) =>
      r.setL(this.shiftLeft(r.getFlags(), r.getL())),
    )
    this.registerCommandExt(0x26, 16, 0, 'SLA (HL)', (r: any, m: any, a: any) =>
      m.writeByte(
        r.getHL(),
        this.shiftLeft(r.getFlags(), m.readByte(r.getHL())),
      ),
    )

    //------------------------//
    for (let i = 0; i < 8; i++) {
      const bit = i
      this.registerCommandExt(
        0x47 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', A',
        (r: any, m: any, a: any) => this.bit(r.getFlags(), r.getA(), bit),
      )
      this.registerCommandExt(
        0x40 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', B',
        (r: any, m: any, a: any) => this.bit(r.getFlags(), r.getB(), bit),
      )
      this.registerCommandExt(
        0x41 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', C',
        (r: any, m: any, a: any) => this.bit(r.getFlags(), r.getC(), bit),
      )
      this.registerCommandExt(
        0x42 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', D',
        (r: any, m: any, a: any) => this.bit(r.getFlags(), r.getD(), bit),
      )
      this.registerCommandExt(
        0x43 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', E',
        (r: any, m: any, a: any) => this.bit(r.getFlags(), r.getE(), bit),
      )
      this.registerCommandExt(
        0x44 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', H',
        (r: any, m: any, a: any) => this.bit(r.getFlags(), r.getH(), bit),
      )
      this.registerCommandExt(
        0x45 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', L',
        (r: any, m: any, a: any) => this.bit(r.getFlags(), r.getL(), bit),
      )
      this.registerCommandExt(
        0x46 + 0x08 * bit,
        16,
        0,
        'BIT ' + bit + ', (HL)',
        (r: any, m: any, a: any) =>
          this.bit(r.getFlags(), m.readByte(r.getHL()), bit),
      )

      this.registerCommandExt(
        0xc7 + 0x08 * bit,
        8,
        0,
        'SET ' + bit + ', A',
        (r: any, m: any, a: any) => r.setA(BitUtils.setBit(r.getA(), bit)),
      )
      this.registerCommandExt(
        0xc0 + 0x08 * bit,
        8,
        0,
        'SET ' + bit + ', B',
        (r: any, m: any, a: any) => r.setA(BitUtils.setBit(r.getB(), bit)),
      )
      this.registerCommandExt(
        0xc1 + 0x08 * bit,
        8,
        0,
        'SET ' + bit + ', C',
        (r: any, m: any, a: any) => r.setA(BitUtils.setBit(r.getC(), bit)),
      )
      this.registerCommandExt(
        0xc2 + 0x08 * bit,
        8,
        0,
        'SET ' + bit + ', D',
        (r: any, m: any, a: any) => r.setA(BitUtils.setBit(r.getD(), bit)),
      )
      this.registerCommandExt(
        0xc3 + 0x08 * bit,
        8,
        0,
        'SET ' + bit + ', E',
        (r: any, m: any, a: any) => r.setA(BitUtils.setBit(r.getE(), bit)),
      )
      this.registerCommandExt(
        0xc4 + 0x08 * bit,
        8,
        0,
        'SET ' + bit + ', H',
        (r: any, m: any, a: any) => r.setA(BitUtils.setBit(r.getH(), bit)),
      )
      this.registerCommandExt(
        0xc5 + 0x08 * bit,
        8,
        0,
        'SET ' + bit + ', L',
        (r: any, m: any, a: any) => r.setA(BitUtils.setBit(r.getL(), bit)),
      )
      this.registerCommandExt(
        0xc6 + 0x08 * bit,
        16,
        0,
        'SET ' + bit + ', (HL)',
        (r: any, m: any, a: any) =>
          m.writeByte(r.getHL(), BitUtils.setBit(m.readByte(r.getHL()), bit)),
      )

      this.registerCommandExt(
        0x87 + 0x08 * bit,
        8,
        0,
        'RES ' + bit + ', A',
        (r: any, m: any, a: any) => r.setA(BitUtils.clearBit(r.getA(), bit)),
      )
      this.registerCommandExt(
        0x80 + 0x08 * bit,
        8,
        0,
        'RES ' + bit + ', B',
        (r: any, m: any, a: any) => r.setA(BitUtils.clearBit(r.getB(), bit)),
      )
      this.registerCommandExt(
        0x81 + 0x08 * bit,
        8,
        0,
        'RES ' + bit + ', C',
        (r: any, m: any, a: any) => r.setA(BitUtils.clearBit(r.getC(), bit)),
      )
      this.registerCommandExt(
        0x82 + 0x08 * bit,
        8,
        0,
        'RES ' + bit + ', D',
        (r: any, m: any, a: any) => r.setA(BitUtils.clearBit(r.getD(), bit)),
      )
      this.registerCommandExt(
        0x83 + 0x08 * bit,
        8,
        0,
        'RES ' + bit + ', E',
        (r: any, m: any, a: any) => r.setA(BitUtils.clearBit(r.getE(), bit)),
      )
      this.registerCommandExt(
        0x84 + 0x08 * bit,
        8,
        0,
        'RES ' + bit + ', H',
        (r: any, m: any, a: any) => r.setA(BitUtils.clearBit(r.getH(), bit)),
      )
      this.registerCommandExt(
        0x85 + 0x08 * bit,
        8,
        0,
        'RES ' + bit + ', L',
        (r: any, m: any, a: any) => r.setA(BitUtils.clearBit(r.getL(), bit)),
      )
      this.registerCommandExt(
        0x86 + 0x08 * bit,
        16,
        0,
        'RES ' + bit + ', (HL)',
        (r: any, m: any, a: any) =>
          m.writeByte(r.getHL(), BitUtils.clearBit(m.readByte(r.getHL()), bit)),
      )
    }
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

  /** register command function to index of instruction command address */
  registerCommandExt(
    opcode: any,
    cycles: any,
    argsLength: any,
    label: string,
    commandOperation: Function,
  ): void {
    this.opcodesExt[opcode] = new Instructions(
      opcode,
      cycles,
      argsLength,
      label,
      commandOperation,
    )
  }

  xor(flags: any, byte1: any, byte2: any) {
    // checkByteArgument("byte1", byte1);
    // checkByteArgument("byte2", byte2);
    const result = byte1 ^ byte2
    flags.z = result === 0
    flags.n = false
    flags.h = false
    flags.c = false
    return result
  }

  subBytes(flags: any, byte1: any, byte2: any) {
    // checkByteArgument("byte1", byte1);
    // checkByteArgument("byte2", byte2);
    flags.z = ((byte1 - byte2) & 0xff) === 0
    flags.n = true
    flags.h = (0x0f & byte2) > (0x0f & byte1)
    flags.c = byte2 > byte1
    return (byte1 - byte2) % 0xff
  }

  rotateLeft(flags: any, byteValue: any) {
    // checkByteArgument("byteValue", byteValue);
    let result = (byteValue << 1) & 0xff
    if ((byteValue & (1 << 7)) !== 0) {
      result |= 1
      flags.c = true
    } else {
      flags.c = false
    }
    flags.z = result === 0
    flags.n = false
    flags.n = false
    return result
  }

  swap(flags: any, byteValue: any) {
    // checkByteArgument("byteValue", byteValue);
    let upper = byteValue & 0xf0
    let lower = byteValue & 0x0f
    let result = (lower << 4) | (upper >> 4)
    flags.z = result === 0
    flags.n = false
    flags.h = false
    flags.c = false
    return result
  }

  shiftLeft(flags: any, byteValue: any): any {
    // checkByteArgument("byteValue", byteValue);
    let result = (byteValue << 1) & 0xff
    flags.c = (byteValue & (1 << 7)) !== 0
    flags.z = result === 0
    flags.n = false
    flags.h = false
    return result
  }

  bit(flags: any, byteValue: any, bit: any) {
    // checkByteArgument("byteValue", byteValue);
    // checkByteArgument("bit", bit);
    flags.n = false
    flags.h = true
    if (bit < 8) {
      flags.z = (byteValue & (1 << bit)) != 0
    }
  }

  addSignedByteToWord(flags: any, word: any, signedByte: any) {
    // checkWordArgument("w", word);
    // checkByteArgument("b", signedByte);

    flags.z = false
    flags.n = false

    const b = BitUtils.abs(signedByte)

    if (BitUtils.isNegative(signedByte)) {
      flags.setH((word & 0x0f) < (b & 0x0f))
      flags.setC((word & 0xff) < b)
      return (word - b) % 0xffff
    } else {
      flags.setC((word & 0xff) + b > 0xff)
      flags.setH((word & 0x0f) + (b & 0x0f) > 0x0f)
      return (word + b) & 0xffff
    }
  }

  getExt(opcode: any): any {
    return this.opcodesExt[opcode]
  }

  get(opcode: any): any {
    return this.opcodes[opcode]
  }

  dumpOpcodes(): any {
    console.log('OPCODES[] : ', JSON.stringify(this.opcodes))
    console.log('OPCODESEXT[] : ', JSON.stringify(this.opcodesExt))
  }
}
