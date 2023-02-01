import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SpotifyContext } from '../context/SpotifyContext'
import { ACTION_TYPES } from '../context/SpotifyActions'
import { Ionicons } from '@expo/vector-icons'
import { spotifyApi } from '../services/SpotifyService'
import Player from './Player/Player'

const GameScreen = ({ navigation, route }) => {

    const [currentTrack, setCurrentTrack] = useState(null)
    const [tracks, setTracks] = useState(null)
    const [trackName, setTrackName] = useState('')
    const [trackArtist, setTrackArtist] = useState('')
    const [trackAlbum, setTrackAlbum] = useState('')
    const [hiddenArtist, setHiddenArtist] = useState(true)
    const [hiddenTrack, setHiddenTrack] = useState(true)
    const [hiddenAlbum, setHiddenAlbum] = useState(true)

    const { state, dispatch } = useContext(SpotifyContext)

    const logout = () => {
        dispatch({ type: ACTION_TYPES.LOGOUT })
    }

    useEffect(() => {
        spotifyApi.getPlaylistTracks(route.params.id).then(res => {
            setTracks(res.items)
            setCurrentTrack(res.items[0].track)
        })
    }, [])

    const guessName = () => {
        if (trackName === currentTrack.name) {
            setHiddenTrack(false)
        } else {
            console.log('wrong name');
        }
    }

    const guessArtist = () => {
        if (currentTrack.artists.find(a => a.name === trackArtist)) {
            setHiddenArtist(false)
        } else {
            console.log('wrong name');
        }
    }

    const guessAlbum = () => {
        if (trackAlbum === currentTrack.album.name) {
            setHiddenAlbum(false)
        } else {
            console.log('wrong name');
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.playerWrapper}>
                <Player track={currentTrack} hiddenAlbum={hiddenAlbum}
                    hiddenArtist={hiddenArtist} hiddenTrack={hiddenTrack} />
                <View style={styles.inputView}>
                    <Text>Name: </Text>
                    <TextInput style={styles.input} value={trackName} onChangeText={text => setTrackName(text)} />
                    <TouchableOpacity onPress={guessName}>
                        <Ionicons name="md-send" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputView}>
                    <Text>Artist: </Text>
                    <TextInput style={styles.input} value={trackArtist} onChangeText={text => setTrackArtist(text)} />
                    <TouchableOpacity onPress={guessArtist}>
                        <Ionicons name="md-send" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputView}>
                    <Text>Album: </Text>
                    <TextInput style={styles.input} value={trackAlbum} onChangeText={text => setTrackAlbum(text)} />
                    <TouchableOpacity onPress={guessAlbum}>
                        <Ionicons name="md-send" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomButtonsView}>
                <TouchableOpacity style={{ ...styles.button, marginRight: 40 }}
                    onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={logout}>
                    <Text>Log out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        borderRadius: 16,
    },
    bottomButtonsView: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20
    },
    input: {
        minWidth: 200,
        minHeight: 40,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
        borderRadius: 16
    }
});
