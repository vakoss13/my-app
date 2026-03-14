import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../src/styles/theme';

// Этот экран больше не используется - навигация идет напрямую через Drawer меню
export default function MajorScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ten ekran nie jest już używany.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
    text: { fontSize: 16, color: theme.colors.textSecondary }
});
