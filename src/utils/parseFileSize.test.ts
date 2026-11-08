import { parseFileSize } from './parseFileSize'

describe('parseFileSize', () => {
  it('turns MB into bytes', () => {
    expect(parseFileSize('5MB')).toBe(5 * 1024 * 1024)
  })

  it('works with other units and ignores case and spaces', () => {
    expect(parseFileSize('500KB')).toBe(500 * 1024)
    expect(parseFileSize(' 1 gb ')).toBe(1024 ** 3)
  })

  it('returns undefined for a bad value', () => {
    expect(parseFileSize(undefined)).toBeUndefined()
    expect(parseFileSize('abc')).toBeUndefined()
    expect(parseFileSize('5XB')).toBeUndefined()
  })
})