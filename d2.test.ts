import { test, expect, describe, it } from "bun:test"
import { isSafe } from "./d2"

describe("isSafe", () => {
  it("all increasing", () => {
    expect(isSafe([1, 2, 3])).toBe(true)
  })

  it("all decreasing", () => {
    expect(isSafe([6, 5, 4])).toBe(true)
  })

  it("mixed", () => {
    expect(isSafe([3, 2, 5])).toBe(false)
  })

  it("one matches", () => {
    expect(isSafe([1, 3, 3])).toBe(false)
  })

  it("increase greater than 3", () => {
    expect(isSafe([1, 6, 7])).toBe(false)
  })

  it("decrease greater than 3", () => {
    expect(isSafe([6, 5, 1])).toBe(false)
  })
})
