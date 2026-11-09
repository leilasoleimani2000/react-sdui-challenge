export function toFormData(values: Record<string, unknown>): FormData {
    const data = new FormData()
    for (const [name, value] of Object.entries(values)) {
        if (value instanceof FileList) {
            for (const file of Array.from(value)) {
                data.append(name, file)
            }
        } else {
            data.append(name, String(value ?? ''))
        }
    }
    return data
}