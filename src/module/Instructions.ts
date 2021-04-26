export default class Instructions {
  opcode: any
  cycles: any
  args: any
  label: string
  commandOperation: Function
  constructor(
    opcode: any,
    cycles: any,
    args: any,
    label: string,
    commandOperation: Function,
  ) {
    this.opcode = opcode
    this.args = args
    this.cycles = cycles
    this.label = label
    this.commandOperation = commandOperation
  }
}
