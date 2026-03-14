import '../../../src/styles/unistyles'
import React, { useState, useCallback, useMemo } from 'react'
import {
    View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity,
    StatusBar, Modal, TextInput, Alert, KeyboardAvoidingView, Platform
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useLocalSearchParams } from 'expo-router'
import { useColloquiumsByFilter, useAddColloquium } from '../../../src/hooks/useColloquium'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { YEARS, SESSIONS, STUDY_YEARS } from '../../../src/constants/utils'






const SubjectScreen = () => {
    const { id: subject } = useLocalSearchParams<{ id: string }>()
    const { theme } = useUnistyles()
    
    const [selectedYear, setSelectedYear] = useState(2025)
    const [selectedSession, setSelectedSession] = useState<'Winter' | 'Summer'>('Winter')
    const [selectedStudyYear, setSelectedStudyYear] = useState(1)

    // Fullscreen image viewer
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

    // Add modal state
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newImageUri, setNewImageUri] = useState<string | null>(null)

    const { data, isLoading } = useColloquiumsByFilter(subject!, selectedYear, selectedSession, selectedStudyYear)
    const { mutateAsync: addColloquium, isPending: isSaving } = useAddColloquium()

    const modalSubtitleText = useMemo(() => 
        `${selectedYear} • ${selectedStudyYear} rok • ${selectedSession === 'Winter' ? 'Zima' : 'Lato'}`
    , [selectedYear, selectedStudyYear, selectedSession])

    const pickImage = useCallback(async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('Brak uprawnień', 'Zezwól na dostęp do galerii w ustawieniach.')
            return
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.8,
        })
        if (!result.canceled && result.assets[0]) {
            setNewImageUri(result.assets[0].uri)
        }
    }, [])

    const handleSave = useCallback(async () => {
        if (!newTitle.trim()) {
            Alert.alert('Błąd', 'Wpisz tytuł kolokwium.')
            return
        }
        try {
            await addColloquium({
                subject_id: subject!,
                year: selectedYear,
                session: selectedSession,
                study_year: selectedStudyYear,
                title: newTitle.trim(),
                description: newDescription.trim() || undefined,
                imageUri: newImageUri || undefined,
            })
            
            // Сбрасываем форму
            setNewTitle('')
            setNewDescription('')
            setNewImageUri(null)
            setAddModalVisible(false)
            Alert.alert('Sukces! ✅', 'Kolokwium zostało dodane.')
        } catch (e: any) {
            Alert.alert('Błąd', e.message || 'Nie udało się zapisać.')
        }
    }, [newTitle, newDescription, newImageUri, subject, selectedYear, selectedSession, selectedStudyYear, addColloquium])

    const handleOpenAddModal = useCallback(() => setAddModalVisible(true), [])
    const handleCloseAddModal = useCallback(() => {
        setAddModalVisible(false)
        setNewTitle('')
        setNewDescription('')
        setNewImageUri(null)
    }, [])

    const handleCloseFullscreen = useCallback(() => setFullscreenImage(null), [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {/* Filtry */}
                <View style={styles.filterSection}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Rok:</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                            {YEARS.map(year => (
                                <TouchableOpacity
                                    key={year}
                                    style={[styles.chip, selectedYear === year && styles.activeChip]}
                                    onPress={() => setSelectedYear(year)}
                                >
                                    <Text style={[styles.chipText, selectedYear === year && styles.activeChipText]}>{year}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Kurs:</Text>
                        <View style={styles.studyYearContainer}>
                            {STUDY_YEARS.map(year => (
                                <TouchableOpacity
                                    key={year.id}
                                    style={[styles.studyYearTab, selectedStudyYear === year.id && styles.activeStudyYearTab]}
                                    onPress={() => setSelectedStudyYear(year.id)}
                                >
                                    <Text style={[styles.studyYearTabText, selectedStudyYear === year.id && styles.activeStudyYearTabText]}>
                                        {year.label} rok
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Sesja:</Text>
                        <View style={styles.sessionContainer}>
                            {SESSIONS.map(session => (
                                <TouchableOpacity
                                    key={session.id}
                                    style={[styles.sessionTab, selectedSession === session.id && styles.activeSessionTab]}
                                    onPress={() => setSelectedSession(session.id as any)}
                                >
                                    <Text style={[styles.sessionTabText, selectedSession === session.id && styles.activeSessionTabText]}>
                                        {session.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Карточки */}
                <View style={styles.cardsContainer}>
                    {isLoading ? (
                        <View style={styles.center}>
                            <ActivityIndicator size="large" color={theme.colors.primary} />
                            <Text style={styles.loadingText}>Ładowanie danych...</Text>
                        </View>
                    ) : data && data.length > 0 ? (
                        data.map((item: any) => (
                            <View key={item.id} style={styles.mainCard}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                </View>
                                {item.image_url ? (
                                    <TouchableOpacity onPress={() => setFullscreenImage(item.image_url)} activeOpacity={0.9}>
                                        <Image
                                            source={{ uri: item.image_url }}
                                            style={styles.image}
                                            resizeMode="cover"
                                        />
                                        <View style={styles.expandHint}>
                                            <Text style={styles.expandHintText}>🔍 Dotknij, aby powiększyć</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : null}
                                {item.description ? (
                                    <View style={styles.descriptionBox}>
                                        <Text style={styles.descriptionText}>{item.description}</Text>
                                    </View>
                                ) : null}
                            </View>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <View style={styles.emptyCircle}>
                                <Text style={{ fontSize: 40 }}>📚</Text>
                            </View>
                            <Text style={styles.emptyTitle}>Brak materiałów</Text>
                            <Text style={styles.emptySub}>Spróbuj zmienić filtry lub dodaj nowe kolokwium</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* FAB кнопка "+" */}
            <TouchableOpacity style={styles.fab} onPress={handleOpenAddModal}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* === FULLSCREEN IMAGE MODAL === */}
            <Modal visible={!!fullscreenImage} transparent animationType="fade">
                <View style={styles.fullscreenOverlay}>
                    {fullscreenImage && (
                        <Image source={{ uri: fullscreenImage }} style={styles.fullscreenImage} resizeMode="contain" />
                    )}
                    <TouchableOpacity style={styles.closeBtn} onPress={handleCloseFullscreen}>
                        <Ionicons name="close" size={30} color="#000" />
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* === ADD COLLOQUIUM MODAL === */}
            <Modal 
                visible={addModalVisible} 
                animationType="slide" 
                transparent 
                statusBarTranslucent 
                onRequestClose={handleCloseAddModal}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    activeOpacity={1} 
                    onPress={handleCloseAddModal}
                >
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
                        style={styles.keyboardView}
                    >
                        <TouchableOpacity 
                            activeOpacity={1} 
                            style={styles.modalSheet}
                            onPress={(e) => e.stopPropagation()}
                        >
                            <View style={styles.modalHandle} />
                            <ScrollView 
                                showsVerticalScrollIndicator={false} 
                                contentContainerStyle={styles.modalScrollContent}
                                keyboardShouldPersistTaps="handled"
                            >
                                <Text style={styles.modalTitle}>Dodaj kolokwium</Text>
                                <Text style={styles.modalSubtitle}>
                                    {modalSubtitleText}
                                </Text>

                                <Text style={styles.fieldLabel}>Tytuł *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="np. Kolokwium z genetyki"
                                    placeholderTextColor={theme.colors.textMuted}
                                    value={newTitle}
                                    onChangeText={setNewTitle}
                                />

                                <Text style={styles.fieldLabel}>Treść / Notatki</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Wklej tekst z kolokwium..."
                                    placeholderTextColor={theme.colors.textMuted}
                                    value={newDescription}
                                    onChangeText={setNewDescription}
                                    multiline
                                    numberOfLines={5}
                                />

                                <Text style={styles.fieldLabel}>Zdjęcie</Text>
                                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                                    {newImageUri ? (
                                        <Image source={{ uri: newImageUri }} style={styles.previewImage} resizeMode="cover" />
                                    ) : (
                                        <Text style={styles.imagePickerText}>📷 Wybierz zdjęcie z galerii</Text>
                                    )}
                                </TouchableOpacity>

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={styles.cancelBtn}
                                        onPress={handleCloseAddModal}
                                    >
                                        <Text style={styles.cancelBtnText}>Anuluj</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={isSaving}>
                                        {isSaving
                                            ? <ActivityIndicator color="#fff" />
                                            : <Text style={styles.saveBtnText}>Zapisz</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create((theme, rt) => ({
    container: { flex: 1, backgroundColor: theme.colors.background },
    filterSection: {
        backgroundColor: theme.colors.white,
        padding: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    label: { fontSize: 13, fontWeight: '700', color: theme.colors.textSecondary, width: 60 },
    chipScroll: { flexGrow: 0 },
    chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: theme.colors.secondary, marginRight: 8 },
    activeChip: { backgroundColor: theme.colors.primary },
    chipText: { fontSize: 12, color: theme.colors.textSecondary, fontWeight: '600' },
    activeChipText: { color: theme.colors.white },
    studyYearContainer: { flexDirection: 'row', flex: 1, backgroundColor: theme.colors.secondary, borderRadius: 12, padding: 3 },
    studyYearTab: { flex: 1, paddingVertical: 6, alignItems: 'center', borderRadius: 10 },
    activeStudyYearTab: { backgroundColor: theme.colors.white, elevation: 2 },
    studyYearTabText: { fontSize: 11, fontWeight: '600', color: theme.colors.textSecondary },
    activeStudyYearTabText: { color: theme.colors.primary, fontWeight: '700' },
    sessionContainer: { flexDirection: 'row', flex: 1, backgroundColor: theme.colors.secondary, borderRadius: 12, padding: 3 },
    sessionTab: { flex: 1, paddingVertical: 6, alignItems: 'center', borderRadius: 10 },
    activeSessionTab: { backgroundColor: theme.colors.white, elevation: 2 },
    sessionTabText: { fontSize: 11, fontWeight: '600', color: theme.colors.textSecondary },
    activeSessionTabText: { color: theme.colors.primary, fontWeight: '700' },
    cardsContainer: { padding: 20, paddingBottom: 100 },
    mainCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 6,
    },
    cardHeader: { backgroundColor: theme.colors.white, paddingHorizontal: 18, paddingVertical: 14 },
    cardTitle: { fontSize: 17, fontWeight: '800', color: theme.colors.text },
    image: { width: '100%', height: 200 },
    expandHint: { position: 'absolute', bottom: 8, right: 10, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
    expandHintText: { color: '#fff', fontSize: 10 },
    descriptionBox: { backgroundColor: theme.colors.secondary, padding: 18 },
    descriptionText: { fontSize: 14, color: theme.colors.textSecondary, lineHeight: 22 },
    center: { marginTop: 50, alignItems: 'center' },
    loadingText: { marginTop: 15, color: theme.colors.textMuted },
    emptyState: { marginTop: 80, alignItems: 'center' },
    emptyCircle: { width: 70, height: 70, backgroundColor: theme.colors.secondary, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    emptyTitle: { fontSize: 16, fontWeight: '800', color: theme.colors.textSecondary },
    emptySub: { fontSize: 13, color: theme.colors.textMuted, marginTop: 5, textAlign: 'center', paddingHorizontal: 20 },

    // FAB
    fab: {
        position: 'absolute', bottom: rt.insets.bottom + 30, right: 25,
        width: 60, height: 60, borderRadius: 30,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center', alignItems: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4, shadowRadius: 15, elevation: 10,
    },
    fabText: { color: '#fff', fontSize: 32, lineHeight: 36, fontWeight: '300' },

    // Fullscreen
    fullscreenOverlay: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    closeBtn: {
        position: 'absolute',
        top: 60,
        right: 25,
        zIndex: 999,
        backgroundColor: '#FFFFFF',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 10,
    },
    fullscreenImage: { width: '100%', height: '100%' },

    // Add Modal
    modalOverlay: { 
        flex: 1, 
        justifyContent: 'flex-end', 
        backgroundColor: 'rgba(0,0,0,0.5)' 
    },
    keyboardView: {
        width: '100%',
    },
    modalSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
        maxHeight: rt.screen.height * 0.85,
        width: '100%',
    },
    modalScrollContent: {
        padding: 24, 
        paddingBottom: rt.insets.bottom + 40,
    },
    modalHandle: { width: 40, height: 4, backgroundColor: '#ddd', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 22, fontWeight: '800', color: theme.colors.text },
    modalSubtitle: { fontSize: 13, color: theme.colors.textMuted, marginBottom: 20, marginTop: 4 },
    fieldLabel: { fontSize: 12, fontWeight: '700', color: theme.colors.textSecondary, marginBottom: 6, marginTop: 12, textTransform: 'uppercase' },
    input: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 12, padding: 14,
        fontSize: 15, color: theme.colors.text,
    },
    textArea: { height: 110, textAlignVertical: 'top' },
    imagePicker: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 12, height: 100,
        justifyContent: 'center', alignItems: 'center',
        overflow: 'hidden',
    },
    imagePickerText: { color: theme.colors.textSecondary, fontSize: 15 },
    previewImage: { width: '100%', height: '100%' },
    modalButtons: { flexDirection: 'row', gap: 12, marginTop: 24 },
    cancelBtn: { flex: 1, paddingVertical: 15, borderRadius: 14, backgroundColor: theme.colors.secondary, alignItems: 'center' },
    cancelBtnText: { color: theme.colors.textSecondary, fontWeight: '700', fontSize: 15 },
    saveBtn: { flex: 2, paddingVertical: 15, borderRadius: 14, backgroundColor: theme.colors.primary, alignItems: 'center' },
    saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
}));

export default SubjectScreen
