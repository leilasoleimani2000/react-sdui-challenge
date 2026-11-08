import { carFormSchema } from '../mocks/carFormSchema'
import type { FormSchema } from '../types/form'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getForm(): Promise<FormSchema> {
  await wait(300)
  return carFormSchema
}

export async function submitForm(
    data: FormData,
): Promise<{ success: boolean; errors: Record<string, string> }> {
  await wait(500)

  // A brand of "error" simulates a server error.
  if (data.get('brand') === 'error') {
    return { success: false, errors: { brand: 'این برند مجاز نیست' } }
  }

  return { success: true, errors: {} }
}
