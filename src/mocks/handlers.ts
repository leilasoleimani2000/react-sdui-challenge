import { http, HttpResponse } from 'msw'
import { carFormSchema } from './carFormSchema'

export const handlers = [
  http.get('/api/forms/car', () => HttpResponse.json(carFormSchema)),

  http.post('/api/forms/car', async ({ request }) => {
    const data = await request.formData()

    // A brand of "error" simulates a server error.
    if (data.get('brand') === 'error') {
      return HttpResponse.json({ success: false, errors: { brand: 'این برند مجاز نیست' } })
    }
    return HttpResponse.json({ success: true, errors: {} })
  }),
]