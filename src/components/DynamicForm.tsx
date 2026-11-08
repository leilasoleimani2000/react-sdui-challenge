import type { FormField } from '../types/form'

interface Props {
  fields: FormField[]
}

function DynamicForm({ fields }: Props) {
  return (
    <form>
      {fields.map((field) => (
        <div key={field.name} style={field.style}>
          <label htmlFor={field.name}>{field.label}</label>

          {field.type === 'input' && (
            <input
              id={field.name}
              name={field.name}
              type={field.props.type}
              placeholder={field.props.placeholder}
              min={field.props.min}
              max={field.props.max}
            />
          )}

          {field.type === 'textarea' && (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.props.placeholder}
              rows={field.props.rows}
              cols={field.props.cols}
            />
          )}

          {field.type === 'select' && (
            <select id={field.name} name={field.name}>
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
              name={field.name}
              type="file"
              accept={field.props.accept}
              multiple={field.props.multiple}
            />
          )}
        </div>
      ))}

      <button type="submit">ارسال</button>
    </form>
  )
}

export default DynamicForm