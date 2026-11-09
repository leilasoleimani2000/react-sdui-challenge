import type { FileField, InputField } from '../types/form'
import { getRules } from './getRules'

const textInput: InputField = {
  type: 'input',
  name: 'brand',
  label: 'Brand',
  props: { type: 'text' },
}

const fileInput: FileField = {
  type: 'file',
  name: 'photos',
  label: 'Photos',
  props: { accept: 'image/*', maxSize: '1KB' },
}

// The file rule is a function that gets the chosen files and returns true or an error text.
const checkFiles = getRules(fileInput).validate as (files: File[]) => string | true

const smallPng = new File(['x'], 'photo.png', { type: 'image/png' })
const pdf = new File(['x'], 'doc.pdf', { type: 'application/pdf' })
const bigPng = new File([new Uint8Array(2048)], 'big.png', { type: 'image/png' })

describe('getRules', () => {
  it('returns no rules when the field has no validation', () => {
    expect(getRules(textInput)).toEqual({})
  })

  it('adds the required rule', () => {
    const rules = getRules({ ...textInput, validation: { required: true } })

    expect(rules.required).toBe('این فیلد اجباری است')
  })

  it('adds the length rules', () => {
    const rules = getRules({ ...textInput, validation: { minLength: 2, maxLength: 10 } })

    expect(rules.minLength).toMatchObject({ value: 2 })
    expect(rules.maxLength).toMatchObject({ value: 10 })
  })

  it('adds the min and max rules as numbers', () => {
    const rules = getRules({ ...textInput, props: { type: 'number', min: '1900', max: '2024' } })

    expect(rules.min).toMatchObject({ value: 1900 })
    expect(rules.max).toMatchObject({ value: 2024 })
  })

  it('accepts a file with an allowed type and size', () => {
    expect(checkFiles([smallPng])).toBe(true)
  })

  it('rejects a file with a wrong type', () => {
    expect(checkFiles([pdf])).toContain('doc.pdf')
  })

  it('rejects a file that is too big', () => {
    expect(checkFiles([bigPng])).toContain('big.png')
  })
})
