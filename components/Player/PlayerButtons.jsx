import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import React from 'react'

const PlayerButtons = ({ isPlaying, onPlay, onPause }) => {
    return (
        <View style={styles.container}>
            {isPlaying ?
                <TouchableOpacity onPress={onPause}>
                    <MaterialIcons name='pause' size={50} />
                </TouchableOpacity> :
                <TouchableOpacity onPress={onPlay}>
                    <Entypo name='controller-play' size={50} />
                </TouchableOpacity>}
        </View>
    )
}

export default PlayerButtons

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});