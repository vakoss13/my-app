export const YEARS = Array.from({ length: 2025 - 2010 + 1 }, (_, i) => 2025 - i)

export const SESSIONS = [
    { id: 'Winter', label: 'Zimowa' },
    { id: 'Summer', label: 'Letnia' }
] as const

export const STUDY_YEARS = [
    { id: 1, label: 'I' },
    { id: 2, label: 'II' },
    { id: 3, label: 'III' }
] as const
