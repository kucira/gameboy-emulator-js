// import * as PIXI from 'pixi.js'

import CPU from './Cpu'
import MemoryManagementUnit from './MemoryManagementUnit'
import { SCREEN, GPU_MODE_FLAG } from '../constant/Constants'
export default class GPU {
  cpu: CPU
  mmu: MemoryManagementUnit
  canvas: any
  WIDTH = SCREEN.width
  HEIGHT = SCREEN.height
  ticks: number
  line: number
  tileMap: any
  mode: any
  screenData: any
  constructor(cpu: CPU, mmu: MemoryManagementUnit) {
    this.cpu = cpu
    this.mmu = mmu
    this.ticks = 0
    this.tileMap = {
      HEIGHT: 32,
      WIDTH: 32,
      START_0: 0x9800,
      START_1: 0x9c00,
      LENGTH: 0x0400, // 1024 bytes = 32*32
    }
    this.mode = GPU_MODE_FLAG.OAM
    this.line = 0
    this.screenData = {
      data: new Uint8ClampedArray(this.WIDTH * this.HEIGHT * 4), // this the data of the screen, 160 * 144 pixel and have the 4 byte RGBA value
      width: this.WIDTH,
      height: this.HEIGHT,
    }
    this.initImageData()
  }

  // gpu timing
  tick() {
    switch (this.mode) {
      case GPU_MODE_FLAG.HBLANK:
        // todo gpu tick for HBlank
        if (this.ticks >= 204) {
          this.ticks -= 204
          this.line++
          if (this.line === 143) {
            this.mode = GPU_MODE_FLAG.VBLANK
            this.canvas.putImageData(this.screenData.data, 0, 0)
          } else {
            this.mode = GPU_MODE_FLAG.OAM
          }
        }
        break
      case GPU_MODE_FLAG.VBLANK:
        // todo vblank
        if (this.ticks >= 456) {
        }
        break
      case GPU_MODE_FLAG.OAM:
        // todo oam
        if (this.ticks >= 80) {
          this.ticks -= 80
          this.mode = GPU_MODE_FLAG.LCDC
        }
        break
      case GPU_MODE_FLAG.LCDC:
        // todo lcdc
        if (this.ticks >= 172) {
          // Enter hblank
          this.ticks = 0
          this.mode = GPU_MODE_FLAG.HBLANK

          // Write a scanline to the framebuffer
          this.renderScan()
        }
        break

      default:
        break
    }
  }

  render(buffer: any): void {}
  renderScan(): void {}

  initImageData(): void {
    // this image data
    // https://developer.mozilla.org/en-US/docs/Web/API/ImageData
    const c: any = document.getElementById('screen')
    this.canvas = c.getContext('2d')

    // Iterate through every pixel
    for (let i = 0; i < this.screenData.data.length; i += 4) {
      this.screenData.data[i + 0] = 0 // R value
      this.screenData.data[i + 1] = 0 // G value
      this.screenData.data[i + 2] = 0 // B value
      this.screenData.data[i + 3] = 255 // A value
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#pixel_manipulation
    // use this because we are doing the pixel manipulation on the screen based on the memory address value
    if (this.canvas) {
      this.canvas.createImageData(this.WIDTH, this.HEIGHT)
      this.canvas.getImageData(0, 0, this.WIDTH, this.HEIGHT)

      // Initialize a new ImageData object
      let imageData = new ImageData(
        this.screenData.data,
        this.screenData.width,
        this.screenData.height,
      )

      this.canvas.putImageData(imageData, 0, 0)
    } else {
      throw new Error('canvas not supported')
    }
  }
}
