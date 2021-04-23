import Instructions from './Instructions'

export default class Opcode {
  instruction: Array<Instructions>
  constructor() {
    this.instruction.push(
      new Instructions(0x06, 8, 'LD B,n', (r, m, a) => {
        r.setB(a[0])
      }),
    )
    this.instruction.push(
      new Instructions(0x0e, 8, 'LD C,n', (r, m, a) => {
        r.setC(a[0])
      }),
    )
  }
}
