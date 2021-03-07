import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import login from "./src/screens/LoginScreen";
import Register from "./src/screens/Register";
import Menu from "./src/screens/Menu";
import Random from "./src/screens/Random";
import DetailPokemon from "./src/screens/DetailPokemon";

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="menu" component={Menu} />
        <Stack.Screen name="random" component={Random} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pokemon" component={DetailPokemon}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
