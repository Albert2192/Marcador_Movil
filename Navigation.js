import React from "react";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "./src/Inicio";
import Marcador from "./src/Marcador";

/* AQUI CREAMOS ES STACK NAVIGATIOS */
const Stack = createNativeStackNavigator();

/* function MyNavigation() {
    return (
        <HomeNavigator.Navigator
            initialRouteName="Inicio"
        >
            <HomeNavigator.Screen
                name="Inicio"
                component={Inicio}
                options={{
                    headerShown: false
                }}
            />
            <HomeNavigator.Screen
                name="Marcador"
                component={Marcador}
                options={{
                    headerBackTitleVisible: false,
                    headerShown: false
                }}
            />
        </HomeNavigator.Navigator>
    );
} */

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicio">
                <Stack.Screen
                    name="Inicio"
                    component={Inicio}
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen
                    name="Marcador"
                    component={Marcador}
                    options={{
                        headerShown: false
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}