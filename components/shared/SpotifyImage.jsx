import { View, Text, Image } from 'react-native'
import React from 'react'
import { NOT_FOUND_URI } from '../../utils/constants'

const SpotifyImage = ({ uri, style }) => {
    if (uri) {
        return <Image source={{ uri: uri }} style={style} />
    }

    return <Image source={NOT_FOUND_URI} style={style} />
}

export default SpotifyImage