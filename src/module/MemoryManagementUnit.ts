import { MEMORY, MATCH_MEMORY_ADDRESS, BIOS_GB } from '../constant/Constants'
import Rom from './Rom'
export default class MemoryManagementUnit {
  bytes: Uint16Array
  rom: Rom
  constructor(rom: Rom) {
    this.bytes = MEMORY
    this.rom = rom
  }

  /** read Byte from address */
  readByte(address: any): any {
    return this.getSpace(address)
  }

  /** write value into address of Memory */
  writeByte(address: any, data: any): void {
    this.bytes[address] = data
  }

  /** get Byte address with checking if the address in BootRoom or in the Memory RAM */
  private getSpace(address: any): any {
    // start from 0-255 or 0x00 - 0xff this is 8bit
    // 0-255 is the boot room
    if (address >= 0x00 && address <= 0xff) {
      return this.rom.getByte(address)
    }
    return this.bytes[address]
  }

  /** Matching Address of GAMEBOY Memory Address*/
  private getMatchMemory(address: any): Uint16Array {
    /** this is the ROM header Address information */
    if (
      this.bytes[address] > MATCH_MEMORY_ADDRESS.ROM_HEADER_START &&
      this.bytes[address] < MATCH_MEMORY_ADDRESS.ROM_HEADER_END
    ) {
      return this.bytes
    }

    throw new Error(`Invalid Address Memory ${address} -> ${String(address)}`)
  }
}
