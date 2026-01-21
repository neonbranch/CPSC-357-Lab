import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from './components/Header';
import AllFeeds from './components/feeds';
import Stories from './components/Stories';
import feedData from './data/feed.json';
import MyForm from './sample/form';
import FlexView from './sample/flex';
import Login from './sample/login';
import SafeAreaTest from './sample/SafeAreaTest';

export default function App() {
  const handlePress = () => {
    alert("Pressed");
  };

  return (
    <>
      <MyForm />
    </>
    // <SafeAreaProvider>
    //   <SafeAreaView style={styles.container}>
    //     <Login />
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 2,
  },
});
