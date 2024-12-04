import { readFileSync } from "fs"

const _input = readFileSync("d4.input.txt", "utf8")

console.log(d4(_input, 2))

function check(arr: string[]) {
  return arr.join("") === "XMAS"
}

export function d4(input: string, version: 1 | 2) {
  const lines = input.split("\n")
  const grid = lines.map((line) => line.split(""))
  let count = 0

  for (let i = 0; i < grid.length; i++) {
    const line = grid[i]
    for (let j = 0; j < line.length; j++) {
      const char = line[j]

      if (version === 2) {
        const result = checkCellXMAS(grid, i, j)
        console.log(grid[i][j], result)
        const dr = result.downRight.join("")
        const dl = result.downLeft.join("")
        if ((dr === "MAS" || dr === "SAM") && (dl === "MAS" || dl === "SAM")) {
          count++
        }
      }

      if (version === 1) {
        if (char === "X") {
          // start checking for xmas
          const result = checkCell(grid, i, j)

          if (check(result.right)) count++
          if (check(result.left)) count++
          if (check(result.up)) count++
          if (check(result.down)) count++
          if (check(result.downRight)) count++
          if (check(result.downLeft)) count++
          if (check(result.upRight)) count++
          if (check(result.upLeft)) count++
        }
      }
    }
  }

  return count
}

export function checkCell(grid: string[][], i: number, j: number) {
  const right = grid[i].slice(j, j + 4)
  const left = grid[i].slice(Math.max(0, j - 3), j + 1).reverse()
  const up = grid
    .slice(Math.max(0, i - 3), i + 1)
    .map((line) => line[j])
    .reverse()

  const down = grid.slice(i, i + 4).map((line) => line[j])

  const size = [0, 1, 2, 3]
  const downRight = size.map((n) => grid[i + n]?.[j + n])
  const downLeft = size.map((n) => grid[i + n]?.[j - n])

  const upRight = size.map((n) => grid[i - n]?.[j + n])

  const upLeft = size.map((n) => grid[i - n]?.[j - n])

  return { right, left, up, down, downRight, downLeft, upRight, upLeft }
}

export function checkCellXMAS(
  grid: string[][],
  startI: number,
  startJ: number
) {
  const indexes = [0, 1, 2]
  const downRight = indexes.map((n) => grid[startI + n]?.[startJ + n])
  const downLeft = indexes.map((n) => grid[startI + 2 - n]?.[startJ + n])

  return { downRight, downLeft }
}
