import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import GradientButton from "react-native-gradient-buttons";
import responseApi from "../hookApi/responseAPi";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [registerApi] = responseApi();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regisRes, setRegisRes] = useState(null);
  const [userId, setUserId] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    readDataFromStorage();
    if (regisRes && regisRes.status == 200) navigation.navigate("login");
    else if (regisRes && regisRes.status == 400) Alert.alert(regisRes.data);
  }, [regisRes]);

  const readDataFromStorage = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        console.log(user);
        setUserId(user);
      }
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };
  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem("id");
      await AsyncStorage.removeItem("name");
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };
  const registerAction = (usernameReq, passwordReq) => {
    // clearStorage();
    registerApi(usernameReq, passwordReq, setRegisRes);
  };
  return (
    <View style={myStyle.container}>
      <Image
        source={require(`../images/aa.png`)}
        style={{
          width: 350,
          height: 360,
          resizeMode: "contain",
          top: 80,
          right: -100,
          opacity: 0.8,
        }}
      />
      <View style={myStyle.viewContainer}>
        <Image
          source={require(`../images/rr.png`)}
          style={{
            width: 100,
            height: 100,
            position: "relative",
            opacity: 0.5,
            top: 40,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            alignSelf: "flex-start",
            marginLeft: 20,
          }}
        >
          Sign Up
        </Text>
        <View style={myStyle.textInput}>
          <Input placeholder="username" onChangeText={(e) => setUsername(e)} />
        </View>
        <View style={myStyle.textInput}>
          <Input
            placeholder="Password"
            secureTextEntry={true}
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
          text="Sign Up"
          onPressAction={() => registerAction(username, password)}
        />
      </View>
    </View>
  );
};
const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#B22222",
  },
  viewContainer: {
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 50,
    // paddingTop: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  textInput: {
    width: 300,
    marginVertical: 3,
  },
});

export default Register;
