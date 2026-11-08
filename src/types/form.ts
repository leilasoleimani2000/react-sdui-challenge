/** Rules a field can have. All optional: the server only sends what applies. */
export interface Validation {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  /** Bytes, not "5MB", so the client doesn't need to parse it. */
  maxFileSize?: number
}

interface BaseField {
  name: string
  label: string
  validation?: Validation
}

export interface InputField extends BaseField {
  type: 'input'
  props: { type: 'text' | 'number'; placeholder?: string }
}

export interface TextareaField extends BaseField {
  type: 'textarea'
  props: { placeholder?: string }
}

export interface SelectField extends BaseField {
  type: 'select'
  props: { options: { label: string; value: string }[] }
}

export interface FileField extends BaseField {
  type: 'file'
  props: { accept?: string; multiple?: boolean }
}

export type FormField = InputField | TextareaField | SelectField | FileField

export interface FormSchema {
  fields: FormField[]
}