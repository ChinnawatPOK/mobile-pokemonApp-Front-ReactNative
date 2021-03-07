import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
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
    if (regisRes && regisRes.status == 200) console.log("regis200");
    else if (regisRes && regisRes.status == 400) console.log("regis400");
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
      await AsyncStorage.removeItem("user");
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };
  const registerAction = (usernameReq, passwordReq) => {
    clearStorage();
    registerApi(usernameReq, passwordReq, setRegisRes);
  };
  return (
    <View style={myStyle.container}>
      <View style={myStyle.viewContainer}>
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
  },
  viewContainer: {
    alignItems: "center",
  },
  textInput: {
    width: 300,
    marginVertical: 3,
  },
});

export default Register;
