import { toFormData } from './toFormData'

// FileList has no public constructor, so build one with its prototype.
function fileListOf(...files: File[]): FileList {
  return Object.setPrototypeOf({ ...files, length: files.length }, FileList.prototype)
}

const png = new File(['x'], 'photo.png', { type: 'image/png' })
const pdf = new File(['x'], 'doc.pdf', { type: 'application/pdf' })

describe('toFormData', () => {
  it('adds text values under their field name', () => {
    const data = toFormData({ brand: 'BMW' })

    expect(data.get('brand')).toBe('BMW')
  })

  it('converts numbers to strings', () => {
    const data = toFormData({ year: 2024 })

    expect(data.get('year')).toBe('2024')
  })

  it('uses an empty string for null and undefined', () => {
    const data = toFormData({ brand: null, color: undefined })

    expect(data.get('brand')).toBe('')
    expect(data.get('color')).toBe('')
  })

  it('sends every file under the same name', () => {
    const data = toFormData({ photos: fileListOf(png, pdf) })
    const files = data.getAll('photos') as File[]

    expect(files.map((file) => file.name)).toEqual(['photo.png', 'doc.pdf'])
  })

  it('adds nothing for an empty file field', () => {
    const data = toFormData({ photos: fileListOf() })

    expect(data.has('photos')).toBe(false)
  })
})
