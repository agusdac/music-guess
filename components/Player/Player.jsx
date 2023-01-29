import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { NOT_FOUND_URI } from '../../utils/constants'
import PlayerButtons from './PlayerButtons'
import { spotifyApi } from '../../services/SpotifyService'

const Player = ({ track }) => {

    const [isPlaying, setIsPlaying] = useState(false)

    const getAlbumImage = () => {
        if (track && track.album.images && track.album.images.length > 0) {
            return <Image source={{ uri: track.album.images[0].url }} style={styles.albumCover} />
        }

        return <Image source={NOT_FOUND_URI} style={styles.albumCover} />
    }

    const getTrackName = () => {
        return track ? track.name : 'Unknown'
    }

    const getArtistsNames = () => {
        let names = ''
        if (track && track.artists && track.artists.length > 0) {
            track.artists.forEach((artist, index) => {
                names += index === track.artists.length - 1 ? `${artist.name}` : `${artist.name}, `
            })
        } else names = 'Unknown artists'
        return names
    }

    const playSong = () => {
        spotifyApi.play({ uris: [track.uri] }).then(res => {
            setIsPlaying(true)
        })
    }

    const pauseSong = () => {
        spotifyApi.pause({ uris: [track.uri] }).then(res => {
            setIsPlaying(false)
        })
    }

    return (
        <View style={styles.container}>
            {getAlbumImage()}
            <Text style={styles.songText}>{getTrackName()}</Text>
            <Text style={styles.artistText}>{getArtistsNames()}</Text>
            <View style={{ marginTop: 20 }}>
                <PlayerButtons onPlay={() => playSong()} isPlaying={isPlaying}
                    onPause={() => pauseSong()} />
            </View>
        </View>
    )
}

export default Player

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    albumCover: {
        width: 200,
        height: 200
    },
    songText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    artistText: {
        fontSize: 14,
        marginTop: 10
    }
});