import MemoryManagementUnit from './module/MemoryManagementUnit'
import Rom from './module/Rom'
import CPU from './module/Cpu'

import { BIOS_GB } from './constant/Constants'
import GPU from './module/Gpu'

/** Test Boot */
const testBoot = () => {
  const rom = new Rom(BIOS_GB, 0)
  const mmu = new MemoryManagementUnit(rom)
  const cpu = new CPU(mmu)
  const gpu = new GPU(cpu, mmu)

  while (cpu.registers.getPC() !== 0x100) {
    cpu.tick()
  }
  // const interval = setInterval(() => {
  //   cpu.runCommand()
  // }, 1000)
}

console.log('test boot ------ run')
testBoot()
