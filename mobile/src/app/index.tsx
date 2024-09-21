import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from "../components/loginComponent";
import { AuthProvider } from "../context/authService";
import Dashboard from "../components/dashboard";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Details: {name: string; email: string};
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginComponent} />
          <Stack.Screen name="Dashboard" component={Dashboard}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
