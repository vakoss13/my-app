import { StyleSheet } from 'react-native-unistyles'
import { themes } from './theme'

export const breakpoints = {
    xs: 0,
    sm: 380,
    md: 576,
    lg: 768,
    xl: 992
} as const



type AppThemes = typeof themes

type AppBreakpoints = typeof breakpoints

declare module 'react-native-unistyles' {
    export interface UnistylesThemes extends AppThemes { }
    export interface UnistylesBreakpoints extends AppBreakpoints { }
}

StyleSheet.configure({
    settings: {
        initialTheme: 'light',
    },
    breakpoints,
    themes

})