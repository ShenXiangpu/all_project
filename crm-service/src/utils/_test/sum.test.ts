// src/utils/sum.test.ts
import { describe, it, expect } from 'vitest'

function sum(a: number, b: number) {
  return a + b
}

describe('sum function', () => {
  it('should add two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3)
  })

  it('should handle negative numbers', () => {
    expect(sum(-1, -1)).toBe(-2)
  })
})