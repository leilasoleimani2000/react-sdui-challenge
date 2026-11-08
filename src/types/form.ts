// Same shape as the README sample, plus `validation` (the sample can't mark a field as required).
export interface Validation {
  required?: boolean
  minLength?: number
  maxLength?: number
}

interface BaseField {
  name: string
  label: string
  style?: Record<string, string>
  validation?: Validation
}

export interface InputField extends BaseField {
  type: 'input'
  props: {
    type: 'text' | 'number'
    placeholder?: string
    min?: string
    max?: string
    color?: string
    size?: string
  }
}

export interface TextareaField extends BaseField {
  type: 'textarea'
  props: { placeholder?: string; rows?: number; cols?: number }
}

export interface SelectField extends BaseField {
  type: 'select'
  props: { options: { label: string; value: string }[] }
}

export interface FileField extends BaseField {
  type: 'file'
  props: {
    accept?: string
    maxSize?: string
    multiple?: boolean
  }
}

export type FormField = InputField | TextareaField | SelectField | FileField

export interface FormSchema {
  fields: FormField[]
}
