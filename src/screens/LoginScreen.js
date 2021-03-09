import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert,
  AsyncStorage,
} from "react-native";
import responseApi from "../hookApi/responseAPi";
import GradientButton from "react-native-gradient-buttons";
import axios from "axios";
// import { AsyncStorage } from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const LoginScreen = (props) => {
  const [getUserPokemon, response, login] = responseApi();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginRes, setLoginRes] = useState(null);
  const [loginErr, setLoginErr] = useState(null);
  const navigation = useNavigation();

  const checkLogin = (username, password) => {
    axios
      .post(`http://10.0.2.2:8080/api/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        _storeData(res.data);
        setLoginRes(res);
        navigation.navigate("menu");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const _storeData = async (userId) => {
    try {
      console.log(userId.username);
      await AsyncStorage.setItem("id", userId.userId + "");
      await AsyncStorage.setItem("name", userId.username);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  return (
    <View style={myStyle.view}>
      <View style={myStyle.viewContainer}>
        <Image
          source={require(`../images/pokemonIcon.png`)}
          style={myStyle.imageStyle}
        />
        <Image
          source={require(`../images/pokeball.png`)}
          style={myStyle.imageBallStyle}
        />
        <Text
          style={{
            alignSelf: "flex-start",
            marginHorizontal: 50,
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 10,
            color: "white",
          }}
        >
          Sign In
        </Text>
        <View style={myStyle.textInputStyle}>
          <TextInput
            style={myStyle.inputStyle}
            placeholder="username"
            value={username}
            onChangeText={(e) => setUsername(e)}
          />
        </View>

        <View style={myStyle.textInputStyle}>
          <TextInput
            style={myStyle.inputStyle}
            secureTextEntry={true}
            placeholder="password"
            value={password}
            onChangeText={(e) => setPassword(e)}
          />
        </View>
        <GradientButton
          style={myStyle.buttonLogin}
          width={320}
          height={50}
          violetPink
          impact
          textStyle={{ fontSize: 20 }}
          text="Login"
          onPressAction={() => checkLogin(username, password)}
        />

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            marginRight: 50,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
              Sign up for you ?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const myStyle = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#B22222",
  },
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    alignSelf: "center",
    padding: 3,
    width: 320,
    height: 50,
    borderColor: "white",
    flexDirection: "row",
    borderColor: "white",
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 40,
    borderRadius: 40,
  },
  inputStyle: {
    marginLeft: 20,
    color: "white",
    fontSize: 22,
  },
  imageStyle: {
    width: width,
    height: 130,
    resizeMode: "contain",
    marginBottom: -30,
  },
  imageBallStyle: {
    width: width,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  buttonLogin: {
    marginVertical: 5,
  },
});

export default LoginScreen;
