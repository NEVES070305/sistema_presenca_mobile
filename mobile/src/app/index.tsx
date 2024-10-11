import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from "../components/loginComponent";
import { AuthProvider } from "../context/authService";
import Dashboard from "../components/attendanceComponent";
import AttendanceComponent from "../components/attendanceComponent";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from "expo-router";
import EditAttendanceComponent from "../components/editAttendanceComponent";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Details: {name: string; email: string};
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
export default function Index() {
  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        {/* <Stack.Navigator initialRouteName="Attendence"> */}
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginComponent} />
          <Tab.Navigator>
            <Tab.Screen name="Attendance" component={AttendanceComponent} />
            <Tab.Screen name="EditAttendance" component={EditAttendanceComponent} />
          </Tab.Navigator>
        {/* </Stack.Navigator> */}
      </NavigationContainer>
    </AuthProvider>
  );
}
