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
    this.registerCommand(0x06, 8, 1, 'LD B,n', (r: any, m: any, a: any) =>
      r.setB(a[0]),
    )
    this.registerCommand(0x0e, 8, 1, 'LD C,n', (r: any, m: any, a: any) =>
      r.setC(a[0]),
    )
    this.registerCommand(0x16, 8, 1, 'LD D,n', (r: any, m: any, a: any) =>
      r.setD(a[0]),
    )
    this.registerCommand(0x1e, 8, 1, 'LD E,n', (r: any, m: any, a: any) =>
      r.setE(a[0]),
    )
    this.registerCommand(0x26, 8, 1, 'LD H,n', (r: any, m: any, a: any) =>
      r.setH(a[0]),
    )
    this.registerCommand(0x2e, 8, 1, 'LD L,n', (r: any, m: any, a: any) =>
      r.setL(a[0]),
    )

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

    this.registerCommand(0x40, 4, 0, 'LD B, B', (r: any, m: any, a: any) =>
      r.setB(r.getB()),
    )
    this.registerCommand(0x41, 4, 0, 'LD B, C', (r: any, m: any, a: any) =>
      r.setB(r.getC()),
    )
    this.registerCommand(0x42, 4, 0, 'LD B, D', (r: any, m: any, a: any) =>
      r.setB(r.getD()),
    )
    this.registerCommand(0x43, 4, 0, 'LD B, E', (r: any, m: any, a: any) =>
      r.setB(r.getE()),
    )
    this.registerCommand(0x44, 4, 0, 'LD B, H', (r: any, m: any, a: any) =>
      r.setB(r.getH()),
    )
    this.registerCommand(0x45, 4, 0, 'LD B, L', (r: any, m: any, a: any) =>
      r.setB(r.getL()),
    )
    this.registerCommand(0x46, 8, 0, 'LD B, (HL)', (r: any, m: any, a: any) =>
      r.setB(m.readByte(r.getHL())),
    )

    this.registerCommand(0x48, 4, 0, 'LD C, B', (r: any, m: any, a: any) =>
      r.setC(r.getB()),
    )
    this.registerCommand(0x49, 4, 0, 'LD C, C', (r: any, m: any, a: any) =>
      r.setC(r.getC()),
    )
    this.registerCommand(0x4a, 4, 0, 'LD C, D', (r: any, m: any, a: any) =>
      r.setC(r.getD()),
    )
    this.registerCommand(0x4b, 4, 0, 'LD C, E', (r: any, m: any, a: any) =>
      r.setC(r.getE()),
    )
    this.registerCommand(0x4c, 4, 0, 'LD C, H', (r: any, m: any, a: any) =>
      r.setC(r.getH()),
    )
    this.registerCommand(0x4d, 4, 0, 'LD C, L', (r: any, m: any, a: any) =>
      r.setC(r.getL()),
    )
    this.registerCommand(0x4e, 8, 0, 'LD C, (HL)', (r: any, m: any, a: any) =>
      r.setC(m.readByte(r.getHL())),
    )

    this.registerCommand(0x50, 4, 0, 'LD D, B', (r: any, m: any, a: any) =>
      r.setD(r.getB()),
    )
    this.registerCommand(0x51, 4, 0, 'LD D, C', (r: any, m: any, a: any) =>
      r.setD(r.getC()),
    )
    this.registerCommand(0x52, 4, 0, 'LD D, D', (r: any, m: any, a: any) =>
      r.setD(r.getD()),
    )
    this.registerCommand(0x53, 4, 0, 'LD D, E', (r: any, m: any, a: any) =>
      r.setD(r.getE()),
    )
    this.registerCommand(0x54, 4, 0, 'LD D, H', (r: any, m: any, a: any) =>
      r.setD(r.getH()),
    )
    this.registerCommand(0x55, 4, 0, 'LD D, L', (r: any, m: any, a: any) =>
      r.setD(r.getL()),
    )
    this.registerCommand(0x56, 8, 0, 'LD D, (HL)', (r: any, m: any, a: any) =>
      r.setD(m.readByte(r.getHL())),
    )

    this.registerCommand(0x58, 4, 0, 'LD E, B', (r: any, m: any, a: any) =>
      r.setE(r.getB()),
    )
    this.registerCommand(0x59, 4, 0, 'LD E, C', (r: any, m: any, a: any) =>
      r.setE(r.getC()),
    )
    this.registerCommand(0x5a, 4, 0, 'LD E, D', (r: any, m: any, a: any) =>
      r.setE(r.getD()),
    )
    this.registerCommand(0x5b, 4, 0, 'LD E, E', (r: any, m: any, a: any) =>
      r.setE(r.getE()),
    )
    this.registerCommand(0x5c, 4, 0, 'LD E, H', (r: any, m: any, a: any) =>
      r.setE(r.getH()),
    )
    this.registerCommand(0x5d, 4, 0, 'LD E, L', (r: any, m: any, a: any) =>
      r.setE(r.getL()),
    )
    this.registerCommand(0x5e, 8, 0, 'LD E, (HL)', (r: any, m: any, a: any) =>
      r.setE(m.readByte(r.getHL())),
    )

    this.registerCommand(0x60, 4, 0, 'LD H, B', (r: any, m: any, a: any) =>
      r.setH(r.getB()),
    )
    this.registerCommand(0x61, 4, 0, 'LD H, C', (r: any, m: any, a: any) =>
      r.setH(r.getC()),
    )
    this.registerCommand(0x62, 4, 0, 'LD H, D', (r: any, m: any, a: any) =>
      r.setH(r.getD()),
    )
    this.registerCommand(0x63, 4, 0, 'LD H, E', (r: any, m: any, a: any) =>
      r.setH(r.getE()),
    )
    this.registerCommand(0x64, 4, 0, 'LD H, H', (r: any, m: any, a: any) =>
      r.setH(r.getH()),
    )
    this.registerCommand(0x65, 4, 0, 'LD H, L', (r: any, m: any, a: any) =>
      r.setH(r.getL()),
    )
    this.registerCommand(0x66, 8, 0, 'LD H, (HL)', (r: any, m: any, a: any) =>
      r.setH(m.readByte(r.getHL())),
    )

    this.registerCommand(0x68, 4, 0, 'LD L, B', (r: any, m: any, a: any) =>
      r.setL(r.getB()),
    )
    this.registerCommand(0x69, 4, 0, 'LD L, C', (r: any, m: any, a: any) =>
      r.setL(r.getC()),
    )
    this.registerCommand(0x6a, 4, 0, 'LD L, D', (r: any, m: any, a: any) =>
      r.setL(r.getD()),
    )
    this.registerCommand(0x6b, 4, 0, 'LD L, E', (r: any, m: any, a: any) =>
      r.setL(r.getE()),
    )
    this.registerCommand(0x6c, 4, 0, 'LD L, H', (r: any, m: any, a: any) =>
      r.setL(r.getH()),
    )
    this.registerCommand(0x6d, 4, 0, 'LD L, L', (r: any, m: any, a: any) =>
      r.setL(r.getL()),
    )
    this.registerCommand(0x6e, 8, 0, 'LD L, (HL)', (r: any, m: any, a: any) =>
      r.setL(m.readByte(r.getHL())),
    )

    this.registerCommand(0x70, 8, 0, 'LD (HL), B', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), r.getB()),
    )
    this.registerCommand(0x71, 8, 0, 'LD (HL), C', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), r.getC()),
    )
    this.registerCommand(0x72, 8, 0, 'LD (HL), D', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), r.getD()),
    )
    this.registerCommand(0x73, 8, 0, 'LD (HL), E', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), r.getE()),
    )
    this.registerCommand(0x74, 8, 0, 'LD (HL), H', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), r.getH()),
    )
    this.registerCommand(0x75, 8, 0, 'LD (HL), L', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), r.getL()),
    )
    this.registerCommand(0x36, 12, 1, 'LD (HL), n', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), a[0]),
    )

    this.registerCommand(0x7f, 4, 0, 'LD A, A', (r: any, m: any, a: any) =>
      r.setA(r.getA()),
    )
    this.registerCommand(0x47, 4, 0, 'LD B, A', (r: any, m: any, a: any) =>
      r.setB(r.getA()),
    )
    this.registerCommand(0x4f, 4, 0, 'LD C, A', (r: any, m: any, a: any) =>
      r.setC(r.getA()),
    )
    this.registerCommand(0x57, 4, 0, 'LD D, A', (r: any, m: any, a: any) =>
      r.setD(r.getA()),
    )
    this.registerCommand(0x5f, 4, 0, 'LD E, A', (r: any, m: any, a: any) =>
      r.setE(r.getA()),
    )
    this.registerCommand(0x67, 4, 0, 'LD H, A', (r: any, m: any, a: any) =>
      r.setH(r.getA()),
    )
    this.registerCommand(0x6f, 4, 0, 'LD L, A', (r: any, m: any, a: any) =>
      r.setL(r.getA()),
    )

    this.registerCommand(0x0a, 8, 0, 'LD A, (BC)', (r: any, m: any, a: any) =>
      r.setA(m.readByte(r.getBC())),
    )
    this.registerCommand(0x1a, 8, 0, 'LD A, (DE)', (r: any, m: any, a: any) =>
      r.setA(m.readByte(r.getDE())),
    )
    this.registerCommand(0x7e, 8, 0, 'LD A, (HL)', (r: any, m: any, a: any) =>
      r.setA(m.readByte(r.getHL())),
    )
    this.registerCommand(0xfa, 16, 2, 'LD A, (nn)', (r: any, m: any, a: any) =>
      r.setA(m.readByte(BitUtils.toWord(a))),
    )
    this.registerCommand(0x3e, 16, 1, 'LD A, #', (r: any, m: any, a: any) =>
      r.setA(a[0]),
    )

    this.registerCommand(0x02, 8, 0, 'LD (BC), A', (r: any, m: any, a: any) =>
      m.writeByte(r.getBC(), r.getA()),
    )
    this.registerCommand(0x12, 8, 0, 'LD (DE), A', (r: any, m: any, a: any) =>
      m.writeByte(r.getDE(), r.getA()),
    )
    this.registerCommand(0x77, 8, 0, 'LD (HL), A', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), r.getA()),
    )
    this.registerCommand(0xea, 16, 2, 'LD (nn), A', (r: any, m: any, a: any) =>
      m.writeByte(BitUtils.toWord(a), r.getA()),
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
      r.setA(m.readByte(r.decrementHL())),
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

    this.registerCommand(0xf8, 12, 1, 'LDHL SP, n', (r: any, m: any, a: any) =>
      r.setHL(this.addSignedByteToWord(r, r.getSP(), a[0])),
    )

    this.registerCommand(0xf9, 8, 2, 'LD SP, HL', (r: any, m: any, a: any) =>
      r.setSP(r.getHL()),
    )

    this.registerCommand(
      0x08,
      20,
      2,
      'LD (nn), SP',
      (r: any, m: any, a: any) => {
        m.writeByte(BitUtils.toWord(a), BitUtils.getLSB(r.getSP()))
        m.writeByte(
          (BitUtils.toWord(a) + 1) & 0xffff,
          BitUtils.getMSB(r.getSP()),
        )
      },
    )

    this.registerCommand(0xf5, 16, 0, 'PUSH AF', (r: any, m: any, a: any) =>
      this.push(r, m, r.getAF()),
    )
    this.registerCommand(0xc5, 16, 0, 'PUSH BC', (r: any, m: any, a: any) =>
      this.push(r, m, r.getBC()),
    )
    this.registerCommand(0xd5, 16, 0, 'PUSH DE', (r: any, m: any, a: any) =>
      this.push(r, m, r.getDE()),
    )
    this.registerCommand(0xe5, 16, 0, 'PUSH HL', (r: any, m: any, a: any) =>
      this.push(r, m, r.getHL()),
    )

    this.registerCommand(0xf1, 12, 0, 'PUSH AF', (r: any, m: any, a: any) =>
      r.setAF(this.pop(r, m)),
    )
    this.registerCommand(0xc1, 12, 0, 'PUSH BC', (r: any, m: any, a: any) =>
      r.setBC(this.pop(r, m)),
    )
    this.registerCommand(0xd1, 12, 0, 'PUSH DE', (r: any, m: any, a: any) =>
      r.setDE(this.pop(r, m)),
    )
    this.registerCommand(0xe1, 12, 0, 'PUSH HL', (r: any, m: any, a: any) =>
      r.setHL(this.pop(r, m)),
    )

    // ADD
    this.registerCommand(0x87, 4, 0, 'ADD A, A', (r: any, m: any, a: any) =>
      r.setA(this.addBytes(r, r.getA(), r.getA())),
    )
    this.registerCommand(0x80, 4, 0, 'ADD A, B', (r: any, m: any, a: any) =>
      r.setA(this.addBytes(r, r.getA(), r.getB())),
    )
    this.registerCommand(0x81, 4, 0, 'ADD A, C', (r: any, m: any, a: any) =>
      r.setA(this.addBytes(r, r.getA(), r.getC())),
    )
    this.registerCommand(0x82, 4, 0, 'ADD A, D', (r: any, m: any, a: any) =>
      r.setA(this.addBytes(r, r.getA(), r.getD())),
    )
    this.registerCommand(0x83, 4, 0, 'ADD A, E', (r: any, m: any, a: any) =>
      r.setA(this.addBytes(r, r.getA(), r.getE())),
    )
    this.registerCommand(0x84, 4, 0, 'ADD A, H', (r: any, m: any, a: any) =>
      r.setA(this.addBytes(r, r.getA(), r.getH())),
    )
    this.registerCommand(0x85, 4, 0, 'ADD A, L', (r: any, m: any, a: any) =>
      r.setA(this.addBytes(r, r.getA(), r.getL())),
    )
    this.registerCommand(0x86, 8, 0, 'ADD A, (HL)', (r: any, m: any, a: any) =>
      r.setA(this.addBytes(r, r.getA(), m.readByte(r.getHL()))),
    )
    this.registerCommand(0xc6, 8, 1, 'ADD A, #', (r: any, m: any, a: any) =>
      r.setA(this.addBytes(r, r.getA(), a[0])),
    )

    this.registerCommand(0x8f, 4, 0, 'ADC A, A', (r: any, m: any, a: any) =>
      r.setA(this.addBytesAndCarry(r, r.getA(), r.getA())),
    )
    this.registerCommand(0x88, 4, 0, 'ADC A, B', (r: any, m: any, a: any) =>
      r.setA(this.addBytesAndCarry(r, r.getA(), r.getB())),
    )
    this.registerCommand(0x89, 4, 0, 'ADC A, C', (r: any, m: any, a: any) =>
      r.setA(this.addBytesAndCarry(r, r.getA(), r.getC())),
    )
    this.registerCommand(0x8a, 4, 0, 'ADC A, D', (r: any, m: any, a: any) =>
      r.setA(this.addBytesAndCarry(r, r.getA(), r.getD())),
    )
    this.registerCommand(0x8b, 4, 0, 'ADC A, E', (r: any, m: any, a: any) =>
      r.setA(this.addBytesAndCarry(r, r.getA(), r.getE())),
    )
    this.registerCommand(0x8c, 4, 0, 'ADC A, H', (r: any, m: any, a: any) =>
      r.setA(this.addBytesAndCarry(r, r.getA(), r.getH())),
    )
    this.registerCommand(0x8d, 4, 0, 'ADC A, L', (r: any, m: any, a: any) =>
      r.setA(this.addBytesAndCarry(r, r.getA(), r.getL())),
    )
    this.registerCommand(0x8e, 8, 0, 'ADC A, (HL)', (r: any, m: any, a: any) =>
      r.setA(this.addBytesAndCarry(r, r.getA(), m.readByte(r.getHL()))),
    )
    this.registerCommand(0xce, 8, 1, 'ADC A, #', (r: any, m: any, a: any) =>
      r.setA(this.addBytesAndCarry(r, r.getA(), a[0])),
    )

    this.registerCommand(0x97, 4, 0, 'SUB A, A', (r: any, m: any, a: any) =>
      r.setA(this.subBytes(r, r.getA(), r.getA())),
    )
    this.registerCommand(0x90, 4, 0, 'SUB A, B', (r: any, m: any, a: any) =>
      r.setA(this.subBytes(r, r.getA(), r.getB())),
    )
    this.registerCommand(0x91, 4, 0, 'SUB A, C', (r: any, m: any, a: any) =>
      r.setA(this.subBytes(r, r.getA(), r.getC())),
    )
    this.registerCommand(0x92, 4, 0, 'SUB A, D', (r: any, m: any, a: any) =>
      r.setA(this.subBytes(r, r.getA(), r.getD())),
    )
    this.registerCommand(0x93, 4, 0, 'SUB A, E', (r: any, m: any, a: any) =>
      r.setA(this.subBytes(r, r.getA(), r.getE())),
    )
    this.registerCommand(0x94, 4, 0, 'SUB A, H', (r: any, m: any, a: any) =>
      r.setA(this.subBytes(r, r.getA(), r.getH())),
    )
    this.registerCommand(0x95, 4, 0, 'SUB A, L', (r: any, m: any, a: any) =>
      r.setA(this.subBytes(r, r.getA(), r.getL())),
    )
    this.registerCommand(0x96, 8, 0, 'SUB A, (HL)', (r: any, m: any, a: any) =>
      r.setA(this.subBytes(r, r.getA(), m.readByte(r.getHL()))),
    )
    this.registerCommand(0xd6, 8, 1, 'SUB A, #', (r: any, m: any, a: any) =>
      r.setA(this.subBytes(r, r.getA(), a[0])),
    )

    this.registerCommand(0x9f, 4, 0, 'SBC A, A', (r: any, m: any, a: any) =>
      r.setA(this.subBytesWithCarry(r, r.getA(), r.getA())),
    )
    this.registerCommand(0x98, 4, 0, 'SBC A, B', (r: any, m: any, a: any) =>
      r.setA(this.subBytesWithCarry(r, r.getA(), r.getB())),
    )
    this.registerCommand(0x99, 4, 0, 'SBC A, C', (r: any, m: any, a: any) =>
      r.setA(this.subBytesWithCarry(r, r.getA(), r.getC())),
    )
    this.registerCommand(0x9a, 4, 0, 'SBC A, D', (r: any, m: any, a: any) =>
      r.setA(this.subBytesWithCarry(r, r.getA(), r.getD())),
    )
    this.registerCommand(0x9b, 4, 0, 'SBC A, E', (r: any, m: any, a: any) =>
      r.setA(this.subBytesWithCarry(r, r.getA(), r.getE())),
    )
    this.registerCommand(0x9c, 4, 0, 'SBC A, H', (r: any, m: any, a: any) =>
      r.setA(this.subBytesWithCarry(r, r.getA(), r.getH())),
    )
    this.registerCommand(0x9d, 4, 0, 'SBC A, L', (r: any, m: any, a: any) =>
      r.setA(this.subBytesWithCarry(r, r.getA(), r.getL())),
    )
    this.registerCommand(0x9e, 8, 0, 'SBC A, (HL)', (r: any, m: any, a: any) =>
      r.setA(this.subBytesWithCarry(r, r.getA(), m.readByte(r.getHL()))),
    )

    this.registerCommand(0xa7, 4, 0, 'AND A, A', (r: any, m: any, a: any) =>
      r.setA(this.and(r, r.getA(), r.getA())),
    )
    this.registerCommand(0xa0, 4, 0, 'AND A, B', (r: any, m: any, a: any) =>
      r.setA(this.and(r, r.getA(), r.getB())),
    )
    this.registerCommand(0xa1, 4, 0, 'AND A, C', (r: any, m: any, a: any) =>
      r.setA(this.and(r, r.getA(), r.getC())),
    )
    this.registerCommand(0xa2, 4, 0, 'AND A, D', (r: any, m: any, a: any) =>
      r.setA(this.and(r, r.getA(), r.getD())),
    )
    this.registerCommand(0xa3, 4, 0, 'AND A, E', (r: any, m: any, a: any) =>
      r.setA(this.and(r, r.getA(), r.getE())),
    )
    this.registerCommand(0xa4, 4, 0, 'AND A, H', (r: any, m: any, a: any) =>
      r.setA(this.and(r, r.getA(), r.getH())),
    )
    this.registerCommand(0xa5, 4, 0, 'AND A, L', (r: any, m: any, a: any) =>
      r.setA(this.and(r, r.getA(), r.getL())),
    )
    this.registerCommand(0xa6, 8, 0, 'AND A, (HL)', (r: any, m: any, a: any) =>
      r.setA(this.and(r, r.getA(), m.readByte(r.getHL()))),
    )
    this.registerCommand(0xe6, 8, 1, 'AND A, #', (r: any, m: any, a: any) =>
      r.setA(this.and(r, r.getA(), a[0])),
    )

    this.registerCommand(0xb7, 4, 0, 'OR A, A', (r: any, m: any, a: any) =>
      r.setA(this.or(r, r.getA(), r.getA())),
    )
    this.registerCommand(0xb0, 4, 0, 'OR A, B', (r: any, m: any, a: any) =>
      r.setA(this.or(r, r.getA(), r.getB())),
    )
    this.registerCommand(0xb1, 4, 0, 'OR A, C', (r: any, m: any, a: any) =>
      r.setA(this.or(r, r.getA(), r.getC())),
    )
    this.registerCommand(0xb2, 4, 0, 'OR A, D', (r: any, m: any, a: any) =>
      r.setA(this.or(r, r.getA(), r.getD())),
    )
    this.registerCommand(0xb3, 4, 0, 'OR A, E', (r: any, m: any, a: any) =>
      r.setA(this.or(r, r.getA(), r.getE())),
    )
    this.registerCommand(0xb4, 4, 0, 'OR A, H', (r: any, m: any, a: any) =>
      r.setA(this.or(r, r.getA(), r.getH())),
    )
    this.registerCommand(0xb5, 4, 0, 'OR A, L', (r: any, m: any, a: any) =>
      r.setA(this.or(r, r.getA(), r.getL())),
    )
    this.registerCommand(0xb6, 8, 0, 'OR A, (HL)', (r: any, m: any, a: any) =>
      r.setA(this.or(r, r.getA(), m.readByte(r.getHL()))),
    )
    this.registerCommand(0xf6, 8, 1, 'OR A, #', (r: any, m: any, a: any) =>
      r.setA(this.or(r, r.getA(), a[0])),
    )

    // XOR
    this.registerCommand(0xaf, 4, 0, 'XOR A, A', (r: any, m: any, a: any) =>
      r.setA(this.xor(r, r.getA(), r.getA())),
    )
    this.registerCommand(0xa8, 4, 0, 'XOR A, B', (r: any, m: any, a: any) =>
      r.setA(this.xor(r, r.getA(), r.getB())),
    )
    this.registerCommand(0xa9, 4, 0, 'XOR A, C', (r: any, m: any, a: any) =>
      r.setA(this.xor(r, r.getA(), r.getC())),
    )
    this.registerCommand(0xaa, 4, 0, 'XOR A, D', (r: any, m: any, a: any) =>
      r.setA(this.xor(r, r.getA(), r.getD())),
    )
    this.registerCommand(0xab, 4, 0, 'XOR A, E', (r: any, m: any, a: any) =>
      r.setA(this.xor(r, r.getA(), r.getE())),
    )
    this.registerCommand(0xac, 4, 0, 'XOR A, H', (r: any, m: any, a: any) =>
      r.setA(this.xor(r, r.getA(), r.getH())),
    )
    this.registerCommand(0xad, 4, 0, 'XOR A, L', (r: any, m: any, a: any) =>
      r.setA(this.xor(r, r.getA(), r.getL())),
    )
    this.registerCommand(0xae, 8, 0, 'XOR A, (HL)', (r: any, m: any, a: any) =>
      r.setA(this.xor(r, r.getA(), m.readByte(r.getHL()))),
    )
    this.registerCommand(0xee, 8, 1, 'XOR A, #', (r: any, m: any, a: any) =>
      r.setA(this.xor(r, r.getA(), a[0])),
    )

    // this.subBytes
    this.registerCommand(0xbf, 4, 0, 'CP A, A', (r: any, m: any, a: any) =>
      this.subBytes(r, r.getA(), r.getA()),
    )
    this.registerCommand(0xb8, 4, 0, 'CP A, B', (r: any, m: any, a: any) =>
      this.subBytes(r, r.getA(), r.getB()),
    )
    this.registerCommand(0xb9, 4, 0, 'CP A, C', (r: any, m: any, a: any) =>
      this.subBytes(r, r.getA(), r.getC()),
    )
    this.registerCommand(0xba, 4, 0, 'CP A, D', (r: any, m: any, a: any) =>
      this.subBytes(r, r.getA(), r.getD()),
    )
    this.registerCommand(0xbb, 4, 0, 'CP A, E', (r: any, m: any, a: any) =>
      this.subBytes(r, r.getA(), r.getE()),
    )
    this.registerCommand(0xbc, 4, 0, 'CP A, H', (r: any, m: any, a: any) =>
      this.subBytes(r, r.getA(), r.getH()),
    )
    this.registerCommand(0xbd, 4, 0, 'CP A, L', (r: any, m: any, a: any) =>
      this.subBytes(r, r.getA(), r.getL()),
    )
    this.registerCommand(0xbe, 8, 0, 'CP A, (HL)', (r: any, m: any, a: any) =>
      this.subBytes(r, r.getA(), m.readByte(r.getHL())),
    )
    this.registerCommand(0xfe, 8, 1, 'CP A, #', (r: any, m: any, a: any) =>
      this.subBytes(r, r.getA(), a[0]),
    )
    this.registerCommand(0xfe, 8, 1, 'CP A, #', (r: any, m: any, a: any) =>
      this.subBytes(r, r.getA(), a[0]),
    )

    // --- INC ---- //
    this.registerCommand(0x3c, 4, 0, 'INC A', (r: any, m: any, a: any) =>
      r.setA(this.inc(r, r.getA())),
    )
    this.registerCommand(0x04, 4, 0, 'INC B', (r: any, m: any, a: any) =>
      r.setB(this.inc(r, r.getB())),
    )
    this.registerCommand(0x0c, 4, 0, 'INC C', (r: any, m: any, a: any) =>
      r.setC(this.inc(r, r.getC())),
    )
    this.registerCommand(0x14, 4, 0, 'INC D', (r: any, m: any, a: any) =>
      r.setD(this.inc(r, r.getD())),
    )
    this.registerCommand(0x1c, 4, 0, 'INC E', (r: any, m: any, a: any) =>
      r.setE(this.inc(r, r.getE())),
    )
    this.registerCommand(0x24, 4, 0, 'INC H', (r: any, m: any, a: any) =>
      r.setH(this.inc(r, r.getH())),
    )
    this.registerCommand(0x2c, 4, 0, 'INC L', (r: any, m: any, a: any) =>
      r.setL(this.inc(r, r.getL())),
    )
    this.registerCommand(0x34, 12, 0, 'INC (HL)', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), this.inc(r, m.readByte(r.getHL()))),
    )

    // --- DEC ------//
    this.registerCommand(0x3d, 4, 0, 'DEC A', (r: any, m: any, a: any) =>
      r.setA(this.dec(r, r.getA())),
    )
    this.registerCommand(0x05, 4, 0, 'DEC B', (r: any, m: any, a: any) =>
      r.setB(this.dec(r, r.getB())),
    )
    this.registerCommand(0x0d, 4, 0, 'DEC C', (r: any, m: any, a: any) =>
      r.setC(this.dec(r, r.getC())),
    )
    this.registerCommand(0x15, 4, 0, 'DEC D', (r: any, m: any, a: any) =>
      r.setD(this.dec(r, r.getD())),
    )
    this.registerCommand(0x1d, 4, 0, 'DEC E', (r: any, m: any, a: any) =>
      r.setE(this.dec(r, r.getE())),
    )
    this.registerCommand(0x25, 4, 0, 'DEC H', (r: any, m: any, a: any) =>
      r.setH(this.dec(r, r.getH())),
    )
    this.registerCommand(0x2d, 4, 0, 'DEC L', (r: any, m: any, a: any) =>
      r.setL(this.dec(r, r.getL())),
    )
    this.registerCommand(0x35, 12, 0, 'DEC (HL)', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), this.dec(r, m.readByte(r.getHL()))),
    )

    this.registerCommand(0x09, 8, 0, 'ADD HL, BC', (r: any, m: any, a: any) =>
      r.setHL(this.addWords(r, r.getHL(), r.getBC())),
    )
    this.registerCommand(0x19, 8, 0, 'ADD HL, DE', (r: any, m: any, a: any) =>
      r.setHL(this.addWords(r, r.getHL(), r.getDE())),
    )
    this.registerCommand(0x29, 8, 0, 'ADD HL, HL', (r: any, m: any, a: any) =>
      r.setHL(this.addWords(r, r.getHL(), r.getHL())),
    )
    this.registerCommand(0x39, 8, 0, 'ADD HL, SP', (r: any, m: any, a: any) =>
      r.setHL(this.addWords(r, r.getHL(), r.getSP())),
    )

    this.registerCommand(0xe8, 16, 1, 'ADD SP, #', (r: any, m: any, a: any) =>
      r.setSP(this.addSignedByteToWord(r, r.getSP(), a[0])),
    )

    //-----inc ---
    this.registerCommand(0x03, 8, 0, 'INC BC', (r: any, m: any, a: any) =>
      r.setBC((r.getBC() + 1) & 0xffff),
    )
    this.registerCommand(0x13, 8, 0, 'INC DE', (r: any, m: any, a: any) =>
      r.setDE((r.getDE() + 1) & 0xffff),
    )
    this.registerCommand(0x23, 8, 0, 'INC HL', (r: any, m: any, a: any) =>
      r.setHL((r.getHL() + 1) & 0xffff),
    )
    this.registerCommand(0x33, 8, 0, 'INC SP', (r: any, m: any, a: any) =>
      r.setSP((r.getSP() + 1) & 0xffff),
    )

    this.registerCommand(0x0b, 8, 0, 'DEC BC', (r: any, m: any, a: any) =>
      r.setBC((r.getBC() - 1) & 0xffff),
    )
    this.registerCommand(0x1b, 8, 0, 'DEC DE', (r: any, m: any, a: any) =>
      r.setDE((r.getDE() - 1) & 0xffff),
    )
    this.registerCommand(0x2b, 8, 0, 'DEC HL', (r: any, m: any, a: any) =>
      r.setHL((r.getHL() - 1) & 0xffff),
    )
    this.registerCommand(0x3b, 8, 0, 'DEC SP', (r: any, m: any, a: any) =>
      r.setSP((r.getSP() - 1) & 0xffff),
    )

    this.registerCommand(0x27, 4, 0, 'DAA', (r: any, m: any, a: any) => {
      let result = r.getA()
      if ((result & 0x0f) > 9 || r.isH()) {
        result += 0x06
      }
      if ((result & 0xf0) > 0x90 || r.isC()) {
        result += 0x60
        r.setCFlag(true)
      }
      result &= 0xff
      r.setZFlag(result === 0)
      r.setHFlag(false)
      r.setA(result)
    })

    this.registerCommand(0x2f, 4, 0, 'CPL', (r: any, m: any, a: any) => {
      r.setNFlag(true)
      r.setHFlag(true)
      r.setA(~r.getA() & 0xff)
    })

    this.registerCommand(0x3f, 4, 0, 'CCF', (r: any, m: any, a: any) => {
      r.setNFlag(false)
      r.setHFlag(false)
      r.setCFlag(!r.isC())
    })

    this.registerCommand(0x37, 4, 0, 'SCF', (r: any, m: any, a: any) => {
      r.setNFlag(false)
      r.setHFlag(false)
      r.setCFlag(true)
    })

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

    this.registerCommand(0x07, 4, 0, 'RLCA', (r: any, m: any, a: any) =>
      r.setA(this.rotateLeft(r, r.getA())),
    )
    this.registerCommand(0x17, 4, 0, 'RLA', (r: any, m: any, a: any) =>
      r.setA(this.rotateLeftThroughCarry(r, r.getA())),
    )

    this.registerCommand(0x0f, 4, 0, 'RRCA', (r: any, m: any, a: any) =>
      r.setA(this.rotateRight(r, r.getA())),
    )
    this.registerCommand(0x1f, 4, 0, 'RRA', (r: any, m: any, a: any) =>
      r.setA(this.rotateRightThroughCarry(r, r.getA())),
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

    this.registerCommand(0xcd, 12, 2, 'CALL nn', (r: any, m: any, a: any) =>
      this.call(r, m, BitUtils.toWord(a)),
    )

    this.registerCommand(0xc9, 8, 0, 'RET', (r: any, m: any, a: any) =>
      this.ret(r, m),
    )

    /** Ext Commands */
    this.registerCommandExt(0x07, 8, 0, 'RLC A', (r: any, m: any, a: any) =>
      r.setA(this.rotateLeft(r, r.getA())),
    )
    this.registerCommandExt(0x00, 8, 0, 'RLC B', (r: any, m: any, a: any) =>
      r.setB(this.rotateLeft(r, r.getB())),
    )
    this.registerCommandExt(0x01, 8, 0, 'RLC C', (r: any, m: any, a: any) =>
      r.setC(this.rotateLeft(r, r.getC())),
    )
    this.registerCommandExt(0x02, 8, 0, 'RLC D', (r: any, m: any, a: any) =>
      r.setD(this.rotateLeft(r, r.getD())),
    )
    this.registerCommandExt(0x03, 8, 0, 'RLC E', (r: any, m: any, a: any) =>
      r.setE(this.rotateLeft(r, r.getE())),
    )
    this.registerCommandExt(0x04, 8, 0, 'RLC H', (r: any, m: any, a: any) =>
      r.setH(this.rotateLeft(r, r.getH())),
    )
    this.registerCommandExt(0x05, 8, 0, 'RLC L', (r: any, m: any, a: any) =>
      r.setL(this.rotateLeft(r, r.getL())),
    )
    this.registerCommandExt(0x06, 16, 0, 'RLC (HL)', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), this.rotateLeft(r, m.readByte(r.getHL()))),
    )

    this.registerCommandExt(0x17, 8, 0, 'RL A', (r: any, m: any, a: any) =>
      r.setA(this.rotateLeftThroughCarry(r, r.getA())),
    )
    this.registerCommandExt(0x10, 8, 0, 'RL B', (r: any, m: any, a: any) =>
      r.setB(this.rotateLeftThroughCarry(r, r.getB())),
    )
    this.registerCommandExt(0x11, 8, 0, 'RL C', (r: any, m: any, a: any) =>
      r.setC(this.rotateLeftThroughCarry(r, r.getC())),
    )
    this.registerCommandExt(0x12, 8, 0, 'RL D', (r: any, m: any, a: any) =>
      r.setD(this.rotateLeftThroughCarry(r, r.getD())),
    )
    this.registerCommandExt(0x13, 8, 0, 'RL E', (r: any, m: any, a: any) =>
      r.setE(this.rotateLeftThroughCarry(r, r.getE())),
    )
    this.registerCommandExt(0x14, 8, 0, 'RL H', (r: any, m: any, a: any) =>
      r.setH(this.rotateLeftThroughCarry(r, r.getH())),
    )
    this.registerCommandExt(0x15, 8, 0, 'RL L', (r: any, m: any, a: any) =>
      r.setL(this.rotateLeftThroughCarry(r, r.getL())),
    )
    this.registerCommandExt(0x16, 16, 0, 'RL (HL)', (r: any, m: any, a: any) =>
      m.writeByte(
        r.getHL(),
        this.rotateLeftThroughCarry(r, m.readByte(r.getHL())),
      ),
    )

    this.registerCommandExt(0x0f, 8, 0, 'RRC A', (r: any, m: any, a: any) =>
      r.setA(this.rotateRight(r, r.getA())),
    )
    this.registerCommandExt(0x08, 8, 0, 'RRC B', (r: any, m: any, a: any) =>
      r.setB(this.rotateRight(r, r.getB())),
    )
    this.registerCommandExt(0x09, 8, 0, 'RRC C', (r: any, m: any, a: any) =>
      r.setC(this.rotateRight(r, r.getC())),
    )
    this.registerCommandExt(0x0a, 8, 0, 'RRC D', (r: any, m: any, a: any) =>
      r.setD(this.rotateRight(r, r.getD())),
    )
    this.registerCommandExt(0x0b, 8, 0, 'RRC E', (r: any, m: any, a: any) =>
      r.setE(this.rotateRight(r, r.getE())),
    )
    this.registerCommandExt(0x0c, 8, 0, 'RRC H', (r: any, m: any, a: any) =>
      r.setH(this.rotateRight(r, r.getH())),
    )
    this.registerCommandExt(0x0d, 8, 0, 'RRC L', (r: any, m: any, a: any) =>
      r.setL(this.rotateRight(r, r.getL())),
    )
    this.registerCommandExt(0x0e, 16, 0, 'RRC (HL)', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), this.rotateRight(r, m.readByte(r.getHL()))),
    )

    this.registerCommandExt(0x1f, 8, 0, 'RR A', (r: any, m: any, a: any) =>
      r.setA(this.rotateRightThroughCarry(r, r.getA())),
    )
    this.registerCommandExt(0x18, 8, 0, 'RR B', (r: any, m: any, a: any) =>
      r.setB(this.rotateRightThroughCarry(r, r.getB())),
    )
    this.registerCommandExt(0x19, 8, 0, 'RR C', (r: any, m: any, a: any) =>
      r.setC(this.rotateRightThroughCarry(r, r.getC())),
    )
    this.registerCommandExt(0x1a, 8, 0, 'RR D', (r: any, m: any, a: any) =>
      r.setD(this.rotateRightThroughCarry(r, r.getD())),
    )
    this.registerCommandExt(0x1b, 8, 0, 'RR E', (r: any, m: any, a: any) =>
      r.setE(this.rotateRightThroughCarry(r, r.getE())),
    )
    this.registerCommandExt(0x1c, 8, 0, 'RR H', (r: any, m: any, a: any) =>
      r.setH(this.rotateRightThroughCarry(r, r.getH())),
    )
    this.registerCommandExt(0x1d, 8, 0, 'RR L', (r: any, m: any, a: any) =>
      r.setL(this.rotateRightThroughCarry(r, r.getL())),
    )
    this.registerCommandExt(0x1e, 16, 0, 'RR (HL)', (r: any, m: any, a: any) =>
      m.writeByte(
        r.getHL(),
        this.rotateRightThroughCarry(r, m.readByte(r.getHL())),
      ),
    )

    // --------------- //
    this.registerCommandExt(0x27, 8, 0, 'SLA A', (r: any, m: any, a: any) =>
      r.setA(this.shiftLeft(r, r.getA())),
    )
    this.registerCommandExt(0x20, 8, 0, 'SLA B', (r: any, m: any, a: any) =>
      r.setB(this.shiftLeft(r, r.getB())),
    )
    this.registerCommandExt(0x21, 8, 0, 'SLA C', (r: any, m: any, a: any) =>
      r.setC(this.shiftLeft(r, r.getC())),
    )
    this.registerCommandExt(0x22, 8, 0, 'SLA D', (r: any, m: any, a: any) =>
      r.setD(this.shiftLeft(r, r.getD())),
    )
    this.registerCommandExt(0x23, 8, 0, 'SLA E', (r: any, m: any, a: any) =>
      r.setE(this.shiftLeft(r, r.getE())),
    )
    this.registerCommandExt(0x24, 8, 0, 'SLA H', (r: any, m: any, a: any) =>
      r.setH(this.shiftLeft(r, r.getH())),
    )
    this.registerCommandExt(0x25, 8, 0, 'SLA L', (r: any, m: any, a: any) =>
      r.setL(this.shiftLeft(r, r.getL())),
    )
    this.registerCommandExt(0x26, 16, 0, 'SLA (HL)', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), this.shiftLeft(r, m.readByte(r.getHL()))),
    )

    this.registerCommandExt(0x2f, 8, 0, 'SRA A', (r: any, m: any, a: any) =>
      r.setA(this.shiftRightArtithmetic(r, r.getA())),
    )
    this.registerCommandExt(0x28, 8, 0, 'SRA B', (r: any, m: any, a: any) =>
      r.setB(this.shiftRightArtithmetic(r, r.getB())),
    )
    this.registerCommandExt(0x29, 8, 0, 'SRA C', (r: any, m: any, a: any) =>
      r.setC(this.shiftRightArtithmetic(r, r.getC())),
    )
    this.registerCommandExt(0x2a, 8, 0, 'SRA D', (r: any, m: any, a: any) =>
      r.setD(this.shiftRightArtithmetic(r, r.getD())),
    )
    this.registerCommandExt(0x2b, 8, 0, 'SRA E', (r: any, m: any, a: any) =>
      r.setE(this.shiftRightArtithmetic(r, r.getE())),
    )
    this.registerCommandExt(0x2c, 8, 0, 'SRA H', (r: any, m: any, a: any) =>
      r.setH(this.shiftRightArtithmetic(r, r.getH())),
    )
    this.registerCommandExt(0x2d, 8, 0, 'SRA L', (r: any, m: any, a: any) =>
      r.setL(this.shiftRightArtithmetic(r, r.getL())),
    )
    this.registerCommandExt(0x2e, 16, 0, 'SRA (HL)', (r: any, m: any, a: any) =>
      m.writeByte(
        r.getHL(),
        this.shiftRightArtithmetic(r, m.readByte(r.getHL())),
      ),
    )

    this.registerCommandExt(0x3f, 8, 0, 'SRL A', (r: any, m: any, a: any) =>
      r.setA(this.shiftRightLogical(r, r.getA())),
    )
    this.registerCommandExt(0x38, 8, 0, 'SRL B', (r: any, m: any, a: any) =>
      r.setB(this.shiftRightLogical(r, r.getB())),
    )
    this.registerCommandExt(0x39, 8, 0, 'SRL C', (r: any, m: any, a: any) =>
      r.setC(this.shiftRightLogical(r, r.getC())),
    )
    this.registerCommandExt(0x3a, 8, 0, 'SRL D', (r: any, m: any, a: any) =>
      r.setD(this.shiftRightLogical(r, r.getD())),
    )
    this.registerCommandExt(0x3b, 8, 0, 'SRL E', (r: any, m: any, a: any) =>
      r.setE(this.shiftRightLogical(r, r.getE())),
    )
    this.registerCommandExt(0x3c, 8, 0, 'SRL H', (r: any, m: any, a: any) =>
      r.setH(this.shiftRightLogical(r, r.getH())),
    )
    this.registerCommandExt(0x3d, 8, 0, 'SRL L', (r: any, m: any, a: any) =>
      r.setL(this.shiftRightLogical(r, r.getL())),
    )
    this.registerCommandExt(0x3e, 16, 0, 'SRL (HL)', (r: any, m: any, a: any) =>
      m.writeByte(r.getHL(), this.shiftRightLogical(r, m.readByte(r.getHL()))),
    )

    //----------------------//

    this.registerCommandExt(0x37, 8, 0, 'SWAP A', (r: any, m: any, a: any) =>
      r.setA(this.swap(r, r.getA())),
    )
    this.registerCommandExt(0x30, 8, 0, 'SWAP B', (r: any, m: any, a: any) =>
      r.setB(this.swap(r, r.getB())),
    )
    this.registerCommandExt(0x31, 8, 0, 'SWAP C', (r: any, m: any, a: any) =>
      r.setC(this.swap(r, r.getC())),
    )
    this.registerCommandExt(0x32, 8, 0, 'SWAP D', (r: any, m: any, a: any) =>
      r.setD(this.swap(r, r.getD())),
    )
    this.registerCommandExt(0x33, 8, 0, 'SWAP E', (r: any, m: any, a: any) =>
      r.setE(this.swap(r, r.getE())),
    )
    this.registerCommandExt(0x34, 8, 0, 'SWAP H', (r: any, m: any, a: any) =>
      r.setH(this.swap(r, r.getH())),
    )
    this.registerCommandExt(0x35, 8, 0, 'SWAP L', (r: any, m: any, a: any) =>
      r.setL(this.swap(r, r.getL())),
    )
    this.registerCommandExt(
      0x36,
      16,
      0,
      'SWAP (HL)',
      (r: any, m: any, a: any) =>
        m.writeByte(r.getHL(), this.swap(r, m.readByte(r.getHL()))),
    )

    //------------------------//
    for (let i = 0; i < 8; i++) {
      const bit = i
      this.registerCommandExt(
        0x47 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', A',
        (r: any, m: any, a: any) => this.bit(r, r.getA(), bit),
      )
      this.registerCommandExt(
        0x40 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', B',
        (r: any, m: any, a: any) => this.bit(r, r.getB(), bit),
      )
      this.registerCommandExt(
        0x41 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', C',
        (r: any, m: any, a: any) => this.bit(r, r.getC(), bit),
      )
      this.registerCommandExt(
        0x42 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', D',
        (r: any, m: any, a: any) => this.bit(r, r.getD(), bit),
      )
      this.registerCommandExt(
        0x43 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', E',
        (r: any, m: any, a: any) => this.bit(r, r.getE(), bit),
      )
      this.registerCommandExt(
        0x44 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', H',
        (r: any, m: any, a: any) => this.bit(r, r.getH(), bit),
      )
      this.registerCommandExt(
        0x45 + 0x08 * bit,
        8,
        0,
        'BIT ' + bit + ', L',
        (r: any, m: any, a: any) => this.bit(r, r.getL(), bit),
      )
      this.registerCommandExt(
        0x46 + 0x08 * bit,
        16,
        0,
        'BIT ' + bit + ', (HL)',
        (r: any, m: any, a: any) => this.bit(r, m.readByte(r.getHL()), bit),
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

      this.registerCommand(0xc3, 12, 2, 'JMP nn', (r: any, m: any, a: any) =>
        r.setPC(BitUtils.toWord(a)),
      )

      this.registerCommand(
        0xc2,
        12,
        2,
        'JP NZ, nn',
        (r: any, m: any, a: any) => {
          if (!r.isZ()) r.setPC(BitUtils.toWord(a))
        },
      )
      this.registerCommand(
        0xca,
        12,
        2,
        'JP Z, nn',
        (r: any, m: any, a: any) => {
          if (r.isZ()) r.setPC(BitUtils.toWord(a))
        },
      )
      this.registerCommand(
        0xd2,
        12,
        2,
        'JP NC, nn',
        (r: any, m: any, a: any) => {
          if (!r.isC()) r.setPC(BitUtils.toWord(a))
        },
      )
      this.registerCommand(
        0xda,
        12,
        2,
        'JP C, nn',
        (r: any, m: any, a: any) => {
          if (r.isC()) r.setPC(BitUtils.toWord(a))
        },
      )

      this.registerCommand(0xe9, 4, 0, 'JP (HL)', (r: any, m: any, a: any) =>
        r.setPC(r.getHL()),
      )
      this.registerCommand(0x18, 8, 1, 'JR n', (r: any, m: any, a: any) =>
        r.addToPC(a[0]),
      )

      this.registerCommand(0xcd, 12, 2, 'CALL nn', (r: any, m: any, a: any) =>
        this.call(r, m, BitUtils.toWord(a)),
      )

      this.registerCommand(
        0xc4,
        12,
        2,
        'CALL NZ, n',
        (r: any, m: any, a: any) => {
          if (!r.isZ()) this.call(r, m, BitUtils.toWord(a))
        },
      )
      this.registerCommand(
        0xcc,
        12,
        2,
        'CALL Z, n',
        (r: any, m: any, a: any) => {
          if (r.isZ()) this.call(r, m, BitUtils.toWord(a))
        },
      )
      this.registerCommand(
        0xd4,
        12,
        2,
        'CALL NC, n',
        (r: any, m: any, a: any) => {
          if (!r.isC()) this.call(r, m, BitUtils.toWord(a))
        },
      )
      this.registerCommand(
        0xdc,
        12,
        2,
        'CALL C, n',
        (r: any, m: any, a: any) => {
          if (r.isC()) this.call(r, m, BitUtils.toWord(a))
        },
      )

      this.registerCommand(0xc7, 32, 0, 'RST 00H', (r: any, m: any, a: any) =>
        this.reset(r, m, 0x00),
      )
      this.registerCommand(0xcf, 32, 0, 'RST 08H', (r: any, m: any, a: any) =>
        this.reset(r, m, 0x08),
      )
      this.registerCommand(0xd7, 32, 0, 'RST 10H', (r: any, m: any, a: any) =>
        this.reset(r, m, 0x10),
      )
      this.registerCommand(0xdf, 32, 0, 'RST 18H', (r: any, m: any, a: any) =>
        this.reset(r, m, 0x18),
      )
      this.registerCommand(0xe7, 32, 0, 'RST 20H', (r: any, m: any, a: any) =>
        this.reset(r, m, 0x20),
      )
      this.registerCommand(0xef, 32, 0, 'RST 28H', (r: any, m: any, a: any) =>
        this.reset(r, m, 0x28),
      )
      this.registerCommand(0xf7, 32, 0, 'RST 30H', (r: any, m: any, a: any) =>
        this.reset(r, m, 0x30),
      )
      this.registerCommand(0xff, 32, 0, 'RST 38H', (r: any, m: any, a: any) =>
        this.reset(r, m, 0x38),
      )

      this.registerCommand(0xc9, 8, 0, 'RET', (r: any, m: any, a: any) =>
        this.ret(r, m),
      )

      this.registerCommand(0xc0, 8, 0, 'RET NZ', (r: any, m: any, a: any) => {
        if (!r.isZ()) this.ret(r, m)
      })
      this.registerCommand(0xc8, 8, 0, 'RET Z', (r: any, m: any, a: any) => {
        if (r.isZ()) this.ret(r, m)
      })
      this.registerCommand(0xd0, 8, 0, 'RET NC', (r: any, m: any, a: any) => {
        if (!r.isC()) this.ret(r, m)
      })
      this.registerCommand(0xd8, 8, 0, 'RET C', (r: any, m: any, a: any) => {
        if (r.isC()) this.ret(r, m)
      })

      this.registerCommand(0xd9, 8, 0, 'RETI', (r: any, m: any, a: any) => {
        this.ret(r, m) /* TODO enabled interrupts */
      })
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
    flags.setZFlag(result === 0)
    flags.setNFlag(false)
    flags.setHFlag(false)
    flags.setCFlag(false)
    return result
  }

  or(flags: any, byte1: any, byte2: any) {
    // checkByteArgument("byte1", byte1);
    // checkByteArgument("byte2", byte2);
    const result = byte1 | byte2
    flags.setZFlag(result === 0)
    flags.setNFlag(false)
    flags.setHFlag(false)
    flags.setCFlag(false)
    return result
  }

  and(flags: any, byte1: any, byte2: any) {
    // checkByteArgument("byte1", byte1);
    // checkByteArgument("byte2", byte2);
    const result = byte1 & byte2
    flags.setZFlag(result === 0)
    flags.setNFlag(false)
    flags.setHFlag(false)
    flags.setCFlag(false)
    return result
  }

  subBytes(flags: any, byte1: any, byte2: any) {
    // checkByteArgument("byte1", byte1);
    // checkByteArgument("byte2", byte2);
    flags.setZFlag(((byte1 - byte2) & 0xff) === 0)
    flags.setNFlag(true)
    flags.setHFlag((0x0f & byte2) > (0x0f & byte1))
    flags.setCFlag(byte2 > byte1)
    return (byte1 - byte2) % 0xff
  }

  rotateLeft(flags: any, byteValue: any) {
    // checkByteArgument("byteValue", byteValue);
    let result = (byteValue << 1) & 0xff
    if ((byteValue & (1 << 7)) !== 0) {
      result |= 1
      flags.setCFlag(true)
    } else {
      flags.setCFlag(false)
    }
    flags.setZFlag(result === 0)
    flags.setNFlag(false)
    flags.setHFlag(false)
    return result
  }

  swap(flags: any, byteValue: any) {
    // checkByteArgument("byteValue", byteValue);
    let upper = byteValue & 0xf0
    let lower = byteValue & 0x0f
    let result = (lower << 4) | (upper >> 4)
    flags.setZFlag(result === 0)
    flags.setNFlag(false)
    flags.setHFlag(false)
    flags.setCFlag(false)
    return result
  }

  shiftLeft(flags: any, byteValue: any): any {
    // checkByteArgument("byteValue", byteValue);
    let result = (byteValue << 1) & 0xff
    flags.setCFlag((byteValue & (1 << 7)) !== 0)
    flags.setZFlag(result === 0)
    flags.setNFlag(false)
    flags.setHFlag(false)
    return result
  }

  bit(flags: any, byteValue: any, bit: any) {
    // checkByteArgument("byteValue", byteValue);
    // checkByteArgument("bit", bit);
    flags.setNFlag(false)
    flags.setHFlag(true)
    if (bit < 8) {
      flags.setZFlag((byteValue & (1 << bit)) !== 0)
    }
  }

  dec(flags: any, byteValue: any) {
    const result = (byteValue - 1) & 0xff
    flags.setZFlag(result === 0)
    flags.setNFlag(false)
    flags.setHFlag((0x0f & byteValue) === 0)
    return result
  }

  inc(flags: any, byteValue: any) {
    // checkByteArgument("byteValue", byteValue);
    const result = (byteValue + 1) & 0xff
    flags.setZFlag(result === 0)
    flags.setNFlag(false)
    flags.setHFlag((0x0f & result) < (0x0f & byteValue))
    return result
  }

  pop(registers: any, addressSpace: any) {
    const lsb = addressSpace.readByte(registers.getSP())
    registers.incrementSP()
    const msb = addressSpace.readByte(registers.getSP())
    registers.incrementSP()
    return BitUtils.toWordBytes(msb, lsb)
  }

  push(registers: any, addressSpace: any, word: any) {
    // checkWordArgument("word", word);
    registers.decrementSP()
    addressSpace.writeByte(registers.getSP(), BitUtils.getMSB(word))
    registers.decrementSP()
    addressSpace.writeByte(registers.getSP(), BitUtils.getLSB(word))
  }

  call(registers: any, addressSpace: any, address: any) {
    // checkWordArgument("address", address);
    this.push(registers, addressSpace, (registers.getPC() + 3) & 0xffff)
    registers.setPC(address)
  }

  addSignedByteToWord(flags: any, word: any, signedByte: any) {
    // checkWordArgument("w", word);
    // checkByteArgument("b", signedByte);

    flags.setZFlag(false)
    flags.setNFlag(false)

    const b = BitUtils.abs(signedByte)

    if (BitUtils.isNegative(signedByte)) {
      flags.setHFlag((word & 0x0f) < (b & 0x0f))
      flags.setCFlag((word & 0xff) < b)
      return (word - b) % 0xffff
    } else {
      flags.setCFlag((word & 0xff) + b > 0xff)
      flags.setHFlag((word & 0x0f) + (b & 0x0f) > 0x0f)
      return (word + b) & 0xffff
    }
  }

  rotateLeftThroughCarry(flags: any, byteValue: any) {
    // checkByteArgument("byteValue", byteValue);
    let result = (byteValue << 1) & 0xff
    result |= flags.isC() ? 1 : 0
    flags.setCFlag((byteValue & (1 << 7)) !== 0)
    flags.setZFlag(result == 0)
    flags.setNFlag(false)
    flags.setHFlag(false)
    return result
  }

  addBytes(flags: any, byte1: any, byte2: any) {
    // checkByteArgument("byte1", byte1);
    // checkByteArgument("byte2", byte2);
    flags.setZFlag(((byte1 + byte2) & 0xff) === 0)
    flags.setNFlag(false)
    flags.setHFlag((byte1 & 0x0f) + (byte2 & 0x0f) > 0x0f)
    flags.setCFlag(byte1 + byte2 > 0xff)
    return (byte1 + byte2) & 0xff
  }

  addBytesAndCarry(flags: any, byte1: any, byte2: any) {
    // checkByteArgument("byte1", byte1);
    // checkByteArgument("byte2", byte2);
    let carry = flags.isC() ? 1 : 0
    flags.setZFlag(((byte1 + byte2 + carry) & 0xff) === 0)
    flags.setNFlag(false)
    flags.setHFlag((byte1 & 0x0f) + (byte2 & 0x0f) + carry > 0x0f)
    flags.setCFlag(byte1 + byte2 + carry > 0xff)
    return (byte1 + byte2 + carry) & 0xff
  }

  addWords(flags: any, word1: any, word2: any) {
    // checkWordArgument("word1", word1);
    // checkWordArgument("word2", word2);
    flags.setNFlag(false)
    flags.setHFlag((word1 & 0x0fff) + (word2 & 0x0fff) > 0x0fff)
    flags.setCFlag(word1 + word2 > 0xffff)
    return (word1 + word2) & 0xffff
  }

  subBytesWithCarry(flags: any, byte1: any, byte2: any) {
    // checkByteArgument("byte1", byte1);
    // checkByteArgument("byte2", byte2);
    let carry = flags.isC() ? 1 : 0
    flags.setZFlag(((byte1 - byte2 - carry) & 0xff) === 0)
    flags.setNFlag(true)
    flags.setHFlag((0x0f & (byte2 + carry)) > (0x0f & byte1))
    flags.setCFlag(byte2 + carry > byte1)
    return (byte1 - byte2 - carry) % 0xff
  }

  ret(registers: any, addressSpace: any) {
    registers.setPC(this.pop(registers, addressSpace))
  }

  rotateRight(flags: any, byteValue: any) {
    // checkByteArgument("byteValue", byteValue);
    let result = byteValue >> 1
    if ((byteValue & 1) === 1) {
      result |= 1 << 7
      flags.setCFlag(true)
    } else {
      flags.setCFlag(false)
    }
    flags.setZFlag(result == 0)
    flags.setNFlag(false)
    flags.setHFlag(false)
    return result
  }

  rotateRightThroughCarry(flags: any, byteValue: any) {
    // checkByteArgument("byteValue", byteValue);
    let result = byteValue >> 1
    result |= flags.isC() ? 1 << 7 : 0
    flags.setCFlag((byteValue & 1) !== 0)
    flags.setZFlag(result === 0)
    flags.setNFlag(false)
    flags.setHFlag(false)
    return result
  }
  shiftRightArtithmetic(flags: any, byteValue: any) {
    // checkByteArgument("byteValue", byteValue);
    let result = (byteValue >> 1) | (byteValue & (1 << 7))
    flags.setCFlag((byteValue & 1) !== 0)
    flags.setZFlag(result === 0)
    flags.setNFlag(false)
    flags.setHFlag(false)
    return result
  }

  shiftRightLogical(flags: any, byteValue: any) {
    // checkByteArgument("byteValue", byteValue);
    let result = byteValue >> 1
    flags.setCFlag((byteValue & 1) != 0)
    flags.setZFlag(result == 0)
    flags.setNFlag(false)
    flags.setHFlag(false)
    return result
  }

  reset(registers: any, addressSpace: any, address: any) {
    // checkByteArgument("address", address);
    this.push(registers, addressSpace, registers.getPC())
    registers.setPC(address)
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
