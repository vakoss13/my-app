
export const theme = {
    colors: {
        background: '#F3F4F6',
        card: '#ffffff',
        text: '#111827',
        textSecondary: '#4B5563',
        textMuted: '#9CA3AF',
        primary: '#6366f1',
        secondary: '#EEF2FF',
        accent: '#111827',
        white: '#ffffff',
        border: '#E5E7EB',
        dot: '#6366f1',
        shadow: '#000000',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32
    },
    radius: {
        sm: 8,
        md: 12,
        lg: 20,
        xl: 35,
        full: 9999
    }
} as const
export const themes = {
    light: theme
}