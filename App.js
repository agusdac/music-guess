import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SpotifyLogin from './components/SpotifyLogin';
import SpotifyContextProvider from './context/SpotifyContext';
import AppNavigator from './routes/AppNavigator';

export default function App() {
  return (
    <SpotifyContextProvider>
      <AppNavigator />
    </SpotifyContextProvider>
  );
}
