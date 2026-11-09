import type { FieldValues, UseFormRegister } from 'react-hook-form'
import type { FileField } from '../../types/form'
import { getRules } from '../../utils/getRules'

interface Props {
    field: FileField
    register: UseFormRegister<FieldValues>
}

function FileControl({ field, register }: Props) {
    return (
        <input
            id={field.name}
            type="file"
            accept={field.props.accept}
            multiple={field.props.multiple}
            style={field.style}
            {...register(field.name, getRules(field))}
        />
    )
}

export default FileControl
