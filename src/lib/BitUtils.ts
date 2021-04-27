/** https://en.wikipedia.org/wiki/Bit_numbering */
/** https://www.interviewcake.com/concept/java/bit-shift */
/** https://www.interviewcake.com/concept/python/and */
/** https://www.interviewcake.com/concept/python/or */
/** https://multigesture.net/articles/how-to-write-an-emulator-Chip-8-interpreter/ */
export default class BitUtils {
  /**  bitwise operation to get the MSB(Most Significant Bit)
   * MSB get the left or the first position of binary
   * ex: 0001 -> MSB = 0
   *
   * bitwise shift right is divided by 2
   * binary = 0000001111101000 (1000 in decimal), binary >> 2
   * copy the MSB = 0 twice( x >> 2) if(x >> 3) then it will copy 3 times
   * binary = 00 + 0000001111101000 -> 0000 0000 1111 1010 -> 250
   * and the value will be 1000 / 2 = 500 / 2 = 250
   *
   * bitwise shift left is multiply by 2
   * binary = 0000001111101000 (1000 in decimal) , binary << 2 it will add bit 00 to end
   * 0000001111101000 + 00 -> 0000111110100000 -> 4000
   * and the value will be 1000 x 2 = 2000 x 2 = 4000 */
  static getMSB(word: any) {
    // checkWordArgument("word", word);
    return word >> 8
  }

  // Least significant bit
  // LSB get the right or the last position of binary
  // ex: 1001 -> LSB = 1
  static getLSB(word: any) {
    // checkWordArgument("word", word);
    return word & 0xff
  }

  /** the cpu gameboy register able to combine 16 bit register for example BC Register
   * so we need to combine the 8 bit in B and C value to 16 bit
   * to combine use the bitwise left shift 8 and use or (|) bitwise
   * or bitwise (|) usually use for set bits
   * for and bitwise (&) usually use for extracting bits
   *
   * ex: (first bytes << 8) | second bytes
   */
  static toWord(bytes: Uint16Array): any {
    return this.toWordBytes(bytes[1], bytes[0])
  }

  static toWordBytes(msb: any, lsb: any) {
    // checkByteArgument("msb", msb);
    // checkByteArgument("lsb", lsb);
    return (msb << 8) | lsb
  }

  static getBit(byteValue: any, position: any): boolean {
    return (byteValue & (1 << position)) != 0
  }

  // public static int setBit(int byteValue, int position, boolean value) {
  //     return value ? setBit(byteValue, position) : clearBit(byteValue, position);
  // }

  static setBit(byteValue: any, position: any) {
    // checkByteArgument("byteValue", byteValue);
    return (byteValue | (1 << position)) & 0xff
  }

  static clearBit(byteValue: any, position: any) {
    // checkByteArgument("byteValue", byteValue);
    return ~(1 << position) & byteValue & 0xff
  }

  static isNegative(signedByteValue: any): boolean {
    // checkByteArgument("byteValue", signedByteValue);
    return (signedByteValue & (1 << 7)) != 0
  }

  static abs(signedByteValue: any) {
    // checkByteArgument("signedByteValue", signedByteValue);
    if (BitUtils.isNegative(signedByteValue)) {
      return 0x100 - signedByteValue
    } else {
      return signedByteValue
    }
  }
}
