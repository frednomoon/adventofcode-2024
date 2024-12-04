import { readFileSync } from "fs"

const _input = readFileSync("d3.input.txt", "utf8")

console.log(decode(_input))
// example pattern: mul(131,421)

export function decode(input: string) {
  const regex = /mul\((\d{1,3}),\s*(\d{1,3})\)/

  const dontString = `don't()`
  const doString = `do()`

  let decoded = ""

  for (let i = 0; i < input.length; ) {
    if (input.slice(i, i + doString.length) === doString) {
      decoded += doString
      i += doString.length
      continue
    }

    if (input.slice(i, i + dontString.length) === dontString) {
      decoded += dontString
      i += dontString.length
      continue
    }

    const first12 = input.slice(i, i + 12)
    const match = first12.match(regex)

    if (match) {
      console.log(match)
      decoded += match[0]
      i += match[0].length
      continue
    }

    i++
  }

  const parsed = decoded
    .split(")")
    .filter((x) => x !== "")
    .map((n) => n.replace("mul(", "").split(","))

  //   console.log(parsed)
  let enabled = true
  const result = parsed.reduce((acc, curr) => {
    if (curr.includes("do(")) {
      enabled = true
      return acc
    }

    if (curr.includes("don't(")) {
      enabled = false
      return acc
    }

    const [a, b] = curr.map(Number)

    return acc + (enabled ? a * b : 0)
  }, 0)

  return result
}
