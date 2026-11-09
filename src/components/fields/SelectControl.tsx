import type { FieldValues, UseFormRegister } from 'react-hook-form'
import type { SelectField } from '../../types/form'
import { getRules } from '../../utils/getRules'

interface Props {
    field: SelectField
    register: UseFormRegister<FieldValues>
}

function SelectControl({ field, register }: Props) {
    return (
        <select id={field.name} style={field.style} {...register(field.name, getRules(field))}>
            <option value="">انتخاب کنید</option>
            {field.props.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default SelectControl
