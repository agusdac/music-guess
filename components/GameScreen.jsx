import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { SpotifyContext } from '../context/SpotifyContext'
import { ACTION_TYPES } from '../context/SpotifyActions'

const GameScreen = () => {

    const { state, dispatch } = useContext(SpotifyContext)

    const logout = () => {
        dispatch({ type: ACTION_TYPES.LOGOUT })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}
                onPress={logout}>
                <Text>Log out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderRadius: 16
    },
});
