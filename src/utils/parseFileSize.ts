const UNITS: Record<string, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
}

// Converts a size like "5MB" to bytes, because file.size is in bytes.
// Returns undefined when the text can't be understood, which means "no limit".
export function parseFileSize(size: string | undefined): number | undefined {
  const match = /^\s*(\d+(?:\.\d+)?)\s*([a-z]+)?\s*$/i.exec(size ?? '')
  if (!match) return undefined

  const unit = UNITS[(match[2] ?? 'B').toUpperCase()]
  if (unit === undefined) return undefined

  return Math.round(Number(match[1]) * unit)
}