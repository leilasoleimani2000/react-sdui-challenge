import type { FieldValues, UseFormRegister } from 'react-hook-form'
import type { TextareaField } from '../../types/form'
import { getRules } from '../../utils/getRules'

interface Props {
    field: TextareaField
    register: UseFormRegister<FieldValues>
}

function TextareaControl({ field, register }: Props) {
    return (
        <textarea
            id={field.name}
            placeholder={field.props.placeholder}
            rows={field.props.rows}
            cols={field.props.cols}
            style={field.style}
            {...register(field.name, getRules(field))}
        />
    )
}

export default TextareaControl
