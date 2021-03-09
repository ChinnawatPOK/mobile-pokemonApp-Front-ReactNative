import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert,
  AsyncStorage,
  Image,
  ImageBackground,
} from "react-native";
import ModalRandom from "../components/ModalRandom";
import axios from "axios";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full heigh

const Random = ({ route }) => {
  const [isOpen, setisOpen] = useState(false);
  const [randomNumber, setRandomNumber] = useState("");
  const [checkSpring, setCheckSpring] = useState(null);
  const [userId, setUserId] = useState(null);
  const image = {
    uri: "https://www.playcast-media.com/wp-content/uploads/2020/12/dims.jpg",
  };
  useEffect(() => {
    api();
  }, []);
  const api = () => {
    axios
      .get(`http://10.0.2.2:8080/api/getCountPerDay?userId=${route.params.id}`)
      .then((res) => {
        console.log("success");
        console.log(typeof res.data);
        setCheckSpring(res.data * 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const close = () => {
    setisOpen(false);
    api();
  };
  const randomNumbr = () => {
    if (checkSpring < 2) {
      setisOpen(true);
      setRandomNumber(Math.floor(Math.random() * 1001 + 1));
    } else {
      Alert.alert("You random per days fully !");
    }
  };
  return (
    <View style={myStyle.view}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: 22,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, color: "white" }}>
            Today You random ...
          </Text>

          <Text style={{ fontSize: 42, fontWeight: "bold", color: "white" }}>
            {checkSpring}
          </Text>
          <Text style={{ fontSize: 18, color: "white" }}> Times/Day.</Text>
        </View>

        <TouchableOpacity onPress={() => randomNumbr()}>
          <View
            style={{
              width: 200,
              height: 200,
              backgroundColor: "red",
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              borderWidth: 2,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 10,
            }}
          >
            {isOpen && (
              <ModalRandom
                fn_close={close}
                data={isOpen}
                number={randomNumber}
                userId={route.params.id}
              />
            )}
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
              Random
            </Text>
          </View>
        </TouchableOpacity>
        <Image
          source={require(`../images/ga.png`)}
          style={{ width: width, height: 300, resizeMode: "stretch" }}
        />
      </View>
    </View>
  );
};
const myStyle = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#1e212d",
  },
  image: {
    flex: 1,
    resizeMode: "repeat",
    justifyContent: "center",
  },
});

export default Random;
