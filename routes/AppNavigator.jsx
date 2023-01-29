import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameScreen from '../components/GameScreen';
import SpotifyLogin from '../components/SpotifyLogin';
import { SpotifyContext } from '../context/SpotifyContext';

const Stack = createNativeStackNavigator();

const LoggedInNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
    )
}

const LoggedOutNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={SpotifyLogin} />
        </Stack.Navigator>
    )
}

const AppNavigator = () => {
    const { state } = useContext(SpotifyContext)

    return (
        <NavigationContainer>
            {state.token ? <LoggedInNavigator /> : <LoggedOutNavigator />}
        </NavigationContainer>
    )
}

export default AppNavigator