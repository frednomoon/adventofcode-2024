import { describe, expect, it } from "bun:test"
import { checkRule, checkUpdates, reorder } from "./d5"

describe("checkRule", () => {
  it("should be true", () => {
    const rule = ["47", "53"]
    const update = ["47", "53"]
    expect(checkRule(rule, update)).toBe(true)
  })
  it("should be false", () => {
    const rule = ["47", "53"]
    const update = ["53", "47"]
    expect(checkRule(rule, update)).toBe(false)
  })
  it("should be true if number missing", () => {
    const rule = ["47", "53"]
    const update = ["53", "43"]
    expect(checkRule(rule, update)).toBe(true)
  })
})

describe("test cases", () => {
  const rules = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`

  const updates = `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

  it("should sum correctly", () => {
    const sum = checkUpdates(rules, updates)

    expect(sum.passingSum).toBe(143)
    expect(sum.failedSum).toBe(123)
  })

  //   75,97,47,61,53 becomes 97,75,47,61,53.
  //   61,13,29 becomes 61,29,13.
  //   97,13,75,29,47 becomes 97,75,47,29,13.

  it("should reorder correctly", () => {
    const parsedRules = rules
      .split("\n")
      .filter((r) => r !== "")
      .map((r) => r.split("|"))

    const reordered = reorder(parsedRules)(["75", "97", "47", "61", "53"])
    expect(reordered).toEqual(["97", "75", "47", "61", "53"])

    const reordered2 = reorder(parsedRules)(["61", "13", "29"])
    expect(reordered2).toEqual(["61", "29", "13"])

    const reordered3 = reorder(parsedRules)(["97", "13", "75", "29", "47"])
    expect(reordered3).toEqual(["97", "75", "47", "29", "13"])
  })
})
