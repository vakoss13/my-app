import '../../src/styles/unistyles'
import React, { useState, useCallback } from 'react';
import Animated, { 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming, 
    interpolate,
    Extrapolation
} from 'react-native-reanimated';

import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { universityData, Direction } from '../../utils';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

const AccordionItem = ({ direction }: { direction: Direction }) => {
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();
    const [contentHeight, setContentHeight] = useState(0);
    
    // Shared value for animation (0 = closed, 1 = open)
    const animation = useSharedValue(0);

    const toggleExpanded = useCallback(() => {
        const toValue = expanded ? 0 : 1;
        animation.value = withTiming(toValue, { duration: 300 });
        setExpanded(!expanded);
    }, [expanded]);

    const handleSubjectPress = useCallback((subjectId: string) => {
        router.push(`/(drawer)/subject/${subjectId}`);
    }, [router]);

    // Animated styles
    const bodyStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                animation.value,
                [0, 1],
                [0, contentHeight],
                Extrapolation.CLAMP
            ),
            opacity: interpolate(
                animation.value,
                [0, 1],
                [0, 1],
                Extrapolation.CLAMP
            ),
        };
    });

    const arrowStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: `${interpolate(animation.value, [0, 1], [0, 90])}deg`
            }]
        };
    });

    return (
        <View style={styles.accordionContainer}>
            <TouchableOpacity
                style={styles.drawerItem}
                onPress={toggleExpanded}
                activeOpacity={0.7}
            >
                <View style={styles.drawerItemLeft}>
                    <Text style={styles.drawerItemIcon}>{direction.icon}</Text>
                    <Text style={styles.drawerItemText}>{direction.name}</Text>
                </View>
                <Animated.View style={arrowStyle}>
                    <Text style={styles.arrowIcon}>▶</Text>
                </Animated.View>
            </TouchableOpacity>

            <Animated.View style={[styles.submenuContainer, bodyStyle]}>
                <View 
                    style={styles.submenuContent}
                    onLayout={(e) => {
                        const height = e.nativeEvent.layout.height;
                        if (height > 0 && height !== contentHeight) {
                            setContentHeight(height);
                        }
                    }}
                >
                    {direction.subjects.map(subject => (
                        <TouchableOpacity
                            key={subject.id}
                            style={styles.subItem}
                            onPress={() => handleSubjectPress(subject.id)}
                        >
                            <Text style={styles.subItemIcon}>{subject.icon}</Text>
                            <Text style={styles.subItemText}>{subject.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Animated.View>
        </View>
    );
};


function CustomDrawerContent(props: any) {
    const router = useRouter();
    const handleNavigation = useCallback((path: string) => {
        router.push(path as any);
    }, [router]);

    return (
        <DrawerContentScrollView {...props} style={styles.drawerScroll}>
            <View style={styles.drawerHeader}>
                <Text style={styles.drawerTitle}>UMCS Colloquium</Text>
            </View>

            <TouchableOpacity style={styles.drawerItem} onPress={() => handleNavigation('/(drawer)')}>
                <View style={styles.drawerItemLeft}>
                    <Text style={styles.drawerItemIcon}>📅</Text>
                    <Text style={styles.drawerItemText}>Aktualności</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem} onPress={() => handleNavigation('/(drawer)/kierunki')}>
                <View style={styles.drawerItemLeft}>
                    <Text style={styles.drawerItemIcon}>🏛️</Text>
                    <Text style={styles.drawerItemText}>Kierunki</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <Text style={styles.sectionHeader}>WYDZIAŁY</Text>

            {universityData.map((direction) => (
                <AccordionItem key={direction.id} direction={direction} />
            ))}
        </DrawerContentScrollView>
    );
}

export default function DrawerLayout() {
    const { theme } = useUnistyles()

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerShown: true,
                    headerStyle: { backgroundColor: theme.colors.background },
                    headerTintColor: theme.colors.text,
                    drawerStyle: { width: 320 },
                }}
            >
                <Drawer.Screen 
                    name="index" 
                    options={{ title: 'Aktualności' }} 
                />
                <Drawer.Screen 
                    name="kierunki" 
                    options={{ title: 'Kierunki' }} 
                />
                <Drawer.Screen 
                    name="subject/[id]" 
                    options={{ title: 'Materiały' }} 
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create((theme) => ({
    drawerScroll: { backgroundColor: theme.colors.card },
    drawerHeader: {
        padding: 20,
        marginBottom: 10,
    },
    drawerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: theme.colors.text,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 20,
    },
    drawerItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    drawerItemIcon: {
        fontSize: 20,
        marginRight: 15,
        width: 25,
        textAlign: 'center',
    },
    drawerItemText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text,
        flexShrink: 1,
    },
    arrowIcon: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    sectionHeader: {
        fontSize: 10,
        fontWeight: '800',
        color: theme.colors.textMuted,
        paddingHorizontal: 20,
        paddingVertical: 10,
        letterSpacing: 1.5,
    },
    submenuContainer: {
        overflow: 'hidden',
    },
    submenuContent: {
        position: 'absolute',
        width: '100%',
        backgroundColor: theme.colors.background,
        paddingVertical: 5,
    },
    subItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 60,
        paddingRight: 20,
    },
    subItemIcon: {
        fontSize: 16,
        marginRight: 12,
    },
    subItemText: {
        fontSize: 13,
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    accordionContainer: {
        overflow: 'hidden',
    }
}));

