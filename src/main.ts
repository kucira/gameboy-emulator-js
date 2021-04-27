import MemoryManagementUnit from './module/MemoryManagementUnit'
import Rom from './module/Rom'
import CPU from './module/Cpu'

import { BIOS_GB } from './constant/Constants'

/** Test Boot */
const testBoot = () => {
  const rom = new Rom(BIOS_GB, 0)
  const mmu = new MemoryManagementUnit(rom)
  const cpu = new CPU(mmu)
  let counter = 1
  // while (counter < mmu.bytes.length) {
  //   cpu.runCommand()
  //   counter++
  // }
  const interval = setInterval(() => {
    cpu.runCommand()
  }, 1000)
}

console.log('test boot ------ run')
testBoot()
