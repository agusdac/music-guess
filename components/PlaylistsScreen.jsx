import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { spotifyApi } from '../services/SpotifyService';
import * as Device from 'expo-device';
import SpotifyImage from './shared/SpotifyImage';

const PlaylistsScreen = ({ navigation }) => {

    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        // get this device's id and set it to the playback
        spotifyApi.getMyDevices().then(res => {
            const currentPhone = res.devices.find(d => d.name === Device.deviceName && d.type === 'Smartphone')
            console.log(res);
            if (currentPhone) {
                spotifyApi.transferMyPlayback([currentPhone.id]).then(res => {
                    console.log('set current player');
                })
            } else alert('Music guess not supported on this device')
        })

        spotifyApi.getUserPlaylists().then(res => {
            setPlaylists(res.items)
        })
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={playlists}
                style={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Game', { id: item.id })}>
                        <SpotifyImage style={styles.playlistCover} uri={item.images[0].url} />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.playlistName}>{item.name}</Text>
                            <Text style={styles.nTracksText}>{item.tracks.total} songs</Text>
                        </View>
                    </TouchableOpacity>
                )} />
        </View>
    )
}

export default PlaylistsScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    list: {
        flex: 1,
        backgroundColor: 'white'
    },
    item: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },
    playlistCover: {
        width: 70,
        height: 70,
    },
    playlistName: {
        fontSize: 18,
    },
    nTracksText: {
        fontSize: 14,
    }
})