### This is repository about creating gameboy emulator with javascript.
This purpose for learning about creating emulator
and learning about how does the hardware work ex: cpu, memory, graphic
etc.

This is a big project because i was never create an emulator and only have experience in game development.
Hope this project will finish and will gain a knowledge about emulator and hardware.

To understand emulate gameboy first need to do is understand the hardware
https://www.chibiakumas.com/z80/Gameboy.php

To emulate the order should be
    1. Memory Management Unit
    2. Cpu
    3. Video
    4. Sound Unit

### MEMORY Management Unit
  - Gameboy using 8bit CPU
  - Called Z80
  - hold 8 bits of data at time
  - Can be access in pair ex : Memory instance from A, F, B, C, H and L registers
    able to access with the combination AF, BC, HL.
    PC and SP only 

### Memory need to emulate
- Work RAM
- Video RAM 
- Cartridge ROM 
- External RAM

