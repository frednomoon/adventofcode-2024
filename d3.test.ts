import { test, expect, describe, it } from "bun:test"
import { decode } from "./d3"

const input =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"

describe("d3", () => {
  it("should decode", () => {
    expect(decode(input)).toBe(161)
  })
})
