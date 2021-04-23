"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../constant/Constants");
class Registers {
    constructor() {
        this.isIME = false;
        this.registers = Constants_1.REGISTERS;
        this.isIME = true;
    }
    getPC() {
        return this.registers[Constants_1.REGISTERS.pc];
    }
    reset() {
        this.registers = Constants_1.REGISTERS;
    }
}
exports.default = Registers;
//# sourceMappingURL=Registers.js.map