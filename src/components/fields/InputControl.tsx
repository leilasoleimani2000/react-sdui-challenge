import type { FieldValues, UseFormRegister } from 'react-hook-form'
import type { InputField } from '../../types/form'
import { getRules } from '../../utils/getRules'

interface Props {
    field: InputField
    register: UseFormRegister<FieldValues>
}

function InputControl({ field, register }: Props) {
    return (
        <input
            id={field.name}
            type={field.props.type}
            placeholder={field.props.placeholder}
            min={field.props.min}
            max={field.props.max}
            // `size` picks a text size from index.css, `color` is the text colour.
            data-size={field.props.size}
            style={{ ...field.style, color: field.props.color }}
            {...register(field.name, getRules(field))}
        />
    )
}

export default InputControl
