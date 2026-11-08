import type { RegisterOptions } from 'react-hook-form'
import type { FormField } from '../types/form'
import { isFileAccepted } from './isFileAccepted'
import { parseFileSize } from './parseFileSize'

// Turns the rules sent by the server into rules react-hook-form understands.
export function getRules(field: FormField): RegisterOptions {
    const rules: RegisterOptions = {}
    const validation = field.validation

    if (validation?.required) {
        rules.required = 'این فیلد اجباری است'
    }
    if (validation?.minLength) {
        rules.minLength = {
            value: validation.minLength,
            message: `حداقل ${validation.minLength} کاراکتر وارد کنید`,
        }
    }
    if (validation?.maxLength) {
        rules.maxLength = {
            value: validation.maxLength,
            message: `حداکثر ${validation.maxLength} کاراکتر مجاز است`,
        }
    }

    if (field.type === 'input') {
        const { min, max } = field.props
        if (min !== undefined) {
            rules.min = { value: Number(min), message: `حداقل مقدار ${min} است` }
        }
        if (max !== undefined) {
            rules.max = { value: Number(max), message: `حداکثر مقدار ${max} است` }
        }
    }

    if (field.type === 'file') {
        const { accept, maxSize } = field.props
        const maxBytes = parseFileSize(maxSize)

        rules.validate = (files: FileList | null) => {
            for (const file of Array.from(files ?? [])) {
                if (!isFileAccepted(file, accept)) {
                    return `فرمت فایل ${file.name} مجاز نیست`
                }
                if (maxBytes !== undefined && file.size > maxBytes) {
                    return `حجم فایل ${file.name} بیشتر از ${maxSize} است`
                }
            }
            return true
        }
    }

    return rules
}