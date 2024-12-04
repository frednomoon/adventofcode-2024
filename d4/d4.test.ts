import { describe, expect, it } from "bun:test"
import { checkCell, checkCellXMAS, d4 } from "./d4"

const input = `....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX`

const input2 = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`

describe("checkCellX-MAS", () => {
  const grid = `12345
67891
23456
78912
34567`
  it("should check cell", () => {
    const result = checkCellXMAS(
      grid.split("\n").map((line) => line.split("")),
      1,
      1
    )

    expect(result.downRight).toEqual(["7", "4", "1"])
    expect(result.downLeft).toEqual(["8", "4", "9"])
  })
})

describe("checkCellXMAS", () => {
  const grid = `12345
67891
23456
78912
34567`

  it("should check cell", () => {
    const result = checkCell(
      grid.split("\n").map((line) => line.split("")),
      1,
      1
    )

    expect(result.right).toEqual(["7", "8", "9", "1"])
    expect(result.left).toEqual(["7", "6"])
    expect(result.up).toEqual(["7", "2"])
    expect(result.down).toEqual(["7", "3", "8", "4"])

    expect(result.downRight).toEqual(["7", "4", "1", "7"])
    expect(result.downLeft).toEqual(["7", "2"])
    expect(result.upRight).toEqual(["7", "3"])
    expect(result.upLeft).toEqual(["7", "1", undefined, undefined])
  })
})

describe("d4", () => {
  it("should decode", () => {
    expect(d4(input, 1)).toBe(18)
  })
})

describe("d4-2", () => {
  it("should decode", () => {
    expect(d4(input2, 2)).toBe(9)
  })
})
