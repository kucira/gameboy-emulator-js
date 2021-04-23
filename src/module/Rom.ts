export default class Rom {
  space: any
  offset: any
  constructor(space: any, offset: any) {
    this.space = space
    this.offset = offset
  }

  setByte(value: any, address: any): void {
    console.warn(`Can't write ${value} to ROM ${address}`)
  }

  /** getByte of ROM address
   * Make sure the byte in the offset
   */
  getByte(address: any) {
    if (this.offset > address) {
      console.warn(`Address ${address} < Offset ${this.offset}`)
      return 0
    }
    let position = address - this.offset
    if (position >= this.space.length) {
      console.warn(
        `Address ${address} out of ROM space ${
          this.offset + this.space.length
        }`,
      )
    }
    return this.space[position]
  }

  getRom(): Rom {
    return this
  }
}
