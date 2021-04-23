"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../constant/Constants");
const Registers_1 = __importDefault(require("./Registers"));
class CPU {
    constructor(mmu) {
        this.isPause = false;
        this.startAddress = Constants_1.COMPLETE_MEMORY_ADDR;
        this.mmu = mmu;
        this.isPause = false;
        this.startAddress = Constants_1.COMPLETE_MEMORY_ADDR;
        this.register = new Registers_1.default();
    }
    /** handle interrupt CPU */
    handleInterrupt() {
        return false;
    }
    /** cpu next instruction defined in Program Counter (PC)
     * The PC, or Program Counter, registerpoints to the
     * next instruction to be executed in theGame Boy memory
     */
    nextInstruction() {
        let pc = this.register.getPC(); //get pc
        // next instruction in PC
        // read the byte
        // get the opcode
        let opcode = this.mmu.readByte(pc++);
        console.log(`opcode ${opcode}`);
    }
    reset() {
        this.register.reset();
    }
    /** run command of CPU */
    runCommand() {
        this.handleInterrupt();
        this.nextInstruction();
        return 0;
    }
}
exports.default = CPU;
//# sourceMappingURL=Cpu.js.map