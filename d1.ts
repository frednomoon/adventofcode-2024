import { readFileSync } from "fs"

const input = readFileSync("d1.input.txt", "utf8")

const lines = input
  .split("\n")
  .filter((c) => c !== "")
  .map((line) => line.split("   "))

const list1 = lines.map((line) => parseInt(line[0]))
const list2 = lines.map((line) => parseInt(line[1]))

const sortedList1 = list1.sort((a, b) => a - b)
const sortedList2 = list2.sort((a, b) => a - b)

const answer = sortedList1
  .map((num, index) => Math.abs(num - sortedList2[index]))
  .reduce((acc, curr) => acc + curr, 0)

console.log(answer)
