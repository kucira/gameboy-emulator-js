import * as PIXI from 'pixi.js'

import CPU from './Cpu'
import MemoryManagementUnit from './MemoryManagementUnit'
import { SCREEN } from '../constant/Constants'
export default class GPU {
  cpu: CPU
  mmu: MemoryManagementUnit
  pixi: PIXI.Application
  WIDTH = SCREEN.width
  HEIGHT = SCREEN.height
  ticks: number
  constructor(cpu: CPU, mmu: MemoryManagementUnit) {
    this.cpu = cpu
    this.mmu = mmu
    this.pixi = new PIXI.Application({ width: this.WIDTH, height: this.HEIGHT })
    this.ticks = 0

    document.body.appendChild(this.pixi.view)
  }

  hBlankPhase(line: any, ticksInline: any) {}
  oamSearch(line: any) {}
  pixelTransfer(
    line: any,
    videoRam: any,
    lcdc: any,
    scrollX: any,
    scrollY: any,
  ) {}
  vBlankPhase(line: any, ticksInline: any) {}

  render() {}

  tick() {
    return this.ticks
  }
}
