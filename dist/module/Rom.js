"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rom {
    constructor(space, offset) {
        this.space = space;
        this.offset = offset;
    }
    setByte(value, address) {
        console.warn(`Can't write ${value} to ROM ${address}`);
    }
    /** getByte of ROM address
     * Make sure the byte in the offset
     */
    getByte(address) {
        if (this.offset > address) {
            console.warn(`Address ${address} < Offset ${this.offset}`);
            return 0;
        }
        let position = address - this.offset;
        if (position >= this.space.length) {
            console.warn(`Address ${address} out of ROM space ${this.offset + this.space.length}`);
        }
        return this.space[position];
    }
    getRom() {
        return this;
    }
}
exports.default = Rom;
//# sourceMappingURL=Rom.js.map