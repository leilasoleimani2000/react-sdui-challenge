// Turns the form values into FormData, because FormData can carry files and JSON cannot.
export function toFormData(values: Record<string, unknown>): FormData {
    const data = new FormData()
    // A file field can hold several files; each one is added under the same field name.
    for (const [name, value] of Object.entries(values)) {
        if (value instanceof FileList) {
            for (const file of Array.from(value)) {
                data.append(name, file)
            }
        } else {
            // FormData holds only text or files, so numbers and empty values are sent as text.
            data.append(name, String(value ?? ''))
        }
    }
    return data
}