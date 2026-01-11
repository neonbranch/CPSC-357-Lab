import LoginForm from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';


export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen name="Login" component={LoginForm} />
    //     <Stack.Screen name="HomeScreen" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <LoginForm />
  );
}
