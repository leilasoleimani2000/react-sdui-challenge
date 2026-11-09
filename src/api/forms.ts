import type { FormSchema } from '../types/form'

export type SubmitResult = { success: boolean; errors: Record<string, string> }

export async function getForm(): Promise<FormSchema> {
  const response = await fetch('/api/forms/car')
  if (!response.ok) throw new Error('Failed to load the form')
  return response.json()
}

export async function submitForm(data: FormData): Promise<SubmitResult> {
  const response = await fetch('/api/forms/car', { method: 'POST', body: data })
  if (!response.ok) throw new Error('Failed to submit the form')
  return response.json()
}
