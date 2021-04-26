export default class BitUtils {
  static getMSB(word: any) {
    // checkWordArgument("word", word);
    return word >> 8
  }

  static getLSB(word: any) {
    // checkWordArgument("word", word);
    return word & 0xff
  }

  static toWord(bytes: any): any {
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

  // public static int setBit(int byteValue, int position) {
  //     checkByteArgument("byteValue", byteValue);
  //     return (byteValue | (1 << position)) & 0xff;
  // }

  // public static int clearBit(int byteValue, int position) {
  //     checkByteArgument("byteValue", byteValue);
  //     return ~(1 << position) & byteValue & 0xff;
  // }

  // public static boolean isNegative(int signedByteValue) {
  //     checkByteArgument("byteValue", signedByteValue);
  //     return (signedByteValue & (1 << 7)) != 0;
  // }

  // public static int abs(int signedByteValue) {
  //     checkByteArgument("signedByteValue", signedByteValue);
  //     if (isNegative(signedByteValue)) {
  //         return 0x100 - signedByteValue;
  //     } else {
  //         return signedByteValue;
  //     }
  // }
}
