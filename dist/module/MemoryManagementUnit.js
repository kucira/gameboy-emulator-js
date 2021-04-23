"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../constant/Constants");
class MemoryManagementUnit {
    constructor(rom) {
        this.bytes = Constants_1.MEMORY;
        this.rom = rom;
    }
    /** read Byte from address */
    readByte(address) {
        return this.getSpace(address);
    }
    /** write value into address of Memory */
    writeByte(address, data) {
        this.bytes[address] = data;
    }
    /** get Byte address with checking if the address in BootRoom or in the Memory RAM */
    getSpace(address) {
        // start from 0-255 or 0x00 - 0xff this is 8bit
        // 0-255 is the boot room
        if (address >= 0x00 && address <= 0xff) {
            return this.rom;
        }
        return this.bytes;
    }
    /** Matching Address of GAMEBOY Memory Address*/
    getMatchMemory(address) {
        /** this is the ROM header Address information */
        if (this.bytes[address] > Constants_1.MATCH_MEMORY_ADDRESS.ROM_HEADER_START &&
            this.bytes[address] < Constants_1.MATCH_MEMORY_ADDRESS.ROM_HEADER_END) {
            return this.bytes;
        }
        throw new Error(`Invalid Address Memory ${address} -> ${String(address)}`);
    }
}
exports.default = MemoryManagementUnit;
//# sourceMappingURL=MemoryManagementUnit.js.map