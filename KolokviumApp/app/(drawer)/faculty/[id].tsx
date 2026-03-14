import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { universityData } from '../../../src/constants/universityData';
import { theme } from '../../../src/styles/theme';

export default function DirectionScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const direction = universityData.find(d => d.id === id);

    if (!direction) return <View><Text>Kierunek nie znaleziony</Text></View>;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.icon}>{direction.icon}</Text>
                <Text style={styles.title}>{direction.name}</Text>
                <Text style={styles.subtitle}>Wybierz przedmiot:</Text>
            </View>

            <View style={styles.grid}>
                {direction.subjects.map((subject) => (
                    <TouchableOpacity
                        key={subject.id}
                        style={styles.card}
                        onPress={() => router.push({
                            pathname: '/subject/[id]',
                            params: { id: subject.id }
                        })}
                    >
                        <View style={styles.iconBox}>
                            <Text style={styles.subjectIcon}>{subject.icon}</Text>
                        </View>
                        <Text style={styles.cardTitle}>{subject.name}</Text>
                        <View style={styles.arrowContainer}>
                            <Text style={styles.arrow}>→</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    content: { padding: 20 },
    header: { marginBottom: 30, alignItems: 'center' },
    icon: { fontSize: 50, marginBottom: 10 },
    title: { fontSize: 22, fontWeight: '800', textAlign: 'center', color: theme.colors.text },
    subtitle: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 10 },
    grid: { marginTop: 10 },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        padding: 16,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    iconBox: { width: 44, height: 44, backgroundColor: theme.colors.secondary, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
    subjectIcon: { fontSize: 22 },
    cardTitle: { fontSize: 15, fontWeight: '700', color: theme.colors.text, flex: 1 },
    arrowContainer: { width: 28, height: 28, backgroundColor: theme.colors.secondary, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    arrow: { color: theme.colors.primary, fontWeight: '800' }
});
