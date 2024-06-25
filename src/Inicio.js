import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native'

const RealTimeClock = () => {
    const navigation = useNavigation();

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#2B32B2', '#1488CC']}
                style={styles.background}
            >
                <Text style={{ color: "#fff", marginBottom: 10, }}>Bienvenido!</Text>
                <Text style={styles.timeText}>
                    {time.toLocaleTimeString()}
                </Text>
                <TouchableOpacity style={styles.Buttom} onPress={() => { navigation.navigate('Marcador') }}>
                    <Entypo name="fingerprint" size={24} color="black" />
                    <Text>Marcar</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

export default function Inicio() {
    return (
        <RealTimeClock />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    timeText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: "#f3f3f3",
    },
    Buttom: {
        backgroundColor: "#58D68D",
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 28,
        paddingVertical: 13,
        marginTop: 25,
        borderRadius: 5,
    }
});