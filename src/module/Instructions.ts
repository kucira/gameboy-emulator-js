export default class Instructions {
  address: any
  label: string
  cycles: any
  opcode: any
  commandOperation: Function
  constructor(
    opcode: any,
    cycles: any,
    label: string,
    commandOperation: Function,
  ) {
    this.opcode = opcode
    this.cycles = cycles
    this.label = label
    this.commandOperation = commandOperation
  }
}
