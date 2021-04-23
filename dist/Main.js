"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryManagementUnit_1 = __importDefault(require("./module/MemoryManagementUnit"));
const Rom_1 = __importDefault(require("./module/Rom"));
const Cpu_1 = __importDefault(require("./module/Cpu"));
const Constants_1 = require("./constant/Constants");
/** Test Boot */
const testBoot = () => {
    const rom = new Rom_1.default(Constants_1.BIOS_GB, 0);
    const mmu = new MemoryManagementUnit_1.default(rom);
    const cpu = new Cpu_1.default(mmu);
    cpu.runCommand();
    console.log('test boot ------ run');
};
testBoot();
//# sourceMappingURL=Main.js.map