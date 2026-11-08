import { isFileAccepted } from './isFileAccepted'

const png = new File(['x'], 'photo.PNG', { type: 'image/png' })
const pdf = new File(['x'], 'doc.pdf', { type: 'application/pdf' })

describe('isFileAccepted', () => {
  it('accepts any file when accept is empty', () => {
    expect(isFileAccepted(pdf, undefined)).toBe(true)
  })

  it('accepts all images with image/*', () => {
    expect(isFileAccepted(png, 'image/*')).toBe(true)
    expect(isFileAccepted(pdf, 'image/*')).toBe(false)
  })

  it('accepts file extensions and exact types', () => {
    expect(isFileAccepted(png, '.jpg, .png')).toBe(true)
    expect(isFileAccepted(pdf, 'application/pdf')).toBe(true)
    expect(isFileAccepted(pdf, '.jpg,.png')).toBe(false)
  })
})