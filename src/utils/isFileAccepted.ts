// Checks a file against an "accept" text such as "image/*" or ".pdf,.png".
// No accept text means every file is allowed.
export function isFileAccepted(file: File, accept: string | undefined): boolean {
  if (!accept) return true

  return accept.split(',').some((rule) => {
    const pattern = rule.trim().toLowerCase()

    if (pattern.endsWith('/*')) return file.type.startsWith(pattern.slice(0, -1))
    if (pattern.startsWith('.')) return file.name.toLowerCase().endsWith(pattern)
    return file.type === pattern
  })
}