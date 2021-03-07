import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import login from "./src/screens/LoginScreen";
import Register from "./src/screens/Register";
import Menu from "./src/screens/Menu";
import Random from "./src/screens/Random";

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="random">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="menu" component={Menu} />
        <Stack.Screen name="random" component={Random} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
