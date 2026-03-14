import React, { useState } from 'react';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from '../../src/styles/theme';
import { universityData, Direction } from '../../src/constants/universityData';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';

const AccordionItem = ({ direction }: { direction: Direction }) => {
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();

    return (
        <View>
            <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => setExpanded(!expanded)}
                activeOpacity={0.7}
            >
                <View style={styles.drawerItemLeft}>
                    <Text style={styles.drawerItemIcon}>{direction.icon}</Text>
                    <Text style={styles.drawerItemText}>{direction.name}</Text>
                </View>
                <Text style={styles.arrowIcon}>{expanded ? '▼' : '▶'}</Text>
            </TouchableOpacity>

            {expanded && (
                <View style={styles.submenu}>
                    {direction.subjects.map(subject => (
                        <TouchableOpacity
                            key={subject.id}
                            style={styles.subItem}
                            onPress={() => {
                                router.push(`/subject/${subject.id}`);
                            }}
                        >
                            <Text style={styles.subItemIcon}>{subject.icon}</Text>
                            <Text style={styles.subItemText}>{subject.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

function CustomDrawerContent(props: any) {
    const router = useRouter();

    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: theme.colors.card }}>
            <View style={styles.drawerHeader}>
                <Text style={styles.drawerTitle}>UMCS Colloquium</Text>
            </View>

            <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/(drawer)')}>
                <View style={styles.drawerItemLeft}>
                    <Text style={styles.drawerItemIcon}>🏠</Text>
                    <Text style={styles.drawerItemText}>Strona główna</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            {universityData.map((direction) => (
                <AccordionItem key={direction.id} direction={direction} />
            ))}
        </DrawerContentScrollView>
    );
}

export default function DrawerLayout() {
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
                    options={{
                        title: 'Kierunki',
                    }}
                />
                <Drawer.Screen
                    name="subject/[id]"
                    options={{
                        title: 'Materiały'
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
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
    submenu: {
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
        backgroundColor: theme.colors.shadow || '#eaeaea',
        marginVertical: 10,
        marginHorizontal: 20,
    }
});
