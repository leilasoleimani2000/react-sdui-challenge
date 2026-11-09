import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { SubmitResult } from '../api/forms'
import type { FormField } from '../types/form'
import DynamicForm from './DynamicForm'

const fields: FormField[] = [
  {
    type: 'input',
    name: 'brand',
    label: 'Brand',
    props: { type: 'text', color: '#ff0000', size: 'large' },
    validation: { required: true },
  },
  {
    type: 'select',
    name: 'fuel',
    label: 'Fuel',
    props: { options: [{ label: 'Gas', value: 'gas' }] },
  },
  { type: 'textarea', name: 'notes', label: 'Notes', props: {} },
  { type: 'file', name: 'photos', label: 'Photos', props: {} },
]

// Fake versions of what the server could answer.
const succeed = async (): Promise<SubmitResult> => ({ success: true, errors: {} })
const rejectBrand = async (): Promise<SubmitResult> => ({
  success: false,
  errors: { brand: 'Not allowed' },
})
const crash = async (): Promise<SubmitResult> => {
  throw new Error('network down')
}

const sendButton = () => screen.getByRole('button', { name: 'ارسال' })

describe('DynamicForm', () => {
  it('shows a control for each field type', () => {
    render(<DynamicForm fields={fields} onSubmit={succeed} />)

    expect(screen.getByLabelText('Brand')).toBeInstanceOf(HTMLInputElement)
    expect(screen.getByLabelText('Fuel')).toBeInstanceOf(HTMLSelectElement)
    expect(screen.getByLabelText('Notes')).toBeInstanceOf(HTMLTextAreaElement)
    expect(screen.getByLabelText('Photos')).toHaveAttribute('type', 'file')
  })

  it('applies the color and size of an input', () => {
    render(<DynamicForm fields={fields} onSubmit={succeed} />)

    const brand = screen.getByLabelText('Brand')
    expect(brand).toHaveStyle({ color: '#ff0000' })
    expect(brand).toHaveAttribute('data-size', 'large')
  })

  it('does not send the form when a required field is empty', async () => {
    const onSubmit = vi.fn(succeed)
    render(<DynamicForm fields={fields} onSubmit={onSubmit} />)

    await userEvent.click(sendButton())

    expect(await screen.findByText('این فیلد اجباری است')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('sends the form, shows a success message and clears the fields', async () => {
    const onSubmit = vi.fn<(data: FormData) => Promise<SubmitResult>>(succeed)
    render(<DynamicForm fields={fields} onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText('Brand'), 'BMW')
    await userEvent.click(sendButton())

    expect(await screen.findByRole('status')).toBeInTheDocument()
    expect(onSubmit.mock.calls[0][0].get('brand')).toBe('BMW')
    expect(screen.getByLabelText('Brand')).toHaveValue('')
  })

  it('shows an error from the server under its field', async () => {
    render(<DynamicForm fields={fields} onSubmit={rejectBrand} />)

    await userEvent.type(screen.getByLabelText('Brand'), 'BMW')
    await userEvent.click(sendButton())

    expect(await screen.findByText('Not allowed')).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows a general error when sending fails', async () => {
    render(<DynamicForm fields={fields} onSubmit={crash} />)

    await userEvent.type(screen.getByLabelText('Brand'), 'BMW')
    await userEvent.click(sendButton())

    expect(await screen.findByText(/ارسال فرم با خطا مواجه شد/)).toBeInTheDocument()
    // What the user typed stays, so they can try again.
    expect(screen.getByLabelText('Brand')).toHaveValue('BMW')
  })
})
