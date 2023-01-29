import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SpotifyContext } from '../context/SpotifyContext'
import { ACTION_TYPES } from '../context/SpotifyActions'
import { getUserPlaylists, spotifyApi } from '../services/SpotifyService'
import Player from './Player/Player'

const GameScreen = () => {

    const [currentTrack, setCurrentTrack] = useState(null)

    const { state, dispatch } = useContext(SpotifyContext)

    const logout = () => {
        dispatch({ type: ACTION_TYPES.LOGOUT })
    }

    useEffect(() => {
        // get this device's id and set it to the playback
        spotifyApi.getMyDevices().then(res => {
            console.log(res);
        })
        spotifyApi.getTrack('0Zh5U48tZNeAzzLTV1CVBE').then(res => {
            setCurrentTrack(res)
        })
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.playerWrapper}>
                <Player track={currentTrack} />
            </View>
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
        justifyContent: 'space-between',
        padding: 20
    },
    playerWrapper: {
        flex: 1,
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
