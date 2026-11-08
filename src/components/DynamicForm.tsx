import { useForm, type FieldValues } from 'react-hook-form'
import type { FormField } from '../types/form'
import { getRules } from '../utils/getRules'

interface Props {
    fields: FormField[]
}

function DynamicForm({ fields }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (values: FieldValues) => {
        console.log(values)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

            <button type="submit">ارسال</button>
        </form>
    )
}

export default DynamicForm