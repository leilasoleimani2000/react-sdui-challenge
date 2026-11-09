import { useEffect, useState } from 'react'
import { useForm, type FieldValues } from 'react-hook-form'
import type { FormField } from '../types/form'
import type { SubmitResult } from '../api/forms'
import { toFormData } from '../utils/toFormData'
import FileControl from './fields/FileControl'
import InputControl from './fields/InputControl'
import SelectControl from './fields/SelectControl'
import TextareaControl from './fields/TextareaControl'

const SUCCESS_MESSAGE_MS = 5000

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
    // Shown when sending fails completely (for example there is no network).
    const [submitError, setSubmitError] = useState('')

    useEffect(() => {
        if (!succeeded) return
        const timer = setTimeout(() => setSucceeded(false), SUCCESS_MESSAGE_MS)
        return () => clearTimeout(timer)
    }, [succeeded])

    const submit = async (values: FieldValues) => {
        setSucceeded(false)
        setSubmitError('')

        let result: SubmitResult
        try {
            result = await onSubmit(toFormData(values))
        } catch {
            setSubmitError('ارسال فرم با خطا مواجه شد. دوباره تلاش کنید')
            return
        }

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
        <form className="form" onSubmit={handleSubmit(submit)} noValidate>
            {fields.map((field) => (
                <div key={field.name} className="field">
                    <label htmlFor={field.name}>{field.label}</label>

                    {field.type === 'input' && <InputControl field={field} register={register} />}
                    {field.type === 'textarea' && (
                        <TextareaControl field={field} register={register} />
                    )}
                    {field.type === 'select' && <SelectControl field={field} register={register} />}
                    {field.type === 'file' && <FileControl field={field} register={register} />}

                    {errors[field.name] && (
                        <p role="alert">{String(errors[field.name]?.message)}</p>
                    )}
                </div>
            ))}

            {submitError && (
                <p role="alert" className="form-error">
                    {submitError}
                </p>
            )}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'در حال ارسال…' : 'ارسال'}
            </button>

            {succeeded && (
                <p role="status" className="toast">
                    فرم با موفقیت ارسال شد
                </p>
            )}
        </form>
    )
}

export default DynamicForm
