import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { SPOTIFY_CLIENT_ID } from '../utils/constants';
import { Entypo } from '@expo/vector-icons'
import { COLORS } from '../utils/colors';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const SpotifyLogin = () => {
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: SPOTIFY_CLIENT_ID,
            scopes: ['user-read-email', 'playlist-modify-public'],
            // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
            // this must be set to false
            usePKCE: false,
            redirectUri: makeRedirectUri({
                scheme: 'musicguess'
            }),
        },
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            console.log(code);
        }
    }, [response]);

    return (
        <TouchableOpacity
            disabled={!request} style={styles.button}
            onPress={() => {
                promptAsync();
            }}>
            <Entypo name='spotify' size={22} color={COLORS.spotifyGreen} />
            <Text style={styles.loginText}>Log in to Spotify</Text>
        </TouchableOpacity>
    );
}

export default SpotifyLogin

const styles = StyleSheet.create({
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
