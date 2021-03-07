import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full heigh
var random = Math.floor(Math.random() * 1001 + 1);

const Random = () => {
  return (
    <View style={myStyle.view}>
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <View
          style={{
            width: 200,
            height: 200,
            backgroundColor: "red",
            borderRadius: 100,
            alignSelf: "center",
          }}
        >
          <Text style={{ justifyContent: "center", alignItems: "center" }}>
            {random}
          </Text>
        </View>
      </View>
    </View>
  );
};
const myStyle = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default Random;
