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

  useEffect(() => {
    if (loginRes && loginRes.status == 200) {
      _storeData(loginRes.data.username);
      console.log("logedin");
      navigation.navigate("menu");
    } else if (loginRes && loginRes.status == 400) console.log("400");
    else console.log("500");
  }, [loginRes]);

  const checkLogin = async (username, password) => {
    if (username && password) {
      await login(username, password, setLoginRes, setLoginErr);
      setUsername("");
      setPassword("");
    } else Alert.alert("please type");
  };

  const _storeData = async (userId) => {
    try {
      console.log(userId);
      await AsyncStorage.setItem("user", userId);
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
        <View style={myStyle.textInputStyle}>
          <TextInput
            style={myStyle.inputStyle}
            placeholder="username"
            value={username}
            onChangeText={(e) => setUsername(e)}
            // onEndEditing={() => console.log(textInput)}
          />
        </View>
        <View style={myStyle.textInputStyle}>
          <TextInput
            style={myStyle.inputStyle}
            placeholder="password"
            value={password}
            onChangeText={(e) => setPassword(e)}
            // onEndEditing={() => console.log(textInput)}
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
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Resgister</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const myStyle = StyleSheet.create({
  view: {
    flex: 1,
    // backgroundColor: "red",
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
    borderColor: "black",
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 40,
    borderRadius: 40,
  },
  inputStyle: {
    marginLeft: 20,
    color: "#000000",
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
