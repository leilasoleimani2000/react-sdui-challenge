import { useEffect, useState } from 'react'
import { getForm } from './api/forms'
import type { FormSchema } from './types/form'
import DynamicForm from './components/DynamicForm'

function App() {
    const [form, setForm] = useState<FormSchema | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getForm()
            .then(setForm)
            .catch(() => setError('دریافت فرم با خطا مواجه شد'))
            .finally(() => setLoading(false))
    }, [])

    return (
        <main className="page">
            <h1>Dynamic Form Builder</h1>
            {loading && <p>در حال بارگذاری…</p>}
            {error && <p>{error}</p>}
            {form && <DynamicForm fields={form.fields} />}
        </main>
    )
}

export default App
