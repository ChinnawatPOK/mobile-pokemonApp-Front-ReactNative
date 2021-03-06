import React, { useState, useEffect, useRef } from "react";
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
  Animated,
} from "react-native";
import { Divider } from "react-native-elements";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const ModalMoreEvo = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  }, [fadeAnim]);
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
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 400,
            backgroundColor: "green",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            padding: 15,
          }}
        >
          <Animated.View>
            <Image
              source={{ uri: props.data }}
              style={{ width: 200, height: 200 }}
            ></Image>
          </Animated.View>

          <Text
            style={{
              fontSize: 40,
              letterSpacing: 1,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Busarem
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalMoreEvo;
