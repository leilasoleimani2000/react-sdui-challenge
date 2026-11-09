import { useState } from 'react'
import { useForm, type FieldValues } from 'react-hook-form'
import type { FormField } from '../types/form'
import { getRules } from '../utils/getRules'
import type { SubmitResult } from '../api/forms'
import { toFormData } from '../utils/toFormData'

interface Props {
    fields: FormField[]
    onSubmit: (data: FormData) => Promise<SubmitResult>
}

function DynamicForm({ fields, onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()
    const [succeeded, setSucceeded] = useState(false)

    const submit = async (values: FieldValues) => {
        setSucceeded(false)

        const result = await onSubmit(toFormData(values))

        if (result.success) {
            reset()
            setSucceeded(true)
            return
        }

        for (const [name, message] of Object.entries(result.errors)) {
            setError(name, { message })
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} noValidate>
            {fields.map((field) => (
                <div key={field.name} style={field.style}>
                    <label htmlFor={field.name}>{field.label}</label>

                    {field.type === 'input' && (
                        <input
                            id={field.name}
                            type={field.props.type}
                            placeholder={field.props.placeholder}
                            min={field.props.min}
                            max={field.props.max}
                            {...register(field.name, getRules(field))}
                        />
                    )}

                    {field.type === 'textarea' && (
                        <textarea
                            id={field.name}
                            placeholder={field.props.placeholder}
                            rows={field.props.rows}
                            cols={field.props.cols}
                            {...register(field.name, getRules(field))}
                        />
                    )}

                    {field.type === 'select' && (
                        <select id={field.name} {...register(field.name, getRules(field))}>
                            <option value="">انتخاب کنید</option>
                            {field.props.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}

                    {field.type === 'file' && (
                        <input
                            id={field.name}
                            type="file"
                            accept={field.props.accept}
                            multiple={field.props.multiple}
                            {...register(field.name, getRules(field))}
                        />
                    )}

                    {errors[field.name] && (
                        <p role="alert">{String(errors[field.name]?.message)}</p>
                    )}
                </div>
            ))}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'در حال ارسال…' : 'ارسال'}
            </button>

            {succeeded && <p role="status">فرم با موفقیت ارسال شد</p>}
        </form>
    )
}

export default DynamicForm
