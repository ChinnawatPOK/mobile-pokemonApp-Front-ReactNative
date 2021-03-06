import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import GradientButton from "react-native-gradient-buttons";
import responseApi from "../hookApi/responseAPi";

const Register = () => {
  const [registerApi] = responseApi();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regisRes, setRegisRes] = useState(null);
  useEffect(() => {
    if (regisRes && regisRes.status == 200) console.log("regis200");
    else if (regisRes && regisRes.status == 400) console.log("regis400");
  }, [regisRes]);

  const registerAction = (usernameReq, passwordReq) => {
    console.log(usernameReq);
    console.log(passwordReq);
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
