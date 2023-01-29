import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, AuthSession } from 'expo-auth-session';
import { SPOTIFY_CLIENT_ID } from '../utils/constants';
import { Entypo } from '@expo/vector-icons'
import { COLORS } from '../utils/colors';
import { SpotifyContext } from '../context/SpotifyContext';
import { ACTION_TYPES } from '../context/SpotifyActions';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const SpotifyLogin = () => {
    const { state, dispatch } = useContext(SpotifyContext)

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: SPOTIFY_CLIENT_ID,
            scopes: [
                "user-read-currently-playing",
                "user-read-recently-played",
                "user-read-playback-state",
                "user-top-read",
                "user-modify-playback-state",
                "streaming",
                "user-read-email",
                "user-read-private",
            ],
            // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
            // this must be set to false
            usePKCE: false,
            useProxy: false,
            /* redirectUri: makeRedirectUri({
                scheme: 'musicguess',
                useProxy: false,
                native: 'musicguess://'
            }), */
            redirectUri: 'exp://192.168.0.136:19000'
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            dispatch({ type: ACTION_TYPES.SET_TOKEN, token: code })
        }
    }, [response]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={!request} style={styles.button}
                onPress={() => {
                    promptAsync({ useProxy: false });
                }}>
                <Entypo name='spotify' size={22} color={COLORS.spotifyGreen} />
                <Text style={styles.loginText}>Log in to Spotify</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SpotifyLogin

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
        borderColor: COLORS.spotifyGreen,
        borderWidth: 1,
        borderRadius: 16
    },
    loginText: {
        fontSize: 16,
        marginLeft: 5,
        color: COLORS.spotifyGreen,
    },
});
