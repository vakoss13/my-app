import { StyleSheet } from 'react-native-unistyles'
import { themes } from './theme'
import { BREAKPOINTS } from '../../utils'




StyleSheet.configure({
    settings: {
        initialTheme: 'light',
    },
    breakpoints: BREAKPOINTS,
    themes
})


type AppThemes = typeof themes
type AppBreakpoints = typeof BREAKPOINTS


declare module 'react-native-unistyles' {
    export interface UnistylesThemes extends AppThemes { }
    export interface UnistylesBreakpoints extends AppBreakpoints { }
}