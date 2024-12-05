import { readFileSync } from "fs"

const _input = readFileSync("./d5/input.txt", "utf8")

const [_rules, _updates] = _input.split("\n\n")

export function checkUpdates(rules: string, updates: string) {
  const rulesArr = rules
    .split("\n")
    .filter((r) => r !== "")
    .map((r) => r.split("|"))

  const updatesArr = updates
    .split("\n")
    .filter((r) => r !== "")
    .map((r) => r.split(","))

  const passingUpdates = updatesArr.filter((update) => {
    return rulesArr.every((rule) => checkRule(rule, update))
  })

  const passingSum = passingUpdates.reduce((acc, update) => {
    const middleCell = update[Math.floor(update.length / 2)]
    return acc + parseInt(middleCell)
  }, 0)

  const reorderer = reorder(rulesArr)
  const failedUpdates = updatesArr
    .filter((update) => {
      return rulesArr.some((rule) => !checkRule(rule, update))
    })
    .map(reorderer)

  const failedSum = failedUpdates.reduce((acc, update) => {
    const middleCell = update[Math.floor(update.length / 2)]
    return acc + parseInt(middleCell)
  }, 0)

  return {
    passingSum,
    failedSum,
  }
}

export function checkRule(rule: string[], update: string[]) {
  const [left, right] = rule

  const leftIndex = update.indexOf(left)
  const rightIndex = update.indexOf(right)

  if (leftIndex === -1 || rightIndex === -1) {
    return true
  }

  return leftIndex < rightIndex
}

export const reorder =
  (rules: string[][]) =>
  (update: string[]): string[] => {
    rules.forEach((rule) => {
      const [left, right] = rule
      const leftIndex = update.indexOf(left)
      const rightIndex = update.indexOf(right)

      if (leftIndex === -1 || rightIndex === -1) {
        return
      }

      if (leftIndex > rightIndex) {
        // swap left and right
        update[leftIndex] = right
        update[rightIndex] = left
      }
    })

    if (!rules.every((rule) => checkRule(rule, update))) {
      return reorder(rules)(update)
    }

    return update
  }

console.log(checkUpdates(_rules, _updates).failedSum)
