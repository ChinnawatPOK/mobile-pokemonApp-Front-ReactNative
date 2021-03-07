import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
  // Animated,
} from "react-native";
import { Divider } from "react-native-elements";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const ModalMoreEvo = (props) => {
  // const fadeAnim = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 10000,
  //   }).start();
  // }, [fadeAnim]);
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.fn_close();
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0, 0, 0, 0.43)",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.fn_close();
          }}
        >
          <View style={{ width: width, height: height }}></View>
        </TouchableOpacity>
        <LinearGradient
          colors={["#403B4A", "#E7E9BB"]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 400,
            // backgroundColor: "green",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            padding: 15,
          }}
        >
          <View>
            <Image
              source={{ uri: props.data.image }}
              style={{ width: 200, height: 200 }}
            ></Image>
          </View>

          <Text
            style={{
              fontSize: 40,
              letterSpacing: 1,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {props.data.name}
          </Text>
          <Text
            style={{
              fontSize: 25,
              letterSpacing: 1,
              fontWeight: "bold",
              color: "gray",
            }}
          >
            LEVEL UPGRADE {props.data.level}
          </Text>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default ModalMoreEvo;
