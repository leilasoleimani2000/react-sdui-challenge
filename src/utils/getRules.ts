import type { RegisterOptions } from 'react-hook-form'
import type { FormField } from '../types/form'

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

    return rules
}