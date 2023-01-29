import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SpotifyLogin from './components/SpotifyLogin';
import SpotifyContextProvider from './context/SpotifyContext';

export default function App() {
  return (
    <SpotifyContextProvider>
      <View style={styles.container}>
        <SpotifyLogin />
      </View>
    </SpotifyContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
