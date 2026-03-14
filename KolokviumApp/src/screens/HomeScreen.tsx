import React, { useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Platform, StatusBar, StyleSheet } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
// Импортируем объект theme напрямую из твоего файла
import { theme } from '../styles/theme'
import { useColloquium } from '../hooks/useColloquium'

export const HomeScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const { data, isLoading, error } = useColloquium(selectedDate)

    const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
        if (Platform.OS === 'android') setShowPicker(false)
        if (date) setSelectedDate(date)
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.brandName}>Colloquium</Text>
                    <View style={styles.dot} />
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShowPicker(true)}
                    style={styles.dateSelector}
                >
                    <View>
                        <Text style={styles.dateValue}>
                            {selectedDate.toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long'
                            })}
                        </Text>
                        <Text style={styles.yearValue}>{selectedDate.getFullYear()}</Text>
                    </View>
                    <View style={styles.calendarIconBox}>
                        <Text style={{ fontSize: 20 }}>📅</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {showPicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={onDateChange}
                    accentColor={theme.colors.primary}
                />
            )}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {isLoading ? (
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={styles.loadingText}>Загружаем данные...</Text>
                    </View>
                ) : data ? (
                    <View style={styles.mainCard}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: data.image_url }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Live</Text>
                            </View>
                        </View>

                        <View style={styles.cardBody}>
                            <Text style={styles.cardCategory}>ЕЖЕДНЕВНЫЙ ВЫПУСК</Text>
                            <Text style={styles.cardTitle}>{data.title}</Text>
                            <View style={styles.divider} />
                            <Text style={styles.cardDescription}>
                                Мы нашли для тебя уникальные материалы на этот день.
                                Самое время погрузиться в учебу!
                            </Text>

                            <TouchableOpacity style={styles.readButton}>
                                <Text style={styles.readButtonText}>Открыть материал</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyCircle}>
                            <Text style={{ fontSize: 40 }}>🌑</Text>
                        </View>
                        <Text style={styles.emptyTitle}>На этот день пусто</Text>
                        <Text style={styles.emptySub}>Попробуй выбрать другую дату</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

// Используем обычный StyleSheet.create
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    header: {
        backgroundColor: theme.colors.white,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 25,
        paddingHorizontal: 25,
        borderBottomLeftRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 12,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    brandName: {
        fontSize: 12,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: theme.colors.textSecondary,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: theme.colors.dot,
        marginLeft: 4,
    },
    dateSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateValue: {
        fontSize: 32,
        fontWeight: '800',
        color: theme.colors.text,
    },
    yearValue: {
        fontSize: 16,
        color: theme.colors.textMuted,
        fontWeight: '600',
    },
    calendarIconBox: {
        width: 54,
        height: 54,
        backgroundColor: theme.colors.secondary,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    mainCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 40,
        overflow: 'hidden',
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.12,
        shadowRadius: 25,
        elevation: 10,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 420,
    },
    badge: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(255,255,255,0.95)',
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '800',
        color: theme.colors.primary,
        textTransform: 'uppercase',
    },
    cardBody: {
        padding: 25,
    },
    cardCategory: {
        fontSize: 10,
        fontWeight: '800',
        color: theme.colors.primary,
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: theme.colors.text,
        lineHeight: 34,
    },
    divider: {
        width: 45,
        height: 5,
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
        marginVertical: 18,
    },
    cardDescription: {
        fontSize: 15,
        color: theme.colors.textSecondary,
        lineHeight: 24,
        marginBottom: 25,
    },
    readButton: {
        backgroundColor: theme.colors.accent,
        paddingVertical: 18,
        borderRadius: 22,
        alignItems: 'center',
    },
    readButtonText: {
        color: theme.colors.white,
        fontWeight: '700',
        fontSize: 16,
    },
    center: {
        marginTop: 100,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 15,
        color: theme.colors.textMuted,
        fontWeight: '500',
    },
    emptyState: {
        marginTop: 80,
        alignItems: 'center',
    },
    emptyCircle: {
        width: 110,
        height: 110,
        backgroundColor: theme.colors.border,
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: theme.colors.textSecondary,
    },
    emptySub: {
        fontSize: 15,
        color: theme.colors.textMuted,
        marginTop: 8,
    },
})