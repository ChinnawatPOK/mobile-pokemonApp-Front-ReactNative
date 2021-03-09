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

const ModalFightRandom = (props) => {
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={true}
      onRequestClose={() => {
        // props.fn_close();
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
            // props.fn_close();
          }}
        >
          <View style={{ width: width, height: height }}></View>
        </TouchableOpacity>
        <LinearGradient
          colors={["#e52d27", "#b31217"]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 400,
            borderTopRightRadius: 300,
            borderTopLeftRadius: 300,
            padding: 15,
          }}
        >
          <View>
            <Image
              source={{
                uri: props.image,
              }}
              style={{ width: 170, height: 170 }}
            ></Image>
          </View>
          <Text
            style={{
              fontSize: 20,
              letterSpacing: 1,
              fontWeight: "bold",
              color: "#e4e6e5",
            }}
          >
            Your opponent is
          </Text>
          <Text
            style={{
              fontSize: 40,
              letterSpacing: 1,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {props.namePoke.toUpperCase()}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 30,
              marginTop: 8,
            }}
          >
            {props.type.map((item) => (
              <Text
                style={{
                  fontSize: 16,
                  letterSpacing: 1,
                  fontWeight: "bold",
                  color: "#fff",
                  textAlign: "center",
                  backgroundColor: "#F3A183",
                  borderRadius: 20,
                  paddingHorizontal: 15,
                  marginHorizontal: 5,
                }}
              >
                {item.type.name}
              </Text>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => {
              props.fn_close();
            }}
          >
            <LinearGradient
              colors={["#ED213A", "#93291E"]}
              style={{
                marginTop: 20,
                width: 250,
                height: 50,
                borderRadius: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#e4e6e5" }}
              >
                FIGHT NOW >>>
              </Text>
              {/* namePoke={dataSpecie.name}
          type={dataPokemon.types}
          idPoke={id_pokemon}
          image={`https://pokeres.bastionbot.org/images/pokemon/${id_pokemon}.png`} */}
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default ModalFightRandom;
