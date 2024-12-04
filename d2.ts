import { readFileSync } from "fs"

const input = readFileSync("d2.input.txt", "utf8")

const lines = input
  .split("\n")
  .filter((l) => l !== "")
  .map((l) => l.split(" ").map((n) => parseInt(n)))

let counter = 0

for (const line of lines) {
  if (isSafe(line)) {
    counter++
    continue
  }
  for (let i = 0; i < line.length; i++) {
    const perm = line.slice(0, i).concat(line.slice(i + 1))
    if (isSafe(perm)) {
      counter++
      break
    }
  }
}

console.log(counter)

export function isSafe(l: number[]) {
  const first = l[0]
  const increasing = first < l[1]

  for (let i = 1; i < l.length; i++) {
    const num = l[i]
    const prev = l[i - 1]
    if (num === prev) return false
    if (increasing && num < prev) return false
    if (!increasing && num > prev) return false
    if (Math.abs(num - prev) > 3) return false
  }
  return true
}
