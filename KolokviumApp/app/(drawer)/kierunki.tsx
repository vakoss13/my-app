import '../../src/styles/unistyles'
import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { universityData } from '../../src/constants/universityData';
import { useNavigation } from 'expo-router';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles'

export default function Dashboard() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    const handleOpenDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Cześć! 👋</Text>
                    <Text style={styles.subtext}>Wybierz kierunek в menu bocznym</Text>
                </View>

                <View style={styles.grid}>
                    {universityData.map((direction) => (
                        <TouchableOpacity
                            key={direction.id}
                            style={styles.card}
                            onPress={handleOpenDrawer}
                        >
                            <View style={styles.iconContainer}>
                                <Text style={styles.icon}>{direction.icon}</Text>
                            </View>
                            <Text style={styles.cardTitle}>{direction.name}</Text>
                            <Text style={styles.cardSub}>{direction.subjects.length} przedmiotów</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        paddingHorizontal: 24,
    },
    header: {
        marginBottom: 30,
        marginTop: 10,
    },
    greeting: {
        fontSize: 32,
        fontWeight: '800',
        color: theme.colors.text,
    },
    subtext: {
        fontSize: 16,
        color: theme.colors.textSecondary,
        marginTop: 5,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '47%',
        backgroundColor: theme.colors.card,
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 6,
    },
    iconContainer: {
        width: 50,
        height: 50,
        backgroundColor: theme.colors.secondary,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    icon: {
        fontSize: 24,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: theme.colors.text,
    },
    cardSub: {
        fontSize: 11,
        color: theme.colors.textMuted,
        marginTop: 4,
    },
}));
